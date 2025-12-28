// ============================================================================
// FILE: server/api/webhooks/cal.post.ts
// FIXED: Cal.com API authentication now uses query parameter instead of Bearer
// ============================================================================
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { sendAdminNotification, sendUserConfirmation, sendCancellationEmail } from '../../utils/email';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readRawBody(event);
    const signature = getHeader(event, 'x-cal-signature');
    
    if (!body) {
      throw createError({
        statusCode: 400,
        message: 'Missing request body'
      });
    }

    console.log('=== CAL.COM WEBHOOK RECEIVED ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Signature present:', !!signature);

    const config = useRuntimeConfig();
    const webhookSecret = config.calComWebhookSecret;
    
    // Only verify signature if both signature and secret are present
    if (signature && webhookSecret && webhookSecret !== '4Jjj8bF3KJONnMfvCEy8Pa2pJ2gqCV7C') {
      if (!verifySignature(body, signature, webhookSecret)) {
        console.error('❌ Signature verification failed');
        throw createError({
          statusCode: 401,
          message: 'Invalid webhook signature'
        });
      }
      console.log('✅ Signature verified');
    } else {
      console.warn('⚠️ Skipping signature verification (event-type webhook or test secret)');
    }

    const rawPayload = JSON.parse(body);
    console.log('📦 Raw payload received:', JSON.stringify(rawPayload, null, 2));

    // Normalize the payload
    const normalizedPayload = normalizeCalComPayload(rawPayload);
    console.log('🔄 Normalized payload:', JSON.stringify(normalizedPayload, null, 2));

    // Detect event type
    const eventType = detectEventType(normalizedPayload, rawPayload);
    console.log(`📋 Detected event type: ${eventType}`);

    // Log webhook to database
    await prisma.webhookLog.create({
      data: {
        eventType: eventType,
        payload: rawPayload,
        success: true
      }
    });

    // Route to appropriate handler
    switch (eventType) {
      case 'BOOKING_CREATED':
        await handleBookingCreated(normalizedPayload, config);
        break;
      
      case 'BOOKING_RESCHEDULED':
        await handleBookingRescheduled(normalizedPayload, config);
        break;
      
      case 'BOOKING_CANCELLED':
        await handleBookingCancelled(normalizedPayload);
        break;
      
      default:
        console.log(`⚠️ Unhandled event type: ${eventType}`);
    }

    return {
      success: true,
      message: 'Webhook processed successfully',
      eventType
    };

  } catch (error: any) {
    console.error('❌ WEBHOOK PROCESSING ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    try {
      const body = await readRawBody(event);
      if (body) {
        const rawPayload = JSON.parse(body);
        const eventType = detectEventType(rawPayload, rawPayload);
        
        await prisma.webhookLog.create({
          data: {
            eventType: eventType,
            payload: rawPayload,
            success: false,
            errorMessage: error.message
          }
        });
        console.log('📝 Failed webhook logged to database');
      }
    } catch (logError) {
      console.error('❌ Failed to log webhook error:', logError);
    }

    throw createError({
      statusCode: 500,
      message: error.message || 'Webhook processing failed'
    });
  }
});

function detectEventType(normalized: any, raw: any): string {
  if (raw.triggerEvent) {
    return raw.triggerEvent.toUpperCase().replace('.', '_');
  }
  
  if (raw.type) {
    return raw.type.toUpperCase().replace('.', '_');
  }
  
  console.log('🔍 No explicit event type, inferring from payload structure...');
  
  if (normalized.rescheduleUid || raw.rescheduleUid || raw.oldBookingUid) {
    console.log('✅ Detected reschedule indicators');
    return 'BOOKING_RESCHEDULED';
  }
  
  if (normalized.cancellationReason || raw.cancellationReason || 
      raw.cancelReason || normalized.status === 'CANCELLED') {
    console.log('✅ Detected cancellation indicators');
    return 'BOOKING_CANCELLED';
  }
  
  const hasUid = !!(normalized.uid || raw.uid);
  const hasAttendees = !!(
    normalized.attendees?.length > 0 || 
    raw['attendees.0.email'] || 
    raw.attendeeEmail
  );
  
  if (hasUid && hasAttendees) {
    console.log('✅ Detected new booking indicators (uid + attendees)');
    return 'BOOKING_CREATED';
  }
  
  console.warn('⚠️ Could not detect event type from payload structure');
  return 'UNKNOWN';
}

