"use client";
import { useState } from "react";
import { teamMembers } from "@/lib/mock-data";

export default function TeamPage() {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div className="serif" style={{ fontSize: 14, color: "#7a6090" }}>
          {teamMembers.length} team members
        </div>
        <button className="btn btn-gold" onClick={() => setShowInvite(true)}>
          + Invite Team Member
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {teamMembers.map((m) => (
          <div key={m.email} className="panel" style={{ marginBottom: 0 }}>
            <div className="panel-body" style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: m.role === "Owner" ? "linear-gradient(135deg, #c9a84c, #e8c97a)" : "linear-gradient(135deg, #1e0a4a, #331081)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: m.role === "Owner" ? "#1e0a4a" : "#f0c370", flexShrink: 0 }}>
                {m.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div className="serif" style={{ fontSize: 15, fontWeight: 700, color: "#1e0a4a" }}>{m.name}</div>
                <div style={{ fontSize: 12, color: "#5a4070" }}>{m.email}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                  <span className={`pill ${m.role === "Owner" ? "pill-gold" : "pill-purple"}`}>{m.role}</span>
                  <span className={`pill ${m.status === "Active" ? "pill-green" : "pill-amber"}`}>{m.status}</span>
                </div>
              </div>
              {m.role !== "Owner" && (
                <select defaultValue={m.role} style={{ width: "auto", padding: "5px 10px", fontSize: 11 }}>
                  <option value="team_member">Team Member</option>
                  <option value="client">Client</option>
                  <option value="collaborator">Collaborator</option>
                </select>
              )}
            </div>
          </div>
        ))}
      </div>

      {showInvite && (
        <div className="modal-overlay" onClick={() => setShowInvite(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1e0a4a", marginBottom: 20 }}>Invite Team Member</h3>
            <div style={{ marginBottom: 16 }}>
              <label>Email Address</label>
              <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="team@beabetterbrand.com" />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label>Role</label>
              <select>
                <option value="team_member">Team Member</option>
                <option value="client">Client</option>
                <option value="collaborator">Collaborator</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="btn btn-outline btn-sm" onClick={() => setShowInvite(false)}>Cancel</button>
              <button className="btn btn-gold" onClick={() => { setShowInvite(false); setInviteEmail(""); }}>Send Invite</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
