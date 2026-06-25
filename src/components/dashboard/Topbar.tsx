'use client'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const PAGE_TITLES: Record<string, string> = {
  '/overview': 'Command Overview',
  '/kpis': 'KPIs & Reports',
  '/pipeline': 'Pipeline & Deals',
  '/clients': 'Clients & Journey',
  '/finance': 'Finance & Stripe',
  '/content': 'Content & Media',
  '/portal': 'Client Portal',
  '/worksheets': 'Worksheets',
  '/ai-brain': 'AI Brain',
  '/messaging': 'Messaging',
  '/team': 'Team Management',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
  '/journey': 'My Journey',
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Topbar({ userName, tasksDue }: { userName: string; tasksDue?: number }) {
  const pathname = usePathname()
  const router = useRouter()
  const title = PAGE_TITLES[pathname] || 'Dashboard'
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div
      className="sticky top-0 z-50 flex items-center justify-between"
      style={{
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(240,195,112,0.25)',
        padding: '0 32px',
        height: 62,
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 20,
          fontWeight: 700,
          color: '#1e0a4a',
          letterSpacing: '0.3px',
        }}
      >
        {title}
      </div>
      <div className="flex items-center gap-[14px]">
        <span
          style={{
            fontSize: '12.5px',
            color: '#5a4070',
            fontStyle: 'italic',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          {getGreeting()}, {userName.split(' ')[0]}
        </span>
        {tasksDue && tasksDue > 0 ? (
          <span
            style={{
              background: '#e8b84b',
              color: '#1e0a4a',
              borderRadius: 20,
              padding: '3px 10px',
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            {'\u2726'} {tasksDue} Tasks Due
          </span>
        ) : null}
        <div
          onClick={handleLogout}
          className="cursor-pointer"
          title="Sign out"
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #c9a84c, #e8b84b)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 13,
            fontWeight: 700,
            color: '#1e0a4a',
            letterSpacing: '0.5px',
            border: '2px solid rgba(240,195,112,0.5)',
          }}
        >
          {initials}
        </div>
      </div>
    </div>
  )
}
