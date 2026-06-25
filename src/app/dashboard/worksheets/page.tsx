"use client";
import { useState } from "react";
import { worksheetLibrary } from "@/lib/mock-data";

const phaseColors: Record<string, string> = {
  CC: "pill-amber",
  AP: "pill-purple",
  VE: "pill-green",
  PM: "pill-gold",
  SFC: "pill-purple",
};

export default function WorksheetsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? worksheetLibrary : worksheetLibrary.filter((w) => w.phase === filter);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["all", "CC", "AP", "VE", "PM", "SFC"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`btn ${filter === f ? "btn-gold" : "btn-outline"} btn-sm`}>
              {f === "all" ? "All Phases" : f}
            </button>
          ))}
        </div>
        <button className="btn btn-gold">+ Create Worksheet</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {filtered.map((ws) => (
          <div key={ws.title} className="panel" style={{ marginBottom: 0 }}>
            <div className="panel-head">
              <span className="panel-title">{ws.title}</span>
              <span className={`pill ${phaseColors[ws.phase]}`}>{ws.phaseName}</span>
            </div>
            <div className="panel-body">
              <p style={{ fontSize: 12, color: "#5a4070", marginBottom: 12, fontStyle: "italic" }}>{ws.description}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#8a7a9a" }}>{ws.fields} fields</span>
                <button className="btn btn-outline btn-sm">Assign</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
