import type { IncidentInput } from './types'

export function buildPrompt(input: IncidentInput): string {
  const duration = (() => {
    try {
      const start = new Date(input.startTime)
      const end = new Date(input.resolvedTime)
      const mins = Math.round((end.getTime() - start.getTime()) / 60000)
      const h = Math.floor(mins / 60), m = mins % 60
      return h > 0 ? `${h}h ${m}m` : `${m}m`
    } catch { return 'unknown' }
  })()

  return `You are a senior Site Reliability Engineer and Engineering Manager with 20+ years of experience conducting incident post-mortems at high-scale tech companies (Google, Netflix, Amazon). You write blameless, structured, actionable post-mortems that are used for both executive stakeholders and engineering teams.

Analyze the following incident and produce a comprehensive post-mortem report. Return ONLY valid JSON matching the exact schema below — no markdown, no prose outside the JSON.

INCIDENT DETAILS:
- Title: ${input.title}
- Severity: ${input.severity}
- Started: ${input.startTime}
- Resolved: ${input.resolvedTime}
- Total Duration: ${duration}
- Affected Systems: ${input.affectedSystems}
- User/Business Impact: ${input.userImpact}
- What Happened: ${input.description}
- How It Was Resolved: ${input.resolution}
- Team Involved: ${input.teamInvolved}

Return JSON with this exact structure:
{
  "executiveSummary": "3-4 sentence business-facing summary covering what broke, impact magnitude, duration, and current status. Non-technical language.",
  "timeline": [
    { "time": "HH:MM", "event": "Description of what happened", "type": "detection|response|mitigation|resolution|communication" }
  ],
  "rootCause": "1-2 sentence precise technical root cause statement",
  "fiveWhys": [
    "Why 1: ...",
    "Why 2: ...",
    "Why 3: ...",
    "Why 4: ...",
    "Why 5: ..."
  ],
  "contributingFactors": ["factor 1", "factor 2", "factor 3"],
  "whatWorked": ["thing that worked 1", "thing that worked 2"],
  "whatDidntWork": ["gap 1", "gap 2"],
  "actionItems": [
    {
      "action": "Specific actionable item",
      "ownerRole": "Team or role responsible",
      "timeline": "e.g. Within 1 week / Before next release / Q2",
      "type": "preventive|detective|corrective",
      "priority": "high|medium|low"
    }
  ],
  "lessonsLearned": "2-3 sentences summarizing the key engineering and process lessons",
  "metricsImpact": "Quantified impact: affected users, downtime minutes, error rate, revenue estimate if applicable"
}

Generate 5-7 timeline events, 3-5 contributing factors, 2-3 each for what worked/didn't work, and 4-6 action items. Make action items specific, not generic platitudes.`
}
