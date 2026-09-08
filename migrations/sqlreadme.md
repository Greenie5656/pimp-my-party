# Database migrations

Every change to the Neon Postgres schema, in the order it was applied.

## Why these exist

Migrations 001–005 were run by hand in the Neon SQL Editor during the original
build, before this folder existed. They're written down here retrospectively so
there's a record — and so the schema can be rebuilt from scratch if it ever
needs to be.

Everything from 006 onwards should be written here **first**, then run.

## Rules

1. **Never edit a migration that's been applied.** Write a new one instead.
2. **Numbered in order.** `006_`, `007_`, and so on. Never reuse a number.
3. **Name says what it does.** `007_add_referral_source.sql`, not `007_update.sql`.
4. **Idempotent where possible** — `IF NOT EXISTS` on adds, so re-running is
   harmless.
5. **One logical change per file.** Easier to reason about and easier to undo.
6. **Comment the why, not the what.** The SQL says what it does. The comment
   should say why it was needed.

## Running a new one

1. Write the file in this folder
2. Paste it into the Neon SQL Editor and run it
3. Record it:

```sql
INSERT INTO schema_migrations (version) VALUES ('006_your_migration_name');
```

4. Commit the file

## First-time setup

If `schema_migrations` doesn't exist yet, run `000_migrations_table.sql` once.
It creates the tracking table and backfills 001–005 as already applied.

Check what's been applied:

```sql
SELECT * FROM schema_migrations ORDER BY version;
```

## Rebuilding from nothing

Run 001 through 005 in order, then 000 to record them.

## Current schema

`enquiries`

| Column | Type | Notes |
|---|---|---|
| `id` | SERIAL PK | |
| `created_at` | TIMESTAMPTZ | defaults to NOW() |
| `name` | TEXT NOT NULL | |
| `email` | TEXT | nullable since 005 |
| `phone` | TEXT | |
| `event_date` | DATE | |
| `event_type` | TEXT | Wedding, Birthday Party, etc |
| `venue` | TEXT | |
| `package` | TEXT | full label inc. price, e.g. `Party DJ — £400` |
| `timings` | TEXT | free text |
| `music_policy` | TEXT | must-plays and do-not-plays |
| `details` | TEXT | "anything else" from the form |
| `extras` | JSONB | array of labels, defaults `[]` |
| `contact_pref` | TEXT | Phone call / WhatsApp / Email |
| `price_estimate` | TEXT | the range the customer was shown |
| `status` | TEXT NOT NULL | `new` / `contacted` / `booked` / `dead`, defaults `new` |
| `deposit_paid` | BOOLEAN NOT NULL | defaults FALSE, ticked by hand |
| `notes` | TEXT | private, admin only |
| `source` | TEXT | `book` from the website, otherwise the channel |

Index: `enquiries_created_at_idx` on `created_at DESC` — what the dashboard
sorts on.

## Things worth knowing

- **`status` and `source` are plain TEXT, not enums.** The API validates
  `status` against a list in `src/app/api/admin/enquiries/route.js`. If you add
  a status there, nothing needs to change here.
- **`extras` is JSONB holding an array of display labels**, not ids. So the
  admin dashboard and the notification email can render it directly.
- **`deposit_paid` is manual.** There's no Stripe webhook — Joe ticks the box
  once the payment lands.
- **`price_estimate` is a string, not a number.** It stores a range like
  `£950 – £1,300`, which is what the customer actually saw.

## Clearing test data

```sql
TRUNCATE TABLE enquiries RESTART IDENTITY;
```

Wipes every row and resets ids to 1. Leaves the schema and
`schema_migrations` alone.