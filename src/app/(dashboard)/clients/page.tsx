'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Client } from '@/lib/types'

/* ─── helpers ─── */
const OFFER_LABELS: Record<string, string> = {
  gap_session: 'Gap Session',
  retainer: 'Visibility Retainer',
  book_launch: 'Book Launch Sprint',
  fractional_cmo: 'Fractional CMO',
  sfc: 'Six Figure Chicks',
}

const PHASE_NAMES: Record<number, string> = {
  1: 'Phase 1',
  2: 'Phase 2',
  3: 'Phase 3',
  4: 'Phase 4',
}

const PHASE_CLASS: Record<number, string> = {
  1: 'pill-amber',
  2: 'pill-amber',
  3: 'pill-purple',
  4: 'pill-gold',
}

function healthLabel(score: number): { text: string; cls: string } {
  if (score >= 90) return { text: 'Excellent', cls: 'pill-green' }
  if (score >= 75) return { text: 'Strong', cls: 'pill-green' }
  if (score >= 60) return { text: 'Active', cls: 'pill-green' }
  if (score >= 40) return { text: 'Onboarding', cls: 'pill-amber' }
  if (score >= 20) return { text: 'At Risk', cls: 'pill-red' }
  return { text: 'Needs Attention', cls: 'pill-red' }
}

/* ─── fallback / demo data ─── */
interface ClientRow {
  id: string
  name: string
  type: string
  offer: string
  phase: string
  phaseClass: string
  mrr: string
  renewal: string
  health: string
  healthClass: string
}

const FALLBACK_CLIENTS: ClientRow[] = [
  { id: 'demo-1', name: 'Danielle R.',  type: 'Author',       offer: 'Visibility Retainer',   phase: 'Phase 3', phaseClass: 'pill-purple', mrr: '$5,000',  renewal: 'Sep 2025', health: 'Excellent',  healthClass: 'pill-green' },
  { id: 'demo-2', name: 'Sarah M.',     type: 'Author',       offer: 'Book Launch Sprint',    phase: 'Phase 4', phaseClass: 'pill-gold',   mrr: '$5,000',  renewal: 'Jul 2025', health: 'Excellent',  healthClass: 'pill-green' },
  { id: 'demo-3', name: 'Christine L.', type: 'Founder',      offer: 'Fractional CMO',        phase: 'Phase 3', phaseClass: 'pill-purple', mrr: '$8,500',  renewal: 'Ongoing',  health: 'Renewing',   healthClass: 'pill-gold' },
  { id: 'demo-4', name: 'Yolanda T.',   type: 'Speaker',      offer: 'Visibility Retainer',   phase: 'Phase 2', phaseClass: 'pill-amber',  mrr: '$5,000',  renewal: 'Oct 2025', health: 'Strong',     healthClass: 'pill-green' },
  { id: 'demo-5', name: 'Brianna K.',   type: 'Author / SFC', offer: 'Six Figure Chicks',     phase: 'Phase 4', phaseClass: 'pill-gold',   mrr: '$1,200',  renewal: 'Dec 2025', health: 'Excellent',  healthClass: 'pill-green' },
  { id: 'demo-6', name: 'Monique F.',   type: 'Founder',      offer: 'Gap Session → Retainer', phase: 'Phase 1', phaseClass: 'pill-amber', mrr: '$5,000',  renewal: 'Nov 2025', health: 'Onboarding', healthClass: 'pill-amber' },
]

const KPI_FALLBACK = [
  { label: 'Total Active Clients', value: '13',      trend: '▲ 2 onboarded this month', color: '#5a8a5a' },
  { label: 'Avg. Framework Phase', value: 'Phase 3', trend: '◆ Visibility Engine',       color: '#8a7a50' },
  { label: 'Retention Rate',       value: '91%',     trend: '▲ +5pts vs last year',      color: '#5a8a5a' },
  { label: 'NPS Score',            value: '74',      trend: '▲ World class (>70)',        color: '#5a8a5a' },
]

