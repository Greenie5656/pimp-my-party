-- 003_add_price_estimate_deposit.sql
-- Applied: during initial build (by hand)
--
-- price_estimate records the number the CUSTOMER was actually shown, so if
-- someone rings up saying "your site quoted me £700" it can be checked
-- rather than guessed at.
--
-- deposit_paid is ticked by hand in the admin dashboard once the £100
-- Stripe payment clears. There is no Stripe webhook.

ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS price_estimate TEXT;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS deposit_paid   BOOLEAN NOT NULL DEFAULT FALSE;