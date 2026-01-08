import { prisma } from '~/server/utils/prisma';
import crypto from 'crypto';
import {
  sendAdminNotification,
  sendUserConfirmation,
  sendCancellationEmail
} from '../../utils/email';

interface CalComBooking {
  id: number;
  uid: string;
  title?: string;
  description?: string;
  startTime: string;
  endTime: string;
  status?: string;
  attendees?: Array<{
    name?: string;
    email: string;
    timeZone?: string;
    timezone?: string;
    phoneNumber?: string;
  }>;
  responses?: Record<string, any>;
  customInputs?: Record<string, any>;
  metadata?: Record<string, any>;
  meetingUrl?: string;
  location?: string;
  cancellationReason?: string;
  rescheduleUid?: string;
}

export default defineEventHandler(async (event) => {
  const startTime = Date.now();
  let eventType = 'UNKNOWN';
  let rawPayload: any = {};
  let success = false;
  let errorMessage: string | null = null;

  try {
    // 1. Read raw body
    const body = await readRawBody(event);
    if (!body) {
      throw createError({ 
        statusCode: 400, 
        message: 'Missing request body' 
      });
    }

    // 2. Get signature header
    const signature = getHeader(event, 'x-cal-signature-256') || 
                     getHeader(event, 'x-cal-signature');

    // 3. Get runtime config
    const config = useRuntimeConfig();

    // 4. Verify signature if present
    if (signature && config.calComWebhookSecret) {
      const isValid = verifySignature(body, signature, config.calComWebhookSecret);
      if (!isValid) {
        throw createError({ 
          statusCode: 401, 
          message: 'Invalid webhook signature' 
        });
      }
      console.log('✅ Webhook signature verified');
    } else {
      console.warn('⚠️ No signature verification (missing secret or signature)');
    }

    // 5. Parse the raw webhook body
    rawPayload = JSON.parse(body);
    console.log('📦 Raw webhook payload:', JSON.stringify(rawPayload, null, 2));

    // 6. Extract the actual booking data from payload.payload
    // Cal.com sends: { triggerEvent: "...", createdAt: "...", payload: { ...actual booking data... } }
    const bookingPayload = rawPayload.payload || rawPayload;
    console.log('📦 Booking payload extracted:', JSON.stringify(bookingPayload, null, 2));

    // 7. Detect event type from triggerEvent
    eventType = detectEventType(bookingPayload, rawPayload);
    console.log(`🎯 Detected event type: ${eventType}`);

    // 8. Route to appropriate handler - pass the BOOKING payload, not raw payload
    switch (eventType) {
      case 'PING':
        console.log('🏓 PING received - webhook connection successful');
        break;

      case 'BOOKING_CREATED':
        await handleBookingCreated(bookingPayload, config);
        break;

      case 'BOOKING_RESCHEDULED':
        await handleBookingRescheduled(bookingPayload, config);
        break;

      case 'BOOKING_CANCELLED':
        await handleBookingCancelled(bookingPayload);
        break;

      case 'REQUIRES_API_CHECK':
        await handleMinimalPayload(bookingPayload, config);
        break;

      default:
        console.log(`ℹ️ Unhandled event type: ${eventType}`);
    }

    success = true;
    console.log(`✅ Webhook processed successfully: ${eventType}`);

    return { success: true, eventType };

  } catch (error: any) {
    success = false;
    errorMessage = error.message || 'Unknown error';
    console.error('❌ Webhook error:', errorMessage);
    console.error('Stack:', error.stack);

    throw createError({ 
      statusCode: error.statusCode || 500, 
      message: errorMessage 
    });

  } finally {
    // Always log the webhook attempt
    try {
      const processingTime = Date.now() - startTime;
      console.log('💾 Attempting to save webhook log...');
      
      const log = await prisma.webhookLog.create({
        data: {
          eventType,
          payload: rawPayload,
          success,
          errorMessage,
          processingTime
        }
      });
      
      console.log(`✅ Webhook logged successfully! ID: ${log.id} (${processingTime}ms)`);
      
      // Verify it was saved
      const count = await prisma.webhookLog.count();
      console.log(`📊 Total webhook logs in database: ${count}`);
      
    } catch (logError: any) {
      console.error('❌ Failed to log webhook:', logError.message);
      console.error('Stack:', logError.stack);
      console.error('Prisma client status:', prisma ? 'initialized' : 'not initialized');
    }
  }
});

