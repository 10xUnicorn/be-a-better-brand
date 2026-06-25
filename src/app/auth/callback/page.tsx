'use client'
import { Suspense, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'

function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      const type = searchParams.get('type')

      if (type === 'recovery') {
        router.push('/dashboard/settings?tab=password')
      } else if (session) {
        router.push('/dashboard')
      } else {
        router.push('/auth/login')
      }
    }
    handleCallback()
  }, [router, searchParams])

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
