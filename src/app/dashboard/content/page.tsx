"use client";

import { useState } from "react";
import { contentCalendar, visibilityPlacements } from "@/lib/mock-data";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const typeColor: Record<string, string> = {
  Podcast: "pill-purple", Social: "pill-amber", Email: "pill-gold",
  "Media": "pill-green", "PR Pitch": "pill-purple", Blog: "pill-amber",
};

const statusColor: Record<string, string> = {
  Scheduled: "pill-green", Drafting: "pill-purple", "In Review": "pill-gold",
  Idea: "pill-amber", Recording: "pill-amber", Pitched: "pill-purple",
};

function CalendarView({ items }: { items: typeof contentCalendar }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  const itemsByDay: Record<number, typeof contentCalendar> = {};
  items.forEach((item) => {
    const d = parseInt(item.day);
    const m = MONTHS.indexOf(item.month);
    if (m === month) {
      if (!itemsByDay[d]) itemsByDay[d] = [];
      itemsByDay[d].push(item);
    }
  });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <button className="btn btn-outline btn-sm" onClick={() => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); }}>← Prev</button>
        <span className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1e0a4a" }}>{MONTHS[month]} {year}</span>
        <button className="btn btn-outline btn-sm" onClick={() => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); }}>Next →</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 8 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "#7a6090", padding: "4px 0", textTransform: "uppercase", letterSpacing: "1px" }}>{d}</div>
        ))}
        {cells.map((day, i) => (
          <div key={i} style={{
            minHeight: 80, background: day ? "rgba(255,255,255,0.7)" : "transparent",
            border: day ? "1px solid rgba(240,195,112,0.2)" : "none",
            borderRadius: 8, padding: day ? "6px 8px" : 0,
            outline: day === today.getDate() && month === today.getMonth() ? "2px solid #c9a84c" : "none",
          }}>
            {day && (
              <>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#1e0a4a", marginBottom: 4 }}>{day}</div>
                {(itemsByDay[day] || []).map((item, j) => (
                  <div key={j} style={{ fontSize: 10, background: "rgba(30,10,74,0.08)", borderRadius: 4, padding: "2px 5px", marginBottom: 2, color: "#2a1a40", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.title}
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContentPage() {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [selectedItem, setSelectedItem] = useState<typeof contentCalendar[0] | null>(null);
  const [selectedPlacement, setSelectedPlacement] = useState<typeof visibilityPlacements[0] | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Content Published (30d)", value: "14", trend: "▲ 3 more than May", color: "#5a8a5a" },
          { label: "PR Pitches Active", value: "8", trend: "◆ 4 outlets pending", color: "#8a7a50" },
          { label: "UpLevel Episodes (YTD)", value: "24", trend: "▲ Ep. 95 in production", color: "#5a8a5a" },
          { label: "Newsletter Open Rate", value: "61%", trend: "▲ Industry avg: 22%", color: "#5a8a5a" },
        ].map((kpi) => (
          <div className="kpi-card" key={kpi.label}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1.8px", color: "#7a6090", marginBottom: 10, fontWeight: 600 }}>{kpi.label}</div>
            <div className="serif" style={{ fontSize: 30, fontWeight: 700, color: "#1e0a4a", lineHeight: 1 }}>{kpi.value}</div>
            <div style={{ fontSize: 13, marginTop: 6, color: kpi.color }}>{kpi.trend}</div>
          </div>
        ))}
      </div>

      {/* Content Calendar */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">Content Calendar</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button className={`btn btn-sm ${view === "list" ? "btn-gold" : "btn-outline"}`} onClick={() => setView("list")}>List</button>
            <button className={`btn btn-sm ${view === "calendar" ? "btn-gold" : "btn-outline"}`} onClick={() => setView("calendar")}>📅 Calendar</button>
            <button className="btn btn-purple btn-sm" onClick={() => setShowCreate(true)}>+ New Content</button>
          </div>
        </div>
        <div className="panel-body">
          {view === "calendar" ? (
            <CalendarView items={contentCalendar} />
          ) : (
            <table>
              <thead>
                <tr><th>Date</th><th>Title</th><th>Type</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {contentCalendar.map((item) => (
                  <tr key={item.title} className="clickable" onClick={() => setSelectedItem(item)} style={{ cursor: "pointer" }}>
                    <td style={{ fontWeight: 600, color: "#c9a84c", whiteSpace: "nowrap" }}>{item.month} {item.day}</td>
                    <td><strong>{item.title}</strong></td>
                    <td><span className={`pill ${typeColor[item.type] || "pill-amber"}`}>{item.type}</span></td>
                    <td><span className={`pill ${statusColor[item.status] || "pill-amber"}`}>{item.status}</span></td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <button className="btn btn-outline btn-sm" onClick={() => setSelectedItem(item)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* PR & Media Tracker */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">PR & Media Tracker</span>
          <span className="pill pill-purple">{visibilityPlacements.length} Active</span>
        </div>
        <div className="panel-body" style={{ padding: 0 }}>
          <table>
            <thead>
              <tr><th>Publication</th><th>Client</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {visibilityPlacements.map((p) => (
                <tr key={p.publication} className="clickable" onClick={() => setSelectedPlacement(p)} style={{ cursor: "pointer" }}>
                  <td><strong>{p.publication}</strong></td>
                  <td>{p.client}</td>
                  <td><span className={`pill ${p.pillClass}`}>{p.status}</span></td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button className="btn btn-outline btn-sm" onClick={() => setSelectedPlacement(p)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Content Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1e0a4a", marginBottom: 24 }}>Edit Content</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div style={{ gridColumn: "1 / -1" }}><label>Title</label><input defaultValue={selectedItem.title} /></div>
              <div><label>Type</label>
                <select defaultValue={selectedItem.type}>
                  <option>Podcast</option><option>Newsletter</option><option>Social</option><option>PR Pitch</option><option>Media</option><option>Blog</option>
                </select>
              </div>
              <div><label>Status</label>
                <select defaultValue={selectedItem.status}>
                  <option>Idea</option><option>Drafting</option><option>In Review</option><option>Scheduled</option><option>Published</option>
                </select>
              </div>
              <div><label>Publish Date</label><input type="date" defaultValue={`2025-06-${selectedItem.day.padStart(2,"0")}`} /></div>
              <div><label>Channel / Platform</label><input defaultValue={selectedItem.type} /></div>
            </div>
            <div><label>Body / Notes</label><textarea rows={4} placeholder="Content body or notes..." /></div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
              <button className="btn btn-outline" onClick={() => setSelectedItem(null)}>Cancel</button>
              <button className="btn btn-gold" onClick={() => setSelectedItem(null)}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Placement Modal */}
      {selectedPlacement && (
        <div className="modal-overlay" onClick={() => setSelectedPlacement(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1e0a4a", marginBottom: 24 }}>Edit PR Placement</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><label>Publication</label><input defaultValue={selectedPlacement.publication} /></div>
              <div><label>Client</label><input defaultValue={selectedPlacement.client} /></div>
              <div><label>Journalist</label><input placeholder="Journalist name" /></div>
              <div><label>Pitch Date</label><input type="date" /></div>
              <div><label>Status</label>
                <select defaultValue={selectedPlacement.status}>
                  <option>Pitched</option><option>Followed Up</option><option>In Review</option><option>Editing</option><option>Placed</option><option>Declined</option>
                </select>
              </div>
              <div><label>Placement URL</label><input type="url" placeholder="https://..." /></div>
            </div>
            <div style={{ marginTop: 16 }}><label>Notes</label><textarea rows={2} placeholder="Internal notes..." /></div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
              <button className="btn btn-outline" onClick={() => setSelectedPlacement(null)}>Cancel</button>
              <button className="btn btn-gold" onClick={() => setSelectedPlacement(null)}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Content Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1e0a4a", marginBottom: 24 }}>New Content Item</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ gridColumn: "1 / -1" }}><label>Title</label><input placeholder="Content title..." /></div>
              <div><label>Type</label>
                <select><option>Podcast</option><option>Newsletter</option><option>LinkedIn</option><option>Instagram</option><option>PR Pitch</option><option>Blog</option></select>
              </div>
              <div><label>Status</label>
                <select><option>Idea</option><option>Drafting</option><option>In Review</option><option>Scheduled</option></select>
              </div>
              <div><label>Publish Date</label><input type="date" /></div>
              <div><label>Channel</label><input placeholder="LinkedIn, Podcast, Email..." /></div>
            </div>
            <div style={{ marginTop: 16 }}><label>Notes</label><textarea rows={3} placeholder="Content brief or notes..." /></div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
              <button className="btn btn-outline" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn btn-gold" onClick={() => setShowCreate(false)}>Create</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
