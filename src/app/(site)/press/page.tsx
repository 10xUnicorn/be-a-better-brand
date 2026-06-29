import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press & Media Features | Be a Better Brand',
  description:
    'Chrissy Bernal and Be a Better Brand featured in Thrive Global, Houston Chronicle, HRSpotlight, Feminessence, Authority Magazine, and more.',
}

const PUBLICATIONS = [
  'Thrive Global',
  'Houston Chronicle',
  'HRSpotlight',
  'Feminessence',
  'Inbound Back Office',
  'Authority Magazine',
  'The Startup',
  'Medium',
  'Entrepreneur Voices',
]

const PRESS_CARDS = [
  {
    image: '/brand/press-thrive-global.png',
    publication: 'Thrive Global',
    alt: 'Chrissy Bernal featured in Thrive Global',
    headline: 'Chrissy Bernal on productivity, systems, and what sticky notes have to do with building a brand that scales.',
    url: 'https://thriveglobal.com',
    category: 'Productivity & Leadership',
  },
  {
    image: '/brand/press-hrspotlight.png',
    publication: 'HRSpotlight',
    alt: 'Chrissy Bernal featured in HRSpotlight with headshot',
    headline: 'HRSpotlight sits down with Chrissy Bernal on homeschooling, entrepreneurship, and running a business on your own terms.',
    url: 'https://hrspotlight.com',
    category: 'Entrepreneurship & Work',
  },
  {
    image: '/brand/press-feminessence.png',
    publication: 'Feminessence',
    alt: 'Chrissy Bernal featured in Feminessence',
    headline: 'How Chrissy Bernal built a visibility empire for women entrepreneurs — and why she believes every expert deserves to be seen.',
    url: 'https://feminessence.com',
    category: 'Women in Business',
  },
  {
    image: '/brand/press-houston-chronicle.png',
    publication: 'Houston Chronicle',
    alt: 'Chrissy Bernal featured in Houston Chronicle',
    headline: 'Houston Chronicle profiles Chrissy Bernal on community, connection, and the art of showing up for your audience.',
    url: 'https://houstonchronicle.com',
    category: 'Local Business & Community',
  },
]

const QUOTES = [
  {
    quote: 'I use sticky notes. I know it sounds simple, but having a physical system that you can see — that forces your priorities into view every morning — that changed how I run my business.',
    attribution: 'Chrissy Bernal, CEO & Publicist, Be a Better Brand, LLC',
    source: 'Thrive Global',
    sourceIcon: '◈',
  },
  {
    quote: 'As a special needs mom who homeschooled my children while running a business, I\'ve never had a traditional schedule. I had to build systems that worked around real life, not against it.',
    attribution: 'Chrissy Bernal, Founder of Be a Better Brand',
    source: 'HRSpotlight',
    sourceIcon: '◉',
  },
  {
    quote: 'I needed to be there to connect with the audience who was there. That\'s the whole point. You can have the best message in the world, but if you\'re not in the room — literally or figuratively — no one hears it.',
    attribution: 'Chrissy Bernal, Brand Strategist & PR Expert',
    source: 'Houston Chronicle',
    sourceIcon: '◆',
  },
]

