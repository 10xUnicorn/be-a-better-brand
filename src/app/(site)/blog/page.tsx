import type { Metadata } from 'next'
import Link from 'next/link'
import NewsletterForm from './NewsletterForm'

export const metadata: Metadata = {
  title: 'Blog | Be a Better Brand',
  description:
    'Insights on brand architecture, PR strategy, AEO, and visibility from Chrissy Bernal and the Be a Better Brand team. Practical strategy for ambitious entrepreneurs and authors.',
}

const FEATURED = {
  category: 'Strategy & Vision',
  date: 'May 2025',
  title: 'How to Turn a Dream Into a Workable Plan',
  excerpt:
    'Every brand Chrissy has built — including her own — started as an idea that felt too big to execute. In this piece, she shares the exact process she uses with consulting clients to bridge the gap between a compelling vision and a plan that actually moves the needle on day one. Concrete, strategic, and immediately actionable.',
  readTime: '8 min read',
  url: 'https://beabetterbrand.com/blog',
}

const POSTS = [
  {
    category: 'Productivity & Mindset',
    date: 'April 2025',
    title: '5 Productivity Tips To Live By',
    excerpt: 'The productivity advice that actually works for entrepreneurs who can\'t afford to run on empty — from someone who built a business while homeschooling.',
    readTime: '5 min read',
    url: 'https://beabetterbrand.com/blog',
  },
  {
    category: 'Brand Strategy',
    date: 'April 2025',
    title: 'Stop Being Your Own Worst Client',
    excerpt: 'You pour everything into your clients\' brands while neglecting your own. Chrissy names the pattern and shows you how to break it for good.',
    readTime: '6 min read',
    url: 'https://beabetterbrand.com/blog',
  },
  {
    category: 'Purpose & Leadership',
    date: 'March 2025',
    title: 'More Important Than Money: Understanding Why You Really Do What You Do',
    excerpt: 'Before you can build a brand that resonates, you have to understand the driving force beneath your business. This is the question most entrepreneurs skip.',
    readTime: '7 min read',
    url: 'https://beabetterbrand.com/blog',
  },
  {
    category: 'Marketing & Growth',
    date: 'March 2025',
    title: '3 Proven Ways to Market Your New Business',
    excerpt: 'You don\'t need a massive budget or a big audience to start marketing effectively. You need these three foundational moves — in the right order.',
    readTime: '5 min read',
    url: 'https://beabetterbrand.com/blog',
  },
  {
    category: 'Goal Setting',
    date: 'February 2025',
    title: 'Beyond SMART: Goal Setting for Entrepreneurs',
    excerpt: 'SMART goals are a starting point, not a finish line. Here\'s how Chrissy sets goals that account for the beautiful chaos of entrepreneurial life.',
    readTime: '6 min read',
    url: 'https://beabetterbrand.com/blog',
  },
]

const CATEGORIES = [
  'Brand Strategy',
  'PR & Media',
  'AEO & Visibility',
  'Productivity & Mindset',
  'Goal Setting',
  'Marketing & Growth',
  'Purpose & Leadership',
]

