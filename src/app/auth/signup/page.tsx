'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (authError) { setError(authError.message) } else { setSuccess(true) }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#1e0a4a' }}>
      <div style={{ maxWidth: 420, width: '90%' }}>
        <div className="text-center" style={{ marginBottom: 32 }}>
          <img src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782365592080-Be_A_Better_Brand_Logo.png" alt="Be a Better Brand" style={{ height: 60, margin: '0 auto 16px', display: 'block' }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 700, color: '#f0c370' }}>Create Your Account</h1>
        </div>
        {success ? (
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(240,195,112,0.2)', borderRadius: 16, padding: 28, textAlign: 'center' }}>
            <p style={{ color: '#f0c370', fontSize: 16, fontWeight: 700, marginBottom: 8, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Check your email</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>We sent a confirmation link to <strong style={{ color: '#f0c370' }}>{email}</strong>.</p>
            <Link href="/auth/login" className="btn btn-outline" style={{ marginTop: 16, display: 'inline-block' }}>Back to Sign In</Link>
          </div>
        ) : (
          <form onSubmit={handleSignup} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(240,195,112,0.2)', borderRadius: 16, padding: 28 }}>
            {error && <div style={{ background: '#fce0e0', color: '#8a2020', padding: '8px 12px', borderRadius: 8, marginBottom: 16, fontSize: 12 }}>{error}</div>}
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: 'rgba(240,195,112,0.6)' }}>Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(240,195,112,0.25)' }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: 'rgba(240,195,112,0.6)' }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(240,195,112,0.25)' }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: 'rgba(240,195,112,0.6)' }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(240,195,112,0.25)' }} />
            </div>
            <button type="submit" disabled={loading} className="btn btn-gold" style={{ width: '100%', padding: '12px 20px', fontSize: 14 }}>{loading ? 'Creating...' : 'Create Account'}</button>
            <div className="text-center" style={{ marginTop: 16, fontSize: 12 }}>
              <Link href="/auth/login" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Already have an account? Sign in</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
