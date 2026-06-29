import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Brand Architecture Consulting | Be a Better Brand',
  description:
    'Brand Architecture consulting with Chrissy Bernal — Gap Sessions, 12-Week Growth Programs, AEO Sprints, and the Brand & Visibility Suite. Build your brand with intention and less stress.',
}

const SERVICES = [
  {
    name: 'Brand Architecture Gap Session',
    price: '$750',
    cadence: 'One-time 2-hour intensive',
    tag: 'Most Popular Starting Point',
    highlight: true,
    description:
      'The fastest way to get clarity on exactly where your brand is broken and what to fix first. In two hours, Chrissy audits your current brand positioning, identifies the critical gaps preventing you from attracting premium clients, and hands you a prioritized action plan you can implement immediately.',
    includes: [
      '2-hour 1:1 deep-dive with Chrissy Bernal',
      'Current brand audit (voice, positioning, messaging)',
      'Competitive landscape snapshot',
      'Identification of top 3 brand authority gaps',
      'Prioritized action plan delivered same day',
      'Recording + session notes',
    ],
  },
  {
    name: '12-Week Brand Growth Program',
    price: '$1,500',
    cadence: 'per month · 3-month engagement',
    tag: 'Comprehensive Transformation',
    highlight: false,
    description:
      'The full architecture build. Over 12 weeks, Chrissy works with you across six 60-minute strategy calls to rebuild your brand from the foundation up — messaging, positioning, content strategy, and visibility infrastructure — using the Finally Seen™ Framework as the backbone.',
    includes: [
      'Six 60-minute 1:1 strategy calls with Chrissy',
      'Finally Seen™ Framework implementation',
      'StoryBrand-aligned messaging architecture',
      'Content and visibility strategy roadmap',
      'Basecamp project management access throughout',
      'Async support between sessions',
      'Final brand playbook delivered at close',
    ],
  },
  {
    name: 'Brand & Visibility Suite',
    price: 'Custom',
    cadence: 'Tailored engagement',
    tag: 'Full-Service Build',
    highlight: false,
    description:
      'For founders who need the complete picture — brand architecture, PR strategy, content ecosystem, and AEO infrastructure — all designed and built together as one unified visibility machine.',
    includes: [
      'Full brand architecture build',
      'PR campaign integration',
      'AEO content infrastructure',
      'Content and thought leadership strategy',
      'Social and digital amplification planning',
      'Custom engagement scope and timeline',
    ],
  },
  {
    name: 'AEO Sprint',
    price: 'Custom',
    cadence: 'Focused engagement',
    tag: 'Future-Proofing',
    highlight: false,
    description:
      'Answer Engine Optimization is how your brand gets found when someone asks ChatGPT, Gemini, or Perplexity a question in your category. This sprint audits your current AI footprint and builds the content architecture to make you the answer engines recommend.',
    includes: [
      'AI visibility audit across major answer engines',
      'Competitive AEO landscape analysis',
      'Answer-optimized content brief',
      'Authority content creation (articles, Q&A assets)',
      'Citation and backlink strategy for AEO',
      'Performance tracking framework',
    ],
  },
]

const ACCOMPLISHMENTS = [
  'Define a brand position so clear, your ideal client immediately says "that\'s exactly who I need"',
  'Build a messaging framework that works across every channel — website, podcast, PR, social — without having to re-explain yourself every time',
  'Eliminate the confusion that comes from trying to serve everyone and finally own a specific, profitable niche',
  'Create a content ecosystem that builds authority passively, even when you\'re not actively posting',
  'Develop a PR-ready brand story that editors, podcast hosts, and speaking bookers want to share',
  'Understand exactly which platforms deserve your time and which are draining your energy with no return',
  'Build a visibility infrastructure that scales with your business without requiring more of your time',
  'Show up to every sales conversation with the confidence that your brand precedes you — and does half the work',
]

