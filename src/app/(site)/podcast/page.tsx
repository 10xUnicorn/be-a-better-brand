import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Finally Seen Podcast | Be a Better Brand',
  description:
    'Finally Seen™ Podcast hosted by Chrissy Bernal — for ambitious women building bold brands, meaningful lives, and unforgettable legacies. Listen on Apple Podcasts, Spotify, and YouTube.',
}

const EPISODES = [
  {
    number: 'EP 06',
    guest: 'Ben Albert',
    title: 'From Feeling Invisible to Building a Global Community',
    desc: 'Ben Albert built a network that spans continents — not by chasing algorithms, but by showing up authentically and investing in genuine human connection. Chrissy and Ben unpack the mindset shift that takes you from feeling unseen to becoming a connector at the center of something much bigger than yourself.',
    themes: ['Visibility', 'Community Building', 'Authenticity'],
  },
  {
    number: 'EP 05',
    guest: 'Dawn Andrews',
    title: 'When Working Harder Stops Working',
    desc: 'There comes a moment in every ambitious woman\'s journey when effort alone stops moving the needle. Dawn Andrews, leadership strategist and author, shares the frameworks she uses to help high-performers transition from doing more to thinking differently — and why that shift is the actual growth edge.',
    themes: ['Leadership', 'Scaling', 'Mindset'],
  },
  {
    number: 'EP 04',
    guest: 'Dr. Bill Clark',
    title: 'Conscious Leadership: How Self-Awareness Becomes Your Greatest Business Asset',
    desc: 'Dr. Bill Clark brings a rare combination of clinical psychology and business strategy to the conversation. He and Chrissy explore how the leaders who build the most enduring brands are the ones doing the deepest inner work — and how self-awareness directly translates to competitive advantage.',
    themes: ['Leadership', 'Personal Development', 'Brand'],
  },
  {
    number: 'EP 03',
    guest: 'Mark A. Dulaney',
    title: 'Why Smart, Capable People Stay Stuck',
    desc: 'You have the knowledge, the experience, and the vision. So why isn\'t the business moving? Mark A. Dulaney digs into the hidden barriers — identity, fear, and misaligned systems — that keep talented entrepreneurs from breaking through to the next level, and exactly what to do about them.',
    themes: ['Mindset', 'Strategy', 'Growth'],
  },
  {
    number: 'EP 02',
    guest: 'Ann Kelley',
    title: 'What If the Problem Isn\'t You',
    desc: 'Ann Kelley challenges one of the most damaging narratives in the entrepreneurial world: the belief that struggle is always a personal failure. Sometimes the model is broken. Sometimes the market has shifted. Sometimes the problem isn\'t you at all — and recognizing that distinction is the first step toward real change.',
    themes: ['Reinvention', 'Business Model', 'Resilience'],
  },
  {
    number: 'EP 01',
    guest: 'Paige Arnof-Fenn',
    title: 'The Real Reason Your Business Isn\'t Scaling',
    desc: 'Marketing legend Paige Arnof-Fenn has helped build brands from scratch to global recognition. In this inaugural episode, she and Chrissy unpack the most common — and most overlooked — reason that expert-led businesses plateau: the founder\'s brand hasn\'t kept pace with the business\'s ambition.',
    themes: ['Marketing', 'Scaling', 'Brand Authority'],
  },
]

const THEMES = [
  { icon: '◈', label: 'Visibility & Authority', desc: 'How to build a brand that gets seen by the people who matter most.' },
  { icon: '◉', label: 'Reinvention', desc: 'Stories of pivots, second acts, and the courage to start over with more wisdom.' },
  { icon: '◆', label: 'Business Scaling', desc: 'Strategic conversations about what it actually takes to grow without burning out.' },
  { icon: '◎', label: 'Mindset & Leadership', desc: 'The inner work that underpins every lasting outer achievement.' },
  { icon: '◈', label: 'Branding & Positioning', desc: 'Tactical and philosophical conversations about owning your market position.' },
  { icon: '◉', label: 'Legacy Building', desc: 'What it means to build something that outlasts any single campaign or quarter.' },
]

