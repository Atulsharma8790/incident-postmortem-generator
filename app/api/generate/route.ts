import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { verifyPasscode, unauthorizedResponse } from '@/lib/auth'
import { buildPrompt } from '@/lib/prompts'
import type { IncidentInput } from '@/lib/types'

const client = new Anthropic()

export async function POST(req: Request) {
  if (!verifyPasscode(req)) return unauthorizedResponse()

  const input: IncidentInput = await req.json()

  if (!input.title || !input.description || !input.resolution) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: buildPrompt(input) }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON found')
    const output = JSON.parse(jsonMatch[0])
    return NextResponse.json(output)
  } catch {
    return NextResponse.json({ error: 'Failed to parse AI response', raw: text }, { status: 500 })
  }
}