/* -------------------------------------------------------------------------- */
/*                               CORE HANDLERS                                */
/* -------------------------------------------------------------------------- */

async function handleBookingCreated(payload: CalComBooking, config: any) {
  console.log('🆕 Processing BOOKING_CREATED');
  console.log('📦 Full payload received:', JSON.stringify(payload, null, 2));

  const uid = payload.uid;
  if (!uid) {
    throw new Error('Missing uid in payload');
  }

  // Use the payload as-is (it's already the booking data from Cal.com)
  const bookingData = payload;

  const bookingId = bookingData.bookingId || bookingData.id;
  if (!bookingId) {
    throw new Error('Missing Cal.com booking ID (bookingId or id)');
  }

  // Skip cancelled or rejected bookings
  const status = (bookingData.status || '').toUpperCase();
  if (status === 'CANCELLED' || status === 'REJECTED') {
    console.log(`⏭️ Skipping ${status} booking`);
    return;
  }

  // ============================================
  // EXTRACT ATTENDEE DATA from attendees[0]
  // ============================================
  const attendee = bookingData.attendees?.[0];
  if (!attendee?.email) {
    throw new Error('Missing attendee email in attendees[0]');
  }

  console.log('👤 RAW ATTENDEE DATA:', JSON.stringify(attendee, null, 2));

  const attendeeName = attendee.name || 'Unknown';
  const attendeeEmail = attendee.email;
  const attendeeTimezone = attendee.timeZone || attendee.timezone || 'UTC';
  const attendeePhone = attendee.phoneNumber || null;

  console.log('👤 EXTRACTED ATTENDEE:', {
    name: attendeeName,
    email: attendeeEmail,
    timezone: attendeeTimezone,
    phone: attendeePhone
  });

  // ============================================
  // EXTRACT CUSTOM FIELDS from responses
  // ============================================
  const responses = bookingData.responses || {};
  console.log('📋 RAW RESPONSES:', JSON.stringify(responses, null, 2));

  // Extract VIM - it's under responses.Vim.value
  const vimField = responses.Vim || responses.vim;
  const vimValue = vimField?.value || null;

  // Extract reason - it's under responses.reason.value
  const reasonField = responses.reason || responses.Reason;
  const reasonValue = reasonField?.value || null;

  // Extract phone from responses if not in attendee
  const phoneField = responses.attendeePhoneNumber || responses.phoneNumber || responses.phone;
  const phoneFromResponses = phoneField?.value || null;
  const finalPhone = attendeePhone || phoneFromResponses;

  console.log('📋 EXTRACTED CUSTOM FIELDS:', {
    vim: vimValue,
    reason: reasonValue,
    phone: finalPhone
  });

  // ============================================
  // EXTRACT OTHER FIELDS
  // ============================================
  const videoCallUrl = bookingData.videoCallData?.url || 
                      bookingData.metadata?.videoCallUrl || 
                      bookingData.meetingUrl || 
                      null;

  const title = bookingData.title || bookingData.eventTitle || 'Appointment';
  const description = bookingData.description || bookingData.eventDescription || '';

  console.log('📋 OTHER FIELDS:', {
    videoCallUrl,
    title,
    description,
    startTime: bookingData.startTime,
    endTime: bookingData.endTime
  });

  // ============================================
  // SAVE TO DATABASE
  // ============================================
  const appointmentData = {
    calComBookingId: bookingId,
    calComUid: uid,
    
    // Attendee info from attendees[0]
    attendeeName: attendeeName,
    attendeeEmail: attendeeEmail,
    attendeeTimezone: attendeeTimezone,
    attendeePhoneNumber: finalPhone,
    
    // Booking details
    title: title,
    description: description,
    startTime: new Date(bookingData.startTime),
    endTime: new Date(bookingData.endTime),
    status: 'CONFIRMED' as const,
    
    // Custom fields from responses
    vim: vimValue,
    reason: reasonValue,
    
    // Meeting info
    meetingUrl: videoCallUrl,
    
    // Other custom fields (if they exist)
    companyName: responses.companyName?.value || null,
    serviceInterest: responses.serviceInterest?.value || null,
    specialRequirements: responses.notes?.value || responses.specialRequirements?.value || null
  };

  console.log('💾 SAVING APPOINTMENT WITH DATA:', JSON.stringify(appointmentData, null, 2));

  // IDEMPOTENT UPSERT - Use calComUid as unique identifier
  const appointment = await prisma.appointment.upsert({
    where: {
      calComUid: uid
    },
    update: {
      status: appointmentData.status,
      startTime: appointmentData.startTime,
      endTime: appointmentData.endTime,
      meetingUrl: appointmentData.meetingUrl,
      attendeePhoneNumber: appointmentData.attendeePhoneNumber,
      vim: appointmentData.vim,
      reason: appointmentData.reason,
      companyName: appointmentData.companyName,
      serviceInterest: appointmentData.serviceInterest,
      specialRequirements: appointmentData.specialRequirements
    },
    create: appointmentData
  });

  console.log(`✅ APPOINTMENT SAVED SUCCESSFULLY!`);
  console.log(`📊 Saved appointment:`, {
    id: appointment.id,
    calComUid: appointment.calComUid,
    attendeeName: appointment.attendeeName,
    attendeeEmail: appointment.attendeeEmail,
    attendeePhoneNumber: appointment.attendeePhoneNumber,
    vim: appointment.vim,
    reason: appointment.reason
  });

  // Send notifications (don't fail if email fails)
  try {
    await Promise.all([
      sendUserConfirmation(appointment),
      sendAdminNotification(appointment, 'NEW_BOOKING')
    ]);
    console.log('📧 Notifications sent');
  } catch (emailError: any) {
    console.error('⚠️ Email notification failed:', emailError.message);
  }
}

