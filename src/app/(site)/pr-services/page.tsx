import type { Metadata } from 'next'
import Link from 'next/link'
import FAQAccordion from './FAQAccordion'

export const metadata: Metadata = {
  title: 'PR Services | Be a Better Brand',
  description:
    'Six-month PR campaigns that build lasting authority — brand audit, message architecture, media kit, active outreach, and Ad Equivalent Value reporting. Book a discovery call with Chrissy Bernal.',
}

const TIMELINE = [
  {
    months: 'Months 1–2',
    phase: 'Brand Audit + Message Architecture',
    icon: '01',
    items: [
      'Deep-dive brand audit: voice, positioning, competitive landscape',
      'StoryBrand-aligned messaging framework built from scratch',
      'Ideal audience profile and editorial persona mapping',
      'Core narrative and bio assets crafted for media-ready delivery',
      'Brand authority gap analysis with prioritized action plan',
    ],
  },
  {
    months: 'Months 3–4',
    phase: 'Media Kit + Pitch Development',
    icon: '02',
    items: [
      'Premium media kit design and copywriting',
      'Signature story arc developed for each target vertical',
      'Custom pitch angles crafted for 30+ target publications',
      'Podcast and speaking opportunity research and shortlist',
      'AEO content brief to position you in AI-generated search answers',
    ],
  },
  {
    months: 'Months 5–6',
    phase: 'Active Outreach + Placement Reporting',
    icon: '03',
    items: [
      'Active media outreach across editorial, podcast, and digital targets',
      'Real-time pitch tracking and editor follow-up cadence',
      'Secured placements delivered with Ad Equivalent Value reporting',
      'Social amplification strategy for every published placement',
      'Final authority asset package and next-phase PR roadmap',
    ],
  },
]

const RESULTS = [
  {
    stat: 'International Bestseller',
    desc: 'A client author went from unknown manuscript to Amazon international bestseller within 90 days of PR campaign launch — with placements in three countries driving pre-order momentum.',
    tag: 'Book Launch',
  },
  {
    stat: 'TV Appearances',
    desc: 'A Houston-based entrepreneur secured three local TV segment appearances in a single quarter, translating media authority into a 40% increase in inbound leads.',
    tag: 'Media Booking',
  },
  {
    stat: 'ROI in 90 Days',
    desc: 'A consulting client attributed $85k in new business directly to a single Thrive Global feature — proof that the right placement, in the right publication, in front of the right audience, pays for itself.',
    tag: 'ROI Tracking',
  },
]

