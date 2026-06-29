"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

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
  "/dashboard/projects": "Projects",
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const title = pageTitles[pathname] || (pathname.startsWith("/dashboard/clients/") ? "Client Detail" : pathname.startsWith("/dashboard/pipeline/") ? "Deal Detail" : "Dashboard");

  const [userName, setUserName] = useState("");
  const [initials, setInitials] = useState("?");

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      const name = profile?.full_name || user.email?.split("@")[0] || "User";
      setUserName(name.split(" ")[0]);
      setInitials(
        name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
      );
    };
    load();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <div className="topbar">
      <div className="page-title serif">{title}</div>
      <div className="topbar-right">
        {userName && (
          <span className="greeting">{getGreeting()}, {userName}</span>
        )}
        <span className="topbar-badge">{"\u2726"} Command Center</span>
        <div className="avatar" onClick={handleLogout} title="Sign out">
          {initials || "?"}
        </div>
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
        .avatar:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