async function handleBookingCancelled(payload: CalComBooking) {
  console.log('❌ Processing BOOKING_CANCELLED');

  const uid = payload.uid || (payload as any).bookingUid;
  if (!uid) {
    console.warn('⚠️ No uid found for cancellation');
    return;
  }

  // Helper function to extract value from Cal.com response format
  const extractValue = (field: any): string | null => {
    if (!field) return null;
    if (typeof field === 'string') return field;
    if (field.value !== undefined) return field.value;
    return null;
  };

  // Find by uid OR bookingId (Cal.com sends bookingId in payload)
  const bookingId = (payload as any).bookingId || (payload as any).id;
  
  let appointment = await prisma.appointment.findUnique({
    where: { calComUid: uid }
  });

  // If not found by uid, try by bookingId
  if (!appointment && bookingId) {
    appointment = await prisma.appointment.findUnique({
      where: { calComBookingId: bookingId }
    });
  }

  if (!appointment) {
    console.log('ℹ️ Appointment not found for cancellation');
    return;
  }

  if (appointment.status === 'CANCELLED') {
    console.log('ℹ️ Already cancelled, skipping');
    return;
  }

  // Extract cancellation reason
  const cancellationReason = (payload as any).cancellationReason ||
                            (payload as any).reason ||
                            extractValue((payload as any).responses?.cancellationReason) ||
                            (payload as any).cancelReason ||
                            'Cancelled by user';

  // Update to cancelled
  const updated = await prisma.appointment.update({
    where: { id: appointment.id },
    data: {
      status: 'CANCELLED',
      cancellationReason
    }
  });

  console.log(`✅ Appointment cancelled: ${updated.id}`);
  console.log(`📊 Cancellation reason: ${cancellationReason}`);

  // Send notifications
  try {
    await Promise.all([
      sendCancellationEmail(updated),
      sendAdminNotification(updated, 'CANCELLED')
    ]);
    console.log('📧 Cancellation emails sent');
  } catch (emailError: any) {
    console.error('⚠️ Email notification failed:', emailError.message);
  }
}

