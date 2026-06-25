import { financeInvoices } from "@/lib/mock-data";

export default function FinancePage() {
  return (
    <>
      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
          marginBottom: 26,
        }}
      >
        {[
          { label: "Revenue This Month", value: "$43,500", trend: "▲ 12% vs May", color: "#5a8a5a" },
          { label: "Outstanding Invoices", value: "3", trend: "◆ $11,200 total", color: "#8a7a50" },
          { label: "Collection Rate", value: "96%", trend: "▲ On target", color: "#5a8a5a" },
          { label: "Overdue", value: "1", trend: "▼ $1,200 — Brianna K.", color: "#b05050" },
        ].map((kpi) => (
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

      {/* Two-column: Quick Actions + Revenue Breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* Quick Actions */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Quick Actions</span>
          </div>
          <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button className="btn btn-gold" style={{ width: "100%", textAlign: "center" }}>
              + Create Invoice
            </button>
            <button className="btn btn-purple" style={{ width: "100%", textAlign: "center" }}>
              Set Up Recurring Subscription
            </button>
            <button className="btn btn-outline" style={{ width: "100%", textAlign: "center", color: "#5a3090", borderColor: "rgba(90,48,144,0.3)" }}>
              View Stripe Dashboard →
            </button>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Revenue Breakdown — June</span>
          </div>
          <div className="panel-body">
            {[
              { label: "Retainer Payments", amount: "$25,000", pct: 58 },
              { label: "Book Launch Sprint", amount: "$10,000", pct: 23 },
              { label: "Fractional CMO", amount: "$8,500", pct: 20 },
              { label: "Gap Sessions", amount: "$2,250", pct: 5 },
              { label: "Six Figure Chicks", amount: "$4,800", pct: 11 },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#2a1a40", marginBottom: 4 }}>
                  <span>{item.label}</span>
                  <span style={{ fontWeight: 700, color: "#c9a84c" }}>{item.amount}</span>
                </div>
                <div className="prog-wrap">
                  <div className="prog-fill" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">Recent Invoices</span>
          <span className="pill pill-gold">Stripe Connected</span>
        </div>
        <div className="panel-body">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Amount</th>
                <th>Offer</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Stripe ID</th>
              </tr>
            </thead>
            <tbody>
              {financeInvoices.map((inv) => (
                <tr key={inv.stripeId}>
                  <td><strong>{inv.client}</strong></td>
                  <td>{inv.amount}</td>
                  <td>{inv.offer}</td>
                  <td><span className={`pill ${inv.statusClass}`}>{inv.status}</span></td>
                  <td>{inv.due}</td>
                  <td style={{ fontSize: 11, color: "#8a7a9a", fontFamily: "monospace" }}>{inv.stripeId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
