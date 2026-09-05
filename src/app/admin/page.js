import { isLoggedIn } from '@/lib/auth';
import { getSql } from '@/lib/db';
import AdminLogin from '@/component/AdminLogin';
import AdminDashboard from '@/component/AdminDashboard';

export const metadata = {
  title: 'Bookings Dashboard',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

// Never cache this page — Joe needs to see enquiries the moment they land.
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const authed = await isLoggedIn();

  if (!authed) {
    return <AdminLogin />;
  }

  const sql = getSql();

  const rows = await sql`
    SELECT id, created_at, name, email, phone, event_date, event_type,
           venue, package, timings, music_policy, details, extras,
           contact_pref, price_estimate, status, deposit_paid, notes
    FROM enquiries
    ORDER BY created_at DESC
    LIMIT 200
  `;

  // Dates come back as JavaScript Date objects. Turn them into plain strings
  // before handing them to a client component.
  const enquiries = rows.map((row) => ({
    ...row,
    created_at: row.created_at ? new Date(row.created_at).toISOString() : null,
    event_date: row.event_date ? new Date(row.event_date).toISOString() : null,
  }));

  return <AdminDashboard enquiries={enquiries} />;
}