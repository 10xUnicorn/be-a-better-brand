"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
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
  proposal_html?: string;
  brand_brief_html?: string;
  roadmap_html?: string;
  game_plan_html?: string;
  intake_data?: Record<string, string> | null;
  ai_prompt?: string;
  created_at: string;
  updated_at: string;
  offer_templates?: OfferTemplate | null;
}

interface IntakeData {
  brand_name: string;
  founder_name: string;
  industry: string;
  engagement_type: string;
  brand_mission: string;
  what_is_working: string;
  what_is_broken: string;
  prior_pr: string;
  primary_goal: string;
  milestones: string;
  dream_placement: string;
  ideal_audience: string;
  competitors: string;
  differentiator: string;
  transcript: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STAGE_OPTIONS: { value: PipelineDeal["stage"]; label: string }[] = [
  { value: "discovery",     label: "Discovery"     },
  { value: "proposal_sent", label: "Proposal Sent" },
  { value: "negotiating",   label: "Negotiating"   },
  { value: "won",           label: "Won / Closing" },
  { value: "lost",          label: "Lost"          },
];

const STAGE_PILL: Record<string, string> = {
  discovery:     "pill-purple",
  proposal_sent: "pill-amber",
  negotiating:   "pill-gold",
  won:           "pill-green",
  lost:          "pill-red",
};

const SOURCE_OPTIONS = [
  { value: "referral",  label: "Referral"  },
  { value: "inbound",   label: "Inbound"   },
  { value: "outbound",  label: "Outbound"  },
  { value: "podcast",   label: "Podcast"   },
  { value: "social",    label: "Social"    },
  { value: "event",     label: "Event"     },
];

const CONTACT_TYPES = ["Author", "Founder", "Speaker", "CEO", "Coach", "Consultant"];

const EMPTY_INTAKE: IntakeData = {
  brand_name: "",
  founder_name: "",
  industry: "",
  engagement_type: "",
  brand_mission: "",
  what_is_working: "",
  what_is_broken: "",
  prior_pr: "",
  primary_goal: "",
  milestones: "",
  dream_placement: "",
  ideal_audience: "",
  competitors: "",
  differentiator: "",
  transcript: "",
};

const DOC_TYPES = [
  { key: "proposal_html",    label: "Proposal"     },
  { key: "brand_brief_html", label: "Brand Brief"  },
  { key: "roadmap_html",     label: "Roadmap"      },
  { key: "game_plan_html",   label: "Game Plan"    },
] as const;

type DocKey = typeof DOC_TYPES[number]["key"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n?: number | null) {
  if (!n && n !== 0) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function intakeFromJson(raw: Record<string, string> | null | undefined): IntakeData {
  return { ...EMPTY_INTAKE, ...(raw ?? {}) };
}

// ─── Tab Button ───────────────────────────────────────────────────────────────

function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="serif"
      style={{
        padding: "8px 18px",
        fontSize: 13,
        fontWeight: active ? 700 : 400,
        color: active ? "#c9a84c" : "#7a6090",
        background: "transparent",
        border: "none",
        borderBottom: active ? "2px solid #c9a84c" : "2px solid transparent",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({
  deal,
  offerTemplates,
  onSaved,
  onToast,
}: {
  deal: PipelineDeal;
  offerTemplates: OfferTemplate[];
  onSaved: (updated: PipelineDeal) => void;
  onToast: (msg: string, type?: "success" | "error") => void;
}) {
  const [form, setForm] = useState({
    contact_name: deal.contact_name ?? "",
    contact_email: deal.contact_email ?? "",
    contact_company: deal.contact_company ?? "",
    contact_type: deal.contact_type ?? "",
    offer_template_id: deal.offer_template_id ?? "",
    deal_value: deal.deal_value != null ? String(deal.deal_value) : "",
    estimated_value: deal.estimated_value != null ? String(deal.estimated_value) : "",
    monthly_value: deal.monthly_value != null ? String(deal.monthly_value) : "",
    duration_months: deal.duration_months != null ? String(deal.duration_months) : "",
    stage: deal.stage,
    probability: deal.probability ?? 20,
    expected_close_date: deal.expected_close_date ? deal.expected_close_date.slice(0, 10) : "",
    next_follow_up: deal.next_follow_up ? deal.next_follow_up.slice(0, 10) : "",
    source: deal.source ?? "",
    lost_reason: deal.lost_reason ?? "",
    notes: deal.notes ?? "",
  });
  const [saving, setSaving] = useState(false);

  function set<K extends keyof typeof form>(field: K, value: typeof form[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    const payload: Record<string, unknown> = {
      contact_name: form.contact_name.trim(),
      contact_email: form.contact_email.trim() || null,
      contact_company: form.contact_company.trim() || null,
      contact_type: form.contact_type || null,
      offer_template_id: form.offer_template_id || null,
      deal_value: form.deal_value ? Number(form.deal_value) : null,
      estimated_value: form.estimated_value ? Number(form.estimated_value) : null,
      monthly_value: form.monthly_value ? Number(form.monthly_value) : null,
      duration_months: form.duration_months ? Number(form.duration_months) : null,
      stage: form.stage,
      probability: form.probability,
      expected_close_date: form.expected_close_date || null,
      next_follow_up: form.next_follow_up || null,
      source: form.source || null,
      lost_reason: form.lost_reason.trim() || null,
      notes: form.notes.trim() || null,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from("pipeline_deals")
      .update(payload)
      .eq("id", deal.id)
      .select("*, offer_templates(id, name, offer_type, price, price_type, duration_months, description)")
      .single();
    setSaving(false);
    if (error) { onToast("Save failed: " + error.message, "error"); return; }
    onSaved(data as PipelineDeal);
    onToast("Deal saved successfully!");
  }

  return (
    <div className="panel">
      <div className="panel-body">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label>Contact Name *</label>
            <input value={form.contact_name} onChange={(e) => set("contact_name", e.target.value)} />
          </div>
          <div>
            <label>Contact Email</label>
            <input type="email" value={form.contact_email} onChange={(e) => set("contact_email", e.target.value)} />
          </div>
          <div>
            <label>Company</label>
            <input value={form.contact_company} onChange={(e) => set("contact_company", e.target.value)} />
          </div>
          <div>
            <label>Contact Type</label>
            <select value={form.contact_type} onChange={(e) => set("contact_type", e.target.value)}>
              <option value="">Select type...</option>
              {CONTACT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label>Offer Template</label>
            <select value={form.offer_template_id} onChange={(e) => set("offer_template_id", e.target.value)}>
              <option value="">None</option>
              {offerTemplates.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Stage</label>
            <select value={form.stage} onChange={(e) => set("stage", e.target.value as PipelineDeal["stage"])}>
              {STAGE_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label>Deal Value ($)</label>
            <input type="number" value={form.deal_value} onChange={(e) => set("deal_value", e.target.value)} />
          </div>
          <div>
            <label>Estimated Value ($)</label>
            <input type="number" value={form.estimated_value} onChange={(e) => set("estimated_value", e.target.value)} />
          </div>
          <div>
            <label>Monthly Value ($)</label>
            <input type="number" value={form.monthly_value} onChange={(e) => set("monthly_value", e.target.value)} />
          </div>
          <div>
            <label>Duration (months)</label>
            <input type="number" value={form.duration_months} onChange={(e) => set("duration_months", e.target.value)} />
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
            <label>Source</label>
            <select value={form.source} onChange={(e) => set("source", e.target.value)}>
              <option value="">Select source...</option>
              {SOURCE_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label>Expected Close Date</label>
            <input type="date" value={form.expected_close_date} onChange={(e) => set("expected_close_date", e.target.value)} />
          </div>
          <div>
            <label>Next Follow-up</label>
            <input type="date" value={form.next_follow_up} onChange={(e) => set("next_follow_up", e.target.value)} />
          </div>
        </div>

        {form.stage === "lost" && (
          <div style={{ marginTop: 16 }}>
            <label>Lost Reason</label>
            <input
              placeholder="Why was this deal lost?"
              value={form.lost_reason}
              onChange={(e) => set("lost_reason", e.target.value)}
            />
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          <label>Notes</label>
          <textarea rows={4} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Internal notes..." />
        </div>

        <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btn-gold" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Intake Tab ───────────────────────────────────────────────────────────────

const INTAKE_FIELDS: { key: keyof IntakeData; label: string; long?: boolean }[] = [
  { key: "brand_name",       label: "Brand Name"                 },
  { key: "founder_name",     label: "Founder Name"               },
  { key: "industry",         label: "Industry"                   },
  { key: "engagement_type",  label: "Engagement Type"            },
  { key: "brand_mission",    label: "Brand Mission",   long: true },
  { key: "what_is_working",  label: "What Is Working", long: true },
  { key: "what_is_broken",   label: "What Is Broken",  long: true },
  { key: "prior_pr",         label: "Prior PR / Press",long: true },
  { key: "primary_goal",     label: "Primary Goal",    long: true },
  { key: "milestones",       label: "Key Milestones",  long: true },
  { key: "dream_placement",  label: "Dream Placement"            },
  { key: "ideal_audience",   label: "Ideal Audience",  long: true },
  { key: "competitors",      label: "Competitors"                },
  { key: "differentiator",   label: "Differentiator",  long: true },
  { key: "transcript",       label: "Call Transcript", long: true },
];

function IntakeTab({
  deal,
  onToast,
  onIntakeSaved,
}: {
  deal: PipelineDeal;
  onToast: (msg: string, type?: "success" | "error") => void;
  onIntakeSaved: (intake: IntakeData) => void;
}) {
  const [intake, setIntake] = useState<IntakeData>(() => intakeFromJson(deal.intake_data));
  const [saving, setSaving] = useState(false);
  const [autofillText, setAutofillText] = useState("");
  const [autofillUrl, setAutofillUrl] = useState("");
  const [autofilling, setAutofilling] = useState(false);
  const [showAutofill, setShowAutofill] = useState(false);

  function setField(key: keyof IntakeData, value: string) {
    setIntake((prev) => ({ ...prev, [key]: value }));
  }

  // Auto-fill from deal overview fields
  function autoFillFromDeal() {
    setIntake((prev) => ({
      ...prev,
      brand_name: prev.brand_name || deal.contact_company || "",
      founder_name: prev.founder_name || deal.contact_name || "",
      engagement_type: prev.engagement_type || deal.offer_tier || "",
    }));
    onToast("Auto-filled from deal details");
  }

  async function handleAutofill() {
    if (!autofillText.trim() && !autofillUrl.trim()) {
      onToast("Paste a URL or text to auto-fill", "error");
      return;
    }
    setAutofilling(true);
    try {
      const res = await fetch("/api/autofill-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: autofillText,
          url: autofillUrl,
          contact_name: deal.contact_name,
          contact_company: deal.contact_company,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Auto-fill failed");
      const fields = json.fields as Record<string, string>;
      // Merge extracted fields (only fill empty ones unless overwrite)
      setIntake((prev) => {
        const next = { ...prev };
        for (const [k, v] of Object.entries(fields)) {
          if (k in next && v && typeof v === "string") {
            next[k as keyof IntakeData] = v;
          }
        }
        return next;
      });
      const count = Object.keys(fields).length;
      onToast(`Auto-filled ${count} field${count !== 1 ? "s" : ""} from content!`);
      setShowAutofill(false);
      setAutofillText("");
      setAutofillUrl("");
    } catch (err: unknown) {
      onToast(err instanceof Error ? err.message : "Auto-fill failed", "error");
    } finally {
      setAutofilling(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("pipeline_deals")
      .update({ intake_data: intake, updated_at: new Date().toISOString() })
      .eq("id", deal.id);
    setSaving(false);
    if (error) { onToast("Save failed: " + error.message, "error"); return; }
    onIntakeSaved(intake);
    onToast("Brand Intelligence saved!");
  }

  return (
    <div>
      {/* Auto-fill toolbar */}
      <div className="panel" style={{ marginBottom: 16 }}>
        <div className="panel-body" style={{ padding: "16px 22px" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <button className="btn btn-outline btn-sm" onClick={autoFillFromDeal}>
              ↑ Auto-fill from Deal
            </button>
            <button
              className="btn btn-purple btn-sm"
              onClick={() => setShowAutofill(!showAutofill)}
            >
              ✦ AI Auto-fill from URL or Text
            </button>
            <span style={{ fontSize: 12, color: "#8a7a9a", fontStyle: "italic" }}>
              Paste a website URL, LinkedIn, transcript, or brief — AI extracts and fills all fields
            </span>
          </div>

          {showAutofill && (
            <div style={{ marginTop: 16, padding: 16, background: "rgba(30,10,74,0.04)", borderRadius: 10, border: "1px solid rgba(201,168,76,0.15)" }}>
              <div style={{ marginBottom: 12 }}>
                <label>Website URL (optional)</label>
                <input
                  type="url"
                  value={autofillUrl}
                  onChange={(e) => setAutofillUrl(e.target.value)}
                  placeholder="https://clientwebsite.com"
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>Paste Text, Bio, or Transcript (optional)</label>
                <textarea
                  rows={5}
                  value={autofillText}
                  onChange={(e) => setAutofillText(e.target.value)}
                  placeholder="Paste LinkedIn bio, website copy, call transcript, or any description of the client/brand..."
                />
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button className="btn btn-outline btn-sm" onClick={() => setShowAutofill(false)}>Cancel</button>
                <button
                  className="btn btn-gold"
                  onClick={handleAutofill}
                  disabled={autofilling || (!autofillText.trim() && !autofillUrl.trim())}
                >
                  {autofilling ? "Extracting…" : "Extract & Fill Fields"}
                </button>
              </div>
              {!process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("uunylac") && (
                <p style={{ fontSize: 11, color: "#9a8aaa", marginTop: 10 }}>
                  Add ANTHROPIC_API_KEY to Vercel env vars for AI extraction. Without it, basic extraction is used.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Intake form */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">Brand Intelligence Intake</span>
          <span className="pill pill-purple">Gap Session Data</span>
        </div>
        <div className="panel-body">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {INTAKE_FIELDS.map(({ key, label, long }) =>
              long ? null : (
                <div key={key}>
                  <label>{label}</label>
                  <input
                    value={intake[key]}
                    onChange={(e) => setField(key, e.target.value)}
                    placeholder={label}
                  />
                </div>
              )
            )}
          </div>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
            {INTAKE_FIELDS.filter((f) => f.long).map(({ key, label }) => (
              <div key={key}>
                <label>{label}</label>
                <textarea
                  rows={3}
                  value={intake[key]}
                  onChange={(e) => setField(key, e.target.value)}
                  placeholder={label}
                />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}>
            <button className="btn btn-gold" onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save Intake"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Prompt Template Type ────────────────────────────────────────────────────

interface PromptTemplate {
  id: string;
  name: string;
  doc_type: string;
  description?: string;
  sort_order: number;
}

// ─── Documents Tab ────────────────────────────────────────────────────────────

function DocumentsTab({
  deal,
  onToast,
  onDocGenerated,
}: {
  deal: PipelineDeal;
  onToast: (msg: string, type?: "success" | "error") => void;
  onDocGenerated: (docType: DocKey, html: string) => void;
}) {
  const [generating, setGenerating] = useState<DocKey | null>(null);
  const [previewDoc, setPreviewDoc] = useState<{ html: string; label: string } | null>(null);

  async function handleGenerate(docType: DocKey) {
    setGenerating(docType);
    try {
      const res = await fetch("/api/generate-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deal_id: deal.id,
          doc_type: docType,
          intake_data: deal.intake_data ?? {},
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Generation failed");
      const html: string = json.html ?? json.content ?? "";
      onDocGenerated(docType, html);
      onToast(`${DOC_TYPES.find(d => d.key === docType)?.label ?? "Document"} generated!`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Generation failed";
      onToast(msg, "error");
    } finally {
      setGenerating(null);
    }
  }

  const hasIntake = deal.intake_data && Object.values(deal.intake_data).some(v => v && v.trim());

  return (
    <div>
      {!hasIntake && (
        <div style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 12, padding: "16px 20px", marginBottom: 20, fontSize: 14, color: "#5a4070" }}>
          <strong style={{ color: "#1e0a4a" }}>Tip:</strong> Fill in the Intake tab first — the more detail you provide, the more accurate and personalized the generated documents will be.
        </div>
      )}
      {DOC_TYPES.map(({ key, label }) => {
        const html = deal[key as keyof PipelineDeal] as string | undefined;
        return (
          <div className="panel" key={key}>
            <div className="panel-head">
              <div>
                <span className="panel-title">{label}</span>
                {html && <span className="pill pill-green" style={{ marginLeft: 10, fontSize: 10 }}>Generated</span>}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {html && (
                  <button className="btn btn-outline btn-sm" onClick={() => setPreviewDoc({ html, label })}>
                    Preview
                  </button>
                )}
                <button
                  className="btn btn-gold btn-sm"
                  onClick={() => handleGenerate(key)}
                  disabled={generating !== null}
                >
                  {generating === key ? "Generating…" : html ? "Regenerate" : "✦ Generate"}
                </button>
              </div>
            </div>
            <div className="panel-body">
              {html ? (
                <div style={{ border: "1px solid rgba(240,195,112,0.2)", borderRadius: 10, padding: "16px 20px", background: "rgba(255,255,255,0.6)", fontSize: 13, color: "#2a1a40", lineHeight: 1.7, maxHeight: 220, overflowY: "hidden", position: "relative", cursor: "pointer" }}
                  onClick={() => setPreviewDoc({ html, label })}
                >
                  <div dangerouslySetInnerHTML={{ __html: html.slice(0, 800) + (html.length > 800 ? "…" : "") }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(transparent, rgba(255,255,255,0.9))", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 8 }}>
                    <span style={{ fontSize: 11, color: "#c9a84c", fontWeight: 600 }}>Click to preview full document</span>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "28px 0", color: "#8a7a9a" }}>
                  <div className="serif" style={{ fontSize: 14, marginBottom: 8 }}>No {label} generated yet.</div>
                  <div style={{ fontSize: 12 }}>Complete the Intake tab, then click Generate to create this document using Claude AI.</div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Full-screen preview modal */}
      {previewDoc && (
        <div className="modal-overlay" onClick={() => setPreviewDoc(null)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{ width: "92vw", height: "90vh", background: "#fff", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 80px rgba(30,10,74,0.3)" }}
          >
            {/* Modal header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderBottom: "1px solid rgba(240,195,112,0.2)", background: "#fff", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="panel-title">{previewDoc.label}</span>
                <span className="pill pill-green" style={{ fontSize: 10 }}>Generated</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-outline btn-sm" onClick={() => {
                  const blob = new Blob([previewDoc.html], { type: "text/html" });
                  const a = document.createElement("a");
                  a.href = URL.createObjectURL(blob);
                  a.download = `${previewDoc.label.replace(/\s+/g, "_")}.html`;
                  a.click();
                }}>Download HTML</button>
                <button onClick={() => setPreviewDoc(null)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#5a4070", lineHeight: 1 }}>✕</button>
              </div>
            </div>
            {/* Document content */}
            <div style={{ flex: 1, overflow: "auto", padding: 0 }}>
              <iframe
                srcDoc={previewDoc.html}
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                title={previewDoc.label}
                sandbox="allow-same-origin"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AI Prompt Tab ────────────────────────────────────────────────────────────

function AiPromptTab({ deal, onToast }: { deal: PipelineDeal; onToast: (msg: string, type?: "success" | "error") => void }) {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [generatedPrompt, setGeneratedPrompt] = useState<string>(deal.ai_prompt ?? "");
  const [generating, setGenerating] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  useEffect(() => {
    fetch("/api/prompt-templates")
      .then(r => r.json())
      .then(d => {
        setTemplates(d.templates ?? []);
        if (d.templates?.length > 0) setSelectedId(d.templates[0].id);
      })
      .catch(() => {})
      .finally(() => setLoadingTemplates(false));
  }, []);

  useEffect(() => {
    if (deal.ai_prompt) setGeneratedPrompt(deal.ai_prompt);
  }, [deal.ai_prompt]);

  // Auto-generate when dropdown changes
  async function handleTemplateChange(id: string) {
    setSelectedId(id);
    const t = templates.find(x => x.id === id);
    if (!t) return;
    setGenerating(true);
    setGeneratedPrompt("");
    try {
      const res = await fetch("/api/generate-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deal_id: deal.id, doc_type: t.doc_type, intake_data: deal.intake_data ?? {} }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed");
      setGeneratedPrompt(json.prompt ?? "");
    } catch (err: unknown) {
      onToast(err instanceof Error ? err.message : "Failed to build prompt", "error");
    } finally {
      setGenerating(false);
    }
  }

  function handleCopy() {
    if (!generatedPrompt) { onToast("Select a template first", "error"); return; }
    navigator.clipboard.writeText(generatedPrompt).then(() => {
      onToast("Prompt copied! Paste it into Claude at claude.ai");
    }).catch(() => {
      onToast("Copy failed — select the text and copy manually.", "error");
    });
  }

  const selectedTemplate = templates.find(t => t.id === selectedId);

  return (
    <div>
      {/* Compact dropdown selector */}
      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-head">
          <span className="panel-title">⚡ AI Prompt Builder</span>
          {generatedPrompt && (
            <button className="btn btn-gold btn-sm" onClick={handleCopy}>
              Copy to Claude →
            </button>
          )}
        </div>
        <div className="panel-body">
          <p style={{ fontSize: 13, color: "#5a4070", lineHeight: 1.7, marginBottom: 16 }}>
            Select a template — the prompt auto-fills with all client, intake, and offer data. Then copy and paste into <a href="https://claude.ai" target="_blank" rel="noopener" style={{ color: "#c9a84c" }}>claude.ai</a>.
          </p>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
            {loadingTemplates ? (
              <p style={{ fontSize: 13, color: "#9a8aaa" }}>Loading templates…</p>
            ) : (
              <select
                value={selectedId}
                onChange={e => handleTemplateChange(e.target.value)}
                style={{ flex: 1, fontSize: 14, fontWeight: 600 }}
                disabled={generating}
              >
                <option value="">Select a prompt template…</option>
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            )}
            {generating && <span style={{ fontSize: 13, color: "#c9a84c", fontStyle: "italic" }}>Building prompt…</span>}
          </div>

          {selectedTemplate && (
            <div style={{ fontSize: 12, color: "#7a6090", padding: "8px 12px", background: "rgba(240,195,112,0.06)", borderRadius: 8 }}>
              {selectedTemplate.description || `Generates a ${selectedTemplate.doc_type.replace(/_/g, " ")} using your deal + intake data.`}
            </div>
          )}

          {!generatedPrompt && !generating && (
            <div style={{ marginTop: 16, textAlign: "center", color: "#9a8aaa", fontSize: 13 }}>
              ↑ Select a template above to auto-generate the prompt
            </div>
          )}
        </div>
      </div>

      {/* Generated prompt preview */}
      {generatedPrompt ? (
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Generated Prompt</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-outline btn-sm" onClick={() => setGeneratedPrompt("")}>Clear</button>
              <button className="btn btn-gold btn-sm" onClick={handleCopy}>Copy to Claude →</button>
            </div>
          </div>
          <div className="panel-body">
            <div style={{ fontSize: 11, color: "#7a6090", marginBottom: 12, lineHeight: 1.6, padding: "10px 14px", background: "rgba(30,10,74,0.04)", borderRadius: 8 }}>
              <strong>How to use:</strong> Click &ldquo;Copy to Claude&rdquo; → open <a href="https://claude.ai" target="_blank" rel="noopener" style={{ color: "#c9a84c" }}>claude.ai</a> → start a new chat → paste. Claude will generate the full document in Chrissy&apos;s voice with all client details filled in.
            </div>
            <pre style={{
              fontFamily: "monospace",
              fontSize: 12,
              color: "#1e0a4a",
              background: "rgba(30,10,74,0.03)",
              border: "1px solid rgba(201,168,76,0.18)",
              borderRadius: 10,
              padding: "16px 20px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              lineHeight: 1.75,
              maxHeight: 480,
              overflowY: "auto",
            }}>
              {generatedPrompt}
            </pre>
          </div>
        </div>
      ) : (
        <div className="panel">
          <div className="panel-body" style={{ textAlign: "center", padding: 40 }}>
            <div className="serif" style={{ fontSize: 20, color: "#1e0a4a", marginBottom: 10 }}>Select a template above</div>
            <p style={{ fontSize: 14, color: "#7a6090", maxWidth: 400, margin: "0 auto" }}>
              Choose Brand Architecture Brief, Proposal, Roadmap, 90-Day Game Plan, or the full Brand Intelligence Analysis. Your intake data and deal details auto-populate into the prompt.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

function DeleteConfirmModal({
  dealName,
  onCancel,
  onConfirm,
  deleting,
}: {
  dealName: string;
  onCancel: () => void;
  onConfirm: () => void;
  deleting: boolean;
}) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
        <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "#8a2020", marginBottom: 12 }}>
          Delete Deal?
        </h3>
        <p style={{ fontSize: 14, color: "#5a4070", marginBottom: 24, lineHeight: 1.6 }}>
          Are you sure you want to permanently delete the deal for <strong>{dealName}</strong>? This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button className="btn btn-outline" onClick={onCancel} disabled={deleting}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={deleting}>
            {deleting ? "Deleting…" : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type TabKey = "overview" | "intake" | "documents" | "ai_prompt";

const TABS: { key: TabKey; label: string }[] = [
  { key: "overview",   label: "Overview"  },
  { key: "intake",     label: "Intake"    },
  { key: "documents",  label: "Documents" },
  { key: "ai_prompt",  label: "AI Prompt" },
];

export default function DealDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const dealId = params?.id;

  const [deal, setDeal] = useState<PipelineDeal | null>(null);
  const [offerTemplates, setOfferTemplates] = useState<OfferTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [convertingToProject, setConvertingToProject] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  const fetchDeal = useCallback(async () => {
    if (!dealId) return;
    setLoading(true);
    const supabase = createClient();
    const [dealRes, templatesRes] = await Promise.all([
      supabase
        .from("pipeline_deals")
        .select("*, offer_templates(id, name, offer_type, price, price_type, duration_months, description)")
        .eq("id", dealId)
        .single(),
      supabase.from("offer_templates").select("*").order("name"),
    ]);
    setLoading(false);
    if (dealRes.error || !dealRes.data) { setNotFound(true); return; }
    setDeal(dealRes.data as PipelineDeal);
    if (templatesRes.data) setOfferTemplates(templatesRes.data as OfferTemplate[]);
  }, [dealId]);

  useEffect(() => { fetchDeal(); }, [fetchDeal]);

  async function handleDelete() {
    if (!deal) return;
    setDeleting(true);
    const supabase = createClient();
    const { error } = await supabase.from("pipeline_deals").delete().eq("id", deal.id);
    setDeleting(false);
    if (error) { showToast("Delete failed: " + error.message, "error"); setShowDeleteConfirm(false); return; }
    router.push("/dashboard/pipeline");
  }

  async function handleConvertToProject() {
    if (!deal) return;
    setConvertingToProject(true);
    try {
      const supabase = createClient();
      // Find a matching project template based on offer type
      const { data: templates } = await supabase
        .from("project_templates")
        .select("id, name, tasks, offer_type")
        .order("name");

      const offerType = deal.offer_templates?.offer_type ?? deal.offer_tier ?? "";
      const matchedTemplate = templates?.find(t => t.offer_type === offerType) || templates?.[0];

      // Create the project
      const { data: project, error } = await supabase.from("projects").insert({
        name: `${deal.contact_name} — ${deal.offer_templates?.name ?? deal.offer_tier ?? "Project"}`,
        description: `Created from Pipeline deal. ${deal.notes || ""}`.trim(),
        deal_id: deal.id,
        status: "planning",
        start_date: new Date().toISOString().slice(0, 10),
      }).select("id").single();

      if (error) throw error;

      // If template found, seed tasks
      if (matchedTemplate && project && Array.isArray(matchedTemplate.tasks)) {
        const tasks = (matchedTemplate.tasks as Array<{ title: string; description?: string; sort_order: number; subtasks?: Array<{ title: string; sort_order: number }> }>)
          .map(t => ({
            project_id: project.id,
            title: t.title,
            description: t.description || null,
            status: "todo",
            priority: "medium",
            sort_order: t.sort_order,
          }));
        if (tasks.length > 0) {
          await supabase.from("tasks").insert(tasks);
        }
      }

      showToast(`Project created! Redirecting…`);
      setTimeout(() => router.push(`/dashboard/projects/${project?.id}`), 1200);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to create project", "error");
    } finally {
      setConvertingToProject(false);
    }
  }

  function handleDealSaved(updated: PipelineDeal) {
    setDeal(updated);
  }

  function handleIntakeSaved(intake: IntakeData) {
    if (!deal) return;
    setDeal({ ...deal, intake_data: intake as unknown as Record<string, string> });
  }

  function handleDocGenerated(docType: DocKey, html: string) {
    if (!deal) return;
    setDeal({ ...deal, [docType]: html });
  }

  // ── Render ──

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 60, color: "#8a7a9a" }}>
        <div className="serif" style={{ fontSize: 18 }}>Loading deal…</div>
      </div>
    );
  }

  if (notFound || !deal) {
    return (
      <div style={{ textAlign: "center", padding: 60 }}>
        <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1e0a4a", marginBottom: 12 }}>Deal not found</div>
        <Link href="/dashboard/pipeline" style={{ color: "#c9a84c", fontSize: 13 }}>← Back to Pipeline</Link>
      </div>
    );
  }

  const stageMeta = {
    discovery:     { label: "Discovery",     pill: "pill-purple" },
    proposal_sent: { label: "Proposal Sent", pill: "pill-amber"  },
    negotiating:   { label: "Negotiating",   pill: "pill-gold"   },
    won:           { label: "Won / Closing", pill: "pill-green"  },
    lost:          { label: "Lost",          pill: "pill-red"    },
  }[deal.stage] ?? { label: deal.stage, pill: "pill-purple" };

  const offerName = deal.offer_templates?.name ?? deal.offer_tier ?? "No offer";
  const value = deal.deal_value ?? deal.estimated_value;

  return (
    <>
      {/* Back link */}
      <Link
        href="/dashboard/pipeline"
        style={{ fontSize: 12, color: "#c9a84c", textDecoration: "none", marginBottom: 16, display: "inline-block" }}
      >
        ← Back to Pipeline
      </Link>

      {/* Deal Header */}
      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-body" style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "linear-gradient(135deg, #1e0a4a, #331081)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 700, color: "#f0c370", flexShrink: 0,
          }}>
            {deal.contact_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1e0a4a", marginBottom: 6 }}>
              {deal.contact_name}
            </h2>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <span className={`pill ${stageMeta.pill}`}>{stageMeta.label}</span>
              {deal.probability != null && (
                <span className="pill pill-amber">{deal.probability}% probability</span>
              )}
              <span style={{ fontSize: 12, color: "#5a4070" }}>{offerName}</span>
              {deal.contact_company && (
                <span style={{ fontSize: 12, color: "#8a7a9a" }}>· {deal.contact_company}</span>
              )}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="serif" style={{ fontSize: 26, fontWeight: 700, color: "#1e0a4a" }}>
              {fmt(value)}
            </div>
            {deal.expected_close_date && (
              <div style={{ fontSize: 11, color: "#7a6090", marginTop: 2 }}>
                Close by {new Date(deal.expected_close_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, marginBottom: 20, borderBottom: "1px solid rgba(240,195,112,0.2)" }}>
        {TABS.map((tab) => (
          <TabBtn
            key={tab.key}
            label={tab.label}
            active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          />
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <OverviewTab
          deal={deal}
          offerTemplates={offerTemplates}
          onSaved={handleDealSaved}
          onToast={showToast}
        />
      )}

      {activeTab === "intake" && (
        <IntakeTab
          deal={deal}
          onToast={showToast}
          onIntakeSaved={handleIntakeSaved}
        />
      )}

      {activeTab === "documents" && (
        <DocumentsTab
          deal={deal}
          onToast={showToast}
          onDocGenerated={handleDocGenerated}
        />
      )}

      {activeTab === "ai_prompt" && (
        <AiPromptTab deal={deal} onToast={showToast} />
      )}

      {/* Delete Section */}
      <div
        style={{
          marginTop: 32,
          padding: "20px 24px",
          background: "rgba(255,240,240,0.5)",
          border: "1px solid rgba(220,100,100,0.2)",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1e0a4a" }}>Convert to Project</div>
          <div style={{ fontSize: 12, color: "#5a4070", marginTop: 2 }}>
            Create a project from this deal with tasks auto-populated from the matching project template.
          </div>
        </div>
        <button
          className="btn btn-purple"
          onClick={handleConvertToProject}
          disabled={convertingToProject}
        >
          {convertingToProject ? "Creating…" : "◆ Convert to Project"}
        </button>
      </div>

      {/* Delete danger zone */}
      <div style={{
        marginTop: 16,
        padding: "20px 24px",
        background: "rgba(255,240,240,0.5)",
        border: "1px solid rgba(220,100,100,0.2)",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#8a2020" }}>Delete this deal</div>
          <div style={{ fontSize: 12, color: "#a06060", marginTop: 2 }}>
            This will permanently remove all data for {deal.contact_name}. This cannot be undone.
          </div>
        </div>
        <button className="btn btn-danger" onClick={() => setShowDeleteConfirm(true)}>
          Delete Deal
        </button>
      </div>

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          dealName={deal.contact_name}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
          deleting={deleting}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
      )}
    </>
  );
}