const PROCESS = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'We start with a deep-dive audit of your current brand — what\'s working, what\'s broken, and what\'s invisible. This isn\'t a surface-level questionnaire. It\'s a strategic excavation of your positioning, voice, audience, and competitive landscape.',
  },
  {
    step: '02',
    title: 'Strategy',
    desc: 'From the audit findings, we build your brand architecture — the foundational framework that governs every piece of content, every pitch, every conversation. StoryBrand methodology meets proprietary Finally Seen™ Framework to produce a strategy built for real authority.',
  },
  {
    step: '03',
    title: 'Implementation',
    desc: 'Strategy without execution is a document that gathers dust. We don\'t hand you a PDF and wish you luck. We stay in the build with you — through Basecamp collaboration, async support, and ongoing call check-ins — until the architecture is live and working.',
  },
]

export default function ConsultingPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="page-hero-eyebrow reveal">Brand Architecture &amp; Consulting</p>
          <h1 className="reveal reveal-d1">
            Grow Your Brand With<br />
            <em>Intention &amp; Less Stress</em>
          </h1>
          <p className="page-hero-sub reveal reveal-d2">
            Stop guessing what your brand should say, who it should speak to, and where it should show up. Build the architecture that makes every marketing decision obvious.
          </p>
        </div>
        <div className="page-hero-wave" />
      </section>

      {/* SECTION 1: WHAT IS BRAND ARCHITECTURE */}
      <section style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
            <div>
              <p className="sec-label reveal">What We Build Together</p>
              <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 28 }}>
                Brand Architecture Is<br /><em>Your North Star</em>
              </h2>
              <p className="sec-p reveal reveal-d2" style={{ marginBottom: 20 }}>
                Brand architecture is not your logo or your color palette. It is the invisible infrastructure beneath every decision you make about how your business shows up in the world — your positioning, your messaging hierarchy, your audience clarity, and your narrative framework.
              </p>
              <p className="sec-p reveal reveal-d2" style={{ marginBottom: 20 }}>
                When it is built correctly, everything clicks. Your website converts. Your pitches land. Your content builds authority instead of just filling a calendar. Your sales conversations feel easy because the prospect already trusts you before they get on the phone.
              </p>
              <p className="sec-p reveal reveal-d3">
                We use the StoryBrand framework as our messaging methodology and layer it with the Finally Seen™ Framework — Chrissy&apos;s proprietary four-phase system that has helped clients go from invisible to undeniable in industries ranging from wellness to finance to publishing.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Positioning', desc: 'Own a specific, defensible place in your market — not a vague "I help everyone" claim.' },
                { label: 'Messaging Architecture', desc: 'A StoryBrand-aligned framework that speaks to your ideal client\'s real problem and positions you as the guide.' },
                { label: 'Identity Alignment', desc: 'Visual and verbal brand elements that reinforce authority at every touchpoint.' },
                { label: 'StoryBrand Framework', desc: 'Donald Miller\'s proven methodology for building a clear brand message — applied by Chrissy with a decade of implementation experience.' },
                { label: 'Finally Seen™ Framework', desc: 'Chrissy\'s proprietary 4-phase system: Audit → Architect → Amplify → Authority.' },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`reveal reveal-d${Math.min(i + 1, 4)}`}
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: 12,
                    padding: '20px 24px',
                    borderLeft: '3px solid #c9a84c',
                    boxShadow: '0 2px 12px rgba(30,10,74,0.05)',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1e0a4a', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 14, color: '#5a4070', lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICES */}
      <section style={{ background: 'linear-gradient(160deg, #1e0a4a, #2d1260)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <p className="reveal" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: 16 }}>Services &amp; Programs</p>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(32px, 4vw, 60px)', fontWeight: 300, color: '#fff', lineHeight: 1.12, letterSpacing: '-0.3px' }}>
              Choose Your<br /><em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Engagement</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            {SERVICES.map((svc, i) => (
              <div
                key={svc.name}
                className={`reveal reveal-d${i % 2 === 0 ? 1 : 2}`}
                style={{
                  background: svc.highlight ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.04)',
                  border: svc.highlight ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(201,168,76,0.15)',
                  borderRadius: 20,
                  padding: '40px 40px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {svc.highlight && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #c9a84c, #e8c97a)' }} />
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', background: 'rgba(201,168,76,0.1)', padding: '4px 10px', borderRadius: 4 }}>{svc.tag}</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 600, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>{svc.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 40, fontWeight: 300, color: '#c9a84c' }}>{svc.price}</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>{svc.cadence}</span>
                </div>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: 28 }}>{svc.description}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                  {svc.includes.map((item) => (
                    <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: '#c9a84c', flexShrink: 0, fontSize: 12, marginTop: 3 }}>◆</span>
                      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://go.oncehub.com/GettingToKnow"
                  target="_blank"
                  rel="noopener"
                  className={svc.highlight ? 'btn-gold' : 'btn-ghost-light'}
                  style={{ fontSize: 14 }}
                >
                  {svc.price === 'Custom' ? 'Inquire Now' : 'Book This Session'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT WE ACCOMPLISH TOGETHER */}
      <section style={{ background: '#fff', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 72, alignItems: 'start' }}>
            <div>
              <p className="sec-label reveal">The Outcomes</p>
              <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 24 }}>
                What We Accomplish<br /><em>Together</em>
              </h2>
              <p className="sec-p reveal reveal-d2">
                Every consulting engagement, whether a Gap Session or a full 12-Week Program, is engineered to produce specific, measurable brand outcomes.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {ACCOMPLISHMENTS.map((item, i) => (
                <div
                  key={i}
                  className={`reveal reveal-d${i % 2 === 0 ? 1 : 2}`}
                  style={{
                    background: 'var(--cream)',
                    border: '1px solid rgba(201,168,76,0.18)',
                    borderRadius: 12,
                    padding: '24px 24px',
                    borderLeft: '3px solid #c9a84c',
                  }}
                >
                  <p style={{ fontSize: 14, color: '#1a0f2e', lineHeight: 1.7 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PROCESS */}
      <section style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <p className="sec-label reveal">How It Works</p>
            <h2 className="sec-h2 reveal reveal-d1" style={{ textAlign: 'center' }}>
              The Three-Phase<br /><em>Process</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {PROCESS.map((phase, i) => (
              <div
                key={phase.step}
                className={`reveal reveal-d${i + 1}`}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 20,
                  padding: '48px 36px',
                  boxShadow: '0 4px 28px rgba(30,10,74,0.07)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 80,
                  fontWeight: 300,
                  color: 'rgba(201,168,76,0.12)',
                  lineHeight: 1,
                  position: 'absolute',
                  top: 20,
                  right: 24,
                }}>
                  {phase.step}
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#a07830', display: 'block', marginBottom: 12 }}>Phase {phase.step}</span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 300, color: '#1e0a4a', marginBottom: 20, lineHeight: 1.2 }}>{phase.title}</h3>
                  <p style={{ fontSize: 15, color: '#5a4070', lineHeight: 1.8 }}>{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(160deg, #1e0a4a, #2d1260)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <p className="page-hero-eyebrow reveal">Start With a Conversation</p>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
            Book Your<br /><em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Free Discovery Call</em>
          </h2>
          <p className="reveal reveal-d2" style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 40 }}>
            Not sure which service is right for where you are? Book a free 30-minute call. Chrissy will help you identify the right engagement and leave you with at least one actionable insight — no commitment required.
          </p>
          <div className="reveal reveal-d3" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://go.oncehub.com/GettingToKnow" target="_blank" rel="noopener" className="btn-gold">
              Book a Free Call
            </a>
            <Link href="/pr-services" className="btn-ghost-light">
              Explore PR Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
