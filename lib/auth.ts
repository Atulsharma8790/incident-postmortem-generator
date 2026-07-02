import { NextResponse } from 'next/server'

export function verifyPasscode(req: Request): boolean {
  const code = req.headers.get('x-access-code') ?? ''
  return code === process.env.ACCESS_PASSCODE
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Invalid passcode' }, { status: 401 })
}
