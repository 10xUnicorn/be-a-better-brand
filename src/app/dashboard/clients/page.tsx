import { kpiClients, clientRoster } from "@/lib/mock-data";

export default function ClientsPage() {
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
          { label: "Total Active Clients", value: kpiClients.totalActive, trend: kpiClients.activeTrend, color: "#5a8a5a" },
          { label: "Avg. Framework Phase", value: kpiClients.avgPhase, trend: kpiClients.phaseTrend, color: "#8a7a50" },
          { label: "Retention Rate", value: kpiClients.retention, trend: kpiClients.retentionTrend, color: "#5a8a5a" },
          { label: "NPS Score", value: kpiClients.nps, trend: kpiClients.npsTrend, color: "#5a8a5a" },
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

      {/* Client Roster Table */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">Client Roster — Finally Seen Journey</span>
          <span className="pill pill-gold">{clientRoster.length} Active</span>
        </div>
        <div className="panel-body">
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
              {clientRoster.map((c) => (
                <tr key={c.name}>
                  <td><strong>{c.name}</strong></td>
                  <td>{c.type}</td>
                  <td>{c.offer}</td>
                  <td><span className={`pill ${c.phaseClass}`}>{c.phase}</span></td>
                  <td>{c.mrr}</td>
                  <td>{c.renewal}</td>
                  <td><span className={`pill ${c.healthClass}`}>{c.health}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
