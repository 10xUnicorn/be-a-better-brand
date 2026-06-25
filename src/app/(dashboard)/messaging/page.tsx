'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

/* ── Demo data ─────────────────────────────────────────────── */
const demoConversations = [
  {
    id: 'c1', client_name: 'Danielle R.', client_initials: 'DR', offer: 'Visibility Retainer', unread: 2,
    messages: [
      { id: 'm1', sender: 'Chrissy Bernal', role: 'owner', text: 'Hi Danielle! Your Forbes feature is confirmed for June 28. Let\'s prep talking points next week.', time: '2025-06-15T10:15:00' },
      { id: 'm2', sender: 'Danielle R.', role: 'client', text: 'Amazing news! I\'ll review the draft by Friday. Can we move our call to Tuesday?', time: '2025-06-15T11:30:00' },
      { id: 'm3', sender: 'Maya L.', role: 'team_member', text: 'Updated your media kit with the new headshots. Please review in the File Vault.', time: '2025-06-14T15:45:00' },
      { id: 'm4', sender: 'Danielle R.', role: 'client', text: 'Just saw the updated media kit - looks fantastic! One small note on the bio, I\'ll mark it up.', time: '2025-06-15T14:20:00' },
      { id: 'm5', sender: 'Chrissy Bernal', role: 'owner', text: 'Perfect. Tuesday at 2pm CT works great. I\'ll send the calendar invite.', time: '2025-06-15T15:00:00' },
    ],
  },
  {
    id: 'c2', client_name: 'Sarah M.', client_initials: 'SM', offer: 'Book Launch Sprint', unread: 1,
    messages: [
      { id: 'm6', sender: 'Chrissy Bernal', role: 'owner', text: 'Sarah, your pre-launch numbers are incredible. Newsletter open rates at 61%!', time: '2025-06-14T09:00:00' },
      { id: 'm7', sender: 'Sarah M.', role: 'client', text: 'Thank you! The messaging work we did in Phase 2 is really paying off. When should we start the testimonial campaign?', time: '2025-06-14T10:30:00' },
      { id: 'm8', sender: 'Chrissy Bernal', role: 'owner', text: 'I recommend launching it next week to maximize the pre-order window. I\'ll draft the outreach templates.', time: '2025-06-14T11:15:00' },
    ],
  },
  {
    id: 'c3', client_name: 'Christine L.', client_initials: 'CL', offer: 'Fractional CMO', unread: 0,
    messages: [
      { id: 'm9', sender: 'Christine L.', role: 'client', text: 'Chrissy, can we discuss the Q3 content strategy on our next call?', time: '2025-06-13T14:00:00' },
      { id: 'm10', sender: 'Chrissy Bernal', role: 'owner', text: 'Absolutely. I\'ve been working on a LinkedIn thought leadership series that I think will be perfect for your positioning. Let me share the outline.', time: '2025-06-13T15:30:00' },
    ],
  },
  {
    id: 'c4', client_name: 'Yolanda T.', client_initials: 'YT', offer: 'Visibility Retainer', unread: 0,
    messages: [
      { id: 'm11', sender: 'Yolanda T.', role: 'client', text: 'Just finished the Authority Positioning worksheet! It was really eye-opening.', time: '2025-06-12T16:00:00' },
      { id: 'm12', sender: 'Chrissy Bernal', role: 'owner', text: 'Wonderful! I\'ll review it this week and we can discuss during our Thursday call.', time: '2025-06-12T17:00:00' },
    ],
  },
  {
    id: 'c5', client_name: 'Brianna K.', client_initials: 'BK', offer: 'Six Figure Chicks', unread: 3,
    messages: [
      { id: 'm13', sender: 'Chrissy Bernal', role: 'owner', text: 'Hi Brianna, I noticed your invoice is past due. Is everything okay? Happy to discuss a payment plan if needed.', time: '2025-06-10T09:00:00' },
      { id: 'm14', sender: 'Jordan K.', role: 'team_member', text: 'Also wanted to check in on your SFC Growth Accelerator worksheet - would you like some help getting started?', time: '2025-06-11T10:00:00' },
    ],
  },
  {
    id: 'c6', client_name: 'Monica T.', client_initials: 'MT', offer: 'Pipeline - Fractional CMO', unread: 0,
    messages: [
      { id: 'm15', sender: 'Monica T.', role: 'client', text: 'Thanks for the proposal. I\'m reviewing it with my business partner and will get back to you by Friday.', time: '2025-06-13T11:00:00' },
      { id: 'm16', sender: 'Chrissy Bernal', role: 'owner', text: 'Take your time, Monica. Let me know if you have any questions - happy to hop on a quick call.', time: '2025-06-13T11:30:00' },
    ],
  },
]

