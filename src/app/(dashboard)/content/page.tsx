'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

/* ── Demo data ─────────────────────────────────────────────── */
const demoContent = [
  { id: '1', title: 'Forbes Feature — Danielle R.', content_type: 'media_feature', status: 'scheduled', publish_date: '2025-06-28', channel: 'Forbes.com', tags: ['PR', 'Feature'] },
  { id: '2', title: 'UpLevel Ep. 95: "Visibility Without Vanity Metrics"', content_type: 'podcast', status: 'drafting', publish_date: '2025-06-25', channel: 'Podcast', tags: ['Podcast'] },
  { id: '3', title: 'LinkedIn: Authority Positioning for Authors', content_type: 'linkedin', status: 'drafting', publish_date: '2025-06-22', channel: 'LinkedIn', tags: ['Social'] },
  { id: '4', title: 'Newsletter: Finally Seen Framework Deep Dive', content_type: 'newsletter', status: 'in_review', publish_date: '2025-06-20', channel: 'Email', tags: ['Email'] },
  { id: '5', title: 'Instagram Carousel: Client Success Spotlight', content_type: 'instagram', status: 'idea', publish_date: '2025-06-18', channel: 'Instagram', tags: ['Social'] },
  { id: '6', title: 'Blog: 5 Signs You Need a Fractional CMO', content_type: 'blog', status: 'published', publish_date: '2025-06-12', channel: 'Website', tags: ['Blog', 'SEO'] },
  { id: '7', title: 'LinkedIn: Book Launch Pre-Order Campaign', content_type: 'linkedin', status: 'published', publish_date: '2025-06-10', channel: 'LinkedIn', tags: ['Social'] },
  { id: '8', title: 'Newsletter: June Brand Visibility Roundup', content_type: 'newsletter', status: 'scheduled', publish_date: '2025-06-30', channel: 'Email', tags: ['Email'] },
]

const demoPR = [
  { id: 'p1', publication: 'Forbes.com', client_name: 'Danielle R.', status: 'placed', journalist: 'Jennifer W.', pitch_date: '2025-05-10', notes: 'Feature live May 28' },
  { id: 'p2', publication: 'Inc. Magazine', client_name: 'Monica T.', status: 'followed_up', journalist: 'Marcus D.', pitch_date: '2025-05-22', notes: 'Revisions due June 5' },
  { id: 'p3', publication: 'Fast Company', client_name: 'Sarah M.', status: 'pitched', journalist: 'Alicia R.', pitch_date: '2025-06-03', notes: 'Follow-up scheduled' },
  { id: 'p4', publication: 'Entrepreneur', client_name: 'Lisa W.', status: 'pitched', journalist: 'David K.', pitch_date: '2025-06-08', notes: 'Editor reviewing' },
  { id: 'p5', publication: 'Harvard Business Review', client_name: 'Christine L.', status: 'pitched', journalist: 'Sarah T.', pitch_date: '2025-06-12', notes: 'Initial contact' },
  { id: 'p6', publication: 'Business Insider', client_name: 'Yolanda T.', status: 'declined', journalist: 'Mike R.', pitch_date: '2025-05-15', notes: 'Not a fit — re-pitch Q3' },
]

const typePill: Record<string, string> = {
  podcast: 'pill-purple', newsletter: 'pill-gold', linkedin: 'pill-amber',
  instagram: 'pill-amber', press_pitch: 'pill-purple', media_feature: 'pill-green', blog: 'pill-gold',
}
const statusPill: Record<string, string> = {
  idea: 'pill-amber', drafting: 'pill-purple', in_review: 'pill-gold', scheduled: 'pill-green', published: 'pill-green',
}
const prStatusPill: Record<string, string> = {
  pitched: 'pill-purple', followed_up: 'pill-amber', placed: 'pill-green', declined: 'pill-red',
}

const typeLabel: Record<string, string> = {
  podcast: 'Podcast', newsletter: 'Newsletter', linkedin: 'LinkedIn', instagram: 'Instagram',
  press_pitch: 'PR Pitch', media_feature: 'Media Feature', blog: 'Blog',
}

