import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

const DB_COLUMN: Record<string, string> = {
  proposal: 'proposal_html',
  brand_brief: 'brand_brief_html',
  roadmap: 'roadmap_html',
  game_plan: 'game_plan_html',
  analysis: 'ai_prompt',
  all_prompts: 'ai_prompt',
}

function fillTemplate(template: string, vars: Record<string, string>): string {
  let result = template
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value || '[Not provided]')
  }
  return result
}

export async function POST(request: Request) {
  try {
    const { deal_id, doc_type, intake_data, form } = await request.json()

    if (!deal_id || !doc_type) {
      return NextResponse.json({ error: 'deal_id and doc_type are required' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    // Fetch deal
    const { data: deal } = await supabase
      .from('pipeline_deals')
      .select('*, offer_templates(*)')
      .eq('id', deal_id)
      .single()

    if (!deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 })
    }

    // Fetch the matching prompt template from DB
    const { data: promptTemplates } = await supabase
      .from('prompt_templates')
      .select('*')
      .eq('doc_type', doc_type === 'all_prompts' ? 'analysis' : doc_type)
      .eq('is_active', true)
      .order('sort_order')
      .limit(1)

    const promptTemplate = promptTemplates?.[0]

    if (!promptTemplate) {
      return NextResponse.json({ error: `No prompt template found for doc_type: ${doc_type}` }, { status: 404 })
    }

    // Build variable map from deal + intake data
    const offerTemplate = deal.offer_templates as Record<string, unknown> | null
    const intake = (intake_data || deal.intake_data || {}) as Record<string, string>

    const deliverablesArray = offerTemplate?.deliverables as string[] | null
    const deliverablesText = deliverablesArray ? deliverablesArray.join('\n') : ''

    const vars: Record<string, string> = {
      // Deal / contact fields
      contact_name: String(form?.contact_name || deal.contact_name || ''),
      contact_company: String(form?.contact_company || deal.contact_company || ''),
      contact_type: String(form?.contact_type || deal.contact_type || ''),
      deal_value: form?.deal_value ? `$${parseFloat(form.deal_value).toLocaleString()}` : deal.deal_value ? `$${parseFloat(String(deal.deal_value)).toLocaleString()}` : '',
      monthly_value: deal.monthly_value ? `$${parseFloat(String(deal.monthly_value)).toLocaleString()}/month` : '',
      duration_months: String(form?.duration_months || deal.duration_months || offerTemplate?.duration_months || '6'),
      stage: String(form?.stage || deal.stage || ''),
      // Offer fields
      offer_name: String(offerTemplate?.name || form?.offer_tier || deal.offer_tier || ''),
      offer_type: String(offerTemplate?.offer_type || deal.offer_tier || ''),
      price_type: String(offerTemplate?.price_type || 'monthly'),
      deliverables: deliverablesText,
      offer_description: String(offerTemplate?.description || ''),
      // Intake fields
      brand_name: intake.brand_name || String(form?.contact_company || deal.contact_company || ''),
      founder_name: intake.founder_name || String(form?.contact_name || deal.contact_name || ''),
      industry: intake.industry || '',
      engagement_type: intake.engagement_type || String(offerTemplate?.name || ''),
      brand_mission: intake.brand_mission || '',
      what_is_working: intake.what_is_working || '',
      what_is_broken: intake.what_is_broken || '',
      prior_pr: intake.prior_pr || '',
      primary_goal: intake.primary_goal || '',
      milestones: intake.milestones || '',
      dream_placement: intake.dream_placement || '',
      ideal_audience: intake.ideal_audience || '',
      competitors: intake.competitors || '',
      differentiator: intake.differentiator || '',
      transcript: intake.transcript || '',
      additional_instructions: intake.additional_instructions || '',
    }

    // Fill the prompt template
    const filledPrompt = fillTemplate(promptTemplate.prompt_body, vars)

    // For 'analysis' type — this IS the Claude prompt, save directly
    if (doc_type === 'analysis' || doc_type === 'all_prompts') {
      const column = DB_COLUMN[doc_type] || 'ai_prompt'
      await supabase.from('pipeline_deals').update({
        [column]: filledPrompt,
        updated_at: new Date().toISOString(),
      }).eq('id', deal_id)

      return NextResponse.json({ success: true, prompt: filledPrompt, html: null })
    }

    // For document types — call AI to generate HTML document
    let generatedContent = filledPrompt // fallback: return the prompt itself
    try {
      const aiRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: filledPrompt, type: doc_type }),
      })
      if (aiRes.ok) {
        const aiData = await aiRes.json()
        generatedContent = aiData.content || filledPrompt
      }
    } catch {
      // AI unavailable — save the prompt itself as the document
      generatedContent = `<pre style="font-family:Georgia,serif;line-height:1.8;white-space:pre-wrap;padding:32px;">${filledPrompt}</pre>`
    }

    // Wrap in BBB-branded HTML
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${promptTemplate.name} — ${vars.contact_name}</title>
<style>
body { font-family: 'Georgia', serif; background: #fff; color: #1a1020; max-width: 900px; margin: 0 auto; padding: 48px; line-height: 1.8; }
h1 { font-size: 36px; font-weight: 700; color: #1e0a4a; margin-bottom: 8px; }
h2 { font-size: 22px; font-weight: 700; color: #1e0a4a; margin-top: 40px; margin-bottom: 12px; border-bottom: 2px solid #c9a84c; padding-bottom: 8px; }
h3 { font-size: 17px; font-weight: 700; color: #1e0a4a; margin-top: 24px; margin-bottom: 8px; }
p { margin-bottom: 16px; }
.header { border-bottom: 3px solid #1e0a4a; padding-bottom: 24px; margin-bottom: 40px; }
.brand { font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #c9a84c; font-weight: 700; margin-bottom: 8px; }
.client { font-size: 32px; font-weight: 300; color: #1e0a4a; }
.subtitle { font-size: 14px; color: #7a6090; font-style: italic; margin-top: 4px; }
.footer { margin-top: 64px; padding-top: 24px; border-top: 1px solid #ede9ed; font-size: 12px; color: #9a8aaa; text-align: center; letter-spacing: 1px; }
strong { color: #1e0a4a; }
ul { margin-bottom: 16px; padding-left: 24px; }
li { margin-bottom: 8px; }
</style>
</head>
<body>
<div class="header">
<div class="brand">Be a Better Brand</div>
<div class="client">${promptTemplate.name}</div>
<div class="subtitle">${vars.contact_name}${vars.contact_company ? ` · ${vars.contact_company}` : ''} · Prepared by Chrissy Bernal · ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
</div>
${generatedContent.startsWith('<') ? generatedContent : generatedContent.split('\n').map((line: string) => {
  if (line.startsWith('## ')) return `<h2>${line.replace('## ', '')}</h2>`
  if (line.startsWith('### ')) return `<h3>${line.replace('### ', '')}</h3>`
  if (line.startsWith('# ')) return `<h1>${line.replace('# ', '')}</h1>`
  if (line.startsWith('**') && line.endsWith('**')) return `<strong>${line.replace(/\*\*/g, '')}</strong>`
  if (line.startsWith('- ') || line.startsWith('• ')) return `<li>${line.replace(/^[-•]\s/, '')}</li>`
  if (line.startsWith('---')) return '<hr style="border:none;border-top:1px solid #ede9ed;margin:32px 0;">'
  if (line.trim() === '') return '<br>'
  return `<p>${line}</p>`
}).join('\n')}
<div class="footer">
  Be a Better Brand &nbsp;·&nbsp; BeABetterBrand.com &nbsp;·&nbsp; © ${new Date().getFullYear()} Be a Better Brand. All Rights Reserved. Confidential.
</div>
</body>
</html>`

    // Save to deal
    const column = DB_COLUMN[doc_type] || 'brand_brief_html'
    const updateData: Record<string, string> = {
      [column]: html,
      ai_prompt: filledPrompt,
      updated_at: new Date().toISOString(),
    }

    await supabase.from('pipeline_deals').update(updateData).eq('id', deal_id)

    return NextResponse.json({ success: true, html, prompt: filledPrompt })
  } catch (err) {
    console.error('generate-document error:', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
