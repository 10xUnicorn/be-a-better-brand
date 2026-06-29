import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PR Services | Be a Better Brand',
  description:
    'Six-month strategic PR campaigns for entrepreneurs and authors. Brand audit, StoryBrand messaging, media kit, custom pitches, and active outreach that delivers real results. Book a discovery call.',
}

const DELIVERABLES = [
  'Establish a Solid Brand',
  'Social Media Audit',
  'Online Presence Audit',
  'SWOT Analysis',
  'One-Sheet',
  'Media Kit',
  'Custom PR Plan',
  'Custom Pitches',
  'Reports',
  'Growth Consulting',
  'Best-Seller Road Map',
  'Media Coaching',
]

const CASE_STUDIES = [
  {
    label: 'Service-Based Business',
    tag: 'Lead Generation',
    story:
      'This client was a fairly new brand that needed solid leads for their service-based business. After nailing down their messaging and goals, we began targeting very niche-specific outlets. Within the first few interviews she took part in, she received extremely qualified leads, another expert sourcing opportunity, and additional leads for a smaller branch of her company. Within a short amount of time, she was able to secure business opportunities that could more than pay for her Marketing and PR retainer.',
  },
  {
    label: 'Author & Speaker',
    tag: 'Book & Speaking',
    story:
      "This client's goal was to sell more books and get more speaking gigs (both paid and unpaid). After nailing down her message and speaking points, we began targeting smaller outlets so she could test out the points. We moved to larger outlets and local venues. We achieved many PR opportunities within the first few months, which resulted in a minimum of one paid speaking gig and aided in her achieving International Best-Seller status.",
  },
  {
    label: 'Best-Seller Campaign',
    tag: 'Top-Tier Placements',
    story:
      'Her goal was to achieve best-seller status and get as many quality mentions of her brand and book as possible. Her book debuted as a best-seller, she appeared in many high-quality outlets, including TV, and she quickly received a full-length feature in a top-tier outlet. Her book continues to remain a best-seller in multiple categories.',
  },
]

