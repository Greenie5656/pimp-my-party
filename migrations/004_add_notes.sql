-- 004_add_notes.sql
-- Applied: during initial build (by hand)
-- Private scratchpad per enquiry, admin dashboard only. Never shown publicly.

ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS notes TEXT;