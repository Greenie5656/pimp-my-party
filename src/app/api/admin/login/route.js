import { NextResponse } from 'next/server';
import { checkPassword, createToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!checkPassword(body.password || '')) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set(COOKIE_NAME, createToken(), {
    httpOnly: true, // JavaScript in the browser can't read it
    secure: process.env.NODE_ENV === 'production', // HTTPS only when live
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return response;
}

// Logout — clears the cookie.
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, '', { path: '/', maxAge: 0 });
  return response;
}