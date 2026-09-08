-- 002_add_package_timings_music.sql
-- Applied: during initial build (by hand)
-- Fields the five-step booking form collects that had nowhere to go.

ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS package      TEXT;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS timings      TEXT;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS music_policy TEXT;