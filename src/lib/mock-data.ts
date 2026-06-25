// Mock data for demo — will be replaced by Supabase queries when DB is connected

export const kpiOverview = {
  mrr: "$38,500",
  mrrTrend: "▲ 14% vs last month",
  activeRetainers: "7",
  retainerTrend: "▲ 2 new this quarter",
  pipelineValue: "$112,000",
  pipelineTrend: "◆ 4 proposals pending",
  mediaPlacements: "23",
  mediaTrend: "▲ Forbes, Inc, Fast Co.",
};

export const kpiReports = {
  ytdRevenue: "$224,400",
  ytdTrend: "▲ On track for $420K",
  avgLtv: "$28,500",
  ltvTrend: "▲ Up $4,200 vs Q1",
  closeRate: "34%",
  closeTrend: "◆ Industry avg: 22%",
  podcastDownloads: "9,840",
  podcastTrend: "▲ 18% MoM",
};

export const kpiPipeline = {
  totalPipeline: "$112,000",
  pipelineTrend: "▲ 4 active proposals",
  avgDeal: "$28,000",
  dealTrend: "◆ 6-mo retainer avg",
  closeRate: "34%",
  closeTrend: "▲ +8pts this quarter",
  estClose: "$36,500",
  estTrend: "▲ 2 deals near close",
};

export const kpiClients = {
  totalActive: "13",
  activeTrend: "▲ 2 onboarded this month",
  avgPhase: "Phase 3",
  phaseTrend: "◆ Visibility Engine",
  retention: "91%",
  retentionTrend: "▲ +5pts vs last year",
  nps: "74",
  npsTrend: "▲ World class (>70)",
};

export const frameworkPhases = [
  { num: 1, name: "Clarity Core", sub: "Brand Architecture Gap Session — 3 clients", pill: "In Progress", pillClass: "pill-amber" },
  { num: 2, name: "Authority Positioning", sub: "Signature messaging + thought leadership — 2 clients", pill: "Active", pillClass: "pill-gold" },
  { num: 3, name: "Visibility Engine", sub: "PR + media outreach — 5 clients", pill: "Live", pillClass: "pill-green" },
  { num: 4, name: "Proof & Momentum", sub: "Case studies + social proof loops — 3 clients", pill: "Building", pillClass: "pill-purple" },
];

export const recentActivity = [
  { text: "Sarah M. completed Brand Architecture Gap Session — moved to Authority Positioning", time: "2 hours ago", color: "#c9a84c" },
  { text: "Forbes pitch accepted for client Danielle R. — feature scheduled May 28", time: "Yesterday, 4:12 PM", color: "#331081" },
  { text: "Stripe payment received — Book Launch Sprint Month 3: $5,000", time: "Yesterday, 9:00 AM", color: "#2a7a3a" },
  { text: 'UpLevel Podcast Ep. 94 published — "How Founders Kill Their Own Visibility"', time: "2 days ago", color: "#c9a84c" },
  { text: "New lead: Monica T. — Fractional CMO inquiry, $8,500/mo tier", time: "3 days ago", color: "#8a2020" },
];

export const offerMix = [
  { offer: "Brand Architecture & Visibility Retainer", price: "$5,000/mo", active: "5 clients", mrr: "$25,000", duration: "6 months", status: "Active", pillClass: "pill-green" },
  { offer: "Book Launch Sprint", price: "$5,000/mo", active: "2 clients", mrr: "$10,000", duration: "3–4 months", status: "Active", pillClass: "pill-green" },
  { offer: "Fractional CMO", price: "$8,500/mo", active: "1 client", mrr: "$8,500", duration: "Ongoing", status: "Renewing", pillClass: "pill-gold" },
  { offer: "Brand Architecture Gap Session", price: "$750 one-time", active: "—", mrr: "$2,250 (MTD)", duration: "1 session", status: "Pipeline", pillClass: "pill-amber" },
  { offer: "Six Figure Chicks — Signature", price: "$1,200/mo", active: "4 members", mrr: "$4,800", duration: "12 months", status: "Cohort", pillClass: "pill-purple" },
];

export const revenueByOffer = [
  { name: "Brand Architecture Retainer", amount: "$25,000", pct: 75 },
  { name: "Fractional CMO", amount: "$8,500", pct: 26 },
  { name: "Book Launch Sprint", amount: "$10,000", pct: 30 },
  { name: "Six Figure Chicks", amount: "$4,800", pct: 14 },
  { name: "Gap Sessions", amount: "$2,250", pct: 7 },
];