async function handleBookingRescheduled(payload: CalComBooking, config: any) {
  console.log('🔄 Processing BOOKING_RESCHEDULED');

  const newUid = payload.uid;
  const oldUid = payload.rescheduleUid || (payload as any).oldBookingUid;

  if (!newUid) {
    throw new Error('Missing new booking uid');
  }

  if (!oldUid) {
    console.warn('⚠️ No old uid found, treating as new booking');
    await handleBookingCreated(payload, config);
    return;
  }

  let bookingData = payload;

  // Fetch full data if minimal
  if (!payload.id || !payload.startTime) {
    console.log('📡 Fetching full booking data from Cal.com API');
    bookingData = await fetchCalComBooking(newUid, config);
  }

  if (!bookingData.id) {
    throw new Error('Missing Cal.com booking ID for reschedule');
  }

  // Find and update old booking
  const oldBooking = await prisma.appointment.findUnique({
    where: { calComUid: oldUid }
  });

  if (oldBooking) {
    await prisma.appointment.update({
      where: { id: oldBooking.id },
      data: {
        status: 'RESCHEDULED',
        rescheduleUid: newUid
      }
    });
    console.log(`💾 Old appointment marked as rescheduled: ${oldBooking.id}`);
  }

  // Create or update new booking
  const attendee = bookingData.attendees?.[0];
  const responses = bookingData.responses || 
                   bookingData.userFieldsResponses || 
                   bookingData.customInputs || 
                   {};

  // Helper function to extract value from Cal.com response format
  const extractValue = (field: any): string | null => {
    if (!field) return null;
    if (typeof field === 'string') return field;
    if (field.value !== undefined) {
      if (typeof field.value === 'object' && field.value !== null) {
        return field.value.value || null;
      }
      return field.value;
    }
    return null;
  };

  const phoneNumber = attendee?.phoneNumber || 
                     extractValue(responses.attendeePhoneNumber) ||
                     extractValue(responses.phoneNumber) ||
                     oldBooking?.attendeePhoneNumber || 
                     null;

  const vim = extractValue(responses.Vim) || 
             extractValue(responses.vim) || 
             oldBooking?.vim || 
             null;

  const reason = extractValue(responses.reason) || 
                oldBooking?.reason || 
                null;

  const notes = extractValue(responses.notes) || 
               extractValue(responses.specialRequirements) ||
               oldBooking?.specialRequirements ||
               null;

  const appointmentData = {
    startTime: new Date(bookingData.startTime),
    endTime: new Date(bookingData.endTime),
    status: 'CONFIRMED' as const,
    meetingUrl: bookingData.meetingUrl || 
               bookingData.videoCallData?.url ||
               bookingData.location || 
               oldBooking?.meetingUrl || 
               null,
    companyName: extractValue(responses.companyName) || oldBooking?.companyName || null,
    serviceInterest: extractValue(responses.serviceInterest) || oldBooking?.serviceInterest || null,
    specialRequirements: notes,
    reason: reason,
    vim: vim,
    attendeePhoneNumber: phoneNumber
  };

  const newAppointment = await prisma.appointment.upsert({
    where: {
      calComUid: newUid
    },
    update: appointmentData,
    create: {
      calComBookingId: bookingData.id,
      calComUid: newUid,
      attendeeName: attendee?.name || oldBooking?.attendeeName || 'Unknown',
      attendeeEmail: attendee?.email || oldBooking?.attendeeEmail || '',
      attendeeTimezone: attendee?.timeZone || oldBooking?.attendeeTimezone || 'UTC',
      title: bookingData.title || oldBooking?.title || 'Appointment',
      description: bookingData.description || oldBooking?.description || '',
      ...appointmentData
    }
  });

  console.log(`💾 New appointment created from reschedule: ${newAppointment.id}`);

  // Send notifications
  try {
    await Promise.all([
      sendUserConfirmation(newAppointment),
      sendAdminNotification(newAppointment, 'RESCHEDULED')
    ]);
    console.log('📧 Reschedule notifications sent');
  } catch (emailError: any) {
    console.error('⚠️ Email notification failed:', emailError.message);
  }
}

