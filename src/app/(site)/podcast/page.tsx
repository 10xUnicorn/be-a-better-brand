import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Finally Seen Podcast | Be a Better Brand',
  description:
    'Finally Seen — hosted by Chrissy Bernal, Visibility Strategist and Brand Architect. For ambitious women building bold brands, meaningful lives, and unforgettable legacies. Listen on Apple Podcasts and YouTube.',
}

const EPISODES = [
  {
    guest: 'Ben Albert',
    date: 'June 17, 2026',
    url: 'https://beabetterbrand.com/ben-albert/',
    image: 'https://beabetterbrand.com/wp-content/uploads/2026/06/Finally-Seen-Podcast-Cover-Art-2-1024x1024.png',
    desc: 'A conversation about community, connection, and what it really takes to build a network that spans continents and opens doors you never imagined.',
  },
  {
    guest: 'Dawn Andrews',
    date: 'June 11, 2026',
    url: 'https://beabetterbrand.com/dawn-andrews/',
    image: 'https://beabetterbrand.com/wp-content/uploads/2026/06/Finally-Seen-Podcast-Cover-Art-1024x1024.png',
    desc: 'Leadership strategist Dawn Andrews on what happens when working harder stops working — and the frameworks that help high-performers break through.',
  },
  {
    guest: 'Dr. Bill Clark',
    date: 'June 3, 2026',
    url: 'https://beabetterbrand.com/dr-bill-clark/',
    image: null,
    desc: 'Conscious leadership and self-awareness as competitive advantage. Dr. Bill Clark brings clinical psychology meets business strategy to the conversation.',
  },
  {
    guest: 'Mark A. Dulaney',
    date: 'May 19, 2026',
    url: 'https://beabetterbrand.com/mark-a-dulaney/',
    image: null,
    desc: 'Why smart, capable people stay stuck — and the hidden barriers of identity, fear, and misaligned systems that block talented entrepreneurs from breaking through.',
  },
  {
    guest: 'Ann Kelley',
    date: 'April 28, 2026',
    url: 'https://beabetterbrand.com/ann-kelley/',
    image: null,
    desc: "What if the problem isn't you? Ann Kelley challenges one of the most damaging narratives in entrepreneurship and shows you how to tell the difference.",
  },
  {
    guest: 'Paige Arnof-Fenn',
    date: 'April 7, 2026',
    url: 'https://beabetterbrand.com/paige-arnof-fenn/',
    image: null,
    desc: "Marketing legend Paige Arnof-Fenn on the most overlooked reason that expert-led businesses plateau — and what it takes to finally start scaling.",
  },
  {
    guest: 'Suzy McNamara',
    date: 'March 18, 2026',
    url: 'https://beabetterbrand.com/suzy-mcnamara/',
    image: null,
    desc: 'A candid conversation about reinvention, resilience, and what it means to build a life and business that reflects who you truly are.',
  },
  {
    guest: 'Beth Jones',
    date: 'March 3, 2026',
    url: 'https://beabetterbrand.com/beth-jones/',
    image: null,
    desc: 'Beth Jones on showing up fully in business and life — the mindset shifts and practical strategies that help women lead with confidence and clarity.',
  },
  {
    guest: 'Debra Eckerling',
    date: 'February 25, 2026',
    url: 'https://beabetterbrand.com/debra-eckerling/',
    image: null,
    desc: 'Goal-setting, project planning, and the art of getting things done as a creative entrepreneur. Debra Eckerling shares her proven frameworks.',
  },
]

