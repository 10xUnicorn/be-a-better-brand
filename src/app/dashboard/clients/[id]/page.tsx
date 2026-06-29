"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { clientRoster, journeyData } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/client";

type ClientNote = {
  id: string;
  client_id: string;
  subject: string;
  body: string;
  author_name: string | null;
  created_at: string;
  updated_at: string;
};

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState("profile");

  // Notes state
  const [notes, setNotes] = useState<ClientNote[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [notesFetched, setNotesFetched] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [editingNote, setEditingNote] = useState<ClientNote | null>(null);
  const [noteForm, setNoteForm] = useState({ subject: "", body: "", author_name: "" });
  const [noteSaving, setNoteSaving] = useState(false);
  const [noteToast, setNoteToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // In production, fetch from Supabase by ID. For demo, use first matching client or fallback.
  const client = clientRoster[parseInt(id) || 0] || clientRoster[0];

  const tabs = ["profile", "journey", "worksheets", "files", "notes", "payments", "activity"];

  useEffect(() => {
    if (activeTab === "notes" && !notesFetched) {
      loadNotes();
    }
  }, [activeTab]);

  async function loadNotes() {
    setNotesLoading(true);
    const { data } = await supabase
      .from("client_notes")
      .select("*")
      .eq("client_id", id)
      .order("created_at", { ascending: false });
    setNotes((data as ClientNote[]) || []);
    setNotesFetched(true);
    setNotesLoading(false);
  }

  function showNoteToast(msg: string, type: "success" | "error") {
    setNoteToast({ msg, type });
    setTimeout(() => setNoteToast(null), 3500);
  }

  function openAddNote() {
    setEditingNote(null);
    setNoteForm({ subject: "", body: "", author_name: "" });
    setShowNoteModal(true);
  }

  function openEditNote(note: ClientNote) {
    setEditingNote(note);
    setNoteForm({ subject: note.subject, body: note.body, author_name: note.author_name || "" });
    setShowNoteModal(true);
  }

  async function saveNote() {
    if (!noteForm.subject.trim()) return;
    setNoteSaving(true);
    if (editingNote) {
      const { error } = await supabase
        .from("client_notes")
        .update({ subject: noteForm.subject.trim(), body: noteForm.body, author_name: noteForm.author_name || null, updated_at: new Date().toISOString() })
        .eq("id", editingNote.id);
      if (error) { showNoteToast("Failed to update note", "error"); setNoteSaving(false); return; }
      showNoteToast("Note updated", "success");
    } else {
      const { error } = await supabase
        .from("client_notes")
        .insert({ client_id: id, subject: noteForm.subject.trim(), body: noteForm.body, author_name: noteForm.author_name || null });
      if (error) { showNoteToast("Failed to save note", "error"); setNoteSaving(false); return; }
      showNoteToast("Note saved", "success");
    }
    setShowNoteModal(false);
    setEditingNote(null);
    setNoteSaving(false);
    loadNotes();
  }

  async function deleteNote(noteId: string) {
    if (!confirm("Delete this note?")) return;
    await supabase.from("client_notes").delete().eq("id", noteId);
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    showNoteToast("Note deleted", "success");
  }

  return (
    <>
      <Link href="/dashboard/clients" style={{ fontSize: 12, color: "#c9a84c", textDecoration: "none", marginBottom: 16, display: "inline-block" }}>
        ← Back to Clients
      </Link>

      {/* Client header */}
      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-body" style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #c9a84c, #e8c97a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#1e0a4a", flexShrink: 0 }}>
            {client.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1e0a4a", marginBottom: 4 }}>{client.name}</h2>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span className={`pill ${client.phaseClass}`}>{client.phase}</span>
              <span className={`pill ${client.healthClass}`}>{client.health}</span>
              <span style={{ fontSize: 12, color: "#5a4070" }}>{client.offer}</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="serif" style={{ fontSize: 24, fontWeight: 700, color: "#1e0a4a" }}>{client.mrr}</div>
            <div style={{ fontSize: 11, color: "#7a6090" }}>MRR • Renewal {client.renewal}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid rgba(240,195,112,0.25)", paddingBottom: 0 }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="serif"
            style={{
              padding: "8px 16px",
              fontSize: 12,
              fontWeight: activeTab === tab ? 700 : 400,
              color: activeTab === tab ? "#c9a84c" : "#7a6090",
              background: "transparent",
              border: "none",
              borderBottom: activeTab === tab ? "2px solid #c9a84c" : "2px solid transparent",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "profile" && (
        <div className="panel">
          <div className="panel-body">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><label>Full Name</label><input defaultValue={client.name} /></div>
              <div><label>Client Type</label><input defaultValue={client.type} /></div>
              <div><label>Offer Tier</label><input defaultValue={client.offer} /></div>
              <div><label>MRR</label><input defaultValue={client.mrr} /></div>
              <div><label>Renewal Date</label><input defaultValue={client.renewal} /></div>
              <div><label>Current Phase</label><input defaultValue={client.phase} /></div>
            </div>
            <div style={{ marginTop: 16 }}>
              <label>Notes</label>
              <textarea rows={4} placeholder="Internal notes about this client..." />
            </div>
            <button className="btn btn-gold" style={{ marginTop: 16 }}>Save Changes</button>
          </div>
        </div>
      )}

      {activeTab === "journey" && (
        <div>
          {journeyData.map((phase) => (
            <div key={phase.phase} className="panel">
              <div className="panel-head">
                <span className="panel-title">Phase {phase.phase}: {phase.name}</span>
                <span className={`pill ${phase.status === "complete" ? "pill-green" : phase.status === "in_progress" ? "pill-amber" : "pill-purple"}`}>
                  {phase.status === "complete" ? "Complete" : phase.status === "in_progress" ? "Active" : "Pending"}
                </span>
              </div>
              <div className="panel-body">
                {phase.milestones.map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                    <span style={{ color: m.status === "complete" ? "#2a7a3a" : "#ccc" }}>{m.status === "complete" ? "✓" : "○"}</span>
                    <span style={{ fontSize: 12.5, color: "#2a1a40" }}>{m.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "worksheets" && (
        <div className="panel">
          <div className="panel-body" style={{ textAlign: "center", padding: 40, color: "#8a7a9a" }}>
            <p className="serif" style={{ fontSize: 14 }}>No worksheets assigned yet.</p>
            <button className="btn btn-gold" style={{ marginTop: 12 }}>Assign Worksheet</button>
          </div>
        </div>
      )}

      {activeTab === "notes" && (
        <>
          <div className="panel">
            <div className="panel-head">
              <span className="panel-title">Client Notes</span>
              <button className="btn btn-gold btn-sm" onClick={openAddNote}>+ Add Note</button>
            </div>
            <div className="panel-body" style={{ padding: notesLoading || notes.length === 0 ? 20 : 0 }}>
              {notesLoading ? (
                <div style={{ textAlign: "center", padding: 40, color: "#8a7a9a" }}>
                  <span className="serif" style={{ fontSize: 14 }}>Loading notes…</span>
                </div>
              ) : notes.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, color: "#8a7a9a" }}>
                  <p className="serif" style={{ fontSize: 14, marginBottom: 12 }}>No notes yet for this client.</p>
                  <button className="btn btn-gold" onClick={openAddNote}>Add First Note</button>
                </div>
              ) : (
                notes.map((note) => (
                  <div key={note.id} style={{ padding: "18px 24px", borderBottom: "1px solid rgba(240,195,112,0.15)" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: "#1e0a4a", marginBottom: 2 }}>{note.subject}</div>
                        <div style={{ fontSize: 11.5, color: "#8a7a9a" }}>
                          {note.author_name && <span style={{ marginRight: 8 }}>By {note.author_name}</span>}
                          {new Date(note.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        <button className="btn btn-outline btn-sm" onClick={() => openEditNote(note)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteNote(note.id)}>Delete</button>
                      </div>
                    </div>
                    <div
                      style={{ fontSize: 13.5, color: "#2a1a40", lineHeight: 1.6, marginTop: 8 }}
                      dangerouslySetInnerHTML={{ __html: note.body }}
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Note Modal */}
          {showNoteModal && (
            <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowNoteModal(false); }}>
              <div className="modal">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <h2 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "#1e0a4a" }}>
                    {editingNote ? "Edit Note" : "Add Note"}
                  </h2>
                  <button onClick={() => setShowNoteModal(false)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#7a6090" }}>✕</button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label>Subject *</label>
                    <input
                      value={noteForm.subject}
                      onChange={(e) => setNoteForm((f) => ({ ...f, subject: e.target.value }))}
                      placeholder="e.g. Strategy session recap"
                    />
                  </div>
                  <div>
                    <label>Author Name</label>
                    <input
                      value={noteForm.author_name}
                      onChange={(e) => setNoteForm((f) => ({ ...f, author_name: e.target.value }))}
                      placeholder="e.g. Chrissy Bernal"
                    />
                  </div>
                  <div>
                    <label>Body</label>
                    <textarea
                      rows={6}
                      value={noteForm.body}
                      onChange={(e) => setNoteForm((f) => ({ ...f, body: e.target.value }))}
                      placeholder="Write note content here. HTML is supported (e.g. <b>bold</b>, <ul><li>list</li></ul>)."
                    />
                    <div style={{ fontSize: 10.5, color: "#8a7a9a", marginTop: 4 }}>
                      Supports basic HTML: &lt;b&gt;, &lt;i&gt;, &lt;ul&gt;&lt;li&gt;, &lt;p&gt;, &lt;a&gt;
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: "#8a7a9a", borderTop: "1px dashed rgba(240,195,112,0.3)", paddingTop: 10 }}>
                    File upload coming soon — attach files via the Files tab.
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
                  <button className="btn btn-outline" onClick={() => setShowNoteModal(false)}>Cancel</button>
                  <button className="btn btn-gold" onClick={saveNote} disabled={noteSaving || !noteForm.subject.trim()}>
                    {noteSaving ? "Saving…" : editingNote ? "Update Note" : "Save Note"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {noteToast && (
            <div className={`toast toast-${noteToast.type}`}>{noteToast.msg}</div>
          )}
        </>
      )}

      {(activeTab === "files" || activeTab === "payments" || activeTab === "activity") && (
        <div className="panel">
          <div className="panel-body" style={{ textAlign: "center", padding: 40, color: "#8a7a9a" }}>
            <p className="serif" style={{ fontSize: 14, textTransform: "capitalize" }}>{activeTab} will appear here once connected to Supabase.</p>
          </div>
        </div>
      )}
    </>
  );
}
