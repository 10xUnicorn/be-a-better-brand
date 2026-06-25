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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
          marginBottom: 26,
        }}
      >
        <div className="kpi-card">
          <div
            className="serif"
            style={{
              fontSize: "9.5px",
              textTransform: "uppercase",
              letterSpacing: "1.8px",
              color: "#7a6090",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            Monthly Recurring Revenue
          </div>
          <div
            className="serif"
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#1e0a4a",
              lineHeight: 1,
            }}
          >
            {kpiOverview.mrr}
          </div>
          <div
            style={{ fontSize: "10.5px", marginTop: 5, color: "#5a8a5a" }}
          >
            {kpiOverview.mrrTrend}
          </div>
        </div>
        <div className="kpi-card">
          <div
            className="serif"
            style={{
              fontSize: "9.5px",
              textTransform: "uppercase",
              letterSpacing: "1.8px",
              color: "#7a6090",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            Active Retainers
          </div>
          <div
            className="serif"
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#1e0a4a",
              lineHeight: 1,
            }}
          >
            {kpiOverview.activeRetainers}
          </div>
          <div
            style={{ fontSize: "10.5px", marginTop: 5, color: "#5a8a5a" }}
          >
            {kpiOverview.retainerTrend}
          </div>
        </div>
        <div className="kpi-card">
          <div
            className="serif"
            style={{
              fontSize: "9.5px",
              textTransform: "uppercase",
              letterSpacing: "1.8px",
              color: "#7a6090",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            Pipeline Value
          </div>
          <div
            className="serif"
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#1e0a4a",
              lineHeight: 1,
            }}
          >
            {kpiOverview.pipelineValue}
          </div>
          <div
            style={{ fontSize: "10.5px", marginTop: 5, color: "#8a7a50" }}
          >
            {kpiOverview.pipelineTrend}
          </div>
        </div>
        <div className="kpi-card">
          <div
            className="serif"
            style={{
              fontSize: "9.5px",
              textTransform: "uppercase",
              letterSpacing: "1.8px",
              color: "#7a6090",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            Media Placements (90d)
          </div>
          <div
            className="serif"
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#1e0a4a",
              lineHeight: 1,
            }}
          >
            {kpiOverview.mediaPlacements}
          </div>
          <div
            style={{ fontSize: "10.5px", marginTop: 5, color: "#5a8a5a" }}
          >
            {kpiOverview.mediaTrend}
          </div>
        </div>
      </div>

      {/* Two-column: Framework + Activity */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 20,
        }}
      >
        {/* Framework Card */}
        <div className="framework-card">
          <div
            className="serif"
            style={{
              fontSize: "9.5px",
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "rgba(240,195,112,0.6)",
              marginBottom: 10,
              fontWeight: 600,
            }}
          >
            Finally Seen Framework™ — Active Clients
          </div>
          {frameworkPhases.map((phase) => (
            <div
              key={phase.num}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 0",
                borderBottom:
                  phase.num < 4
                    ? "1px solid rgba(240,195,112,0.12)"
                    : "none",
              }}
            >
              <div
                className="serif"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
                  color: "#1e0a4a",
                  fontWeight: 700,
                  fontSize: 11,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {phase.num}
              </div>
              <div>
                <div
                  className="serif"
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#f0c370",
                  }}
                >
                  {phase.name}
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: "10.5px",
                    color: "rgba(255,255,255,0.6)",
                    fontStyle: "italic",
                  }}
                >
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
            <span className="panel-title">✦ Recent Activity</span>
            <span className="pill pill-gold">Live Feed</span>
          </div>
          <div className="panel-body">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "10px 0",
                  borderBottom:
                    i < recentActivity.length - 1
                      ? "1px solid rgba(240,195,112,0.12)"
                      : "none",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: item.color,
                    marginTop: 5,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#2a1a40",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.text}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#9a8aaa",
                      fontStyle: "italic",
                    }}
                  >
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
        <div className="panel-body">
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
                  <td>
                    <strong>{row.offer}</strong>
                  </td>
                  <td>{row.price}</td>
                  <td>{row.active}</td>
                  <td>{row.mrr}</td>
                  <td>{row.duration}</td>
                  <td>
                    <span className={`pill ${row.pillClass}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
