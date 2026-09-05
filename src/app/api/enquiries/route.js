import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import { sendEnquiryEmail } from '@/lib/email';

// --- Helpers ---------------------------------------------------------------

// Trim, cap the length, and turn empty strings into null so the database
// stores a proper NULL rather than "".
function clean(value, maxLength) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLength);
}

function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Only accept YYYY-MM-DD, and only if it's a real date.
function cleanDate(value) {
  const text = clean(value, 10);
  if (!text || !/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
  const parsed = new Date(`${text}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return text;
}

// Extras arrive as an array of strings. Anything else becomes an empty array.
function cleanExtras(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === 'string')
    .map((item) => item.trim().slice(0, 60))
    .filter(Boolean)
    .slice(0, 20);
}

// --- Route -----------------------------------------------------------------

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request format.' },
      { status: 400 }
    );
  }

  // Honeypot. A hidden field no human ever fills in. If it has a value,
  // it's a bot, so we pretend it worked and quietly discard it.
    if (clean(body.booking_ref, 100)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const eventDate = cleanDate(body.eventDate);
  const eventType = clean(body.eventType, 80);
  const venue = clean(body.venue, 200);
  const packageName = clean(body.package, 120);
  const timings = clean(body.timings, 200);
  const musicPolicy = clean(body.musicPolicy, 2000);
  const details = clean(body.details, 4000);
  const contactPref = clean(body.contactPref, 40);
  const priceEstimate = clean(body.priceEstimate, 40);
  const source = clean(body.source, 60) || 'book';
  const extras = cleanExtras(body.extras);

  // Only name and email are required. A half-finished enquiry is still a lead.
  if (!name) {
    return NextResponse.json(
      { error: 'Please tell us your name.' },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  try {
    const sql = getSql();

    const rows = await sql`
      INSERT INTO enquiries (
        name, email, phone, event_date, event_type,
        venue, package, timings, music_policy,
        details, extras, contact_pref, price_estimate, source
      )
      VALUES (
        ${name}, ${email}, ${phone}, ${eventDate}, ${eventType},
        ${venue}, ${packageName}, ${timings}, ${musicPolicy},
        ${details}, ${JSON.stringify(extras)}::jsonb,
        ${contactPref}, ${priceEstimate}, ${source}
      )
      RETURNING id, created_at
    `;

    // Email Joe. Deliberately AFTER the save and in its own try/catch —
    // if the email fails, the enquiry is still safely in the database.
    try {
      await sendEnquiryEmail({
        id: rows[0].id,
        name,
        email,
        phone,
        eventDate,
        eventType,
        venue,
        package: packageName,
        extras,
        timings,
        musicPolicy,
        details,
        contactPref,
        priceEstimate,
      });
    } catch (emailError) {
      console.error('Enquiry email failed:', emailError);
    }

    return NextResponse.json(
      { ok: true, id: rows[0].id },
      { status: 201 }
    );
  } catch (error) {
    // Logged for you in Vercel. The visitor gets nothing technical.
    console.error('Enquiry insert failed:', error);
    return NextResponse.json(
      { error: 'Something went wrong saving your enquiry. Please try again.' },
      { status: 500 }
    );
  }
}