import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Chrissy Bernal | Be a Better Brand',
  description:
    'Discover the keys to obtaining publicity, promoting your book, starting a podcast, and expanding your business. Meet Chrissy Bernal — Founder & CEO of Be a Better Brand.',
}

const PHILOSOPHY = [
  {
    icon: '◈',
    title: 'Transparent Strategy',
    body: 'No smoke and mirrors. Every tactic, timeline, and metric is shared openly with you. You always know exactly what is being done and why — because informed clients make better brand decisions.',
  },
  {
    icon: '◉',
    title: 'Holistic Support',
    body: 'PR does not live in a vacuum. We align your media strategy with your brand architecture, messaging, and business goals so every placement compounds your authority across every channel.',
  },
  {
    icon: '◆',
    title: 'Innovative Solutions',
    body: 'From StoryBrand-aligned pitches that editors cannot ignore to campaign strategies built around your specific business goals, we bring fresh thinking to every engagement.',
  },
  {
    icon: '◎',
    title: 'Empathy & Resilience',
    body: 'Rooted in empathy and resilience, our mission is to disrupt mediocrity in the PR and branding industry by providing transparent strategies, holistic support, and innovative solutions that empower our clients to thrive.',
  },
]

const TEAM = [
  {
    name: 'Brittany V.',
    role: 'Client Success',
    bio: 'Brittany is your advocate inside the agency. She manages client relationships, keeps campaigns on track, and makes sure every deliverable exceeds expectations.',
    image: '/brand/team-brittany.jpeg',
  },
  {
    name: 'Madison V.',
    role: 'Brand Visibility',
    bio: 'Madison amplifies client visibility across digital channels, ensuring that PR placements have the social and content ecosystem to compound their reach long after publication.',
    image: '/brand/team-madison.png',
  },
]

const STATS = [
  { value: '15+', label: 'Years of Experience', sub: 'in brand-building and PR' },
  { value: '$500k+', label: 'Average AVE Per Month', sub: 'secured for clients' },
  { value: 'Mid & Top', label: 'Tier Placements', sub: 'in strategic publications' },
  { value: 'High', label: 'Client Retention', sub: 'on 6-month retainers' },
]

