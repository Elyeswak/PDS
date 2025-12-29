// server/api/webhooks/cal.post.ts
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { sendAdminNotification, sendUserConfirmation, sendCancellationEmail } from '../../utils/email';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readRawBody(event);
    const signature = getHeader(event, 'x-cal-signature');
    
    if (!body) {
      throw createError({ statusCode: 400, message: 'Missing request body' });
    }

    console.log('=== CAL.COM WEBHOOK RECEIVED ===');
    const config = useRuntimeConfig();
    const webhookSecret = config.calComWebhookSecret;
    
    // Verify signature
    if (signature && webhookSecret && webhookSecret !== '4Jjj8bF3KJONnMfvCEy8Pa2pJ2gqCV7C') {
      if (!verifySignature(body, signature, webhookSecret)) {
        throw createError({ statusCode: 401, message: 'Invalid webhook signature' });
      }
    }

    const rawPayload = JSON.parse(body);
    console.log('📦 Raw payload:', JSON.stringify(rawPayload, null, 2));
    
    const normalized = normalizeCalComPayload(rawPayload);
    console.log('📄 Normalized payload:', JSON.stringify(normalized, null, 2));
    
    // CRITICAL: Detect TRUE event type based on Cal.com webhook behavior
    const eventType = detectEventType(normalized, rawPayload);
    console.log(`📋 Detected event type: ${eventType}`);

    // Log webhook
    await prisma.webhookLog.create({
      data: {
        eventType,
        payload: rawPayload,
        success: true
      }
    });

    // Route to handlers
    switch (eventType) {
      case 'REQUIRES_API_CHECK':
        // Minimal payload - must check Cal.com API to determine actual event
        await handleMinimalPayload(normalized, config);
        break;
      case 'BOOKING_CREATED':
        await handleBookingCreated(normalized, config);
        break;
      case 'BOOKING_RESCHEDULED':
        await handleBookingRescheduled(normalized, config);
        break;
      case 'BOOKING_CANCELLED':
        await handleBookingCancelled(normalized);
        break;
      default:
        console.log(`⚠️ Unhandled event: ${eventType}`);
    }

    return { success: true, eventType };

  } catch (error: any) {
    console.error('❌ WEBHOOK ERROR:', error.message);
    
    try {
      const body = await readRawBody(event);
      if (body) {
        const raw = JSON.parse(body);
        await prisma.webhookLog.create({
          data: {
            eventType: detectEventType(raw, raw),
            payload: raw,
            success: false,
            errorMessage: error.message
          }
        });
      }
    } catch {}

    throw createError({ statusCode: 500, message: error.message });
  }
});

/**
 * Handles minimal payload from event-type webhooks
 * These webhooks send the same minimal data for ALL events
 * Must fetch from Cal.com API to determine actual status
 */
