export type UserRole = 'owner' | 'team_member' | 'client' | 'collaborator' | 'sfc_member'

export interface Profile {
  id: string
  email: string
  full_name: string
  role: UserRole
  avatar_url?: string
  phone?: string
  created_at: string
  updated_at: string
  is_active: boolean
}

export interface Client {
  id: string
  profile_id?: string
  name: string
  company?: string
  email: string
  phone?: string
  offer_tier: 'gap_session' | 'retainer' | 'book_launch' | 'fractional_cmo' | 'sfc'
  brand_url?: string
  linkedin?: string
  instagram?: string
  assigned_team_member_id?: string
  start_date?: string
  contract_end_date?: string
  notes?: string
  health_score: number
  current_phase: number
  mrr: number
  client_type?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface PipelineDeal {
  id: string
  contact_name: string
  contact_email?: string
  contact_type?: string
  offer_tier: string
  estimated_value: number
  monthly_value?: number
  duration_months?: number
  stage: 'discovery' | 'proposal_sent' | 'negotiating' | 'won' | 'lost'
  assigned_team_member_id?: string
  next_follow_up?: string
  lost_reason?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  client_id: string
  client_name?: string
  amount: number
  offer_tier: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'void'
  due_date: string
  stripe_invoice_id?: string
  line_items?: Record<string, unknown>[]
  created_at: string
  updated_at: string
}

export interface ContentItem {
  id: string
  title: string
  content_type: 'podcast' | 'newsletter' | 'linkedin' | 'instagram' | 'press_pitch' | 'media_feature' | 'blog'
  status: 'idea' | 'drafting' | 'in_review' | 'scheduled' | 'published'
  assigned_writer_id?: string
  publish_date?: string
  channel?: string
  tags?: string[]
  body?: string
  visible_to_clients: boolean
  visible_to_sfc: boolean
  created_at: string
  updated_at: string
}

export interface MediaPlacement {
  id: string
  publication: string
  journalist?: string
  client_id?: string
  client_name?: string
  pitch_date: string
  status: 'pitched' | 'followed_up' | 'placed' | 'declined'
  placement_url?: string
  notes?: string
  created_at: string
}

export interface Worksheet {
  id: string
  title: string
  phase: 'CC' | 'AP' | 'VE' | 'PM' | 'SFC'
  description?: string
  fields: WorksheetField[]
  is_sfc_only: boolean
  created_at: string
}

export interface WorksheetField {
  id: string
  type: 'short_text' | 'long_text' | 'multiple_choice' | 'checkbox' | 'scale' | 'file_upload' | 'section_header' | 'instructional_text'
  label: string
  required: boolean
  options?: string[]
  sort_order: number
}

export interface WorksheetAssignment {
  id: string
  worksheet_id: string
  client_id: string
  status: 'not_started' | 'in_progress' | 'submitted' | 'reviewed'
  due_date?: string
  responses?: Record<string, unknown>
  submitted_at?: string
  reviewed_at?: string
  created_at: string
}

export interface JourneyMilestone {
  id: string
  client_id: string
  phase: number
  title: string
  milestone_type: 'worksheet_submitted' | 'deliverable_approved' | 'session_completed' | 'press_placement' | 'brand_asset_published' | 'custom'
  status: 'not_started' | 'in_progress' | 'complete' | 'blocked'
  internal_notes?: string
  completed_at?: string
  created_at: string
}

export interface PortalDeliverable {
  id: string
  client_id: string
  title: string
  description?: string
  phase: number
  status: 'pending_review' | 'approved' | 'revision_requested'
  file_url?: string
  file_type?: string
  delivered_at: string
  created_at: string
}

export interface PortalMessage {
  id: string
  client_id: string
  sender_id: string
  sender_name?: string
  sender_role: UserRole
  message: string
  is_read: boolean
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: string
  link?: string
  is_read: boolean
  created_at: string
}

export interface ActivityLog {
  id: string
  actor_id?: string
  actor_name?: string
  action: string
  entity_type: string
  entity_id?: string
  details?: string
  created_at: string
}

export interface SfcTier {
  id: string
  name: string
  price: number
  duration_months: number
  description?: string
  created_at: string
}
