"use client";
import { useState, use } from "react";
import Link from "next/link";
import { clientRoster, journeyData } from "@/lib/mock-data";

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("profile");

  // In production, fetch from Supabase by ID. For demo, use first matching client or fallback.
  const client = clientRoster[parseInt(id) || 0] || clientRoster[0];

  const tabs = ["profile", "journey", "worksheets", "files", "notes", "payments", "activity"];

  return (
    <>
      <Link href="/dashboard/clients" style={{ fontSize: 12, color: "#c9a84c", textDecoration: "none", marginBottom: 16, display: "inline-block" }}>
        ← Back to Clients
      </Link>

      {/* Client header */}
      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-body" style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #c9a84c, #e8c97a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#1e0a4a", flexShrink: 0 }}>
            {client.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1e0a4a", marginBottom: 4 }}>{client.name}</h2>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span className={`pill ${client.phaseClass}`}>{client.phase}</span>
              <span className={`pill ${client.healthClass}`}>{client.health}</span>
              <span style={{ fontSize: 12, color: "#5a4070" }}>{client.offer}</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="serif" style={{ fontSize: 24, fontWeight: 700, color: "#1e0a4a" }}>{client.mrr}</div>
            <div style={{ fontSize: 11, color: "#7a6090" }}>MRR • Renewal {client.renewal}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid rgba(240,195,112,0.25)", paddingBottom: 0 }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="serif"
            style={{
              padding: "8px 16px",
              fontSize: 12,
              fontWeight: activeTab === tab ? 700 : 400,
              color: activeTab === tab ? "#c9a84c" : "#7a6090",
              background: "transparent",
              border: "none",
              borderBottom: activeTab === tab ? "2px solid #c9a84c" : "2px solid transparent",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "profile" && (
        <div className="panel">
          <div className="panel-body">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><label>Full Name</label><input defaultValue={client.name} /></div>
              <div><label>Client Type</label><input defaultValue={client.type} /></div>
              <div><label>Offer Tier</label><input defaultValue={client.offer} /></div>
              <div><label>MRR</label><input defaultValue={client.mrr} /></div>
              <div><label>Renewal Date</label><input defaultValue={client.renewal} /></div>
              <div><label>Current Phase</label><input defaultValue={client.phase} /></div>
            </div>
            <div style={{ marginTop: 16 }}>
              <label>Notes</label>
              <textarea rows={4} placeholder="Internal notes about this client..." />
            </div>
            <button className="btn btn-gold" style={{ marginTop: 16 }}>Save Changes</button>
          </div>
        </div>
      )}

      {activeTab === "journey" && (
        <div>
          {journeyData.map((phase) => (
            <div key={phase.phase} className="panel">
              <div className="panel-head">
                <span className="panel-title">Phase {phase.phase}: {phase.name}</span>
                <span className={`pill ${phase.status === "complete" ? "pill-green" : phase.status === "in_progress" ? "pill-amber" : "pill-purple"}`}>
                  {phase.status === "complete" ? "Complete" : phase.status === "in_progress" ? "Active" : "Pending"}
                </span>
              </div>
              <div className="panel-body">
                {phase.milestones.map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                    <span style={{ color: m.status === "complete" ? "#2a7a3a" : "#ccc" }}>{m.status === "complete" ? "✓" : "○"}</span>
                    <span style={{ fontSize: 12.5, color: "#2a1a40" }}>{m.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "worksheets" && (
        <div className="panel">
          <div className="panel-body" style={{ textAlign: "center", padding: 40, color: "#8a7a9a" }}>
            <p className="serif" style={{ fontSize: 14 }}>No worksheets assigned yet.</p>
            <button className="btn btn-gold" style={{ marginTop: 12 }}>Assign Worksheet</button>
          </div>
        </div>
      )}

      {(activeTab === "files" || activeTab === "notes" || activeTab === "payments" || activeTab === "activity") && (
        <div className="panel">
          <div className="panel-body" style={{ textAlign: "center", padding: 40, color: "#8a7a9a" }}>
            <p className="serif" style={{ fontSize: 14, textTransform: "capitalize" }}>{activeTab} will appear here once connected to Supabase.</p>
          </div>
        </div>
      )}
    </>
  );
}
