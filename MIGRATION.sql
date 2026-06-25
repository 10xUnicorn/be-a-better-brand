-- ============================================================
-- Be a Better Brand — Complete Database Schema
-- Run against a fresh Supabase project (PostgreSQL 15+)
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. ROLES & PROFILES
-- ============================================================

CREATE TYPE user_role AS ENUM (
  'owner',
  'team_member',
  'client',
  'sfc_member',
  'collaborator',
  'read_only'
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT NOT NULL DEFAULT '',
  role user_role NOT NULL DEFAULT 'client',
  avatar_url TEXT,
  phone TEXT,
  timezone TEXT DEFAULT 'America/Chicago',
  notification_digest BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);

-- ============================================================
-- 2. OFFER TIERS
-- ============================================================

CREATE TYPE offer_tier AS ENUM (
  'gap_session',
  'retainer',
  'book_launch_sprint',
  'fractional_cmo',
  'sfc_signature',
  'sfc_premium',
  'sfc_elite'
);

CREATE TABLE sfc_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  billing_interval TEXT DEFAULT 'monthly',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. CLIENTS
-- ============================================================

CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  offer_tier offer_tier NOT NULL DEFAULT 'gap_session',
  brand_url TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  start_date DATE,
  contract_end_date DATE,
  health_score INTEGER DEFAULT 50 CHECK (health_score >= 0 AND health_score <= 100),
  notes TEXT,
  assigned_team_member_id UUID REFERENCES profiles(id),
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_clients_offer ON clients(offer_tier);
CREATE INDEX idx_clients_assigned ON clients(assigned_team_member_id);
CREATE INDEX idx_clients_health ON clients(health_score);

-- ============================================================
-- 4. PIPELINE
-- ============================================================

CREATE TYPE pipeline_stage AS ENUM (
  'lead',
  'contacted',
  'gap_session_booked',
  'gap_session_completed',
  'proposal_sent',
  'negotiation',
  'won',
  'lost_churned'
);

CREATE TYPE lost_reason AS ENUM (
  'price',
  'timing',
  'competitor',
  'no_response',
  'not_a_fit'
);

CREATE TABLE pipeline_deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_name TEXT NOT NULL,
  email TEXT,
  company TEXT,
  offer_tier offer_tier,
  stage pipeline_stage NOT NULL DEFAULT 'lead',
  estimated_value_cents INTEGER DEFAULT 0,
  assigned_team_member_id UUID REFERENCES profiles(id),
  next_follow_up DATE,
  lost_reason lost_reason,
  lost_notes TEXT,
  client_id UUID REFERENCES clients(id),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_pipeline_stage ON pipeline_deals(stage);

-- ============================================================
-- 5. CLIENT JOURNEY (Finally Seen Framework)
-- ============================================================

CREATE TYPE fsf_phase AS ENUM (
  'clarity_core',
  'authority_positioning',
  'visibility_engine',
  'proof_and_momentum'
);

CREATE TYPE milestone_status AS ENUM (
  'not_started',
  'in_progress',
  'complete',
  'blocked'
);

CREATE TYPE milestone_type AS ENUM (
  'worksheet_submitted',
  'deliverable_approved',
  'session_completed',
  'press_placement',
  'brand_asset_published',
  'custom'
);

CREATE TABLE client_journeys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  current_phase fsf_phase NOT NULL DEFAULT 'clarity_core',
  phase_override_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE journey_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  journey_id UUID NOT NULL REFERENCES client_journeys(id) ON DELETE CASCADE,
  phase fsf_phase NOT NULL,
  title TEXT NOT NULL,
  milestone_type milestone_type NOT NULL DEFAULT 'custom',
  status milestone_status NOT NULL DEFAULT 'not_started',
  is_required BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE journey_milestone_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  milestone_id UUID NOT NULL REFERENCES journey_milestones(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id),
  content TEXT NOT NULL,
  internal_only BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE journey_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  milestones JSONB NOT NULL DEFAULT '[]',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 6. WORKSHEETS
-- ============================================================

CREATE TYPE worksheet_status AS ENUM (
  'not_started',
  'in_progress',
  'submitted',
  'reviewed'
);

CREATE TYPE field_type AS ENUM (
  'short_text',
  'long_text',
  'multiple_choice',
  'checkbox_group',
  'scale',
  'file_upload',
  'section_header',
  'instructional_text'
);

