import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

type DocType = 'proposal' | 'brand_brief' | 'roadmap' | 'game_plan'

const DB_COLUMN: Record<DocType, string> = {
  proposal: 'proposal_html',
  brand_brief: 'brand_brief_html',
  roadmap: 'roadmap_html',
  game_plan: 'game_plan_html',
}

function buildPrompt(
  docType: DocType,
  intakeData: Record<string, string>,
  dealData: Record<string, unknown>,
  offerTemplate: Record<string, unknown> | null
): string {
  const clientName = (intakeData.client_name || dealData.contact_name || 'the client') as string
  const businessType = (intakeData.business_type || intakeData.industry || 'business owner') as string
  const goal = (intakeData.primary_goal || intakeData.goal || '') as string
  const challenge = (intakeData.main_challenge || intakeData.challenge || '') as string
  const audience = (intakeData.target_audience || intakeData.audience || '') as string
  const currentRevenue = (intakeData.current_revenue || '') as string
  const revenueGoal = (intakeData.revenue_goal || '') as string
  const timeline = (intakeData.timeline || '6 months') as string
  const offerName = ((offerTemplate as Record<string, unknown>)?.name || dealData.offer_name || 'Be a Better Brand Retainer') as string
  const pricing = ((offerTemplate as Record<string, unknown>)?.price || dealData.deal_value || '') as string
  const deliverables = ((offerTemplate as Record<string, unknown>)?.deliverables || '') as string

  const brandVoiceNote = `
Brand voice: Observational, precise, outcome-focused. No generic marketing language.
No phrases like "unlock your potential," "take your brand to the next level," or "skyrocket your results."
Write as an expert practitioner who has seen exactly this pattern before and knows the fix.
Use specific, concrete language. Name the real problem. Name the real outcome.`

  const intakeFields = Object.entries(intakeData)
    .filter(([, v]) => v)
    .map(([k, v]) => `- ${k.replace(/_/g, ' ')}: ${v}`)
    .join('\n')

  if (docType === 'proposal') {
    return `You are Chrissy Bernal, founder of Be a Better Brand. Write a formal HTML proposal document for ${clientName}.

${brandVoiceNote}

Client context:
${intakeFields}

Offer: ${offerName}
Investment: ${pricing}
Deliverables included: ${deliverables}
Timeline: ${timeline}
Primary goal: ${goal}
Main challenge: ${challenge}
Target audience: ${audience}

Write a complete, polished proposal in HTML (no markdown, no code fences — pure HTML body content only, starting with <div>).
Structure:
1. <h1> heading with client name and proposal title
2. Opening section: "Why Now" — name the specific gap you observed in ${clientName}'s current brand position. Be precise.
3. "The Work" — describe exactly what will happen, phase by phase, using the Finally Seen Framework (Clarity Core → Authority Positioning → Visibility Engine → Proof & Momentum) as relevant
4. "Deliverables" — bulleted list of specific deliverables for ${offerName}
5. "Investment" — clearly state ${pricing}, payment structure, and what's included
6. "Timeline" — ${timeline} breakdown
7. "What Happens Next" — clear next steps with a call to action
8. Signature block for Chrissy Bernal, Be a Better Brand

Do not use generic filler. Every sentence should earn its place.`
  }

  if (docType === 'brand_brief') {
    return `You are Chrissy Bernal, founder of Be a Better Brand. Write a comprehensive Brand Brief HTML document for ${clientName}.

${brandVoiceNote}

Client context:
${intakeFields}

Business type: ${businessType}
Primary goal: ${goal}
Target audience: ${audience}
Current revenue: ${currentRevenue}
Revenue goal: ${revenueGoal}

Write a complete Brand Brief in HTML (pure HTML body content only, starting with <div>).
Structure:
1. <h1> Brand Brief — ${clientName}
2. Brand Foundation
   - Who they are (precise, not generic)
   - What they do and for whom (specific audience language)
   - Why it matters now (market timing / cultural moment)
3. Brand Positioning Statement (single tight paragraph)
4. Mission & Vision (concrete, not aspirational fluff)
5. Target Audience Profile — 2-3 specific personas with real pain points, not demographics
6. Messaging Pillars (3-4 core themes with 2-3 supporting messages each)
7. Voice & Tone Guidelines — specific dos and don'ts with examples
8. Authority Positioning — where ${clientName} fits in the landscape, what makes them unmistakable
9. Content Themes — 5 core content territories with rationale
10. Brand Words to Own — 6-8 specific terms/phrases to use consistently

Be specific to ${clientName}'s actual situation based on the intake data. No placeholder copy.`
  }

  if (docType === 'roadmap') {
    return `You are Chrissy Bernal, founder of Be a Better Brand. Write a 12-Month Visibility Roadmap HTML document for ${clientName}.

${brandVoiceNote}

Client context:
${intakeFields}

Primary goal: ${goal}
Starting point: ${challenge}
Revenue goal: ${revenueGoal}
Offer: ${offerName}

Write a complete 12-Month Roadmap in HTML (pure HTML body content only, starting with <div>).
Structure:
1. <h1> 12-Month Brand Visibility Roadmap — ${clientName}
2. Executive summary: Where we're starting, where we're going, and why this sequence
3. For each of the 12 months, a section with:
   - Month number and name (e.g., "Month 1: Foundation")
   - The Finally Seen phase it falls under
   - 3-5 specific milestones/deliverables for that month
   - Key metric to track
   - One decision point or risk to watch
4. Milestone summary table (Month | Focus | Key Output | Metric)
5. Success criteria — what "done" looks like at 12 months

Months 1-2 = Clarity Core, Months 3-5 = Authority Positioning, Months 6-9 = Visibility Engine, Months 10-12 = Proof & Momentum.
Be specific to ${clientName}'s business. Name real deliverables, real publications to target, real platforms to use.`
  }

  if (docType === 'game_plan') {
    return `You are Chrissy Bernal, founder of Be a Better Brand. Write a 90-Day Game Plan HTML document for ${clientName}.

${brandVoiceNote}

Client context:
${intakeFields}

Primary goal: ${goal}
Main challenge: ${challenge}
Business type: ${businessType}
Timeline to first result: ${timeline}

Write a complete 90-Day Game Plan in HTML (pure HTML body content only, starting with <div>).
Structure:
1. <h1> 90-Day Game Plan — ${clientName}
2. The Focus: What we are solving in 90 days and why that, not something else
3. Week-by-week breakdown for 13 weeks:
   - Week number
   - Phase (Clarity Core / Authority Positioning / Visibility Engine)
   - 3-4 specific tasks (not vague actions — name the exact deliverable, the exact platform, the exact meeting)
   - Owner (Chrissy/Team or ${clientName})
   - Success indicator
4. 30/60/90-Day Checkpoints — what we assess and decide at each gate
5. Non-negotiables — 3-5 commitments that make the plan work
6. What success looks like at Day 90

Every week must have concrete, named tasks. No "research your audience" — instead name specifically what research, what output, who sees it.`
  }

  return `Write a document for ${clientName} based on: ${intakeFields}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { deal_id, doc_type, intake_data } = body as {
      deal_id: string
      doc_type: DocType
      intake_data: Record<string, string>
    }

    if (!deal_id || !doc_type || !intake_data) {
      return NextResponse.json({ error: 'deal_id, doc_type, and intake_data are required' }, { status: 400 })
    }

    if (!['proposal', 'brand_brief', 'roadmap', 'game_plan'].includes(doc_type)) {
      return NextResponse.json({ error: 'Invalid doc_type' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    // Fetch deal and offer template
    const { data: deal, error: dealError } = await supabase
      .from('pipeline_deals')
      .select('*, offer_templates(*)')
      .eq('id', deal_id)
      .single()

    if (dealError || !deal) {
      return NextResponse.json({ error: 'Deal not found: ' + (dealError?.message || '') }, { status: 404 })
    }

    const offerTemplate = (deal as Record<string, unknown>).offer_templates as Record<string, unknown> | null

    // Build the AI prompt
    const prompt = buildPrompt(doc_type, intake_data, deal as Record<string, unknown>, offerTemplate)

    // Call the internal /api/ai endpoint
    const origin = request.headers.get('origin') || 'http://localhost:3000'
    const aiResponse = await fetch(`${origin}/api/ai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, type: doc_type }),
    })

    if (!aiResponse.ok) {
      return NextResponse.json({ error: 'AI generation failed' }, { status: 500 })
    }

    const aiData = await aiResponse.json() as { content: string }
    const html = aiData.content || ''

    // Save HTML + prompt back to the deal
    const dbColumn = DB_COLUMN[doc_type]
    const { error: saveError } = await supabase
      .from('pipeline_deals')
      .update({
        [dbColumn]: html,
        ai_prompt: prompt,
        updated_at: new Date().toISOString(),
      })
      .eq('id', deal_id)

    if (saveError) {
      console.error('Failed to save document:', saveError)
    }

    return NextResponse.json({ html, prompt, success: true })
  } catch (err) {
    console.error('generate-document error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
