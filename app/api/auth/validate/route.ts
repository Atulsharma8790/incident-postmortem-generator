import { NextResponse } from 'next/server'
import { verifyPasscode, unauthorizedResponse } from '@/lib/auth'

export async function POST(req: Request) {
  if (!verifyPasscode(req)) return unauthorizedResponse()
  return NextResponse.json({ ok: true })
}
