import nodemailer from 'nodemailer';
import type { Appointment } from '@prisma/client';

function createTransporter() {
  const config = useRuntimeConfig();
  
  return nodemailer.createTransport({
    host: config.smtpHost,
    port: parseInt(config.smtpPort),
    secure: config.smtpPort === '465',
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass
    }
  });
}

export async function sendUserConfirmation(appointment: Appointment) {
  const transporter = createTransporter();
  const config = useRuntimeConfig();

  const formattedDate = new Date(appointment.startTime).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: appointment.attendeeTimezone
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4F46E5; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 6px; border-left: 4px solid #4F46E5; }
        .info-row { margin: 10px 0; }
        .label { font-weight: bold; color: #4F46E5; }
        .button { display: inline-block; padding: 12px 30px; background: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✓ Appointment Confirmed</h1>
        </div>
        <div class="content">
          <p>Hi ${appointment.attendeeName},</p>
          <p>Your appointment has been successfully scheduled. Here are the details:</p>
          
          <div class="info-box">
            <div class="info-row">
              <span class="label">Date & Time:</span><br>
              ${formattedDate}
            </div>
            <div class="info-row">
              <span class="label">Duration:</span><br>
              ${calculateDuration(appointment.startTime, appointment.endTime)}
            </div>
            ${appointment.companyName ? `
            <div class="info-row">
              <span class="label">Company:</span><br>
              ${appointment.companyName}
            </div>
            ` : ''}
            ${appointment.serviceInterest ? `
            <div class="info-row">
              <span class="label">Service Interest:</span><br>
              ${appointment.serviceInterest}
            </div>
            ` : ''}
            ${appointment.specialRequirements ? `
            <div class="info-row">
              <span class="label">Special Requirements:</span><br>
              ${appointment.specialRequirements}
            </div>
            ` : ''}
            ${appointment.meetingUrl ? `
            <div class="info-row">
              <span class="label">Meeting Link:</span><br>
              <a href="${appointment.meetingUrl}" class="button">Join Meeting</a>
            </div>
            ` : ''}
          </div>
          
          <p>If you need to reschedule or cancel, please use the link provided in your Cal.com confirmation email.</p>
          
          <p>We look forward to meeting with you!</p>
        </div>
        <div class="footer">
          <p>This is an automated confirmation email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Booking System" <${config.smtpUser}>`,
    to: appointment.attendeeEmail,
    subject: `Appointment Confirmed - ${formattedDate}`,
    html: htmlContent
  });

  console.log(`Confirmation email sent to ${appointment.attendeeEmail}`);
}

export async function sendAdminNotification(
  appointment: Appointment, 
  eventType: 'NEW_BOOKING' | 'RESCHEDULED' | 'CANCELLED'
) {
  const transporter = createTransporter();
  const config = useRuntimeConfig();

  const formattedDate = new Date(appointment.startTime).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC'
  });

  const eventLabels = {
    'NEW_BOOKING': '🆕 New Appointment Booked',
    'RESCHEDULED': '🔄 Appointment Rescheduled',
    'CANCELLED': '❌ Appointment Cancelled'
  };

  const eventColors = {
    'NEW_BOOKING': '#10B981',
    'RESCHEDULED': '#F59E0B',
    'CANCELLED': '#EF4444'
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: ${eventColors[eventType]}; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 6px; }
        .info-row { margin: 12px 0; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb; }
        .info-row:last-child { border-bottom: none; }
        .label { font-weight: bold; color: #4B5563; font-size: 12px; text-transform: uppercase; }
        .value { margin-top: 4px; font-size: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${eventLabels[eventType]}</h1>
        </div>
        <div class="content">
          <div class="info-box">
            <div class="info-row">
              <div class="label">Attendee</div>
              <div class="value">${appointment.attendeeName}</div>
            </div>
            <div class="info-row">
              <div class="label">Email</div>
              <div class="value">${appointment.attendeeEmail}</div>
            </div>
            <div class="info-row">
              <div class="label">Date & Time</div>
              <div class="value">${formattedDate} (UTC)</div>
            </div>
            <div class="info-row">
              <div class="label">Timezone</div>
              <div class="value">${appointment.attendeeTimezone}</div>
            </div>
            ${appointment.companyName ? `
            <div class="info-row">
              <div class="label">Company</div>
              <div class="value">${appointment.companyName}</div>
            </div>
            ` : ''}
            ${appointment.serviceInterest ? `
            <div class="info-row">
              <div class="label">Service Interest</div>
              <div class="value">${appointment.serviceInterest}</div>
            </div>
            ` : ''}
            ${appointment.specialRequirements ? `
            <div class="info-row">
              <div class="label">Special Requirements</div>
              <div class="value">${appointment.specialRequirements}</div>
            </div>
            ` : ''}
            ${appointment.cancellationReason ? `
            <div class="info-row">
              <div class="label">Cancellation Reason</div>
              <div class="value">${appointment.cancellationReason}</div>
            </div>
            ` : ''}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Booking System" <${config.smtpUser}>`,
    to: config.adminEmail,
    subject: `${eventLabels[eventType]} - ${appointment.attendeeName}`,
    html: htmlContent
  });

  console.log(`Admin notification sent for ${eventType}`);
}

export async function sendCancellationEmail(appointment: Appointment) {
  const transporter = createTransporter();
  const config = useRuntimeConfig();

  const formattedDate = new Date(appointment.startTime).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: appointment.attendeeTimezone
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #EF4444; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 6px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Appointment Cancelled</h1>
        </div>
        <div class="content">
          <p>Hi ${appointment.attendeeName},</p>
          <p>Your appointment scheduled for <strong>${formattedDate}</strong> has been cancelled.</p>
          
          ${appointment.cancellationReason ? `
          <div class="info-box">
            <strong>Reason:</strong><br>
            ${appointment.cancellationReason}
          </div>
          ` : ''}
          
          <p>If you'd like to schedule a new appointment, please visit our booking page.</p>
          <p>We hope to see you soon!</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Booking System" <${config.smtpUser}>`,
    to: appointment.attendeeEmail,
    subject: `Appointment Cancelled - ${formattedDate}`,
    html: htmlContent
  });

  console.log(`Cancellation email sent to ${appointment.attendeeEmail}`);
}

function calculateDuration(start: Date, end: Date): string {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ${mins > 0 ? `${mins} minutes` : ''}`;
  }
  return `${mins} minutes`;
}
