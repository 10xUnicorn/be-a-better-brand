import {
  kpiOverview,
  frameworkPhases,
  recentActivity,
  offerMix,
} from "@/lib/mock-data";

export default function OverviewPage() {
  return (
    <>
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Monthly Recurring Revenue", value: kpiOverview.mrr, trend: kpiOverview.mrrTrend, color: "#5a8a5a" },
          { label: "Active Retainers", value: kpiOverview.activeRetainers, trend: kpiOverview.retainerTrend, color: "#5a8a5a" },
          { label: "Pipeline Value", value: kpiOverview.pipelineValue, trend: kpiOverview.pipelineTrend, color: "#8a7a50" },
          { label: "Media Placements (90d)", value: kpiOverview.mediaPlacements, trend: kpiOverview.mediaTrend, color: "#5a8a5a" },
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

      {/* Two-column: Framework + Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 22 }}>
        {/* Framework Card */}
        <div className="framework-card">
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "2px", color: "rgba(240,195,112,0.6)", marginBottom: 14, fontWeight: 600 }}>
            Finally Seen Framework&trade; — Active Clients
          </div>
          {frameworkPhases.map((phase) => (
            <div
              key={phase.num}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "11px 0",
                borderBottom: phase.num < 4 ? "1px solid rgba(240,195,112,0.12)" : "none",
              }}
            >
              <div className="serif" style={{
                width: 30, height: 30, borderRadius: "50%",
                background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
                color: "#1e0a4a", fontWeight: 700, fontSize: 13,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {phase.num}
              </div>
              <div>
                <div className="serif" style={{ fontSize: 15, fontWeight: 700, color: "#f0c370" }}>
                  {phase.name}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontStyle: "italic" }}>
                  {phase.sub}
                </div>
              </div>
              <span className={`pill ${phase.pillClass}`} style={{ marginLeft: "auto" }}>
                {phase.pill}
              </span>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">{"\u2726"} Recent Activity</span>
            <span className="pill pill-gold">Live Feed</span>
          </div>
          <div className="panel-body">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 14, padding: "12px 0",
                  borderBottom: i < recentActivity.length - 1 ? "1px solid rgba(240,195,112,0.12)" : "none",
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color, marginTop: 5, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 14, color: "#2a1a40", lineHeight: 1.5 }}>
                    {item.text}
                  </div>
                  <div style={{ fontSize: 12, color: "#9a8aaa", fontStyle: "italic", marginTop: 2 }}>
                    {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offer Mix Table */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">Offer Mix — Active Engagements</span>
          <span className="pill pill-purple">Q2 2025</span>
        </div>
        <div className="panel-body" style={{ padding: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Offer</th>
                <th>Price</th>
                <th>Active</th>
                <th>MRR Contribution</th>
                <th>Avg. Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {offerMix.map((row) => (
                <tr key={row.offer}>
                  <td><strong>{row.offer}</strong></td>
                  <td>{row.price}</td>
                  <td>{row.active}</td>
                  <td style={{ fontWeight: 600 }}>{row.mrr}</td>
                  <td>{row.duration}</td>
                  <td><span className={`pill ${row.pillClass}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
