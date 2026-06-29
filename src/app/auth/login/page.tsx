'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) {
        setError(authError.message || 'Invalid login credentials.')
      } else {
        window.location.href = '/dashboard'
      }
    } catch {
      setError('Unable to connect. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1e0a4a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    }}>
      {/* Logo above card */}
      <img
        src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782365592080-Be_A_Better_Brand_Logo.png"
        alt="Be a Better Brand"
        style={{ height: 72, marginBottom: 24, filter: 'brightness(1.1)', display: 'block' }}
      />

      <h1 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 28,
        fontWeight: 700,
        color: '#c9a84c',
        marginBottom: 6,
        textAlign: 'center',
        letterSpacing: '0.5px',
      }}>
        Command Center
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, marginBottom: 28, fontStyle: 'italic' }}>
        Sign in to your dashboard
      </p>

      <form
        onSubmit={handleLogin}
        style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(240,195,112,0.2)',
          borderRadius: 18,
          padding: '32px 28px',
          width: '100%',
          maxWidth: 420,
        }}
      >
        {error && (
          <div style={{
            background: 'rgba(252,224,224,0.15)',
            color: '#f0a0a0',
            border: '1px solid rgba(240,160,160,0.4)',
            padding: '12px 16px',
            borderRadius: 10,
            marginBottom: 20,
            fontSize: 14,
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: 18 }}>
          <label style={{ color: 'rgba(240,195,112,0.7)', fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', display: 'block', marginBottom: 8, fontWeight: 600 }}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="chrissy@beabetterbrand.com"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(240,195,112,0.25)', borderRadius: 10, padding: '12px 16px', fontSize: 15, width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ color: 'rgba(240,195,112,0.7)', fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', display: 'block', marginBottom: 8, fontWeight: 600 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(240,195,112,0.25)', borderRadius: 10, padding: '12px 16px', fontSize: 15, width: '100%' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px 20px',
            background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
            color: '#1e0a4a',
            border: 'none',
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            opacity: loading ? 0.8 : 1,
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 14 }}>
          <Link href="/auth/reset-password" style={{ color: 'rgba(240,195,112,0.7)', textDecoration: 'none' }}>
            Forgot your password?
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>
          No account?{' '}
          <Link href="/auth/signup" style={{ color: 'rgba(240,195,112,0.7)', textDecoration: 'none' }}>Create one</Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(240,195,112,0.12)', fontSize: 12, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>
          Finally Seen Framework&trade; &middot; Be a Better Brand
        </div>
      </form>
    </div>
  )
}
