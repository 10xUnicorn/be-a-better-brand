'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

/* ── Demo data ─────────────────────────────────────────────── */
const demoDiagnostics = [
  {
    id: '1', icon: '\u26A1', title: 'Constraint Detected: Monica T. (Fractional CMO)',
    body: 'Authority signals are strong but audience alignment is fragmented across 3 channels with inconsistent messaging. Recommended: Authority Positioning sprint before expanding media outreach. Risk of diluting credibility at scale.',
    severity: 'warning',
  },
  {
    id: '2', icon: '\u2726', title: 'Opportunity: Sarah M. (Book Launch)',
    body: 'Pre-launch momentum exceeds baseline by 42%. Newsletter open rates at 61%. Recommend accelerating Proof & Momentum phase \u2014 launch testimonial campaign now to maximize pre-order window.',
    severity: 'opportunity',
  },
  {
    id: '3', icon: '\u25C8', title: 'Revenue Projection \u2014 Next 60 Days',
    body: 'Based on pipeline activity and renewal probability (87%), projected MRR for July: $44,200. Two deals in final-stage negotiation represent $13,500 in incremental monthly revenue if closed by June 15.',
    severity: 'insight',
  },
  {
    id: '4', icon: '\u2713', title: 'Client Health: Danielle R. \u2014 Excellent',
    body: 'All deliverables on track, engagement rate above 90th percentile. Forbes feature confirmed. Recommend discussing contract renewal 6 weeks before expiry to lock in expanded scope.',
    severity: 'positive',
  },
  {
    id: '5', icon: '\u26A0', title: 'Churn Risk: Brianna K. (Six Figure Chicks)',
    body: 'Invoice overdue by 28 days. Worksheet completion rate: 30%. Last portal login: 14 days ago. Recommend a personal check-in call and payment plan discussion within 48 hours.',
    severity: 'critical',
  },
]

const promptTemplates = [
  {
    id: 'linkedin',
    label: 'LinkedIn Post',
    description: 'Authority-building LinkedIn post in Chrissy\'s voice',
    prompt: 'Write a LinkedIn post about [TOPIC] that positions the author as a thought leader in personal branding. Use a conversational yet authoritative tone. Include a hook, story, lesson, and CTA. Target audience: ambitious women founders and authors.',
  },
  {
    id: 'pitch',
    label: 'Pitch Email',
    description: 'Media pitch email for PR outreach',
    prompt: 'Write a concise media pitch email to [JOURNALIST] at [PUBLICATION] about [CLIENT NAME]\'s expertise in [TOPIC]. Include a compelling angle, 2-3 bullet points of credibility, and a clear ask. Keep it under 200 words.',
  },
  {
    id: 'newsletter',
    label: 'Newsletter Intro',
    description: 'Opening for the brand newsletter',
    prompt: 'Write an engaging newsletter introduction about [TOPIC] for Be a Better Brand\'s audience of ambitious women building authority brands. Set the tone as warm but strategic. Lead into the main content below. 3-4 sentences max.',
  },
  {
    id: 'bio',
    label: 'Speaker Bio',
    description: 'Professional speaker biography for events',
    prompt: 'Write a professional speaker bio for [CLIENT NAME] who is a [ROLE/TITLE]. Highlight their expertise in [SPECIALTY], key accomplishments, and unique perspective. Include media features and accolades. Write in third person, 150 words.',
  },
  {
    id: 'case_study',
    label: 'Case Study Outline',
    description: 'Client transformation story structure',
    prompt: 'Create a case study outline for [CLIENT NAME]\'s brand transformation through the Finally Seen Framework. Structure: Challenge (what was holding them back), Solution (which phases addressed it), Results (measurable outcomes), and Testimonial prompt.',
  },
]