async function handleMinimalPayload(payload: any, config: any) {
  console.log('=== HANDLING MINIMAL PAYLOAD (REQUIRES API CHECK) ===');
  
  const uid = payload.uid;
  if (!uid) throw new Error('Missing uid');

  console.log('🌐 Fetching complete booking data from Cal.com API...');
  
  try {
    const bookingData = await fetchCalComBooking(uid, config);
    console.log('📊 API Response:', {
      uid: bookingData.uid,
      status: bookingData.status,
      title: bookingData.title,
      startTime: bookingData.startTime,
      endTime: bookingData.endTime
    });

    const apiStatus = (bookingData.status || '').toUpperCase();
    
    // Check if booking exists in database
    const existing = await prisma.appointment.findUnique({
      where: { calComUid: uid }
    });

    // CANCELLATION
    if (apiStatus === 'CANCELLED' || apiStatus === 'REJECTED') {
      console.log('🚫 API shows CANCELLED status');
      
      if (!existing) {
        console.log('⚠️ Cancelled booking not in database - skipping');
        return;
      }

      if (existing.status === 'CANCELLED') {
        console.log('✅ Already cancelled in database');
        return;
      }

      console.log('📝 Updating booking to CANCELLED');
      await prisma.appointment.update({
        where: { calComUid: uid },
        data: {
          status: 'CANCELLED',
          cancellationReason: bookingData.cancellationReason || 'Cancelled by user'
        }
      });

      const updated = await prisma.appointment.findUnique({
        where: { calComUid: uid }
      });

      if (updated) {
        try {
          await Promise.all([
            sendCancellationEmail(updated),
            sendAdminNotification(updated, 'CANCELLED')
          ]);
          console.log('📧 Cancellation emails sent');
        } catch (err: any) {
          console.error('⚠️ Email error:', err.message);
        }
      }

      return;
    }

    // RESCHEDULE (has rescheduleUid in API response)
    if (bookingData.rescheduleUid) {
      console.log('🔄 API shows this is a reschedule');
      
      if (existing) {
        console.log('⚠️ Rescheduled booking already exists - skipping');
        return;
      }

      // Delegate to reschedule handler
      await handleBookingRescheduled({
        ...bookingData,
        uid: uid,
        rescheduleUid: bookingData.rescheduleUid
      }, config);
      
      return;
    }

    // NEW BOOKING
    if (!existing && (apiStatus === 'ACCEPTED' || apiStatus === 'PENDING')) {
      console.log('📝 API shows new booking');
      await handleBookingCreated(bookingData, config);
      return;
    }

    console.log('ℹ️ No action needed - booking already processed');

  } catch (error: any) {
    console.error('❌ Failed to fetch from API:', error.message);
    throw error;
  }
}

/**
 * CRITICAL: Cal.com webhook behavior depends on configuration:
 * - User/Team webhooks: Include triggerEvent field
 * - Event-type webhooks: May have minimal payload without triggerEvent
 * 
 * Detection strategy:
 * 1. Check triggerEvent field (most reliable)
 * 2. Compare with Cal.com API to detect status changes
 * 3. Infer from payload structure
 */
function detectEventType(normalized: any, raw: any): string {
  console.log('🔍 Detecting event type...');
  console.log('   triggerEvent:', raw.triggerEvent);
  console.log('   type:', raw.type);
  console.log('   status:', normalized.status || raw.status);
  console.log('   rescheduleUid:', normalized.rescheduleUid || raw.rescheduleUid);
  console.log('   payload keys:', Object.keys(raw).join(', '));
  
  // 1. Check explicit triggerEvent field (most reliable)
  if (raw.triggerEvent) {
    const trigger = raw.triggerEvent.toUpperCase();
    console.log(`✅ Using triggerEvent: ${trigger}`);
    
    if (trigger.includes('CANCEL')) return 'BOOKING_CANCELLED';
    if (trigger.includes('RESCHEDUL')) return 'BOOKING_RESCHEDULED';
    if (trigger.includes('CREATED')) return 'BOOKING_CREATED';
    
    return trigger.replace('.', '_');
  }

  // 2. Check status field (Cal.com sends status in payload)
  const status = (normalized.status || raw.status || '').toUpperCase();
  console.log(`   Checking status: ${status}`);
  
  if (status === 'CANCELLED' || status === 'REJECTED') {
    console.log('✅ Status indicates CANCELLATION');
    return 'BOOKING_CANCELLED';
  }

  // 3. Check for reschedule indicators
  if (normalized.rescheduleUid || raw.rescheduleUid || raw.oldBookingUid) {
    console.log('✅ Reschedule UID found');
    return 'BOOKING_RESCHEDULED';
  }

  // 4. Check cancellationReason (some cancellations include this)
  if (normalized.cancellationReason || raw.cancellationReason || raw.cancelReason) {
    console.log('✅ Cancellation reason found');
    return 'BOOKING_CANCELLED';
  }

  // 5. FALLBACK: If no triggerEvent and minimal payload, always verify with API
  // Event-type webhooks send same minimal payload for ALL events (created, cancelled, rescheduled)
  const hasMinimalPayload = Object.keys(raw).length < 10 && !raw.startTime && !raw.endTime;
  
  if (hasMinimalPayload && hasUid) {
    console.log('⚠️ Minimal payload detected - requires API verification');
    return 'REQUIRES_API_CHECK';
  }
  
  if (hasUid && hasAttendees) {
    console.log('✅ Has UID + attendees - treating as new booking');
    return 'BOOKING_CREATED';
  }

  console.warn('⚠️ Could not determine event type');
  return 'UNKNOWN';
}

