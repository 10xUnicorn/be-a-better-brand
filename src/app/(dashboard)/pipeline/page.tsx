'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { PipelineDeal } from '@/lib/types'

/* ─── stage config ─── */
const STAGES = ['discovery', 'proposal_sent', 'negotiating', 'won'] as const
type Stage = (typeof STAGES)[number]

const COL_META: Record<Stage, { label: string; next?: Stage }> = {
  discovery:     { label: '◈ Discovery',      next: 'proposal_sent' },
  proposal_sent: { label: '✦ Proposal Sent',  next: 'negotiating' },
  negotiating:   { label: '◉ Negotiating',    next: 'won' },
  won:           { label: '✧ Won / Closing' },
}

/* ─── demo / fallback data ─── */
interface DealCard {
  id: string
  name: string
  sub: string
  val: string
  pill: string
  pillClass: string
  stage: Stage
  contact_type?: string
  offer_tier?: string
  estimated_value?: number
  monthly_value?: number
  duration_months?: number
  contact_email?: string
}

const FALLBACK_DEALS: DealCard[] = [
  { id: 'demo-1', name: 'Monica T.',  sub: 'Author — Fractional CMO interest',    val: '$8,500/mo',     pill: 'Inquiry',      pillClass: 'pill-amber',  stage: 'discovery',     contact_type: 'Author',   offer_tier: 'fractional_cmo', estimated_value: 8500, monthly_value: 8500 },
  { id: 'demo-2', name: 'Rachel P.',  sub: 'Founder — Gap Session booked',        val: '$750',          pill: 'New Lead',     pillClass: 'pill-amber',  stage: 'discovery',     contact_type: 'Founder',  offer_tier: 'gap_session',    estimated_value: 750 },
  { id: 'demo-3', name: 'Jenna W.',   sub: 'Speaker — Visibility Retainer',       val: '$5,000/mo × 6', pill: 'Reviewing',    pillClass: 'pill-purple', stage: 'proposal_sent', contact_type: 'Speaker',  offer_tier: 'retainer',       estimated_value: 30000, monthly_value: 5000, duration_months: 6 },
  { id: 'demo-4', name: 'Andrea K.',  sub: 'Author — Book Launch Sprint',         val: '$5,000/mo × 4', pill: 'Reviewing',    pillClass: 'pill-purple', stage: 'proposal_sent', contact_type: 'Author',   offer_tier: 'book_launch',    estimated_value: 20000, monthly_value: 5000, duration_months: 4 },
  { id: 'demo-5', name: 'Tamara B.',  sub: 'CEO — Fractional CMO',                val: '$7,500/mo',     pill: 'Counter Sent', pillClass: 'pill-gold',   stage: 'negotiating',   contact_type: 'CEO',      offer_tier: 'fractional_cmo', estimated_value: 7500, monthly_value: 7500 },
  { id: 'demo-6', name: 'Lisa W.',    sub: 'Author — Six Figure Chicks',          val: '$1,200/mo',     pill: 'Signed',       pillClass: 'pill-green',  stage: 'won',           contact_type: 'Author',   offer_tier: 'sfc',            estimated_value: 1200, monthly_value: 1200 },
  { id: 'demo-7', name: 'Cynthia D.', sub: 'Founder — Architecture Retainer',     val: '$5,000/mo × 6', pill: 'Contract Out', pillClass: 'pill-green',  stage: 'won',           contact_type: 'Founder',  offer_tier: 'retainer',       estimated_value: 30000, monthly_value: 5000, duration_months: 6 },
]

const KPI_FALLBACK = [
  { label: 'Total Pipeline',        value: '$112,000', trend: '▲ 4 active proposals',  color: '#5a8a5a' },
  { label: 'Avg. Deal Size',        value: '$28,000',  trend: '◆ 6-mo retainer avg',   color: '#8a7a50' },
  { label: 'Close Rate',            value: '34%',      trend: '▲ +8pts this quarter',   color: '#5a8a5a' },
  { label: 'Est. Close This Month', value: '$36,500',  trend: '▲ 2 deals near close',   color: '#5a8a5a' },
]

/* ─── helpers ─── */
const OFFER_LABELS: Record<string, string> = {
  gap_session: 'Gap Session',
  retainer: 'Visibility Retainer',
  book_launch: 'Book Launch Sprint',
  fractional_cmo: 'Fractional CMO',
  sfc: 'Six Figure Chicks',
}

const PILL_FOR_STAGE: Record<Stage, { pill: string; cls: string }> = {
  discovery: { pill: 'Inquiry', cls: 'pill-amber' },
  proposal_sent: { pill: 'Reviewing', cls: 'pill-purple' },
  negotiating: { pill: 'Counter Sent', cls: 'pill-gold' },
  won: { pill: 'Signed', cls: 'pill-green' },
}

function formatValue(d: PipelineDeal): string {
  if (d.monthly_value && d.duration_months && d.duration_months > 1) {
    return `$${d.monthly_value.toLocaleString()}/mo × ${d.duration_months}`
  }
  if (d.monthly_value) return `$${d.monthly_value.toLocaleString()}/mo`
  return `$${d.estimated_value.toLocaleString()}`
}

