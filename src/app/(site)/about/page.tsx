import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Chrissy Bernal | Be a Better Brand',
  description:
    'Meet Chrissy Bernal — Founder & CEO of Be a Better Brand. 15+ years building authority brands, $500k+ monthly AEV secured for clients, and the creator of the Finally Seen™ Framework.',
}

const PHILOSOPHY = [
  {
    icon: '◈',
    title: 'Transparent Strategy',
    body:
      'No smoke and mirrors. Every tactic, timeline, and metric is shared openly with you. You always know exactly what is being done and why — because informed clients make better brand decisions.',
  },
  {
    icon: '◉',
    title: 'Holistic Support',
    body:
      'PR does not live in a vacuum. We align your media strategy with your brand architecture, messaging, and business goals so every placement compounds your authority across every channel.',
  },
  {
    icon: '◆',
    title: 'Innovative Solutions',
    body:
      'From AEO sprints that position you in AI-generated answers to StoryBrand-aligned pitches that editors cannot ignore, we bring the future of brand visibility to your campaign today.',
  },
  {
    icon: '◎',
    title: 'AEO-First Thinking',
    body:
      'Answer Engine Optimization is the frontier of brand authority. We craft your content and placements so that when someone asks an AI assistant about your topic, your name is the answer.',
  },
]

const TEAM = [
  {
    name: 'Chrissy Bernal',
    role: 'Founder & CEO',
    bio:
      'The architect behind the authority. With a background spanning Literature, Publishing, PR, and Marketing, Chrissy channels 15+ years of brand-building experience into every client engagement. She created the Finally Seen™ Framework to turn invisible experts into undeniable authorities.',
    image: '/brand/chrissy-headshot.jpg',
    isFounder: true,
  },
  {
    name: 'Madi',
    role: 'PR Outreach Lead',
    bio:
      'Madi drives the media relationships and pitch strategy that land clients in the publications that matter. Her editorial instincts and persistence turn cold pitches into warm placements.',
    image: null,
    isFounder: false,
  },
  {
    name: 'Hero',
    role: 'Podcast Production',
    bio:
      'Hero ensures every Finally Seen™ Podcast episode sounds world-class and ships on schedule. From recording to distribution, he keeps the show running at peak quality.',
    image: null,
    isFounder: false,
  },
  {
    name: 'Brittany V.',
    role: 'Client Success',
    bio:
      'Brittany is your advocate inside the agency. She manages client relationships, keeps campaigns on track, and makes sure every deliverable exceeds expectations.',
    image: '/brand/team-brittany.jpeg',
    isFounder: false,
  },
  {
    name: 'Madison V.',
    role: 'Brand Visibility',
    bio:
      'Madison amplifies client visibility across digital channels, ensuring that PR placements have the social and content ecosystem to compound their reach long after publication.',
    image: '/brand/team-madison.png',
    isFounder: false,
  },
]

const STATS = [
  { value: '$500k+', label: 'Monthly Ad Equivalent Value', sub: 'secured for clients' },
  { value: '15+', label: 'Years of Brand-Building', sub: 'experience & expertise' },
  { value: '6 mo', label: 'Average Engagement', sub: 'from pitch to placement' },
  { value: '100%', label: 'Client Retention Rate', sub: 'on 6-month retainers' },
]

