"use client";

import { useState } from "react";
import { worksheetLibrary } from "@/lib/mock-data";
import { clientRoster } from "@/lib/mock-data";

const phaseColors: Record<string, string> = {
  CC: "pill-amber", AP: "pill-purple", VE: "pill-green", PM: "pill-gold", SFC: "pill-purple",
};

const phaseNames: Record<string, string> = {
  CC: "Clarity Core", AP: "Authority Positioning", VE: "Visibility Engine", PM: "Proof & Momentum", SFC: "Six Figure Chicks",
};

const fieldTypes = ["short_text","long_text","multiple_choice","checkbox","scale","file_upload","section_header","instructional_text"];

type Field = { id: string; type: string; label: string; required: boolean; options?: string; sort_order: number };

export default function WorksheetsPage() {
  const [filter, setFilter] = useState("all");
  const [selectedWs, setSelectedWs] = useState<typeof worksheetLibrary[0] | null>(null);
  const [showAssign, setShowAssign] = useState<typeof worksheetLibrary[0] | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newFields, setNewFields] = useState<Field[]>([
    { id: "f1", type: "long_text", label: "", required: true, sort_order: 1 },
  ]);

  const filtered = filter === "all" ? worksheetLibrary : worksheetLibrary.filter((w) => w.phase === filter);

  const addField = () => {
    setNewFields((prev) => [...prev, {
      id: `f${prev.length + 1}`, type: "short_text", label: "", required: false, sort_order: prev.length + 1,
    }]);
  };

  return (
    <>
      {/* Header actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["all", "CC", "AP", "VE", "PM", "SFC"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`btn btn-sm ${filter === f ? "btn-gold" : "btn-outline"}`}>
              {f === "all" ? "All Phases" : `${f} — ${phaseNames[f]}`}
            </button>
          ))}
        </div>
        <button className="btn btn-purple" onClick={() => setShowCreate(true)}>+ Create Worksheet</button>
      </div>

      {/* Worksheet cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
        {filtered.map((ws) => (
          <div key={ws.title} className="panel" style={{ marginBottom: 0 }}>
            <div className="panel-head">
              <span className="panel-title" style={{ fontSize: 15 }}>{ws.title}</span>
              <span className={`pill ${phaseColors[ws.phase]}`}>{ws.phaseName}</span>
            </div>
            <div className="panel-body">
              <p style={{ fontSize: 13, color: "#5a4070", marginBottom: 14, lineHeight: 1.6 }}>{ws.description}</p>
              <div style={{ fontSize: 12, color: "#8a7a9a", marginBottom: 16 }}>{ws.fields} fields</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-gold btn-sm" onClick={() => setShowAssign(ws)}>Assign</button>
                <button className="btn btn-outline btn-sm" onClick={() => setSelectedWs(ws)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Worksheet Modal */}
      {selectedWs && (
        <div className="modal-overlay" onClick={() => setSelectedWs(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1e0a4a", marginBottom: 24 }}>Edit Worksheet</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div style={{ gridColumn: "1/-1" }}><label>Worksheet Title</label><input defaultValue={selectedWs.title} /></div>
              <div><label>Phase</label>
                <select defaultValue={selectedWs.phase}>
                  <option value="CC">Clarity Core</option><option value="AP">Authority Positioning</option>
                  <option value="VE">Visibility Engine</option><option value="PM">Proof & Momentum</option>
                  <option value="SFC">Six Figure Chicks</option>
                </select>
              </div>
              <div><label>SFC Only?</label>
                <select><option value="false">No</option><option value="true">Yes</option></select>
              </div>
              <div style={{ gridColumn: "1/-1" }}><label>Description</label><textarea rows={2} defaultValue={selectedWs.description} /></div>
            </div>
            <div style={{ borderTop: "1px solid rgba(240,195,112,0.2)", paddingTop: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1.8px", color: "#7a6090", fontWeight: 600, marginBottom: 12 }}>Fields ({selectedWs.fields})</div>
              <div style={{ background: "rgba(240,195,112,0.06)", borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 13, color: "#5a4070", fontStyle: "italic" }}>
                  Field editor — use the full worksheet builder to add, reorder, or remove fields.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="btn btn-outline" onClick={() => setSelectedWs(null)}>Cancel</button>
              <button className="btn btn-gold" onClick={() => setSelectedWs(null)}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {showAssign && (
        <div className="modal-overlay" onClick={() => setShowAssign(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1e0a4a", marginBottom: 8 }}>Assign Worksheet</h3>
            <p style={{ fontSize: 14, color: "#5a4070", marginBottom: 24, fontStyle: "italic" }}>{showAssign.title}</p>
            <div style={{ marginBottom: 16 }}>
              <label>Client</label>
              <select>
                <option value="">Select client...</option>
                {clientRoster.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Due Date (optional)</label>
              <input type="date" />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label>Note to Client (optional)</label>
              <textarea rows={2} placeholder="Instructions or context for the client..." />
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="btn btn-outline" onClick={() => setShowAssign(null)}>Cancel</button>
              <button className="btn btn-gold" onClick={() => setShowAssign(null)}>Assign &amp; Notify</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Worksheet Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 680 }}>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1e0a4a", marginBottom: 24 }}>Create New Worksheet</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div style={{ gridColumn: "1/-1" }}><label>Title</label><input placeholder="Worksheet title..." /></div>
              <div><label>Phase</label>
                <select>
                  <option value="CC">Clarity Core</option><option value="AP">Authority Positioning</option>
                  <option value="VE">Visibility Engine</option><option value="PM">Proof & Momentum</option>
                  <option value="SFC">Six Figure Chicks</option>
                </select>
              </div>
              <div><label>SFC Only?</label><select><option value="false">No</option><option value="true">Yes</option></select></div>
              <div style={{ gridColumn: "1/-1" }}><label>Description</label><textarea rows={2} placeholder="What is this worksheet for?" /></div>
            </div>

            {/* Field builder */}
            <div style={{ borderTop: "1px solid rgba(240,195,112,0.2)", paddingTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1.8px", color: "#7a6090", fontWeight: 600 }}>Fields</div>
                <button className="btn btn-outline btn-sm" onClick={addField}>+ Add Field</button>
              </div>
              {newFields.map((field, i) => (
                <div key={field.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr auto auto", gap: 10, marginBottom: 10, alignItems: "center" }}>
                  <input placeholder={`Field ${i + 1} label...`} defaultValue={field.label} style={{ fontSize: 13 }} />
                  <select defaultValue={field.type} style={{ fontSize: 13 }}>
                    {fieldTypes.map(t => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
                  </select>
                  <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, textTransform: "none", letterSpacing: 0, marginBottom: 0 }}>
                    <input type="checkbox" defaultChecked={field.required} style={{ width: "auto" }} /> Req
                  </label>
                  <button
                    onClick={() => setNewFields(prev => prev.filter((_, j) => j !== i))}
                    style={{ background: "#fce0e0", color: "#8a2020", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", fontSize: 12 }}>
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20, borderTop: "1px solid rgba(240,195,112,0.2)", paddingTop: 16 }}>
              <button className="btn btn-outline" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn btn-gold" onClick={() => setShowCreate(false)}>Save Worksheet</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
