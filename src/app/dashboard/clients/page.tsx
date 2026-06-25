"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { kpiClients, clientRoster } from "@/lib/mock-data";

export default function ClientsPage() {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <>
      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {[
          { label: "Total Active Clients", value: kpiClients.totalActive, trend: kpiClients.activeTrend, color: "#5a8a5a" },
          { label: "Avg. Framework Phase", value: kpiClients.avgPhase, trend: kpiClients.phaseTrend, color: "#8a7a50" },
          { label: "Retention Rate", value: kpiClients.retention, trend: kpiClients.retentionTrend, color: "#5a8a5a" },
          { label: "NPS Score", value: kpiClients.nps, trend: kpiClients.npsTrend, color: "#5a8a5a" },
        ].map((kpi) => (
          <div className="kpi-card" key={kpi.label}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1.8px", color: "#7a6090", marginBottom: 10, fontWeight: 600 }}>
              {kpi.label}
            </div>
            <div className="serif" style={{ fontSize: 30, fontWeight: 700, color: "#1e0a4a", lineHeight: 1 }}>
              {kpi.value}
            </div>
            <div style={{ fontSize: 13, marginTop: 6, color: kpi.color }}>{kpi.trend}</div>
          </div>
        ))}
      </div>

      {/* Client Roster Table */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">Client Roster — Finally Seen Journey</span>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span className="pill pill-gold">{clientRoster.length} Active</span>
            <button className="btn btn-gold btn-sm" onClick={() => setShowAdd(true)}>+ Add Client</button>
          </div>
        </div>
        <div className="panel-body" style={{ padding: 0 }}>
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
              {clientRoster.map((c, i) => (
                <tr
                  key={c.name}
                  className="clickable"
                  onClick={() => router.push(`/dashboard/clients/${i}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700, color: "#1e0a4a", flexShrink: 0
                      }}>
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <strong>{c.name}</strong>
                    </div>
                  </td>
                  <td>{c.type}</td>
                  <td>{c.offer}</td>
                  <td><span className={`pill ${c.phaseClass}`}>{c.phase}</span></td>
                  <td style={{ fontWeight: 600 }}>{c.mrr}</td>
                  <td>{c.renewal}</td>
                  <td><span className={`pill ${c.healthClass}`}>{c.health}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1e0a4a", marginBottom: 24 }}>Add New Client</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><label>Full Name</label><input placeholder="Client name" /></div>
              <div><label>Email</label><input type="email" placeholder="email@company.com" /></div>
              <div><label>Phone</label><input placeholder="(555) 000-0000" /></div>
              <div><label>Client Type</label>
                <select>
                  <option value="">Select type...</option>
                  <option>Author</option>
                  <option>Founder</option>
                  <option>Speaker</option>
                  <option>CEO</option>
                </select>
              </div>
              <div><label>Offer Tier</label>
                <select>
                  <option value="">Select offer...</option>
                  <option value="gap_session">Brand Architecture Gap Session ($750)</option>
                  <option value="retainer">Visibility Retainer ($5,000/mo)</option>
                  <option value="book_launch">Book Launch Sprint ($5,000/mo)</option>
                  <option value="fractional_cmo">Fractional CMO ($5,000-$8,500/mo)</option>
                  <option value="sfc">Six Figure Chicks</option>
                </select>
              </div>
              <div><label>Contract End Date</label><input type="date" /></div>
            </div>
            <div style={{ marginTop: 16 }}>
              <label>Notes</label>
              <textarea rows={3} placeholder="Internal notes about this client..." />
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 20 }}>
              <button className="btn btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn btn-gold" onClick={() => setShowAdd(false)}>Save Client</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