export default function MessagingPage() {
  const [conversations, setConversations] = useState(demoConversations)
  const [activeConvo, setActiveConvo] = useState(demoConversations[0].id)
  const [newMessage, setNewMessage] = useState('')
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const active = conversations.find(c => c.id === activeConvo)

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data } = await supabase.from('portal_messages').select('*').order('created_at', { ascending: true })
        if (data && data.length > 0) {
          // Group by client for sidebar - this would need client context in production
        }
      } catch { /* demo data */ }
    }
    load()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConvo, conversations])

  function showToast(msg: string, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  async function handleSend() {
    if (!newMessage.trim() || !active) return

    const msg = {
      id: `new-${Date.now()}`,
      sender: 'Chrissy Bernal',
      role: 'owner',
      text: newMessage,
      time: new Date().toISOString(),
    }

    setConversations(prev =>
      prev.map(c => c.id === activeConvo ? { ...c, messages: [...c.messages, msg] } : c)
    )
    setNewMessage('')

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('portal_messages').insert({
        client_id: activeConvo,
        sender_id: user?.id,
        sender_role: 'owner',
        message: newMessage,
        is_read: false,
      })
      showToast('Message sent')
    } catch {
      showToast('Demo: Message sent locally')
    }
  }

  function markRead(convoId: string) {
    setConversations(prev =>
      prev.map(c => c.id === convoId ? { ...c, unread: 0 } : c)
    )
  }

  const totalUnread = conversations.reduce((s, c) => s + c.unread, 0)

  return (
    <div style={{ display: 'flex', gap: 0, height: 'calc(100vh - 140px)', minHeight: 500 }}>
      {/* Client List Sidebar */}
      <div style={{
        width: 280, borderRight: '1px solid rgba(240,195,112,0.2)',
        background: 'rgba(255,255,255,0.78)', borderRadius: '13px 0 0 13px',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(240,195,112,0.18)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="panel-title">Messages</span>
            {totalUnread > 0 && <span className="pill pill-red">{totalUnread} Unread</span>}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {conversations.map(c => (
            <div
              key={c.id}
              onClick={() => { setActiveConvo(c.id); markRead(c.id) }}
              style={{
                padding: '14px 18px', cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center',
                background: activeConvo === c.id ? 'rgba(201,168,76,0.1)' : 'transparent',
                borderBottom: '1px solid rgba(240,195,112,0.1)',
                borderLeft: activeConvo === c.id ? '3px solid #c9a84c' : '3px solid transparent',
                transition: 'all 0.15s',
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #1e0a4a, #331081)',
                color: '#f0c370', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, flexShrink: 0,
              }}>{c.client_initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#1e0a4a' }}>{c.client_name}</span>
                  {c.unread > 0 && (
                    <span style={{
                      background: '#c9a84c', color: '#fff', borderRadius: '50%',
                      width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 9, fontWeight: 700, flexShrink: 0,
                    }}>{c.unread}</span>
                  )}
                </div>
                <div style={{ fontSize: 10, color: '#8a7a9a', marginTop: 2 }}>{c.offer}</div>
                <div style={{ fontSize: 10.5, color: '#5a4070', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {c.messages[c.messages.length - 1]?.text || ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Thread */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        background: 'rgba(255,255,255,0.5)', borderRadius: '0 13px 13px 0',
        border: '1px solid rgba(240,195,112,0.2)', borderLeft: 'none',
      }}>
        {/* Thread Header */}
        {active && (
          <>
            <div style={{
              padding: '14px 20px', borderBottom: '1px solid rgba(240,195,112,0.18)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'rgba(255,255,255,0.78)',
            }}>
              <div>
                <span className="serif" style={{ fontSize: 15, fontWeight: 700, color: '#1e0a4a' }}>{active.client_name}</span>
                <span style={{ fontSize: 11, color: '#8a7a9a', marginLeft: 10 }}>{active.offer}</span>
              </div>
              <span className="pill pill-gold">{active.messages.length} messages</span>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
              {active.messages.map(msg => {
                const isOwner = msg.role === 'owner' || msg.role === 'team_member'
                const initials = msg.sender.split(' ').map(w => w[0]).join('').slice(0, 2)
                return (
                  <div key={msg.id} style={{
                    display: 'flex', gap: 10, marginBottom: 16,
                    flexDirection: isOwner ? 'row' : 'row-reverse',
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      background: isOwner ? 'linear-gradient(135deg, #1e0a4a, #331081)' : 'linear-gradient(135deg, #c9a84c, #e8c97a)',
                      color: isOwner ? '#f0c370' : '#1e0a4a',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700,
                    }}>{initials}</div>
                    <div style={{ maxWidth: '70%' }}>
                      <div style={{
                        display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4,
                        flexDirection: isOwner ? 'row' : 'row-reverse',
                      }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#1e0a4a' }}>{msg.sender}</span>
                        <span style={{ fontSize: 9.5, color: '#9a8aaa', fontStyle: 'italic' }}>
                          {new Date(msg.time).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                        </span>
                      </div>
                      <div style={{
                        padding: '10px 14px', borderRadius: 12, fontSize: 12, lineHeight: 1.6, color: '#2a1a40',
                        background: isOwner ? 'rgba(30,10,74,0.06)' : 'rgba(201,168,76,0.12)',
                        borderTopLeftRadius: isOwner ? 4 : 12,
                        borderTopRightRadius: isOwner ? 12 : 4,
                      }}>{msg.text}</div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Send Input */}
            <div style={{
              padding: '12px 20px', borderTop: '1px solid rgba(240,195,112,0.18)',
              background: 'rgba(255,255,255,0.78)',
            }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  placeholder={`Message ${active.client_name}...`}
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  style={{ flex: 1 }}
                />
                <button className="btn btn-gold" onClick={handleSend}>Send</button>
              </div>
            </div>
          </>
        )}
      </div>

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </div>
  )
}
