'use client'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface AuthCtx {
  passcode: string
  isUnlocked: boolean
  unlock: (code: string) => Promise<{ ok: boolean; error?: string }>
  lock: () => void
  getHeaders: () => Record<string, string>
}

const AuthContext = createContext<AuthCtx | null>(null)
const SESSION_KEY = 'postmortem_access_code'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [passcode, setPasscode] = useState('')

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY)
    if (stored) setPasscode(stored)
  }, [])

  async function unlock(code: string): Promise<{ ok: boolean; error?: string }> {
    const res = await fetch('/api/auth/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-code': code },
    })
    if (res.ok) {
      setPasscode(code)
      sessionStorage.setItem(SESSION_KEY, code)
      return { ok: true }
    }
    return { ok: false, error: 'Invalid passcode' }
  }

  function lock() {
    setPasscode('')
    sessionStorage.removeItem(SESSION_KEY)
  }

  function getHeaders(): Record<string, string> {
    return passcode ? { 'x-access-code': passcode } : {}
  }

  return (
    <AuthContext.Provider value={{ passcode, isUnlocked: !!passcode, unlock, lock, getHeaders }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
