import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Be a Better Brand | Magnetic Brand Architecture, Marketing & PR',
  description: 'Finally Seen™ — Brand architecture, strategic PR, and marketing strategy for authors, entrepreneurs, and expert-led brands. 15+ years. $500k+ monthly Ad Equivalent Value.',
  keywords: 'brand architecture, PR for authors, marketing strategy, public relations, Chrissy Bernal, Finally Seen framework, AEO, brand visibility',
  openGraph: {
    title: 'Be a Better Brand | Magnetic Brand Architecture, Marketing & PR',
    description: 'The people who need you should be able to find you.',
    url: 'https://be-a-better-brand.vercel.app',
    siteName: 'Be a Better Brand',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        :root {
          --cream:#f6f1ea; --cream-dk:#ede9e0; --plum:#1e0a4a; --plum-mid:#2d1260;
          --gold:#c9a84c; --gold-lt:#e8c97a; --gold-text:#a07830; --text:#1a0f2e; --text-m:#5a4070;
        }
        html { scroll-behavior:smooth; }
        body { font-family:'DM Sans',sans-serif; background:var(--cream); color:var(--text); overflow-x:hidden; }
        h1,h2,h3,h4 { font-family:'Cormorant Garamond',Georgia,serif; }

        /* ── NAV ── */
        .hn { position:fixed; top:0; left:0; right:0; z-index:200; display:flex; align-items:center; justify-content:space-between; padding:0 48px; height:76px; background:rgba(246,241,234,0.88); backdrop-filter:blur(24px) saturate(180%); border-bottom:1px solid rgba(201,168,76,0.18); }
        .hn-logo img { height:42px; }
        .hn-links { display:flex; gap:30px; list-style:none; }
        .hn-links a { font-size:13.5px; font-weight:500; color:var(--text-m); text-decoration:none; letter-spacing:.4px; transition:color .2s; }
        .hn-links a:hover { color:var(--text); }
        .hn-r { display:flex; gap:12px; align-items:center; }
        .hn-login { padding:9px 20px; border-radius:8px; border:1.5px solid rgba(201,168,76,.45); color:var(--gold-text); font-size:13px; font-weight:600; text-decoration:none; transition:all .2s; }
        .hn-login:hover { background:rgba(201,168,76,.1); border-color:var(--gold); }
        .hn-cta { padding:10px 22px; border-radius:8px; background:linear-gradient(135deg,#c9a84c,#e8c97a); color:var(--plum); font-size:13px; font-weight:700; text-decoration:none; transition:all .2s; }
        .hn-cta:hover { transform:translateY(-1px); box-shadow:0 4px 20px rgba(201,168,76,.35); }

        /* ── HERO ── */
        .hero { min-height:100dvh; background:linear-gradient(160deg,#1e0a4a 0%,#2d1260 45%,#1a0835 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:100px 24px 80px; position:relative; overflow:hidden; }

        /* Particle canvas */
        #particles-canvas { position:absolute; inset:0; pointer-events:none; opacity:.5; }

        /* Radial glow */
        .hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 50% 55%, rgba(201,168,76,.13) 0%, transparent 65%); pointer-events:none; }

        /* Gold accent ring */
        .hero-ring { position:absolute; width:700px; height:700px; border-radius:50%; border:1px solid rgba(201,168,76,.08); animation:ringPulse 8s ease-in-out infinite; }
        .hero-ring-2 { width:500px; height:500px; border-color:rgba(201,168,76,.06); animation:ringPulse 8s ease-in-out 2s infinite; }
        .hero-ring-3 { width:300px; height:300px; border-color:rgba(201,168,76,.1); animation:ringPulse 8s ease-in-out 4s infinite; }

        .hero-content { position:relative; z-index:2; max-width:920px; }
        .hero-eyebrow { font-size:11px; font-weight:700; letter-spacing:5px; text-transform:uppercase; color:rgba(201,168,76,.75); margin-bottom:32px; animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .3s both; }
        .hero-eyebrow span { display:inline-block; width:32px; height:1px; background:rgba(201,168,76,.4); vertical-align:middle; margin:0 12px; }

        .hero-h1 { font-size:clamp(52px,7.5vw,104px); font-weight:300; color:#fff; line-height:1.05; letter-spacing:-2px; overflow:hidden; }
        .hero-h1-line { display:block; animation:slideUp .9s cubic-bezier(.16,1,.3,1) both; }
        .hero-h1-line:nth-child(1) { animation-delay:.5s; }
        .hero-h1-line:nth-child(2) { animation-delay:.7s; }
        .hero-h1-line em { font-style:italic; color:#c9a84c; }

        .hero-rule { width:60px; height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,.6),transparent); margin:36px auto; animation:fadeIn 1s .9s both; }

        .hero-sub { font-size:18px; font-weight:300; color:rgba(255,255,255,.55); max-width:540px; margin:0 auto; line-height:1.8; animation:fadeUp .8s cubic-bezier(.16,1,.3,1) 1.1s both; }

        .hero-ctas { display:flex; gap:16px; justify-content:center; margin-top:52px; flex-wrap:wrap; animation:fadeUp .8s cubic-bezier(.16,1,.3,1) 1.3s both; }
        .h-btn-gold { padding:17px 40px; border-radius:10px; background:linear-gradient(135deg,#c9a84c,#e8c97a); color:var(--plum); font-size:15px; font-weight:700; text-decoration:none; letter-spacing:.3px; transition:all .25s; border:none; cursor:pointer; }
        .h-btn-gold:hover { transform:translateY(-3px); box-shadow:0 10px 36px rgba(201,168,76,.45); }
        .h-btn-ghost { padding:17px 40px; border-radius:10px; border:1.5px solid rgba(255,255,255,.18); color:rgba(255,255,255,.8); font-size:15px; font-weight:400; text-decoration:none; transition:all .25s; letter-spacing:.3px; }
        .h-btn-ghost:hover { border-color:#c9a84c; color:#c9a84c; }

        /* Stats ribbon */
        .hero-stats { display:flex; gap:0; margin-top:72px; animation:fadeUp .8s cubic-bezier(.16,1,.3,1) 1.6s both; }
        .hero-stat { flex:1; text-align:center; padding:20px 28px; border-left:1px solid rgba(255,255,255,.08); }
        .hero-stat:first-child { border-left:none; }
        .hero-stat-num { font-family:'Cormorant Garamond',Georgia,serif; font-size:36px; font-weight:600; color:#c9a84c; line-height:1; }
        .hero-stat-lbl { font-size:11px; color:rgba(255,255,255,.4); margin-top:6px; letter-spacing:.5px; }

        /* Scroll cue */
        .scroll-cue { position:absolute; bottom:32px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:8px; animation:fadeIn 1s 2s both; }
        .scroll-cue span { font-size:9px; letter-spacing:3px; text-transform:uppercase; color:rgba(255,255,255,.25); }
        .scroll-line { width:1px; height:44px; background:linear-gradient(to bottom,rgba(201,168,76,.7),transparent); animation:scrollDrop 2.2s ease-in-out 2.5s infinite; }

        /* Wave */
        .hero-wave { position:absolute; bottom:0; left:0; right:0; height:100px; background:linear-gradient(to bottom,transparent,var(--cream)); }

        /* ── LOGOS ── */
        .logos { background:var(--cream); padding:52px 24px; border-bottom:1px solid rgba(201,168,76,.12); }
        .logos-lbl { text-align:center; font-size:10px; font-weight:700; letter-spacing:4px; text-transform:uppercase; color:var(--text-m); margin-bottom:28px; opacity:.6; }
        .logos-row { display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:40px 56px; max-width:1000px; margin:0 auto; }
        .logo-txt { font-family:'Cormorant Garamond',Georgia,serif; font-size:17px; font-weight:600; color:var(--text-m); opacity:.5; letter-spacing:.3px; transition:opacity .2s; }
        .logo-txt:hover { opacity:.85; }

        /* ── SECTIONS ── */
        .sec { padding:112px 48px; max-width:1160px; margin:0 auto; }
        .sec-full { padding:112px 48px; }
        .sec-lbl { font-size:10px; font-weight:700; letter-spacing:4px; text-transform:uppercase; color:var(--gold-text); margin-bottom:16px; }
        .sec-h2 { font-size:clamp(36px,4.5vw,68px); font-weight:300; color:var(--plum); line-height:1.1; letter-spacing:-.5px; }
        .sec-h2 em { font-style:italic; color:var(--gold-text); }
        .sec-p { font-size:16px; color:var(--text-m); line-height:1.85; max-width:600px; }

        /* ── ABOUT ── */
        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; max-width:1100px; margin:0 auto; }
        .about-img { position:relative; }
        .about-img-frame { width:100%; aspect-ratio:4/5; max-height:580px; background:linear-gradient(145deg,#1e0a4a,#2d1260); border-radius:20px; overflow:hidden; position:relative; }
        .about-img-frame img { width:100%; height:100%; object-fit:cover; object-position:top; filter:grayscale(20%) contrast(1.05); }
        .about-img-frame::after { content:''; position:absolute; inset:0; background:linear-gradient(to top,rgba(30,10,74,.7),transparent 50%); }
        .about-badge { position:absolute; bottom:-24px; right:-24px; width:120px; height:120px; border-radius:50%; background:linear-gradient(135deg,#c9a84c,#e8c97a); display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:'Cormorant Garamond',Georgia,serif; font-size:13px; font-weight:700; color:var(--plum); text-align:center; line-height:1.3; box-shadow:0 8px 32px rgba(201,168,76,.4); }
        .about-text p { font-size:16px; color:var(--text-m); line-height:1.85; margin-bottom:20px; }
        .about-stats { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:36px; }
        .a-stat { background:rgba(30,10,74,.04); border:1px solid rgba(201,168,76,.18); border-radius:12px; padding:20px 22px; }
        .a-stat-n { font-family:'Cormorant Garamond',Georgia,serif; font-size:38px; font-weight:600; color:var(--plum); line-height:1; }
        .a-stat-l { font-size:13px; color:var(--text-m); margin-top:6px; line-height:1.4; }

        /* ── FRAMEWORK ── */
        .fw-section { background:linear-gradient(160deg,#1e0a4a,#2d1260); padding:112px 48px; position:relative; overflow:hidden; }
        .fw-section::before { content:''; position:absolute; top:-200px; right:-200px; width:600px; height:600px; border-radius:50%; background:radial-gradient(circle,rgba(201,168,76,.07),transparent 70%); pointer-events:none; }
        .fw-inner { max-width:1100px; margin:0 auto; }
        .fw-header { text-align:center; margin-bottom:72px; }
        .fw-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:2px; }
        .fw-step { padding:44px 32px; background:rgba(255,255,255,.03); border:1px solid rgba(201,168,76,.12); transition:all .3s; position:relative; overflow:hidden; }
        .fw-step::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,rgba(201,168,76,.5),transparent); transform:scaleX(0); transition:transform .4s; }
        .fw-step:hover { background:rgba(255,255,255,.07); }
        .fw-step:hover::before { transform:scaleX(1); }
        .fw-step:first-child { border-radius:16px 0 0 16px; }
        .fw-step:last-child { border-radius:0 16px 16px 0; }
        .fw-num { width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg,#c9a84c,#e8c97a); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',Georgia,serif; font-size:16px; font-weight:700; color:var(--plum); margin-bottom:24px; }
        .fw-name { font-family:'Cormorant Garamond',Georgia,serif; font-size:22px; font-weight:600; color:#f0c370; margin-bottom:12px; }
        .fw-desc { font-size:14px; color:rgba(255,255,255,.5); line-height:1.75; }

        /* ── SERVICES ── */
        .services-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:64px; }
        .svc-card { background:#fff; border:1px solid rgba(201,168,76,.2); border-radius:18px; padding:44px 36px; box-shadow:0 2px 24px rgba(30,10,74,.05); transition:all .3s; position:relative; overflow:hidden; }
        .svc-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#c9a84c,#e8c97a); }
        .svc-card:hover { transform:translateY(-6px); box-shadow:0 16px 48px rgba(30,10,74,.14); }
        .svc-icon { font-family:'Cormorant Garamond',Georgia,serif; font-size:14px; font-weight:600; letter-spacing:3px; color:var(--gold-text); text-transform:uppercase; margin-bottom:20px; opacity:.7; }
        .svc-title { font-family:'Cormorant Garamond',Georgia,serif; font-size:28px; font-weight:600; color:var(--plum); margin-bottom:14px; line-height:1.2; }
        .svc-desc { font-size:14.5px; color:var(--text-m); line-height:1.8; margin-bottom:28px; }
        .svc-link { font-size:13px; font-weight:600; color:var(--gold-text); text-decoration:none; letter-spacing:.4px; display:flex; align-items:center; gap:8px; transition:gap .2s; }
        .svc-link:hover { gap:14px; }

        /* ── RESULTS ── */
        .results-bg { background:var(--cream-dk:var(--cream)); padding:112px 48px; }
        .results-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:28px; max-width:1100px; margin:64px auto 0; }
        .res-card { background:#fff; border-radius:18px; padding:40px 36px; border:1px solid rgba(201,168,76,.15); box-shadow:0 2px 20px rgba(30,10,74,.05); }
        .res-tag { font-size:10px; font-weight:700; letter-spacing:2.5px; text-transform:uppercase; color:var(--gold-text); padding:6px 14px; background:rgba(201,168,76,.1); border-radius:20px; display:inline-block; margin-bottom:20px; }
        .res-quote { font-family:'Cormorant Garamond',Georgia,serif; font-size:21px; font-style:italic; color:var(--plum); line-height:1.6; margin-bottom:20px; }
        .res-client { font-size:13px; color:var(--text-m); }

        /* ── PRESS STRIP ── */
        .press-strip { background:var(--plum); padding:72px 48px; overflow:hidden; position:relative; }
        .press-strip::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 50% 50%,rgba(201,168,76,.06),transparent 70%); }
        .press-scroll { display:flex; gap:32px; width:max-content; animation:pressScroll 28s linear infinite; }
        .press-scroll:hover { animation-play-state:paused; }
        .press-item { background:rgba(255,255,255,.05); border:1px solid rgba(201,168,76,.12); border-radius:12px; padding:20px 32px; white-space:nowrap; font-family:'Cormorant Garamond',Georgia,serif; font-size:18px; font-weight:600; color:rgba(255,255,255,.5); letter-spacing:.3px; }

        /* ── PODCAST ── */
        .podcast-grid { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:center; max-width:1100px; margin:0 auto; }
        .podcast-img { border-radius:24px; overflow:hidden; box-shadow:0 24px 80px rgba(30,10,74,.25); }
        .podcast-img img { width:100%; display:block; }
        .podcast-tag { display:inline-block; font-size:10px; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:var(--gold-text); margin-bottom:20px; }

        /* ── CTA SECTION ── */
        .cta-sec { background:linear-gradient(160deg,#1e0a4a,#2d1260); padding:120px 48px; text-align:center; position:relative; overflow:hidden; }
        .cta-sec::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 50% 60%,rgba(201,168,76,.1),transparent 65%); }
        .cta-inner { position:relative; z-index:1; max-width:640px; margin:0 auto; }
        .cta-sec h2 { font-size:clamp(36px,5.5vw,76px); font-weight:300; color:#fff; line-height:1.08; letter-spacing:-.5px; margin-bottom:24px; }
        .cta-sec h2 em { font-style:italic; color:#c9a84c; }
        .cta-sec p { font-size:17px; color:rgba(255,255,255,.5); line-height:1.75; margin-bottom:52px; }

        /* ── FOOTER ── */
        footer { background:#100622; padding:72px 48px 32px; border-top:1px solid rgba(201,168,76,.1); }
        .ft-inner { max-width:1140px; margin:0 auto; }
        .ft-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:48px; margin-bottom:56px; }
        .ft-brand img { height:40px; margin-bottom:20px; }
        .ft-tag { font-family:'Cormorant Garamond',Georgia,serif; font-size:16px; font-style:italic; color:rgba(255,255,255,.3); line-height:1.7; }
        .ft-socials { display:flex; gap:16px; margin-top:24px; }
        .ft-socials a { font-size:12px; color:rgba(201,168,76,.45); text-decoration:none; transition:color .2s; }
        .ft-socials a:hover { color:#c9a84c; }
        .ft-col h4 { font-size:10px; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:rgba(201,168,76,.5); margin-bottom:20px; }
        .ft-col ul { list-style:none; display:flex; flex-direction:column; gap:12px; }
        .ft-col ul a { font-size:14px; color:rgba(255,255,255,.38); text-decoration:none; transition:color .2s; }
        .ft-col ul a:hover { color:#c9a84c; }
        .ft-bottom { padding-top:32px; border-top:1px solid rgba(255,255,255,.06); display:flex; justify-content:space-between; align-items:center; font-size:12px; color:rgba(255,255,255,.18); }
        .ft-bottom a { color:rgba(201,168,76,.45); text-decoration:none; margin-left:24px; }
        .ft-bottom a:hover { color:#c9a84c; }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes slideUp { from { transform:translateY(100%); opacity:0; } to { transform:translateY(0); opacity:1; } }
        @keyframes ringPulse { 0%,100% { transform:scale(1); opacity:.6; } 50% { transform:scale(1.04); opacity:1; } }
        @keyframes scrollDrop { 0%,100% { opacity:0; transform:scaleY(.4); transform-origin:top; } 50% { opacity:1; transform:scaleY(1); } }
        @keyframes pressScroll { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }

        .reveal { opacity:0; transform:translateY(28px); transition:opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1); }
        .reveal.in { opacity:1; transform:translateY(0); }
        .rd1 { transition-delay:.1s; } .rd2 { transition-delay:.2s; } .rd3 { transition-delay:.3s; } .rd4 { transition-delay:.45s; }

        @media (max-width:768px) {
          .hn { padding:0 20px; } .hn-links { display:none; }
          .about-grid { grid-template-columns:1fr; gap:48px; }
          .fw-grid { grid-template-columns:1fr 1fr; }
          .fw-step:first-child { border-radius:16px 0 0 0; } .fw-step:last-child { border-radius:0 0 16px 0; }
          .services-grid { grid-template-columns:1fr; }
          .results-grid { grid-template-columns:1fr; }
          .podcast-grid { grid-template-columns:1fr; }
          .ft-grid { grid-template-columns:1fr 1fr; }
          .hero-stats { flex-wrap:wrap; }
          .hero-stat { flex:0 0 50%; }
          .sec { padding:72px 24px; }
          .sec-full { padding:72px 24px; }
          .cta-sec { padding:80px 24px; }
          .fw-section { padding:80px 24px; }
          .results-bg { padding:80px 24px; }
        }
        @media (prefers-reduced-motion:reduce) {
          *, *::before, *::after { animation-duration:.01ms!important; transition-duration:.01ms!important; }
          .reveal { opacity:1!important; transform:none!important; }
        }
      `}</style>

      {/* NAV */}
      <nav className="hn" role="navigation" aria-label="Main navigation">
        <Link href="/" className="hn-logo" aria-label="Be a Better Brand home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-color.png" alt="Be a Better Brand" />
        </Link>
        <ul className="hn-links">
          {[['About','/about'],['PR Services','/pr-services'],['Consulting','/consulting'],['Press','/press'],['Podcast','/podcast'],['Blog','/blog']].map(([l,h]) => (
            <li key={h}><Link href={h}>{l}</Link></li>
          ))}
        </ul>
        <div className="hn-r">
          <Link href="/auth/login" className="hn-login">Portal Login</Link>
          <a href="https://go.oncehub.com/GettingToKnow" target="_blank" rel="noopener" className="hn-cta">Book a Call</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" aria-labelledby="hero-h1">
        <canvas id="particles-canvas" aria-hidden="true" />
        <div className="hero-ring" aria-hidden="true" />
        <div className="hero-ring hero-ring-2" aria-hidden="true" />
        <div className="hero-ring hero-ring-3" aria-hidden="true" />

        <div className="hero-content">
          <p className="hero-eyebrow">
            <span aria-hidden="true" />
            Finally Seen&trade; Framework
            <span aria-hidden="true" />
          </p>

          <h1 className="hero-h1" id="hero-h1">
            <span className="hero-h1-line">The people who need you</span>
            <span className="hero-h1-line">should be able to <em>find you.</em></span>
          </h1>

          <div className="hero-rule" aria-hidden="true" />

          <p className="hero-sub">
            Magnetic brand architecture, strategic PR, and AEO-optimized positioning for authors, entrepreneurs, and expert-led brands ready to close the gap between their authority and their visibility.
          </p>

          <div className="hero-ctas">
            <a href="https://go.oncehub.com/GettingToKnow" target="_blank" rel="noopener" className="h-btn-gold">
              Book Your Discovery Call
            </a>
            <Link href="/pr-services" className="h-btn-ghost">
              See How It Works →
            </Link>
          </div>

          <div className="hero-stats" role="list" aria-label="Key metrics">
            {[
              { n: '15+', l: 'Years Building Brands' },
              { n: '$500k+', l: 'Monthly Ad Equivalent Value' },
              { n: '100%', l: 'Client Retention Rate' },
              { n: 'Finally Seen™', l: 'Proprietary Framework' },
            ].map(s => (
              <div key={s.n} className="hero-stat" role="listitem">
                <div className="hero-stat-num">{s.n}</div>
                <div className="hero-stat-lbl">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
        <div className="hero-wave" aria-hidden="true" />
      </section>

      {/* ── PRESS LOGOS ── */}
      <div className="logos" aria-label="Featured in">
        <p className="logos-lbl">Securing Placements In</p>
        <div className="logos-row">
          {['Forbes','Inc. Magazine','Fast Company','Entrepreneur','Thrive Global','USA Today','Houston Chronicle','Authority Magazine','Feminessence','HRSpotlight'].map(p => (
            <span key={p} className="logo-txt">{p}</span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="sec" aria-labelledby="about-h2">
        <div className="about-grid">
          <div>
            <p className="sec-lbl reveal">About Chrissy Bernal</p>
            <h2 id="about-h2" className="sec-h2 reveal rd1">
              15+ years building brands that<br /><em>get noticed.</em>
            </h2>
            <div className="about-text reveal rd2">
              <p>When her identical twin daughters — Guinness World Record holders — became a global sensation, Chrissy Bernal discovered firsthand what it takes to navigate sudden visibility without losing your brand&apos;s soul.</p>
              <p>With a background spanning Literature, Publishing, Public Relations, Marketing, and Branding, she built Be a Better Brand on a simple belief: the gap between earned authority and recognized authority is a strategy problem — and strategy can be solved.</p>
              <p>Today, her team secures $500k+ in monthly Ad Equivalent Value for clients, with engagements that consistently extend beyond initial agreements.</p>
            </div>
            <div className="about-stats reveal rd3">
              {[
                { n: '15+', l: 'Years building and launching brands' },
                { n: '$500k+', l: 'Monthly Ad Equivalent Value' },
                { n: '6 mo', l: 'Average engagement duration' },
                { n: 'AEO', l: 'AI discoverability optimized' },
              ].map(s => (
                <div key={s.n} className="a-stat">
                  <div className="a-stat-n">{s.n}</div>
                  <div className="a-stat-l">{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 36 }} className="reveal rd4">
              <Link href="/about" style={{ marginRight: 16, padding: '14px 32px', borderRadius: 9, background: 'linear-gradient(135deg,#c9a84c,#e8c97a)', color: 'var(--plum)', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
                Meet Chrissy
              </Link>
              <a href="https://go.oncehub.com/GettingToKnow" target="_blank" rel="noopener" style={{ padding: '14px 32px', borderRadius: 9, border: '1.5px solid rgba(30,10,74,.22)', color: 'var(--plum)', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
                Book a Call
              </a>
            </div>
          </div>
          <div className="about-img reveal rd1">
            <div className="about-img-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/chrissy-editorial.jpg" alt="Chrissy Bernal, Founder & CEO of Be a Better Brand" />
            </div>
            <div className="about-badge" aria-hidden="true">
              Chrissy<br />Bernal<br />Founder
            </div>
          </div>
        </div>
      </section>

      {/* ── FINALLY SEEN FRAMEWORK ── */}
      <div className="fw-section" aria-labelledby="fw-h2">
        <div className="fw-inner">
          <div className="fw-header">
            <p className="sec-lbl reveal" style={{ color: 'rgba(201,168,76,.65)', textAlign: 'center' }}>The Methodology</p>
            <h2 id="fw-h2" className="sec-h2 reveal rd1" style={{ color: '#fff', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
              The Finally Seen&trade; <em>Framework</em>
            </h2>
            <p className="reveal rd2" style={{ fontSize: 17, color: 'rgba(255,255,255,.45)', maxWidth: 540, margin: '20px auto 0', lineHeight: 1.8, textAlign: 'center' }}>
              A proven 4-phase system that moves established experts from hidden to visible — from authority to industry icon.
            </p>
          </div>
          <div className="fw-grid">
            {[
              { n: '1', name: 'Clarity Core', desc: 'Brand Architecture Gap Session. We identify the single constraint blocking your visibility and build the foundation for breakthrough positioning. Includes SWOT, brand audit, and AEO strategy.' },
              { n: '2', name: 'Authority Positioning', desc: 'Signature messaging architecture using the StoryBrand framework. Own your lane with precision — AI-discoverable, human-memorable, and media-ready from day one.' },
              { n: '3', name: 'Visibility Engine', desc: 'Strategic PR and targeted media outreach. A disciplined progression from mid-tier to top-tier placements that builds compounding credibility architecture.' },
              { n: '4', name: 'Proof & Momentum', desc: 'Case studies, social proof loops, and earned media amplification. We turn results into re-usable authority assets that keep working long after the campaign ends.' },
            ].map((s, i) => (
              <div key={s.n} className={`fw-step reveal rd${i+1}`}>
                <div className="fw-num">{s.n}</div>
                <div className="fw-name">{s.name}</div>
                <p className="fw-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section className="sec" aria-labelledby="svc-h2">
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <p className="sec-lbl reveal">What We Do</p>
          <h2 id="svc-h2" className="sec-h2 reveal rd1">
            Three pillars of <em>magnetic</em> brand growth
          </h2>
          <p className="sec-p reveal rd2" style={{ margin: '20px auto 0', textAlign: 'center' }}>
            Every engagement is built on the Finally Seen™ Framework — custom-scoped to where you are and where you need to go.
          </p>
        </div>
        <div className="services-grid">
          {[
            { icon: 'Brand Architecture', title: 'Brand Architecture', desc: 'We audit your brand, close the gap between where you are and where you should be, and build a cohesive identity optimized for AI discoverability and human decision-makers using the StoryBrand framework.', href: '/consulting' },
            { icon: 'Public Relations', title: 'Public Relations', desc: '6-month PR campaigns combining brand strategy, custom media pitches, media coaching, and placement reporting with real ROI. Mid-tier to top-tier progression strategy.', href: '/pr-services' },
            { icon: 'Marketing Strategy', title: 'Marketing & AEO', desc: 'Intentional marketing architecture and Answer Engine Optimization — so your brand shows up when AI and humans search for the expert you already are.', href: '/consulting' },
          ].map((s, i) => (
            <div key={s.title} className={`svc-card reveal rd${i+1}`}>
              <div className="svc-icon">{s.icon}</div>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-desc">{s.desc}</p>
              <Link href={s.href} className="svc-link">Learn more →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── SCROLLING PRESS STRIP ── */}
      <div className="press-strip" aria-label="Press mentions">
        <div className="press-scroll" aria-hidden="true">
          {['Thrive Global', 'Forbes', 'Houston Chronicle', 'Feminessence', 'Inc. Magazine', 'Fast Company', 'HRSpotlight', 'Authority Magazine', 'Inbound Back Office', 'Entrepreneur', 'USA Today', 'Thrive Global', 'Forbes', 'Houston Chronicle', 'Feminessence', 'Inc. Magazine', 'Fast Company', 'HRSpotlight', 'Authority Magazine', 'Inbound Back Office', 'Entrepreneur', 'USA Today'].map((p, i) => (
            <div key={i} className="press-item">{p}</div>
          ))}
        </div>
      </div>

      {/* ── RESULTS ── */}
      <div className="results-bg" style={{ background: '#f0ece5', padding: '112px 48px' }} aria-labelledby="results-h2">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <p className="sec-lbl reveal">Client Results</p>
            <h2 id="results-h2" className="sec-h2 reveal rd1">
              Authority earned.<br /><em>Visibility delivered.</em>
            </h2>
          </div>
          <div className="results-grid">
            {[
              { tag: 'International Best-Seller', q: '"Through targeted outlet progression, we went from unknown to international best-seller — with paid speaking engagements and contributing author placements following the book launch."', c: 'Author & Speaker Client' },
              { tag: 'TV Features + Sustained Bestseller', q: '"Book debuted as a bestseller with TV appearances, high-quality media mentions, and sustained bestseller status across multiple categories after a top-tier feature."', c: 'Author Client' },
              { tag: 'ROI in 90 Days', q: '"Initial media interviews generated qualified leads and expert sourcing opportunities. The business they brought in exceeded our entire PR investment within 90 days."', c: 'Service-Based Business Client' },
            ].map((r, i) => (
              <div key={r.tag} className={`res-card reveal rd${i+1}`}>
                <span className="res-tag">{r.tag}</span>
                <p className="res-quote">{r.q}</p>
                <p className="res-client">— {r.c}</p>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ textAlign: 'center', marginTop: 52 }}>
            <Link href="/press" style={{ padding: '14px 32px', borderRadius: 9, border: '1.5px solid rgba(30,10,74,.22)', color: 'var(--plum)', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
              View All Press & Results →
            </Link>
          </div>
        </div>
      </div>

      {/* ── PODCAST ── */}
      <section className="sec" aria-labelledby="pod-h2">
        <div className="podcast-grid">
          <div className="podcast-img reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/finally-seen-podcast.png" alt="Finally Seen Podcast with Be a Better Brand" />
          </div>
          <div className="reveal rd1">
            <p className="podcast-tag">Now Streaming</p>
            <p className="sec-lbl">The Podcast</p>
            <h2 id="pod-h2" className="sec-h2" style={{ marginBottom: 20 }}>
              Finally Seen&trade;<br /><em>Podcast</em>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-m)', lineHeight: 1.85, marginBottom: 16 }}>
              <em style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 18, color: 'var(--plum)' }}>&ldquo;For ambitious women building bold brands, meaningful lives, and unforgettable legacies.&rdquo;</em>
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-m)', lineHeight: 1.8, marginBottom: 32 }}>
              Chrissy Bernal hosts bold conversations on visibility, reinvention, business scaling, and the mindset shifts that move ambitious women from overlooked to undeniable. New episodes weekly.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://podcasts.apple.com/ph/podcast/finally-seen/id1823745851" target="_blank" rel="noopener" style={{ padding: '13px 26px', borderRadius: 9, background: 'var(--plum)', color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Apple Podcasts
              </a>
              <a href="https://youtube.com/@ChrissyBernal" target="_blank" rel="noopener" style={{ padding: '13px 26px', borderRadius: 9, border: '1.5px solid rgba(30,10,74,.22)', color: 'var(--plum)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                YouTube
              </a>
              <Link href="/podcast" style={{ padding: '13px 26px', borderRadius: 9, border: '1.5px solid rgba(30,10,74,.22)', color: 'var(--plum)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                All Episodes →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="cta-sec" aria-labelledby="cta-h2">
        <div className="cta-inner">
          <p className="sec-lbl reveal" style={{ color: 'rgba(201,168,76,.65)', textAlign: 'center' }}>Ready to be Finally Seen?</p>
          <h2 id="cta-h2" className="reveal rd1">
            Your authority deserves<br /><em>to be visible.</em>
          </h2>
          <p className="reveal rd2">
            20-minute discovery call. No obligation. Just clarity on whether — and how — we can help you close your authority gap.
          </p>
          <div className="reveal rd3">
            <a href="https://go.oncehub.com/GettingToKnow" target="_blank" rel="noopener" className="h-btn-gold">
              Book Your Discovery Call
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="ft-inner">
          <div className="ft-grid">
            <div className="ft-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo-white.png" alt="Be a Better Brand" />
              <p className="ft-tag">Magnetic Brand Architecture,<br />Marketing & PR for Authors<br />& Entrepreneurs.</p>
              <div className="ft-socials">
                <a href="https://linkedin.com/in/chrissybernal" target="_blank" rel="noopener">LinkedIn</a>
                <a href="https://instagram.com/chrissybernal" target="_blank" rel="noopener">Instagram</a>
                <a href="https://facebook.com/chrissybernal" target="_blank" rel="noopener">Facebook</a>
                <a href="https://youtube.com/@ChrissyBernal" target="_blank" rel="noopener">YouTube</a>
              </div>
            </div>
            <div className="ft-col">
              <h4>Services</h4>
              <ul>
                <li><Link href="/pr-services">PR Campaigns</Link></li>
                <li><Link href="/consulting">Brand Architecture</Link></li>
                <li><Link href="/consulting">Consulting</Link></li>
                <li><a href="https://go.oncehub.com/GettingToKnow" target="_blank" rel="noopener">Book a Discovery Call</a></li>
              </ul>
            </div>
            <div className="ft-col">
              <h4>Company</h4>
              <ul>
                <li><Link href="/about">About Chrissy</Link></li>
                <li><Link href="/press">Press</Link></li>
                <li><Link href="/podcast">Finally Seen Podcast</Link></li>
                <li><Link href="/blog">Blog</Link></li>
              </ul>
            </div>
            <div className="ft-col">
              <h4>Client Portal</h4>
              <ul>
                <li><Link href="/auth/login">Client Login</Link></li>
                <li><Link href="/auth/login">Team Login</Link></li>
                <li><Link href="/auth/signup">Get Access</Link></li>
                <li><Link href="/dashboard">Command Center</Link></li>
              </ul>
            </div>
          </div>
          <div className="ft-bottom">
            <span>&copy; {new Date().getFullYear()} Be a Better Brand, LLC. All rights reserved.</span>
            <div>
              <a href="https://beabetterbrand.com" target="_blank" rel="noopener">beabetterbrand.com</a>
              <Link href="/auth/login">Dashboard Login</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* PARTICLE + SCROLL REVEAL SCRIPTS */}
      <script dangerouslySetInnerHTML={{ __html: `
        // Particles
        (function(){
          var c=document.getElementById('particles-canvas');
          if(!c)return;
          var ctx=c.getContext('2d');
          var pts=[];
          function resize(){ c.width=c.offsetWidth; c.height=c.offsetHeight; }
          resize(); window.addEventListener('resize',resize);
          for(var i=0;i<60;i++){
            pts.push({
              x:Math.random()*c.width, y:Math.random()*c.height,
              vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25,
              r:Math.random()*1.5+.5, o:Math.random()*.5+.1
            });
          }
          function draw(){
            ctx.clearRect(0,0,c.width,c.height);
            pts.forEach(function(p){
              p.x+=p.vx; p.y+=p.vy;
              if(p.x<0)p.x=c.width; if(p.x>c.width)p.x=0;
              if(p.y<0)p.y=c.height; if(p.y>c.height)p.y=0;
              ctx.beginPath();
              ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
              ctx.fillStyle='rgba(201,168,76,'+p.o+')';
              ctx.fill();
            });
            requestAnimationFrame(draw);
          }
          draw();
        })();

        // Scroll reveal
        (function(){
          var els=document.querySelectorAll('.reveal');
          var io=new IntersectionObserver(function(entries){
            entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }});
          },{threshold:.08,rootMargin:'0px 0px -40px 0px'});
          els.forEach(function(el){ io.observe(el); });
        })();
      `}} />
    </>
  )
}
