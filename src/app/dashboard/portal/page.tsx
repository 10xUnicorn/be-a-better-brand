import { portalDeliverables, portalMessages } from "@/lib/mock-data";

export default function PortalPage() {
  return (
    <>
      {/* Portal Welcome Banner */}
      <div className="portal-banner">
        <div>
          <h2 className="serif" style={{ fontSize: 20, color: "#f0c370", fontWeight: 700 }}>
            Welcome back, Danielle
          </h2>
          <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.7)", marginTop: 4, fontStyle: "italic" }}>
            You&apos;re in Phase 3: Visibility Engine — your Forbes feature is coming up!
          </p>
        </div>
        <button className="btn btn-gold">View My Journey →</button>
      </div>

      {/* Journey Progress */}
      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-head">
          <span className="panel-title">✦ Finally Seen Framework — Your Journey</span>
          <span className="pill pill-purple">Phase 3 of 4</span>
        </div>
        <div className="panel-body">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[
              { num: 1, name: "Clarity Core", status: "Complete", active: false, complete: true },
              { num: 2, name: "Authority Positioning", status: "Complete", active: false, complete: true },
              { num: 3, name: "Visibility Engine", status: "In Progress", active: true, complete: false },
              { num: 4, name: "Proof & Momentum", status: "Upcoming", active: false, complete: false },
            ].map((phase) => (
              <div
                key={phase.num}
                style={{
                  background: phase.active
                    ? "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(240,195,112,0.08))"
                    : "rgba(255,255,255,0.5)",
                  border: phase.active
                    ? "2px solid rgba(201,168,76,0.4)"
                    : "1px solid rgba(240,195,112,0.2)",
                  borderRadius: 11,
                  padding: "16px 14px",
                  textAlign: "center",
                }}
              >
                <div
                  className="serif"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: phase.complete
                      ? "linear-gradient(135deg, #2a7a3a, #3a9a4a)"
                      : phase.active
                      ? "linear-gradient(135deg, #c9a84c, #e8c97a)"
                      : "rgba(138,122,154,0.2)",
                    color: phase.complete || phase.active ? "#fff" : "#8a7a9a",
                    fontWeight: 700,
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 8px",
                  }}
                >
                  {phase.complete ? "✓" : phase.num}
                </div>
                <div className="serif" style={{ fontSize: 12, fontWeight: 700, color: phase.active ? "#c9a84c" : "#1e0a4a", marginBottom: 4 }}>
                  {phase.name}
                </div>
                <span className={`pill ${phase.complete ? "pill-green" : phase.active ? "pill-gold" : "pill-amber"}`} style={{ fontSize: 9 }}>
                  {phase.status}
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4, color: "#5a4070" }}>
              <span>Overall Progress</span>
              <span style={{ fontWeight: 700, color: "#c9a84c" }}>65%</span>
            </div>
            <div className="prog-wrap" style={{ height: 10 }}>
              <div className="prog-fill" style={{ width: "65%", height: 10 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Two-column: Deliverables + Messages */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* Deliverables */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Your Deliverables</span>
            <span className="pill pill-gold">{portalDeliverables.length} Items</span>
          </div>
          <div className="panel-body">
            {portalDeliverables.map((d, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom: i < portalDeliverables.length - 1 ? "1px solid rgba(240,195,112,0.12)" : "none",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(240,195,112,0.08))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  📄
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#1e0a4a", marginBottom: 2 }}>{d.title}</div>
                  <div style={{ fontSize: "10.5px", color: "#7a6090", fontStyle: "italic" }}>{d.phase} · {d.date}</div>
                </div>
                <span className={`pill ${d.statusClass}`}>{d.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Team Messages</span>
            <span className="pill pill-green">3 New</span>
          </div>
          <div className="panel-body">
            {portalMessages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom: i < portalMessages.length - 1 ? "1px solid rgba(240,195,112,0.12)" : "none",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: msg.isTeam
                      ? "linear-gradient(135deg, #1e0a4a, #331081)"
                      : "linear-gradient(135deg, #c9a84c, #e8c97a)",
                    color: msg.isTeam ? "#f0c370" : "#1e0a4a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {msg.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#1e0a4a" }}>{msg.from}</span>
                    <span style={{ fontSize: 10, color: "#9a8aaa", fontStyle: "italic" }}>{msg.time}</span>
                  </div>
                  <div style={{ fontSize: "11.5px", color: "#5a4070", lineHeight: 1.5 }}>{msg.message}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <input type="text" placeholder="Type a message..." style={{ flex: 1 }} />
                <button className="btn btn-gold btn-sm">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* File Vault */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">File Vault</span>
          <button className="btn btn-gold btn-sm">+ Upload File</button>
        </div>
        <div className="panel-body">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[
              { name: "Brand Guidelines v3.pdf", size: "2.4 MB", date: "Jun 10" },
              { name: "Media Kit 2025.zip", size: "18.7 MB", date: "May 28" },
              { name: "Headshots_Final.zip", size: "45.2 MB", date: "May 15" },
              { name: "Press Release Draft.docx", size: "124 KB", date: "Jun 12" },
            ].map((file) => (
              <div
                key={file.name}
                style={{
                  background: "rgba(240,195,112,0.06)",
                  border: "1px solid rgba(240,195,112,0.2)",
                  borderRadius: 9,
                  padding: "14px 12px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 6 }}>📁</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#1e0a4a", marginBottom: 2 }}>{file.name}</div>
                <div style={{ fontSize: 10, color: "#8a7a9a" }}>{file.size} · {file.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
