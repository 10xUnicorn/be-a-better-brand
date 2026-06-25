'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { UserRole } from '@/lib/types'

const LOGO_URL = 'https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782365592080-Be_A_Better_Brand_Logo.png'

interface NavItem {
  label: string
  href: string
  icon: string
  roles?: UserRole[]
}

interface NavSection {
  title: string
  items: NavItem[]
}

const internalNav: NavSection[] = [
  {
    title: 'Command',
    items: [
      { label: 'Overview', href: '/overview', icon: '\u25C8' },
      { label: 'KPIs & Reports', href: '/kpis', icon: '\u25C9' },
    ],
  },
  {
    title: 'Growth',
    items: [
      { label: 'Pipeline & Deals', href: '/pipeline', icon: '\u25C8' },
      { label: 'Clients & Journey', href: '/clients', icon: '\u2726' },
      { label: 'Finance & Stripe', href: '/finance', icon: '\u25CE' },
    ],
  },
  {
    title: 'Visibility',
    items: [
      { label: 'Content & Media', href: '/content', icon: '\u2727' },
      { label: 'Client Portal', href: '/portal', icon: '\u2B21' },
      { label: 'Worksheets', href: '/worksheets', icon: '\u25C7' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { label: 'AI Brain', href: '/ai-brain', icon: '\u26A1' },
      { label: 'Messaging', href: '/messaging', icon: '\u2709' },
      { label: 'Team', href: '/team', icon: '\u2605' },
      { label: 'Notifications', href: '/notifications', icon: '\uD83D\uDD14' },
      { label: 'Settings', href: '/settings', icon: '\u2699' },
    ],
  },
]

const clientNav: NavSection[] = [
  {
    title: 'My Dashboard',
    items: [
      { label: 'Overview', href: '/overview', icon: '\u25C8' },
      { label: 'My Journey', href: '/journey', icon: '\u2726' },
    ],
  },
  {
    title: 'Work',
    items: [
      { label: 'Worksheets', href: '/worksheets', icon: '\u25C7' },
      { label: 'Content', href: '/content', icon: '\u2727' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Payments', href: '/finance', icon: '\u25CE' },
      { label: 'Notifications', href: '/notifications', icon: '\uD83D\uDD14' },
      { label: 'Settings', href: '/settings', icon: '\u2699' },
    ],
  },
]

export default function Sidebar({ role }: { role: UserRole }) {
  const pathname = usePathname()
  const isClient = role === 'client' || role === 'sfc_member'
  const nav = isClient ? clientNav : internalNav

  return (
    <nav
      className="fixed top-0 left-0 z-[100] flex flex-col"
      style={{
        width: 240,
        minHeight: '100vh',
        background: '#1e0a4a',
        borderRight: '1px solid #2d1260',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <img src={LOGO_URL} alt="Be a Better Brand" style={{ width: '100%', maxHeight: 56, objectFit: 'contain' }} />
      </div>

      {/* Nav sections */}
      <div className="flex-1 overflow-y-auto">
        {nav.map((section) => (
          <div key={section.title} style={{ padding: '14px 14px 4px' }}>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '9px',
                letterSpacing: '2px',
                textTransform: 'uppercase' as const,
                color: 'rgba(240,195,112,0.55)',
                fontWeight: 600,
                marginBottom: 6,
                paddingLeft: 4,
              }}
            >
              {section.title}
            </div>
            {section.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-[9px] no-underline"
                  style={{
                    padding: isActive ? '8px 10px 8px 10px' : '8px 12px',
                    borderRadius: 9,
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '12.5px',
                    color: isActive ? '#f0c370' : 'rgba(255,255,255,0.78)',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '0.2px',
                    marginBottom: 2,
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(240,195,112,0.22), rgba(240,195,112,0.08))'
                      : 'transparent',
                    borderLeft: isActive ? '2px solid #f0c370' : '2px solid transparent',
                    transition: 'all 0.18s',
                  }}
                >
                  <span style={{ fontSize: 14, width: 18, textAlign: 'center', opacity: 0.85 }}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '14px 18px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          fontSize: '10.5px',
          color: 'rgba(255,255,255,0.35)',
          fontStyle: 'italic',
        }}
      >
        Finally Seen Framework&trade; v2.0
      </div>
    </nav>
  )
}