export default function AboutPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="page-hero-eyebrow reveal">Our Story</p>
          <h1 className="reveal reveal-d1">
            Discover the Keys to<br />
            <em>Publicity, Books,</em><br />
            Podcasts &amp; Growth
          </h1>
          <p className="page-hero-sub reveal reveal-d2">
            Chrissy Bernal built a reputation-first PR agency because she lived the alternative — and refused to let her clients suffer through it.
          </p>
        </div>
        <div className="page-hero-wave" />
      </section>

      {/* SECTION 1: FOUNDER BIO */}
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
                  src="/brand/chrissy-headshot.jpg"
                  alt="Chrissy Bernal — Founder & CEO of Be a Better Brand"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#c9a84c,#e8c97a)' }} />
              </div>
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
                Chrissy<br /><em>Bernal</em>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p className="sec-p reveal reveal-d2">
                  Chrissy Bernal, our founder, has experienced the difficulties of managing sudden media attention. When her Guinness Book Record-holding identical twins became a global sensation, she acted quickly to develop and expand their brands.
                </p>
                <p className="sec-p reveal reveal-d2">
                  However, she encountered obstacles and lost time due to poor guidance. Rather than giving up, she dedicated herself to acquiring the knowledge and tactics required to promote their endeavors effectively and establish credibility.
                </p>
                <p className="sec-p reveal reveal-d3">
                  Chrissy has both formal education and real-world experience in Literature, Publishing, PR, Marketing, and Branding. Over 15+ years, she has helped entrepreneurs, authors, and thought leaders move from invisible to undeniable — securing placements in Thrive Global, the Houston Chronicle, and dozens of podcasts and TV segments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: EDITORIAL PHOTO + MISSION */}
      <section style={{ background: '#fff', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            <div>
              <p className="sec-label reveal">Our Mission</p>
              <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 28 }}>
                Dedicated to<br /><em>Intentional Impact</em>
              </h2>
              <p className="sec-p reveal reveal-d2" style={{ marginBottom: 20 }}>
                At Be a Better Brand, we are dedicated to crafting intentional, impactful brands that empower authors, entrepreneurs, and podcasters to achieve sustainable growth and lasting influence.
              </p>
              <p className="sec-p reveal reveal-d2" style={{ marginBottom: 20 }}>
                Rooted in empathy and resilience, our mission is to disrupt mediocrity in the PR and branding industry by providing transparent strategies, holistic support, and innovative solutions that empower our clients to thrive.
              </p>
              <p className="sec-p reveal reveal-d3" style={{ marginBottom: 32 }}>
                We believe every expert deserves to be seen. Every brand deserves a story told with clarity. Every client deserves to know exactly what we are doing and why — because transparency and results are not mutually exclusive.
              </p>
              <div className="reveal reveal-d4">
                <a href="https://go.oncehub.com/GettingToKnow" target="_blank" rel="noopener" className="btn-gold">
                  Work With Us
                </a>
              </div>
            </div>
            <div className="reveal reveal-d1">
              <div style={{
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 16px 60px rgba(30,10,74,0.12)',
                border: '1px solid rgba(201,168,76,0.2)',
                position: 'relative',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/chrissy-editorial.jpg"
                  alt="Chrissy Bernal — Be a Better Brand editorial"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#c9a84c,#e8c97a)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PHILOSOPHY */}
      <section style={{ background: 'linear-gradient(160deg, #1e0a4a, #2d1260)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="reveal" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: 16 }}>Our Guiding Principles</p>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(32px, 4vw, 60px)', fontWeight: 300, color: '#fff', lineHeight: 1.12 }}>
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
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#c9a84c,#e8c97a)' }} />
                <span style={{ fontSize: 28, color: '#c9a84c', display: 'block', marginBottom: 16 }}>{item.icon}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 600, color: '#fff', marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: TEAM */}
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

          {/* Founder card — full width */}
          <div className="reveal" style={{ marginBottom: 32 }}>
            <div style={{
              background: 'linear-gradient(135deg, #1e0a4a, #2d1260)',
              borderRadius: 20,
              padding: '48px 56px',
              border: '1px solid rgba(201,168,76,0.2)',
              display: 'grid',
              gridTemplateColumns: '280px 1fr',
              gap: 48,
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#c9a84c,#e8c97a)' }} />
              <div style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '2px solid rgba(201,168,76,0.3)',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/chrissy-headshot.jpg"
                  alt="Chrissy Bernal"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)' }}>Founder &amp; CEO</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 40, fontWeight: 300, color: '#fff', margin: '8px 0 16px' }}>Chrissy Bernal</h3>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: 520 }}>
                  The architect behind the authority. With a background spanning Literature, Publishing, PR, and Marketing, Chrissy channels 15+ years of brand-building experience into every client engagement. She created the Finally Seen™ approach to help authors, entrepreneurs, and podcasters turn their expertise into undeniable authority — because she believes every expert deserves to be seen by the people who need them most.
                </p>
              </div>
            </div>
          </div>

          {/* Team grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className={`reveal reveal-d${i + 1}`}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(30,10,74,0.06)',
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#c9a84c,#e8c97a)' }} />
                <div style={{ overflow: 'hidden', background: '#f0ece4' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ padding: '28px 28px' }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#a07830', marginBottom: 6 }}>{member.role}</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 600, color: '#1e0a4a', marginBottom: 10 }}>{member.name}</h3>
                  <p style={{ fontSize: 14, color: '#5a4070', lineHeight: 1.7 }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: STATS */}
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
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#c9a84c,#e8c97a)' }} />
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 44,
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

      {/* DARK CTA */}
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
            <a href="https://go.oncehub.com/GettingToKnow" target="_blank" rel="noopener" className="btn-gold">
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
