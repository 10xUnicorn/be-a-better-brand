import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createServiceClient()
    const { data, error } = await supabase
      .from('prompt_templates')
      .select('id, name, doc_type, description, sort_order')
      .eq('is_active', true)
      .order('sort_order')

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ templates: data || [] })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 })
  }
}
