"use client";
import { useState } from "react";
import { clientRoster, portalMessages } from "@/lib/mock-data";

export default function MessagingPage() {
  const [selectedClient, setSelectedClient] = useState(clientRoster[0]?.name || "");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(portalMessages);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      { from: "You", initials: "CB", message: newMessage, time: "Just now", isTeam: true },
    ]);
    setNewMessage("");
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16, height: "calc(100vh - 150px)" }}>
      {/* Client list */}
      <div className="panel" style={{ marginBottom: 0, overflow: "auto" }}>
        <div className="panel-head">
          <span className="panel-title">Conversations</span>
        </div>
        <div style={{ padding: 0 }}>
          {clientRoster.map((c) => (
            <div
              key={c.name}
              onClick={() => setSelectedClient(c.name)}
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                borderBottom: "1px solid rgba(240,195,112,0.12)",
                background: selectedClient === c.name ? "rgba(240,195,112,0.1)" : "transparent",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #c9a84c, #e8c97a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#1e0a4a", flexShrink: 0 }}>
                {c.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#1e0a4a" }}>{c.name}</div>
                <div style={{ fontSize: 10, color: "#8a7a9a" }}>{c.offer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="panel" style={{ marginBottom: 0, display: "flex", flexDirection: "column" }}>
        <div className="panel-head">
          <span className="panel-title">Thread with {selectedClient}</span>
          <span className="pill pill-green">Active</span>
        </div>
        <div className="panel-body" style={{ flex: 1, overflowY: "auto" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ marginBottom: 16, display: "flex", flexDirection: m.isTeam ? "row-reverse" : "row", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: m.isTeam ? "linear-gradient(135deg, #1e0a4a, #331081)" : "linear-gradient(135deg, #c9a84c, #e8c97a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: m.isTeam ? "#f0c370" : "#1e0a4a", flexShrink: 0 }}>
                {m.initials}
              </div>
              <div style={{ maxWidth: "70%", background: m.isTeam ? "rgba(30,10,74,0.06)" : "rgba(240,195,112,0.1)", borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#7a6090", marginBottom: 3 }}>{m.from}</div>
                <div style={{ fontSize: 12.5, color: "#2a1a40", lineHeight: 1.5 }}>{m.message}</div>
                <div style={{ fontSize: 9, color: "#9a8aaa", marginTop: 4, fontStyle: "italic" }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 22px", borderTop: "1px solid rgba(240,195,112,0.18)", display: "flex", gap: 10 }}>
          <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." onKeyDown={(e) => e.key === "Enter" && handleSend()} style={{ flex: 1 }} />
          <button onClick={handleSend} className="btn btn-gold btn-sm">Send</button>
        </div>
      </div>
    </div>
  );
}