CREATE TABLE worksheet_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  phase fsf_phase NOT NULL,
  is_sfc_only BOOLEAN DEFAULT FALSE,
  fields JSONB NOT NULL DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE worksheet_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID NOT NULL REFERENCES worksheet_templates(id),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  status worksheet_status NOT NULL DEFAULT 'not_started',
  responses JSONB DEFAULT '{}',
  due_date DATE,
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES profiles(id),
  locked BOOLEAN DEFAULT FALSE,
  auto_saved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE worksheet_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID NOT NULL REFERENCES worksheet_assignments(id) ON DELETE CASCADE,
  field_key TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES profiles(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. PORTAL (Deliverables, Messages, Files)
-- ============================================================

CREATE TYPE deliverable_status AS ENUM (
  'pending_review',
  'approved',
  'revision_requested'
);

CREATE TABLE portal_deliverables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  phase fsf_phase,
  status deliverable_status NOT NULL DEFAULT 'pending_review',
  file_url TEXT,
  file_type TEXT,
  delivered_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE portal_revision_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deliverable_id UUID NOT NULL REFERENCES portal_deliverables(id) ON DELETE CASCADE,
  requested_by UUID NOT NULL REFERENCES profiles(id),
  feedback TEXT NOT NULL,
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE portal_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE portal_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size_bytes BIGINT,
  file_type TEXT,
  folder TEXT DEFAULT 'General',
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE session_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id),
  recap TEXT NOT NULL,
  decisions TEXT,
  next_actions TEXT,
  session_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE share_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  resource_type TEXT NOT NULL,
  resource_id UUID NOT NULL,
  created_by UUID NOT NULL REFERENCES profiles(id),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '7 days',
  max_expiry_days INTEGER DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_share_links_token ON share_links(token);

-- ============================================================
-- 8. CONTENT
-- ============================================================

CREATE TYPE content_type AS ENUM (
  'podcast_episode',
  'newsletter',
  'linkedin_post',
  'instagram_post',
  'press_pitch',
  'media_feature',
  'blog_post'
);

CREATE TYPE content_status AS ENUM (
  'idea',
  'drafting',
  'in_review',
  'scheduled',
  'published'
);

CREATE TABLE content_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content_type content_type NOT NULL,
  status content_status NOT NULL DEFAULT 'idea',
  body TEXT,
  assigned_writer_id UUID REFERENCES profiles(id),
  publish_date DATE,
  channel TEXT,
  tags TEXT[] DEFAULT '{}',
  visible_to_clients BOOLEAN DEFAULT FALSE,
  visible_to_sfc BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TYPE pitch_status AS ENUM (
  'pitched',
  'followed_up',
  'placed',
  'declined'
);

CREATE TABLE pr_pitches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  outlet TEXT NOT NULL,
  journalist TEXT,
  client_id UUID REFERENCES clients(id),
  pitch_date DATE,
  status pitch_status NOT NULL DEFAULT 'pitched',
  placement_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE podcast_episodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  episode_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  guest TEXT,
  record_date DATE,
  publish_date DATE,
  status content_status NOT NULL DEFAULT 'idea',
  transcript TEXT,
  show_notes_id UUID REFERENCES content_items(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 9. PAYMENTS / INVOICES
-- ============================================================

CREATE TYPE invoice_status AS ENUM (
  'draft',
  'sent',
  'paid',
  'overdue',
  'void'
);

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  amount_cents INTEGER NOT NULL,
  offer_tier offer_tier,
  status invoice_status NOT NULL DEFAULT 'draft',
  due_date DATE,
  stripe_invoice_id TEXT,
  stripe_checkout_url TEXT,
  line_items JSONB DEFAULT '[]',
  paid_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  reminder_3d_sent BOOLEAN DEFAULT FALSE,
  reminder_7d_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT NOT NULL,
  offer_tier offer_tier NOT NULL,
  amount_cents INTEGER NOT NULL,
  billing_interval TEXT DEFAULT 'month',
  status TEXT NOT NULL DEFAULT 'active',
  current_period_end TIMESTAMPTZ,
  cancel_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 10. NOTIFICATIONS
-- ============================================================

CREATE TYPE notification_type AS ENUM (
  'client_onboarded',
  'worksheet_submitted',
  'revision_requested',
  'deliverable_uploaded',
  'invoice_sent',
  'invoice_paid',
  'invoice_overdue',
  'milestone_complete',
  'phase_complete',
  'portal_message',
  'share_link_expiring',
  'press_placement',
  'ascension_prompt'
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  notification_type notification_type NOT NULL,
  title TEXT NOT NULL,
  preview_text TEXT,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  email_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);

CREATE TABLE notification_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  notification_type notification_type NOT NULL,
  email_enabled BOOLEAN DEFAULT TRUE,
  UNIQUE(user_id, notification_type)
);

