import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import { isLoggedIn } from '@/lib/auth';

const STATUSES = ['new', 'contacted', 'booked', 'dead'];

// --- Helpers ---------------------------------------------------------------

function clean(value, maxLength) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLength);
}

function cleanDate(value) {
  const text = clean(value, 10);
  if (!text || !/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
  const parsed = new Date(`${text}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return text;
}

function cleanExtras(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === 'string')
    .map((item) => item.trim().slice(0, 60))
    .filter(Boolean)
    .slice(0, 20);
}

// --- Update an existing enquiry --------------------------------------------

export async function PATCH(request) {
  // Every admin endpoint checks the cookie itself. Never rely on the page
  // having checked — someone can call this route directly.
  if (!(await isLoggedIn())) {
    return NextResponse.json({ error: 'Not authorised.' }, { status: 401 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const id = Number(body.id);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ error: 'Invalid enquiry id.' }, { status: 400 });
  }

  // null means "leave this field alone".
  const status =
    typeof body.status === 'string' && STATUSES.includes(body.status)
      ? body.status
      : null;

  const depositPaid =
    typeof body.depositPaid === 'boolean' ? body.depositPaid : null;

  const notes =
    typeof body.notes === 'string' ? body.notes.slice(0, 4000) : null;

  if (status === null && depositPaid === null && notes === null) {
    return NextResponse.json({ error: 'Nothing to update.' }, { status: 400 });
  }

  try {
    const sql = getSql();

    // COALESCE keeps the existing value whenever we pass null.
    const rows = await sql`
      UPDATE enquiries
      SET status       = COALESCE(${status}, status),
          deposit_paid = COALESCE(${depositPaid}, deposit_paid),
          notes        = COALESCE(${notes}, notes)
      WHERE id = ${id}
      RETURNING id, status, deposit_paid, notes
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Enquiry not found.' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, enquiry: rows[0] });
  } catch (error) {
    console.error('Enquiry update failed:', error);
    return NextResponse.json({ error: 'Could not save.' }, { status: 500 });
  }
}

// --- Add an enquiry by hand ------------------------------------------------
// For enquiries that arrive by phone, WhatsApp, Facebook and so on. No email
// is sent, because Joe is the one typing it in.

export async function POST(request) {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ error: 'Not authorised.' }, { status: 401 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);

  if (!name) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  }

  // Joe often only gets one or the other on a phone call, so either will do.
  if (!email && !phone) {
    return NextResponse.json(
      { error: 'Add an email address or a phone number.' },
      { status: 400 }
    );
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: 'That email address does not look right.' },
      { status: 400 }
    );
  }

  const status =
    typeof body.status === 'string' && STATUSES.includes(body.status)
      ? body.status
      : 'new';

  try {
    const sql = getSql();

    const rows = await sql`
      INSERT INTO enquiries (
        name, email, phone, event_date, event_type,
        venue, package, timings, music_policy,
        details, extras, contact_pref, price_estimate,
        status, notes, source
      )
      VALUES (
        ${name}, ${email}, ${phone},
        ${cleanDate(body.eventDate)}, ${clean(body.eventType, 80)},
        ${clean(body.venue, 200)}, ${clean(body.package, 120)},
        ${clean(body.timings, 200)}, ${clean(body.musicPolicy, 2000)},
        ${clean(body.details, 4000)},
        ${JSON.stringify(cleanExtras(body.extras))}::jsonb,
        ${clean(body.contactPref, 40)}, ${clean(body.priceEstimate, 40)},
        ${status}, ${clean(body.notes, 4000)},
        ${clean(body.source, 60) || 'Manual'}
      )
      RETURNING id, created_at, name, email, phone, event_date, event_type,
                venue, package, timings, music_policy, details, extras,
                contact_pref, price_estimate, status, deposit_paid, notes, source
    `;

    const row = rows[0];

    return NextResponse.json(
      {
        ok: true,
        enquiry: {
          ...row,
          created_at: row.created_at ? new Date(row.created_at).toISOString() : null,
          event_date: row.event_date ? new Date(row.event_date).toISOString() : null,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Manual enquiry insert failed:', error);
    return NextResponse.json({ error: 'Could not save.' }, { status: 500 });
  }
}