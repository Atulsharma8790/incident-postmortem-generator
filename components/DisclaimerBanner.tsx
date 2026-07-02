'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export default function DisclaimerBanner() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!sessionStorage.getItem('postmortem_disclaimer_dismissed')) setVisible(true)
  }, [])
  if (!visible) return null
  function dismiss() { sessionStorage.setItem('postmortem_disclaimer_dismissed', '1'); setVisible(false) }
  return (
    <div className="w-full flex items-center justify-between gap-4 px-4 py-2.5 text-sm"
      style={{ background: 'rgba(59,130,246,0.12)', borderBottom: '1px solid rgba(59,130,246,0.2)', color: '#93C5FD' }}>
      <p className="flex-1 text-center text-xs">
        <strong>AI-generated post-mortems</strong> are a starting point — review and validate all root causes, timelines, and action items before sharing with stakeholders.
      </p>
      <button onClick={dismiss} className="shrink-0 opacity-70 hover:opacity-100"><X size={14} /></button>
    </div>
  )
}
