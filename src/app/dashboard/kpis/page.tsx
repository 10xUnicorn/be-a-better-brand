import {
  kpiReports,
  revenueByOffer,
  visibilityPlacements,
  aiDiagnostics,
} from "@/lib/mock-data";

export default function KpisPage() {
  return (
    <>
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "YTD Revenue", value: kpiReports.ytdRevenue, trend: kpiReports.ytdTrend, color: "#5a8a5a" },
          { label: "Avg. Client LTV", value: kpiReports.avgLtv, trend: kpiReports.ltvTrend, color: "#5a8a5a" },
          { label: "Lead-to-Close Rate", value: kpiReports.closeRate, trend: kpiReports.closeTrend, color: "#8a7a50" },
          { label: "Podcast Downloads (30d)", value: kpiReports.podcastDownloads, trend: kpiReports.podcastTrend, color: "#5a8a5a" },
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

      {/* Two-column: Revenue + Visibility */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 22 }}>
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Revenue by Offer — Q2 2025</span>
          </div>
          <div className="panel-body">
            {revenueByOffer.map((item) => (
              <div key={item.name} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#2a1a40", marginBottom: 5 }}>
                  <span>{item.name}</span>
                  <span style={{ fontWeight: 700, color: "#c9a84c" }}>{item.amount}</span>
                </div>
                <div className="prog-wrap">
                  <div className="prog-fill" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Visibility Metrics</span>
          </div>
          <div className="panel-body">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 18 }}>
              {[
                { v: "23", l: "Placements" },
                { v: "6", l: "Podcasts" },
                { v: "4", l: "Features" },
              ].map((s) => (
                <div key={s.l} style={{ background: "rgba(255,255,255,0.78)", border: "1px solid rgba(240,195,112,0.22)", borderRadius: 12, padding: "16px 18px", textAlign: "center", boxShadow: "0 1px 8px rgba(30,10,74,0.05)" }}>
                  <div className="serif" style={{ fontSize: 26, fontWeight: 700, color: "#1e0a4a" }}>{s.v}</div>
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1.5px", color: "#8a7a9a", marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <table>
              <thead><tr><th>Publication</th><th>Client</th><th>Status</th></tr></thead>
              <tbody>
                {visibilityPlacements.map((p) => (
                  <tr key={p.publication}>
                    <td>{p.publication}</td>
                    <td>{p.client}</td>
                    <td><span className={`pill ${p.pillClass}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AI Diagnostics */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">AI Brand Diagnostics — Constraint Alerts</span>
          <span className="pill pill-purple">AI Brain&trade;</span>
        </div>
        <div className="panel-body">
          {aiDiagnostics.map((d, i) => (
            <div className="ai-card" key={i}>
              <div className="serif" style={{ fontSize: 15, fontWeight: 700, color: "#1e0a4a", marginBottom: 6 }}>
                {d.icon} {d.title}
              </div>
              <div style={{ fontSize: 14, color: "#5a4070", fontStyle: "italic", lineHeight: 1.7 }}>
                {d.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