export default function AboutPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="page-hero-eyebrow reveal">Our Story</p>
          <h1 className="reveal reveal-d1">
            The Architect Behind<br />
            <em>the Authority</em>
          </h1>
          <p className="page-hero-sub reveal reveal-d2">
            Chrissy Bernal built a reputation-first PR agency because she lived the alternative — and refused to let her clients suffer through it.
          </p>
        </div>
        <div className="page-hero-wave" />
      </section>

      {/* SECTION 1: BIO */}
      <section style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            {/* Photo */}
            <div className="reveal" style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 24px 80px rgba(30,10,74,0.14)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/press-hrspotlight.png"
                  alt="Chrissy Bernal — Founder & CEO of Be a Better Brand featured in HRSpotlight"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              {/* Gold accent */}
              <div style={{
                position: 'absolute',
                top: -16,
                left: -16,
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
                opacity: 0.18,
                zIndex: 0,
              }} />
            </div>

            {/* Bio text */}
            <div>
              <p className="sec-label reveal">Founder &amp; CEO</p>
              <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 28 }}>
                A Twin Moment That<br /><em>Changed Everything</em>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p className="sec-p reveal reveal-d2">
                  When Chrissy Bernal's identical daughters were born, they set a Guinness World Record. The press came calling — and something clicked. Here was proof that story, timing, and strategic positioning could put you on the world stage overnight.
                </p>
                <p className="sec-p reveal reveal-d2">
                  That moment didn't just make headlines. It ignited a career. Armed with a background in Literature, Publishing, Public Relations, Marketing, and Branding, Chrissy turned her natural obsession with storytelling into a full-service brand authority agency rooted in Houston, Texas.
                </p>
                <p className="sec-p reveal reveal-d3">
                  Over 15 years, she has helped entrepreneurs, authors, and thought leaders move from invisible to undeniable — securing placements in Thrive Global, Authority Magazine, the Houston Chronicle, and dozens of podcasts, TV segments, and digital publications that would otherwise have been out of reach.
                </p>
                <p className="sec-p reveal reveal-d3">
                  Her mission is simple: every expert deserves to be seen. Her method — the Finally Seen™ Framework — is the four-phase system she built to make it happen predictably, transparently, and with lasting impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PHILOSOPHY */}
      <section style={{ background: 'linear-gradient(160deg, #1e0a4a, #2d1260)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="sec-label reveal" style={{ color: 'rgba(201,168,76,0.7)' }}>Our Guiding Principles</p>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(32px, 4vw, 60px)', fontWeight: 300, color: '#fff', lineHeight: 1.12, letterSpacing: '-0.3px' }}>
              The Philosophy That<br /><em style={{ fontStyle: 'italic', color: '#c9a84c' }}>Drives Our Work</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {PHILOSOPHY.map((item, i) => (
              <div
                key={item.title}
                className={`reveal reveal-d${i + 1}`}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,168,76,0.18)',
                  borderRadius: 16,
                  padding: '36px 40px',
                  borderLeft: '3px solid #c9a84c',
                }}
              >
                <span style={{ fontSize: 28, color: '#c9a84c', display: 'block', marginBottom: 16 }}>{item.icon}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 600, color: '#fff', marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: TEAM */}
      <section style={{ background: '#fff', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <p className="sec-label reveal">The Team</p>
            <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 16 }}>
              The People Behind<br /><em>Your Brand Breakthrough</em>
            </h2>
            <p className="sec-p reveal reveal-d2">
              A tight-knit team of specialists who bring focused expertise to every corner of your campaign.
            </p>
          </div>

          {/* Founder card - full width */}
          <div className="reveal" style={{ marginBottom: 32 }}>
            <div style={{
              background: 'linear-gradient(135deg, #1e0a4a, #2d1260)',
              borderRadius: 20,
              padding: '48px 56px',
              border: '1px solid rgba(201,168,76,0.2)',
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: 48,
              alignItems: 'center',
            }}>
              <div style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '2px solid rgba(201,168,76,0.3)',
                maxWidth: 280,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/press-hrspotlight.png"
                  alt="Chrissy Bernal"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)' }}>Founder &amp; CEO</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 40, fontWeight: 300, color: '#fff', margin: '8px 0 16px' }}>Chrissy Bernal</h3>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: 520 }}>
                  The architect behind the authority. With a background spanning Literature, Publishing, PR, and Marketing, Chrissy channels 15+ years of brand-building experience into every client engagement. She created the Finally Seen™ Framework to turn invisible experts into undeniable authorities — because she believes every expert deserves to be seen by the people who need them most.
                </p>
              </div>
            </div>
          </div>

          {/* Team grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {TEAM.slice(1).map((member, i) => (
              <div
                key={member.name}
                className={`reveal reveal-d${i + 1}`}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 16,
                  padding: '32px 28px',
                  boxShadow: '0 4px 24px rgba(30,10,74,0.06)',
                  borderTop: '3px solid #c9a84c',
                }}
              >
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))',
                  border: '1.5px solid rgba(201,168,76,0.3)',
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  color: '#c9a84c',
                }}>
                  {member.name.charAt(0)}
                </div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#a07830', marginBottom: 6 }}>{member.role}</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 600, color: '#1e0a4a', marginBottom: 12 }}>{member.name}</h3>
                <p style={{ fontSize: 14, color: '#5a4070', lineHeight: 1.7 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: BY THE NUMBERS */}
      <section style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="sec-label reveal">The Proof</p>
            <h2 className="sec-h2 reveal reveal-d1" style={{ textAlign: 'center' }}>
              By the <em>Numbers</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`reveal reveal-d${i + 1}`}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 16,
                  padding: '40px 32px',
                  textAlign: 'center',
                  boxShadow: '0 4px 24px rgba(30,10,74,0.06)',
                }}
              >
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 52,
                  fontWeight: 300,
                  color: '#1e0a4a',
                  lineHeight: 1,
                  marginBottom: 8,
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#a07830', letterSpacing: 0.5, marginBottom: 4 }}>{stat.label}</div>
                <div style={{ fontSize: 13, color: '#5a4070' }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA */}
      <section style={{ background: 'linear-gradient(160deg, #1e0a4a, #2d1260)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <p className="page-hero-eyebrow reveal">Ready to Be Seen?</p>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
            Work With<br /><em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Chrissy</em>
          </h2>
          <p className="reveal reveal-d2" style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 40 }}>
            Whether you need a full PR campaign, brand architecture consulting, or a focused strategy intensive, Chrissy and her team are ready to build your authority from the ground up.
          </p>
          <div className="reveal reveal-d3" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://go.oncehub.com/GettingToKnow"
              target="_blank"
              rel="noopener"
              className="btn-gold"
            >
              Book a Discovery Call
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
