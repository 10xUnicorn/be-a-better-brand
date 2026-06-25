'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

/* ── Demo data ─────────────────────────────────────────────── */
const demoDeliverables = [
  { id: '1', title: 'Brand Architecture Blueprint', phase: 1, status: 'approved', file_type: 'pdf', delivered_at: '2025-06-10', description: 'Complete brand architecture including mission, vision, values, and positioning framework.' },
  { id: '2', title: 'Signature Messaging Guide', phase: 2, status: 'pending_review', file_type: 'pdf', delivered_at: '2025-06-05', description: 'Your unique messaging pillars, elevator pitch, and brand voice guidelines.' },
  { id: '3', title: 'PR Media Targets List', phase: 3, status: 'approved', file_type: 'xlsx', delivered_at: '2025-05-28', description: 'Curated list of 50+ media outlets, journalists, and podcast opportunities.' },
  { id: '4', title: 'Thought Leadership Calendar', phase: 2, status: 'revision_requested', file_type: 'pdf', delivered_at: '2025-05-20', description: 'Q3 content calendar with themes, topics, and publishing schedule.' },
  { id: '5', title: 'Visual Identity Moodboard', phase: 1, status: 'approved', file_type: 'fig', delivered_at: '2025-05-10', description: 'Brand colors, typography, imagery direction, and design references.' },
]

const demoMessages = [
  { id: '1', sender_name: 'Chrissy Bernal', sender_role: 'owner', message: 'Your Forbes feature is confirmed for June 28! We\'ll prep talking points next week.', is_read: true, created_at: '2025-06-15T10:15:00' },
  { id: '2', sender_name: 'Danielle R.', sender_role: 'client', message: 'Amazing news! I\'ll review the draft by Friday. Can we move our call to Tuesday?', is_read: true, created_at: '2025-06-15T11:30:00' },
  { id: '3', sender_name: 'Maya L.', sender_role: 'team_member', message: 'Updated your media kit with the new headshots. Please review in the File Vault.', is_read: false, created_at: '2025-06-14T15:45:00' },
  { id: '4', sender_name: 'Chrissy Bernal', sender_role: 'owner', message: 'I reviewed your messaging guide revisions - looks great. Let\'s finalize on our next call.', is_read: false, created_at: '2025-06-14T09:20:00' },
  { id: '5', sender_name: 'Jordan K.', sender_role: 'team_member', message: 'Social media analytics are in - your LinkedIn engagement is up 34% this month!', is_read: false, created_at: '2025-06-13T16:00:00' },
]

const phaseNames = ['', 'Clarity Core', 'Authority Positioning', 'Visibility Engine', 'Proof & Momentum']
const delStatusPill: Record<string, string> = { approved: 'pill-green', pending_review: 'pill-amber', revision_requested: 'pill-red' }
const delStatusLabel: Record<string, string> = { approved: 'Approved', pending_review: 'Pending Review', revision_requested: 'Revision Requested' }