function normalizeCalComPayload(payload: any): any {
  console.log('🔧 Starting payload normalization...');
  
  if (payload.payload && typeof payload.payload === 'object') {
    console.log('📦 Unwrapping nested payload object');
    payload = payload.payload;
  }

  const keys = Object.keys(payload);
  const hasFlattened = keys.some(key => key.includes('.') && /\.\d+\./.test(key));
  
  if (!hasFlattened) {
    console.log('✅ Payload already normalized (no flattened keys)');
    return payload;
  }

  console.log('🔨 Unflattening dot-notation keys...');
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
        if (!current[part]) {
          current[part] = [];
        }
        const index = Number(nextPart);
        if (!current[part][index]) {
          current[part][index] = {};
        }
        current = current[part][index];
        i++;
      } else {
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
    }
    
    const finalKey = parts[parts.length - 1];
    current[finalKey] = value;
  }

  console.log('✅ Payload unflattened successfully');
  return normalized;
}

function verifySignature(body: string, signature: string, secret: string): boolean {
  if (!signature || !secret) {
    return false;
  }
  
  try {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(body);
    const digest = hmac.digest('hex');
    
    if (signature.length !== digest.length) {
      return false;
    }
    
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'), 
      Buffer.from(digest, 'hex')
    );
  } catch (error: any) {
    console.error('Signature verification error:', error.message);
    return false;
  }
}

/**
 * Fetches full booking details from Cal.com API
 * 
 * IMPORTANT: Cal.com API v1 uses apiKey as query parameter, NOT Authorization header
 */
