import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

export async function POST(request: Request) {
  try {
    const { prompt, type } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // Use real Anthropic API if key is configured
    if (anthropic) {
      const message = await anthropic.messages.create({
        model: 'claude-opus-4-5',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }],
      })

      const content = message.content[0].type === 'text' ? message.content[0].text : ''

      return NextResponse.json({
        content,
        model: message.model,
        usage: {
          prompt_tokens: message.usage.input_tokens,
          completion_tokens: message.usage.output_tokens,
        },
      })
    }

    // Fallback placeholder responses when no API key configured
    const responses: Record<string, string> = {
      linkedin: `Here's a LinkedIn post draft:\n\n"The difference between a brand and a business? One is remembered. One is replaced.\n\nAfter working with 50+ founders and authors, I've seen the same pattern: brilliant expertise, invisible brand.\n\nThe Finally Seen Framework™ was built to fix exactly that — moving you from hidden authority to visible industry leader in 4 phases.\n\nPhase 1: Clarity Core — Define what makes you unmistakable\nPhase 2: Authority Positioning — Own your lane\nPhase 3: Visibility Engine — Get in the rooms that matter\nPhase 4: Proof & Momentum — Let results speak louder\n\nWhich phase are you in? Drop a comment and I'll share one action you can take this week.\n\n#BrandArchitecture #Visibility #FinallySeen"`,
      pitch: `Subject: Story Pitch\n\nHi [Journalist Name],\n\nI'm reaching out because I believe my client's story aligns perfectly with your recent coverage.\n\n[Add API key in Vercel environment variables to enable real AI generation: ANTHROPIC_API_KEY]`,
      default: `[To enable real AI generation, add your Anthropic API key as ANTHROPIC_API_KEY in Vercel Dashboard → Settings → Environment Variables → get your key at console.anthropic.com]\n\nPrompt received:\n${prompt.slice(0, 500)}...`,
    }

    const responseType = type || 'default'
    const aiResponse = responses[responseType] || responses.default

    return NextResponse.json({
      content: aiResponse,
      model: 'placeholder',
      usage: { prompt_tokens: 0, completion_tokens: 0 },
    })
  } catch (err: unknown) {
    console.error('AI API error:', err)
    const message = err instanceof Error ? err.message : 'AI generation failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