export default function PortalPage() {
  const [deliverables, setDeliverables] = useState(demoDeliverables)
  const [messages, setMessages] = useState(demoMessages)
  const [newMessage, setNewMessage] = useState('')
  const [currentPhase] = useState(3)
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: dels } = await supabase.from('portal_deliverables').select('*').eq('client_id', user.id).order('delivered_at', { ascending: false })
        if (dels && dels.length > 0) setDeliverables(dels)

        const { data: msgs } = await supabase.from('portal_messages').select('*').order('created_at', { ascending: true }).limit(50)
        if (msgs && msgs.length > 0) setMessages(msgs)
      } catch { /* use demo data */ }
    }
    load()
  }, [])

  function showToast(msg: string, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  async function handleSendMessage() {
    if (!newMessage.trim()) return
    const msg = {
      id: `new-${Date.now()}`,
      sender_name: 'You',
      sender_role: 'client',
      message: newMessage,
      is_read: true,
      created_at: new Date().toISOString(),
    }

    setMessages(prev => [...prev, msg])
    setNewMessage('')

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('portal_messages').insert({
        client_id: user?.id,
        sender_id: user?.id,
        sender_role: 'client',
        message: newMessage,
        is_read: false,
      })
      showToast('Message sent')
    } catch {
      showToast('Demo: Message added locally')
    }
  }

  const progressPct = currentPhase === 1 ? 15 : currentPhase === 2 ? 40 : currentPhase === 3 ? 65 : 90

  return (
    <>
      {/* Portal Welcome Banner */}
      <div className="portal-banner">
        <div>
          <h2 className="serif" style={{ fontSize: 22, color: '#f0c370', fontWeight: 700 }}>Welcome to Your Brand Journey</h2>
          <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.7)', marginTop: 6, fontStyle: 'italic', maxWidth: 500 }}>
            Your transformation through the Finally Seen Framework is underway. Track deliverables, review progress, and connect with your team right here.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="serif" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 4 }}>Current Phase</div>
          <div className="serif" style={{ fontSize: 18, color: '#f0c370', fontWeight: 700 }}>{phaseNames[currentPhase]}</div>
        </div>
      </div>

      {/* Journey Progress */}
      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-head">
          <span className="panel-title">Finally Seen Framework -- Your Progress</span>
          <span className="pill pill-purple">Phase {currentPhase} of 4</span>
        </div>
        <div className="panel-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { num: 1, name: 'Clarity Core', complete: true },
              { num: 2, name: 'Authority Positioning', complete: true },
              { num: 3, name: 'Visibility Engine', complete: false, active: true },
              { num: 4, name: 'Proof & Momentum', complete: false },
            ].map(phase => {
              const isActive = phase.num === currentPhase
              return (
                <div key={phase.num} style={{
                  background: isActive ? 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(240,195,112,0.08))' : 'rgba(255,255,255,0.5)',
                  border: isActive ? '2px solid rgba(201,168,76,0.4)' : '1px solid rgba(240,195,112,0.2)',
                  borderRadius: 11, padding: '16px 14px', textAlign: 'center',
                }}>
                  <div className="serif" style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: phase.complete ? 'linear-gradient(135deg, #2a7a3a, #3a9a4a)' : isActive ? 'linear-gradient(135deg, #c9a84c, #e8c97a)' : 'rgba(138,122,154,0.2)',
                    color: phase.complete || isActive ? '#fff' : '#8a7a9a',
                    fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px',
                  }}>
                    {phase.complete ? '\u2713' : phase.num}
                  </div>
                  <div className="serif" style={{ fontSize: 12, fontWeight: 700, color: isActive ? '#c9a84c' : '#1e0a4a', marginBottom: 4 }}>{phase.name}</div>
                  <span className={`pill ${phase.complete ? 'pill-green' : isActive ? 'pill-gold' : 'pill-amber'}`} style={{ fontSize: 9 }}>
                    {phase.complete ? 'Complete' : isActive ? 'In Progress' : 'Upcoming'}
                  </span>
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4, color: '#5a4070' }}>
              <span>Overall Progress</span>
              <span style={{ fontWeight: 700, color: '#c9a84c' }}>{progressPct}%</span>
            </div>
            <div className="prog-wrap" style={{ height: 10 }}>
              <div className="prog-fill" style={{ width: `${progressPct}%`, height: 10 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Two-column: Deliverables + Messages */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {/* Recent Deliverables */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Recent Deliverables</span>
            <span className="pill pill-gold">{deliverables.length} Items</span>
          </div>
          <div className="panel-body">
            {deliverables.map((d, i) => (
              <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < deliverables.length - 1 ? '1px solid rgba(240,195,112,0.12)' : 'none' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(240,195,112,0.08))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0,
                  fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: '#c9a84c',
                }}>
                  {d.file_type?.toUpperCase().slice(0, 3) || 'DOC'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1e0a4a', marginBottom: 2 }}>{d.title}</div>
                  <div style={{ fontSize: '10.5px', color: '#7a6090', fontStyle: 'italic' }}>
                    {phaseNames[d.phase]} -- {d.delivered_at ? new Date(d.delivered_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                  </div>
                  {d.description && <div style={{ fontSize: '10.5px', color: '#5a4070', marginTop: 3, lineHeight: 1.4 }}>{d.description}</div>}
                </div>
                <span className={`pill ${delStatusPill[d.status] || 'pill-amber'}`}>{delStatusLabel[d.status] || d.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Messages</span>
            <span className="pill pill-green">{messages.filter(m => !m.is_read).length} Unread</span>
          </div>
          <div className="panel-body">
            <div style={{ maxHeight: 380, overflowY: 'auto', marginBottom: 14 }}>
              {messages.map((msg, i) => {
                const isMe = msg.sender_role === 'client'
                const initials = msg.sender_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
                return (
                  <div key={msg.id} style={{
                    display: 'flex', gap: 10, padding: '10px 0',
                    borderBottom: i < messages.length - 1 ? '1px solid rgba(240,195,112,0.12)' : 'none',
                    flexDirection: isMe ? 'row-reverse' : 'row',
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: isMe ? 'linear-gradient(135deg, #c9a84c, #e8c97a)' : 'linear-gradient(135deg, #1e0a4a, #331081)',
                      color: isMe ? '#1e0a4a' : '#f0c370',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, flexShrink: 0,
                    }}>{initials}</div>
                    <div style={{ flex: 1, textAlign: isMe ? 'right' : 'left' }}>
                      <div style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'space-between', gap: 8, marginBottom: 3 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#1e0a4a' }}>{msg.sender_name}</span>
                        <span style={{ fontSize: 10, color: '#9a8aaa', fontStyle: 'italic' }}>
                          {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div style={{
                        fontSize: '11.5px', color: '#5a4070', lineHeight: 1.5,
                        background: isMe ? 'rgba(201,168,76,0.1)' : 'rgba(30,10,74,0.04)',
                        padding: '8px 12px', borderRadius: 10,
                        display: 'inline-block', maxWidth: '90%', textAlign: 'left',
                      }}>{msg.message}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Send Message */}
            <div style={{ borderTop: '1px solid rgba(240,195,112,0.18)', paddingTop: 12 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  style={{ flex: 1 }}
                />
                <button className="btn btn-gold btn-sm" onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </>
  )
}
