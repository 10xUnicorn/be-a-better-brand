"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarNav } from "@/lib/mock-data";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="sidebar">
      <div className="logo-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782365592080-Be_A_Better_Brand_Logo.png"
          alt="Be a Better Brand"
          style={{ width: "100%", maxHeight: 56, objectFit: "contain" }}
        />
      </div>

      {sidebarNav.map((group) => (
        <div key={group.title} className="nav-section">
          <div className="nav-label">{group.title}</div>
          {group.items.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span> {item.label}
              </Link>
            );
          })}
        </div>
      ))}

      <div className="sidebar-footer">Finally Seen Framework™ v2.0</div>

      <style jsx>{`
        .sidebar {
          width: 240px;
          min-height: 100vh;
          background: #1e0a4a;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 100;
          border-right: 1px solid #2d1260;
        }
        .logo-wrap {
          padding: 22px 20px 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .nav-section {
          padding: 14px 14px 4px;
        }
        .nav-label {
          font-family: "Cormorant Garamond", "Georgia", serif;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(240, 195, 112, 0.55);
          font-weight: 600;
          margin-bottom: 6px;
          padding-left: 4px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 8px 12px;
          border-radius: 9px;
          cursor: pointer;
          font-family: "Cormorant Garamond", "Georgia", serif;
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.78);
          transition: all 0.18s;
          margin-bottom: 2px;
          letter-spacing: 0.2px;
          text-decoration: none;
        }
        .nav-item:hover {
          background: rgba(240, 195, 112, 0.12);
          color: #f0c370;
        }
        .nav-item.active {
          background: linear-gradient(
            135deg,
            rgba(240, 195, 112, 0.22),
            rgba(240, 195, 112, 0.08)
          );
          color: #f0c370;
          font-weight: 600;
          border-left: 2px solid #f0c370;
          padding-left: 10px;
        }
        .nav-icon {
          font-size: 14px;
          width: 18px;
          text-align: center;
          opacity: 0.85;
        }
        .sidebar-footer {
          margin-top: auto;
          padding: 14px 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 10.5px;
          color: rgba(255, 255, 255, 0.35);
          font-style: italic;
          font-family: "Cormorant Garamond", "Georgia", serif;
        }
      `}</style>
    </nav>
  );
}