-- ============================================================
-- 11. ACTIVITY LOG (Audit Trail)
-- ============================================================

CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_log_resource ON activity_log(resource_type, resource_id);
CREATE INDEX idx_activity_log_created ON activity_log(created_at DESC);

-- ============================================================
-- 12. ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_journeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_milestone_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheet_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheet_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_revision_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE pr_pitches ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Helper function: is the current user internal (owner or team)?
CREATE OR REPLACE FUNCTION is_internal()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('owner', 'team_member')
    AND deleted_at IS NULL
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper function: is the current user the owner?
CREATE OR REPLACE FUNCTION is_owner()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'owner'
    AND deleted_at IS NULL
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper: get the client_id for the current authenticated user
CREATE OR REPLACE FUNCTION my_client_id()
RETURNS UUID AS $$
  SELECT id FROM clients WHERE user_id = auth.uid() AND deleted_at IS NULL LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- PROFILES
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Internal can view all profiles" ON profiles FOR SELECT USING (is_internal());
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Owner can manage profiles" ON profiles FOR ALL USING (is_owner());

-- CLIENTS
CREATE POLICY "Internal can manage clients" ON clients FOR ALL USING (is_internal());
CREATE POLICY "Client sees own record" ON clients FOR SELECT USING (user_id = auth.uid());

-- PIPELINE
CREATE POLICY "Internal can manage pipeline" ON pipeline_deals FOR ALL USING (is_internal());

-- JOURNEYS
CREATE POLICY "Internal can manage journeys" ON client_journeys FOR ALL USING (is_internal());
CREATE POLICY "Client sees own journey" ON client_journeys FOR SELECT USING (client_id = my_client_id());

CREATE POLICY "Internal can manage milestones" ON journey_milestones FOR ALL USING (is_internal());
CREATE POLICY "Client sees own milestones" ON journey_milestones FOR SELECT
  USING (journey_id IN (SELECT id FROM client_journeys WHERE client_id = my_client_id()));

CREATE POLICY "Internal can manage milestone notes" ON journey_milestone_notes FOR ALL USING (is_internal());
CREATE POLICY "Client sees non-internal notes" ON journey_milestone_notes FOR SELECT
  USING (internal_only = FALSE AND milestone_id IN (
    SELECT jm.id FROM journey_milestones jm
    JOIN client_journeys cj ON cj.id = jm.journey_id
    WHERE cj.client_id = my_client_id()
  ));

-- WORKSHEETS
CREATE POLICY "Internal can manage templates" ON worksheet_templates FOR ALL USING (is_internal());
CREATE POLICY "Client can view assigned templates" ON worksheet_templates FOR SELECT
  USING (id IN (SELECT template_id FROM worksheet_assignments WHERE client_id = my_client_id()));

CREATE POLICY "Internal can manage assignments" ON worksheet_assignments FOR ALL USING (is_internal());
CREATE POLICY "Client can manage own assignments" ON worksheet_assignments FOR ALL
  USING (client_id = my_client_id());

-- PORTAL
CREATE POLICY "Internal can manage deliverables" ON portal_deliverables FOR ALL USING (is_internal());
CREATE POLICY "Client sees own deliverables" ON portal_deliverables FOR SELECT USING (client_id = my_client_id());

CREATE POLICY "Internal can manage revision requests" ON portal_revision_requests FOR ALL USING (is_internal());
CREATE POLICY "Client can create revision requests" ON portal_revision_requests FOR INSERT
  WITH CHECK (deliverable_id IN (SELECT id FROM portal_deliverables WHERE client_id = my_client_id()));
CREATE POLICY "Client can view own revision requests" ON portal_revision_requests FOR SELECT
  USING (deliverable_id IN (SELECT id FROM portal_deliverables WHERE client_id = my_client_id()));

CREATE POLICY "Internal can manage messages" ON portal_messages FOR ALL USING (is_internal());
CREATE POLICY "Client can manage own messages" ON portal_messages FOR ALL USING (client_id = my_client_id());

CREATE POLICY "Internal can manage files" ON portal_files FOR ALL USING (is_internal());
CREATE POLICY "Client sees own files" ON portal_files FOR SELECT USING (client_id = my_client_id());

CREATE POLICY "Internal can manage session notes" ON session_notes FOR ALL USING (is_internal());
CREATE POLICY "Client can read own session notes" ON session_notes FOR SELECT USING (client_id = my_client_id());

