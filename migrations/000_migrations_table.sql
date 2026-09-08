-- 000_migrations_table.sql
-- Tracks which migrations have been applied.
-- Run this ONCE, before anything else.

CREATE TABLE IF NOT EXISTS schema_migrations (
  version     TEXT PRIMARY KEY,
  applied_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- The enquiries table and migrations 001-005 were applied by hand during the
-- original build, before this system existed. Backfilled here so the record
-- is complete.
INSERT INTO schema_migrations (version) VALUES
  ('001_create_enquiries'),
  ('002_add_package_timings_music'),
  ('003_add_price_estimate_deposit'),
  ('004_add_notes'),
  ('005_email_nullable')
ON CONFLICT (version) DO NOTHING;

SELECT * FROM schema_migrations ORDER BY version;