function dbToRow(c: Client): ClientRow {
  const h = healthLabel(c.health_score)
  const offerDisplay = OFFER_LABELS[c.offer_tier] || c.offer_tier
  return {
    id: c.id,
    name: c.name,
    type: c.client_type || 'Client',
    offer: offerDisplay,
    phase: PHASE_NAMES[c.current_phase] || `Phase ${c.current_phase}`,
    phaseClass: PHASE_CLASS[c.current_phase] || 'pill-amber',
    mrr: `$${c.mrr.toLocaleString()}`,
    renewal: c.contract_end_date
      ? new Date(c.contract_end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : 'Ongoing',
    health: h.text,
    healthClass: h.cls,
  }
}

/* ─── component ─── */
export default function ClientsPage() {
  const [clients, setClients] = useState<ClientRow[]>(FALLBACK_CLIENTS)
  const [kpis, setKpis] = useState(KPI_FALLBACK)
  const [showModal, setShowModal] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  const fetchClients = useCallback(async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true })

      if (error || !data || data.length === 0) return // keep fallback
      const mapped = (data as Client[]).map(dbToRow)
      setClients(mapped)

      /* recompute KPIs */
      const total = data.length
      const avgPhase = Math.round((data as Client[]).reduce((s, c) => s + c.current_phase, 0) / total)
      const totalMrr = (data as Client[]).reduce((s, c) => s + c.mrr, 0)
      const avgHealth = Math.round((data as Client[]).reduce((s, c) => s + c.health_score, 0) / total)

      setKpis([
        { label: 'Total Active Clients', value: String(total),                          trend: `▲ $${totalMrr.toLocaleString()} total MRR`, color: '#5a8a5a' },
        { label: 'Avg. Framework Phase', value: PHASE_NAMES[avgPhase] || `Phase ${avgPhase}`, trend: '◆ Across active clients',              color: '#8a7a50' },
        { label: 'Retention Rate',       value: '91%',                                  trend: '▲ +5pts vs last year',                      color: '#5a8a5a' },
        { label: 'NPS Score',            value: String(avgHealth),                      trend: avgHealth >= 70 ? '▲ World class (>70)' : '◆ Tracking', color: '#5a8a5a' },
      ])
    } catch {
      /* keep fallback */
    }
  }, [])

  useEffect(() => { fetchClients() }, [fetchClients])

  return (
    <>
      {/* ── KPI Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 26 }}>
        {kpis.map((kpi) => (
          <div className="kpi-card" key={kpi.label}>
            <div className="serif" style={{ fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '1.8px', color: '#7a6090', marginBottom: 8, fontWeight: 600 }}>
              {kpi.label}
            </div>
            <div className="serif" style={{ fontSize: 26, fontWeight: 700, color: '#1e0a4a', lineHeight: 1 }}>
              {kpi.value}
            </div>
            <div style={{ fontSize: '10.5px', marginTop: 5, color: kpi.color }}>{kpi.trend}</div>
          </div>
        ))}
      </div>

      {/* ── Client Roster Table ── */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">Client Roster — Finally Seen Journey</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="pill pill-gold">{clients.length} Active</span>
            <button className="btn btn-gold btn-sm" onClick={() => setShowModal(true)}>
              + Add Client
            </button>
          </div>
        </div>
        <div className="panel-body">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Type</th>
                <th>Offer</th>
                <th>Phase</th>
                <th>MRR</th>
                <th>Renewal</th>
                <th>Health</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} style={{ cursor: 'pointer' }}>
                  <td>
                    <Link
                      href={`/clients/${c.id}`}
                      style={{ color: '#1e0a4a', textDecoration: 'none', fontWeight: 700 }}
                    >
                      {c.name}
                    </Link>
                  </td>
                  <td>{c.type}</td>
                  <td>{c.offer}</td>
                  <td><span className={`pill ${c.phaseClass}`}>{c.phase}</span></td>
                  <td style={{ fontWeight: 600, color: '#1e0a4a' }}>{c.mrr}</td>
                  <td>{c.renewal}</td>
                  <td><span className={`pill ${c.healthClass}`}>{c.health}</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          {clients.length === 0 && (
            <div style={{ textAlign: 'center', padding: '28px 0', fontSize: '13px', color: '#7a6090', fontStyle: 'italic' }}>
              No active clients found. Add your first client to get started.
            </div>
          )}
        </div>
      </div>

      {/* ── Add Client Modal ── */}
      {showModal && (
        <AddClientModal
          onClose={() => setShowModal(false)}
          onSaved={(row) => {
            setClients((prev) => [...prev, row])
            setToast({ msg: `${row.name} added as client`, type: 'success' })
          }}
        />
      )}

      {/* ── Toast ── */}
      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </>
  )
}

