'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    })
    if (resetError) { setError(resetError.message) } else { setSent(true) }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#1e0a4a',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <img
        src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782365592080-Be_A_Better_Brand_Logo.png"
        alt="Be a Better Brand"
        style={{ height: 64, marginBottom: 24, filter: 'brightness(1.1)' }}
      />
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 700, color: '#c9a84c', marginBottom: 6, textAlign: 'center' }}>
        Reset Your Password
      </h1>
      <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 14, marginBottom: 32, fontStyle: 'italic' }}>
        Enter your email and we&apos;ll send a reset link
      </p>

      {sent ? (
        <div style={{ background: 'rgba(218,240,224,.12)', border: '1px solid rgba(160,216,176,.3)', borderRadius: 18, padding: '32px 28px', textAlign: 'center', maxWidth: 420, width: '100%' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>✉️</div>
          <p style={{ color: '#a0d8b0', fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Check your inbox</p>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 14, lineHeight: 1.7 }}>
            We sent a reset link to <strong style={{ color: '#f0c370' }}>{email}</strong>.<br />
            Click the link in the email to set a new password.
          </p>
          <Link href="/auth/login" style={{ display: 'inline-block', marginTop: 20, color: 'rgba(240,195,112,.7)', fontSize: 14, textDecoration: 'none' }}>
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleReset} style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(240,195,112,.2)', borderRadius: 18, padding: '32px 28px', width: '100%', maxWidth: 420 }}>
          {error && <div style={{ background: 'rgba(252,224,224,.15)', color: '#f0a0a0', border: '1px solid rgba(240,160,160,.4)', padding: '12px 16px', borderRadius: 10, marginBottom: 20, fontSize: 14 }}>{error}</div>}
          <div style={{ marginBottom: 24 }}>
            <label style={{ color: 'rgba(240,195,112,.7)', fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', display: 'block', marginBottom: 8, fontWeight: 600 }}>Email Address</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              placeholder="your@email.com"
              style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1px solid rgba(240,195,112,.25)', borderRadius: 10, padding: '12px 16px', fontSize: 15, width: '100%' }}
            />
          </div>
          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '14px 20px', background: 'linear-gradient(135deg,#c9a84c,#e8c97a)', color: '#1e0a4a', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? .8 : 1 }}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
          <div style={{ textAlign: 'center', marginTop: 18, fontSize: 14 }}>
            <Link href="/auth/login" style={{ color: 'rgba(240,195,112,.6)', textDecoration: 'none' }}>Back to Sign In</Link>
          </div>
        </form>
      )}
    </div>
  )
}
