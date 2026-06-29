'use client'

import { useState } from 'react'

const FAQ = [
  {
    q: 'What makes Be a Better Brand different from other PR agencies?',
    a: "We lead with brand architecture before we ever pitch a single journalist. Most agencies skip this step and wonder why placements don't convert. We align your message, your media presence, and your AEO footprint so every placement compounds authority rather than just adding noise.",
  },
  {
    q: 'What is AEO and why does it matter for PR?',
    a: "Answer Engine Optimization positions your brand to appear in AI-generated answers from tools like ChatGPT, Gemini, and Perplexity. When someone asks an AI \"Who is the best PR consultant for authors?\" — we work to make sure your name surfaces. It's the emerging frontier of brand authority and we build it into every campaign from day one.",
  },
  {
    q: 'How quickly can I expect to see placements?',
    a: "Most clients see their first placements in months 3–4, once the foundational brand audit and media kit are complete. Some opportunities emerge earlier — especially podcast guest spots. Our six-month structure is intentional: placements built on a strong messaging foundation perform far better than rushed pitches.",
  },
  {
    q: "Do I need to have a big following to benefit from PR?",
    a: "No. Editors and podcast hosts care about your story and your expertise, not your follower count. In fact, great PR is often how you build the audience — the placement comes first, the following grows from the authority it establishes.",
  },
  {
    q: 'What is included in the Ad Equivalent Value reporting?',
    a: "Every secured placement is reported with its estimated Ad Equivalent Value — what it would have cost to buy the same audience reach through paid advertising. This translates PR results into a business metric your CFO can appreciate. Many clients see their $5k/month retainer return $80k–$100k+ in AEV within six months.",
  },
]

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {FAQ.map((item, i) => (
        <div
          key={i}
          style={{
            background: '#fff',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(30,10,74,0.04)',
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '24px 28px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 20,
              fontWeight: 600,
              color: '#1e0a4a',
              lineHeight: 1.3,
            }}
          >
            {item.q}
            <span
              aria-hidden="true"
              style={{
                fontSize: 22,
                color: '#c9a84c',
                fontFamily: 'sans-serif',
                fontWeight: 300,
                flexShrink: 0,
                transition: 'transform 0.3s',
                transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                lineHeight: 1,
              }}
            >
              +
            </span>
          </button>
          {open === i && (
            <div
              role="region"
              style={{ padding: '0 28px 24px', borderTop: '1px solid rgba(201,168,76,0.12)' }}
            >
              <p style={{ paddingTop: 20, fontSize: 15, color: '#5a4070', lineHeight: 1.8 }}>{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
