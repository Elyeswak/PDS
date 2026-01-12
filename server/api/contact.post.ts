import nodemailer from 'nodemailer';

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

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  
  if (!body.name || !body.email || !body.message) {
    throw createError({
      statusCode: 400,
      message: 'Name, email, and message are required'
    });
  }

  const transporter = createTransporter();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #eb3300; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 6px; border-left: 4px solid #eb3300; }
        .info-row { margin: 12px 0; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb; }
        .info-row:last-child { border-bottom: none; }
        .label { font-weight: bold; color: #eb3300; font-size: 12px; text-transform: uppercase; }
        .value { margin-top: 4px; font-size: 16px; }
        .message-box { background: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 New Contact Form Submission</h1>
        </div>
        <div class="content">
          <p>You have received a new message from your website contact form.</p>
          
          <div class="info-box">
            <div class="info-row">
              <div class="label">Name</div>
              <div class="value">${body.name}</div>
            </div>
            <div class="info-row">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${body.email}">${body.email}</a></div>
            </div>
            ${body.selected ? `
            <div class="info-row">
              <div class="label">Selected Option</div>
              <div class="value">${body.selected}</div>
            </div>
            ` : ''}
            <div class="info-row">
              <div class="label">Message</div>
              <div class="message-box">${body.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          
          <p style="font-size: 14px; color: #666; margin-top: 20px;">
            <strong>Received at:</strong> ${new Date().toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              timeZone: 'UTC'
            })} (UTC)
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Website Contact Form" <${config.smtpUser}>`,
      to: config.adminEmail,
      replyTo: body.email,
      subject: `New Contact Form Submission from ${body.name}`,
      html: htmlContent
    });

    console.log(`Contact form email sent to ${config.adminEmail}`);

    return {
      success: true,
      message: 'Your message has been sent successfully!'
    };
  } catch (error) {
    console.error('Error sending contact form email:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to send email. Please try again later.'
    });
  }
});
