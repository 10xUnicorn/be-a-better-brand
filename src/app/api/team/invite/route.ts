import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { email, full_name, role } = await request.json()

    if (!email || !full_name || !role) {
      return NextResponse.json({ error: 'email, full_name, and role are required' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: { full_name, role },
      redirectTo: 'https://be-a-better-brand.vercel.app/auth/update-password',
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Team invite error:', err)
    return NextResponse.json({ error: 'Failed to send invite' }, { status: 500 })
  }
}