export default function PRServicesPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="page-hero-eyebrow reveal">PR Campaigns &amp; Retainers</p>
          <h1 className="reveal reveal-d1">
            Strategic PR That Builds<br />
            <em>Lasting Authority</em>
          </h1>
          <p className="page-hero-sub reveal reveal-d2">
            Six months of focused, architecture-first media strategy — from brand audit to active outreach to Ad Equivalent Value you can show your board.
          </p>
        </div>
        <div className="page-hero-wave" />
      </section>

      {/* SECTION 1: WHAT MAKES BBB DIFFERENT */}
      <section style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            <div>
              <p className="sec-label reveal">Our Difference</p>
              <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 28 }}>
                PR Built on<br /><em>Brand Architecture</em>
              </h2>
              <p className="sec-p reveal reveal-d2" style={{ marginBottom: 20 }}>
                Most PR agencies pitch first and hope the placements stick. We reverse the order. Before we write a single pitch, we audit your brand voice, rebuild your message architecture using StoryBrand methodology, and identify the narrative angles most likely to resonate with editorial teams.
              </p>
              <p className="sec-p reveal reveal-d2" style={{ marginBottom: 20 }}>
                The result? Placements in publications that actually move the needle — not just logo-farm mentions that inflate a vanity press page. We progress clients intentionally from mid-tier placements that build credibility to top-tier features that shift perception.
              </p>
              <p className="sec-p reveal reveal-d3">
                And unlike anyone else in the space, we layer in AEO — Answer Engine Optimization — so your brand appears when AI assistants answer questions about your industry. The press page of the future is an AI overview. We build yours now.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { label: 'Architecture First', desc: 'StoryBrand-aligned messaging before a single pitch is written.' },
                { label: 'Mid-to-Top Tier Progression', desc: 'Credibility built systematically, not randomly.' },
                { label: 'AEO Integration', desc: 'Your authority surfaces in AI-generated answers, not just search results.' },
                { label: 'AEV Reporting', desc: 'Every placement reported as Ad Equivalent Value — a metric that makes sense to your business.' },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`reveal reveal-d${i + 1}`}
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: 12,
                    padding: '24px 28px',
                    borderLeft: '3px solid #c9a84c',
                    boxShadow: '0 2px 16px rgba(30,10,74,0.05)',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#a07830', letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>{item.label}</div>
                  <div style={{ fontSize: 15, color: '#5a4070', lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 6-MONTH TIMELINE */}
      <section style={{ background: 'linear-gradient(160deg, #1e0a4a, #2d1260)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <p className="reveal" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: 16 }}>The Campaign Roadmap</p>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(32px, 4vw, 60px)', fontWeight: 300, color: '#fff', lineHeight: 1.12, letterSpacing: '-0.3px' }}>
              Your Six-Month PR<br /><em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Campaign Timeline</em>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {TIMELINE.map((phase, i) => (
              <div
                key={phase.phase}
                className={`reveal reveal-d${i + 1}`}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,168,76,0.18)',
                  borderRadius: 20,
                  padding: '48px 56px',
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: 48,
                  alignItems: 'start',
                }}
              >
                <div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 80,
                    fontWeight: 300,
                    color: 'rgba(201,168,76,0.15)',
                    lineHeight: 1,
                    marginBottom: 8,
                  }}>{phase.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#c9a84c', marginBottom: 8 }}>{phase.months}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>{phase.phase}</h3>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {phase.items.map((item) => (
                    <li key={item} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ color: '#c9a84c', marginTop: 2, flexShrink: 0 }}>◆</span>
                      <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: RESULT STORIES */}
      <section style={{ background: '#fff', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <p className="sec-label reveal">Client Results</p>
            <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 16 }}>
              What Authority Looks<br /><em>Like in Practice</em>
            </h2>
            <p className="sec-p reveal reveal-d2">
              Real campaigns. Real placements. Real business impact.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {RESULTS.map((r, i) => (
              <div
                key={r.stat}
                className={`reveal reveal-d${i + 1}`}
                style={{
                  background: 'var(--cream)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 16,
                  padding: '40px 36px',
                  boxShadow: '0 4px 24px rgba(30,10,74,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: '#a07830',
                  background: 'rgba(201,168,76,0.12)',
                  padding: '4px 12px',
                  borderRadius: 4,
                  width: 'fit-content',
                }}>{r.tag}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 300, color: '#1e0a4a', lineHeight: 1.1 }}>{r.stat}</h3>
                <p style={{ fontSize: 15, color: '#5a4070', lineHeight: 1.8 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PRICING */}
      <section style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <p className="sec-label reveal">Investment</p>
          <h2 className="sec-h2 reveal reveal-d1" style={{ textAlign: 'center', marginBottom: 48 }}>
            The 6-Month PR<br /><em>Campaign Retainer</em>
          </h2>
          <div
            className="reveal reveal-d2"
            style={{
              background: '#fff',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: 24,
              padding: '56px 64px',
              boxShadow: '0 16px 64px rgba(30,10,74,0.10)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #c9a84c, #e8c97a, #c9a84c)' }} />
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 72, fontWeight: 300, color: '#1e0a4a', lineHeight: 1, marginBottom: 4 }}>
              $5,000
            </div>
            <div style={{ fontSize: 16, color: '#a07830', fontWeight: 600, marginBottom: 32, letterSpacing: 0.5 }}>per month · 6-month minimum engagement</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, textAlign: 'left', marginBottom: 40 }}>
              {[
                'Full brand audit + message architecture',
                'StoryBrand messaging framework',
                'Premium media kit (design + copy)',
                '30+ custom pitch angles',
                'Active media outreach & follow-up',
                'Podcast + speaking opportunity pitching',
                'AEO content brief for AI authority',
                'Monthly Ad Equivalent Value reporting',
                'Basecamp project management access',
                'Dedicated PR team (Chrissy + Madi)',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#c9a84c', flexShrink: 0, marginTop: 1 }}>◆</span>
                  <span style={{ fontSize: 14, color: '#5a4070', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
            <a
              href="https://go.oncehub.com/GettingToKnow"
              target="_blank"
              rel="noopener"
              className="btn-gold"
              style={{ fontSize: 15, padding: '16px 40px' }}
            >
              Book Your Discovery Call
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ */}
      <section style={{ background: '#fff', padding: '96px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p className="sec-label reveal">Common Questions</p>
          <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 48 }}>
            Frequently Asked<br /><em>Questions</em>
          </h2>
          <div className="reveal reveal-d2">
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(160deg, #1e0a4a, #2d1260)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <p className="page-hero-eyebrow reveal">Ready to Start?</p>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
            Book Your PR<br /><em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Discovery Call</em>
          </h2>
          <p className="reveal reveal-d2" style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 40 }}>
            A 30-minute no-pressure conversation about where your brand is, where you want it to be, and whether our six-month campaign is the right vehicle to get you there.
          </p>
          <div className="reveal reveal-d3" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://go.oncehub.com/GettingToKnow" target="_blank" rel="noopener" className="btn-gold">
              Book a Call — It&apos;s Free
            </a>
            <Link href="/consulting" className="btn-ghost-light">
              Explore Brand Consulting
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