async function handleMinimalPayload(payload: CalComBooking, config: any) {
  console.log('🔍 Handling minimal payload, fetching full data');
  const booking = await fetchCalComBooking(payload.uid, config);
  await handleBookingCreated(booking, config);
}

/* -------------------------------------------------------------------------- */
/*                               HELPER FUNCTIONS                             */
/* -------------------------------------------------------------------------- */

function verifySignature(body: string, signature: string, secret: string): boolean {
  try {
    // Remove 'sha256=' prefix if present
    const sig = signature.replace(/^sha256=/, '');
    
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(body);
    const computed = hmac.digest('hex');
    
    // Use timing-safe comparison
    return crypto.timingSafeEqual(
      Buffer.from(sig, 'hex'),
      Buffer.from(computed, 'hex')
    );
  } catch (error) {
    console.error('❌ Signature verification error:', error);
    return false;
  }
}

function normalizeCalComPayload(payload: any): CalComBooking {
  // Cal.com webhook structure: { triggerEvent, createdAt, payload: {...} }
  // Return the inner payload which contains the actual booking data
  return payload.payload || payload;
}

function detectEventType(normalized: CalComBooking, raw: any): string {
  // Check for PING event first (Cal.com webhook test)
  if (raw.triggerEvent && raw.triggerEvent.toUpperCase() === 'PING') {
    return 'PING';
  }

  // Check triggerEvent (most reliable) - this is in the RAW payload, not normalized
  if (raw.triggerEvent) {
    const trigger = raw.triggerEvent.toLowerCase();
    if (trigger.includes('cancel')) return 'BOOKING_CANCELLED';
    if (trigger.includes('reschedul')) return 'BOOKING_RESCHEDULED';
    return 'BOOKING_CREATED';
  }

  // Check status in the booking data
  const status = (normalized.status || '').toUpperCase();
  if (status === 'CANCELLED') return 'BOOKING_CANCELLED';

  // Check for reschedule indicators
  if (normalized.rescheduleUid || raw.oldBookingUid || raw.rescheduleUid) {
    return 'BOOKING_RESCHEDULED';
  }

  // Check if we have minimal data (need API fetch)
  if (!normalized.startTime || !normalized.endTime || (!normalized.id && !normalized.bookingId)) {
    return 'REQUIRES_API_CHECK';
  }

  // Default to created
  return 'BOOKING_CREATED';
}

async function fetchCalComBooking(uid: string, config: any): Promise<CalComBooking> {
  console.log(`📡 Fetching booking: ${uid}`);
  
  const apiKey = config.calComApiKey;
  if (!apiKey) {
    throw new Error('CAL_COM_API_KEY not configured');
  }

  const url = `https://api.cal.com/v1/bookings?apiKey=${apiKey}&uid=${uid}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Cal.com API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log('📦 API response:', JSON.stringify(data, null, 2));

  // Cal.com can return data in different structures
  const booking = data.bookings?.[0] || data.booking || data;
  
  if (!booking || !booking.id) {
    throw new Error('Invalid booking data received from Cal.com API');
  }

  return booking;
}
