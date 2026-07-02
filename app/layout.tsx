import { Suspense } from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/theme'
import { AuthProvider } from '@/context/auth'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import PortfolioBar from '@/components/PortfolioBar'


export const metadata: Metadata = {
  title: 'Incident Post-Mortem Generator — AI-Powered RCA',
  description: 'Generate structured incident post-mortems with 5-Whys RCA, timeline, action items, and stakeholder summary — powered by AI.',
  authors: [{ name: "Atul Sharma", url: "https://atulsharma8790.github.io" }],
  creator: "Atul Sharma",
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}>
        <Suspense fallback={null}><PortfolioBar /></Suspense>
        <ThemeProvider>
          <AuthProvider>
            <DisclaimerBanner />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
