'use client'
import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import type { IncidentInput, Severity } from '@/lib/types'
import { EXAMPLE_INCIDENT } from '@/lib/config'

interface Props {
  onGenerate: (input: IncidentInput) => void
  isLoading: boolean
}

const SEVERITIES: Severity[] = ['P0', 'P1', 'P2', 'P3']
const SEV_LABELS: Record<Severity, string> = {
  P0: 'P0 — Critical (full outage, data loss)',
  P1: 'P1 — High (major feature broken)',
  P2: 'P2 — Medium (degraded performance)',
  P3: 'P3 — Low (minor impact)',
}

const EMPTY: IncidentInput = {
  title: '', severity: 'P1',
  startTime: '', resolvedTime: '',
  affectedSystems: '', userImpact: '',
  description: '', resolution: '',
  teamInvolved: '',
}

export default function IncidentForm({ onGenerate, isLoading }: Props) {
  const [form, setForm] = useState<IncidentInput>(EMPTY)

  function set<K extends keyof IncidentInput>(k: K, v: IncidentInput[K]) {
    setForm(f => ({ ...f, [k]: v }))
  }

  function loadExample() { setForm(EXAMPLE_INCIDENT as IncidentInput) }

  const canSubmit = form.title.trim() && form.description.trim() && form.resolution.trim() && form.userImpact.trim()

  return (
    <div className="rounded-2xl p-6 space-y-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Incident Details</h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Fill in what happened — AI will generate a full blameless post-mortem
          </p>
        </div>
        <button onClick={loadExample}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium"
          style={{ background: 'rgba(16,185,129,0.1)', color: '#6EE7B7', border: '1px solid rgba(16,185,129,0.25)' }}>
          <Sparkles size={12} /> Load Example
        </button>
      </div>

      {/* Row 1 — title + severity */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Incident Title <span style={{ color: 'var(--accent-red)' }}>*</span>
          </label>
          <input
            value={form.title}
            onChange={e => set('title', e.target.value)}
            placeholder="e.g. Payment Service Outage — Checkout Failures"
            className="input-themed"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Severity <span style={{ color: 'var(--accent-red)' }}>*</span>
          </label>
          <select value={form.severity} onChange={e => set('severity', e.target.value as Severity)} className="input-themed">
            {SEVERITIES.map(s => <option key={s} value={s}>{SEV_LABELS[s]}</option>)}
          </select>
        </div>
      </div>

      {/* Row 2 — times */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Incident Start Time
          </label>
          <input type="datetime-local" value={form.startTime} onChange={e => set('startTime', e.target.value)} className="input-themed" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Resolved Time
          </label>
          <input type="datetime-local" value={form.resolvedTime} onChange={e => set('resolvedTime', e.target.value)} className="input-themed" />
        </div>
      </div>

      {/* Affected systems */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          Affected Systems / Services
        </label>
        <input
          value={form.affectedSystems}
          onChange={e => set('affectedSystems', e.target.value)}
          placeholder="e.g. Payment API, Checkout Service, Order Management"
          className="input-themed"
        />
      </div>

      {/* User impact */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          User / Business Impact <span style={{ color: 'var(--accent-red)' }}>*</span>
        </label>
        <input
          value={form.userImpact}
          onChange={e => set('userImpact', e.target.value)}
          placeholder="e.g. 100% checkout failures, ~2,400 blocked transactions, $180K revenue impact"
          className="input-themed"
        />
      </div>

      {/* What happened */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          What Happened <span style={{ color: 'var(--accent-red)' }}>*</span>
        </label>
        <textarea
          value={form.description}
          onChange={e => set('description', e.target.value)}
          rows={4}
          placeholder="Describe what broke, when alerts fired, what the symptoms were, how you detected it…"
          className="input-themed resize-y"
        />
      </div>

      {/* Resolution */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          How Was It Resolved <span style={{ color: 'var(--accent-red)' }}>*</span>
        </label>
        <textarea
          value={form.resolution}
          onChange={e => set('resolution', e.target.value)}
          rows={3}
          placeholder="Describe the steps taken to mitigate and resolve the incident…"
          className="input-themed resize-y"
        />
      </div>

      {/* Team */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          Team / People Involved
        </label>
        <input
          value={form.teamInvolved}
          onChange={e => set('teamInvolved', e.target.value)}
          placeholder="e.g. Platform Engineering, SRE on-call, Engineering Manager"
          className="input-themed"
        />
      </div>

      <button
        onClick={() => onGenerate(form)}
        disabled={!canSubmit || isLoading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white disabled:opacity-40"
        style={{ background: 'var(--accent-grad)' }}>
        {isLoading ? <><Loader2 size={16} className="animate-spin" /> Generating Post-Mortem…</> : <><Sparkles size={16} /> Generate Post-Mortem</>}
      </button>
    </div>
  )
}
