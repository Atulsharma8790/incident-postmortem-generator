export type Severity = 'P0' | 'P1' | 'P2' | 'P3'

export interface IncidentInput {
  title: string
  severity: Severity
  startTime: string
  resolvedTime: string
  affectedSystems: string
  userImpact: string
  description: string
  resolution: string
  teamInvolved: string
}

export interface TimelineEvent {
  time: string
  event: string
  type: 'detection' | 'response' | 'mitigation' | 'resolution' | 'communication'
}

export interface ActionItem {
  action: string
  ownerRole: string
  timeline: string
  type: 'preventive' | 'detective' | 'corrective'
  priority: 'high' | 'medium' | 'low'
}

export interface PostMortemOutput {
  executiveSummary: string
  timeline: TimelineEvent[]
  rootCause: string
  fiveWhys: string[]
  contributingFactors: string[]
  whatWorked: string[]
  whatDidntWork: string[]
  actionItems: ActionItem[]
  lessonsLearned: string
  metricsImpact: string
}