async function fetchCalComBooking(uid: string, config: any): Promise<any> {
  console.log(`🔍 Fetching full booking details for UID: ${uid}`);
  
  const calComApiKey = config.calComApiKey;
  console.log('Using Cal.com API Key:', calComApiKey ? '✅ Present' : '❌ Missing');
  
  if (!calComApiKey) {
    console.error('❌ CAL_COM_API_KEY not configured in environment variables');
    throw new Error('Cal.com API key not configured. Please add CAL_COM_API_KEY to your .env file');
  }

  try {
    // Cal.com API v1 authentication uses apiKey as query parameter
    const apiUrl = `https://api.cal.com/v1/bookings?apiKey=${calComApiKey}&uid=${uid}`;
    
    console.log('🌐 Calling Cal.com API...');
    // Don't log full API key for security
    console.log('API URL:', apiUrl.replace(calComApiKey, 'REDACTED'));
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Cal.com API error (${response.status}):`, errorText);
      throw new Error(`Cal.com API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Raw API Response received');
    console.log('📊 API Response structure:', Object.keys(data).join(', '));
    
    // Cal.com API v1 returns bookings as an array
    if (data.bookings && Array.isArray(data.bookings)) {
      console.log(`📊 Found ${data.bookings.length} booking(s) in response`);
      
      // Find the booking with matching UID
      const booking = data.bookings.find((b: any) => b.uid === uid);
      
      if (!booking) {
        console.error(`❌ Booking with UID ${uid} not found in API response`);
        console.log('Available UIDs:', data.bookings.map((b: any) => b.uid).join(', '));
        throw new Error(`Booking with UID ${uid} not found in API response`);
      }
      
      console.log('✅ Found matching booking');
      console.log('📊 Booking data:', JSON.stringify(booking, null, 2));
      return booking;
    }
    
    // Fallback: if single booking object is returned
    if (data.booking) {
      console.log('📊 Single booking object returned');
      console.log('📊 Booking data:', JSON.stringify(data.booking, null, 2));
      return data.booking;
    }
    
    // If data itself is the booking (direct object response)
    if (data.uid === uid) {
      console.log('📊 Direct booking object');
      console.log('📊 Booking data:', JSON.stringify(data, null, 2));
      return data;
    }
    
    // Unexpected response format
    console.error('❌ Unexpected API response structure');
    console.error('Response data:', JSON.stringify(data, null, 2));
    throw new Error('Unexpected API response structure - booking data not found');
    
  } catch (error: any) {
    console.error('❌ Failed to fetch booking from Cal.com:', error.message);
    if (error.stack) {
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}

/**
 * Handles new booking creation
 */
async function handleBookingCreated(payload: any, config: any) {
  console.log('=== HANDLING BOOKING_CREATED ===');
  console.log('Available payload keys:', Object.keys(payload).join(', '));

  const uid = payload.uid;
  
  if (!uid) {
    throw new Error('Missing required field: uid');
  }

  // Check if we have complete data in the webhook
  const hasCompleteData = payload.startTime && payload.endTime;
  
  let bookingData = payload;
  
  if (!hasCompleteData) {
    console.warn('⚠️ Webhook payload missing critical fields (startTime/endTime)');
    console.log('🌐 Fetching complete booking details from Cal.com API...');
    
    try {
      bookingData = await fetchCalComBooking(uid, config);
    } catch (apiError: any) {
      console.error('❌ Failed to fetch booking details:', apiError.message);
      throw new Error(`Cannot process booking: webhook data incomplete and API fetch failed - ${apiError.message}`);
    }
  }

  console.log('📊 Processing booking data:', {
    uid: bookingData.uid,
    id: bookingData.id,
    title: bookingData.title,
    startTime: bookingData.startTime,
    endTime: bookingData.endTime
  });

  // Extract booking data with multiple fallbacks
  const id = bookingData.id || bookingData.bookingId || 0;
  const title = bookingData.title || bookingData.eventType?.title || 'Appointment';
  const description = bookingData.description || bookingData.notes || '';
  const startTime = bookingData.startTime || bookingData.start || bookingData.startDate;
  const endTime = bookingData.endTime || bookingData.end || bookingData.endDate;
  
  // Handle attendees
  const attendees = bookingData.attendees || payload.attendees || [];
  const attendee = attendees[0];
  
  console.log('📊 Extracted booking data:', {
    uid,
    bookingId: id,
    title,
    hasAttendee: !!attendee,
    attendeeName: attendee?.name,
    attendeeEmail: attendee?.email,
    startTime,
    endTime
  });
  
  // Validate required fields
  if (!attendee || !attendee.email) {
    throw new Error('Missing required field: attendee email');
  }
  
  if (!startTime || !endTime) {
    throw new Error('Missing required fields: startTime or endTime even after API fetch');
  }

  // Extract custom fields
  const responses = bookingData.responses || bookingData.customInputs || {};
  const companyName = responses.companyName || bookingData.companyName || null;
  const serviceInterest = responses.serviceInterest || bookingData.serviceInterest || null;
  const specialRequirements = responses.specialRequirements || bookingData.specialRequirements || null;

  // Extract meeting URL
  const metadata = bookingData.metadata || {};
  const meetingUrl = 
    metadata.videoCallUrl || 
    bookingData.meetingUrl || 
    bookingData.location || 
    bookingData.conferenceData?.url || 
    null;

  console.log('💾 Creating appointment in database...');

  try {
    const appointment = await prisma.appointment.create({
      data: {
        calComBookingId: id,
        calComUid: uid,
        attendeeName: attendee.name || 'Unknown',
        attendeeEmail: attendee.email,
        attendeeTimezone: attendee.timeZone || attendee.timezone || 'UTC',
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: 'CONFIRMED',
        companyName,
        serviceInterest,
        specialRequirements,
        meetingUrl
      }
    });

    console.log(`✅ Appointment created successfully!`);
    console.log(`   Database ID: ${appointment.id}`);
    console.log(`   Cal.com UID: ${appointment.calComUid}`);
    console.log(`   Attendee: ${appointment.attendeeName} (${appointment.attendeeEmail})`);
    console.log(`   Time: ${appointment.startTime.toISOString()}`);

    // Send notification emails
    console.log('📧 Sending notification emails...');
    try {
      await Promise.all([
        sendUserConfirmation(appointment),
        sendAdminNotification(appointment, 'NEW_BOOKING')
      ]);
      console.log('✅ Notification emails sent successfully');
    } catch (emailError: any) {
      console.error('⚠️ Failed to send notification emails:', emailError.message);
    }
    
  } catch (dbError: any) {
    console.error('❌ Database error:', dbError.message);
    throw dbError;
  }
}

/**
 * Handles booking reschedule
 */
async function handleBookingRescheduled(payload: any, config: any) {
  console.log('=== HANDLING BOOKING_RESCHEDULED ===');
  
  const uid = payload.uid;
  const rescheduleUid = payload.rescheduleUid || payload.oldBookingUid;

  if (!rescheduleUid || !uid) {
    throw new Error('Missing required fields for reschedule');
  }

  // Fetch full booking details if needed
  let bookingData = payload;
  if (!payload.startTime || !payload.endTime) {
    console.log('🌐 Fetching complete booking details from Cal.com API...');
    bookingData = await fetchCalComBooking(uid, config);
  }

  const id = bookingData.id || 0;
  const startTime = bookingData.startTime || bookingData.start;
  const endTime = bookingData.endTime || bookingData.end;

  const oldBooking = await prisma.appointment.findUnique({
    where: { calComUid: rescheduleUid }
  });

  if (!oldBooking) {
    throw new Error(`Original booking not found: ${rescheduleUid}`);
  }

  await prisma.appointment.update({
    where: { calComUid: rescheduleUid },
    data: {
      status: 'RESCHEDULED',
      rescheduleUid: uid
    }
  });

  const attendees = bookingData.attendees || [];
  const attendee = attendees[0];

  const newAppointment = await prisma.appointment.create({
    data: {
      calComBookingId: id,
      calComUid: uid,
      attendeeName: attendee?.name || oldBooking.attendeeName,
      attendeeEmail: attendee?.email || oldBooking.attendeeEmail,
      attendeeTimezone: attendee?.timeZone || oldBooking.attendeeTimezone,
      title: bookingData.title || oldBooking.title,
      description: bookingData.description || oldBooking.description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      status: 'CONFIRMED',
      companyName: oldBooking.companyName,
      serviceInterest: oldBooking.serviceInterest,
      specialRequirements: oldBooking.specialRequirements,
      meetingUrl: bookingData.meetingUrl || oldBooking.meetingUrl
    }
  });

  console.log(`✅ Appointment rescheduled: ${newAppointment.id}`);

  try {
    await Promise.all([
      sendUserConfirmation(newAppointment),
      sendAdminNotification(newAppointment, 'RESCHEDULED')
    ]);
  } catch (emailError: any) {
    console.error('⚠️ Failed to send emails:', emailError.message);
  }
}

/**
 * Handles booking cancellation
 */
async function handleBookingCancelled(payload: any) {
  console.log('=== HANDLING BOOKING_CANCELLED ===');
  
  const uid = payload.uid;
  const cancellationReason = 
    payload.cancellationReason || 
    payload.reason || 
    payload.cancelReason || 
    null;

  if (!uid) {
    throw new Error('Missing uid for cancellation');
  }

  const appointment = await prisma.appointment.findUnique({
    where: { calComUid: uid }
  });

  if (!appointment) {
    console.warn(`⚠️ Appointment not found: ${uid}`);
    return;
  }

  await prisma.appointment.update({
    where: { calComUid: uid },
    data: {
      status: 'CANCELLED',
      cancellationReason
    }
  });

  console.log(`✅ Appointment cancelled: ${appointment.id}`);

  try {
    await Promise.all([
      sendCancellationEmail(appointment),
      sendAdminNotification(appointment, 'CANCELLED')
    ]);
  } catch (emailError: any) {
    console.error('⚠️ Failed to send emails:', emailError.message);
  }
}