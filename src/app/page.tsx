import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Be a Better Brand | Magnetic Brand Architecture, Marketing & PR',
  description: 'Finally Seen™ — Brand architecture, marketing strategy, and strategic PR for authors, entrepreneurs, and expert-led brands. 15+ years. $500k+ monthly Ad Equivalent Value secured for clients.',
  keywords: 'brand architecture, PR for authors, marketing strategy, public relations, brand positioning, entrepreneur PR, Finally Seen framework, Chrissy Bernal',
  openGraph: {
    title: 'Be a Better Brand | Magnetic Brand Architecture, Marketing & PR',
    description: 'The people who need you should be able to find you. Brand architecture and strategic PR for authors and entrepreneurs.',
    url: 'https://be-a-better-brand.vercel.app',
    siteName: 'Be a Better Brand',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Be a Better Brand', description: 'Magnetic Brand Architecture, Marketing & PR for Authors & Entrepreneurs' },
}

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cream: #f6f1ea;
          --cream-dark: #ede9e0;
          --plum: #1e0a4a;
          --plum-mid: #2d1260;
          --gold: #c9a84c;
          --gold-light: #e8c97a;
          --gold-text: #a07830;
          --text: #1a0f2e;
          --text-muted: #5a4070;
          --white: #ffffff;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
          color: var(--text);
          overflow-x: hidden;
        }

        h1, h2, h3, h4 {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 80px;
          background: rgba(246,241,234,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(201,168,76,0.2);
          transition: all 0.3s ease;
        }
        .nav-logo img { height: 44px; }
        .nav-links { display: flex; align-items: center; gap: 36px; list-style: none; }
        .nav-links a {
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          color: var(--text-muted); text-decoration: none; letter-spacing: 0.5px;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--text); }
        .nav-right { display: flex; align-items: center; gap: 16px; }
        .btn-nav-login {
          padding: 10px 22px; border-radius: 8px;
          background: transparent; border: 1.5px solid rgba(201,168,76,0.5);
          color: var(--gold-text); font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600; text-decoration: none;
          letter-spacing: 0.5px; cursor: pointer;
          transition: all 0.2s;
        }
        .btn-nav-login:hover { background: var(--gold); color: var(--plum); border-color: var(--gold); }
        .btn-nav-primary {
          padding: 10px 24px; border-radius: 8px;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          color: var(--plum); font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 700; text-decoration: none;
          letter-spacing: 0.5px; cursor: pointer;
          transition: all 0.2s; border: none;
        }
        .btn-nav-primary:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(201,168,76,0.35); }

        /* ── HERO ── */
        .hero {
          min-height: 100dvh;
          background: linear-gradient(160deg, #1e0a4a 0%, #2d1260 45%, #1a0835 100%);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 120px 24px 80px;
          position: relative; overflow: hidden;
        }
        .hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.12) 0%, transparent 65%);
          pointer-events: none;
        }
        .hero-eyebrow {
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 4px; text-transform: uppercase;
          color: rgba(201,168,76,0.8); margin-bottom: 24px;
          animation: fadeUp 0.8s ease-out 0.2s both;
        }
        .hero h1 {
          font-size: clamp(48px, 7vw, 96px);
          font-weight: 300; color: #fff; line-height: 1.08;
          letter-spacing: -1px; max-width: 900px;
          animation: fadeUp 0.8s ease-out 0.4s both;
        }
        .hero h1 em {
          font-style: italic; color: #c9a84c;
          font-weight: 300;
        }
        .hero-sub {
          font-family: 'DM Sans', sans-serif; font-size: 18px; font-weight: 300;
          color: rgba(255,255,255,0.6); max-width: 560px; line-height: 1.7;
          margin-top: 28px;
          animation: fadeUp 0.8s ease-out 0.6s both;
        }
        .hero-ctas {
          display: flex; gap: 16px; margin-top: 48px; flex-wrap: wrap; justify-content: center;
          animation: fadeUp 0.8s ease-out 0.8s both;
        }
        .btn-gold {
          padding: 16px 36px; border-radius: 10px;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          color: var(--plum); font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 700; text-decoration: none;
          letter-spacing: 0.3px; transition: all 0.25s; border: none; cursor: pointer;
        }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(201,168,76,0.4); }
        .btn-ghost {
          padding: 16px 36px; border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.25);
          color: rgba(255,255,255,0.85); font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 500; text-decoration: none;
          transition: all 0.25s; cursor: pointer; background: transparent;
        }
        .btn-ghost:hover { border-color: #c9a84c; color: #c9a84c; }

        /* Divider line */
        .hero-divider {
          position: absolute; bottom: 0; left: 0; right: 0; height: 80px;
          background: linear-gradient(to bottom, transparent, var(--cream));
        }

        /* Scroll indicator */
        .scroll-cue {
          position: absolute; bottom: 90px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          animation: fadeUp 1s ease-out 1.4s both;
        }
        .scroll-cue span { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.3); }
        .scroll-cue-line {
          width: 1px; height: 48px; background: linear-gradient(to bottom, rgba(201,168,76,0.6), transparent);
          animation: scrollPulse 2s ease-in-out 2s infinite;
        }

        /* ── LOGOS / SOCIAL PROOF ── */
        .logos-section {
          background: var(--cream); padding: 56px 24px;
          border-bottom: 1px solid rgba(201,168,76,0.15);
        }
        .logos-label {
          text-align: center; font-family: 'DM Sans', sans-serif; font-size: 11px;
          font-weight: 700; letter-spacing: 3.5px; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 32px;
        }
        .logos-row {
          display: flex; align-items: center; justify-content: center;
          gap: 48px; flex-wrap: wrap; max-width: 960px; margin: 0 auto;
        }
        .logo-pill {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 18px; font-weight: 600; color: var(--text-muted);
          letter-spacing: 0.5px; opacity: 0.6;
          transition: opacity 0.2s;
        }
        .logo-pill:hover { opacity: 1; }

        /* ── SECTION BASE ── */
        .section { padding: 112px 24px; max-width: 1200px; margin: 0 auto; }
        .section-full { padding: 112px 24px; }
        .section-label {
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 4px; text-transform: uppercase;
          color: var(--gold-text); margin-bottom: 20px;
        }
        .section-h2 {
          font-size: clamp(36px, 4.5vw, 64px);
          font-weight: 300; line-height: 1.12; color: var(--plum);
          letter-spacing: -0.5px;
        }
        .section-h2 em { font-style: italic; color: var(--gold-text); }

        /* ── ABOUT / FOUNDER ── */
        .about-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
          align-items: center; max-width: 1100px; margin: 0 auto;
        }
        .about-stat-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 40px;
        }
        .about-stat {
          background: rgba(30,10,74,0.05); border: 1px solid rgba(201,168,76,0.2);
          border-radius: 12px; padding: 24px;
        }
        .about-stat-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 40px; font-weight: 600; color: var(--plum); line-height: 1;
        }
        .about-stat-label {
          font-size: 13px; color: var(--text-muted); margin-top: 6px; line-height: 1.4;
        }
        .about-img-wrap {
          position: relative;
        }
        .about-img-bg {
          width: 100%; aspect-ratio: 3/4; max-height: 560px;
          background: linear-gradient(145deg, #1e0a4a, #2d1260);
          border-radius: 16px; display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px; font-style: italic; color: rgba(240,195,112,0.5);
          letter-spacing: 1px; text-align: center; padding: 40px;
          position: relative; overflow: hidden;
        }
        .about-img-bg::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 40% 30%, rgba(201,168,76,0.15), transparent 60%);
        }
        .about-img-accent {
          position: absolute; bottom: -20px; right: -20px;
          width: 140px; height: 140px; border-radius: 50%;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 13px; font-weight: 700; color: var(--plum);
          text-align: center; line-height: 1.3; letter-spacing: 0.5px;
          padding: 20px;
        }

        /* ── FRAMEWORK ── */
        .framework-section {
          background: linear-gradient(160deg, #1e0a4a, #2d1260);
          padding: 112px 24px;
        }
        .framework-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px;
          max-width: 1100px; margin: 64px auto 0;
        }
        .framework-step {
          background: rgba(255,255,255,0.04); padding: 40px 32px;
          border: 1px solid rgba(201,168,76,0.15);
          transition: background 0.3s;
        }
        .framework-step:hover { background: rgba(255,255,255,0.08); }
        .framework-step:first-child { border-radius: 16px 0 0 16px; }
        .framework-step:last-child { border-radius: 0 16px 16px 0; }
        .fw-num {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 16px; font-weight: 700; color: var(--plum);
          margin-bottom: 24px;
        }
        .fw-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px; font-weight: 600; color: #f0c370;
          margin-bottom: 12px;
        }
        .fw-desc {
          font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.7;
        }

        /* ── SERVICES ── */
        .services-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
          max-width: 1100px; margin: 64px auto 0;
        }
        .service-card {
          background: var(--white); border: 1px solid rgba(201,168,76,0.22);
          border-radius: 16px; padding: 40px 36px;
          box-shadow: 0 2px 20px rgba(30,10,74,0.06);
          transition: all 0.3s; position: relative; overflow: hidden;
        }
        .service-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #c9a84c, #e8c97a);
        }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(30,10,74,0.12); }
        .service-icon {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 36px; color: #c9a84c; margin-bottom: 20px;
          font-style: italic;
        }
        .service-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 26px; font-weight: 600; color: var(--plum); margin-bottom: 14px;
        }
        .service-desc {
          font-size: 14px; color: var(--text-muted); line-height: 1.75; margin-bottom: 24px;
        }
        .service-link {
          font-size: 13px; font-weight: 600; color: var(--gold-text);
          text-decoration: none; letter-spacing: 0.5px;
          display: flex; align-items: center; gap: 8px;
          transition: gap 0.2s;
        }
        .service-link:hover { gap: 12px; }

        /* ── RESULTS ── */
        .results-section {
          background: var(--cream-dark);
          padding: 112px 24px;
        }
        .results-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;
          max-width: 1100px; margin: 64px auto 0;
        }
        .result-card {
          background: var(--white); border-radius: 16px; padding: 36px;
          border: 1px solid rgba(201,168,76,0.18);
          box-shadow: 0 2px 16px rgba(30,10,74,0.05);
        }
        .result-quote {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 20px; font-style: italic; color: var(--plum);
          line-height: 1.6; margin-bottom: 24px;
        }
        .result-result {
          font-size: 12px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: var(--gold-text);
          padding: 6px 14px; background: rgba(201,168,76,0.1);
          border-radius: 20px; display: inline-block; margin-bottom: 16px;
        }
        .result-client { font-size: 13px; color: var(--text-muted); }

        /* ── FINAL CTA ── */
        .cta-section {
          background: linear-gradient(160deg, #1e0a4a, #2d1260);
          padding: 120px 24px; text-align: center;
        }
        .cta-section h2 {
          font-size: clamp(36px, 5vw, 72px);
          font-weight: 300; color: #fff; max-width: 700px;
          margin: 0 auto 24px; line-height: 1.1;
        }
        .cta-section h2 em { font-style: italic; color: #c9a84c; }
        .cta-section p {
          font-size: 17px; color: rgba(255,255,255,0.55);
          max-width: 480px; margin: 0 auto 48px; line-height: 1.7;
        }
        .cta-section .btn-gold { font-size: 16px; padding: 18px 48px; }

        /* ── FOOTER ── */
        footer {
          background: #100622; padding: 64px 48px 32px;
          border-top: 1px solid rgba(201,168,76,0.1);
        }
        .footer-grid {
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px; max-width: 1100px; margin: 0 auto 48px;
        }
        .footer-logo img { height: 40px; margin-bottom: 16px; }
        .footer-tagline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 16px; font-style: italic; color: rgba(255,255,255,0.35);
          line-height: 1.6;
        }
        .footer-col h4 {
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          color: rgba(201,168,76,0.6); margin-bottom: 20px;
        }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .footer-col ul a {
          font-size: 14px; color: rgba(255,255,255,0.45); text-decoration: none;
          transition: color 0.2s;
        }
        .footer-col ul a:hover { color: #c9a84c; }
        .footer-bottom {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.06);
          font-size: 12px; color: rgba(255,255,255,0.2);
        }
        .footer-bottom a { color: rgba(201,168,76,0.6); text-decoration: none; margin-left: 24px; }
        .footer-bottom a:hover { color: #c9a84c; }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }

        .reveal {
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .nav { padding: 0 20px; }
          .nav-links { display: none; }
          .about-grid { grid-template-columns: 1fr; }
          .framework-grid { grid-template-columns: 1fr 1fr; }
          .framework-step:first-child { border-radius: 16px 16px 0 0; }
          .framework-step:last-child { border-radius: 0 0 16px 16px; }
          .services-grid { grid-template-columns: 1fr; }
          .results-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .hero-ctas { flex-direction: column; align-items: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* ── NAVIGATION ── */}
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <a href="/" className="nav-logo" aria-label="Be a Better Brand home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Be a Better Brand" />
        </a>
        <ul className="nav-links">
          <li><a href="https://beabetterbrand.com/about" target="_blank" rel="noopener">About</a></li>
          <li><a href="https://beabetterbrand.com/public-relations-2" target="_blank" rel="noopener">PR Services</a></li>
          <li><a href="https://beabetterbrand.com/press" target="_blank" rel="noopener">Press</a></li>
          <li><a href="https://beabetterbrand.com/blog" target="_blank" rel="noopener">Blog</a></li>
        </ul>
        <div className="nav-right">
          <Link href="/auth/login" className="btn-nav-login">Team Login</Link>
          <a href="https://calendly.com/beabetterbrand" target="_blank" rel="noopener" className="btn-nav-primary">Book a Call</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" aria-labelledby="hero-headline">
        <p className="hero-eyebrow">Finally Seen&trade; Framework</p>
        <h1 id="hero-headline">
          The people who need you<br />
          should be able to <em>find you.</em>
        </h1>
        <p className="hero-sub">
          Magnetic brand architecture, marketing strategy, and strategic PR for authors, entrepreneurs, and expert-led brands ready to close the gap between their authority and their visibility.
        </p>
        <div className="hero-ctas">
          <a href="https://calendly.com/beabetterbrand" target="_blank" rel="noopener" className="btn-gold">
            Book a Discovery Call
          </a>
          <a href="https://beabetterbrand.com/public-relations-2" target="_blank" rel="noopener" className="btn-ghost">
            Find Your Authority Gap →
          </a>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll</span>
          <div className="scroll-cue-line"></div>
        </div>
        <div className="hero-divider"></div>
      </section>

      {/* ── AS SEEN IN ── */}
      <div className="logos-section" aria-label="Media coverage">
        <p className="logos-label">Securing Placements In</p>
        <div className="logos-row">
          {['Forbes', 'Inc. Magazine', 'Fast Company', 'Entrepreneur', 'USA Today', 'ABC News', 'Authority Magazine', 'Thrive Global'].map((pub) => (
            <span key={pub} className="logo-pill">{pub}</span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="section" aria-labelledby="about-headline">
        <div className="about-grid">
          <div className="reveal">
            <p className="section-label">About Chrissy Bernal</p>
            <h2 id="about-headline" className="section-h2">
              15+ years building brands that get <em>noticed</em>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginTop: 24 }}>
              When her identical twin daughters — Guinness World Record holders — became a global sensation, Chrissy Bernal discovered firsthand what it takes to navigate sudden visibility without losing your brand&apos;s soul.
            </p>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginTop: 16 }}>
              With a background spanning Literature, Publishing, Public Relations, Marketing, and Branding, she built Be a Better Brand to champion transparent strategy, holistic support, and innovative solutions — disrupting mediocrity in PR and brand positioning.
            </p>
            <div className="about-stat-grid">
              {[
                { num: '15+', label: 'Years building and launching brands' },
                { num: '$500k+', label: 'Monthly Ad Equivalent Value secured' },
                { num: '100%', label: 'Client retention beyond initial agreements' },
                { num: 'Finally Seen™', label: 'Proprietary 4-phase brand framework' },
              ].map((s) => (
                <div key={s.num} className="about-stat reveal">
                  <div className="about-stat-num">{s.num}</div>
                  <div className="about-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-img-wrap reveal">
            <div className="about-img-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Be a Better Brand" style={{ maxWidth: '70%', opacity: 0.9 }} />
              <div className="about-img-accent">
                Chrissy<br />Bernal<br />Founder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINALLY SEEN FRAMEWORK ── */}
      <div className="framework-section" aria-labelledby="framework-headline">
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <p className="section-label" style={{ color: 'rgba(201,168,76,0.6)' }}>Our Methodology</p>
          <h2 id="framework-headline" className="section-h2 reveal" style={{ color: '#fff', margin: '0 auto', maxWidth: 700 }}>
            The Finally Seen&trade; <em>Framework</em>
          </h2>
          <p className="reveal" style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '20px auto 0', lineHeight: 1.8 }}>
            A proven 4-phase system that moves established experts from hidden to visible — from authority to industry icon.
          </p>
        </div>
        <div className="framework-grid">
          {[
            { num: '1', name: 'Clarity Core', desc: 'Brand Architecture Gap Session. We identify the single constraint blocking your visibility and build the foundation for breakthrough positioning.' },
            { num: '2', name: 'Authority Positioning', desc: 'Signature messaging and thought leadership architecture. Own your lane with precision — AI-discoverable and human-memorable.' },
            { num: '3', name: 'Visibility Engine', desc: 'Strategic PR and media outreach. Mid-tier to top-tier placements that build credibility architecture and compounding authority signals.' },
            { num: '4', name: 'Proof & Momentum', desc: 'Case studies, social proof loops, and earned media amplification. Let results speak louder and faster than any paid campaign.' },
          ].map((step) => (
            <div key={step.num} className="framework-step reveal">
              <div className="fw-num">{step.num}</div>
              <div className="fw-name">{step.name}</div>
              <p className="fw-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section className="section" aria-labelledby="services-headline">
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <p className="section-label">What We Do</p>
          <h2 id="services-headline" className="section-h2 reveal">
            Three pillars of <em>magnetic</em> brand growth
          </h2>
        </div>
        <div className="services-grid">
          {[
            {
              icon: 'Arch.',
              title: 'Brand Architecture',
              desc: 'We audit your current brand, close the gap between where you are and where you should be, and build a cohesive identity optimized for both AI discoverability and human decision-makers.',
              link: 'https://beabetterbrand.com/consulting',
            },
            {
              icon: 'PR',
              title: 'Public Relations',
              desc: '6-month PR campaigns combining brand strategy, messaging development using the StoryBrand framework, personalized media pitches, media coaching, and progress reporting with real ROI.',
              link: 'https://beabetterbrand.com/public-relations-2',
            },
            {
              icon: 'Strat.',
              title: 'Marketing Strategy',
              desc: 'Intentional marketing architecture that aligns your content, channels, and campaigns to your brand positioning — so every touchpoint reinforces your authority.',
              link: 'https://beabetterbrand.com/consulting',
            },
          ].map((svc) => (
            <div key={svc.title} className="service-card reveal">
              <div className="service-icon">{svc.icon}</div>
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
              <a href={svc.link} target="_blank" rel="noopener" className="service-link">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESULTS ── */}
      <div className="results-section" aria-labelledby="results-headline">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <p className="section-label">Client Results</p>
            <h2 id="results-headline" className="section-h2 reveal">
              Authority earned. Visibility <em>delivered.</em>
            </h2>
          </div>
          <div className="results-grid">
            {[
              {
                result: 'International Best-Seller',
                quote: '"Through targeted outlet progression strategy, we went from unknown to international best-seller with paid speaking engagements and contributing author placements."',
                client: 'Author & Entrepreneur Client',
              },
              {
                result: 'TV Feature + Sustained Bestseller',
                quote: '"Book debuted as a bestseller with TV appearances, high-quality media mentions, and sustained bestseller status across multiple categories after a top-tier feature."',
                client: 'Author Client',
              },
              {
                result: 'ROI Beyond PR Investment',
                quote: '"Initial media interviews generated qualified leads and expert sourcing opportunities. The business they brought in exceeded our entire PR investment within 90 days."',
                client: 'Service-Based Business Client',
              },
            ].map((r) => (
              <div key={r.result} className="result-card reveal">
                <span className="result-result">{r.result}</span>
                <p className="result-quote">{r.quote}</p>
                <p className="result-client">— {r.client}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <section className="cta-section" aria-labelledby="cta-headline">
        <p className="section-label" style={{ color: 'rgba(201,168,76,0.6)', textAlign: 'center' }}>Ready to be Finally Seen?</p>
        <h2 id="cta-headline">
          Your authority deserves<br /><em>to be visible.</em>
        </h2>
        <p>
          20-minute discovery call. No obligation. Just clarity on whether — and how — we can help you close your authority gap.
        </p>
        <a href="https://calendly.com/beabetterbrand" target="_blank" rel="noopener" className="btn-gold">
          Book Your Discovery Call
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer role="contentinfo">
        <div className="footer-grid">
          <div className="footer-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Be a Better Brand" />
            <p className="footer-tagline">
              Magnetic Brand Architecture,<br />Marketing & PR for Authors<br />& Entrepreneurs
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 16 }}>
              {['LinkedIn', 'Instagram', 'Facebook'].map((s) => (
                <a key={s} href={`https://beabetterbrand.com`} target="_blank" rel="noopener"
                  style={{ fontSize: 12, color: 'rgba(201,168,76,0.5)', textDecoration: 'none' }}>
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="https://beabetterbrand.com/consulting" target="_blank" rel="noopener">Brand Architecture</a></li>
              <li><a href="https://beabetterbrand.com/public-relations-2" target="_blank" rel="noopener">Public Relations</a></li>
              <li><a href="https://beabetterbrand.com/consulting" target="_blank" rel="noopener">Marketing Strategy</a></li>
              <li><a href="https://beabetterbrand.com/consulting" target="_blank" rel="noopener">Gap Session — $750</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="https://beabetterbrand.com/about" target="_blank" rel="noopener">About Chrissy</a></li>
              <li><a href="https://beabetterbrand.com/press" target="_blank" rel="noopener">Press</a></li>
              <li><a href="https://beabetterbrand.com/blog" target="_blank" rel="noopener">Blog</a></li>
              <li><a href="https://beabetterbrand.com" target="_blank" rel="noopener">Finally Seen Podcast</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Portal</h4>
            <ul>
              <li><Link href="/auth/login">Client Login</Link></li>
              <li><Link href="/auth/login">Team Login</Link></li>
              <li><Link href="/dashboard">Command Center</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Be a Better Brand. All rights reserved.</span>
          <div>
            <a href="https://beabetterbrand.com" target="_blank" rel="noopener">beabetterbrand.com</a>
            <Link href="/auth/login">Dashboard Login</Link>
          </div>
        </div>
      </footer>

      {/* ── SCROLL REVEAL SCRIPT ── */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var reveals = document.querySelectorAll('.reveal');
          var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });
          reveals.forEach(function(el) { observer.observe(el); });
        })();
      `}} />
    </>
  )
}