export default function BlogPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="page-hero-eyebrow reveal">The Blog</p>
          <h1 className="reveal reveal-d1">
            Insights on Brand,<br />
            <em>Authority &amp; Visibility</em>
          </h1>
          <p className="page-hero-sub reveal reveal-d2">
            Practical strategy, honest perspective, and the behind-the-scenes thinking from Chrissy Bernal and the Be a Better Brand team.
          </p>
        </div>
        <div className="page-hero-wave" />
      </section>

      {/* CATEGORIES */}
      <section style={{ background: 'var(--cream)', padding: '40px 48px 0' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', paddingBottom: 40, borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#fff',
              background: '#1e0a4a',
              padding: '7px 16px',
              borderRadius: 6,
              cursor: 'default',
            }}>All Posts</span>
            {CATEGORIES.map((cat) => (
              <span key={cat} style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#5a4070',
                background: '#fff',
                border: '1px solid rgba(201,168,76,0.2)',
                padding: '7px 16px',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      <section style={{ background: 'var(--cream)', padding: '64px 48px 0' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <p className="sec-label reveal" style={{ marginBottom: 32 }}>Featured Article</p>
          <a
            href={FEATURED.url}
            target="_blank"
            rel="noopener"
            className="reveal reveal-d1"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 0,
              background: '#fff',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 8px 48px rgba(30,10,74,0.10)',
              textDecoration: 'none',
            }}
          >
            {/* Image placeholder with gradient */}
            <div style={{
              background: 'linear-gradient(160deg, #1e0a4a, #2d1260)',
              padding: '64px 56px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              minHeight: 400,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 30% 70%, rgba(201,168,76,0.15), transparent 65%)',
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 80,
                  fontWeight: 300,
                  color: 'rgba(201,168,76,0.12)',
                  lineHeight: 1,
                  position: 'absolute',
                  top: -20,
                  right: 0,
                }}>✦</div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', display: 'block', marginBottom: 16 }}>
                  Featured · {FEATURED.category}
                </span>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 38,
                  fontWeight: 300,
                  color: '#fff',
                  lineHeight: 1.2,
                }}>
                  {FEATURED.title}
                </h2>
              </div>
            </div>
            {/* Content */}
            <div style={{ padding: '56px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
                <span style={{ fontSize: 13, color: '#a07830', fontWeight: 600 }}>{FEATURED.date}</span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#c9a84c' }} />
                <span style={{ fontSize: 13, color: '#5a4070' }}>{FEATURED.readTime}</span>
              </div>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 26,
                fontWeight: 600,
                color: '#1e0a4a',
                lineHeight: 1.3,
                marginBottom: 20,
              }}>
                {FEATURED.title}
              </p>
              <p style={{ fontSize: 15, color: '#5a4070', lineHeight: 1.8, marginBottom: 36 }}>
                {FEATURED.excerpt}
              </p>
              <span style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#a07830',
                letterSpacing: 0.5,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                Read the full article
                <span style={{ fontSize: 18 }}>→</span>
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* BLOG GRID */}
      <section style={{ background: 'var(--cream)', padding: '64px 48px 96px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <p className="sec-label reveal" style={{ marginBottom: 40 }}>More Articles</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {POSTS.map((post, i) => (
              <a
                key={post.title}
                href={post.url}
                target="_blank"
                rel="noopener"
                className={`reveal reveal-d${(i % 3) + 1}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#fff',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(30,10,74,0.06)',
                  textDecoration: 'none',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                }}
              >
                {/* Color bar top */}
                <div style={{ height: 4, background: 'linear-gradient(90deg, #c9a84c, #e8c97a)' }} />
                <div style={{ padding: '28px 28px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      color: '#a07830',
                      background: 'rgba(201,168,76,0.1)',
                      padding: '3px 10px',
                      borderRadius: 4,
                    }}>{post.category}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                    <span style={{ fontSize: 12, color: '#5a4070' }}>{post.date}</span>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(201,168,76,0.4)' }} />
                    <span style={{ fontSize: 12, color: '#5a4070' }}>{post.readTime}</span>
                  </div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 22,
                    fontWeight: 600,
                    color: '#1e0a4a',
                    lineHeight: 1.3,
                    marginBottom: 14,
                    flex: '0 0 auto',
                  }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#5a4070', lineHeight: 1.7, flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(201,168,76,0.12)' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#a07830', letterSpacing: 0.3 }}>
                      Read more →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Load more link */}
          <div className="reveal" style={{ textAlign: 'center', marginTop: 56 }}>
            <a
              href="https://beabetterbrand.com/blog"
              target="_blank"
              rel="noopener"
              className="btn-outline-dark"
            >
              View All Articles on beabetterbrand.com →
            </a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section style={{ background: 'linear-gradient(160deg, #1e0a4a, #2d1260)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <p className="page-hero-eyebrow reveal">Stay in the Know</p>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
            Subscribe to the<br /><em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Newsletter</em>
          </h2>
          <p className="reveal reveal-d2" style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 40 }}>
            New articles, PR insights, AEO strategy updates, and brand-building frameworks — delivered to your inbox when they matter. No noise, no filler.
          </p>
          <div className="reveal reveal-d3">
            <NewsletterForm />
          </div>
          <p className="reveal reveal-d4" style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 16 }}>
            No spam. Unsubscribe anytime.
          </p>

          <div className="reveal" style={{ marginTop: 56, paddingTop: 56, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://go.oncehub.com/GettingToKnow" target="_blank" rel="noopener" className="btn-gold">
              Work With Chrissy
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
