import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Discovery Call | Be a Better Brand',
  description: 'Schedule a 20-minute discovery call with Chrissy Bernal. Identify your authority gap and determine the right path to visibility.',
}

export default function BookPage() {
  return (
    <>
      <style>{`
        .book-hero { background: linear-gradient(160deg,#1e0a4a,#2d1260,#1a0835); padding: 120px 48px 80px; text-align: center; position: relative; overflow: hidden; }
        .book-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 50% 60%, rgba(201,168,76,.1), transparent 65%); pointer-events:none; }
        .book-hero h1 { font-family:'Cormorant Garamond',Georgia,serif; font-size:clamp(40px,5.5vw,72px); font-weight:300; color:#fff; line-height:1.1; letter-spacing:-0.5px; margin-bottom:16px; position:relative; z-index:1; }
        .book-hero h1 em { font-style:italic; color:#c9a84c; }
        .book-hero p { font-size:18px; color:rgba(255,255,255,.55); line-height:1.8; max-width:520px; margin:0 auto 16px; position:relative; z-index:1; }
        .book-wave { position:absolute; bottom:0; left:0; right:0; height:80px; background:linear-gradient(to bottom,transparent,#f6f1ea); }
        .book-body { max-width:900px; margin:0 auto; padding:56px 48px 96px; }
        .cal-wrap { border-radius:18px; overflow:hidden; box-shadow:0 8px 48px rgba(30,10,74,.15); border:1px solid rgba(201,168,76,.15); margin-bottom:72px; background:#fff; }
        .expect-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .expect-card { background:#fff; border:1px solid rgba(201,168,76,.18); border-radius:14px; padding:28px; position:relative; overflow:hidden; }
        .expect-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#c9a84c,#e8c97a); }
        .expect-num { font-family:'Cormorant Garamond',Georgia,serif; font-size:40px; font-weight:700; color:rgba(201,168,76,.25); line-height:1; margin-bottom:10px; }
        .expect-title { font-family:'Cormorant Garamond',Georgia,serif; font-size:19px; font-weight:700; color:#1e0a4a; margin-bottom:8px; }
        .expect-desc { font-size:14px; color:#5a4070; line-height:1.75; }
        .sec-lbl { font-size:10px; font-weight:700; letter-spacing:4px; text-transform:uppercase; color:#a07830; margin-bottom:16px; }
        .sec-h2 { font-family:'Cormorant Garamond',Georgia,serif; font-size:clamp(28px,3.5vw,48px); font-weight:300; color:#1e0a4a; line-height:1.15; margin-bottom:32px; }
        .sec-h2 em { font-style:italic; color:#a07830; }
        @media(max-width:768px){ .book-hero{padding:100px 24px 60px;} .book-body{padding:40px 24px 64px;} .expect-grid{grid-template-columns:1fr;} }
      `}</style>

      {/* Hero */}
      <section className="book-hero">
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(201,168,76,.7)', marginBottom: 20, position: 'relative', zIndex: 1 }}>
          Get to Know One Another
        </p>
        <h1>Book Your <em>Discovery Call</em></h1>
        <p>20 minutes. No obligation. Just clarity on whether — and how — we can help close your authority gap.</p>
        <div className="book-wave" />
      </section>

      {/* Calendar + What to expect */}
      <div className="book-body">
        {/* Embedded GHL Calendar */}
        <div className="cal-wrap">
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/p3mCKH9WzIfzF6Bqjuee"
            style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: 700, display: 'block' }}
            scrolling="no"
            title="Book a discovery call with Chrissy Bernal"
          />
        </div>

        {/* Inline script for GHL */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://link.msgsndr.com/js/form_embed.js" type="text/javascript" />

        {/* What to expect */}
        <div style={{ marginBottom: 48 }}>
          <p className="sec-lbl" style={{ textAlign: 'center' }}>What to Expect</p>
          <h2 className="sec-h2" style={{ textAlign: 'center' }}>
            20 minutes that could change your <em>trajectory</em>
          </h2>
        </div>
        <div className="expect-grid">
          {[
            { n: '01', title: 'Your Authority Gap', desc: 'Chrissy will quickly identify the single constraint standing between your earned authority and the visibility you deserve.' },
            { n: '02', title: 'Your Right Path', desc: 'Based on where you are, she\'ll map the right engagement path — whether that\'s a Gap Session, retainer, book launch, or sprint.' },
            { n: '03', title: 'A Clear Next Step', desc: 'You\'ll leave knowing exactly what to do — whether we work together or not. No pressure, no pitch, just clarity.' },
          ].map(c => (
            <div key={c.n} className="expect-card">
              <div className="expect-num">{c.n}</div>
              <div className="expect-title">{c.title}</div>
              <p className="expect-desc">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust signals */}
        <div style={{ marginTop: 64, padding: '40px 48px', background: 'linear-gradient(145deg,#1e0a4a,#2d1260)', borderRadius: 18, textAlign: 'center' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 24, fontStyle: 'italic', color: '#f0c370', lineHeight: 1.6 }}>
            &ldquo;Your authority is ready. Now it becomes visible.&rdquo;
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', marginTop: 16, letterSpacing: '1px' }}>
            — Chrissy Bernal, Founder · Be a Better Brand
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 32, flexWrap: 'wrap' }}>
            {[['15+', 'Years Experience'], ['$500k+', 'Monthly AVE'], ['80%', 'Gap Session Conversion']].map(([n, l]) => (
              <div key={n}>
                <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 30, fontWeight: 700, color: '#c9a84c' }}>{n}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
