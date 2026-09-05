import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export const COOKIE_NAME = 'pmp_admin';

function getSecret() {
  if (!process.env.ADMIN_SECRET) {
    throw new Error('ADMIN_SECRET is not set');
  }
  return process.env.ADMIN_SECRET;
}

// The cookie never contains the password — just a fingerprint derived from
// the secret. Someone reading the cookie learns nothing useful.
export function createToken() {
  return createHmac('sha256', getSecret()).update('admin-session').digest('hex');
}

// Compares two strings in constant time, so an attacker can't work out the
// password one character at a time by measuring how long the check takes.
function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function checkPassword(input) {
  if (!process.env.ADMIN_PASSWORD) {
    throw new Error('ADMIN_PASSWORD is not set');
  }
  return safeEqual(input, process.env.ADMIN_PASSWORD);
}

export async function isLoggedIn() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    return safeEqual(token, createToken());
  } catch {
    return false;
  }
}