const FAQS = [
  {
    q: 'How does the six-month campaign begin?',
    a: "Your six-month PR campaign will begin with an onboarding call where we'll establish your messaging using the StoryBrand messaging framework. Then, our team will craft your messaging. Our founder, Chrissy, will establish your custom PR plan; we'll begin identifying the target outlets and crafting the pitches. We'll also make sure your brand has what it needs for a solid foundation, and we'll audit your current online presence.",
  },
  {
    q: 'What types of clients do you typically work with?',
    a: 'We specialize in working with authors, entrepreneurs, and podcasters who want to build lasting authority. We have experience with service-based businesses, authors building their platforms, speakers pursuing paid opportunities, and executives seeking thought leadership placements.',
  },
  {
    q: 'How long before I start seeing results?',
    a: 'PR takes time to build momentum. The first one to two months focus on establishing your brand foundation, messaging, and PR plan. Outreach begins in earnest by month two or three, and placements typically begin appearing from month three onward. Some clients secure coverage faster, especially with a strong existing brand foundation.',
  },
  {
    q: 'What makes Be a Better Brand different from other PR firms?',
    a: 'We begin every engagement with brand architecture — not pitching. That means we invest the early months in making sure your messaging is crystal clear before we put it in front of journalists and editors. This architecture-first approach produces placements that actually convert to business results, not just logo-farm mentions.',
  },
  {
    q: 'Do you guarantee placements?',
    a: 'No ethical PR firm can guarantee specific placements — editorial decisions are ultimately made by editors and producers. What we can guarantee is that our team will craft compelling, targeted pitches and pursue placements with persistence and professionalism. Our track record speaks for itself.',
  },
  {
    q: 'What is the Best-Seller Road Map?',
    a: 'For authors in our campaigns, we develop a strategic road map designed to help your book achieve Amazon bestseller status. This includes coordinated PR timing, category strategy, and the right mix of media placements to drive review and purchase momentum during launch windows.',
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
            Increase Your Audience and<br />
            <em>Improve Your Authority</em><br />
            with Strategic PR
          </h1>
          <p className="page-hero-sub reveal reveal-d2">
            Six months of focused, architecture-first media strategy — from brand audit and StoryBrand messaging to active outreach and placements that move the needle on your business.
          </p>
          <div className="reveal reveal-d3" style={{ marginTop: 36 }}>
            <a href="https://go.oncehub.com/GettingToKnow" target="_blank" rel="noopener" className="btn-gold">
              Book a Discovery Call
            </a>
          </div>
        </div>
        <div className="page-hero-wave" />
      </section>

      {/* SECTION 1: HOW IT WORKS */}
      <section style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
            <div>
              <p className="sec-label reveal">The Process</p>
              <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 28 }}>
                Architecture First.<br /><em>Then Pitching.</em>
              </h2>
              <p className="sec-p reveal reveal-d2" style={{ marginBottom: 20 }}>
                Your six-month PR campaign will begin with an onboarding call where we&apos;ll establish your messaging using the StoryBrand messaging framework. Then, our team will craft your messaging.
              </p>
              <p className="sec-p reveal reveal-d2" style={{ marginBottom: 20 }}>
                Our founder, Chrissy, will establish your custom PR plan; we&apos;ll begin identifying the target outlets and crafting the pitches. We&apos;ll also make sure your brand has what it needs for a solid foundation, and we&apos;ll audit your current online presence.
              </p>
              <p className="sec-p reveal reveal-d3" style={{ marginBottom: 32 }}>
                Every element is built for lasting authority — not vanity metrics. You&apos;ll receive monthly reports that translate media coverage into Ad Equivalent Value so you always know the ROI of your campaign.
              </p>
              <div className="reveal reveal-d4">
                <a href="https://go.oncehub.com/GettingToKnow" target="_blank" rel="noopener" className="btn-gold">
                  Start Your Campaign
                </a>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { label: 'Month 1–2: Foundation', desc: 'Brand audit, StoryBrand messaging, online presence audit, SWOT analysis, and one-sheet creation.' },
                { label: 'Month 2–3: Media Materials', desc: 'Media kit design and copy, custom PR plan, targeted pitch development, and Best-Seller Road Map.' },
                { label: 'Month 3–6: Active Outreach', desc: 'Pitching to target outlets, podcast bookings, speaker opportunities, and media coaching for interviews.' },
                { label: 'Ongoing: Growth Consulting', desc: 'Monthly reports with Ad Equivalent Value, strategy check-ins, and continuous campaign refinement.' },
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
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#c9a84c,#e8c97a)' }} />
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#a07830', letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>{item.label}</div>
                  <div style={{ fontSize: 15, color: '#5a4070', lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DELIVERABLES */}
      <section style={{ background: 'linear-gradient(160deg, #1e0a4a, #2d1260)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <p className="reveal" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: 16 }}>Everything Included</p>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(32px, 4vw, 60px)', fontWeight: 300, color: '#fff', lineHeight: 1.12, letterSpacing: '-0.3px' }}>
              Your Campaign<br /><em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Deliverables</em>
            </h2>
            <p className="reveal reveal-d2" style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginTop: 16, maxWidth: 540, margin: '16px auto 0' }}>
              Twelve core deliverables designed to build a brand that attracts attention and converts it into business results.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {DELIVERABLES.map((item, i) => (
              <div
                key={item}
                className={`reveal reveal-d${(i % 4) + 1}`}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 12,
                  padding: '28px 24px',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#c9a84c,#e8c97a)' }} />
                <div style={{ fontSize: 28, color: 'rgba(201,168,76,0.2)', fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, marginBottom: 8, lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CASE STUDIES */}
      <section style={{ background: '#fff', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <p className="sec-label reveal">Real Client Results</p>
            <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 16 }}>
              What Our Campaigns<br /><em>Accomplish in the Real World</em>
            </h2>
            <p className="sec-p reveal reveal-d2">
              Three stories from real campaigns. Names withheld by client request.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {CASE_STUDIES.map((cs, i) => (
              <div
                key={cs.label}
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
                  width: 'fit-content',
                }}>{cs.tag}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 300, color: '#1e0a4a', lineHeight: 1.2 }}>{cs.label}</h3>
                <p style={{ fontSize: 15, color: '#5a4070', lineHeight: 1.8 }}>{cs.story}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: FAQ */}
      <section style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p className="sec-label reveal">Common Questions</p>
          <h2 className="sec-h2 reveal reveal-d1" style={{ marginBottom: 56 }}>
            Frequently Asked<br /><em>Questions</em>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`reveal reveal-d${(i % 4) + 1}`}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 12,
                  padding: '28px 32px',
                  boxShadow: '0 2px 16px rgba(30,10,74,0.05)',
                }}
              >
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, fontWeight: 600, color: '#1e0a4a', marginBottom: 12 }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: 15, color: '#5a4070', lineHeight: 1.8 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK CTA */}
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
