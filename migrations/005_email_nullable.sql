-- 005_email_nullable.sql
-- Applied: during initial build (by hand)
--
-- Enquiries added by hand often come from a phone call where only a name and
-- mobile were taken. The API still requires either an email OR a phone
-- number, but the database no longer insists on email.

ALTER TABLE enquiries ALTER COLUMN email DROP NOT NULL;