export const visibilityPlacements = [
  { publication: "Forbes.com", client: "Danielle R.", status: "Live May 28", pillClass: "pill-green" },
  { publication: "Inc. Magazine", client: "Monica T.", status: "Editing", pillClass: "pill-amber" },
  { publication: "Fast Company", client: "Sarah M.", status: "Pitched", pillClass: "pill-purple" },
  { publication: "Entrepreneur", client: "Lisa W.", status: "In Review", pillClass: "pill-gold" },
];

export const aiDiagnostics = [
  { icon: "⚡", title: "Constraint Detected: Monica T. (Fractional CMO)", body: '"Authority signals are strong but audience alignment is fragmented across 3 channels with inconsistent messaging. Recommended: Authority Positioning sprint before expanding media outreach. Risk of diluting credibility at scale."' },
  { icon: "✦", title: "Opportunity: Sarah M. (Book Launch)", body: '"Pre-launch momentum exceeds baseline by 42%. Newsletter open rates at 61%. Recommend accelerating Proof & Momentum phase — launch testimonial campaign now to maximize pre-order window."' },
  { icon: "◈", title: "Revenue Projection — Next 60 Days", body: '"Based on pipeline activity and renewal probability (87%), projected MRR for July: $44,200. Two deals in final-stage negotiation represent $13,500 in incremental monthly revenue if closed by June 15."' },
];

export const pipelineDeals = {
  discovery: [
    { name: "Monica T.", sub: "Author — Fractional CMO interest", val: "$8,500/mo", pill: "Inquiry", pillClass: "pill-amber" },
    { name: "Rachel P.", sub: "Founder — Gap Session booked", val: "$750", pill: "New Lead", pillClass: "pill-amber" },
  ],
  proposal: [
    { name: "Jenna W.", sub: "Speaker — Visibility Retainer", val: "$5,000/mo × 6", pill: "Reviewing", pillClass: "pill-purple" },
    { name: "Andrea K.", sub: "Author — Book Launch Sprint", val: "$5,000/mo × 4", pill: "Reviewing", pillClass: "pill-purple" },
  ],
  negotiating: [
    { name: "Tamara B.", sub: "CEO — Fractional CMO", val: "$7,500/mo", pill: "Counter Sent", pillClass: "pill-gold" },
  ],
  won: [
    { name: "Lisa W.", sub: "Author — Six Figure Chicks", val: "$1,200/mo", pill: "Signed", pillClass: "pill-green" },
    { name: "Cynthia D.", sub: "Founder — Architecture Retainer", val: "$5,000/mo × 6", pill: "Contract Out", pillClass: "pill-green" },
  ],
};

export const clientRoster = [
  { name: "Danielle R.", type: "Author", offer: "Visibility Retainer", phase: "Phase 3", phaseClass: "pill-purple", mrr: "$5,000", renewal: "Sep 2025", health: "Excellent", healthClass: "pill-green" },
  { name: "Sarah M.", type: "Author", offer: "Book Launch Sprint", phase: "Phase 4", phaseClass: "pill-gold", mrr: "$5,000", renewal: "Jul 2025", health: "Excellent", healthClass: "pill-green" },
  { name: "Christine L.", type: "Founder", offer: "Fractional CMO", phase: "Phase 3", phaseClass: "pill-purple", mrr: "$8,500", renewal: "Ongoing", health: "Renewing", healthClass: "pill-gold" },
  { name: "Yolanda T.", type: "Speaker", offer: "Visibility Retainer", phase: "Phase 2", phaseClass: "pill-amber", mrr: "$5,000", renewal: "Oct 2025", health: "Strong", healthClass: "pill-green" },
  { name: "Brianna K.", type: "Author / SFC", offer: "Six Figure Chicks", phase: "Phase 4", phaseClass: "pill-gold", mrr: "$1,200", renewal: "Dec 2025", health: "Excellent", healthClass: "pill-green" },
  { name: "Monique F.", type: "Founder", offer: "Gap Session → Retainer", phase: "Phase 1", phaseClass: "pill-amber", mrr: "$5,000", renewal: "Nov 2025", health: "Onboarding", healthClass: "pill-amber" },
  { name: "Tina A.", type: "Author", offer: "Visibility Retainer", phase: "Phase 3", phaseClass: "pill-purple", mrr: "$5,000", renewal: "Jan 2026", health: "Strong", healthClass: "pill-green" },
  { name: "Angela M.", type: "Founder / SFC", offer: "Six Figure Chicks", phase: "Phase 2", phaseClass: "pill-amber", mrr: "$1,200", renewal: "Mar 2026", health: "Active", healthClass: "pill-green" },
];

