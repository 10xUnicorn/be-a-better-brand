import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Brand Consulting | Be a Better Brand',
  description:
    'Grow your brand with intention and less stress. Brand consulting with Chrissy Bernal — 2-Hour Intensives, 12-Week Brand Growth Programs, and full-service brand architecture. Book a discovery call.',
}

const SERVICES = [
  {
    name: 'Mission & Value Statements',
    desc: 'Clarify the foundational beliefs that drive your business and communicate them in language your ideal client immediately recognizes as their own.',
  },
  {
    name: "Brand's Message / StoryBrand",
    desc: "Using Donald Miller's StoryBrand framework, we craft a clear brand message that positions you as the guide and your client as the hero — making every piece of content more compelling and more persuasive.",
  },
  {
    name: 'Positioning Statement',
    desc: 'Define exactly where you stand in your market. A strong positioning statement eliminates confusion, commands premium pricing, and makes you the obvious choice for your ideal client.',
  },
  {
    name: 'Website ROI',
    desc: 'Audit and optimize your web presence for conversion. We evaluate your messaging hierarchy, calls to action, and user flow to turn your website from a digital brochure into a lead-generating asset.',
  },
  {
    name: 'Marketing',
    desc: 'Build a marketing strategy that aligns with your brand architecture — so every campaign reinforces your positioning and every dollar spent compounds your authority.',
  },
  {
    name: 'Brand Identity',
    desc: 'Align your visual brand with your verbal brand so that your logo, color palette, typography, and photography all speak the same language as your messaging framework.',
  },
  {
    name: 'Social Media',
    desc: 'Develop a social media strategy built around your target audience and brand architecture — not vanity metrics. Know exactly what to post, when to post it, and why it will build authority.',
  },
  {
    name: 'Launch Your Book',
    desc: 'Navigate the full book launch lifecycle — from pre-launch PR strategy and Amazon category positioning to bestseller campaign execution and long-tail visibility strategy.',
  },
  {
    name: 'Launch a Podcast',
    desc: 'Launch your podcast with a clear brand architecture behind it — right name, right positioning, right guest strategy, and the right visibility plan to make your show findable and sticky from day one.',
  },
]

const OUTCOMES = [
  {
    label: 'Knowledgeable',
    desc: 'You will understand your brand at a depth that makes every future marketing decision faster, clearer, and more intentional.',
    icon: '◈',
  },
  {
    label: 'Excited',
    desc: 'When you see your brand architecture come together — and realize how much clearer and more powerful your message is — you will be energized to put it in front of the world.',
    icon: '◉',
  },
  {
    label: 'Confident',
    desc: 'You will show up to every sales conversation, media opportunity, and content creation session knowing exactly who you are, what you stand for, and why it matters.',
    icon: '◆',
  },
]

const PRICING = [
  {
    name: '2-Hour Intensive',
    price: '$750',
    cadence: 'One-time investment',
    highlight: true,
    tag: 'Most Popular Entry Point',
    desc: 'The fastest way to get clarity and momentum. In two focused hours with Chrissy, we zero in on your brand\'s most critical gaps and leave you with an actionable plan you can execute immediately. This intensive uses the StoryBrand framework to establish or sharpen your core messaging, identify the obstacles holding your brand back, and prioritize exactly what to work on next. You will leave with clarity, confidence, and a written action plan.',
    includes: [
      '2-hour 1:1 strategy session with Chrissy Bernal',
      'StoryBrand-aligned message framework',
      'Brand gap identification and prioritization',
      'Written action plan delivered same day',
      'Session recording',
    ],
  },
  {
    name: '12-Week Brand Growth Program',
    price: '$1,500',
    cadence: '/month · 3-month engagement',
    highlight: false,
    tag: 'Comprehensive Transformation',
    desc: 'The complete brand architecture build. Over 12 weeks, Chrissy works with you across six 60-minute strategy calls to rebuild your brand from the foundation up — mission, messaging, positioning, marketing strategy, and visibility infrastructure. This program is for entrepreneurs who are serious about growing with intention and are ready to invest three months in building something that will serve their business for years. Every session produces concrete deliverables you own at close.',
    includes: [
      'Six 60-minute 1:1 strategy calls with Chrissy',
      'Mission & Value Statements',
      'StoryBrand-aligned messaging framework',
      'Positioning Statement',
      'Website ROI audit and recommendations',
      'Marketing and social media strategy',
      'Basecamp project management access',
      'Final brand playbook at close',
    ],
  },
]

