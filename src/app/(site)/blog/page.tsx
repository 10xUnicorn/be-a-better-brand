import type { Metadata } from 'next'
import Link from 'next/link'
import NewsletterForm from './NewsletterForm'

export const metadata: Metadata = {
  title: 'Blog | Be a Better Brand',
  description:
    'Reduce the chaos in your journey to being known. Expert tips, strategies, and actionable insights on brand-building, PR, and entrepreneurship from Chrissy Bernal.',
}

const FEATURED = {
  title: 'How to Turn a Dream Into a Workable Plan',
  date: 'January 5, 2025',
  category: 'Strategy & Vision',
  url: 'https://beabetterbrand.com/how-to-turn-a-dream-into-a-workable-plan/',
  image: 'https://beabetterbrand.com/wp-content/uploads/2024/10/ation-1.png',
  excerpt: 'Many aspiring entrepreneurs have dreams of creating a sustainable business but struggle to turn those dreams into actionable plans. The key is to start with the long-term vision.',
}

const POSTS = [
  {
    title: '5 Productivity Tips To Live By',
    date: 'December 29, 2024',
    category: 'Productivity & Mindset',
    url: 'https://beabetterbrand.com/5-productivity-tips-to-live-by/',
    image: 'https://beabetterbrand.com/wp-content/uploads/2024/10/tips.png',
    excerpt: 'Dreaming of success isn\'t enough. Achieving it requires action. However, many of us struggle with execution—overbooking our schedules and procrastinating on key tasks.',
  },
  {
    title: 'Stop Being Your Own Worst Client',
    date: 'December 22, 2024',
    category: 'Brand Strategy',
    url: 'https://beabetterbrand.com/stop-being-your-own-worst-client/',
    image: 'https://beabetterbrand.com/wp-content/uploads/2024/10/priorities.png',
    excerpt: 'Imagine if you had a client who constantly made excuses: too busy to write a book, overwhelmed with tasks, and never following through.',
  },
  {
    title: 'More Important Than Money: Understanding Why You Really Do What You Do',
    date: 'December 15, 2024',
    category: 'Purpose & Leadership',
    url: 'https://beabetterbrand.com/more-important-than-money-understanding-why-you-really-do-what-you-do/',
    image: 'https://beabetterbrand.com/wp-content/uploads/2024/10/why.png',
    excerpt: "What do successful small business owners have in common? It's not experience, extraordinary skills, or even relentless drive. What sets them apart is their 'why.'",
  },
  {
    title: '3 Proven Ways to Market Your New Business',
    date: 'December 8, 2024',
    category: 'Marketing & Growth',
    url: 'https://beabetterbrand.com/3-proven-ways-to-market-your-new-business/',
    image: 'https://beabetterbrand.com/wp-content/uploads/2024/10/market-your-business.png',
    excerpt: 'The market is brimming with great ideas and talented entrepreneurs whose products aren\'t selling. The reality is that success isn\'t just about having a good idea—it\'s about effective marketing.',
  },
  {
    title: 'Beyond SMART: Goal Setting for Entrepreneurs',
    date: 'December 1, 2024',
    category: 'Goal Setting',
    url: 'https://beabetterbrand.com/beyond-smart-goal-setting-for-entrepreneurs/',
    image: 'https://beabetterbrand.com/wp-content/uploads/2024/10/smart-goal.png',
    excerpt: "We've all heard the advice: set SMART goals. Specific, Measurable, Attainable, Realistic, and Timely. But what if those so-called 'smart' goals hold you back from your true potential?",
  },
]

const CATEGORIES = [
  'Brand Strategy',
  'PR & Media',
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
            Want to elevate your brand?<br />
            <em>Check out our blog</em>
          </h1>
          <p className="page-hero-sub reveal reveal-d2">
            Reduce the chaos in your journey to being known. Expert tips, strategies, and actionable insights for entrepreneurs, authors, and ambitious brand-builders.
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
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#c9a84c,#e8c97a)', zIndex: 10 }} />
            {/* Image */}
            <div style={{
              overflow: 'hidden',
              minHeight: 400,
              position: 'relative',
              background: '#1e0a4a',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FEATURED.image}
                alt={FEATURED.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,10,74,0.7), transparent)' }} />
              <div style={{ position: 'absolute', bottom: 32, left: 40 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(201,168,76,0.9)', display: 'block' }}>
                  Featured · {FEATURED.category}
                </span>
              </div>
            </div>
            {/* Content */}
            <div style={{ padding: '56px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
                <span style={{ fontSize: 13, color: '#a07830', fontWeight: 600 }}>{FEATURED.date}</span>
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 28,
                fontWeight: 600,
                color: '#1e0a4a',
                lineHeight: 1.3,
                marginBottom: 20,
              }}>
                {FEATURED.title}
              </h2>
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
                Read the full article <span style={{ fontSize: 18 }}>→</span>
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
                }}
              >
                {/* Post image */}
                <div style={{ height: 180, overflow: 'hidden', position: 'relative', background: '#f0ece4' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#c9a84c,#e8c97a)' }} />
                </div>
                <div style={{ padding: '24px 28px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
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
                  <span style={{ fontSize: 12, color: '#5a4070', marginBottom: 12 }}>{post.date}</span>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#1e0a4a',
                    lineHeight: 1.3,
                    marginBottom: 12,
                    flex: '0 0 auto',
                  }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#5a4070', lineHeight: 1.7, flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(201,168,76,0.12)' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#a07830', letterSpacing: 0.3 }}>
                      Read more →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

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
            New articles, PR insights, and brand-building frameworks — delivered to your inbox when they matter. No noise, no filler.
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
