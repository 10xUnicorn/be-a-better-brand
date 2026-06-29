"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { financeInvoices } from "@/lib/mock-data";

const statusColor: Record<string, string> = {
  Paid: "pill-green",
  Sent: "pill-amber",
  Draft: "pill-purple",
  Overdue: "pill-red",
  Void: "pill-purple",
};

export default function FinancePage() {
  const router = useRouter();
  const [showCreate, setShowCreate] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<typeof financeInvoices[0] | null>(null);

  return (
    <>
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Revenue This Month", value: "$43,500", trend: "▲ 12% vs May", color: "#5a8a5a" },
          { label: "Outstanding Invoices", value: "3", trend: "◆ $11,200 total", color: "#8a7a50" },
          { label: "Collection Rate", value: "96%", trend: "▲ On target", color: "#5a8a5a" },
          { label: "Overdue", value: "1", trend: "▼ $1,200 — Brianna K.", color: "#b05050" },
        ].map((kpi) => (
          <div className="kpi-card" key={kpi.label}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1.8px", color: "#7a6090", marginBottom: 10, fontWeight: 600 }}>{kpi.label}</div>
            <div className="serif" style={{ fontSize: 30, fontWeight: 700, color: "#1e0a4a", lineHeight: 1 }}>{kpi.value}</div>
            <div style={{ fontSize: 13, marginTop: 6, color: kpi.color }}>{kpi.trend}</div>
          </div>
        ))}
      </div>

      {/* Invoices */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">Invoices</span>
          <button className="btn btn-gold btn-sm" onClick={() => setShowCreate(true)}>+ Create Invoice</button>
        </div>
        <div className="panel-body" style={{ padding: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Amount</th>
                <th>Offer</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Stripe ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {financeInvoices.map((inv) => (
                <tr key={inv.stripeId} className="clickable" onClick={() => setSelectedInvoice(inv)} style={{ cursor: "pointer" }}>
                  <td><strong>{inv.client}</strong></td>
                  <td style={{ fontWeight: 600, color: "#1e0a4a" }}>{inv.amount}</td>
                  <td style={{ fontSize: 13 }}>{inv.offer}</td>
                  <td><span className={`pill ${statusColor[inv.status] || "pill-purple"}`}>{inv.status}</span></td>
                  <td style={{ fontSize: 13 }}>{inv.due}</td>
                  <td style={{ fontSize: 12, color: "#8a7a9a", fontFamily: "monospace" }}>{inv.stripeId}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: "flex", gap: 6 }}>
                      {inv.status !== "Paid" && inv.status !== "Void" && (
                        <button className="btn btn-gold btn-sm" onClick={(e) => { e.stopPropagation(); setSelectedInvoice(inv); }}>Send</button>
                      )}
                      <button className="btn btn-outline btn-sm" onClick={(e) => { e.stopPropagation(); setSelectedInvoice(inv); }}>View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="modal-overlay" onClick={() => setSelectedInvoice(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1e0a4a" }}>Invoice — {selectedInvoice.client}</h3>
              <span className={`pill ${statusColor[selectedInvoice.status] || "pill-purple"}`}>{selectedInvoice.status}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div><label>Client</label><input defaultValue={selectedInvoice.client} /></div>
              <div><label>Amount</label><input defaultValue={selectedInvoice.amount} /></div>
              <div><label>Offer / Description</label><input defaultValue={selectedInvoice.offer} /></div>
              <div><label>Due Date</label><input defaultValue={selectedInvoice.due} /></div>
              <div><label>Status</label>
                <select defaultValue={selectedInvoice.status}>
                  <option>Draft</option><option>Sent</option><option>Paid</option><option>Overdue</option><option>Void</option>
                </select>
              </div>
              <div><label>Stripe Invoice ID</label><input defaultValue={selectedInvoice.stripeId} style={{ fontFamily: "monospace", fontSize: 12 }} /></div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", borderTop: "1px solid rgba(240,195,112,0.2)", paddingTop: 16 }}>
              <button className="btn btn-outline btn-sm" onClick={() => setSelectedInvoice(null)}>Cancel</button>
              <button className="btn btn-gold" onClick={() => setSelectedInvoice(null)}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1e0a4a", marginBottom: 24 }}>Create Invoice</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><label>Client</label>
                <select><option value="">Select client...</option><option>Danielle R.</option><option>Sarah M.</option><option>Christine L.</option><option>Yolanda T.</option><option>Brianna K.</option></select>
              </div>
              <div><label>Offer Tier</label>
                <select>
                  <option>Brand Architecture Gap Session — $750</option>
                  <option>Visibility Retainer — $5,000/mo</option>
                  <option>Book Launch Sprint — $5,000/mo</option>
                  <option>Fractional CMO — $8,500/mo</option>
                  <option>Six Figure Chicks — $1,200/mo</option>
                  <option>Custom</option>
                </select>
              </div>
              <div><label>Amount ($)</label><input type="number" placeholder="5000" /></div>
              <div><label>Due Date</label><input type="date" /></div>
            </div>
            <div style={{ marginTop: 16 }}>
              <label>Notes / Description</label>
              <textarea rows={2} placeholder="Additional notes..." />
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
              <button className="btn btn-outline" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn btn-gold" onClick={() => setShowCreate(false)}>Create &amp; Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
