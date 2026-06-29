"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// ─── Types ───────────────────────────────────────────────────────────────────

interface OfferTemplate {
  id: string;
  name: string;
  offer_type: string;
  price: number;
  price_type: string;
  duration_months: number;
  description?: string;
  deliverables?: string[];
  proposal_template?: string;
}

interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

interface PipelineDeal {
  id: string;
  contact_name: string;
  contact_email?: string;
  contact_company?: string;
  contact_type?: string;
  offer_tier?: string;
  offer_template_id?: string;
  estimated_value?: number;
  monthly_value?: number;
  duration_months?: number;
  stage: "discovery" | "proposal_sent" | "negotiating" | "won" | "lost";
  assigned_team_member_id?: string;
  next_follow_up?: string;
  lost_reason?: string;
  notes?: string;
  deal_value?: number;
  probability?: number;
  expected_close_date?: string;
  source?: string;
  created_at: string;
  updated_at: string;
  offer_templates?: OfferTemplate | null;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ACTIVE_STAGES = ["discovery", "proposal_sent", "negotiating", "won"] as const;
type ActiveStage = typeof ACTIVE_STAGES[number];

const STAGE_META: Record<string, { label: string; icon: string; pillClass: string }> = {
  discovery:     { label: "Discovery",     icon: "◈", pillClass: "pill-purple" },
  proposal_sent: { label: "Proposal Sent", icon: "✦", pillClass: "pill-amber"  },
  negotiating:   { label: "Negotiating",   icon: "◉", pillClass: "pill-gold"   },
  won:           { label: "Won / Closing", icon: "✧", pillClass: "pill-green"  },
  lost:          { label: "Lost",          icon: "✕", pillClass: "pill-red"    },
};

const STAGE_ORDER: PipelineDeal["stage"][] = [
  "discovery", "proposal_sent", "negotiating", "won",
];

const SOURCE_OPTIONS = [
  { value: "referral",  label: "Referral"  },
  { value: "inbound",   label: "Inbound"   },
  { value: "outbound",  label: "Outbound"  },
  { value: "podcast",   label: "Podcast"   },
  { value: "social",    label: "Social"    },
  { value: "event",     label: "Event"     },
];

const CONTACT_TYPES = ["Author", "Founder", "Speaker", "CEO", "Coach", "Consultant"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n?: number | null) {
  if (!n && n !== 0) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function fmtDate(d?: string | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function nextStage(current: PipelineDeal["stage"]): PipelineDeal["stage"] | null {
  const idx = STAGE_ORDER.indexOf(current as ActiveStage);
  if (idx === -1 || idx >= STAGE_ORDER.length - 1) return null;
  return STAGE_ORDER[idx + 1];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function KpiCards({ deals }: { deals: PipelineDeal[] }) {
  const active = deals.filter((d) => d.stage !== "lost");
  const won = deals.filter((d) => d.stage === "won");
  const closeRate = deals.length > 0 ? Math.round((won.length / deals.length) * 100) : 0;
  const totalPipeline = active.reduce((s, d) => s + (d.deal_value ?? d.estimated_value ?? 0), 0);

  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const closeThisMonth = active
    .filter((d) => {
      if (!d.expected_close_date) return false;
      const cd = new Date(d.expected_close_date);
      return cd >= now && cd <= endOfMonth;
    })
    .reduce((s, d) => s + (d.deal_value ?? d.estimated_value ?? 0), 0);

  const kpis = [
    { label: "Total Pipeline",        value: fmt(totalPipeline),    trend: `${active.length} active deals`,      color: "#5a8a5a" },
    { label: "Active Deals",          value: String(active.length), trend: `${won.length} won this period`,     color: "#8a7a50" },
    { label: "Close Rate",            value: `${closeRate}%`,       trend: "Won ÷ total deals",                  color: "#5a8a5a" },
    { label: "Est. Close This Month", value: fmt(closeThisMonth),   trend: "By expected close date",            color: "#5a8a5a" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 26 }}>
      {kpis.map((kpi) => (
        <div className="kpi-card" key={kpi.label}>
          <div className="serif" style={{ fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "1.8px", color: "#7a6090", marginBottom: 8, fontWeight: 600 }}>
            {kpi.label}
          </div>
          <div className="serif" style={{ fontSize: 26, fontWeight: 700, color: "#1e0a4a", lineHeight: 1 }}>
            {kpi.value}
          </div>
          <div style={{ fontSize: "10.5px", marginTop: 5, color: kpi.color }}>{kpi.trend}</div>
        </div>
      ))}
    </div>
  );
}

function DealCard({
  deal,
  onMoveNext,
  onClick,
}: {
  deal: PipelineDeal;
  onMoveNext: (id: string) => void;
  onClick: (id: string) => void;
}) {
  const meta = STAGE_META[deal.stage];
  const ns = nextStage(deal.stage);
  const value = deal.deal_value ?? deal.estimated_value;
  const offerName = deal.offer_templates?.name ?? deal.offer_tier ?? "—";

  return (
    <div
      className="k-card"
      onClick={() => onClick(deal.id)}
      style={{ position: "relative" }}
    >
      <div className="serif" style={{ fontSize: 13, fontWeight: 700, color: "#1e0a4a", marginBottom: 2 }}>
        {deal.contact_name}
      </div>
      {deal.contact_company && (
        <div style={{ fontSize: "10.5px", color: "#7a6090", marginBottom: 2 }}>{deal.contact_company}</div>
      )}
      <div style={{ fontSize: "10.5px", color: "#7a6090", fontStyle: "italic", marginBottom: 4 }}>
        {offerName}
      </div>
      <div className="serif" style={{ fontSize: 13, color: "#c9a84c", fontWeight: 700 }}>
        {fmt(value)}
        {deal.probability != null && (
          <span style={{ fontSize: 10, color: "#8a7a9a", fontWeight: 400, marginLeft: 6 }}>
            {deal.probability}%
          </span>
        )}
      </div>
      <div style={{ marginTop: 6, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className={`pill ${meta.pillClass}`}>{meta.label}</span>
        {deal.next_follow_up && (
          <span style={{ fontSize: 10, color: "#7a6090" }}>↻ {fmtDate(deal.next_follow_up)}</span>
        )}
      </div>
      {ns && (
        <button
          className="btn btn-outline btn-sm"
          style={{ marginTop: 8, width: "100%", fontSize: 10, padding: "5px 10px" }}
          onClick={(e) => { e.stopPropagation(); onMoveNext(deal.id); }}
        >
          → Move to {STAGE_META[ns].label}
        </button>
      )}
    </div>
  );
}

// ─── Add Deal Modal ───────────────────────────────────────────────────────────

interface AddDealForm {
  contact_name: string;
  contact_email: string;
  contact_company: string;
  contact_type: string;
  offer_template_id: string;
  estimated_value: string;
  monthly_value: string;
  duration_months: string;
  deal_value: string;
  stage: PipelineDeal["stage"];
  probability: number;
  expected_close_date: string;
  source: string;
  assigned_team_member_id: string;
  notes: string;
}

const EMPTY_FORM: AddDealForm = {
  contact_name: "",
  contact_email: "",
  contact_company: "",
  contact_type: "",
  offer_template_id: "",
  estimated_value: "",
  monthly_value: "",
  duration_months: "",
  deal_value: "",
  stage: "discovery",
  probability: 20,
  expected_close_date: "",
  source: "",
  assigned_team_member_id: "",
  notes: "",
};

function AddDealModal({
  onClose,
  onSaved,
  offerTemplates,
  teamMembers,
}: {
  onClose: () => void;
  onSaved: () => void;
  offerTemplates: OfferTemplate[];
  teamMembers: Profile[];
}) {
  const [form, setForm] = useState<AddDealForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(field: keyof AddDealForm, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleOfferChange(templateId: string) {
    set("offer_template_id", templateId);
    const tmpl = offerTemplates.find((t) => t.id === templateId);
    if (tmpl) {
      set("estimated_value", String(tmpl.price));
      set("monthly_value", tmpl.price_type === "monthly" ? String(tmpl.price) : "");
      set("duration_months", String(tmpl.duration_months ?? ""));
      set("deal_value", String(
        tmpl.price_type === "monthly"
          ? tmpl.price * (tmpl.duration_months ?? 1)
          : tmpl.price
      ));
    }
  }

  async function handleSave() {
    if (!form.contact_name.trim()) { setError("Contact name is required."); return; }
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const payload: Record<string, unknown> = {
      contact_name: form.contact_name.trim(),
      contact_email: form.contact_email.trim() || null,
      contact_company: form.contact_company.trim() || null,
      contact_type: form.contact_type || null,
      offer_template_id: form.offer_template_id || null,
      estimated_value: form.estimated_value ? Number(form.estimated_value) : null,
      monthly_value: form.monthly_value ? Number(form.monthly_value) : null,
      duration_months: form.duration_months ? Number(form.duration_months) : null,
      deal_value: form.deal_value ? Number(form.deal_value) : null,
      stage: form.stage,
      probability: form.probability,
      expected_close_date: form.expected_close_date || null,
      source: form.source || null,
      assigned_team_member_id: form.assigned_team_member_id || null,
      notes: form.notes.trim() || null,
    };
    const { error: err } = await supabase.from("pipeline_deals").insert([payload]);
    setSaving(false);
    if (err) { setError(err.message); return; }
    onSaved();
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
        <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1e0a4a", marginBottom: 24 }}>
          Add New Deal
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <label>Contact Name *</label>
            <input
              placeholder="Full name"
              value={form.contact_name}
              onChange={(e) => set("contact_name", e.target.value)}
            />
          </div>
          <div>
            <label>Contact Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={form.contact_email}
              onChange={(e) => set("contact_email", e.target.value)}
            />
          </div>
          <div>
            <label>Company</label>
            <input
              placeholder="Company name"
              value={form.contact_company}
              onChange={(e) => set("contact_company", e.target.value)}
            />
          </div>
          <div>
            <label>Contact Type</label>
            <select value={form.contact_type} onChange={(e) => set("contact_type", e.target.value)}>
              <option value="">Select type...</option>
              {CONTACT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <label>Offer Template</label>
          <select value={form.offer_template_id} onChange={(e) => handleOfferChange(e.target.value)}>
            <option value="">Select offer template...</option>
            {offerTemplates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} — {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(t.price)}{t.price_type === "monthly" ? "/mo" : ""}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 14 }}>
          <div>
            <label>Estimated Value ($)</label>
            <input
              type="number"
              placeholder="0"
              value={form.estimated_value}
              onChange={(e) => set("estimated_value", e.target.value)}
            />
          </div>
          <div>
            <label>Monthly Value ($)</label>
            <input
              type="number"
              placeholder="0"
              value={form.monthly_value}
              onChange={(e) => set("monthly_value", e.target.value)}
            />
          </div>
          <div>
            <label>Duration (months)</label>
            <input
              type="number"
              placeholder="0"
              value={form.duration_months}
              onChange={(e) => set("duration_months", e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}>
          <div>
            <label>Deal Value ($)</label>
            <input
              type="number"
              placeholder="0"
              value={form.deal_value}
              onChange={(e) => set("deal_value", e.target.value)}
            />
          </div>
          <div>
            <label>Stage</label>
            <select value={form.stage} onChange={(e) => set("stage", e.target.value as PipelineDeal["stage"])}>
              {STAGE_ORDER.map((s) => (
                <option key={s} value={s}>{STAGE_META[s].label}</option>
              ))}
              <option value="lost">Lost</option>
            </select>
          </div>
          <div>
            <label>Probability: {form.probability}%</label>
            <input
              type="range"
              min={0}
              max={100}
              value={form.probability}
              onChange={(e) => set("probability", Number(e.target.value))}
              style={{ padding: 0, border: "none", background: "transparent", cursor: "pointer" }}
            />
          </div>
          <div>
            <label>Expected Close Date</label>
            <input
              type="date"
              value={form.expected_close_date}
              onChange={(e) => set("expected_close_date", e.target.value)}
            />
          </div>
          <div>
            <label>Source</label>
            <select value={form.source} onChange={(e) => set("source", e.target.value)}>
              <option value="">Select source...</option>
              {SOURCE_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label>Assigned Team Member</label>
            <select value={form.assigned_team_member_id} onChange={(e) => set("assigned_team_member_id", e.target.value)}>
              <option value="">Unassigned</option>
              {teamMembers.map((m) => <option key={m.id} value={m.id}>{m.full_name}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <label>Notes</label>
          <textarea
            rows={3}
            placeholder="Internal notes about this deal..."
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </div>

        {error && (
          <div className="toast toast-error" style={{ position: "relative", bottom: "auto", right: "auto", marginTop: 12 }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 22 }}>
          <button className="btn btn-outline" onClick={onClose} disabled={saving}>Cancel</button>
          <button className="btn btn-gold" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save Deal"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Offer Templates Panel ────────────────────────────────────────────────────

function OfferTemplatesPanel({
  templates,
  onRefresh,
}: {
  templates: OfferTemplate[];
  onRefresh: () => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<OfferTemplate>>({});
  const [saving, setSaving] = useState(false);

  function startEdit(t: OfferTemplate) {
    setEditingId(t.id);
    setEditForm({ name: t.name, price: t.price, price_type: t.price_type, duration_months: t.duration_months, description: t.description ?? "" });
  }

  async function saveEdit() {
    if (!editingId) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.from("offer_templates").update(editForm).eq("id", editingId);
    setSaving(false);
    setEditingId(null);
    onRefresh();
  }

  return (
    <div className="panel" style={{ marginTop: 22 }}>
      <div className="panel-head">
        <span className="panel-title">Offer Templates</span>
        <span className="pill pill-purple">{templates.length} templates</span>
      </div>
      <div className="panel-body" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {templates.map((t) =>
              editingId === t.id ? (
                <tr key={t.id}>
                  <td><input value={editForm.name ?? ""} onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))} style={{ fontSize: 13 }} /></td>
                  <td>{t.offer_type}</td>
                  <td><input type="number" value={editForm.price ?? 0} onChange={(e) => setEditForm((p) => ({ ...p, price: Number(e.target.value) }))} style={{ fontSize: 13 }} /></td>
                  <td><input type="number" value={editForm.duration_months ?? 0} onChange={(e) => setEditForm((p) => ({ ...p, duration_months: Number(e.target.value) }))} style={{ fontSize: 13 }} /></td>
                  <td><input value={editForm.description ?? ""} onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))} style={{ fontSize: 13 }} /></td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-gold btn-sm" onClick={saveEdit} disabled={saving}>{saving ? "…" : "Save"}</button>
                      <button className="btn btn-outline btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={t.id}>
                  <td style={{ fontWeight: 600 }}>{t.name}</td>
                  <td><span className="pill pill-purple" style={{ fontSize: 10 }}>{t.offer_type}</span></td>
                  <td style={{ color: "#c9a84c", fontWeight: 700 }}>
                    {fmt(t.price)}{t.price_type === "monthly" ? "/mo" : ""}
                  </td>
                  <td>{t.duration_months ? `${t.duration_months} mo` : "—"}</td>
                  <td style={{ fontSize: 12, color: "#7a6090", maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.description ?? "—"}</td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => startEdit(t)}>Edit</button>
                  </td>
                </tr>
              )
            )}
            {templates.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: "center", color: "#8a7a9a", padding: 24 }}>No offer templates found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PipelinePage() {
  const router = useRouter();
  const [deals, setDeals] = useState<PipelineDeal[]>([]);
  const [offerTemplates, setOfferTemplates] = useState<OfferTemplate[]>([]);
  const [teamMembers, setTeamMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [lostExpanded, setLostExpanded] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [activeTab, setActiveTab] = useState<"kanban" | "templates">("kanban");

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  const fetchData = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const [dealsRes, templatesRes, profilesRes] = await Promise.all([
      supabase
        .from("pipeline_deals")
        .select("*, offer_templates(id, name, offer_type, price, price_type, duration_months, description)")
        .order("created_at", { ascending: false }),
      supabase.from("offer_templates").select("*").order("name"),
      supabase.from("profiles").select("id, full_name, email, role"),
    ]);
    if (dealsRes.data) setDeals(dealsRes.data as PipelineDeal[]);
    if (templatesRes.data) setOfferTemplates(templatesRes.data as OfferTemplate[]);
    if (profilesRes.data) setTeamMembers(profilesRes.data as Profile[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleMoveNext(dealId: string) {
    const deal = deals.find((d) => d.id === dealId);
    if (!deal) return;
    const ns = nextStage(deal.stage);
    if (!ns) return;
    const supabase = createClient();
    const { error } = await supabase
      .from("pipeline_deals")
      .update({ stage: ns, updated_at: new Date().toISOString() })
      .eq("id", dealId);
    if (error) { showToast("Failed to update stage.", "error"); return; }
    setDeals((prev) => prev.map((d) => d.id === dealId ? { ...d, stage: ns } : d));
    showToast(`Moved to ${STAGE_META[ns].label}`);
  }

  const dealsByStage = (stage: string) => deals.filter((d) => d.stage === stage);

  return (
    <>
      <KpiCards deals={deals} />

      {/* Tab Nav */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, alignItems: "center" }}>
        <button
          onClick={() => setActiveTab("kanban")}
          className="serif"
          style={{
            padding: "8px 18px", fontSize: 13, fontWeight: activeTab === "kanban" ? 700 : 400,
            color: activeTab === "kanban" ? "#c9a84c" : "#7a6090", background: "transparent",
            border: "none", borderBottom: activeTab === "kanban" ? "2px solid #c9a84c" : "2px solid transparent",
            cursor: "pointer",
          }}
        >
          Kanban Board
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className="serif"
          style={{
            padding: "8px 18px", fontSize: 13, fontWeight: activeTab === "templates" ? 700 : 400,
            color: activeTab === "templates" ? "#c9a84c" : "#7a6090", background: "transparent",
            border: "none", borderBottom: activeTab === "templates" ? "2px solid #c9a84c" : "2px solid transparent",
            cursor: "pointer",
          }}
        >
          Offer Templates
        </button>
        <div style={{ flex: 1 }} />
        <button className="btn btn-gold btn-sm" onClick={() => setShowAdd(true)}>+ Add Deal</button>
      </div>

      {activeTab === "kanban" && (
        <>
          {/* Kanban Board */}
          <div className="panel">
            <div className="panel-head">
              <span className="panel-title">Deal Pipeline</span>
              <span className="pill pill-gold">
                {loading ? "Loading…" : `${deals.filter((d) => d.stage !== "lost").length} Active`}
              </span>
            </div>
            <div className="panel-body">
              {loading ? (
                <div style={{ textAlign: "center", padding: 40, color: "#8a7a9a" }}>Loading deals…</div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                  {ACTIVE_STAGES.map((stage) => {
                    const stageDeals = dealsByStage(stage);
                    const meta = STAGE_META[stage];
                    return (
                      <div className="k-col" key={stage}>
                        <div
                          className="serif"
                          style={{
                            fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "1.8px",
                            color: "#5a3090", fontWeight: 700, marginBottom: 10, paddingBottom: 8,
                            borderBottom: "2px solid rgba(240,195,112,0.3)",
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                          }}
                        >
                          <span>{meta.icon} {meta.label}</span>
                          <span style={{ background: "rgba(240,195,112,0.2)", borderRadius: 10, padding: "2px 8px", fontSize: 10 }}>
                            {stageDeals.length}
                          </span>
                        </div>
                        {stageDeals.length === 0 && (
                          <div style={{ fontSize: 11, color: "#b0a0c0", textAlign: "center", padding: "16px 0" }}>
                            No deals
                          </div>
                        )}
                        {stageDeals.map((deal) => (
                          <DealCard
                            key={deal.id}
                            deal={deal}
                            onMoveNext={handleMoveNext}
                            onClick={(id) => router.push(`/dashboard/pipeline/${id}`)}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Lost Deals (collapsible) */}
          {!loading && dealsByStage("lost").length > 0 && (
            <div className="panel">
              <div className="panel-head" style={{ cursor: "pointer" }} onClick={() => setLostExpanded((p) => !p)}>
                <span className="panel-title" style={{ color: "#8a4040" }}>
                  {STAGE_META.lost.icon} Lost Deals ({dealsByStage("lost").length})
                </span>
                <span style={{ fontSize: 11, color: "#8a7a9a" }}>{lostExpanded ? "▲ Collapse" : "▼ Expand"}</span>
              </div>
              {lostExpanded && (
                <div className="panel-body" style={{ padding: 0 }}>
                  <table>
                    <thead>
                      <tr>
                        <th>Contact</th>
                        <th>Company</th>
                        <th>Offer</th>
                        <th>Value</th>
                        <th>Lost Reason</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dealsByStage("lost").map((d) => (
                        <tr key={d.id} className="clickable" onClick={() => router.push(`/dashboard/pipeline/${d.id}`)}>
                          <td style={{ fontWeight: 600 }}>{d.contact_name}</td>
                          <td style={{ color: "#7a6090" }}>{d.contact_company ?? "—"}</td>
                          <td>{d.offer_templates?.name ?? d.offer_tier ?? "—"}</td>
                          <td style={{ color: "#c9a84c", fontWeight: 700 }}>{fmt(d.deal_value ?? d.estimated_value)}</td>
                          <td style={{ color: "#8a4040", fontSize: 12 }}>{d.lost_reason ?? "—"}</td>
                          <td style={{ color: "#8a7a9a", fontSize: 12 }}>{fmtDate(d.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {activeTab === "templates" && (
        <OfferTemplatesPanel templates={offerTemplates} onRefresh={fetchData} />
      )}

      {/* Add Deal Modal */}
      {showAdd && (
        <AddDealModal
          onClose={() => setShowAdd(false)}
          onSaved={() => { fetchData(); showToast("Deal added successfully!"); }}
          offerTemplates={offerTemplates}
          teamMembers={teamMembers}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
      )}
    </>
  );
}
