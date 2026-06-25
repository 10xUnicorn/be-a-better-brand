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
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    })
    if (resetError) { setError(resetError.message) } else { setSent(true) }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#1e0a4a' }}>
      <div style={{ maxWidth: 420, width: '90%' }}>
        <div className="text-center" style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 700, color: '#f0c370' }}>Reset Password</h1>
        </div>
        {sent ? (
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(240,195,112,0.2)', borderRadius: 16, padding: 28, textAlign: 'center' }}>
            <p style={{ color: '#f0c370', fontSize: 14, marginBottom: 8 }}>Check your email for a reset link.</p>
            <Link href="/auth/login" className="btn btn-outline" style={{ marginTop: 12, display: 'inline-block' }}>Back to Sign In</Link>
          </div>
        ) : (
          <form onSubmit={handleReset} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(240,195,112,0.2)', borderRadius: 16, padding: 28 }}>
            {error && <div style={{ background: '#fce0e0', color: '#8a2020', padding: '8px 12px', borderRadius: 8, marginBottom: 16, fontSize: 12 }}>{error}</div>}
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: 'rgba(240,195,112,0.6)' }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(240,195,112,0.25)' }} />
            </div>
            <button type="submit" disabled={loading} className="btn btn-gold" style={{ width: '100%', padding: '12px 20px', fontSize: 14 }}>{loading ? 'Sending...' : 'Send Reset Link'}</button>
            <div className="text-center" style={{ marginTop: 16, fontSize: 12 }}>
              <Link href="/auth/login" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Back to Sign In</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
