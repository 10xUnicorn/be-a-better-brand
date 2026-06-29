'use client'
import { Suspense, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

function CallbackHandler() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    // Handle the code exchange for PKCE flow (email confirm, password reset, magic link)
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        // User clicked password reset link — send to update password page
        router.push('/auth/update-password')
      } else if (event === 'SIGNED_IN' && session) {
        // Email confirmed or magic link — send to dashboard
        router.push('/dashboard')
      }
    })

    // Also handle the hash fragment that Supabase puts in the URL
    const { hash } = window.location
    if (hash && hash.includes('type=recovery')) {
      router.push('/auth/update-password')
      return
    }

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/dashboard')
      } else {
        // Wait a moment for the onAuthStateChange to fire
        setTimeout(() => router.push('/auth/login'), 3000)
      }
    })
  }, [router])

  return (
    <p style={{ color: '#f0c370', fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16 }}>
      Verifying your account...
    </p>
  )
}

export default function CallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#1e0a4a' }}>
      <Suspense fallback={<p style={{ color: '#f0c370' }}>Loading...</p>}>
        <CallbackHandler />
      </Suspense>
    </div>
  )
}