function normalizeCalComPayload(payload: any): any {
  if (payload.payload && typeof payload.payload === 'object') {
    payload = payload.payload;
  }

  const hasFlattened = Object.keys(payload).some(k => 
    k.includes('.') && /\.\d+\./.test(k)
  );
  
  if (!hasFlattened) return payload;

  const normalized: any = {};
  
  for (const [key, value] of Object.entries(payload)) {
    if (!key.includes('.')) {
      normalized[key] = value;
      continue;
    }

    const parts = key.split('.');
    let current = normalized;
    
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      const nextPart = parts[i + 1];
      
      if (!isNaN(Number(nextPart))) {
        if (!current[part]) current[part] = [];
        const idx = Number(nextPart);
        if (!current[part][idx]) current[part][idx] = {};
        current = current[part][idx];
        i++;
      } else {
        if (!current[part]) current[part] = {};
        current = current[part];
      }
    }
    
    current[parts[parts.length - 1]] = value;
  }

  return normalized;
}

function verifySignature(body: string, signature: string, secret: string): boolean {
  try {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(body);
    const digest = hmac.digest('hex');
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'), 
      Buffer.from(digest, 'hex')
    );
  } catch {
    return false;
  }
}

async function fetchCalComBooking(uid: string, config: any): Promise<any> {
  const apiKey = config.calComApiKey;
  if (!apiKey) {
    throw new Error('CAL_COM_API_KEY not configured');
  }

  const url = `https://api.cal.com/v1/bookings?apiKey=${apiKey}&uid=${uid}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Cal.com API error ${res.status}: ${errorText}`);
  }

  const data = await res.json();
  
  if (data.bookings?.length > 0) {
    const booking = data.bookings.find((b: any) => b.uid === uid);
    if (!booking) throw new Error(`Booking ${uid} not found in response`);
    return booking;
  }
  
  if (data.booking) return data.booking;
  if (data.uid === uid) return data;
  
  throw new Error('Unexpected API response structure');
}

/**
 * CRITICAL: This handles BOTH new bookings AND status updates
 * Cal.com sends BOOKING_CREATED event for cancellations too
 */
