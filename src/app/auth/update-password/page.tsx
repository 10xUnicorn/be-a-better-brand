'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Supabase puts the session in the URL hash after clicking reset link
    // The @supabase/ssr client picks this up automatically via onAuthStateChange
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setShow(true)
      }
    })
    // Also check if already in a recovery session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setShow(true)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })
    if (updateError) {
      setError(updateError.message)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/dashboard'), 2000)
    }
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
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 700, color: '#c9a84c', marginBottom: 32, textAlign: 'center' }}>
        Set New Password
      </h1>

      {success ? (
        <div style={{ background: 'rgba(218,240,224,0.12)', border: '1px solid rgba(160,216,176,0.3)', borderRadius: 16, padding: '28px 32px', textAlign: 'center', maxWidth: 420, width: '100%' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
          <p style={{ color: '#a0d8b0', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Password updated!</p>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 14 }}>Redirecting you to the dashboard...</p>
        </div>
      ) : (
        <form onSubmit={handleUpdate} style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(240,195,112,.2)', borderRadius: 18, padding: '32px 28px', width: '100%', maxWidth: 420 }}>
          {error && (
            <div style={{ background: 'rgba(252,224,224,.15)', color: '#f0a0a0', border: '1px solid rgba(240,160,160,.4)', padding: '12px 16px', borderRadius: 10, marginBottom: 20, fontSize: 14 }}>
              {error}
            </div>
          )}
          <div style={{ marginBottom: 18 }}>
            <label style={{ color: 'rgba(240,195,112,.7)', fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', display: 'block', marginBottom: 8, fontWeight: 600 }}>
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="Min. 8 characters"
              style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1px solid rgba(240,195,112,.25)', borderRadius: 10, padding: '12px 16px', fontSize: 15, width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ color: 'rgba(240,195,112,.7)', fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', display: 'block', marginBottom: 8, fontWeight: 600 }}>
              Confirm Password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              placeholder="Repeat password"
              style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1px solid rgba(240,195,112,.25)', borderRadius: 10, padding: '12px 16px', fontSize: 15, width: '100%' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '14px 20px', background: 'linear-gradient(135deg,#c9a84c,#e8c97a)', color: '#1e0a4a', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif', opacity: loading ? .8 : 1 }}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 14, color: 'rgba(255,255,255,.35)' }}>
            <Link href="/auth/login" style={{ color: 'rgba(240,195,112,.6)', textDecoration: 'none' }}>Back to Sign In</Link>
          </div>
        </form>
      )}
    </div>
  )
}
