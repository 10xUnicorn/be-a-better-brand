"use client";
import { useState } from "react";
import { aiDiagnostics } from "@/lib/mock-data";

const promptTemplates = [
  { label: "LinkedIn Post", type: "linkedin", prompt: "Write a LinkedIn post positioning me as a brand authority on [topic]" },
  { label: "Pitch Email", type: "pitch", prompt: "Draft a pitch email for [media outlet] about [client story]" },
  { label: "Newsletter Intro", type: "newsletter", prompt: "Write a newsletter intro using the Finally Seen Framework narrative" },
];

export default function AIBrainPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: selectedTemplate || "default" }),
      });
      const data = await res.json();
      setResult(data.content || "No response generated.");
    } catch {
      setResult("AI service unavailable. Connect your API key in Settings.");
    }
    setLoading(false);
  };

  return (
    <>
      {/* Diagnostics */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">AI Brand Diagnostics — Constraint Alerts</span>
          <span className="pill pill-purple">AI Brain™</span>
        </div>
        <div className="panel-body">
          {aiDiagnostics.map((d, i) => (
            <div key={i} className="ai-card">
              <div className="serif" style={{ fontSize: 12, fontWeight: 700, color: "#1e0a4a", marginBottom: 4 }}>
                {d.icon} {d.title}
              </div>
              <div style={{ fontSize: 11.5, color: "#5a4070", fontStyle: "italic", lineHeight: 1.6 }}>{d.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Composer */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">AI Content Composer</span>
          <span className="pill pill-gold">Generate</span>
        </div>
        <div className="panel-body">
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {promptTemplates.map((t) => (
              <button
                key={t.type}
                onClick={() => { setSelectedTemplate(t.type); setPrompt(t.prompt); }}
                className={`btn ${selectedTemplate === t.type ? "btn-gold" : "btn-outline"} btn-sm`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder="Enter your prompt or select a template above..."
              style={{ resize: "vertical" }}
            />
          </div>
          <button onClick={handleGenerate} disabled={loading} className="btn btn-gold" style={{ marginBottom: 16 }}>
            {loading ? "Generating..." : "Generate Content"}
          </button>
          {result && (
            <div style={{ background: "rgba(240,195,112,0.08)", border: "1px solid rgba(240,195,112,0.2)", borderRadius: 11, padding: 16 }}>
              <div className="serif" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "1.8px", color: "#7a6090", marginBottom: 8, fontWeight: 600 }}>
                AI Output
              </div>
              <pre style={{ fontSize: 12.5, color: "#2a1a40", lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "'DM Sans', sans-serif" }}>{result}</pre>
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button className="btn btn-gold btn-sm" onClick={() => navigator.clipboard.writeText(result)}>Copy</button>
                <button className="btn btn-outline btn-sm">Use This Draft</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
