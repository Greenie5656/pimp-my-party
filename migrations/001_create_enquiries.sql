-- 001_create_enquiries.sql
-- Applied: during initial build (by hand)
-- Creates the enquiries table and the index the admin dashboard sorts on.

CREATE TABLE IF NOT EXISTS enquiries (
  id            SERIAL PRIMARY KEY,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,

  event_date    DATE,
  event_type    TEXT,
  venue         TEXT,

  details       TEXT,
  extras        JSONB DEFAULT '[]'::jsonb,
  contact_pref  TEXT,

  status        TEXT NOT NULL DEFAULT 'new',
  source        TEXT
);

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx
  ON enquiries (created_at DESC);