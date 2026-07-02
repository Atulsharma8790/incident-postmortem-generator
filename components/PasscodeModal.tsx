'use client'
import { useState } from 'react'
import { Lock, X, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/context/auth'

interface Props { onClose: () => void; onUnlocked: () => void }

export default function PasscodeModal({ onClose, onUnlocked }: Props) {
  const { unlock } = useAuth()
  const [code, setCode] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const result = await unlock(code.trim())
    setLoading(false)
    if (result.ok) { onUnlocked(); onClose() }
    else setError('Invalid passcode. Please try again.')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl shadow-2xl p-6 space-y-5"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--accent-grad)' }}>
              <Lock size={16} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Enter Passcode</h2>
              <p className="text-xs" style={{ color: 'var(--text-dimmer)' }}>Required to generate post-mortems</p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-dimmer)' }}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Enter passcode…"
              autoFocus
              className="input-themed pr-10"
            />
            <button type="button" onClick={() => setShow(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-dimmer)' }}>
              {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button type="submit" disabled={!code.trim() || loading}
            className="w-full py-2.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40"
            style={{ background: 'var(--accent-grad)' }}>
            {loading ? 'Verifying…' : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  )
}
