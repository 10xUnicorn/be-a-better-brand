import { journeyData } from "@/lib/mock-data";

const phaseColors: Record<string, string> = {
  complete: "#2a7a3a",
  in_progress: "#c9a84c",
  not_started: "#8a7a9a",
};

const statusPill: Record<string, string> = {
  complete: "pill-green",
  in_progress: "pill-amber",
  not_started: "pill-purple",
  blocked: "pill-red",
};

export default function JourneyPage() {
  return (
    <>
      {/* Journey progress bar */}
      <div className="panel" style={{ marginBottom: 24 }}>
        <div className="panel-body">
          <div className="serif" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "2px", color: "#7a6090", marginBottom: 10, fontWeight: 600 }}>
            Finally Seen Framework™ — Your Journey
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            {journeyData.map((p) => (
              <div key={p.phase} style={{ flex: 1, height: 8, borderRadius: 4, background: p.status === "complete" ? "linear-gradient(90deg, #c9a84c, #e8c97a)" : p.status === "in_progress" ? "rgba(240,195,112,0.4)" : "rgba(240,195,112,0.15)" }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {journeyData.map((p) => (
              <span key={p.phase} className="serif" style={{ fontSize: 10, color: phaseColors[p.status], fontWeight: 600 }}>
                Phase {p.phase}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Phase timeline */}
      {journeyData.map((phase) => (
        <div key={phase.phase} className="panel">
          <div className="panel-head">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: phase.status === "complete" ? "linear-gradient(135deg, #2a7a3a, #4a9a5a)" : phase.status === "in_progress" ? "linear-gradient(135deg, #c9a84c, #e8c97a)" : "linear-gradient(135deg, #8a7a9a, #aaa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>
                {phase.status === "complete" ? "✓" : phase.phase}
              </div>
              <span className="panel-title" style={{ fontSize: 15 }}>Phase {phase.phase}: {phase.name}</span>
            </div>
            <span className={`pill ${statusPill[phase.status]}`}>
              {phase.status === "complete" ? "Complete" : phase.status === "in_progress" ? "In Progress" : "Not Started"}
            </span>
          </div>
          <div className="panel-body">
            {phase.milestones.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: i < phase.milestones.length - 1 ? "1px solid rgba(240,195,112,0.12)" : "none" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${m.status === "complete" ? "#2a7a3a" : m.status === "in_progress" ? "#c9a84c" : "#ccc"}`, background: m.status === "complete" ? "#2a7a3a" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", flexShrink: 0 }}>
                  {m.status === "complete" && "✓"}
                </div>
                <span style={{ flex: 1, fontSize: 12.5, color: "#2a1a40" }}>{m.title}</span>
                <span className={`pill ${statusPill[m.status]}`}>
                  {m.status === "complete" ? "Done" : m.status === "in_progress" ? "Active" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
