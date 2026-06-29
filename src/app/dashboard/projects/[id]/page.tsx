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
  clients: { id: string; name: string } | null;
  pipeline_deals: { id: string; contact_name: string } | null;
};

type Task = {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  assigned_to: string | null;
  due_date: string | null;
  sort_order: number;
  file_urls: string[] | null;
  subtasks?: Subtask[];
};

type Subtask = {
  id: string;
  task_id: string;
  title: string;
  status: string;
  sort_order: number;
};

const PRIORITY_PILL: Record<string, string> = {
  high: "pill-red",
  medium: "pill-amber",
  low: "pill-green",
};

const STATUS_OPTIONS = ["pending", "in_progress", "completed", "blocked"];
const PRIORITY_OPTIONS = ["high", "medium", "low"];
const PROJECT_STATUS_OPTIONS = ["planning", "active", "on_hold", "completed"];

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const supabase = createClient();

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"tasks" | "files">("tasks");
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [addingTask, setAddingTask] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState<Record<string, string>>({});
  const [editingName, setEditingName] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    loadProject();
  }, [id]);

  async function loadProject() {
    setLoading(true);
    const { data: proj } = await supabase
      .from("projects")
      .select("*, clients(id, name), pipeline_deals(id, contact_name)")
      .eq("id", id)
      .single();

    if (proj) {
      setProject(proj as Project);
      setProjectName((proj as Project).name);
    }

    await loadTasks();
    setLoading(false);
  }

  async function loadTasks() {
    const { data: taskData } = await supabase
      .from("project_tasks")
      .select("*")
      .eq("project_id", id)
      .order("sort_order");

    if (!taskData) { setTasks([]); return; }

    // Load subtasks for all tasks
    const taskIds = taskData.map((t: Task) => t.id);
    let subtaskMap: Record<string, Subtask[]> = {};
    if (taskIds.length > 0) {
      const { data: subtaskData } = await supabase
        .from("project_subtasks")
        .select("*")
        .in("task_id", taskIds)
        .order("sort_order");
      (subtaskData || []).forEach((s: Subtask) => {
        if (!subtaskMap[s.task_id]) subtaskMap[s.task_id] = [];
        subtaskMap[s.task_id].push(s);
      });
    }

    setTasks(
      (taskData as Task[]).map((t) => ({ ...t, subtasks: subtaskMap[t.id] || [] }))
    );
  }

  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function updateProjectStatus(status: string) {
    await supabase.from("projects").update({ status }).eq("id", id);
    setProject((p) => p ? { ...p, status } : p);
    showToast("Status updated", "success");
  }

  async function saveProjectName() {
    if (!projectName.trim()) return;
    await supabase.from("projects").update({ name: projectName.trim() }).eq("id", id);
    setProject((p) => p ? { ...p, name: projectName.trim() } : p);
    setEditingName(false);
    showToast("Name saved", "success");
  }

  async function toggleTaskComplete(task: Task) {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    await supabase.from("project_tasks").update({ status: newStatus }).eq("id", task.id);
    setTasks((prev) => prev.map((t) => t.id === task.id ? { ...t, status: newStatus } : t));
    if (selectedTask?.id === task.id) setSelectedTask((t) => t ? { ...t, status: newStatus } : t);
  }

  async function addTask() {
    if (!newTaskTitle.trim()) return;
    const maxOrder = tasks.length > 0 ? Math.max(...tasks.map((t) => t.sort_order)) + 1 : 0;
    const { data } = await supabase
      .from("project_tasks")
      .insert({ project_id: id, title: newTaskTitle.trim(), status: "pending", priority: "medium", sort_order: maxOrder })
      .select()
      .single();
    if (data) {
      setTasks((prev) => [...prev, { ...(data as Task), subtasks: [] }]);
      setNewTaskTitle("");
      showToast("Task added", "success");
    }
  }

  async function addSubtask(taskId: string) {
    const title = newSubtaskTitle[taskId]?.trim();
    if (!title) return;
    const task = tasks.find((t) => t.id === taskId);
    const maxOrder = (task?.subtasks?.length || 0);
    const { data } = await supabase
      .from("project_subtasks")
      .insert({ task_id: taskId, title, status: "pending", sort_order: maxOrder })
      .select()
      .single();
    if (data) {
      setTasks((prev) => prev.map((t) =>
        t.id === taskId ? { ...t, subtasks: [...(t.subtasks || []), data as Subtask] } : t
      ));
      setNewSubtaskTitle((prev) => ({ ...prev, [taskId]: "" }));
    }
  }

  async function toggleSubtask(taskId: string, subtask: Subtask) {
    const newStatus = subtask.status === "completed" ? "pending" : "completed";
    await supabase.from("project_subtasks").update({ status: newStatus }).eq("id", subtask.id);
    setTasks((prev) => prev.map((t) =>
      t.id === taskId
        ? { ...t, subtasks: (t.subtasks || []).map((s) => s.id === subtask.id ? { ...s, status: newStatus } : s) }
        : t
    ));
  }

  async function moveTask(taskId: string, direction: "up" | "down") {
    const idx = tasks.findIndex((t) => t.id === taskId);
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === tasks.length - 1) return;

    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    const reordered = [...tasks];
    [reordered[idx], reordered[swapIdx]] = [reordered[swapIdx], reordered[idx]];

    const updates = reordered.map((t, i) => ({ id: t.id, sort_order: i }));
    setTasks(reordered.map((t, i) => ({ ...t, sort_order: i })));

    for (const u of updates) {
      await supabase.from("project_tasks").update({ sort_order: u.sort_order }).eq("id", u.id);
    }
  }

  async function updateTaskField(taskId: string, field: string, value: string) {
    await supabase.from("project_tasks").update({ [field]: value }).eq("id", taskId);
    setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, [field]: value } : t));
    if (selectedTask?.id === taskId) setSelectedTask((t) => t ? { ...t, [field]: value } : t);
  }

  function toggleExpand(taskId: string) {
    setExpandedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId); else next.add(taskId);
      return next;
    });
  }

  const allFiles = tasks.flatMap((t) =>
    (t.file_urls || []).map((url) => ({ taskTitle: t.title, url }))
  );

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 80, color: "#8a7a9a" }}>
        <span className="serif" style={{ fontSize: 15 }}>Loading project…</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="panel">
        <div className="panel-body" style={{ textAlign: "center", padding: 50 }}>
          <p className="serif" style={{ color: "#8a7a9a" }}>Project not found.</p>
          <Link href="/dashboard/projects" className="btn btn-gold" style={{ marginTop: 14, display: "inline-block" }}>← Back to Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Link href="/dashboard/projects" style={{ fontSize: 12, color: "#c9a84c", textDecoration: "none", marginBottom: 16, display: "inline-block" }}>
        ← Back to Projects
      </Link>

      {/* Project Header */}
      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-body">
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              {editingName ? (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") saveProjectName(); if (e.key === "Escape") setEditingName(false); }}
                    style={{ fontSize: 20, fontFamily: "Cormorant Garamond, Georgia, serif", fontWeight: 700, padding: "6px 12px" }}
                    autoFocus
                  />
                  <button className="btn btn-gold btn-sm" onClick={saveProjectName}>Save</button>
                  <button className="btn btn-outline btn-sm" onClick={() => setEditingName(false)}>Cancel</button>
                </div>
              ) : (
                <h1
                  className="serif"
                  style={{ fontSize: 26, fontWeight: 700, color: "#1e0a4a", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
                  onClick={() => setEditingName(true)}
                  title="Click to edit"
                >
                  {project.name}
                  <span style={{ fontSize: 14, color: "#c9a84c", opacity: 0.7 }}>✎</span>
                </h1>
              )}

              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginTop: 8 }}>
                {project.clients?.name && (
                  <Link href={`/dashboard/clients`} style={{ fontSize: 12, color: "#5a4070", textDecoration: "none" }}>
                    ◈ {project.clients.name}
                  </Link>
                )}
                {project.pipeline_deals?.contact_name && (
                  <span style={{ fontSize: 12, color: "#5a4070" }}>✦ {project.pipeline_deals.contact_name}</span>
                )}
                {project.due_date && (
                  <span style={{ fontSize: 12, color: "#5a4070" }}>
                    ◉ Due {new Date(project.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <label style={{ margin: 0, fontSize: 11, color: "#7a6090", textTransform: "uppercase", letterSpacing: "1.5px" }}>Status</label>
              <select
                value={project.status}
                onChange={(e) => updateProjectStatus(e.target.value)}
                style={{ width: "auto", padding: "7px 12px", fontSize: 12 }}
              >
                {PROJECT_STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid rgba(240,195,112,0.25)" }}>
        {(["tasks", "files"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="serif"
            style={{
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: activeTab === tab ? 700 : 400,
              color: activeTab === tab ? "#c9a84c" : "#7a6090",
              background: "transparent",
              border: "none",
              borderBottom: activeTab === tab ? "2px solid #c9a84c" : "2px solid transparent",
              cursor: "pointer",
              marginBottom: -1,
              textTransform: "capitalize",
            }}
          >
            {tab} {tab === "files" && allFiles.length > 0 ? `(${allFiles.length})` : ""}
          </button>
        ))}
      </div>

      {/* Tasks Tab */}
      {activeTab === "tasks" && (
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Tasks</span>
            <span style={{ fontSize: 12, color: "#8a7a9a" }}>
              {tasks.filter((t) => t.status === "completed").length}/{tasks.length} complete
            </span>
          </div>
          <div className="panel-body" style={{ padding: 0 }}>
            {tasks.length === 0 && (
              <div style={{ padding: "28px 24px", textAlign: "center", color: "#8a7a9a", fontSize: 13 }}>
                No tasks yet. Add one below.
              </div>
            )}

            {tasks.map((task, idx) => (
              <div key={task.id}>
                {/* Task row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "13px 20px",
                    borderBottom: "1px solid rgba(240,195,112,0.12)",
                    background: task.status === "completed" ? "rgba(240,195,112,0.04)" : "transparent",
                  }}
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => toggleTaskComplete(task)}
                    style={{ width: 16, height: 16, flexShrink: 0, accentColor: "#c9a84c", cursor: "pointer" }}
                  />

                  {/* Title (click to open detail) */}
                  <span
                    onClick={() => setSelectedTask(task)}
                    style={{
                      flex: 1,
                      fontSize: 13.5,
                      color: task.status === "completed" ? "#8a7a9a" : "#1e0a4a",
                      textDecoration: task.status === "completed" ? "line-through" : "none",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    {task.title}
                  </span>

                  {/* Priority pill */}
                  <span className={`pill ${PRIORITY_PILL[task.priority] || "pill-amber"}`} style={{ fontSize: 10, flexShrink: 0 }}>
                    {task.priority}
                  </span>

                  {/* Assignee */}
                  {task.assigned_to && (
                    <span style={{ fontSize: 11, color: "#7a6090", flexShrink: 0 }}>{task.assigned_to}</span>
                  )}

                  {/* Due date */}
                  {task.due_date && (
                    <span style={{ fontSize: 11, color: "#7a6090", flexShrink: 0 }}>
                      {new Date(task.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  )}

                  {/* Subtask expand toggle */}
                  {(task.subtasks?.length || 0) > 0 && (
                    <button
                      onClick={() => toggleExpand(task.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#c9a84c", flexShrink: 0 }}
                    >
                      {expandedTasks.has(task.id) ? "▲" : `▼ ${task.subtasks!.length}`}
                    </button>
                  )}

                  {/* Reorder buttons */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 1, flexShrink: 0 }}>
                    <button onClick={() => moveTask(task.id, "up")} disabled={idx === 0} style={{ background: "none", border: "none", cursor: idx === 0 ? "default" : "pointer", fontSize: 9, color: idx === 0 ? "#ccc" : "#7a6090", lineHeight: 1, padding: "1px 3px" }}>▲</button>
                    <button onClick={() => moveTask(task.id, "down")} disabled={idx === tasks.length - 1} style={{ background: "none", border: "none", cursor: idx === tasks.length - 1 ? "default" : "pointer", fontSize: 9, color: idx === tasks.length - 1 ? "#ccc" : "#7a6090", lineHeight: 1, padding: "1px 3px" }}>▼</button>
                  </div>
                </div>

                {/* Subtasks */}
                {expandedTasks.has(task.id) && (
                  <div style={{ background: "rgba(240,195,112,0.04)", paddingLeft: 48, paddingRight: 20, paddingTop: 6, paddingBottom: 6, borderBottom: "1px solid rgba(240,195,112,0.12)" }}>
                    {(task.subtasks || []).map((sub) => (
                      <div key={sub.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0" }}>
                        <input
                          type="checkbox"
                          checked={sub.status === "completed"}
                          onChange={() => toggleSubtask(task.id, sub)}
                          style={{ width: 14, height: 14, accentColor: "#c9a84c", cursor: "pointer" }}
                        />
                        <span style={{
                          fontSize: 12.5,
                          color: sub.status === "completed" ? "#8a7a9a" : "#2a1a40",
                          textDecoration: sub.status === "completed" ? "line-through" : "none",
                        }}>
                          {sub.title}
                        </span>
                      </div>
                    ))}

                    {/* Add subtask inline */}
                    <div style={{ display: "flex", gap: 6, marginTop: 6, paddingBottom: 4 }}>
                      <input
                        placeholder="Add subtask…"
                        value={newSubtaskTitle[task.id] || ""}
                        onChange={(e) => setNewSubtaskTitle((prev) => ({ ...prev, [task.id]: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === "Enter") addSubtask(task.id); }}
                        style={{ fontSize: 12, padding: "5px 10px", flex: 1 }}
                      />
                      <button className="btn btn-gold btn-sm" onClick={() => addSubtask(task.id)}>+</button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Add Task row */}
            <div style={{ padding: "12px 20px", borderTop: tasks.length > 0 ? "1px solid rgba(240,195,112,0.18)" : "none" }}>
              {addingTask ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    autoFocus
                    placeholder="New task title…"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") addTask(); if (e.key === "Escape") { setAddingTask(false); setNewTaskTitle(""); } }}
                    style={{ flex: 1, fontSize: 13 }}
                  />
                  <button className="btn btn-gold btn-sm" onClick={addTask}>Add</button>
                  <button className="btn btn-outline btn-sm" onClick={() => { setAddingTask(false); setNewTaskTitle(""); }}>Cancel</button>
                </div>
              ) : (
                <button
                  onClick={() => setAddingTask(true)}
                  style={{ background: "none", border: "1px dashed rgba(201,168,76,0.4)", borderRadius: 8, padding: "8px 16px", fontSize: 12.5, color: "#c9a84c", cursor: "pointer", width: "100%", textAlign: "left" }}
                >
                  + Add Task
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Files Tab */}
      {activeTab === "files" && (
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Files</span>
          </div>
          <div className="panel-body">
            {allFiles.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "#8a7a9a" }}>
                <p className="serif" style={{ fontSize: 14 }}>No files attached to tasks yet.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {allFiles.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(240,195,112,0.06)", borderRadius: 9, border: "1px solid rgba(240,195,112,0.2)" }}>
                    <span style={{ fontSize: 18, color: "#c9a84c" }}>◇</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, color: "#1e0a4a", fontWeight: 600 }}>{f.taskTitle}</div>
                      <a href={f.url} target="_blank" rel="noreferrer" style={{ fontSize: 11.5, color: "#5a3090", wordBreak: "break-all" }}>{f.url}</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Task Detail Slide-Out Panel */}
      {selectedTask && (
        <>
          <div
            onClick={() => setSelectedTask(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(30,10,74,0.3)", zIndex: 150 }}
          />
          <div style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: 440,
            height: "100vh",
            background: "#fff",
            boxShadow: "-4px 0 24px rgba(30,10,74,0.12)",
            zIndex: 160,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{ padding: "22px 24px", borderBottom: "1px solid rgba(240,195,112,0.25)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1e0a4a" }}>Task Detail</h3>
              <button onClick={() => setSelectedTask(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#7a6090" }}>✕</button>
            </div>

            <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label>Title</label>
                <input
                  value={selectedTask.title}
                  onChange={(e) => {
                    setSelectedTask((t) => t ? { ...t, title: e.target.value } : t);
                  }}
                  onBlur={(e) => updateTaskField(selectedTask.id, "title", e.target.value)}
                />
              </div>

              <div>
                <label>Description</label>
                <textarea
                  rows={4}
                  value={selectedTask.description || ""}
                  onChange={(e) => setSelectedTask((t) => t ? { ...t, description: e.target.value } : t)}
                  onBlur={(e) => updateTaskField(selectedTask.id, "description", e.target.value)}
                  placeholder="Add a description…"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label>Priority</label>
                  <select
                    value={selectedTask.priority}
                    onChange={(e) => updateTaskField(selectedTask.id, "priority", e.target.value)}
                  >
                    {PRIORITY_OPTIONS.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label>Status</label>
                  <select
                    value={selectedTask.status}
                    onChange={(e) => updateTaskField(selectedTask.id, "status", e.target.value)}
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}</option>)}
                  </select>
                </div>
                <div>
                  <label>Assigned To</label>
                  <input
                    value={selectedTask.assigned_to || ""}
                    onChange={(e) => setSelectedTask((t) => t ? { ...t, assigned_to: e.target.value } : t)}
                    onBlur={(e) => updateTaskField(selectedTask.id, "assigned_to", e.target.value)}
                    placeholder="Team member name"
                  />
                </div>
                <div>
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={selectedTask.due_date || ""}
                    onChange={(e) => updateTaskField(selectedTask.id, "due_date", e.target.value)}
                  />
                </div>
              </div>

              {/* Subtasks in panel */}
              <div>
                <label>Subtasks</label>
                <div style={{ border: "1px solid rgba(240,195,112,0.3)", borderRadius: 10, overflow: "hidden" }}>
                  {(selectedTask.subtasks || []).length === 0 && (
                    <div style={{ padding: "10px 14px", fontSize: 12, color: "#8a7a9a" }}>No subtasks yet.</div>
                  )}
                  {(selectedTask.subtasks || []).map((sub) => (
                    <div key={sub.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderBottom: "1px solid rgba(240,195,112,0.12)" }}>
                      <input
                        type="checkbox"
                        checked={sub.status === "completed"}
                        onChange={() => toggleSubtask(selectedTask.id, sub)}
                        style={{ width: 14, height: 14, accentColor: "#c9a84c" }}
                      />
                      <span style={{ fontSize: 12.5, color: sub.status === "completed" ? "#8a7a9a" : "#2a1a40", textDecoration: sub.status === "completed" ? "line-through" : "none" }}>
                        {sub.title}
                      </span>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 6, padding: "8px 10px" }}>
                    <input
                      placeholder="Add subtask…"
                      value={newSubtaskTitle[selectedTask.id] || ""}
                      onChange={(e) => setNewSubtaskTitle((prev) => ({ ...prev, [selectedTask.id]: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addSubtask(selectedTask.id).then(() => {
                            // Sync subtasks back to selectedTask
                            const updated = tasks.find((t) => t.id === selectedTask.id);
                            if (updated) setSelectedTask({ ...updated });
                          });
                        }
                      }}
                      style={{ flex: 1, fontSize: 12, padding: "5px 10px" }}
                    />
                    <button className="btn btn-gold btn-sm" onClick={() => {
                      addSubtask(selectedTask.id).then(() => {
                        const updated = tasks.find((t) => t.id === selectedTask.id);
                        if (updated) setSelectedTask({ ...updated });
                      });
                    }}>+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
      )}
    </>
  );
}
