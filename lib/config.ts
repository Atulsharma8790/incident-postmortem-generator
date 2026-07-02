export const PORTFOLIO_URL = process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? 'https://atulsharma.vercel.app'

export const SEVERITY_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  P0: { label: 'P0 — Critical', color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
  P1: { label: 'P1 — High',     color: '#F97316', bg: 'rgba(249,115,22,0.12)' },
  P2: { label: 'P2 — Medium',   color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  P3: { label: 'P3 — Low',      color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
}

export const EXAMPLE_INCIDENT = {
  title: 'Payment Service Outage — Checkout Failures',
  severity: 'P1',
  startTime: '2024-03-15T14:32:00',
  resolvedTime: '2024-03-15T17:18:00',
  affectedSystems: 'Payment API, Checkout Service, Order Management',
  userImpact: '100% of checkout attempts failed. ~2,400 transactions blocked. Estimated $180K revenue impact over 2h 46m.',
  description: 'The payment service became unresponsive after a routine database connection pool configuration change was deployed to production. The new pool size limit (reduced from 100 to 20) caused connection exhaustion under normal load within minutes. Alerts fired 8 minutes after deployment but the on-call engineer was in a meeting and did not acknowledge for 22 minutes.',
  resolution: 'Rolled back the configuration change to previous pool size settings. Restarted the payment service pods. Verified transaction processing resumed. Gradual traffic ramp confirmed stability.',
  teamInvolved: 'Platform Engineering, Payments Team, SRE on-call, Engineering Manager',
}