function dbToCard(d: PipelineDeal): DealCard {
  const stg = (d.stage === 'lost' ? 'discovery' : d.stage) as Stage
  const p = PILL_FOR_STAGE[stg]
  return {
    id: d.id,
    name: d.contact_name,
    sub: `${d.contact_type || 'Contact'} — ${OFFER_LABELS[d.offer_tier] || d.offer_tier}`,
    val: formatValue(d),
    pill: p.pill,
    pillClass: p.cls,
    stage: stg,
    contact_type: d.contact_type ?? undefined,
    offer_tier: d.offer_tier,
    estimated_value: d.estimated_value,
    monthly_value: d.monthly_value ?? undefined,
    duration_months: d.duration_months ?? undefined,
    contact_email: d.contact_email ?? undefined,
  }
}

/* ─── component ─── */
export default function PipelinePage() {
  const [deals, setDeals] = useState<DealCard[]>(FALLBACK_DEALS)
  const [kpis, setKpis] = useState(KPI_FALLBACK)
  const [showModal, setShowModal] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  /* toast auto-hide */
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  /* load from supabase */
  const fetchDeals = useCallback(async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('pipeline_deals')
        .select('*')
        .neq('stage', 'lost')
        .order('created_at', { ascending: false })

      if (error || !data || data.length === 0) return // keep fallback
      const mapped = (data as PipelineDeal[]).map(dbToCard)
      setDeals(mapped)

      /* recompute KPIs from live data */
      const totalPipeline = (data as PipelineDeal[]).reduce((s, d) => s + d.estimated_value, 0)
      const avgDeal = Math.round(totalPipeline / data.length)
      setKpis([
        { label: 'Total Pipeline',        value: `$${totalPipeline.toLocaleString()}`, trend: `▲ ${data.length} active deals`, color: '#5a8a5a' },
        { label: 'Avg. Deal Size',        value: `$${avgDeal.toLocaleString()}`,        trend: '◆ Across all stages',          color: '#8a7a50' },
        { label: 'Close Rate',            value: '34%',                                 trend: '▲ +8pts this quarter',          color: '#5a8a5a' },
        { label: 'Est. Close This Month', value: '$36,500',                             trend: '▲ 2 deals near close',          color: '#5a8a5a' },
      ])
    } catch {
      /* keep fallback */
    }
  }, [])

  useEffect(() => { fetchDeals() }, [fetchDeals])

  /* move deal to next stage */
  const moveDeal = async (id: string) => {
    const deal = deals.find((d) => d.id === id)
    if (!deal) return
    const nextStage = COL_META[deal.stage].next
    if (!nextStage) return

    const newPill = PILL_FOR_STAGE[nextStage]
    setDeals((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, stage: nextStage, pill: newPill.pill, pillClass: newPill.cls } : d
      )
    )

    /* persist to supabase if not demo */
    if (!id.startsWith('demo-')) {
      try {
        const supabase = createClient()
        await supabase.from('pipeline_deals').update({ stage: nextStage }).eq('id', id)
      } catch { /* fail silently for demo */ }
    }
    setToast({ msg: `${deal.name} moved to ${COL_META[nextStage].label.replace(/^[^\s]+\s/, '')}`, type: 'success' })
  }

  /* group deals by stage */
  const grouped: Record<Stage, DealCard[]> = { discovery: [], proposal_sent: [], negotiating: [], won: [] }
  deals.forEach((d) => { grouped[d.stage].push(d) })

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

      {/* ── Kanban Board ── */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">Deal Pipeline — Finally Seen Journey</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="pill pill-gold">Kanban View</span>
            <button className="btn btn-gold btn-sm" onClick={() => setShowModal(true)}>
              + Add Deal
            </button>
          </div>
        </div>
        <div className="panel-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {STAGES.map((stageKey) => (
              <div className="k-col" key={stageKey}>
                {/* column header */}
                <div
                  className="serif"
                  style={{
                    fontSize: '9.5px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.8px',
                    color: '#5a3090',
                    fontWeight: 700,
                    marginBottom: 10,
                    paddingBottom: 8,
                    borderBottom: '2px solid #c9a84c',
                  }}
                >
                  {COL_META[stageKey].label}
                  <span style={{ float: 'right', color: '#7a6090', fontWeight: 400 }}>
                    {grouped[stageKey].length}
                  </span>
                </div>

                {/* cards */}
                {grouped[stageKey].map((card) => (
                  <div className="k-card" key={card.id}>
                    <div className="serif" style={{ fontSize: 12, fontWeight: 700, color: '#1e0a4a', marginBottom: 3 }}>
                      {card.name}
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#7a6090', fontStyle: 'italic' }}>
                      {card.sub}
                    </div>
                    <div className="serif" style={{ fontSize: 11, color: '#c9a84c', fontWeight: 700, marginTop: 5 }}>
                      {card.val}
                    </div>
                    <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className={`pill ${card.pillClass}`}>{card.pill}</span>
                      {COL_META[card.stage].next && (
                        <button
                          onClick={() => moveDeal(card.id)}
                          style={{
                            background: 'none',
                            border: '1px solid rgba(240,195,112,0.4)',
                            borderRadius: 6,
                            padding: '2px 8px',
                            fontSize: '9px',
                            color: '#c9a84c',
                            cursor: 'pointer',
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                          }}
                          title={`Move to ${COL_META[COL_META[card.stage].next!].label}`}
                        >
                          Move →
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {grouped[stageKey].length === 0 && (
                  <div style={{ textAlign: 'center', padding: '20px 0', fontSize: '11px', color: '#7a6090', fontStyle: 'italic' }}>
                    No deals
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Add Deal Modal ── */}
      {showModal && <AddDealModal onClose={() => setShowModal(false)} onSaved={(card) => { setDeals((prev) => [card, ...prev]); setToast({ msg: `${card.name} added to pipeline`, type: 'success' }) }} />}

      {/* ── Toast ── */}
      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </>
  )
}

/* ────────────────────── Add Deal Modal ────────────────────── */
function AddDealModal({ onClose, onSaved }: { onClose: () => void; onSaved: (card: DealCard) => void }) {
  const [form, setForm] = useState({
    contact_name: '',
    contact_email: '',
    contact_type: '',
    offer_tier: 'retainer',
    estimated_value: '',
    monthly_value: '',
    duration_months: '',
    stage: 'discovery' as Stage,
    notes: '',
  })
  const [saving, setSaving] = useState(false)

  const set = (field: string, val: string) => setForm((p) => ({ ...p, [field]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.contact_name.trim()) return
    setSaving(true)

    const estVal = Number(form.estimated_value) || Number(form.monthly_value) * (Number(form.duration_months) || 1) || 0
    const monthlyVal = Number(form.monthly_value) || undefined
    const durMonths = Number(form.duration_months) || undefined

    /* try supabase first */
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('pipeline_deals')
        .insert({
          contact_name: form.contact_name,
          contact_email: form.contact_email || null,
          contact_type: form.contact_type || null,
          offer_tier: form.offer_tier,
          estimated_value: estVal,
          monthly_value: monthlyVal ?? null,
          duration_months: durMonths ?? null,
          stage: form.stage,
          notes: form.notes || null,
        })
        .select()
        .single()

      if (!error && data) {
        onSaved(dbToCard(data as PipelineDeal))
        onClose()
        return
      }
    } catch { /* fall through to local add */ }

    /* local-only fallback */
    const pill = PILL_FOR_STAGE[form.stage]
    const valStr = monthlyVal
      ? durMonths && durMonths > 1
        ? `$${monthlyVal.toLocaleString()}/mo × ${durMonths}`
        : `$${monthlyVal.toLocaleString()}/mo`
      : `$${estVal.toLocaleString()}`

    onSaved({
      id: `local-${Date.now()}`,
      name: form.contact_name,
      sub: `${form.contact_type || 'Contact'} — ${OFFER_LABELS[form.offer_tier] || form.offer_tier}`,
      val: valStr,
      pill: pill.pill,
      pillClass: pill.cls,
      stage: form.stage,
      contact_type: form.contact_type || undefined,
      offer_tier: form.offer_tier,
      estimated_value: estVal,
      monthly_value: monthlyVal,
      duration_months: durMonths,
      contact_email: form.contact_email || undefined,
    })
    setSaving(false)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: '#1e0a4a' }}>Add New Deal</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#7a6090' }}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label>Contact Name *</label>
              <input value={form.contact_name} onChange={(e) => set('contact_name', e.target.value)} placeholder="e.g. Sarah M." required />
            </div>
            <div>
              <label>Email</label>
              <input type="email" value={form.contact_email} onChange={(e) => set('contact_email', e.target.value)} placeholder="sarah@example.com" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label>Contact Type</label>
              <input value={form.contact_type} onChange={(e) => set('contact_type', e.target.value)} placeholder="Author, Founder, Speaker..." />
            </div>
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
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label>Monthly Value</label>
              <input type="number" value={form.monthly_value} onChange={(e) => set('monthly_value', e.target.value)} placeholder="5000" />
            </div>
            <div>
              <label>Duration (Months)</label>
              <input type="number" value={form.duration_months} onChange={(e) => set('duration_months', e.target.value)} placeholder="6" />
            </div>
            <div>
              <label>Total Est. Value</label>
              <input type="number" value={form.estimated_value} onChange={(e) => set('estimated_value', e.target.value)} placeholder="30000" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label>Stage</label>
              <select value={form.stage} onChange={(e) => set('stage', e.target.value)}>
                <option value="discovery">Discovery</option>
                <option value="proposal_sent">Proposal Sent</option>
                <option value="negotiating">Negotiating</option>
                <option value="won">Won / Closing</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <label>Notes</label>
            <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={3} placeholder="Any additional notes..." />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-gold" disabled={saving}>
              {saving ? 'Saving...' : 'Add Deal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