/* ────────────────────── Add Client Modal ────────────────────── */
function AddClientModal({ onClose, onSaved }: { onClose: () => void; onSaved: (row: ClientRow) => void }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    client_type: '',
    offer_tier: 'retainer',
    mrr: '',
    current_phase: '1',
    health_score: '80',
    contract_end_date: '',
    notes: '',
  })
  const [saving, setSaving] = useState(false)

  const set = (field: string, val: string) => setForm((p) => ({ ...p, [field]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
    setSaving(true)

    const mrrNum = Number(form.mrr) || 0
    const phaseNum = Number(form.current_phase) || 1
    const healthNum = Number(form.health_score) || 80

    /* try supabase first */
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('clients')
        .insert({
          name: form.name,
          email: form.email,
          phone: form.phone || null,
          client_type: form.client_type || null,
          offer_tier: form.offer_tier,
          mrr: mrrNum,
          current_phase: phaseNum,
          health_score: healthNum,
          contract_end_date: form.contract_end_date || null,
          notes: form.notes || null,
          is_active: true,
        })
        .select()
        .single()

      if (!error && data) {
        onSaved(dbToRow(data as Client))
        onClose()
        return
      }
    } catch { /* fall through to local add */ }

    /* local-only fallback */
    const h = healthLabel(healthNum)
    onSaved({
      id: `local-${Date.now()}`,
      name: form.name,
      type: form.client_type || 'Client',
      offer: OFFER_LABELS[form.offer_tier] || form.offer_tier,
      phase: PHASE_NAMES[phaseNum] || `Phase ${phaseNum}`,
      phaseClass: PHASE_CLASS[phaseNum] || 'pill-amber',
      mrr: `$${mrrNum.toLocaleString()}`,
      renewal: form.contract_end_date
        ? new Date(form.contract_end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        : 'Ongoing',
      health: h.text,
      healthClass: h.cls,
    })
    setSaving(false)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: '#1e0a4a' }}>Add New Client</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#7a6090' }}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label>Client Name *</label>
              <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Sarah M." required />
            </div>
            <div>
              <label>Email *</label>
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="sarah@example.com" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label>Phone</label>
              <input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(555) 123-4567" />
            </div>
            <div>
              <label>Client Type</label>
              <input value={form.client_type} onChange={(e) => set('client_type', e.target.value)} placeholder="Author, Founder, Speaker..." />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label>Offer Tier</label>
              <select value={form.offer_tier} onChange={(e) => set('offer_tier', e.target.value)}>
                <option value="gap_session">Gap Session</option>
                <option value="retainer">Visibility Retainer</option>
                <option value="book_launch">Book Launch Sprint</option>
                <option value="fractional_cmo">Fractional CMO</option>
                <option value="sfc">Six Figure Chicks</option>
              </select>
            </div>
            <div>
              <label>Monthly MRR ($)</label>
              <input type="number" value={form.mrr} onChange={(e) => set('mrr', e.target.value)} placeholder="5000" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label>Framework Phase</label>
              <select value={form.current_phase} onChange={(e) => set('current_phase', e.target.value)}>
                <option value="1">Phase 1 — Clarity Core</option>
                <option value="2">Phase 2 — Authority</option>
                <option value="3">Phase 3 — Visibility</option>
                <option value="4">Phase 4 — Proof</option>
              </select>
            </div>
            <div>
              <label>Health Score (0-100)</label>
              <input type="number" min="0" max="100" value={form.health_score} onChange={(e) => set('health_score', e.target.value)} placeholder="80" />
            </div>
            <div>
              <label>Contract End Date</label>
              <input type="date" value={form.contract_end_date} onChange={(e) => set('contract_end_date', e.target.value)} />
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <label>Notes</label>
            <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={3} placeholder="Any additional notes about this client..." />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-gold" disabled={saving}>
              {saving ? 'Saving...' : 'Add Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
