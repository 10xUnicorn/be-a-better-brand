"use client";
import { useState } from "react";
import { notifications as notifData } from "@/lib/mock-data";

const typeIcons: Record<string, string> = {
  worksheet: "📋",
  payment: "💰",
  media: "📰",
  lead: "🎯",
  journey: "🏆",
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifData);

  const markAllRead = () => setNotifs(notifs.map((n) => ({ ...n, read: true })));
  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div className="serif" style={{ fontSize: 14, color: "#7a6090" }}>
          {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
        </div>
        <button className="btn btn-outline btn-sm" onClick={markAllRead}>
          Mark All Read
        </button>
      </div>

      <div className="panel">
        <div className="panel-body" style={{ padding: 0 }}>
          {notifs.map((n, i) => (
            <div
              key={i}
              onClick={() => {
                const updated = [...notifs];
                updated[i] = { ...updated[i], read: true };
                setNotifs(updated);
              }}
              style={{
                padding: "14px 22px",
                borderBottom: i < notifs.length - 1 ? "1px solid rgba(240,195,112,0.12)" : "none",
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                cursor: "pointer",
                background: n.read ? "transparent" : "rgba(240,195,112,0.06)",
              }}
            >
              <span style={{ fontSize: 18, marginTop: 2 }}>{typeIcons[n.type] || "📌"}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: n.read ? 400 : 700, color: "#1e0a4a", marginBottom: 2 }}>
                  {n.title}
                  {!n.read && <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#c9a84c", marginLeft: 8, verticalAlign: "middle" }} />}
                </div>
                <div style={{ fontSize: 12, color: "#5a4070", marginBottom: 3 }}>{n.message}</div>
                <div style={{ fontSize: 10, color: "#9a8aaa", fontStyle: "italic" }}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
