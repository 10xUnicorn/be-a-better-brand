'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

/* ── Demo data ─────────────────────────────────────────────── */
const demoWorksheets = [
  { id: '1', title: 'Brand Architecture Discovery', phase: 'CC' as const, description: 'Deep dive into your brand foundation: mission, vision, values, and unique positioning in the marketplace.', fields: Array(12).fill(null), is_sfc_only: false },
  { id: '2', title: 'Ideal Client Avatar', phase: 'CC' as const, description: 'Define your dream client profile, their pain points, desires, and where they spend time online.', fields: Array(8).fill(null), is_sfc_only: false },
  { id: '3', title: 'Core Message Clarity', phase: 'CC' as const, description: 'Distill your brand promise, elevator pitch, and signature transformation story.', fields: Array(6).fill(null), is_sfc_only: false },
  { id: '4', title: 'Signature Messaging Pillars', phase: 'AP' as const, description: 'Identify your 3-5 thought leadership pillars that differentiate your authority in the market.', fields: Array(10).fill(null), is_sfc_only: false },
  { id: '5', title: 'Authority Positioning Audit', phase: 'AP' as const, description: 'Evaluate your current authority signals across LinkedIn, media, speaking, and publishing.', fields: Array(15).fill(null), is_sfc_only: false },
  { id: '6', title: 'Content Strategy Blueprint', phase: 'AP' as const, description: 'Map your content ecosystem: channels, frequency, themes, and audience engagement strategy.', fields: Array(9).fill(null), is_sfc_only: false },
  { id: '7', title: 'Media Target Wishlist', phase: 'VE' as const, description: 'Curate your dream list of publications, podcasts, and stages to be featured on.', fields: Array(7).fill(null), is_sfc_only: false },
  { id: '8', title: 'PR Pitch Prep', phase: 'VE' as const, description: 'Prepare your talking points, bios, headshots, and media kit essentials for press outreach.', fields: Array(11).fill(null), is_sfc_only: false },
  { id: '9', title: 'Visibility Engine Tracker', phase: 'VE' as const, description: 'Track your media appearances, speaking engagements, and collaboration opportunities.', fields: Array(8).fill(null), is_sfc_only: false },
  { id: '10', title: 'Social Proof Collection', phase: 'PM' as const, description: 'Gather testimonials, case studies, results, and media mentions for credibility building.', fields: Array(6).fill(null), is_sfc_only: false },
  { id: '11', title: 'Momentum Metrics Dashboard', phase: 'PM' as const, description: 'Define and track your key growth metrics: audience, revenue, media, and impact indicators.', fields: Array(10).fill(null), is_sfc_only: false },
  { id: '12', title: 'SFC Growth Accelerator', phase: 'SFC' as const, description: 'Six Figure Chicks exclusive: map your path to six figures with brand-led strategies.', fields: Array(14).fill(null), is_sfc_only: true },
  { id: '13', title: 'SFC Community Engagement Plan', phase: 'SFC' as const, description: 'Build your engagement strategy within the SFC community and accountability structure.', fields: Array(8).fill(null), is_sfc_only: true },
]

const demoClients = [
  { id: 'c1', name: 'Danielle R.' },
  { id: 'c2', name: 'Sarah M.' },
  { id: 'c3', name: 'Christine L.' },
  { id: 'c4', name: 'Yolanda T.' },
  { id: 'c5', name: 'Brianna K.' },
]

type Phase = 'CC' | 'AP' | 'VE' | 'PM' | 'SFC'

const phaseLabels: Record<Phase, string> = {
  CC: 'Clarity Core', AP: 'Authority Positioning', VE: 'Visibility Engine', PM: 'Proof & Momentum', SFC: 'Six Figure Chicks',
}
const phasePill: Record<Phase, string> = {
  CC: 'pill-amber', AP: 'pill-purple', VE: 'pill-gold', PM: 'pill-green', SFC: 'pill-purple',
}

