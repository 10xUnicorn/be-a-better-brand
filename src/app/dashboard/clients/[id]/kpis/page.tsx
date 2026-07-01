"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Pitch {
  id: string;
  client_id: string;
  publication: string;
  journalist: string | null;
  pitch_type: "article" | "podcast" | "tv" | "radio" | "newsletter" | "other";
  status: "submitted" | "followed_up" | "placed" | "declined" | "pending";
  submitted_date: string | null;
  placed_date: string | null;
  placement_url: string | null;
  domain_authority: number | null;
  potential_reach: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface PodcastBooking {
  id: string;
  client_id: string;
  show_name: string;
  host_name: string | null;
  booking_status: "pitched" | "booked" | "recorded" | "live" | "declined";
  record_date: string | null;
  publish_date: string | null;
  episode_url: string | null;
  monthly_listeners: number | null;
  notes: string | null;
  created_at: string;
}

interface KpiSnapshot {
  id: string;
  client_id: string;
  month: string;
  pitches_submitted: number;
  pitches_won: number;
  podcast_bookings: number;
  pieces_live: number;
  calls_booked: number;
  total_reach: number;
  calls_goal: number;
  reach_goal: number;
  ai_insights: string | null;
  created_at: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtNum(n: number | null | undefined) {
  if (!n && n !== 0) return "—";
  return new Intl.NumberFormat("en-US").format(n);
}

function fmtDate(d: string | null | undefined) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function thisMonthStart() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
}

// ─── Status pill colors ───────────────────────────────────────────────────────

const PITCH_STATUS_PILL: Record<string, string> = {
  submitted: "pill-amber",
  followed_up: "pill-purple",
  placed: "pill-green",
  declined: "pill-red",
  pending: "pill-gold",
};

const PODCAST_STATUS_PILL: Record<string, string> = {
  pitched: "pill-purple",
  booked: "pill-amber",
  recorded: "pill-gold",
  live: "pill-green",
  declined: "pill-red",
};

const PITCH_TYPE_LABELS: Record<string, string> = {
  article: "Article",
  podcast: "Podcast",
  tv: "TV",
  radio: "Radio",
  newsletter: "Newsletter",
  other: "Other",
};

// ─── Empty forms ──────────────────────────────────────────────────────────────

const EMPTY_PITCH: Omit<Pitch, "id" | "client_id" | "created_at" | "updated_at"> = {
  publication: "",
  journalist: "",
  pitch_type: "article",
  status: "submitted",
  submitted_date: new Date().toISOString().slice(0, 10),
  placed_date: null,
  placement_url: "",
  domain_authority: null,
  potential_reach: null,
  notes: "",
};

const EMPTY_PODCAST: Omit<PodcastBooking, "id" | "client_id" | "created_at"> = {
  show_name: "",
  host_name: "",
  booking_status: "booked",
  record_date: null,
  publish_date: null,
  episode_url: "",
  monthly_listeners: null,
  notes: "",
};

// ─── Pitch Modal ──────────────────────────────────────────────────────────────

