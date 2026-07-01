-- KPI tracking tables for Be a Better Brand client portal
-- Run via: GET /api/migrate-kpi  OR apply manually in Supabase SQL editor

-- PR/Media pitches tracking
CREATE TABLE IF NOT EXISTS client_pitches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  publication TEXT NOT NULL,
  journalist TEXT,
  pitch_type TEXT DEFAULT 'article' CHECK (pitch_type IN ('article','podcast','tv','radio','newsletter','other')),
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted','followed_up','placed','declined','pending')),
  submitted_date DATE DEFAULT CURRENT_DATE,
  placed_date DATE,
  placement_url TEXT,
  domain_authority INT,
  potential_reach INT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Podcast bookings tracking
CREATE TABLE IF NOT EXISTS client_podcast_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  show_name TEXT NOT NULL,
  host_name TEXT,
  booking_status TEXT DEFAULT 'booked' CHECK (booking_status IN ('pitched','booked','recorded','live','declined')),
  record_date DATE,
  publish_date DATE,
  episode_url TEXT,
  monthly_listeners INT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Monthly KPI snapshots per client
CREATE TABLE IF NOT EXISTS client_kpi_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  month DATE NOT NULL,
  pitches_submitted INT DEFAULT 0,
  pitches_won INT DEFAULT 0,
  podcast_bookings INT DEFAULT 0,
  pieces_live INT DEFAULT 0,
  calls_booked INT DEFAULT 0,
  total_reach INT DEFAULT 0,
  calls_goal INT DEFAULT 0,
  reach_goal INT DEFAULT 0,
  ai_insights TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(client_id, month)
);

-- Enable RLS
ALTER TABLE client_pitches ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_podcast_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_kpi_snapshots ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY cp_internal ON client_pitches FOR ALL USING (get_user_role() IN ('owner','team_member'));
CREATE POLICY cp_client ON client_pitches FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE profile_id = auth.uid()));
CREATE POLICY cpb_internal ON client_podcast_bookings FOR ALL USING (get_user_role() IN ('owner','team_member'));
CREATE POLICY cpb_client ON client_podcast_bookings FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE profile_id = auth.uid()));
CREATE POLICY cks_internal ON client_kpi_snapshots FOR ALL USING (get_user_role() IN ('owner','team_member'));
CREATE POLICY cks_client ON client_kpi_snapshots FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE profile_id = auth.uid()));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_cp_client ON client_pitches(client_id);
CREATE INDEX IF NOT EXISTS idx_cpb_client ON client_podcast_bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_cks_client ON client_kpi_snapshots(client_id, month DESC);
