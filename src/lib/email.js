import { Resend } from 'resend';

let cached;

function getResend() {
  if (!cached) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set');
    }
    cached = new Resend(process.env.RESEND_API_KEY);
  }
  return cached;
}

// Escape anything the customer typed, so a stray < can't break the email.
function esc(value) {
  if (!value) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// One table row. Skipped entirely when there's no value.
function row(label, value) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#666;font-size:13px;white-space:nowrap;vertical-align:top;">${esc(label)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#111;font-size:14px;font-weight:600;">${esc(value)}</td>
    </tr>`;
}

function formatDate(value) {
  if (!value) return '';
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export async function sendEnquiryEmail(enquiry) {
  const to = process.env.ENQUIRY_TO;
  const from = process.env.ENQUIRY_FROM;

  if (!to || !from) {
    throw new Error('ENQUIRY_TO or ENQUIRY_FROM is not set');
  }

  const extrasList =
    Array.isArray(enquiry.extras) && enquiry.extras.length
      ? enquiry.extras.join(', ')
      : '';

  const subject = enquiry.eventDate
    ? `New enquiry — ${enquiry.name}, ${formatDate(enquiry.eventDate)}`
    : `New enquiry — ${enquiry.name}`;

  const html = `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:#f6f6f8;padding:24px;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e5eb;">

      <div style="background:linear-gradient(90deg,#9333ea,#db2777);padding:24px;">
        <h1 style="margin:0;color:#ffffff;font-size:20px;">New Booking Enquiry</h1>
        <p style="margin:6px 0 0;color:#f0e6ff;font-size:13px;">Enquiry #${esc(enquiry.id)} &middot; via the website booking form</p>
      </div>

      <table style="width:100%;border-collapse:collapse;">
        ${row('Name', enquiry.name)}
        ${row('Email', enquiry.email)}
        ${row('Phone', enquiry.phone)}
        ${row('Prefers', enquiry.contactPref)}
        ${row('Event type', enquiry.eventType)}
        ${row('Event date', formatDate(enquiry.eventDate))}
        ${row('Venue', enquiry.venue)}
        ${row('Package', enquiry.package)}
        ${row('Extras', extrasList)}
        ${row('Timings', enquiry.timings)}
        ${row('Quoted', enquiry.priceEstimate)}
      </table>

      ${
        enquiry.musicPolicy
          ? `<div style="padding:16px 14px;border-top:1px solid #eee;">
               <p style="margin:0 0 6px;color:#666;font-size:13px;">Music notes</p>
               <p style="margin:0;color:#111;font-size:14px;white-space:pre-wrap;">${esc(enquiry.musicPolicy)}</p>
             </div>`
          : ''
      }

      ${
        enquiry.details
          ? `<div style="padding:16px 14px;border-top:1px solid #eee;">
               <p style="margin:0 0 6px;color:#666;font-size:13px;">Anything else</p>
               <p style="margin:0;color:#111;font-size:14px;white-space:pre-wrap;">${esc(enquiry.details)}</p>
             </div>`
          : ''
      }

      <div style="padding:20px 14px;background:#fafafa;border-top:1px solid #eee;">
        <a href="mailto:${esc(enquiry.email)}"
           style="display:inline-block;background:#9333ea;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:600;font-size:14px;">
          Reply to ${esc(enquiry.name.split(' ')[0])}
        </a>
        <p style="margin:14px 0 0;color:#888;font-size:12px;">
          You can also just hit reply — this email replies straight to the customer.
        </p>
      </div>

    </div>
  </div>`;

  const resend = getResend();

  return resend.emails.send({
    from,
    to,
    subject,
    html,
    replyTo: enquiry.email,
  });
}