"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        setError(authError.message);
      } else {
        window.location.href = "/dashboard";
      }
    } catch {
      setError("Unable to connect to auth service. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #1e0a4a 0%, #2d1260 40%, #1e0a4a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: 20,
          padding: "48px 40px",
          maxWidth: 440,
          width: "100%",
          boxShadow: "0 12px 60px rgba(30,10,74,0.35)",
          border: "1px solid rgba(240,195,112,0.3)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782365592080-Be_A_Better_Brand_Logo.png"
            alt="Be a Better Brand"
            style={{
              maxHeight: 64,
              marginBottom: 20,
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              filter: "drop-shadow(0 4px 12px rgba(30,10,74,0.25))",
            }}
          />
          <h1
            className="serif"
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#1e0a4a",
              marginBottom: 6,
            }}
          >
            Command Center
          </h1>
          <p style={{ fontSize: 14, color: "#7a6090", fontStyle: "italic" }}>
            Sign in to your dashboard
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "#fce0e0",
              color: "#8a2020",
              padding: "12px 16px",
              borderRadius: 10,
              fontSize: 14,
              marginBottom: 20,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 18 }}>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="chrissy@beabetterbrand.com"
              required
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"●".repeat(8)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-gold"
            disabled={loading}
            style={{ width: "100%", textAlign: "center", fontSize: 15, padding: "14px 20px" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 13,
            color: "#7a6090",
          }}
        >
          <a href="/auth/reset-password" style={{ color: "#c9a84c", textDecoration: "none" }}>
            Forgot your password?
          </a>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: 28,
            paddingTop: 18,
            borderTop: "1px solid rgba(240,195,112,0.2)",
            fontSize: 12,
            color: "#9a8aaa",
            fontStyle: "italic",
          }}
        >
          Finally Seen Framework&trade; &middot; Be a Better Brand
        </div>
      </div>
    </div>
  );
}
