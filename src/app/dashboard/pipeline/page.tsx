import { kpiPipeline, pipelineDeals } from "@/lib/mock-data";

const columns = [
  { key: "discovery" as const, label: "◈ Discovery" },
  { key: "proposal" as const, label: "✦ Proposal Sent" },
  { key: "negotiating" as const, label: "◉ Negotiating" },
  { key: "won" as const, label: "✧ Won / Closing" },
];

export default function PipelinePage() {
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
          { label: "Total Pipeline", value: kpiPipeline.totalPipeline, trend: kpiPipeline.pipelineTrend, color: "#5a8a5a" },
          { label: "Avg. Deal Size", value: kpiPipeline.avgDeal, trend: kpiPipeline.dealTrend, color: "#8a7a50" },
          { label: "Close Rate", value: kpiPipeline.closeRate, trend: kpiPipeline.closeTrend, color: "#5a8a5a" },
          { label: "Est. Close This Month", value: kpiPipeline.estClose, trend: kpiPipeline.estTrend, color: "#5a8a5a" },
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

      {/* Kanban Board */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">Deal Pipeline — Finally Seen Journey</span>
          <span className="pill pill-gold">Kanban View</span>
        </div>
        <div className="panel-body">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {columns.map((col) => (
              <div className="k-col" key={col.key}>
                <div
                  className="serif"
                  style={{
                    fontSize: "9.5px",
                    textTransform: "uppercase",
                    letterSpacing: "1.8px",
                    color: "#5a3090",
                    fontWeight: 700,
                    marginBottom: 10,
                    paddingBottom: 8,
                    borderBottom: "2px solid rgba(240,195,112,0.3)",
                  }}
                >
                  {col.label}
                </div>
                {pipelineDeals[col.key].map((card) => (
                  <div className="k-card" key={card.name}>
                    <div
                      className="serif"
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#1e0a4a",
                        marginBottom: 3,
                      }}
                    >
                      {card.name}
                    </div>
                    <div
                      style={{
                        fontSize: "10.5px",
                        color: "#7a6090",
                        fontStyle: "italic",
                      }}
                    >
                      {card.sub}
                    </div>
                    <div
                      className="serif"
                      style={{
                        fontSize: 11,
                        color: "#c9a84c",
                        fontWeight: 700,
                        marginTop: 5,
                      }}
                    >
                      {card.val}
                    </div>
                    <div style={{ marginTop: 6 }}>
                      <span className={`pill ${card.pillClass}`}>{card.pill}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