export default function PressPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="page-hero-eyebrow reveal">Media &amp; Press</p>
          <h1 className="reveal reveal-d1">
            <em>As Seen In</em>
          </h1>
          <p className="page-hero-sub reveal reveal-d2">
            Chrissy Bernal and Be a Better Brand have been featured across top publications, podcasts, and digital platforms. Here is a selection of recent coverage.
          </p>
        </div>
        <div className="page-hero-wave" />
      </section>

      {/* SECTION 1: PUBLICATION LOGOS */}
      <section style={{ background: 'var(--cream)', padding: '72px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <p className="sec-label reveal" style={{ textAlign: 'center', marginBottom: 48 }}>Featured In</p>
          <div
            className="reveal reveal-d1"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {PUBLICATIONS.map((pub, i) => (
              <div
                key={pub}
                style={{
                  padding: '20px 36px',
                  borderRight: i < PUBLICATIONS.length - 1 ? '1px solid rgba(201,168,76,0.2)' : 'none',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#5a4070',
                  letterSpacing: 0.3,
                  opacity: 0.7,
                  transition: 'opacity 0.2s',
                }}
              >
                {pub}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, textAlign: 'center', borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: 24 }}>
            <p style={{ fontSize: 14, color: '#5a4070', fontStyle: 'italic' }}>
              + dozens of podcast appearances, TV segments, and digital features across North America
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED PRESS CARDS */}
      <section style={{ background: '#fff', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <p className="sec-label reveal">Featured Coverage</p>
            <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 16 }}>
              Recent Press<br /><em>Highlights</em>
            </h2>
            <p className="sec-p reveal reveal-d2">
              A selection of editorial features and interviews across publications that reach Chrissy&apos;s core audience of entrepreneurs, founders, and thought leaders.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
            {PRESS_CARDS.map((card, i) => (
              <a
                key={card.publication}
                href={card.url}
                target="_blank"
                rel="noopener"
                className={`reveal reveal-d${i % 2 === 0 ? 1 : 2}`}
                style={{
                  display: 'block',
                  background: 'var(--cream)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: '0 4px 28px rgba(30,10,74,0.07)',
                  textDecoration: 'none',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                }}
              >
                {/* Screenshot image */}
                <div style={{
                  height: 240,
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#f0ece4',
                  borderBottom: '1px solid rgba(201,168,76,0.15)',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt={card.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      display: 'block',
                    }}
                  />
                  {/* Publication badge overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    background: 'rgba(30,10,74,0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#c9a84c',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    padding: '6px 14px',
                    borderRadius: 6,
                    border: '1px solid rgba(201,168,76,0.3)',
                  }}>
                    {card.publication}
                  </div>
                </div>
                {/* Card body */}
                <div style={{ padding: '28px 32px 32px' }}>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: '#a07830',
                    display: 'block',
                    marginBottom: 12,
                  }}>
                    {card.category}
                  </span>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#1e0a4a',
                    lineHeight: 1.4,
                    marginBottom: 20,
                  }}>
                    {card.headline}
                  </p>
                  <span style={{ fontSize: 13, color: '#a07830', fontWeight: 600, letterSpacing: 0.3 }}>
                    Read the feature →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PRESS QUOTES */}
      <section style={{ background: 'linear-gradient(160deg, #1e0a4a, #2d1260)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <p className="reveal" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: 16 }}>In Her Words</p>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(32px, 4vw, 60px)', fontWeight: 300, color: '#fff', lineHeight: 1.12 }}>
              Quotes From the<br /><em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Press</em>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {QUOTES.map((q, i) => (
              <div
                key={i}
                className={`reveal reveal-d${i + 1}`}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,168,76,0.18)',
                  borderRadius: 20,
                  padding: '48px 56px',
                  borderLeft: '4px solid #c9a84c',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: 48,
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: 56, color: 'rgba(201,168,76,0.2)', fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: -16 }}>&ldquo;</div>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 26,
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.6,
                    marginBottom: 24,
                  }}>
                    {q.quote}
                  </p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.3 }}>
                    — {q.attribution}
                  </p>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '20px 28px',
                  background: 'rgba(201,168,76,0.08)',
                  borderRadius: 12,
                  border: '1px solid rgba(201,168,76,0.2)',
                  minWidth: 140,
                }}>
                  <div style={{ fontSize: 24, color: '#c9a84c', marginBottom: 8 }}>{q.sourceIcon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)' }}>{q.source}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PRESS INQUIRIES CTA */}
      <section style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <p className="sec-label reveal">For Journalists &amp; Producers</p>
              <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 24 }}>
                Press &amp; Media<br /><em>Inquiries</em>
              </h2>
              <p className="sec-p reveal reveal-d2" style={{ marginBottom: 20 }}>
                Chrissy Bernal is available for editorial interviews, podcast guest appearances, panel discussions, TV segments, and keynote engagements on the following topics:
              </p>
              <ul className="reveal reveal-d3" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                {[
                  'Brand architecture for entrepreneurs and authors',
                  'Answer Engine Optimization and the future of visibility',
                  'PR strategy for thought leaders and small businesses',
                  'The Finally Seen™ Framework and the psychology of authority',
                  'Work-life integration as a special needs parent and entrepreneur',
                  'Building a brand in the age of AI',
                ].map((topic) => (
                  <li key={topic} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: '#c9a84c', flexShrink: 0, marginTop: 2 }}>◆</span>
                    <span style={{ fontSize: 15, color: '#5a4070', lineHeight: 1.7 }}>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal reveal-d2">
              <div style={{
                background: '#fff',
                border: '1px solid rgba(201,168,76,0.25)',
                borderRadius: 20,
                padding: '48px 44px',
                boxShadow: '0 8px 40px rgba(30,10,74,0.08)',
                borderTop: '3px solid #c9a84c',
              }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 300, color: '#1e0a4a', marginBottom: 16, lineHeight: 1.2 }}>
                  Request an Interview
                </h3>
                <p style={{ fontSize: 15, color: '#5a4070', lineHeight: 1.8, marginBottom: 32 }}>
                  Chrissy&apos;s media kit is available upon request. For interview requests, speaking inquiries, or feature pitches, book a short call or reach out directly.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <a
                    href="https://go.oncehub.com/GettingToKnow"
                    target="_blank"
                    rel="noopener"
                    className="btn-gold"
                    style={{ textAlign: 'center' }}
                  >
                    Book a Media Call
                  </a>
                  <a
                    href="mailto:press@beabetterbrand.com"
                    className="btn-outline-dark"
                    style={{ textAlign: 'center' }}
                  >
                    Email the Press Team
                  </a>
                </div>
                <p style={{ fontSize: 12, color: '#5a4070', marginTop: 20, textAlign: 'center', opacity: 0.7 }}>
                  Media kit, headshots, and bio available on request
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section style={{ background: 'linear-gradient(160deg, #1e0a4a, #2d1260)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <p className="page-hero-eyebrow reveal">Want Results Like These?</p>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
            Let&apos;s Get You<br /><em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Placed</em>
          </h2>
          <p className="reveal reveal-d2" style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 40 }}>
            These placements didn&apos;t happen by accident. They are the result of strategic brand architecture, precision pitching, and a team that knows how to tell your story to the editors who need to hear it.
          </p>
          <div className="reveal reveal-d3" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://go.oncehub.com/GettingToKnow" target="_blank" rel="noopener" className="btn-gold">
              Start Your PR Campaign
            </a>
            <a href="/pr-services" className="btn-ghost-light">
              View PR Services
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
