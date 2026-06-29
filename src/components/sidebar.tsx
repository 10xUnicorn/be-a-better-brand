"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarNav } from "@/lib/mock-data";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav style={{
      width: 260,
      minHeight: "100vh",
      background: "#1e0a4a",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 100,
      borderRight: "1px solid rgba(255,255,255,0.06)",
    }}>
      {/* Logo */}
      <div style={{ padding: "24px 22px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782365592080-Be_A_Better_Brand_Logo.png"
          alt="Be a Better Brand"
          style={{ width: "100%", maxHeight: 56, objectFit: "contain" }}
        />
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 16 }}>
        {sidebarNav.map((group) => (
          <div key={group.title} style={{ paddingTop: 20, paddingBottom: 4, paddingLeft: 16, paddingRight: 16 }}>
            {/* Section label — larger, bolder, clearly visible */}
            <div style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.65)",
              marginBottom: 10,
              paddingLeft: 10,
            }}>
              {group.title}
            </div>

            {/* Each nav item gets its own full row */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {group.items.map((item) => {
                const isActive = item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      borderRadius: 9,
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: "0.1px",
                      color: isActive ? "#f0c370" : "rgba(255,255,255,0.85)",
                      textDecoration: "none",
                      background: isActive
                        ? "linear-gradient(135deg, rgba(240,195,112,0.18), rgba(240,195,112,0.07))"
                        : "transparent",
                      borderLeft: isActive ? "3px solid #c9a84c" : "3px solid transparent",
                      transition: "background 0.15s, color 0.15s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ fontSize: 14, width: 20, textAlign: "center", flexShrink: 0, opacity: isActive ? 1 : 0.75 }}>
                      {item.icon}
                    </span>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: "14px 20px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        fontSize: 11,
        color: "rgba(255,255,255,0.22)",
        fontStyle: "italic",
        fontFamily: "Cormorant Garamond, Georgia, serif",
        flexShrink: 0,
      }}>
        Finally Seen Framework&trade; v2.0
      </div>
    </nav>
  );
}