export default function WorksheetsPage() {
  const [worksheets, setWorksheets] = useState(demoWorksheets)
  const [clients, setClients] = useState(demoClients)
  const [activePhase, setActivePhase] = useState<Phase | 'ALL'>('ALL')
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedWorksheet, setSelectedWorksheet] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null)
  const [assignForm, setAssignForm] = useState({ client_id: '', due_date: '' })
  const [createForm, setCreateForm] = useState({ title: '', phase: '' as Phase | '', description: '', is_sfc_only: false })

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data: ws } = await supabase.from('worksheets').select('*').order('created_at', { ascending: true })
        if (ws && ws.length > 0) setWorksheets(ws)
        const { data: cl } = await supabase.from('clients').select('id, name').eq('is_active', true)
        if (cl && cl.length > 0) setClients(cl)
      } catch { /* demo data */ }
    }
    load()
  }, [])

  function showToast(msg: string, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const filtered = activePhase === 'ALL' ? worksheets : worksheets.filter(w => w.phase === activePhase)

  async function handleAssign() {
    try {
      const supabase = createClient()
      await supabase.from('worksheet_assignments').insert({
        worksheet_id: selectedWorksheet,
        client_id: assignForm.client_id,
        status: 'not_started',
        due_date: assignForm.due_date || null,
      })
      showToast('Worksheet assigned successfully')
    } catch {
      showToast('Demo: Worksheet assigned locally')
    }
    setShowAssignModal(false)
    setAssignForm({ client_id: '', due_date: '' })
    setSelectedWorksheet(null)
  }

  async function handleCreate() {
    const newWs = {
      id: `new-${Date.now()}`,
      title: createForm.title,
      phase: createForm.phase as Phase,
      description: createForm.description,
      fields: [],
      is_sfc_only: createForm.is_sfc_only,
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.from('worksheets').insert({
        title: createForm.title,
        phase: createForm.phase,
        description: createForm.description,
        fields: [],
        is_sfc_only: createForm.is_sfc_only,
      })
      if (error) throw error
      showToast('Worksheet created')
    } catch {
      showToast('Demo: Worksheet created locally')
    }

    setWorksheets(prev => [...prev, newWs])
    setShowCreateModal(false)
    setCreateForm({ title: '', phase: '', description: '', is_sfc_only: false })
  }

  const phases: (Phase | 'ALL')[] = ['ALL', 'CC', 'AP', 'VE', 'PM', 'SFC']

  return (
    <>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 className="serif" style={{ fontSize: 22, fontWeight: 700, color: '#1e0a4a' }}>Worksheet Library</h1>
          <p style={{ fontSize: 12, color: '#7a6090', marginTop: 4 }}>{worksheets.length} worksheets across the Finally Seen Framework</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-gold" onClick={() => setShowCreateModal(true)}>+ Create Worksheet</button>
        </div>
      </div>

      {/* Phase Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
        {phases.map(p => (
          <button
            key={p}
            className={`btn btn-sm ${activePhase === p ? 'btn-gold' : 'btn-outline'}`}
            onClick={() => setActivePhase(p)}
            style={activePhase !== p ? { color: '#5a3090', borderColor: 'rgba(90,48,144,0.3)' } : {}}
          >
            {p === 'ALL' ? 'All Phases' : `${p} - ${phaseLabels[p]}`}
          </button>
        ))}
      </div>

      {/* Worksheet Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {filtered.map(ws => (
          <div key={ws.id} className="panel" style={{ marginBottom: 0 }}>
            <div className="panel-body" style={{ padding: '20px 22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <span className={`pill ${phasePill[ws.phase]}`}>{ws.phase} - {phaseLabels[ws.phase]}</span>
                {ws.is_sfc_only && <span className="pill pill-purple" style={{ fontSize: 9 }}>SFC Only</span>}
              </div>
              <h3 className="serif" style={{ fontSize: 15, fontWeight: 700, color: '#1e0a4a', marginBottom: 6 }}>{ws.title}</h3>
              <p style={{ fontSize: 11.5, color: '#5a4070', lineHeight: 1.5, marginBottom: 12 }}>{ws.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10, color: '#8a7a9a' }}>{ws.fields.length} fields</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ color: '#5a3090', borderColor: 'rgba(90,48,144,0.3)' }}
                    onClick={() => { setSelectedWorksheet(ws.id); setShowAssignModal(true) }}
                  >
                    Assign
                  </button>
                  <button className="btn btn-gold btn-sm">Preview</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="modal-overlay" onClick={() => setShowAssignModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, color: '#1e0a4a' }}>Assign Worksheet</h3>
              <button onClick={() => setShowAssignModal(false)} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#8a7a9a' }}>x</button>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label>Worksheet</label>
              <input value={worksheets.find(w => w.id === selectedWorksheet)?.title || ''} disabled style={{ opacity: 0.7 }} />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label>Assign to Client</label>
              <select value={assignForm.client_id} onChange={e => setAssignForm(f => ({ ...f, client_id: e.target.value }))}>
                <option value="">Select client...</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label>Due Date (Optional)</label>
              <input type="date" value={assignForm.due_date} onChange={e => setAssignForm(f => ({ ...f, due_date: e.target.value }))} />
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setShowAssignModal(false)}>Cancel</button>
              <button className="btn btn-gold" onClick={handleAssign} disabled={!assignForm.client_id}>Assign</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, color: '#1e0a4a' }}>Create Worksheet</h3>
              <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#8a7a9a' }}>x</button>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label>Title</label>
              <input value={createForm.title} onChange={e => setCreateForm(f => ({ ...f, title: e.target.value }))} placeholder="Worksheet title..." />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label>Phase</label>
              <select value={createForm.phase} onChange={e => setCreateForm(f => ({ ...f, phase: e.target.value as Phase }))}>
                <option value="">Select phase...</option>
                {(['CC', 'AP', 'VE', 'PM', 'SFC'] as Phase[]).map(p => (
                  <option key={p} value={p}>{p} - {phaseLabels[p]}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label>Description</label>
              <textarea rows={3} value={createForm.description} onChange={e => setCreateForm(f => ({ ...f, description: e.target.value }))} placeholder="What does this worksheet cover?" />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, textTransform: 'none', letterSpacing: 'normal', fontSize: 12 }}>
                <input type="checkbox" checked={createForm.is_sfc_only} onChange={e => setCreateForm(f => ({ ...f, is_sfc_only: e.target.checked }))} style={{ width: 'auto' }} />
                SFC Members Only
              </label>
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button className="btn btn-gold" onClick={handleCreate} disabled={!createForm.title || !createForm.phase}>Create</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </>
  )
}