export const financeInvoices = [
  { client: "Danielle R.", amount: "$5,000", offer: "Visibility Retainer", status: "Paid", statusClass: "pill-green", due: "Jun 1, 2025", stripeId: "inv_DRxxx01" },
  { client: "Sarah M.", amount: "$5,000", offer: "Book Launch Sprint", status: "Paid", statusClass: "pill-green", due: "Jun 1, 2025", stripeId: "inv_SMxxx02" },
  { client: "Christine L.", amount: "$8,500", offer: "Fractional CMO", status: "Paid", statusClass: "pill-green", due: "Jun 1, 2025", stripeId: "inv_CLxxx03" },
  { client: "Yolanda T.", amount: "$5,000", offer: "Visibility Retainer", status: "Sent", statusClass: "pill-amber", due: "Jun 15, 2025", stripeId: "inv_YTxxx04" },
  { client: "Monica T.", amount: "$750", offer: "Gap Session", status: "Draft", statusClass: "pill-purple", due: "—", stripeId: "—" },
  { client: "Brianna K.", amount: "$1,200", offer: "Six Figure Chicks", status: "Overdue", statusClass: "pill-red", due: "May 28, 2025", stripeId: "inv_BKxxx06" },
];

export const contentCalendar = [
  { day: "28", month: "Jun", title: "Forbes Feature — Danielle R.", type: "Media", status: "Scheduled", statusClass: "pill-green" },
  { day: "25", month: "Jun", title: "UpLevel Ep. 95: \"Visibility Without Vanity Metrics\"", type: "Podcast", status: "Recording", statusClass: "pill-amber" },
  { day: "22", month: "Jun", title: "LinkedIn: Authority Positioning for Authors", type: "Social", status: "Drafting", statusClass: "pill-purple" },
  { day: "20", month: "Jun", title: "Newsletter: Finally Seen Framework Deep Dive", type: "Email", status: "In Review", statusClass: "pill-gold" },
  { day: "18", month: "Jun", title: "Instagram Carousel: Client Success Spotlight", type: "Social", status: "Idea", statusClass: "pill-amber" },
  { day: "15", month: "Jun", title: "Entrepreneur Pitch — Lisa W.", type: "PR Pitch", status: "Pitched", statusClass: "pill-purple" },
];

export const portalDeliverables = [
  { title: "Brand Architecture Blueprint", phase: "Clarity Core", date: "Jun 10, 2025", status: "Approved", statusClass: "pill-green" },
  { title: "Signature Messaging Guide", phase: "Authority Positioning", date: "Jun 5, 2025", status: "Pending Review", statusClass: "pill-amber" },
  { title: "PR Media Targets List", phase: "Visibility Engine", date: "May 28, 2025", status: "Approved", statusClass: "pill-green" },
  { title: "Thought Leadership Calendar", phase: "Authority Positioning", date: "May 20, 2025", status: "Revision Requested", statusClass: "pill-red" },
];

export const portalMessages = [
  { from: "Chrissy Bernal", initials: "CB", message: "Your Forbes feature is confirmed for June 28! We'll prep talking points next week.", time: "Today, 10:15 AM", isTeam: true },
  { from: "Danielle R.", initials: "DR", message: "Amazing news! I'll review the draft by Friday. Can we move our call to Tuesday?", time: "Today, 11:30 AM", isTeam: false },
  { from: "Team — Maya L.", initials: "ML", message: "Updated your media kit with the new headshots. Please review in the File Vault.", time: "Yesterday, 3:45 PM", isTeam: true },
];

export type SidebarItem = {
  label: string;
  icon: string;
  href: string;
};

export type SidebarGroup = {
  title: string;
  items: SidebarItem[];
};

export const sidebarNav: SidebarGroup[] = [
  {
    title: "Command",
    items: [
      { label: "Overview", icon: "◈", href: "/dashboard" },
      { label: "KPIs & Reports", icon: "◉", href: "/dashboard/kpis" },
    ],
  },
  {
    title: "Growth",
    items: [
      { label: "Pipeline & Deals", icon: "◈", href: "/dashboard/pipeline" },
      { label: "Clients & Journey", icon: "✦", href: "/dashboard/clients" },
      { label: "Finance & Stripe", icon: "◎", href: "/dashboard/finance" },
    ],
  },
  {
    title: "Visibility",
    items: [
      { label: "Content & Media", icon: "✧", href: "/dashboard/content" },
      { label: "Client Portal", icon: "⬡", href: "/dashboard/portal" },
    ],
  },
];
