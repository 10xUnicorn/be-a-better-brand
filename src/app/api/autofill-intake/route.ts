import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

async function fetchPageContent(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BBBbot/1.0)' },
      signal: AbortSignal.timeout(8000),
    })
    const html = await res.text()
    // Strip HTML tags, keep text content
    const text = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 6000) // limit
    return text
  } catch {
    return ''
  }
}

export async function POST(request: Request) {
  try {
    const { content, url, contact_name, contact_company } = await request.json()

    if (!content && !url) {
      return NextResponse.json({ error: 'Provide content text or a URL' }, { status: 400 })
    }

    let sourceText = content || ''

    // If URL provided, fetch the page content
    if (url && url.startsWith('http')) {
      const pageText = await fetchPageContent(url)
      sourceText = pageText + '\n\n' + (content || '')
    }

    if (!sourceText.trim()) {
      return NextResponse.json({ error: 'Could not retrieve content from URL' }, { status: 400 })
    }

    const systemPrompt = `You are an intake analyst for Be a Better Brand, a PR and brand architecture agency.
Your job is to extract client information from provided text (website content, bio, transcripts, descriptions).
Return ONLY a valid JSON object with these exact fields. Use null for any field you cannot confidently extract.
Do not guess or invent information not present in the source.`

    const userPrompt = `Extract client/brand information from this content and return a JSON object.

Pre-filled context (use if not found in content):
- Contact Name: ${contact_name || 'unknown'}
- Company/Brand: ${contact_company || 'unknown'}

Source content:
---
${sourceText}
---

Return ONLY a JSON object with these fields (null if not found):
{
  "brand_name": "brand or company name",
  "founder_name": "founder or CEO name",
  "industry": "industry or niche",
  "brand_mission": "what they do and who they serve (2-3 sentences)",
  "what_is_working": "visible strengths, existing audience, content, media presence",
  "what_is_broken": "gaps, inconsistencies, missing visibility elements",
  "prior_pr": "any press mentions, podcast appearances, media coverage found",
  "primary_goal": "inferred primary business or visibility goal",
  "ideal_audience": "who they serve — demographics, psychographics",
  "competitors": "any competitors mentioned or clearly implied",
  "differentiator": "what makes them unique vs competitors",
  "dream_placement": "any media outlets, publications, or podcasts mentioned as targets"
}`

    let extracted: Record<string, string | null> = {}

    if (anthropic) {
      const message = await anthropic.messages.create({
        model: 'claude-opus-4-5',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      })

      const text = message.content[0].type === 'text' ? message.content[0].text : ''
      // Parse JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        extracted = JSON.parse(jsonMatch[0])
      }
    } else {
      // No API key — return basic extraction from text
      extracted = {
        brand_name: contact_company || null,
        founder_name: contact_name || null,
        industry: null,
        brand_mission: sourceText.slice(0, 200) + '...',
        what_is_working: null,
        what_is_broken: null,
        prior_pr: null,
        primary_goal: null,
        ideal_audience: null,
        competitors: null,
        differentiator: null,
        dream_placement: null,
      }
    }

    // Remove null values and return
    const result: Record<string, string> = {}
    for (const [k, v] of Object.entries(extracted)) {
      if (v && typeof v === 'string' && v.trim()) {
        result[k] = v.trim()
      }
    }

    return NextResponse.json({ success: true, fields: result, source_length: sourceText.length })
  } catch (err) {
    console.error('Autofill error:', err)
    const msg = err instanceof Error ? err.message : 'Autofill failed'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
