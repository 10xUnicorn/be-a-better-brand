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
    } catch (err) {
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
          borderRadius: 16,
          padding: "40px 36px",
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 8px 40px rgba(30,10,74,0.3)",
          border: "1px solid rgba(240,195,112,0.3)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782365592080-Be_A_Better_Brand_Logo.png"
            alt="Be a Better Brand"
            style={{ maxHeight: 56, marginBottom: 16 }}
          />
          <h1
            className="serif"
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#1e0a4a",
              marginBottom: 4,
            }}
          >
            Command Center
          </h1>
          <p style={{ fontSize: 13, color: "#7a6090", fontStyle: "italic" }}>
            Sign in to your dashboard
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "#fce0e0",
              color: "#8a2020",
              padding: "10px 14px",
              borderRadius: 8,
              fontSize: 13,
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="chrissy@beabetterbrand.com"
              required
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-gold"
            disabled={loading}
            style={{ width: "100%", textAlign: "center", fontSize: 14, padding: "12px 20px" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: 16,
            fontSize: 12,
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
            marginTop: 24,
            paddingTop: 16,
            borderTop: "1px solid rgba(240,195,112,0.2)",
            fontSize: 10,
            color: "#9a8aaa",
            fontStyle: "italic",
          }}
        >
          Finally Seen Framework™ · Be a Better Brand
        </div>
      </div>
    </div>
  );
}
