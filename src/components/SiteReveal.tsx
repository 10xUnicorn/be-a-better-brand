'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function SiteReveal() {
  const pathname = usePathname()

  useEffect(() => {
    // Re-initialize IntersectionObserver on every route change
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    // Reset all reveals on new page, then observe
    els.forEach((el) => {
      el.classList.remove('in')
      io.observe(el)
    })

    return () => io.disconnect()
  }, [pathname]) // re-runs on every route change

  return null
}