const PROCESS = [
  {
    step: '01',
    title: 'Discovery',
    desc: "We start with a deep-dive audit of your current brand — what's working, what's broken, and what's invisible. This isn't a surface-level questionnaire. It's a strategic excavation of your positioning, voice, audience, and competitive landscape.",
  },
  {
    step: '02',
    title: 'Strategy',
    desc: "From the audit findings, we build your brand architecture — the foundational framework that governs every piece of content, every pitch, every conversation. StoryBrand methodology meets your unique story to produce a strategy built for real authority.",
  },
  {
    step: '03',
    title: 'Execution',
    desc: "Strategy without execution is a document that gathers dust. We don't hand you a PDF and wish you luck. We stay in the build with you — through Basecamp collaboration, async support, and ongoing call check-ins — until the architecture is live and working.",
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
            We help brands accelerate their growth with more intention and less stress by equipping them with the tools they need, guiding them through the execution of what&apos;s needed, and obtaining publicity for brands.
          </p>
          <div className="reveal reveal-d3" style={{ marginTop: 36 }}>
            <a href="https://go.oncehub.com/GettingToKnow" target="_blank" rel="noopener" className="btn-gold">
              Book a Free Discovery Call
            </a>
          </div>
        </div>
        <div className="page-hero-wave" />
      </section>

      {/* SECTION 1: 9 SERVICES GRID */}
      <section style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <p className="sec-label reveal">What We Work On Together</p>
            <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 16 }}>
              Nine Areas of<br /><em>Brand Expertise</em>
            </h2>
            <p className="sec-p reveal reveal-d2">
              Every consulting engagement draws from this toolkit. We identify which areas need the most attention and build a program around your specific goals and gaps.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {SERVICES.map((svc, i) => (
              <div
                key={svc.name}
                className={`reveal reveal-d${(i % 3) + 1}`}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 16,
                  padding: '32px 28px',
                  boxShadow: '0 4px 20px rgba(30,10,74,0.06)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#c9a84c,#e8c97a)' }} />
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 48,
                  fontWeight: 300,
                  color: 'rgba(201,168,76,0.12)',
                  lineHeight: 1,
                  marginBottom: 8,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 600, color: '#1e0a4a', marginBottom: 12, lineHeight: 1.3 }}>
                  {svc.name}
                </h3>
                <p style={{ fontSize: 14, color: '#5a4070', lineHeight: 1.7 }}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: OUTCOMES */}
      <section style={{ background: 'linear-gradient(160deg, #1e0a4a, #2d1260)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <p className="reveal" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: 16 }}>
              How You&apos;ll Feel at the End
            </p>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(32px, 4vw, 60px)', fontWeight: 300, color: '#fff', lineHeight: 1.12 }}>
              The Three Outcomes We<br /><em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Always Deliver</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {OUTCOMES.map((o, i) => (
              <div
                key={o.label}
                className={`reveal reveal-d${i + 1}`}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 20,
                  padding: '48px 40px',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#c9a84c,#e8c97a)' }} />
                <div style={{ fontSize: 40, color: '#c9a84c', marginBottom: 20 }}>{o.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 36, fontWeight: 300, color: '#fff', marginBottom: 20 }}>{o.label}</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PRICING */}
      <section style={{ background: '#fff', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <p className="sec-label reveal">Investment Options</p>
            <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 16 }}>
              Choose Your<br /><em>Engagement</em>
            </h2>
            <p className="sec-p reveal reveal-d2">
              Whether you need two hours of focused clarity or twelve weeks of full architecture, we have the right engagement for where you are.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            {PRICING.map((pkg, i) => (
              <div
                key={pkg.name}
                className={`reveal reveal-d${i + 1}`}
                style={{
                  background: pkg.highlight ? 'var(--cream)' : '#fff',
                  border: pkg.highlight ? '1.5px solid rgba(201,168,76,0.4)' : '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 20,
                  padding: '48px 44px',
                  boxShadow: pkg.highlight ? '0 12px 48px rgba(30,10,74,0.12)' : '0 4px 24px rgba(30,10,74,0.06)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#c9a84c,#e8c97a)' }} />
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: '#a07830',
                  background: 'rgba(201,168,76,0.12)',
                  padding: '4px 12px',
                  borderRadius: 4,
                  display: 'inline-block',
                  marginBottom: 24,
                }}>{pkg.tag}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 300, color: '#1e0a4a', marginBottom: 8, lineHeight: 1.2 }}>{pkg.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 24 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 52, fontWeight: 300, color: '#1e0a4a' }}>{pkg.price}</span>
                  <span style={{ fontSize: 15, color: '#a07830', fontWeight: 600 }}>{pkg.cadence}</span>
                </div>
                <p style={{ fontSize: 15, color: '#5a4070', lineHeight: 1.8, marginBottom: 28 }}>{pkg.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                  {pkg.includes.map((item) => (
                    <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: '#c9a84c', flexShrink: 0, fontSize: 12, marginTop: 3 }}>◆</span>
                      <span style={{ fontSize: 14, color: '#5a4070', lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://go.oncehub.com/GettingToKnow"
                  target="_blank"
                  rel="noopener"
                  className="btn-gold"
                  style={{ display: 'block', textAlign: 'center' }}
                >
                  Book This Engagement
                </a>
              </div>
            ))}
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
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#c9a84c,#e8c97a)' }} />
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
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#a07830', display: 'block', marginBottom: 12 }}>
                    Phase {phase.step}
                  </span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 300, color: '#1e0a4a', marginBottom: 20, lineHeight: 1.2 }}>
                    {phase.title}
                  </h3>
                  <p style={{ fontSize: 15, color: '#5a4070', lineHeight: 1.8 }}>{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK CTA */}
      <section style={{ background: 'linear-gradient(160deg, #1e0a4a, #2d1260)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <p className="page-hero-eyebrow reveal">Start With a Conversation</p>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
            Book Your<br /><em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Free Discovery Call</em>
          </h2>
          <p className="reveal reveal-d2" style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 40 }}>
            Not sure which engagement is right for where you are? Book a free 30-minute call. Chrissy will help you identify the right program and leave you with at least one actionable insight — no commitment required.
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
