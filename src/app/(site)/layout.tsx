import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  metadataBase: new URL('https://be-a-better-brand.vercel.app'),
  openGraph: { siteName: 'Be a Better Brand', locale: 'en_US' },
}

const NAV = [
  { label: 'About', href: '/about' },
  { label: 'PR Services', href: '/pr-services' },
  { label: 'Consulting', href: '/consulting' },
  { label: 'Press', href: '/press' },
  { label: 'Podcast', href: '/podcast' },
  { label: 'Blog', href: '/blog' },
]

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --cream: #f6f1ea; --plum: #1e0a4a; --gold: #c9a84c;
          --gold-light: #e8c97a; --gold-text: #a07830;
          --text: #1a0f2e; --text-muted: #5a4070; --white: #ffffff;
        }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--text); overflow-x: hidden; line-height: 1.6; }
        h1,h2,h3,h4 { font-family: 'Cormorant Garamond', Georgia, serif; }

        /* NAV */
        .site-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 76px;
          background: rgba(246,241,234,0.92); backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid rgba(201,168,76,0.18);
          transition: all 0.3s;
        }
        .site-nav-logo img { height: 42px; }
        .site-nav-links { display: flex; gap: 32px; list-style: none; }
        .site-nav-links a { font-size: 13.5px; font-weight: 500; color: var(--text-muted); text-decoration: none; letter-spacing: 0.4px; transition: color 0.2s; }
        .site-nav-links a:hover { color: var(--text); }
        .site-nav-right { display: flex; gap: 12px; align-items: center; }
        .nav-login { padding: 9px 20px; border-radius: 8px; border: 1.5px solid rgba(201,168,76,0.45); color: var(--gold-text); font-size: 13px; font-weight: 600; text-decoration: none; transition: all 0.2s; letter-spacing: 0.4px; }
        .nav-login:hover { background: rgba(201,168,76,0.1); border-color: var(--gold); }
        .nav-cta { padding: 10px 22px; border-radius: 8px; background: linear-gradient(135deg,#c9a84c,#e8c97a); color: var(--plum); font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.2s; letter-spacing: 0.4px; border: none; cursor: pointer; }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(201,168,76,0.35); }

        /* FOOTER */
        .site-footer { background: #100622; padding: 72px 48px 32px; border-top: 1px solid rgba(201,168,76,0.1); }
        .footer-inner { max-width: 1140px; margin: 0 auto; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 56px; }
        .footer-brand img { height: 40px; margin-bottom: 20px; }
        .footer-tagline { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 16px; font-style: italic; color: rgba(255,255,255,0.35); line-height: 1.7; }
        .footer-socials { display: flex; gap: 16px; margin-top: 24px; }
        .footer-socials a { font-size: 12px; color: rgba(201,168,76,0.5); text-decoration: none; transition: color 0.2s; }
        .footer-socials a:hover { color: #c9a84c; }
        .footer-col h4 { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: rgba(201,168,76,0.55); margin-bottom: 20px; }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .footer-col ul a { font-size: 14px; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
        .footer-col ul a:hover { color: #c9a84c; }
        .footer-bottom { padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: rgba(255,255,255,0.18); }
        .footer-bottom a { color: rgba(201,168,76,0.5); text-decoration: none; margin-left: 24px; }
        .footer-bottom a:hover { color: #c9a84c; }

        /* SHARED PAGE HERO */
        .page-hero { background: linear-gradient(160deg,#1e0a4a 0%,#2d1260 50%,#1a0835 100%); padding: 140px 48px 100px; position: relative; overflow: hidden; }
        .page-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 40% 60%, rgba(201,168,76,0.1), transparent 65%); pointer-events:none; }
        .page-hero-inner { max-width: 800px; margin: 0 auto; }
        .page-hero-eyebrow { font-size:10px; font-weight:700; letter-spacing:4px; text-transform:uppercase; color:rgba(201,168,76,0.7); margin-bottom:20px; }
        .page-hero h1 { font-size: clamp(40px,6vw,80px); font-weight:300; color:#fff; line-height:1.1; letter-spacing:-0.5px; }
        .page-hero h1 em { font-style:italic; color:#c9a84c; }
        .page-hero-sub { font-size:18px; color:rgba(255,255,255,0.55); line-height:1.8; margin-top:20px; max-width:560px; }
        .page-hero-wave { position:absolute; bottom:0; left:0; right:0; height:80px; background: linear-gradient(to bottom, transparent, var(--cream)); }

        /* SECTION */
        .site-section { padding: 96px 48px; max-width: 1140px; margin: 0 auto; }
        .site-section-full { padding: 96px 48px; }
        .sec-label { font-size:10px; font-weight:700; letter-spacing:4px; text-transform:uppercase; color:var(--gold-text); margin-bottom:16px; }
        .sec-h2 { font-size:clamp(32px,4vw,60px); font-weight:300; color:var(--plum); line-height:1.12; letter-spacing:-0.3px; }
        .sec-h2 em { font-style:italic; color:var(--gold-text); }
        .sec-p { font-size:16px; color:var(--text-muted); line-height:1.8; max-width:620px; }

        /* REVEAL ANIMATION */
        .reveal { opacity:0; transform:translateY(28px); transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .reveal.in { opacity:1; transform:translateY(0); }
        .reveal-d1 { transition-delay:0.1s; }
        .reveal-d2 { transition-delay:0.2s; }
        .reveal-d3 { transition-delay:0.3s; }
        .reveal-d4 { transition-delay:0.4s; }

        /* BTN */
        .btn-gold { padding:14px 32px; border-radius:9px; background:linear-gradient(135deg,#c9a84c,#e8c97a); color:var(--plum); font-family:'DM Sans',sans-serif; font-size:14px; font-weight:700; text-decoration:none; letter-spacing:0.3px; transition:all 0.25s; display:inline-block; border:none; cursor:pointer; }
        .btn-gold:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(201,168,76,0.4); }
        .btn-outline-dark { padding:14px 32px; border-radius:9px; border:1.5px solid rgba(30,10,74,0.25); color:var(--plum); font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600; text-decoration:none; transition:all 0.25s; display:inline-block; }
        .btn-outline-dark:hover { border-color:var(--plum); background:rgba(30,10,74,0.05); }
        .btn-ghost-light { padding:14px 32px; border-radius:9px; border:1.5px solid rgba(255,255,255,0.2); color:rgba(255,255,255,0.8); font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; text-decoration:none; transition:all 0.25s; display:inline-block; }
        .btn-ghost-light:hover { border-color:#c9a84c; color:#c9a84c; }

        @media (max-width:768px) {
          .site-nav { padding:0 20px; }
          .site-nav-links { display:none; }
          .footer-grid { grid-template-columns:1fr 1fr; }
          .page-hero { padding:120px 24px 80px; }
          .site-section { padding:72px 24px; }
          .site-section-full { padding:72px 24px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity:1!important; transform:none!important; transition:none!important; }
        }
      `}</style>

      {/* NAV */}
      <nav className="site-nav" role="navigation">
        <Link href="/" className="site-nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-color.png" alt="Be a Better Brand" />
        </Link>
        <ul className="site-nav-links">
          {NAV.map(n => (
            <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
          ))}
        </ul>
        <div className="site-nav-right">
          <Link href="/auth/login" className="nav-login">Portal Login</Link>
          <a href="https://go.oncehub.com/GettingToKnow" target="_blank" rel="noopener" className="nav-cta">Book a Call</a>
        </div>
      </nav>

      <main style={{ paddingTop: 76 }}>{children}</main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo-white.png" alt="Be a Better Brand" />
              <p className="footer-tagline">
                Magnetic Brand Architecture,<br />Marketing & PR for Authors<br />& Entrepreneurs.
              </p>
              <div className="footer-socials">
                <a href="https://linkedin.com/in/chrissybernal" target="_blank" rel="noopener">LinkedIn</a>
                <a href="https://instagram.com/chrissybernal" target="_blank" rel="noopener">Instagram</a>
                <a href="https://facebook.com/chrissybernal" target="_blank" rel="noopener">Facebook</a>
                <a href="https://youtube.com/@ChrissyBernal" target="_blank" rel="noopener">YouTube</a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><Link href="/pr-services">PR Campaigns</Link></li>
                <li><Link href="/consulting">Brand Architecture</Link></li>
                <li><Link href="/consulting">Consulting</Link></li>
                <li><a href="https://go.oncehub.com/GettingToKnow" target="_blank" rel="noopener">Book a Discovery Call</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link href="/about">About Chrissy</Link></li>
                <li><Link href="/press">Press</Link></li>
                <li><Link href="/podcast">Finally Seen Podcast</Link></li>
                <li><Link href="/blog">Blog</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Client Portal</h4>
              <ul>
                <li><Link href="/auth/login">Client Login</Link></li>
                <li><Link href="/auth/login">Team Login</Link></li>
                <li><Link href="/auth/signup">Get Access</Link></li>
                <li><Link href="/dashboard">Command Center</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} Be a Better Brand, LLC. All rights reserved.</span>
            <div>
              <a href="https://beabetterbrand.com" target="_blank" rel="noopener">beabetterbrand.com</a>
              <Link href="/auth/login">Dashboard Login</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll reveal */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          var els = document.querySelectorAll('.reveal');
          var io = new IntersectionObserver(function(entries){
            entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
          },{threshold:0.08,rootMargin:'0px 0px -40px 0px'});
          els.forEach(function(el){ io.observe(el); });
        })();
      `}} />
    </>
  )
}
