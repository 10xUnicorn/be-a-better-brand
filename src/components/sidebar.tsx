"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarNav } from "@/lib/mock-data";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
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
        borderRight: "1px solid #2d1260",
        overflowY: "auto",
      }}>
        {/* Logo */}
        <div style={{ padding: "24px 22px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782365592080-Be_A_Better_Brand_Logo.png"
            alt="Be a Better Brand"
            style={{ width: "100%", maxHeight: 56, objectFit: "contain" }}
          />
        </div>

        {/* Nav sections */}
        <div style={{ flex: 1, paddingBottom: 16 }}>
          {sidebarNav.map((group) => (
            <div key={group.title} style={{ padding: "18px 16px 6px" }}>
              {/* Section label */}
              <div style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: 11,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "rgba(240,195,112,0.6)",
                fontWeight: 700,
                marginBottom: 8,
                paddingLeft: 8,
              }}>
                {group.title}
              </div>

              {/* Nav items — each on its own line */}
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
                      alignItems: "center",
                      gap: 10,
                      padding: isActive ? "10px 12px 10px 10px" : "10px 12px",
                      borderRadius: 10,
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#f0c370" : "rgba(255,255,255,0.82)",
                      textDecoration: "none",
                      marginBottom: 3,
                      background: isActive
                        ? "linear-gradient(135deg, rgba(240,195,112,0.2), rgba(240,195,112,0.08))"
                        : "transparent",
                      borderLeft: isActive ? "3px solid #f0c370" : "3px solid transparent",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "rgba(240,195,112,0.1)";
                        (e.currentTarget as HTMLElement).style.color = "#f0c370";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.82)";
                      }
                    }}
                  >
                    <span style={{ fontSize: 15, width: 20, textAlign: "center", flexShrink: 0 }}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: "14px 20px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          fontSize: 11,
          color: "rgba(255,255,255,0.25)",
          fontStyle: "italic",
          fontFamily: "Cormorant Garamond, Georgia, serif",
          flexShrink: 0,
        }}>
          Finally Seen Framework&trade; v2.0
        </div>
      </nav>
    </>
  );
}