export default function ContentPage() {
  const [content, setContent] = useState(demoContent)
  const [prPlacements, setPrPlacements] = useState(demoPR)
  const [showModal, setShowModal] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null)
  const [form, setForm] = useState({
    title: '', content_type: '', publish_date: '', channel: '', body: '',
  })

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data: items } = await supabase.from('content_items').select('*').order('publish_date', { ascending: false })
        if (items && items.length > 0) setContent(items)
        const { data: pr } = await supabase.from('media_placements').select('*, clients(name)').order('pitch_date', { ascending: false })
        if (pr && pr.length > 0) setPrPlacements(pr.map((p: Record<string, unknown>) => ({
          ...p,
          client_name: (p.clients as Record<string, unknown>)?.name || p.client_name || '',
        })) as typeof demoPR)
      } catch { /* use demo data */ }
    }
    load()
  }, [])

  function showToast(msg: string, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  async function handleCreate() {
    const newItem = {
      id: `new-${Date.now()}`,
      title: form.title,
      content_type: form.content_type,
      status: 'idea',
      publish_date: form.publish_date,
      channel: form.channel,
      tags: [],
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.from('content_items').insert({
        title: form.title,
        content_type: form.content_type,
        status: 'idea',
        publish_date: form.publish_date || null,
        channel: form.channel,
        body: form.body,
        visible_to_clients: false,
        visible_to_sfc: false,
      })
      if (error) throw error
      showToast('Content item created')
    } catch {
      showToast('Demo: Content item added locally')
    }

    setContent(prev => [newItem, ...prev])
    setShowModal(false)
    setForm({ title: '', content_type: '', publish_date: '', channel: '', body: '' })
  }

  /* ── KPI computations ───────────────────────────────────── */
  const published = content.filter(c => c.status === 'published').length
  const drafts = content.filter(c => c.status === 'drafting' || c.status === 'idea').length
  const scheduled = content.filter(c => c.status === 'scheduled').length
  const activePitches = prPlacements.filter(p => p.status === 'pitched' || p.status === 'followed_up').length

  const kpis = [
    { label: 'Published This Month', value: String(published), trend: `${published} pieces live`, color: '#5a8a5a' },
    { label: 'Drafts in Progress', value: String(drafts), trend: 'Needs review & scheduling', color: '#8a7a50' },
    { label: 'Scheduled', value: String(scheduled), trend: 'Queued for publishing', color: '#5a8a5a' },
    { label: 'PR Pitches Active', value: String(activePitches), trend: `${prPlacements.filter(p => p.status === 'placed').length} placed this quarter`, color: '#5a8a5a' },
  ]

  function formatDate(d: string) {
    if (!d) return '--'
    const dt = new Date(d)
    return { day: String(dt.getDate()), month: dt.toLocaleString('en-US', { month: 'short' }) }
  }

  return (
    <>
      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 26 }}>
        {kpis.map(kpi => (
          <div className="kpi-card" key={kpi.label}>
            <div className="serif" style={{ fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '1.8px', color: '#7a6090', marginBottom: 8, fontWeight: 600 }}>{kpi.label}</div>
            <div className="serif" style={{ fontSize: 26, fontWeight: 700, color: '#1e0a4a', lineHeight: 1 }}>{kpi.value}</div>
            <div style={{ fontSize: '10.5px', marginTop: 5, color: kpi.color }}>{kpi.trend}</div>
          </div>
        ))}
      </div>

      {/* Content Calendar */}
      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-head">
          <span className="panel-title">Content Calendar</span>
          <button className="btn btn-gold btn-sm" onClick={() => setShowModal(true)}>+ New Content</button>
        </div>
        <div className="panel-body">
          {content.map((item, i) => {
            const d = formatDate(item.publish_date)
            return (
              <div key={item.id} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < content.length - 1 ? '1px solid rgba(240,195,112,0.12)' : 'none', alignItems: 'center' }}>
                <div style={{ minWidth: 42, textAlign: 'center', background: 'linear-gradient(135deg, #1e0a4a, #331081)', borderRadius: 8, padding: '6px 4px', color: '#f0c370' }}>
                  {typeof d === 'object' ? (
                    <>
                      <div className="serif" style={{ fontSize: 16, fontWeight: 700, lineHeight: 1 }}>{d.day}</div>
                      <div className="serif" style={{ fontSize: '8.5px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.75 }}>{d.month}</div>
                    </>
                  ) : <div className="serif" style={{ fontSize: 12 }}>--</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1e0a4a', marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: '10.5px', color: '#7a6090', fontStyle: 'italic' }}>{item.channel || typeLabel[item.content_type] || item.content_type}</div>
                </div>
                <span className={`pill ${typePill[item.content_type] || 'pill-amber'}`} style={{ marginRight: 6 }}>{typeLabel[item.content_type] || item.content_type}</span>
                <span className={`pill ${statusPill[item.status] || 'pill-amber'}`}>{item.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* PR & Media Tracker */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">PR & Media Tracker</span>
          <span className="pill pill-purple">{activePitches} Active Pitches</span>
        </div>
        <div className="panel-body">
          <table>
            <thead>
              <tr>
                <th>Publication</th>
                <th>Client</th>
                <th>Journalist</th>
                <th>Pitch Date</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {prPlacements.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.publication}</strong></td>
                  <td>{p.client_name}</td>
                  <td>{p.journalist}</td>
                  <td>{p.pitch_date ? new Date(p.pitch_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '--'}</td>
                  <td><span className={`pill ${prStatusPill[p.status] || 'pill-amber'}`}>{p.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span></td>
                  <td style={{ fontSize: 11, color: '#7a6090', fontStyle: 'italic' }}>{p.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Content Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, color: '#1e0a4a' }}>New Content</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#8a7a9a' }}>x</button>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label>Title</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Content title..." />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              <div>
                <label>Content Type</label>
                <select value={form.content_type} onChange={e => setForm(f => ({ ...f, content_type: e.target.value }))}>
                  <option value="">Select type...</option>
                  <option value="podcast">Podcast</option>
                  <option value="newsletter">Newsletter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="instagram">Instagram</option>
                  <option value="press_pitch">Press Pitch</option>
                  <option value="blog">Blog</option>
                  <option value="media_feature">Media Feature</option>
                </select>
              </div>
              <div>
                <label>Publish Date</label>
                <input type="date" value={form.publish_date} onChange={e => setForm(f => ({ ...f, publish_date: e.target.value }))} />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label>Channel</label>
              <input value={form.channel} onChange={e => setForm(f => ({ ...f, channel: e.target.value }))} placeholder="e.g. LinkedIn, Forbes, Email..." />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label>Body / Brief</label>
              <textarea rows={4} value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} placeholder="Content body or brief description..." />
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-gold" onClick={handleCreate} disabled={!form.title || !form.content_type}>Create</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </>
  )
}
