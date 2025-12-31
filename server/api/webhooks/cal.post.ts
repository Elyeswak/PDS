import { prisma } from '~/server/utils/prisma';
import crypto from 'crypto';
import {
  sendAdminNotification,
  sendUserConfirmation,
  sendCancellationEmail
} from '../../utils/email';

export default defineEventHandler(async (event) => {
  try {
    const body = await readRawBody(event);
    const signature = getHeader(event, 'x-cal-signature');

    if (!body) {
      throw createError({ statusCode: 400, message: 'Missing request body' });
    }

    const config = useRuntimeConfig();

    // Verify signature
    if (signature && config.calComWebhookSecret) {
      if (!verifySignature(body, signature, config.calComWebhookSecret)) {
        throw createError({ statusCode: 401, message: 'Invalid webhook signature' });
      }
    }

    const rawPayload = JSON.parse(body);
    const normalized = normalizeCalComPayload(rawPayload);
    const eventType = detectEventType(normalized, rawPayload);

    // Log webhook
    await prisma.webhookLog.create({
      data: {
        eventType,
        payload: rawPayload,
        success: true
      }
    });

    switch (eventType) {
      case 'REQUIRES_API_CHECK':
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
    }

    return { success: true };

  } catch (error: any) {
    console.error('❌ Webhook error:', error.message);
    throw createError({ statusCode: 500, message: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/*                               CORE HANDLERS                                 */
/* -------------------------------------------------------------------------- */

async function handleBookingCreated(payload: any, config: any) {
  const uid = payload.uid;
  if (!uid) throw new Error('Missing uid');

  let bookingData = payload;

  if (!payload.startTime || !payload.endTime || !payload.id) {
    bookingData = await fetchCalComBooking(uid, config);
  }

  if (!bookingData.id) {
    throw new Error('Missing Cal.com booking ID');
  }

  const status = (bookingData.status || '').toUpperCase();
  if (status === 'CANCELLED' || status === 'REJECTED') {
    return;
  }

  const attendee = bookingData.attendees?.[0];
  if (!attendee?.email) {
    throw new Error('Missing attendee email');
  }

  const responses = bookingData.responses || bookingData.customInputs || {};

  // 🔒 IDEMPOTENT UPSERT
  const appointment = await prisma.appointment.upsert({
    where: {
      calComBookingId: bookingData.id
    },
    update: {
      status: 'CONFIRMED',
      startTime: new Date(bookingData.startTime),
      endTime: new Date(bookingData.endTime),
      meetingUrl: bookingData.meetingUrl || bookingData.location || null,
      companyName: responses.companyName || null,
      serviceInterest: responses.serviceInterest || null,
      specialRequirements: responses.specialRequirements || null
    },
    create: {
      calComBookingId: bookingData.id,
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

  try {
    await Promise.all([
      sendUserConfirmation(appointment),
      sendAdminNotification(appointment, 'NEW_BOOKING')
    ]);
  } catch {}
}

async function handleBookingCancelled(payload: any) {
  const uid = payload.uid || payload.bookingUid;
  if (!uid) return;

  const appointment = await prisma.appointment.findUnique({
    where: { calComUid: uid }
  });

  if (!appointment || appointment.status === 'CANCELLED') return;

  const updated = await prisma.appointment.update({
    where: { id: appointment.id },
    data: {
      status: 'CANCELLED',
      cancellationReason:
        payload.cancellationReason ||
        payload.reason ||
        payload.cancelReason ||
        'Cancelled by user'
    }
  });

  try {
    await Promise.all([
      sendCancellationEmail(updated),
      sendAdminNotification(updated, 'CANCELLED')
    ]);
  } catch {}
}

async function handleBookingRescheduled(payload: any, config: any) {
  const newUid = payload.uid;
  const oldUid = payload.rescheduleUid || payload.oldBookingUid;

  if (!newUid || !oldUid) return;

  let bookingData = payload;
  if (!payload.id || !payload.startTime) {
    bookingData = await fetchCalComBooking(newUid, config);
  }

  if (!bookingData.id) {
    throw new Error('Missing Cal.com booking ID for reschedule');
  }

  const oldBooking = await prisma.appointment.findUnique({
    where: { calComUid: oldUid }
  });

  if (!oldBooking) return;

  await prisma.appointment.update({
    where: { id: oldBooking.id },
    data: {
      status: 'RESCHEDULED',
      rescheduleUid: newUid
    }
  });

  const attendee = bookingData.attendees?.[0];

  await prisma.appointment.upsert({
    where: {
      calComBookingId: bookingData.id
    },
    update: {
      startTime: new Date(bookingData.startTime),
      endTime: new Date(bookingData.endTime),
      status: 'CONFIRMED'
    },
    create: {
      calComBookingId: bookingData.id,
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
}

/* -------------------------------------------------------------------------- */
/*                               HELPERS                                      */
/* -------------------------------------------------------------------------- */

function verifySignature(body: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(body);
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(hmac.digest('hex'))
  );
}

function normalizeCalComPayload(payload: any): any {
  return payload.payload || payload;
}

function detectEventType(normalized: any, raw: any): string {
  if (raw.triggerEvent) {
    const t = raw.triggerEvent.toUpperCase();
    if (t.includes('CANCEL')) return 'BOOKING_CANCELLED';
    if (t.includes('RESCHEDUL')) return 'BOOKING_RESCHEDULED';
    return 'BOOKING_CREATED';
  }

  const status = (normalized.status || '').toUpperCase();
  if (status === 'CANCELLED') return 'BOOKING_CANCELLED';
  if (normalized.rescheduleUid || raw.oldBookingUid) return 'BOOKING_RESCHEDULED';

  return 'BOOKING_CREATED';
}

async function fetchCalComBooking(uid: string, config: any) {
  const res = await fetch(
    `https://api.cal.com/v1/bookings?apiKey=${config.calComApiKey}&uid=${uid}`
  );

  const data = await res.json();
  return data.bookings?.[0] || data.booking || data;
}

async function handleMinimalPayload(payload: any, config: any) {
  const booking = await fetchCalComBooking(payload.uid, config);
  await handleBookingCreated(booking, config);
}
