'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div style={{
        padding: '20px 32px',
        background: 'rgba(201,168,76,0.1)',
        border: '1px solid rgba(201,168,76,0.3)',
        borderRadius: 10,
        color: '#c9a84c',
        fontSize: 15,
        fontWeight: 600,
        textAlign: 'center',
        maxWidth: 440,
        margin: '0 auto',
      }}>
        You&apos;re on the list. Welcome to the inner circle.
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: 0,
        maxWidth: 440,
        margin: '0 auto',
        overflow: 'hidden',
        borderRadius: 10,
        border: '1.5px solid rgba(201,168,76,0.35)',
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        aria-label="Email address for newsletter"
        style={{
          flex: 1,
          padding: '16px 20px',
          background: 'rgba(255,255,255,0.06)',
          border: 'none',
          color: '#fff',
          fontSize: 14,
          fontFamily: "'DM Sans', sans-serif",
          outline: 'none',
        }}
      />
      <button
        type="submit"
        className="btn-gold"
        style={{ borderRadius: 0, padding: '16px 24px', fontSize: 13 }}
      >
        Subscribe
      </button>
    </form>
  )
}
