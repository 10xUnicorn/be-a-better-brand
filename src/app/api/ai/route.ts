import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { prompt, type } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // AI integration placeholder — replace with actual AI SDK call
    // For now, return contextual demo responses based on prompt type
    const responses: Record<string, string> = {
      linkedin: `Here's a LinkedIn post draft:\n\n"The difference between a brand and a business? One is remembered. One is replaced.\n\nAfter working with 50+ founders and authors, I've seen the same pattern: brilliant expertise, invisible brand.\n\nThe Finally Seen Framework™ was built to fix exactly that — moving you from hidden authority to visible industry leader in 4 phases.\n\nPhase 1: Clarity Core — Define what makes you unmistakable\nPhase 2: Authority Positioning — Own your lane\nPhase 3: Visibility Engine — Get in the rooms that matter\nPhase 4: Proof & Momentum — Let results speak louder\n\nWhich phase are you in? Drop a comment and I'll share one action you can take this week. 👇\n\n#BrandArchitecture #Visibility #FinallySeen"`,
      pitch: `Subject: Story Pitch — ${prompt}\n\nHi [Journalist Name],\n\nI'm reaching out because I believe my client's story aligns perfectly with your recent coverage of [topic].\n\n[Client Name] is a [description] who has [key achievement]. What makes their story unique is [differentiator].\n\nKey angles:\n• [Angle 1]\n• [Angle 2]\n• [Angle 3]\n\nI'd love to set up a 15-minute call to discuss. Are you available this week?\n\nBest,\nChrissy Bernal\nBe a Better Brand`,
      newsletter: `# This Week's UpLevel\n\nHey there,\n\nLet me tell you something most brand strategists won't say out loud:\n\n**Your brand isn't broken. It's invisible.**\n\nAnd there's a massive difference.\n\nBroken means something is wrong with your message, your offer, your positioning. Invisible means all of those things might be exceptional — but nobody knows it yet.\n\nThat's the gap I see over and over with the founders and authors I work with through the Finally Seen Framework™.\n\n[Continue reading...]\n\nUntil next time,\nChrissy`,
      default: `Based on your prompt: "${prompt}"\n\nHere's a draft:\n\n${prompt}\n\n[AI-generated content would appear here. Connect your AI provider API key to enable real generation.]`,
    }

    const responseType = type || 'default'
    const aiResponse = responses[responseType] || responses.default

    return NextResponse.json({
      content: aiResponse,
      model: 'placeholder',
      usage: { prompt_tokens: 0, completion_tokens: 0 },
    })
  } catch (err) {
    console.error('AI API error:', err)
    return NextResponse.json({ error: 'AI generation failed' }, { status: 500 })
  }
}