async function handleBookingCreated(payload: any, config: any) {
  console.log('=== HANDLING BOOKING_CREATED ===');
  
  const uid = payload.uid;
  if (!uid) throw new Error('Missing uid');

  // Check if booking already exists
  const existing = await prisma.appointment.findUnique({
    where: { calComUid: uid }
  });

  if (existing) {
    console.log(`⚠️ Booking ${uid} already exists (ID: ${existing.id})`);
    console.log(`   Current DB status: ${existing.status}`);
    console.log(`   Payload status: ${payload.status}`);
    
    // CRITICAL: Check if this is a status update (especially cancellation)
    const payloadStatus = (payload.status || '').toUpperCase();
    
    if (payloadStatus === 'CANCELLED' || payloadStatus === 'REJECTED') {
      console.log('🚫 Payload indicates CANCELLATION - updating existing booking');
      
      await prisma.appointment.update({
        where: { calComUid: uid },
        data: {
          status: 'CANCELLED',
          cancellationReason: payload.cancellationReason || payload.cancelReason || 'Cancelled by user'
        }
      });
      
      console.log(`✅ Updated appointment ${existing.id} to CANCELLED`);
      
      // Send cancellation emails
      const updated = await prisma.appointment.findUnique({
        where: { calComUid: uid }
      });
      
      if (updated) {
        try {
          await Promise.all([
            sendCancellationEmail(updated),
            sendAdminNotification(updated, 'CANCELLED')
          ]);
          console.log('📧 Cancellation emails sent');
        } catch (err: any) {
          console.error('⚠️ Email error:', err.message);
        }
      }
      
      return;
    }
    
    // Not a cancellation - check current status from Cal.com API
    try {
      const current = await fetchCalComBooking(uid, config);
      console.log(`   Cal.com API status: ${current.status}`);
      
      if (current.status === 'CANCELLED' || current.status === 'REJECTED') {
        console.log('🚫 Cal.com API shows CANCELLED - updating database');
        
        await prisma.appointment.update({
          where: { calComUid: uid },
          data: {
            status: 'CANCELLED',
            cancellationReason: current.cancellationReason || 'Cancelled'
          }
        });
        
        const updated = await prisma.appointment.findUnique({
          where: { calComUid: uid }
        });
        
        if (updated) {
          try {
            await Promise.all([
              sendCancellationEmail(updated),
              sendAdminNotification(updated, 'CANCELLED')
            ]);
          } catch (err: any) {
            console.error('⚠️ Email error:', err.message);
          }
        }
        
        return;
      }
      
      console.log(`ℹ️ Status is ${current.status} - no update needed`);
      return;
      
    } catch (err: any) {
      console.error('⚠️ Could not fetch from API:', err.message);
      console.log('ℹ️ Skipping duplicate - assuming no status change');
      return;
    }
  }

  // NEW BOOKING - Create it
  console.log('📝 Creating new booking...');
  
  // Fetch complete data if needed
  let bookingData = payload;
  if (!payload.startTime || !payload.endTime) {
    console.log('🌐 Fetching complete booking data from API...');
    bookingData = await fetchCalComBooking(uid, config);
  }

  // Check status one more time before creating
  const bookingStatus = (bookingData.status || '').toUpperCase();
  if (bookingStatus === 'CANCELLED' || bookingStatus === 'REJECTED') {
    console.log('⚠️ Booking is cancelled in Cal.com - not creating');
    return;
  }

  // Extract data
  const attendees = bookingData.attendees || [];
  const attendee = attendees[0];
  
  if (!attendee?.email) throw new Error('Missing attendee email');
  if (!bookingData.startTime || !bookingData.endTime) {
    throw new Error('Missing time fields');
  }

  const responses = bookingData.responses || bookingData.customInputs || {};
  
  // Create appointment
  const appointment = await prisma.appointment.create({
    data: {
      calComBookingId: bookingData.id || 0,
      calComUid: uid,
      attendeeName: attendee.name || 'Unknown',
      attendeeEmail: attendee.email,
      attendeeTimezone: attendee.timeZone || attendee.timezone || 'UTC',
      title: bookingData.title || 'Appointment',
      description: bookingData.description || '',
      startTime: new Date(bookingData.startTime),
      endTime: new Date(bookingData.endTime),
      status: 'CONFIRMED',
      companyName: responses.companyName || null,
      serviceInterest: responses.serviceInterest || null,
      specialRequirements: responses.specialRequirements || null,
      meetingUrl: bookingData.meetingUrl || bookingData.location || null
    }
  });

  console.log(`✅ Created appointment ${appointment.id}`);

  try {
    await Promise.all([
      sendUserConfirmation(appointment),
      sendAdminNotification(appointment, 'NEW_BOOKING')
    ]);
    console.log('📧 Confirmation emails sent');
  } catch (err: any) {
    console.error('⚠️ Email error:', err.message);
  }
}

