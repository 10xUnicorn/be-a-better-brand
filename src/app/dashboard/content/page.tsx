import { contentCalendar } from "@/lib/mock-data";

export default function ContentPage() {
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
          { label: "Content Published (30d)", value: "14", trend: "▲ 3 more than May", color: "#5a8a5a" },
          { label: "PR Pitches Active", value: "8", trend: "◆ 4 outlets pending", color: "#8a7a50" },
          { label: "UpLevel Episodes (YTD)", value: "24", trend: "▲ Ep. 95 in production", color: "#5a8a5a" },
          { label: "Newsletter Open Rate", value: "61%", trend: "▲ Industry avg: 22%", color: "#5a8a5a" },
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

      {/* Two-column: Calendar + AI Composer */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* Content Calendar */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Content Calendar — June 2025</span>
            <span className="pill pill-gold">This Month</span>
          </div>
          <div className="panel-body">
            {contentCalendar.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "10px 0",
                  borderBottom: i < contentCalendar.length - 1 ? "1px solid rgba(240,195,112,0.12)" : "none",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    minWidth: 42,
                    textAlign: "center",
                    background: "linear-gradient(135deg, #1e0a4a, #331081)",
                    borderRadius: 8,
                    padding: "6px 4px",
                    color: "#f0c370",
                  }}
                >
                  <div className="serif" style={{ fontSize: 16, fontWeight: 700, lineHeight: 1 }}>{item.day}</div>
                  <div className="serif" style={{ fontSize: "8.5px", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.75 }}>{item.month}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#1e0a4a", marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: "10.5px", color: "#7a6090", fontStyle: "italic" }}>{item.type}</div>
                </div>
                <span className={`pill ${item.statusClass}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Content Composer */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">AI Content Composer</span>
            <span className="pill pill-purple">AI Brain™</span>
          </div>
          <div className="panel-body">
            <div style={{ marginBottom: 16 }}>
              <label>Content Type</label>
              <select defaultValue="">
                <option value="" disabled>Select content type...</option>
                <option>LinkedIn Post</option>
                <option>Newsletter Intro</option>
                <option>Press Pitch Email</option>
                <option>Podcast Show Notes</option>
                <option>Instagram Caption</option>
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Topic / Brief</label>
              <textarea rows={3} placeholder="Describe the topic, angle, or key message..." />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Client Context (Optional)</label>
              <select defaultValue="">
                <option value="">No specific client</option>
                <option>Danielle R. — Visibility Retainer</option>
                <option>Sarah M. — Book Launch Sprint</option>
                <option>Christine L. — Fractional CMO</option>
              </select>
            </div>
            <button className="btn btn-gold" style={{ width: "100%" }}>
              ✦ Generate Draft
            </button>
            <div className="ai-card" style={{ marginTop: 16 }}>
              <div className="serif" style={{ fontSize: 12, fontWeight: 700, color: "#1e0a4a", marginBottom: 4 }}>
                ✧ AI-generated content will appear here
              </div>
              <div style={{ fontSize: "11.5px", color: "#5a4070", fontStyle: "italic", lineHeight: 1.6 }}>
                Select a content type and provide a brief to generate a draft. AI output is a suggestion — review and edit before publishing.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PR & Media Tracker */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">PR & Media Tracker</span>
          <span className="pill pill-purple">8 Active Pitches</span>
        </div>
        <div className="panel-body">
          <table>
            <thead>
              <tr>
                <th>Outlet</th>
                <th>Client</th>
                <th>Pitch Date</th>
                <th>Status</th>
                <th>Journalist</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                { outlet: "Forbes.com", client: "Danielle R.", date: "May 10", status: "Placed", statusClass: "pill-green", journalist: "Jennifer W.", notes: "Feature live May 28" },
                { outlet: "Inc. Magazine", client: "Monica T.", date: "May 22", status: "Editing", statusClass: "pill-amber", journalist: "Marcus D.", notes: "Revisions due June 5" },
                { outlet: "Fast Company", client: "Sarah M.", date: "Jun 3", status: "Pitched", statusClass: "pill-purple", journalist: "Alicia R.", notes: "Follow-up scheduled" },
                { outlet: "Entrepreneur", client: "Lisa W.", date: "Jun 8", status: "In Review", statusClass: "pill-gold", journalist: "David K.", notes: "Editor reviewing" },
                { outlet: "Harvard Business Review", client: "Christine L.", date: "Jun 12", status: "Pitched", statusClass: "pill-purple", journalist: "Sarah T.", notes: "Initial contact" },
              ].map((p) => (
                <tr key={p.outlet}>
                  <td><strong>{p.outlet}</strong></td>
                  <td>{p.client}</td>
                  <td>{p.date}</td>
                  <td><span className={`pill ${p.statusClass}`}>{p.status}</span></td>
                  <td>{p.journalist}</td>
                  <td style={{ fontSize: 11, color: "#7a6090", fontStyle: "italic" }}>{p.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
