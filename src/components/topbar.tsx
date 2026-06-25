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
  "/dashboard/worksheets": "Worksheets",
  "/dashboard/ai-brain": "AI Brain",
  "/dashboard/messaging": "Messaging",
  "/dashboard/team": "Team Management",
  "/dashboard/notifications": "Notifications",
  "/dashboard/journey": "My Journey",
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
        <span className="topbar-badge">{"\u2726"} 3 Tasks Due</span>
        <div className="avatar">CB</div>
      </div>
      <style jsx>{`
        .topbar {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(240, 195, 112, 0.25);
          padding: 0 36px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .page-title {
          font-size: 24px;
          font-weight: 700;
          color: #1e0a4a;
          letter-spacing: 0.3px;
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .greeting {
          font-size: 14px;
          color: #5a4070;
          font-style: italic;
          font-family: "Cormorant Garamond", "Georgia", serif;
        }
        .topbar-badge {
          background: #e8b84b;
          color: #1e0a4a;
          border-radius: 20px;
          padding: 5px 14px;
          font-size: 12px;
          font-weight: 700;
          font-family: "DM Sans", sans-serif;
        }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a84c, #e8b84b);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "DM Sans", sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #1e0a4a;
          letter-spacing: 0.5px;
          border: 2px solid rgba(240, 195, 112, 0.5);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
