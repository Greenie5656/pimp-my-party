import { neon } from '@neondatabase/serverless';

// Created once, then reused. Serverless functions can be reused between
// requests, so caching this avoids rebuilding the client every time.
let cached;

export function getSql() {
  if (!cached) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set');
    }
    cached = neon(process.env.DATABASE_URL);
  }
  return cached;
}