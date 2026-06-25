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

      <div className="nav-scroll">
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
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">Finally Seen Framework&trade; v2.0</div>

      <style jsx>{`
        .sidebar {
          width: 260px;
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
          padding: 24px 22px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .nav-scroll {
          flex: 1;
          overflow-y: auto;
          padding-bottom: 12px;
        }
        .nav-section {
          padding: 16px 16px 8px;
        }
        .nav-label {
          font-family: "DM Sans", sans-serif;
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(240, 195, 112, 0.5);
          font-weight: 700;
          margin-bottom: 10px;
          padding-left: 6px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
          font-family: "DM Sans", sans-serif;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.18s;
          margin-bottom: 4px;
          letter-spacing: 0.2px;
          text-decoration: none;
          white-space: nowrap;
        }
        .nav-item:hover {
          background: rgba(240, 195, 112, 0.12);
          color: #f0c370;
        }
        .nav-item.active {
          background: linear-gradient(
            135deg,
            rgba(240, 195, 112, 0.25),
            rgba(240, 195, 112, 0.1)
          );
          color: #f0c370;
          font-weight: 600;
          border-left: 3px solid #f0c370;
          padding-left: 11px;
        }
        .nav-icon {
          font-size: 16px;
          width: 22px;
          text-align: center;
          opacity: 0.85;
          flex-shrink: 0;
        }
        .nav-text {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sidebar-footer {
          margin-top: auto;
          padding: 16px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 11px;
          color: rgba(255, 255, 255, 0.3);
          font-style: italic;
          font-family: "Cormorant Garamond", "Georgia", serif;
        }
      `}</style>
    </nav>
  );
}
