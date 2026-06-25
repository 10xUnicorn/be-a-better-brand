"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/dashboard": "Command Overview",
  "/dashboard/kpis": "KPIs & Reports",
  "/dashboard/pipeline": "Pipeline & Deals",
  "/dashboard/clients": "Clients & Journey",
  "/dashboard/finance": "Finance & Stripe",
  "/dashboard/content": "Content & Media",
  "/dashboard/portal": "Client Portal",
  "/dashboard/settings": "Settings",
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Topbar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Dashboard";

  return (
    <div className="topbar">
      <div className="page-title serif">{title}</div>
      <div className="topbar-right">
        <span className="greeting">{getGreeting()}, Chrissy</span>
        <span className="topbar-badge">✦ 3 Tasks Due</span>
        <div className="avatar">CB</div>
      </div>
      <style jsx>{`
        .topbar {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(240, 195, 112, 0.25);
          padding: 0 32px;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .page-title {
          font-size: 20px;
          font-weight: 700;
          color: #1e0a4a;
          letter-spacing: 0.3px;
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .greeting {
          font-size: 12.5px;
          color: #5a4070;
          font-style: italic;
          font-family: "Cormorant Garamond", "Georgia", serif;
        }
        .topbar-badge {
          background: #e8b84b;
          color: #1e0a4a;
          border-radius: 20px;
          padding: 3px 10px;
          font-size: 11px;
          font-weight: 700;
          font-family: "Cormorant Garamond", "Georgia", serif;
        }
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a84c, #e8b84b);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Cormorant Garamond", "Georgia", serif;
          font-size: 13px;
          font-weight: 700;
          color: #1e0a4a;
          letter-spacing: 0.5px;
          border: 2px solid rgba(240, 195, 112, 0.5);
        }
      `}</style>
    </div>
  );
}
