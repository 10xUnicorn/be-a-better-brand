"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Project = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  start_date: string | null;
  due_date: string | null;
  client_id: string | null;
  deal_id: string | null;
  project_template_id: string | null;
  clients: { name: string } | null;
  pipeline_deals: { contact_name: string } | null;
  task_count?: number;
};

type Client = { id: string; name: string };
type Deal = { id: string; contact_name: string };
type Template = { id: string; name: string; tasks?: TemplateTask[] };
type TemplateTask = { id: string; title: string; priority: string; sort_order: number };

const STATUS_FILTERS = ["All", "Active", "Planning", "Completed"];

const STATUS_PILL: Record<string, string> = {
  active: "pill-green",
  planning: "pill-amber",
  completed: "pill-purple",
  on_hold: "pill-red",
};

const STATUS_LABEL: Record<string, string> = {
  active: "Active",
  planning: "Planning",
  completed: "Completed",
  on_hold: "On Hold",
};

export default function ProjectsPage() {
  const supabase = createClient();

  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // New project form state
  const [form, setForm] = useState({
    name: "",
    description: "",
    client_id: "",
    deal_id: "",
    start_date: "",
    due_date: "",
    project_template_id: "",
  });
  const [templateTasks, setTemplateTasks] = useState<TemplateTask[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [{ data: projData }, { data: clientData }, { data: dealData }, { data: tplData }] =
      await Promise.all([
        supabase
          .from("projects")
          .select("*, clients(name), pipeline_deals(contact_name)")
          .order("created_at", { ascending: false }),
        supabase.from("clients").select("id, name").order("name"),
        supabase.from("pipeline_deals").select("id, contact_name").order("contact_name"),
        supabase.from("project_templates").select("id, name").order("name"),
      ]);

    // Fetch task counts per project
    if (projData && projData.length > 0) {
      const ids = projData.map((p: Project) => p.id);
      const { data: taskCounts } = await supabase
        .from("project_tasks")
        .select("project_id")
        .in("project_id", ids);

      const countMap: Record<string, number> = {};
      (taskCounts || []).forEach((t: { project_id: string }) => {
        countMap[t.project_id] = (countMap[t.project_id] || 0) + 1;
      });

      setProjects(
        (projData as Project[]).map((p) => ({ ...p, task_count: countMap[p.id] || 0 }))
      );
    } else {
      setProjects((projData as Project[]) || []);
    }

    setClients((clientData as Client[]) || []);
    setDeals((dealData as Deal[]) || []);
    setTemplates((tplData as Template[]) || []);
    setLoading(false);
  }

  async function handleTemplateChange(templateId: string) {
    setForm((f) => ({ ...f, project_template_id: templateId }));
    if (!templateId) { setTemplateTasks([]); return; }
    const { data } = await supabase
      .from("project_template_tasks")
      .select("id, title, priority, sort_order")
      .eq("template_id", templateId)
      .order("sort_order");
    setTemplateTasks((data as TemplateTask[]) || []);
  }

  async function handleCreate() {
    if (!form.name.trim()) return;
    setSaving(true);
    const { data: newProj, error } = await supabase
      .from("projects")
      .insert({
        name: form.name.trim(),
        description: form.description || null,
        client_id: form.client_id || null,
        deal_id: form.deal_id || null,
        start_date: form.start_date || null,
        due_date: form.due_date || null,
        project_template_id: form.project_template_id || null,
        status: "planning",
      })
      .select()
      .single();

    if (error) {
      showToast("Failed to create project: " + error.message, "error");
      setSaving(false);
      return;
    }

    // Insert template tasks
    if (templateTasks.length > 0 && newProj) {
      const taskRows = templateTasks.map((t) => ({
        project_id: newProj.id,
        title: t.title,
        priority: t.priority,
        sort_order: t.sort_order,
        status: "pending",
      }));
      await supabase.from("project_tasks").insert(taskRows);
    }

    showToast("Project created successfully", "success");
    setShowModal(false);
    resetForm();
    loadData();
    setSaving(false);
  }

  function resetForm() {
    setForm({ name: "", description: "", client_id: "", deal_id: "", start_date: "", due_date: "", project_template_id: "" });
    setTemplateTasks([]);
  }

  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  const filtered = projects.filter((p) => {
    if (filterStatus === "All") return true;
    return p.status?.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "#1e0a4a", marginBottom: 4 }}>Projects</h1>
          <p style={{ fontSize: 13, color: "#7a6090" }}>Manage client deliverables, tasks, and timelines</p>
        </div>
        <button className="btn btn-gold" onClick={() => setShowModal(true)}>+ New Project</button>
      </div>

      {/* Status filter tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 22, borderBottom: "1px solid rgba(240,195,112,0.25)" }}>
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className="serif"
            style={{
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: filterStatus === s ? 700 : 400,
              color: filterStatus === s ? "#c9a84c" : "#7a6090",
              background: "transparent",
              border: "none",
              borderBottom: filterStatus === s ? "2px solid #c9a84c" : "2px solid transparent",
              cursor: "pointer",
              marginBottom: -1,
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "#8a7a9a" }}>
          <span className="serif" style={{ fontSize: 15 }}>Loading projects…</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="panel">
          <div className="panel-body" style={{ textAlign: "center", padding: 50, color: "#8a7a9a" }}>
            <p className="serif" style={{ fontSize: 15, marginBottom: 12 }}>No projects found.</p>
            <button className="btn btn-gold" onClick={() => setShowModal(true)}>Create your first project</button>
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 18 }}>
          {filtered.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="panel"
                style={{
                  marginBottom: 0,
                  cursor: "pointer",
                  transition: "box-shadow 0.2s",
                  borderTop: "3px solid #c9a84c",
                }}
              >
                <div className="panel-body">
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                    <h3 className="serif" style={{ fontSize: 17, fontWeight: 700, color: "#1e0a4a", lineHeight: 1.3 }}>
                      {project.name}
                    </h3>
                    <span className={`pill ${STATUS_PILL[project.status] || "pill-amber"}`} style={{ flexShrink: 0, marginLeft: 8 }}>
                      {STATUS_LABEL[project.status] || project.status}
                    </span>
                  </div>

                  {project.description && (
                    <p style={{ fontSize: 12.5, color: "#5a4070", marginBottom: 10, lineHeight: 1.5 }}>
                      {project.description.length > 90 ? project.description.slice(0, 90) + "…" : project.description}
                    </p>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: "#7a6090" }}>
                    {project.clients?.name && (
                      <span>◈ Client: <strong style={{ color: "#1e0a4a" }}>{project.clients.name}</strong></span>
                    )}
                    {project.pipeline_deals?.contact_name && (
                      <span>✦ Deal: <strong style={{ color: "#1e0a4a" }}>{project.pipeline_deals.contact_name}</strong></span>
                    )}
                    {project.due_date && (
                      <span>◉ Due: <strong style={{ color: "#1e0a4a" }}>{new Date(project.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</strong></span>
                    )}
                  </div>

                  <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(240,195,112,0.18)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: "#8a7a9a" }}>
                      {project.task_count ?? 0} task{(project.task_count ?? 0) !== 1 ? "s" : ""}
                    </span>
                    <span style={{ fontSize: 11, color: "#c9a84c", fontWeight: 600 }}>View →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* New Project Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) { setShowModal(false); resetForm(); } }}>
          <div className="modal" style={{ maxWidth: 620 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
              <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1e0a4a" }}>New Project</h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#7a6090" }}>✕</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label>Project Name *</label>
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Brand Architecture — Sarah M." />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label>Description</label>
                <textarea rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Brief description of scope and goals…" />
              </div>
              <div>
                <label>Client</label>
                <select value={form.client_id} onChange={(e) => setForm((f) => ({ ...f, client_id: e.target.value }))}>
                  <option value="">— Select client —</option>
                  {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label>Deal</label>
                <select value={form.deal_id} onChange={(e) => setForm((f) => ({ ...f, deal_id: e.target.value }))}>
                  <option value="">— Select deal —</option>
                  {deals.map((d) => <option key={d.id} value={d.id}>{d.contact_name}</option>)}
                </select>
              </div>
              <div>
                <label>Start Date</label>
                <input type="date" value={form.start_date} onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))} />
              </div>
              <div>
                <label>Due Date</label>
                <input type="date" value={form.due_date} onChange={(e) => setForm((f) => ({ ...f, due_date: e.target.value }))} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label>Project Template</label>
                <select value={form.project_template_id} onChange={(e) => handleTemplateChange(e.target.value)}>
                  <option value="">— No template —</option>
                  {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>

              {/* Template tasks preview */}
              {templateTasks.length > 0 && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <label>Template Tasks Preview</label>
                  <div style={{ background: "rgba(240,195,112,0.08)", border: "1px solid rgba(240,195,112,0.25)", borderRadius: 10, padding: "10px 14px" }}>
                    {templateTasks.map((t) => (
                      <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", borderBottom: "1px solid rgba(240,195,112,0.12)", fontSize: 12.5 }}>
                        <span style={{ color: "#c9a84c" }}>○</span>
                        <span style={{ flex: 1, color: "#2a1a40" }}>{t.title}</span>
                        <span className={`pill ${t.priority === "high" ? "pill-red" : t.priority === "medium" ? "pill-amber" : "pill-green"}`} style={{ fontSize: 10 }}>
                          {t.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "flex-end" }}>
              <button className="btn btn-outline" onClick={() => { setShowModal(false); resetForm(); }}>Cancel</button>
              <button className="btn btn-gold" onClick={handleCreate} disabled={saving || !form.name.trim()}>
                {saving ? "Creating…" : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
      )}
    </>
  );
}