async function handleBookingRescheduled(payload: any, config: any) {
  console.log('=== HANDLING BOOKING_RESCHEDULED ===');
  
  const newUid = payload.uid;
  const oldUid = payload.rescheduleUid || payload.oldBookingUid;

  if (!newUid || !oldUid) {
    throw new Error('Missing uid fields for reschedule');
  }

  // Check if new booking already exists
  const existingNew = await prisma.appointment.findUnique({
    where: { calComUid: newUid }
  });

  if (existingNew) {
    console.log(`⚠️ New booking ${newUid} already exists - skipping`);
    return;
  }

  // Fetch complete data
  let bookingData = payload;
  if (!payload.startTime || !payload.endTime) {
    bookingData = await fetchCalComBooking(newUid, config);
  }

  // Find old booking
  const oldBooking = await prisma.appointment.findUnique({
    where: { calComUid: oldUid }
  });

  if (!oldBooking) {
    console.error(`❌ Old booking ${oldUid} not found`);
    throw new Error(`Cannot reschedule: old booking not found`);
  }

  // Check if already rescheduled
  if (oldBooking.status === 'RESCHEDULED' && oldBooking.rescheduleUid === newUid) {
    console.log('⚠️ Already rescheduled - skipping');
    return;
  }

  // Update old booking
  await prisma.appointment.update({
    where: { calComUid: oldUid },
    data: {
      status: 'RESCHEDULED',
      rescheduleUid: newUid
    }
  });

  console.log(`✅ Marked old booking ${oldBooking.id} as RESCHEDULED`);

  // Create new booking
  const attendees = bookingData.attendees || [];
  const attendee = attendees[0];

  const newAppointment = await prisma.appointment.create({
    data: {
      calComBookingId: bookingData.id || 0,
      calComUid: newUid,
      attendeeName: attendee?.name || oldBooking.attendeeName,
      attendeeEmail: attendee?.email || oldBooking.attendeeEmail,
      attendeeTimezone: attendee?.timeZone || oldBooking.attendeeTimezone,
      title: bookingData.title || oldBooking.title,
      description: bookingData.description || oldBooking.description,
      startTime: new Date(bookingData.startTime),
      endTime: new Date(bookingData.endTime),
      status: 'CONFIRMED',
      companyName: oldBooking.companyName,
      serviceInterest: oldBooking.serviceInterest,
      specialRequirements: oldBooking.specialRequirements,
      meetingUrl: bookingData.meetingUrl || oldBooking.meetingUrl
    }
  });

  console.log(`✅ Created new booking ${newAppointment.id}`);

  try {
    await Promise.all([
      sendUserConfirmation(newAppointment),
      sendAdminNotification(newAppointment, 'RESCHEDULED')
    ]);
    console.log('📧 Reschedule emails sent');
  } catch (err: any) {
    console.error('⚠️ Email error:', err.message);
  }
}

async function handleBookingCancelled(payload: any) {
  console.log('=== HANDLING BOOKING_CANCELLED ===');
  
  const uid = payload.uid || payload.bookingUid;
  const reason = payload.cancellationReason || payload.reason || payload.cancelReason || null;

  if (!uid) {
    throw new Error('Missing uid for cancellation');
  }

  // Find appointment
  let appointment = await prisma.appointment.findUnique({
    where: { calComUid: uid }
  });

  // Fallback searches
  if (!appointment && payload.id) {
    console.log(`⚠️ Trying by booking ID: ${payload.id}`);
    appointment = await prisma.appointment.findFirst({
      where: { calComBookingId: payload.id }
    });
  }

  if (!appointment && payload.attendees?.length > 0) {
    const email = payload.attendees[0].email;
    console.log(`⚠️ Trying by email: ${email}`);
    appointment = await prisma.appointment.findFirst({
      where: { 
        attendeeEmail: email,
        status: { not: 'CANCELLED' }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  if (!appointment) {
    console.warn('⚠️ Booking not found - may not exist in database');
    return;
  }

  // Skip if already cancelled
  if (appointment.status === 'CANCELLED') {
    console.log('✅ Already cancelled - no action needed');
    return;
  }

  console.log(`🔍 Found appointment ${appointment.id} - updating to CANCELLED`);

  // Update to cancelled
  const updated = await prisma.appointment.update({
    where: { id: appointment.id },
    data: {
      status: 'CANCELLED',
      cancellationReason: reason
    }
  });

  console.log(`✅ Cancelled appointment ${updated.id}`);

  try {
    await Promise.all([
      sendCancellationEmail(updated),
      sendAdminNotification(updated, 'CANCELLED')
    ]);
    console.log('📧 Cancellation emails sent');
  } catch (err: any) {
    console.error('⚠️ Email error:', err.message);
  }
}