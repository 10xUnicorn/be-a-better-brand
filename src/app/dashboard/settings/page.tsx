export default function SettingsPage() {
  return (
    <>
      {/* Settings Header */}
      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-head">
          <span className="panel-title">Account Settings</span>
          <span className="pill pill-gold">Owner</span>
        </div>
        <div className="panel-body">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <label>Display Name</label>
              <input type="text" defaultValue="Chrissy Bernal" />
            </div>
            <div>
              <label>Email</label>
              <input type="email" defaultValue="chrissy@beabetterbrand.com" />
            </div>
            <div>
              <label>Role</label>
              <input type="text" value="Owner" disabled style={{ opacity: 0.6 }} />
            </div>
            <div>
              <label>Timezone</label>
              <select defaultValue="CT">
                <option value="CT">Central Time (CT)</option>
                <option value="ET">Eastern Time (ET)</option>
                <option value="PT">Pacific Time (PT)</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <button className="btn btn-gold">Save Profile</button>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* Team Management */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Team Members</span>
            <button className="btn btn-gold btn-sm">+ Invite</button>
          </div>
          <div className="panel-body">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Chrissy Bernal", role: "Owner", status: "Active", statusClass: "pill-green" },
                  { name: "Maya L.", role: "Team Member", status: "Active", statusClass: "pill-green" },
                  { name: "Jordan K.", role: "Team Member", status: "Active", statusClass: "pill-green" },
                  { name: "Priya S.", role: "Read-Only", status: "Invited", statusClass: "pill-amber" },
                ].map((member) => (
                  <tr key={member.name}>
                    <td><strong>{member.name}</strong></td>
                    <td>{member.role}</td>
                    <td><span className={`pill ${member.statusClass}`}>{member.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Integrations */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Integrations</span>
          </div>
          <div className="panel-body">
            {[
              { name: "Stripe", desc: "Payment processing", status: "Connected", statusClass: "pill-green" },
              { name: "Resend", desc: "Transactional email", status: "Connected", statusClass: "pill-green" },
              { name: "Supabase Auth", desc: "Authentication", status: "Connected", statusClass: "pill-green" },
              { name: "AI Provider", desc: "Content & diagnostics", status: "Connected", statusClass: "pill-green" },
              { name: "Fathom Analytics", desc: "Privacy-first analytics", status: "Pending Setup", statusClass: "pill-amber" },
              { name: "External CRM", desc: "Contact sync", status: "Not Connected", statusClass: "pill-red" },
            ].map((int) => (
              <div
                key={int.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(240,195,112,0.12)",
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#1e0a4a" }}>{int.name}</div>
                  <div style={{ fontSize: "10.5px", color: "#7a6090", fontStyle: "italic" }}>{int.desc}</div>
                </div>
                <span className={`pill ${int.statusClass}`}>{int.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-head">
          <span className="panel-title">Notification Preferences</span>
        </div>
        <div className="panel-body">
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>In-App</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {[
                "New client onboarded",
                "Worksheet submitted",
                "Invoice paid",
                "Invoice overdue",
                "Milestone completed",
                "New portal message",
                "Press placement added",
                "Ascension prompt",
              ].map((event) => (
                <tr key={event}>
                  <td>{event}</td>
                  <td>
                    <input type="checkbox" defaultChecked style={{ width: "auto" }} />
                  </td>
                  <td>
                    <input type="checkbox" defaultChecked style={{ width: "auto" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 16 }}>
            <button className="btn btn-gold">Save Preferences</button>
          </div>
        </div>
      </div>

      {/* Brand Settings */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">Brand Settings</span>
          <span className="pill pill-purple">Owner Only</span>
        </div>
        <div className="panel-body">
          <div style={{ marginBottom: 16 }}>
            <label>Portal Welcome Message (Default)</label>
            <textarea rows={3} defaultValue="Welcome to Be a Better Brand! We're honored to guide your journey through the Finally Seen Framework. Your visibility transformation starts here." />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Email Signature Block</label>
            <textarea rows={2} defaultValue="Chrissy Bernal | Be a Better Brand | beabetterbrand.com" />
          </div>
          <button className="btn btn-gold">Save Brand Settings</button>
        </div>
      </div>
    </>
  );
}