export default function PodcastPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="page-hero-eyebrow reveal">The Show</p>
          <h1 className="reveal reveal-d1">
            Finally Seen™<br />
            <em>Podcast</em>
          </h1>
          <p className="page-hero-sub reveal reveal-d2">
            For ambitious women building bold brands, meaningful lives, and unforgettable legacies.
          </p>
          <div className="reveal reveal-d3" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 36 }}>
            <a
              href="https://podcasts.apple.com/ph/podcast/finally-seen/id1823745851"
              target="_blank"
              rel="noopener"
              className="btn-gold"
            >
              Listen on Apple Podcasts
            </a>
            <a
              href="https://youtube.com/@ChrissyBernal"
              target="_blank"
              rel="noopener"
              className="btn-ghost-light"
            >
              Watch on YouTube
            </a>
          </div>
        </div>
        <div className="page-hero-wave" />
      </section>

      {/* SECTION 1: ABOUT THE SHOW */}
      <section style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            {/* Podcast art */}
            <div className="reveal">
              <div style={{
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 24px 80px rgba(30,10,74,0.18)',
                border: '1px solid rgba(201,168,76,0.2)',
                maxWidth: 420,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/finally-seen-podcast.png"
                  alt="Finally Seen Podcast with Chrissy Bernal — episode art"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>

            {/* About text */}
            <div>
              <p className="sec-label reveal">About the Show</p>
              <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 28 }}>
                Conversations That<br /><em>Break the Invisible Ceiling</em>
              </h2>
              <p className="sec-p reveal reveal-d2" style={{ marginBottom: 20 }}>
                Finally Seen is not a business podcast that pretends building a brand is easy. It&apos;s an honest, strategic, soul-level conversation about what it takes for ambitious women to show up fully — in their businesses, in their lives, and in the markets they were built to lead.
              </p>
              <p className="sec-p reveal reveal-d2" style={{ marginBottom: 20 }}>
                Every episode, host Chrissy Bernal — founder of Be a Better Brand, PR strategist, and Guinness World Record mom — sits down with guests who have cracked a code she wants to share with her audience: the code of being truly, lastingly seen.
              </p>
              <p className="sec-p reveal reveal-d3" style={{ marginBottom: 32 }}>
                Topics range from brand positioning and PR strategy to leadership psychology, reinvention, and the mindset required to build a business that reflects who you actually are.
              </p>
              <div className="reveal reveal-d4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="https://podcasts.apple.com/ph/podcast/finally-seen/id1823745851" target="_blank" rel="noopener" className="btn-gold">
                  Apple Podcasts
                </a>
                <a href="https://youtube.com/@ChrissyBernal" target="_blank" rel="noopener" className="btn-outline-dark">
                  YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Theme chips */}
          <div style={{ marginTop: 72, paddingTop: 72, borderTop: '1px solid rgba(201,168,76,0.15)' }}>
            <p className="sec-label reveal" style={{ textAlign: 'center', marginBottom: 40 }}>Themes We Explore</p>
            <div className="reveal reveal-d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {THEMES.map((theme) => (
                <div
                  key={theme.label}
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: 12,
                    padding: '24px 24px',
                    borderLeft: '3px solid #c9a84c',
                    boxShadow: '0 2px 12px rgba(30,10,74,0.05)',
                  }}
                >
                  <span style={{ fontSize: 20, color: '#c9a84c', display: 'block', marginBottom: 10 }}>{theme.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1e0a4a', marginBottom: 6 }}>{theme.label}</div>
                  <div style={{ fontSize: 13, color: '#5a4070', lineHeight: 1.6 }}>{theme.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: EPISODES */}
      <section style={{ background: '#fff', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <p className="sec-label reveal">Recent Episodes</p>
            <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 16 }}>
              Latest Conversations from<br /><em>Finally Seen</em>
            </h2>
            <p className="sec-p reveal reveal-d2">
              New episodes drop regularly. Subscribe on your platform of choice so you never miss a conversation.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
            {EPISODES.map((ep, i) => (
              <a
                key={ep.number}
                href="https://podcasts.apple.com/ph/podcast/finally-seen/id1823745851"
                target="_blank"
                rel="noopener"
                className={`reveal reveal-d${i % 2 === 0 ? 1 : 2}`}
                style={{
                  display: 'block',
                  background: 'var(--cream)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 16,
                  padding: '32px 32px',
                  boxShadow: '0 4px 20px rgba(30,10,74,0.06)',
                  textDecoration: 'none',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: '#a07830',
                    background: 'rgba(201,168,76,0.12)',
                    padding: '4px 10px',
                    borderRadius: 4,
                  }}>{ep.number}</span>
                  <span style={{ color: '#c9a84c', fontSize: 18 }}>▶</span>
                </div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#a07830', letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' }}>
                  with {ep.guest}
                </p>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 22,
                  fontWeight: 600,
                  color: '#1e0a4a',
                  lineHeight: 1.3,
                  marginBottom: 14,
                }}>
                  {ep.title}
                </h3>
                <p style={{ fontSize: 14, color: '#5a4070', lineHeight: 1.7, marginBottom: 20 }}>
                  {ep.desc}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {ep.themes.map((theme) => (
                    <span key={theme} style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      color: '#5a4070',
                      background: 'rgba(30,10,74,0.05)',
                      padding: '3px 10px',
                      borderRadius: 4,
                    }}>{theme}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: LISTEN ON PLATFORMS */}
      <section style={{ background: 'linear-gradient(160deg, #1e0a4a, #2d1260)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <p className="reveal" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: 16 }}>Find the Show</p>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(32px, 4vw, 60px)', fontWeight: 300, color: '#fff', lineHeight: 1.12, marginBottom: 16 }}>
            Listen Wherever<br /><em style={{ color: '#c9a84c', fontStyle: 'italic' }}>You Are</em>
          </h2>
          <p className="reveal reveal-d2" style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 56 }}>
            Finally Seen is available on all major podcast platforms. Subscribe to get new episodes delivered automatically.
          </p>
          <div className="reveal reveal-d3" style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://podcasts.apple.com/ph/podcast/finally-seen/id1823745851"
              target="_blank"
              rel="noopener"
              className="btn-gold"
              style={{ padding: '18px 40px', fontSize: 15 }}
            >
              🎙 Apple Podcasts
            </a>
            <a
              href="https://youtube.com/@ChrissyBernal"
              target="_blank"
              rel="noopener"
              className="btn-ghost-light"
              style={{ padding: '18px 40px', fontSize: 15 }}
            >
              ▶ YouTube
            </a>
            <a
              href="https://open.spotify.com/search/Finally%20Seen%20Chrissy%20Bernal"
              target="_blank"
              rel="noopener"
              className="btn-ghost-light"
              style={{ padding: '18px 40px', fontSize: 15 }}
            >
              ♫ Spotify
            </a>
          </div>
          <div className="reveal reveal-d4" style={{ marginTop: 40, padding: '24px 32px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(201,168,76,0.15)', display: 'inline-block' }}>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>
              Subscribe, rate, and review — it genuinely helps the show reach more ambitious women who need it.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: BE A GUEST CTA */}
      <section style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <p className="sec-label reveal">Guest Applications</p>
              <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 24 }}>
                Want to Be a<br /><em>Guest on the Show?</em>
              </h2>
              <p className="sec-p reveal reveal-d2" style={{ marginBottom: 20 }}>
                Finally Seen features experts, entrepreneurs, authors, and leaders who have a story worth sharing — and a perspective that challenges ambitious women to think differently about how they build their brands and their lives.
              </p>
              <p className="sec-p reveal reveal-d3" style={{ marginBottom: 32 }}>
                If you have a breakthrough insight, a hard-won lesson, or a framework that has helped you go from stuck to seen, Chrissy wants to hear it.
              </p>
              <div className="reveal reveal-d4" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'You are a founder, author, or thought leader',
                  'You have a clear, specific lesson to share — not just a life story',
                  'Your audience overlaps with ambitious women in brand-building, leadership, or entrepreneurship',
                  'You can speak with authority and vulnerability in equal measure',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: '#c9a84c', flexShrink: 0, marginTop: 2 }}>◆</span>
                    <span style={{ fontSize: 15, color: '#5a4070', lineHeight: 1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
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
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))',
                  border: '1.5px solid rgba(201,168,76,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  color: '#c9a84c',
                  marginBottom: 24,
                }}>
                  🎙
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 300, color: '#1e0a4a', marginBottom: 16, lineHeight: 1.2 }}>
                  Pitch Your Guest Appearance
                </h3>
                <p style={{ fontSize: 15, color: '#5a4070', lineHeight: 1.8, marginBottom: 32 }}>
                  Tell us a little about you, your story, and the specific insight you&apos;d bring to the Finally Seen audience. We review every submission personally.
                </p>
                <a
                  href="https://go.oncehub.com/GettingToKnow"
                  target="_blank"
                  rel="noopener"
                  className="btn-gold"
                  style={{ width: '100%', textAlign: 'center', display: 'block' }}
                >
                  Apply to Be a Guest
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section style={{ background: 'linear-gradient(160deg, #1e0a4a, #2d1260)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <p className="page-hero-eyebrow reveal">Work With Chrissy</p>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
            Ready to Build Your<br /><em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Authority Brand?</em>
          </h2>
          <p className="reveal reveal-d2" style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 40 }}>
            The podcast is the conversation. The agency is where we do the work. If you&apos;re ready to go from invisible to undeniable, book a discovery call with Chrissy.
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
