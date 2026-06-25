-- Be a Better Brand — Full Database Schema
-- Run this against your Supabase project after creation

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('owner', 'team_member', 'client', 'collaborator', 'sfc_member')),
  avatar_url TEXT,
  phone TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  notification_preferences JSONB DEFAULT '{"email_enabled": true, "digest_mode": false}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_count INT;
  assigned_role TEXT;
BEGIN
  SELECT COUNT(*) INTO user_count FROM profiles;
  -- First user becomes owner
  IF user_count = 0 THEN
    assigned_role := 'owner';
  ELSE
    assigned_role := COALESCE(NEW.raw_user_meta_data->>'role', 'client');
  END IF;

  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    assigned_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- SFC TIERS
-- ============================================
CREATE TABLE sfc_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  duration_months INT NOT NULL DEFAULT 12,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO sfc_tiers (name, price, duration_months, description) VALUES
  ('Six Figure Chicks — Signature', 1200, 12, 'Core SFC membership with full framework access'),
  ('Six Figure Chicks — VIP', 2500, 12, 'VIP tier with 1:1 strategy sessions'),
  ('Six Figure Chicks — Elite', 5000, 6, 'Elite intensive with done-for-you deliverables');

-- ============================================
-- CLIENTS
-- ============================================
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  offer_tier TEXT NOT NULL DEFAULT 'gap_session' CHECK (offer_tier IN ('gap_session', 'retainer', 'book_launch', 'fractional_cmo', 'sfc')),
  brand_url TEXT,
  linkedin TEXT,
  instagram TEXT,
  assigned_team_member_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  start_date DATE,
  contract_end_date DATE,
  notes TEXT,
  health_score INT NOT NULL DEFAULT 50 CHECK (health_score >= 0 AND health_score <= 100),
  current_phase INT NOT NULL DEFAULT 1 CHECK (current_phase >= 1 AND current_phase <= 4),
  mrr NUMERIC(10,2) NOT NULL DEFAULT 0,
  client_type TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- PIPELINE DEALS
-- ============================================
CREATE TABLE pipeline_deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_name TEXT NOT NULL,
  contact_email TEXT,
  contact_type TEXT,
  offer_tier TEXT NOT NULL DEFAULT 'gap_session',
  estimated_value NUMERIC(10,2) NOT NULL DEFAULT 0,
  monthly_value NUMERIC(10,2),
  duration_months INT,
  stage TEXT NOT NULL DEFAULT 'discovery' CHECK (stage IN ('discovery', 'proposal_sent', 'negotiating', 'won', 'lost')),
  assigned_team_member_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  next_follow_up DATE,
  lost_reason TEXT CHECK (lost_reason IS NULL OR lost_reason IN ('price', 'timing', 'competitor', 'no_response', 'not_a_fit')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- INVOICES
-- ============================================
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  offer_tier TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'void')),
  due_date DATE NOT NULL,
  stripe_invoice_id TEXT,
  stripe_checkout_url TEXT,
  line_items JSONB DEFAULT '[]'::jsonb,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- CONTENT
-- ============================================
CREATE TABLE content_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'blog' CHECK (content_type IN ('podcast', 'newsletter', 'linkedin', 'instagram', 'press_pitch', 'media_feature', 'blog')),
  status TEXT NOT NULL DEFAULT 'idea' CHECK (status IN ('idea', 'drafting', 'in_review', 'scheduled', 'published')),
  assigned_writer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  publish_date DATE,
  channel TEXT,
  tags TEXT[] DEFAULT '{}',
  body TEXT,
  visible_to_clients BOOLEAN NOT NULL DEFAULT false,
  visible_to_sfc BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- MEDIA PLACEMENTS (PR Tracker)
-- ============================================
CREATE TABLE media_placements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  publication TEXT NOT NULL,
  journalist TEXT,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  pitch_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'pitched' CHECK (status IN ('pitched', 'followed_up', 'placed', 'declined')),
  placement_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- WORKSHEETS