export default function AIBrainPage() {
  const [diagnostics, setDiagnostics] = useState(demoDiagnostics)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [customPrompt, setCustomPrompt] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data } = await supabase.from('ai_diagnostics').select('*').order('created_at', { ascending: false }).limit(10)
        if (data && data.length > 0) setDiagnostics(data)
      } catch { /* demo data */ }
    }
    load()
  }, [])

  function showToast(msg: string, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  function selectTemplate(id: string) {
    const template = promptTemplates.find(t => t.id === id)
    if (template) {
      setSelectedTemplate(id)
      setCustomPrompt(template.prompt)
    }
  }

  async function handleGenerate() {
    if (!customPrompt.trim()) return
    setIsGenerating(true)
    setGeneratedContent('')

    // Simulate AI generation for demo
    await new Promise(resolve => setTimeout(resolve, 2000))

    const demoResponses: Record<string, string> = {
      linkedin: "Here's something most personal brand \"experts\" won't tell you:\n\nVisibility without strategy is just noise.\n\nI've worked with dozens of ambitious founders who were posting daily, pitching constantly, and showing up everywhere \u2014 yet still feeling invisible.\n\nThe problem wasn't effort. It was alignment.\n\nWhen your messaging doesn't match your positioning, when your authority signals are scattered across platforms without a cohesive thread, you're working against yourself.\n\nThe Finally Seen Framework exists because I got tired of watching brilliant women burn out chasing visibility without the architecture to sustain it.\n\nPhase 1 isn't \"post more.\" It's \"get clear.\"\n\nWho else is ready to stop performing and start positioning?\n\n\u2192 Drop \"CLARITY\" in the comments if this hits home.",
      pitch: "Subject: Expert Source: How Women Founders Are Redefining Authority Branding\n\nHi [Journalist],\n\nI'm reaching out because [Client]'s story aligns perfectly with the conversation about women reshaping thought leadership.\n\nKey angles:\n\u2022 Built a 6-figure brand in 18 months using the Finally Seen Framework\n\u2022 Featured in Forbes, Inc., and Entrepreneur\n\u2022 Unique perspective on why traditional personal branding advice fails ambitious women\n\nWould you be interested in a 15-minute call to explore this angle?\n\nBest,\nChrissy Bernal | Be a Better Brand",
      newsletter: "Something shifted this month.\n\nI had three separate conversations with clients who all said the same thing: \"I finally feel seen.\" Not in a social-media-likes kind of way. In a my-ideal-clients-are-finding-me-and-saying-yes kind of way.\n\nThat's the difference between visibility and authority. And it's exactly what we're diving into today.",
    }

    const response = demoResponses[selectedTemplate || ''] || `Generated content for your prompt:\n\n"${customPrompt.slice(0, 100)}..."\n\nThis is a demo response. In production, this would connect to your AI provider (Claude, GPT, etc.) to generate real content based on your brand voice guidelines and the Finally Seen Framework methodology.`

    setGeneratedContent(response)
    setIsGenerating(false)
    showToast('Content generated successfully')
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(generatedContent)
    showToast('Copied to clipboard')
  }

  const severityStyle: Record<string, { border: string; bg: string }> = {
    warning: { border: 'rgba(201,168,76,0.4)', bg: 'rgba(201,168,76,0.06)' },
    opportunity: { border: 'rgba(42,122,58,0.3)', bg: 'rgba(42,122,58,0.06)' },
    insight: { border: 'rgba(51,16,129,0.25)', bg: 'rgba(51,16,129,0.06)' },
    positive: { border: 'rgba(42,122,58,0.3)', bg: 'rgba(42,122,58,0.06)' },
    critical: { border: 'rgba(138,32,32,0.3)', bg: 'rgba(138,32,32,0.06)' },
  }

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: 22 }}>
        <h1 className="serif" style={{ fontSize: 22, fontWeight: 700, color: '#1e0a4a' }}>AI Brain</h1>
        <p style={{ fontSize: 12, color: '#7a6090', marginTop: 4 }}>Intelligent diagnostics, content generation, and strategic recommendations powered by AI.</p>
      </div>

      {/* AI Brand Diagnostics */}
      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-head">
          <span className="panel-title">AI Brand Diagnostics</span>
          <span className="pill pill-purple">AI Brain</span>
        </div>
        <div className="panel-body">
          {diagnostics.map((d) => {
            const sty = severityStyle[d.severity] || severityStyle.insight
            return (
              <div key={d.id} className="ai-card" style={{ borderColor: sty.border, background: sty.bg }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>{d.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div className="serif" style={{ fontSize: 12.5, fontWeight: 700, color: '#1e0a4a', marginBottom: 4 }}>{d.title}</div>
                    <div style={{ fontSize: '11.5px', color: '#5a4070', lineHeight: 1.6, fontStyle: 'italic' }}>
                      &ldquo;{d.body}&rdquo;
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Two-column: Templates + Composer */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 16 }}>
        {/* Prompt Templates */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Prompt Templates</span>
          </div>
          <div className="panel-body">
            {promptTemplates.map(t => (
              <div
                key={t.id}
                onClick={() => selectTemplate(t.id)}
                style={{
                  padding: '12px 14px', borderRadius: 9, marginBottom: 8, cursor: 'pointer',
                  background: selectedTemplate === t.id ? 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(240,195,112,0.08))' : 'rgba(255,255,255,0.5)',
                  border: selectedTemplate === t.id ? '2px solid rgba(201,168,76,0.4)' : '1px solid rgba(240,195,112,0.15)',
                  transition: 'all 0.2s',
                }}
              >
                <div className="serif" style={{ fontSize: 12.5, fontWeight: 700, color: selectedTemplate === t.id ? '#c9a84c' : '#1e0a4a', marginBottom: 3 }}>{t.label}</div>
                <div style={{ fontSize: 11, color: '#7a6090', fontStyle: 'italic' }}>{t.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Content Composer */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">AI Content Composer</span>
            <span className="pill pill-gold">Generate</span>
          </div>
          <div className="panel-body">
            <div style={{ marginBottom: 14 }}>
              <label>Prompt</label>
              <textarea
                rows={5}
                value={customPrompt}
                onChange={e => setCustomPrompt(e.target.value)}
                placeholder="Enter your prompt or select a template from the left..."
              />
            </div>

            <button
              className="btn btn-gold"
              style={{ width: '100%', textAlign: 'center', marginBottom: 16 }}
              onClick={handleGenerate}
              disabled={isGenerating || !customPrompt.trim()}
            >
              {isGenerating ? 'Generating...' : '\u2726 Generate Content'}
            </button>

            {/* Generated Output */}
            {generatedContent && (
              <div style={{ marginTop: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ marginBottom: 0 }}>Generated Output</label>
                  <button className="btn btn-outline btn-sm" onClick={copyToClipboard} style={{ color: '#5a3090', borderColor: 'rgba(90,48,144,0.3)' }}>Copy</button>
                </div>
                <div className="ai-card" style={{ background: 'rgba(255,255,255,0.8)' }}>
                  <div style={{ fontSize: 12, color: '#2a1a40', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{generatedContent}</div>
                </div>
              </div>
            )}

            {!generatedContent && !isGenerating && (
              <div className="ai-card">
                <div className="serif" style={{ fontSize: 12, fontWeight: 700, color: '#1e0a4a', marginBottom: 4 }}>
                  AI-generated content will appear here
                </div>
                <div style={{ fontSize: '11.5px', color: '#5a4070', fontStyle: 'italic', lineHeight: 1.6 }}>
                  Select a template or write a custom prompt, then click Generate. AI output is a suggestion \u2014 review and edit before publishing.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </>
  )
}