export default function PodcastPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="page-hero-eyebrow reveal">The Show</p>
          <h1 className="reveal reveal-d1">
            Finally Seen<br />
            <em>Podcast</em>
          </h1>
          <p className="page-hero-sub reveal reveal-d2">
            For ambitious women building bold brands, meaningful lives, and unforgettable legacies.
          </p>
          <div className="reveal reveal-d3" style={{ marginTop: 12, marginBottom: 4 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontStyle: 'italic', color: 'rgba(201,168,76,0.85)', lineHeight: 1.4 }}>
              It&apos;s about being seen, heard, and paid.
            </p>
          </div>
          <div className="reveal reveal-d4" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 32 }}>
            <a href="https://podcasts.apple.com/ph/podcast/finally-seen/id1823745851" target="_blank" rel="noopener" className="btn-gold">
              Listen on Apple Podcasts
            </a>
            <a href="https://www.youtube.com/@ChrissyBernal" target="_blank" rel="noopener" className="btn-ghost-light">
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
                  alt="Finally Seen Podcast with Chrissy Bernal"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>

            {/* About text */}
            <div>
              <p className="sec-label reveal">About the Show</p>
              <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 28 }}>
                Hosted by<br /><em>Chrissy Bernal</em>
              </h2>
              <p className="sec-p reveal reveal-d2" style={{ marginBottom: 20 }}>
                Hosted by Chrissy Bernal, Visibility Strategist and Brand Architect, this podcast blends bold conversations with real-life reinvention to help you show up fully and be recognized for who you truly are, not just what you do.
              </p>
              <p className="sec-p reveal reveal-d2" style={{ marginBottom: 20 }}>
                Here, we believe women are never just one thing. We honor the complexity of your story, and we celebrate your desire to grow. From business and branding to motherhood, mindset, and personal power, this is a space for women (ok, men, too heehee) who are done hiding and ready to lead.
              </p>
              <p className="sec-p reveal reveal-d3" style={{ marginBottom: 32, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontStyle: 'italic', color: 'var(--gold-text)' }}>
                It&apos;s about being seen, heard, and paid.
              </p>
              <div className="reveal reveal-d4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="https://podcasts.apple.com/ph/podcast/finally-seen/id1823745851" target="_blank" rel="noopener" className="btn-gold">
                  Apple Podcasts
                </a>
                <a href="https://www.youtube.com/@ChrissyBernal" target="_blank" rel="noopener" className="btn-outline-dark">
                  YouTube
                </a>
              </div>
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

          {/* Featured top two with images */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 28 }}>
            {EPISODES.slice(0, 2).map((ep, i) => (
              <a
                key={ep.guest}
                href={ep.url}
                target="_blank"
                rel="noopener"
                className={`reveal reveal-d${i + 1}`}
                style={{
                  display: 'block',
                  background: 'var(--cream)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(30,10,74,0.08)',
                  textDecoration: 'none',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#c9a84c,#e8c97a)', zIndex: 10 }} />
                {ep.image && (
                  <div style={{ height: 220, overflow: 'hidden', background: '#1e0a4a' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ep.image}
                      alt={`Finally Seen Podcast — ${ep.guest}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                )}
                <div style={{ padding: '28px 32px 32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 12, color: '#a07830', fontWeight: 600 }}>{ep.date}</span>
                    <span style={{ color: '#c9a84c', fontSize: 16 }}>▶</span>
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#a07830', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
                    with {ep.guest}
                  </p>
                  <p style={{ fontSize: 15, color: '#5a4070', lineHeight: 1.7 }}>{ep.desc}</p>
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(201,168,76,0.15)' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#a07830' }}>Listen now →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Remaining episodes as list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {EPISODES.slice(2).map((ep, i) => (
              <a
                key={ep.guest}
                href={ep.url}
                target="_blank"
                rel="noopener"
                className={`reveal reveal-d${(i % 3) + 1}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: 24,
                  alignItems: 'center',
                  background: 'var(--cream)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 14,
                  padding: '24px 28px',
                  boxShadow: '0 2px 12px rgba(30,10,74,0.05)',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: 'linear-gradient(180deg,#c9a84c,#e8c97a)' }} />
                <div style={{ paddingLeft: 12 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#a07830', letterSpacing: 2, textTransform: 'uppercase' }}>
                      {ep.guest}
                    </span>
                    <span style={{ fontSize: 12, color: '#5a4070' }}>{ep.date}</span>
                  </div>
                  <p style={{ fontSize: 14, color: '#5a4070', lineHeight: 1.6 }}>{ep.desc}</p>
                </div>
                <div style={{ flexShrink: 0 }}>
                  <span style={{ color: '#c9a84c', fontSize: 20 }}>▶</span>
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
              Apple Podcasts
            </a>
            <a
              href="https://www.youtube.com/@ChrissyBernal"
              target="_blank"
              rel="noopener"
              className="btn-ghost-light"
              style={{ padding: '18px 40px', fontSize: 15 }}
            >
              YouTube
            </a>
          </div>
          <div className="reveal reveal-d4" style={{ marginTop: 40, padding: '24px 32px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(201,168,76,0.15)', display: 'inline-block' }}>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>
              Subscribe, rate, and review — it genuinely helps the show reach more ambitious women who need it.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: BE A GUEST */}
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
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#c9a84c,#e8c97a)' }} />
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

      {/* DARK CTA */}
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