-- CONTENT
CREATE POLICY "Internal can manage content" ON content_items FOR ALL USING (is_internal());
CREATE POLICY "Client sees published content" ON content_items FOR SELECT
  USING (visible_to_clients = TRUE AND status = 'published');

CREATE POLICY "Internal can manage pitches" ON pr_pitches FOR ALL USING (is_internal());

-- PAYMENTS
CREATE POLICY "Internal can manage invoices" ON invoices FOR ALL USING (is_internal());
CREATE POLICY "Client sees own invoices" ON invoices FOR SELECT USING (client_id = my_client_id());

CREATE POLICY "Internal can manage subscriptions" ON subscriptions FOR ALL USING (is_internal());
CREATE POLICY "Client sees own subscriptions" ON subscriptions FOR SELECT USING (client_id = my_client_id());

-- NOTIFICATIONS
CREATE POLICY "User sees own notifications" ON notifications FOR ALL USING (user_id = auth.uid());

CREATE POLICY "User manages own preferences" ON notification_preferences FOR ALL USING (user_id = auth.uid());

-- ACTIVITY LOG
CREATE POLICY "Internal can view activity" ON activity_log FOR SELECT USING (is_internal());
CREATE POLICY "Internal can insert activity" ON activity_log FOR INSERT WITH CHECK (is_internal() OR auth.uid() IS NOT NULL);

-- ============================================================
-- 13. TRIGGERS
-- ============================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER pipeline_deals_updated_at BEFORE UPDATE ON pipeline_deals FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER client_journeys_updated_at BEFORE UPDATE ON client_journeys FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER journey_milestones_updated_at BEFORE UPDATE ON journey_milestones FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER worksheet_templates_updated_at BEFORE UPDATE ON worksheet_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER worksheet_assignments_updated_at BEFORE UPDATE ON worksheet_assignments FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER portal_deliverables_updated_at BEFORE UPDATE ON portal_deliverables FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER content_items_updated_at BEFORE UPDATE ON content_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on auth signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, display_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'client')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- 14. SEED DATA
-- ============================================================

-- SFC Tiers
INSERT INTO sfc_tiers (name, price_cents, description) VALUES
  ('Signature', 120000, 'Six Figure Chicks Signature tier — 12-month program'),
  ('Premium', 250000, 'Six Figure Chicks Premium tier — enhanced access'),
  ('Elite', 500000, 'Six Figure Chicks Elite tier — full concierge');

-- Worksheet Templates for Finally Seen Framework
INSERT INTO worksheet_templates (title, description, phase, fields, sort_order) VALUES
  ('Brand Foundation Assessment', 'Assess your current brand positioning and gaps', 'clarity_core',
   '[{"key":"mission","label":"What is your brand''s mission?","type":"long_text","required":true},{"key":"audience","label":"Describe your ideal client","type":"long_text","required":true},{"key":"differentiator","label":"What makes you different?","type":"long_text","required":true},{"key":"current_visibility","label":"Rate your current visibility (1-10)","type":"scale","required":true}]',
   1),
  ('Brand Architecture Blueprint', 'Map your complete brand structure', 'clarity_core',
   '[{"key":"brand_pillars","label":"List your 3 brand pillars","type":"long_text","required":true},{"key":"voice","label":"Describe your brand voice in 3 words","type":"short_text","required":true},{"key":"story","label":"Your origin story","type":"long_text","required":true}]',
   2),
  ('Authority Positioning Statement', 'Craft your positioning for thought leadership', 'authority_positioning',
   '[{"key":"expertise","label":"Your primary area of expertise","type":"short_text","required":true},{"key":"pov","label":"Your unique point of view","type":"long_text","required":true},{"key":"proof","label":"Evidence that supports your authority","type":"long_text","required":true}]',
   3),
  ('Visibility Engine Planning', 'Plan your media and visibility strategy', 'visibility_engine',
   '[{"key":"target_outlets","label":"Target media outlets (top 10)","type":"long_text","required":true},{"key":"topics","label":"Signature topics for pitching","type":"long_text","required":true},{"key":"timeline","label":"90-day visibility timeline","type":"long_text","required":true}]',
   4),
  ('Proof & Momentum Tracker', 'Track social proof and momentum indicators', 'proof_and_momentum',
   '[{"key":"testimonials","label":"Client testimonials collected","type":"long_text","required":false},{"key":"metrics","label":"Key visibility metrics","type":"long_text","required":true},{"key":"next_steps","label":"Next 30-day momentum plan","type":"long_text","required":true}]',
   5);