function PitchModal({
  initial,
  onClose,
  onSave,
}: {
  initial: Omit<Pitch, "id" | "client_id" | "created_at" | "updated_at">;
  onClose: () => void;
  onSave: (data: Omit<Pitch, "id" | "client_id" | "created_at" | "updated_at">) => Promise<void>;
}) {
  const [form, setForm] = useState({ ...initial });
  const [saving, setSaving] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function handleSave() {
    if (!form.publication.trim()) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  }

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ maxWidth: 620 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "#1e0a4a" }}>
            {initial.publication ? "Edit Pitch" : "Add Pitch"}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#7a6090" }}>✕</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label>Publication *</label>
            <input value={form.publication} onChange={(e) => set("publication", e.target.value)} placeholder="e.g. Forbes, Inc Magazine" />
          </div>
          <div>
            <label>Journalist</label>
            <input value={form.journalist ?? ""} onChange={(e) => set("journalist", e.target.value)} placeholder="Contact name" />
          </div>
          <div>
            <label>Pitch Type</label>
            <select value={form.pitch_type} onChange={(e) => set("pitch_type", e.target.value as Pitch["pitch_type"])}>
              {Object.entries(PITCH_TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div>
            <label>Status</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value as Pitch["status"])}>
              <option value="submitted">Submitted</option>
              <option value="followed_up">Followed Up</option>
              <option value="placed">Placed</option>
              <option value="declined">Declined</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div>
            <label>Submitted Date</label>
            <input type="date" value={form.submitted_date ?? ""} onChange={(e) => set("submitted_date", e.target.value || null)} />
          </div>
          <div>
            <label>Domain Authority</label>
            <input type="number" min={0} max={100} value={form.domain_authority ?? ""} onChange={(e) => set("domain_authority", e.target.value ? Number(e.target.value) : null)} placeholder="0–100" />
          </div>
          <div>
            <label>Potential Reach</label>
            <input type="number" min={0} value={form.potential_reach ?? ""} onChange={(e) => set("potential_reach", e.target.value ? Number(e.target.value) : null)} placeholder="e.g. 500000" />
          </div>
          {form.status === "placed" && (
            <>
              <div>
                <label>Placed Date</label>
                <input type="date" value={form.placed_date ?? ""} onChange={(e) => set("placed_date", e.target.value || null)} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label>Placement URL</label>
                <input type="url" value={form.placement_url ?? ""} onChange={(e) => set("placement_url", e.target.value)} placeholder="https://" />
              </div>
            </>
          )}
          <div style={{ gridColumn: "1 / -1" }}>
            <label>Notes</label>
            <textarea rows={3} value={form.notes ?? ""} onChange={(e) => set("notes", e.target.value)} placeholder="Internal notes…" />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-gold" onClick={handleSave} disabled={saving || !form.publication.trim()}>
            {saving ? "Saving…" : "Save Pitch"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Podcast Modal ────────────────────────────────────────────────────────────

function PodcastModal({
  initial,
  onClose,
  onSave,
}: {
  initial: Omit<PodcastBooking, "id" | "client_id" | "created_at">;
  onClose: () => void;
  onSave: (data: Omit<PodcastBooking, "id" | "client_id" | "created_at">) => Promise<void>;
}) {
  const [form, setForm] = useState({ ...initial });
  const [saving, setSaving] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function handleSave() {
    if (!form.show_name.trim()) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  }

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ maxWidth: 620 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "#1e0a4a" }}>
            {initial.show_name ? "Edit Booking" : "Add Podcast Booking"}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#7a6090" }}>✕</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label>Show Name *</label>
            <input value={form.show_name} onChange={(e) => set("show_name", e.target.value)} placeholder="e.g. The Tim Ferriss Show" />
          </div>
          <div>
            <label>Host Name</label>
            <input value={form.host_name ?? ""} onChange={(e) => set("host_name", e.target.value)} placeholder="Host's name" />
          </div>
          <div>
            <label>Status</label>
            <select value={form.booking_status} onChange={(e) => set("booking_status", e.target.value as PodcastBooking["booking_status"])}>
              <option value="pitched">Pitched</option>
              <option value="booked">Booked</option>
              <option value="recorded">Recorded</option>
              <option value="live">Live</option>
              <option value="declined">Declined</option>
            </select>
          </div>
          <div>
            <label>Record Date</label>
            <input type="date" value={form.record_date ?? ""} onChange={(e) => set("record_date", e.target.value || null)} />
          </div>
          <div>
            <label>Publish Date</label>
            <input type="date" value={form.publish_date ?? ""} onChange={(e) => set("publish_date", e.target.value || null)} />
          </div>
          <div>
            <label>Monthly Listeners</label>
            <input type="number" min={0} value={form.monthly_listeners ?? ""} onChange={(e) => set("monthly_listeners", e.target.value ? Number(e.target.value) : null)} placeholder="e.g. 50000" />
          </div>
          {form.booking_status === "live" && (
            <div style={{ gridColumn: "1 / -1" }}>
              <label>Episode URL</label>
              <input type="url" value={form.episode_url ?? ""} onChange={(e) => set("episode_url", e.target.value)} placeholder="https://" />
            </div>
          )}
          <div style={{ gridColumn: "1 / -1" }}>
            <label>Notes</label>
            <textarea rows={3} value={form.notes ?? ""} onChange={(e) => set("notes", e.target.value)} placeholder="Internal notes…" />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-gold" onClick={handleSave} disabled={saving || !form.show_name.trim()}>
            {saving ? "Saving…" : "Save Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ClientKpisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const supabase = createClient();

  // Data state
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastBooking[]>([]);
  const [snapshot, setSnapshot] = useState<KpiSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  // UI state
  const [pitchStatusFilter, setPitchStatusFilter] = useState<string>("all");
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [editingPitch, setEditingPitch] = useState<Pitch | null>(null);
  const [showPodcastModal, setShowPodcastModal] = useState(false);
  const [editingPodcast, setEditingPodcast] = useState<PodcastBooking | null>(null);
  const [generatingInsights, setGeneratingInsights] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function loadAll() {
    setLoading(true);
    const monthStart = thisMonthStart();
    const [pitchRes, podRes, snapRes] = await Promise.all([
      supabase.from("client_pitches").select("*").eq("client_id", id).order("created_at", { ascending: false }),
      supabase.from("client_podcast_bookings").select("*").eq("client_id", id).order("created_at", { ascending: false }),
      supabase.from("client_kpi_snapshots").select("*").eq("client_id", id).eq("month", monthStart).maybeSingle(),
    ]);
    setPitches((pitchRes.data as Pitch[]) ?? []);
    setPodcasts((podRes.data as PodcastBooking[]) ?? []);
    setSnapshot((snapRes.data as KpiSnapshot) ?? null);
    setLoading(false);
  }

  useEffect(() => { loadAll(); }, [id]);

  // ── Derived KPIs ──
  const monthStart = thisMonthStart();
  const thisMonthPitches = pitches.filter((p) => p.submitted_date && p.submitted_date >= monthStart);
  const thisMonthWon = thisMonthPitches.filter((p) => p.status === "placed");
  const totalPodcasts = podcasts.length;
  const piecesLive = pitches.filter((p) => p.status === "placed").length + podcasts.filter((p) => p.booking_status === "live").length;
  const totalReach = pitches.reduce((sum, p) => sum + (p.potential_reach ?? 0), 0);
  const reachGoal = snapshot?.reach_goal ?? 400000;
  const callsBooked = snapshot?.calls_booked ?? 0;
  const callsGoal = snapshot?.calls_goal ?? 10;
  const reachPct = reachGoal > 0 ? Math.min(100, Math.round((totalReach / reachGoal) * 100)) : 0;
  const callsPct = callsGoal > 0 ? Math.min(100, Math.round((callsBooked / callsGoal) * 100)) : 0;

  const filteredPitches = pitchStatusFilter === "all" ? pitches : pitches.filter((p) => p.status === pitchStatusFilter);

  // ── Pitch CRUD ──
  async function savePitch(data: Omit<Pitch, "id" | "client_id" | "created_at" | "updated_at">) {
    if (editingPitch) {
      const { error } = await supabase.from("client_pitches").update({ ...data, updated_at: new Date().toISOString() }).eq("id", editingPitch.id);
      if (error) { showToast("Failed to update pitch", "error"); return; }
      showToast("Pitch updated");
    } else {
      const { error } = await supabase.from("client_pitches").insert({ ...data, client_id: id });
      if (error) { showToast("Failed to add pitch", "error"); return; }
      showToast("Pitch added");
    }
    setShowPitchModal(false);
    setEditingPitch(null);
    loadAll();
  }

  async function deletePitch(pitchId: string) {
    if (!confirm("Delete this pitch?")) return;
    await supabase.from("client_pitches").delete().eq("id", pitchId);
    setPitches((prev) => prev.filter((p) => p.id !== pitchId));
    showToast("Pitch deleted");
  }

  // ── Podcast CRUD ──
  async function savePodcast(data: Omit<PodcastBooking, "id" | "client_id" | "created_at">) {
    if (editingPodcast) {
      const { error } = await supabase.from("client_podcast_bookings").update(data).eq("id", editingPodcast.id);
      if (error) { showToast("Failed to update booking", "error"); return; }
      showToast("Booking updated");
    } else {
      const { error } = await supabase.from("client_podcast_bookings").insert({ ...data, client_id: id });
      if (error) { showToast("Failed to add booking", "error"); return; }
      showToast("Booking added");
    }
    setShowPodcastModal(false);
    setEditingPodcast(null);
    loadAll();
  }

  async function deletePodcast(bookingId: string) {
    if (!confirm("Delete this booking?")) return;
    await supabase.from("client_podcast_bookings").delete().eq("id", bookingId);
    setPodcasts((prev) => prev.filter((p) => p.id !== bookingId));
    showToast("Booking deleted");
  }

  // ── AI Insights ──
  async function generateInsights() {
    setGeneratingInsights(true);
    try {
      const prompt = `You are Chrissy Bernal, founder of Be a Better Brand — a PR and brand authority firm. Analyze the following PR and media KPI data for one of your clients and give 3–5 specific, actionable recommendations written in your voice: warm, strategic, direct, and results-focused.

Client KPI Summary (Current Month):
- Pitches Submitted: ${thisMonthPitches.length}
- Pitches Won (Placed): ${thisMonthWon.length}
- Win Rate: ${thisMonthPitches.length > 0 ? Math.round((thisMonthWon.length / thisMonthPitches.length) * 100) : 0}%
- Podcast Bookings Total: ${totalPodcasts}
- Pieces Live: ${piecesLive}
- Total Potential Reach: ${fmtNum(totalReach)}
- Reach Goal: ${fmtNum(reachGoal)}
- Calls Booked: ${callsBooked} / ${callsGoal} goal

Pitch Status Breakdown:
${["submitted", "followed_up", "placed", "declined", "pending"].map((s) => `- ${s}: ${pitches.filter((p) => p.status === s).length}`).join("\n")}

Write 3–5 specific, actionable recommendations to improve their PR performance. Be direct and specific — no fluff. Reference the actual numbers.`;

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "kpi_insights" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Generation failed");
      const insights: string = json.content ?? "";

      // Upsert snapshot with insights
      const { error } = await supabase.from("client_kpi_snapshots").upsert({
        client_id: id,
        month: monthStart,
        pitches_submitted: thisMonthPitches.length,
        pitches_won: thisMonthWon.length,
        podcast_bookings: totalPodcasts,
        pieces_live: piecesLive,
        calls_booked: callsBooked,
        total_reach: totalReach,
        calls_goal: callsGoal,
        reach_goal: reachGoal,
        ai_insights: insights,
      }, { onConflict: "client_id,month" });

      if (error) { showToast("Failed to save insights", "error"); return; }
      setSnapshot((prev) => prev ? { ...prev, ai_insights: insights } : null);
      showToast("AI Insights generated!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Generation failed";
      showToast(msg, "error");
    } finally {
      setGeneratingInsights(false);
    }
  }

  // ── Render ──
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 60, color: "#8a7a9a" }}>
        <div className="serif" style={{ fontSize: 18 }}>Loading KPI data…</div>
      </div>
    );
  }

  return (
    <>
      <Link
        href={`/dashboard/clients/${id}`}
        style={{ fontSize: 12, color: "#c9a84c", textDecoration: "none", marginBottom: 16, display: "inline-block" }}
      >
        ← Back to Client
      </Link>

      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "#1e0a4a", marginBottom: 4 }}>
          KPIs &amp; Tracking
        </h1>
        <p style={{ fontSize: 13, color: "#7a6090" }}>
          PR pitches, podcast bookings, media placements &amp; monthly performance metrics.
        </p>
      </div>

      {/* ── SECTION 1: KPI STAT CARDS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        <div className="kpi-card">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#7a6090", marginBottom: 8 }}>
            Pitches This Month
          </div>
          <div className="serif" style={{ fontSize: 36, fontWeight: 700, color: "#1e0a4a", lineHeight: 1 }}>
            {thisMonthPitches.length}
          </div>
          <div style={{ fontSize: 12, color: "#8a7a9a", marginTop: 6 }}>submitted</div>
        </div>
        <div className="kpi-card">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#7a6090", marginBottom: 8 }}>
            Pitches Won
          </div>
          <div className="serif" style={{ fontSize: 36, fontWeight: 700, color: "#2a7a3a", lineHeight: 1 }}>
            {thisMonthWon.length}
          </div>
          <div style={{ fontSize: 12, color: "#8a7a9a", marginTop: 6 }}>placed this month</div>
        </div>
        <div className="kpi-card">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#7a6090", marginBottom: 8 }}>
            Podcast Bookings
          </div>
          <div className="serif" style={{ fontSize: 36, fontWeight: 700, color: "#1e0a4a", lineHeight: 1 }}>
            {totalPodcasts}
          </div>
          <div style={{ fontSize: 12, color: "#8a7a9a", marginTop: 6 }}>total bookings</div>
        </div>
        <div className="kpi-card">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#7a6090", marginBottom: 8 }}>
            Pieces Live
          </div>
          <div className="serif" style={{ fontSize: 36, fontWeight: 700, color: "#4a1090", lineHeight: 1 }}>
            {piecesLive}
          </div>
          <div style={{ fontSize: 12, color: "#8a7a9a", marginTop: 6 }}>published placements</div>
        </div>
      </div>

      {/* Progress Bars */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div className="panel" style={{ marginBottom: 0 }}>
          <div className="panel-body">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1e0a4a", marginBottom: 2 }}>Total Reach Goal</div>
                <div style={{ fontSize: 12, color: "#7a6090" }}>
                  {fmtNum(totalReach)} / {fmtNum(reachGoal)} potential readers
                </div>
              </div>
              <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#c9a84c" }}>{reachPct}%</div>
            </div>
            <div className="prog-wrap">
              <div className="prog-fill" style={{ width: `${reachPct}%`, transition: "width 0.6s ease" }} />
            </div>
          </div>
        </div>
        <div className="panel" style={{ marginBottom: 0 }}>
          <div className="panel-body">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1e0a4a", marginBottom: 2 }}>Calls Booked Goal</div>
                <div style={{ fontSize: 12, color: "#7a6090" }}>
                  {callsBooked} booked / {callsGoal} goal this month
                </div>
              </div>
              <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#c9a84c" }}>{callsPct}%</div>
            </div>
            <div className="prog-wrap">
              <div className="prog-fill" style={{ width: `${callsPct}%`, transition: "width 0.6s ease" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: PR PITCH TRACKER ── */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">PR Pitch Tracker</span>
          <button
            className="btn btn-gold btn-sm"
            onClick={() => { setEditingPitch(null); setShowPitchModal(true); }}
          >
            + Add Pitch
          </button>
        </div>

        {/* Status filter tabs */}
        <div style={{ display: "flex", gap: 4, padding: "10px 24px 0", borderBottom: "1px solid rgba(240,195,112,0.15)" }}>
          {["all", "submitted", "followed_up", "placed", "declined", "pending"].map((s) => (
            <button
              key={s}
              onClick={() => setPitchStatusFilter(s)}
              style={{
                padding: "6px 14px",
                fontSize: 11,
                fontWeight: pitchStatusFilter === s ? 700 : 400,
                color: pitchStatusFilter === s ? "#c9a84c" : "#7a6090",
                background: "transparent",
                border: "none",
                borderBottom: pitchStatusFilter === s ? "2px solid #c9a84c" : "2px solid transparent",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {s === "all" ? `All (${pitches.length})` : `${s.replace("_", " ")} (${pitches.filter((p) => p.status === s).length})`}
            </button>
          ))}
        </div>

        <div className="panel-body" style={{ padding: 0 }}>
          {filteredPitches.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#8a7a9a" }}>
              <p className="serif" style={{ fontSize: 14, marginBottom: 12 }}>No pitches yet. Add your first pitch to start tracking.</p>
              <button className="btn btn-gold" onClick={() => { setEditingPitch(null); setShowPitchModal(true); }}>
                Add First Pitch
              </button>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>Publication</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>DA</th>
                    <th>Potential Reach</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPitches.map((p) => (
                    <tr
                      key={p.id}
                      className="clickable"
                      onClick={() => { setEditingPitch(p); setShowPitchModal(true); }}
                    >
                      <td>
                        <div style={{ fontWeight: 600, color: "#1e0a4a" }}>{p.publication}</div>
                        {p.journalist && <div style={{ fontSize: 11, color: "#8a7a9a", marginTop: 2 }}>{p.journalist}</div>}
                        {p.placement_url && (
                          <a
                            href={p.placement_url}
                            target="_blank"
                            rel="noopener"
                            style={{ fontSize: 11, color: "#c9a84c" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            View placement →
                          </a>
                        )}
                      </td>
                      <td>
                        <span className="pill pill-purple" style={{ fontSize: 10 }}>
                          {PITCH_TYPE_LABELS[p.pitch_type] ?? p.pitch_type}
                        </span>
                      </td>
                      <td>
                        <span className={`pill ${PITCH_STATUS_PILL[p.status] ?? "pill-purple"}`} style={{ fontSize: 10 }}>
                          {p.status.replace("_", " ")}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: "#5a4070" }}>{fmtDate(p.submitted_date)}</td>
                      <td style={{ fontSize: 13, fontWeight: 600, color: "#1e0a4a" }}>{p.domain_authority ?? "—"}</td>
                      <td style={{ fontSize: 13, color: "#5a4070" }}>{fmtNum(p.potential_reach)}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={(e) => { e.stopPropagation(); deletePitch(p.id); }}
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 3: PODCAST BOOKINGS ── */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">Podcast Bookings</span>
          <button
            className="btn btn-gold btn-sm"
            onClick={() => { setEditingPodcast(null); setShowPodcastModal(true); }}
          >
            + Add Podcast
          </button>
        </div>
        <div className="panel-body" style={{ padding: 0 }}>
          {podcasts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#8a7a9a" }}>
              <p className="serif" style={{ fontSize: 14, marginBottom: 12 }}>No podcast bookings yet.</p>
              <button className="btn btn-gold" onClick={() => { setEditingPodcast(null); setShowPodcastModal(true); }}>
                Add First Booking
              </button>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>Show</th>
                    <th>Host</th>
                    <th>Status</th>
                    <th>Record Date</th>
                    <th>Publish Date</th>
                    <th>Listeners/mo</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {podcasts.map((p) => (
                    <tr
                      key={p.id}
                      className="clickable"
                      onClick={() => { setEditingPodcast(p); setShowPodcastModal(true); }}
                    >
                      <td>
                        <div style={{ fontWeight: 600, color: "#1e0a4a" }}>{p.show_name}</div>
                        {p.episode_url && (
                          <a
                            href={p.episode_url}
                            target="_blank"
                            rel="noopener"
                            style={{ fontSize: 11, color: "#c9a84c" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Listen →
                          </a>
                        )}
                      </td>
                      <td style={{ fontSize: 13, color: "#5a4070" }}>{p.host_name ?? "—"}</td>
                      <td>
                        <span className={`pill ${PODCAST_STATUS_PILL[p.booking_status] ?? "pill-purple"}`} style={{ fontSize: 10 }}>
                          {p.booking_status}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: "#5a4070" }}>{fmtDate(p.record_date)}</td>
                      <td style={{ fontSize: 12, color: "#5a4070" }}>{fmtDate(p.publish_date)}</td>
                      <td style={{ fontSize: 13, color: "#5a4070" }}>{fmtNum(p.monthly_listeners)}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={(e) => { e.stopPropagation(); deletePodcast(p.id); }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 4: AI INSIGHTS ── */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">✦ AI Insights</span>
          <button className="btn btn-purple btn-sm" onClick={generateInsights} disabled={generatingInsights}>
            {generatingInsights ? "Generating…" : "Generate AI Insights"}
          </button>
        </div>
        <div className="panel-body">
          {snapshot?.ai_insights ? (
            <>
              <div style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "#8a7a9a",
                marginBottom: 12,
              }}>
                Chrissy&apos;s Analysis · {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </div>
              <div style={{
                fontSize: 14,
                color: "#2a1a40",
                lineHeight: 1.85,
                background: "rgba(30,10,74,0.03)",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: 12,
                padding: "20px 24px",
                whiteSpace: "pre-wrap",
              }}>
                {snapshot.ai_insights}
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: "#8a7a9a" }}>
                Click &ldquo;Generate AI Insights&rdquo; to refresh with latest KPI data.
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "32px 0", color: "#8a7a9a" }}>
              <div className="serif" style={{ fontSize: 18, color: "#1e0a4a", marginBottom: 10 }}>
                No insights generated yet
              </div>
              <p style={{ fontSize: 14, maxWidth: 400, margin: "0 auto 20px", lineHeight: 1.7 }}>
                Click &ldquo;Generate AI Insights&rdquo; to get Chrissy&apos;s strategic recommendations based on this client&apos;s current KPI data.
              </p>
              <button className="btn btn-purple" onClick={generateInsights} disabled={generatingInsights}>
                {generatingInsights ? "Generating…" : "✦ Generate AI Insights"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showPitchModal && (
        <PitchModal
          initial={editingPitch ? {
            publication: editingPitch.publication,
            journalist: editingPitch.journalist,
            pitch_type: editingPitch.pitch_type,
            status: editingPitch.status,
            submitted_date: editingPitch.submitted_date,
            placed_date: editingPitch.placed_date,
            placement_url: editingPitch.placement_url,
            domain_authority: editingPitch.domain_authority,
            potential_reach: editingPitch.potential_reach,
            notes: editingPitch.notes,
          } : EMPTY_PITCH}
          onClose={() => { setShowPitchModal(false); setEditingPitch(null); }}
          onSave={savePitch}
        />
      )}

      {showPodcastModal && (
        <PodcastModal
          initial={editingPodcast ? {
            show_name: editingPodcast.show_name,
            host_name: editingPodcast.host_name,
            booking_status: editingPodcast.booking_status,
            record_date: editingPodcast.record_date,
            publish_date: editingPodcast.publish_date,
            episode_url: editingPodcast.episode_url,
            monthly_listeners: editingPodcast.monthly_listeners,
            notes: editingPodcast.notes,
          } : EMPTY_PODCAST}
          onClose={() => { setShowPodcastModal(false); setEditingPodcast(null); }}
          onSave={savePodcast}
        />
      )}

      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
      )}
    </>
  );
}