-- ============================================
CREATE TABLE worksheets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  phase TEXT NOT NULL CHECK (phase IN ('CC', 'AP', 'VE', 'PM', 'SFC')),
  description TEXT,
  fields JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_sfc_only BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE worksheet_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  worksheet_id UUID NOT NULL REFERENCES worksheets(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'submitted', 'reviewed')),
  due_date DATE,
  responses JSONB DEFAULT '{}'::jsonb,
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  reviewer_comments JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- JOURNEY MILESTONES
-- ============================================
CREATE TABLE journey_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  phase INT NOT NULL CHECK (phase >= 1 AND phase <= 4),
  title TEXT NOT NULL,
  milestone_type TEXT NOT NULL DEFAULT 'custom' CHECK (milestone_type IN ('worksheet_submitted', 'deliverable_approved', 'session_completed', 'press_placement', 'brand_asset_published', 'custom')),
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'complete', 'blocked')),
  internal_notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- PORTAL DELIVERABLES
-- ============================================
CREATE TABLE portal_deliverables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  phase INT NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'revision_requested')),
  file_url TEXT,
  file_type TEXT,
  delivered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- PORTAL MESSAGES
-- ============================================
CREATE TABLE portal_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  sender_role TEXT NOT NULL DEFAULT 'team_member',
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- NOTIFICATIONS
-- ============================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  link TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- ACTIVITY LOG
-- ============================================
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- JOURNEY TEMPLATES
-- ============================================
CREATE TABLE journey_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  milestones JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- SHARE LINKS (Collaborator access)
-- ============================================
CREATE TABLE share_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_clients_offer_tier ON clients(offer_tier);
CREATE INDEX idx_clients_assigned ON clients(assigned_team_member_id);
CREATE INDEX idx_clients_active ON clients(is_active) WHERE is_active = true;
CREATE INDEX idx_pipeline_stage ON pipeline_deals(stage);
CREATE INDEX idx_invoices_client ON invoices(client_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_content_status ON content_items(status);
CREATE INDEX idx_content_type ON content_items(content_type);
CREATE INDEX idx_media_status ON media_placements(status);
CREATE INDEX idx_worksheets_phase ON worksheets(phase);
CREATE INDEX idx_ws_assignments_client ON worksheet_assignments(client_id);
CREATE INDEX idx_ws_assignments_status ON worksheet_assignments(status);
CREATE INDEX idx_milestones_client ON journey_milestones(client_id);
CREATE INDEX idx_deliverables_client ON portal_deliverables(client_id);
CREATE INDEX idx_messages_client ON portal_messages(client_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = false;
CREATE INDEX idx_activity_created ON activity_log(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheet_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE sfc_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_links ENABLE ROW LEVEL SECURITY;

-- Helper function: get current user's role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper: check if user is internal (owner or team_member)
CREATE OR REPLACE FUNCTION is_internal()
RETURNS BOOLEAN AS $$
  SELECT get_user_role() IN ('owner', 'team_member');
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- PROFILES: users see own, internal sees all active
CREATE POLICY profiles_own ON profiles FOR SELECT USING (id = auth.uid() OR is_internal());
CREATE POLICY profiles_update_own ON profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY profiles_manage ON profiles FOR ALL USING (get_user_role() = 'owner');

-- CLIENTS: internal sees all, clients see own
CREATE POLICY clients_internal_select ON clients FOR SELECT USING (is_internal());
CREATE POLICY clients_client_select ON clients FOR SELECT USING (profile_id = auth.uid());
CREATE POLICY clients_internal_insert ON clients FOR INSERT WITH CHECK (is_internal());
CREATE POLICY clients_internal_update ON clients FOR UPDATE USING (is_internal());
CREATE POLICY clients_owner_delete ON clients FOR DELETE USING (get_user_role() = 'owner');

-- PIPELINE: internal only
CREATE POLICY pipeline_internal ON pipeline_deals FOR ALL USING (is_internal());

-- INVOICES: internal sees all, clients see own
CREATE POLICY invoices_internal ON invoices FOR ALL USING (is_internal());
CREATE POLICY invoices_client_select ON invoices FOR SELECT USING (
  EXISTS (SELECT 1 FROM clients WHERE clients.id = invoices.client_id AND clients.profile_id = auth.uid())
);

-- CONTENT: internal full access, clients see visible items
CREATE POLICY content_internal ON content_items FOR ALL USING (is_internal());
CREATE POLICY content_client_select ON content_items FOR SELECT USING (
  visible_to_clients = true OR (visible_to_sfc = true AND get_user_role() = 'sfc_member')
);

-- MEDIA PLACEMENTS: internal only
CREATE POLICY media_internal ON media_placements FOR ALL USING (is_internal());

-- WORKSHEETS: internal sees all, clients see assigned
CREATE POLICY worksheets_internal ON worksheets FOR ALL USING (is_internal());
CREATE POLICY worksheets_client_select ON worksheets FOR SELECT USING (
  EXISTS (SELECT 1 FROM worksheet_assignments wa JOIN clients c ON wa.client_id = c.id WHERE wa.worksheet_id = worksheets.id AND c.profile_id = auth.uid())
);

-- WORKSHEET ASSIGNMENTS: internal full, client sees/updates own
CREATE POLICY ws_assign_internal ON worksheet_assignments FOR ALL USING (is_internal());
CREATE POLICY ws_assign_client_select ON worksheet_assignments FOR SELECT USING (
  EXISTS (SELECT 1 FROM clients WHERE clients.id = worksheet_assignments.client_id AND clients.profile_id = auth.uid())
);
CREATE POLICY ws_assign_client_update ON worksheet_assignments FOR UPDATE USING (
  EXISTS (SELECT 1 FROM clients WHERE clients.id = worksheet_assignments.client_id AND clients.profile_id = auth.uid())
);

-- JOURNEY MILESTONES: internal full, client sees own (without internal notes)
CREATE POLICY milestones_internal ON journey_milestones FOR ALL USING (is_internal());
CREATE POLICY milestones_client_select ON journey_milestones FOR SELECT USING (
  EXISTS (SELECT 1 FROM clients WHERE clients.id = journey_milestones.client_id AND clients.profile_id = auth.uid())
);

-- PORTAL DELIVERABLES: internal full, client sees own
CREATE POLICY deliverables_internal ON portal_deliverables FOR ALL USING (is_internal());
CREATE POLICY deliverables_client_select ON portal_deliverables FOR SELECT USING (
  EXISTS (SELECT 1 FROM clients WHERE clients.id = portal_deliverables.client_id AND clients.profile_id = auth.uid())
);

-- PORTAL MESSAGES: internal + own client thread
CREATE POLICY messages_internal ON portal_messages FOR ALL USING (is_internal());
CREATE POLICY messages_client ON portal_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM clients WHERE clients.id = portal_messages.client_id AND clients.profile_id = auth.uid())
);
CREATE POLICY messages_client_insert ON portal_messages FOR INSERT WITH CHECK (
  sender_id = auth.uid() AND EXISTS (SELECT 1 FROM clients WHERE clients.id = portal_messages.client_id AND clients.profile_id = auth.uid())
);

-- NOTIFICATIONS: own only
CREATE POLICY notifications_own ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY notifications_own_update ON notifications FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY notifications_insert ON notifications FOR INSERT WITH CHECK (true);

-- ACTIVITY LOG: internal only
CREATE POLICY activity_internal ON activity_log FOR SELECT USING (is_internal());
CREATE POLICY activity_insert ON activity_log FOR INSERT WITH CHECK (true);

-- SFC TIERS: everyone can read, owner manages
CREATE POLICY sfc_tiers_read ON sfc_tiers FOR SELECT USING (true);
CREATE POLICY sfc_tiers_manage ON sfc_tiers FOR ALL USING (get_user_role() = 'owner');

-- JOURNEY TEMPLATES: internal only
CREATE POLICY templates_internal ON journey_templates FOR ALL USING (is_internal());

-- SHARE LINKS: internal manages
CREATE POLICY share_links_internal ON share_links FOR ALL USING (is_internal());

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON pipeline_deals FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON content_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON media_placements FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON worksheets FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON worksheet_assignments FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON journey_milestones FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON portal_deliverables FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SEED DATA: Default worksheets per phase
-- ============================================
INSERT INTO worksheets (title, phase, description, fields) VALUES
  ('Brand Identity Foundations', 'CC', 'Define your core brand identity elements',
    '[{"id":"f1","type":"long_text","label":"What is your brand''s origin story?","required":true,"sort_order":1},{"id":"f2","type":"long_text","label":"Who is your ideal client? Describe them in detail.","required":true,"sort_order":2},{"id":"f3","type":"short_text","label":"Your brand''s one-line positioning statement","required":true,"sort_order":3},{"id":"f4","type":"scale","label":"How clear is your current brand messaging? (1-10)","required":true,"sort_order":4}]'::jsonb),
  ('Brand Gap Analysis', 'CC', 'Identify the gaps between your current and desired brand positioning',
    '[{"id":"f1","type":"long_text","label":"What do you want to be known for?","required":true,"sort_order":1},{"id":"f2","type":"long_text","label":"What are your current brand challenges?","required":true,"sort_order":2},{"id":"f3","type":"multiple_choice","label":"Primary revenue model","required":true,"options":["Services","Products","Courses","Speaking","Consulting","Mixed"],"sort_order":3}]'::jsonb),
  ('Authority Blueprint', 'AP', 'Map your thought leadership strategy',
    '[{"id":"f1","type":"long_text","label":"What are your top 3 areas of expertise?","required":true,"sort_order":1},{"id":"f2","type":"long_text","label":"What unique perspective do you bring to your industry?","required":true,"sort_order":2},{"id":"f3","type":"checkbox","label":"Content channels you currently use","required":false,"options":["LinkedIn","Instagram","Podcast","Newsletter","Blog","YouTube","TikTok"],"sort_order":3}]'::jsonb),
  ('Signature Messaging Framework', 'AP', 'Develop your signature talking points and key messages',
    '[{"id":"f1","type":"long_text","label":"Your signature framework or methodology name","required":true,"sort_order":1},{"id":"f2","type":"long_text","label":"3 key messages you want every audience to walk away with","required":true,"sort_order":2}]'::jsonb),
  ('PR Strategy Planner', 'VE', 'Plan your media outreach strategy',
    '[{"id":"f1","type":"long_text","label":"Dream publications for features","required":true,"sort_order":1},{"id":"f2","type":"long_text","label":"Your most compelling story angle","required":true,"sort_order":2},{"id":"f3","type":"short_text","label":"Upcoming newsworthy moments (launches, milestones)","required":false,"sort_order":3}]'::jsonb),
  ('Social Proof Audit', 'PM', 'Catalog and optimize your proof assets',
    '[{"id":"f1","type":"long_text","label":"List your top 5 client results/testimonials","required":true,"sort_order":1},{"id":"f2","type":"long_text","label":"Awards, certifications, or notable achievements","required":false,"sort_order":2},{"id":"f3","type":"scale","label":"How effectively are you leveraging social proof currently? (1-10)","required":true,"sort_order":3}]'::jsonb),
  ('SFC Business Foundations', 'SFC', 'Six Figure Chicks business model assessment',
    '[{"id":"f1","type":"long_text","label":"Current revenue and revenue goal","required":true,"sort_order":1},{"id":"f2","type":"long_text","label":"What is your primary offer?","required":true,"sort_order":2},{"id":"f3","type":"multiple_choice","label":"Business stage","required":true,"options":["Pre-revenue","Under $50K","$50K-$100K","$100K-$250K","$250K+"],"sort_order":3}]'::jsonb);

-- Default journey templates
INSERT INTO journey_templates (name, milestones) VALUES
  ('6-Month Retainer Journey', '[
    {"phase":1,"title":"Brand Architecture Gap Session Complete","type":"session_completed"},
    {"phase":1,"title":"Brand Identity Foundations Worksheet","type":"worksheet_submitted"},
    {"phase":1,"title":"Brand Gap Analysis Worksheet","type":"worksheet_submitted"},
    {"phase":2,"title":"Authority Blueprint Complete","type":"worksheet_submitted"},
    {"phase":2,"title":"Signature Messaging Framework","type":"worksheet_submitted"},
    {"phase":2,"title":"Key Messages Approved","type":"deliverable_approved"},
    {"phase":3,"title":"PR Strategy Planner Complete","type":"worksheet_submitted"},
    {"phase":3,"title":"First Media Pitch Sent","type":"custom"},
    {"phase":3,"title":"First Media Placement","type":"press_placement"},
    {"phase":4,"title":"Social Proof Audit Complete","type":"worksheet_submitted"},
    {"phase":4,"title":"Case Study Published","type":"brand_asset_published"},
    {"phase":4,"title":"Momentum Review Session","type":"session_completed"}
  ]'::jsonb),
  ('Book Launch Sprint', '[
    {"phase":1,"title":"Author Brand Assessment","type":"session_completed"},
    {"phase":2,"title":"Book Positioning & Messaging","type":"deliverable_approved"},
    {"phase":3,"title":"Pre-Launch PR Campaign","type":"custom"},
    {"phase":3,"title":"Podcast Tour Scheduled","type":"custom"},
    {"phase":4,"title":"Launch Week Visibility Blitz","type":"custom"},
    {"phase":4,"title":"Post-Launch Momentum Plan","type":"deliverable_approved"}
  ]'::jsonb);
