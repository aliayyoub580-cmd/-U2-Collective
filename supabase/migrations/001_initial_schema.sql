-- ============================================================
-- U2 Collective — Initial Schema Migration
-- 001_initial_schema.sql
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─────────────────────────────────────────────────────────────
-- ENUMS
-- ─────────────────────────────────────────────────────────────

CREATE TYPE user_role AS ENUM (
  'super_admin',
  'admin',
  'sub_admin',
  'manager',
  'verification_specialist',
  'authorization_specialist',
  'client_admin',
  'client_staff',
  'readonly_client'
);

CREATE TYPE org_status AS ENUM ('active', 'inactive', 'archived');

CREATE TYPE verification_status AS ENUM (
  'draft',
  'submitted',
  'assigned',
  'in_review',
  'payer_contacted',
  'verified',
  'unable_to_verify',
  'additional_info_required',
  'completed',
  'cancelled'
);

CREATE TYPE authorization_status AS ENUM (
  'draft',
  'submitted',
  'documents_required',
  'assigned',
  'under_review',
  'submitted_to_payer',
  'pending_payer_response',
  'additional_clinical_info_required',
  'peer_to_peer_required',
  'approved',
  'partially_approved',
  'denied',
  'appeal_in_progress',
  'appeal_approved',
  'appeal_denied',
  'expired',
  'cancelled'
);

CREATE TYPE request_priority AS ENUM ('low', 'normal', 'high', 'urgent');

CREATE TYPE notification_type AS ENUM (
  'status_change',
  'assignment',
  'additional_info',
  'approval',
  'denial',
  'expiration_warning',
  'overdue_task',
  'follow_up_reminder'
);

CREATE TYPE task_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE task_priority AS ENUM ('low', 'normal', 'high', 'urgent');
CREATE TYPE document_category AS ENUM (
  'verification',
  'authorization',
  'appeal',
  'client',
  'clinical',
  'other'
);

-- ─────────────────────────────────────────────────────────────
-- CORE USER / ORG TABLES
-- ─────────────────────────────────────────────────────────────

-- Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT NOT NULL,
  full_name       TEXT NOT NULL DEFAULT '',
  role            user_role NOT NULL DEFAULT 'readonly_client',
  organization_id UUID,
  avatar_url      TEXT,
  phone           TEXT,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  last_login      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by      UUID REFERENCES profiles(id),
  updated_by      UUID REFERENCES profiles(id)
);

-- Organizations
CREATE TABLE organizations (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT NOT NULL,
  specialty        TEXT,
  ehr_system       TEXT,
  pms_system       TEXT,
  phone            TEXT,
  email            TEXT,
  website          TEXT,
  address_line1    TEXT,
  address_line2    TEXT,
  city             TEXT,
  state            TEXT,
  zip              TEXT,
  npi              TEXT,
  tax_id           TEXT,
  status           org_status NOT NULL DEFAULT 'active',
  account_specialist_id UUID REFERENCES profiles(id),
  service_package  TEXT,
  notes            TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by       UUID REFERENCES profiles(id),
  updated_by       UUID REFERENCES profiles(id),
  archived_at      TIMESTAMPTZ
);

-- FK back from profiles → organizations
ALTER TABLE profiles
  ADD CONSTRAINT fk_profiles_organization
  FOREIGN KEY (organization_id) REFERENCES organizations(id);

-- Organization users join table
CREATE TABLE organization_users (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role            user_role NOT NULL DEFAULT 'client_staff',
  is_primary      BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (organization_id, user_id)
);

-- ─────────────────────────────────────────────────────────────
-- PERMISSIONS SYSTEM
-- ─────────────────────────────────────────────────────────────

CREATE TABLE permissions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key         TEXT NOT NULL UNIQUE,
  label       TEXT NOT NULL,
  category    TEXT NOT NULL,
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE permission_templates (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  description TEXT,
  is_system   BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by  UUID REFERENCES profiles(id)
);

CREATE TABLE permission_template_items (
  template_id    UUID NOT NULL REFERENCES permission_templates(id) ON DELETE CASCADE,
  permission_key TEXT NOT NULL REFERENCES permissions(key) ON DELETE CASCADE,
  PRIMARY KEY (template_id, permission_key)
);

-- Sub-admin profiles with specific permission grants
CREATE TABLE sub_admin_profiles (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id        UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  template_id    UUID REFERENCES permission_templates(id),
  created_by     UUID REFERENCES profiles(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sub_admin_permissions (
  sub_admin_id   UUID NOT NULL REFERENCES sub_admin_profiles(id) ON DELETE CASCADE,
  permission_key TEXT NOT NULL REFERENCES permissions(key) ON DELETE CASCADE,
  granted_by     UUID REFERENCES profiles(id),
  granted_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (sub_admin_id, permission_key)
);

-- Per-user permission overrides
CREATE TABLE user_permissions (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id        UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  permission_key TEXT NOT NULL REFERENCES permissions(key) ON DELETE CASCADE,
  granted        BOOLEAN NOT NULL DEFAULT true,
  granted_by     UUID REFERENCES profiles(id),
  granted_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, permission_key)
);

-- ─────────────────────────────────────────────────────────────
-- CLIENTS & CONTACTS
-- ─────────────────────────────────────────────────────────────

CREATE TABLE clients (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id  UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  display_name     TEXT NOT NULL,
  status           org_status NOT NULL DEFAULT 'active',
  notes            TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by       UUID REFERENCES profiles(id),
  archived_at      TIMESTAMPTZ
);

CREATE TABLE client_locations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id       UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  address_line1   TEXT,
  city            TEXT,
  state           TEXT,
  zip             TEXT,
  phone           TEXT,
  is_primary      BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE client_contacts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id       UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  full_name       TEXT NOT NULL,
  title           TEXT,
  email           TEXT,
  phone           TEXT,
  is_primary      BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- PAYERS
-- ─────────────────────────────────────────────────────────────

CREATE TABLE payers (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         TEXT NOT NULL,
  payer_id     TEXT,
  payer_type   TEXT, -- commercial, medicare, medicaid, tricare, etc.
  portal_url   TEXT,
  phone        TEXT,
  fax          TEXT,
  notes        TEXT,
  is_active    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE payer_plans (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payer_id  UUID NOT NULL REFERENCES payers(id) ON DELETE CASCADE,
  name      TEXT NOT NULL,
  plan_type TEXT,
  notes     TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- SPECIALTIES
-- ─────────────────────────────────────────────────────────────

CREATE TABLE specialties (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  description TEXT,
  is_active   BOOLEAN DEFAULT true,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- VERIFICATION REQUESTS
-- ─────────────────────────────────────────────────────────────

CREATE TABLE verification_requests (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id  UUID NOT NULL REFERENCES organizations(id),
  client_id        UUID REFERENCES clients(id),
  patient_ref      TEXT NOT NULL,  -- masked ref, e.g. PT-10021
  patient_dob      DATE,           -- stored encrypted / restricted
  payer_id         UUID REFERENCES payers(id),
  payer_name       TEXT,
  plan_name        TEXT,
  member_id        TEXT,           -- restricted access
  service_date     DATE,
  provider_npi     TEXT,
  specialty        TEXT,
  status           verification_status NOT NULL DEFAULT 'draft',
  priority         request_priority NOT NULL DEFAULT 'normal',
  assigned_to      UUID REFERENCES profiles(id),
  due_at           TIMESTAMPTZ,
  internal_notes   TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by       UUID NOT NULL REFERENCES profiles(id),
  updated_by       UUID REFERENCES profiles(id),
  completed_at     TIMESTAMPTZ,
  cancelled_at     TIMESTAMPTZ
);

CREATE TABLE verification_results (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  verification_id       UUID NOT NULL UNIQUE REFERENCES verification_requests(id) ON DELETE CASCADE,
  coverage_status       TEXT,
  plan_type             TEXT,
  network_status        TEXT,
  copay_amount          NUMERIC(10,2),
  coinsurance_pct       NUMERIC(5,2),
  deductible_total      NUMERIC(10,2),
  deductible_met        NUMERIC(10,2),
  oop_max               NUMERIC(10,2),
  oop_met               NUMERIC(10,2),
  referral_required     BOOLEAN,
  auth_required         BOOLEAN,
  effective_date        DATE,
  termination_date      DATE,
  plan_limitations      TEXT,
  secondary_coverage    TEXT,
  raw_notes             TEXT,
  verified_at           TIMESTAMPTZ,
  verified_by           UUID REFERENCES profiles(id),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE verification_status_history (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  verification_id     UUID NOT NULL REFERENCES verification_requests(id) ON DELETE CASCADE,
  previous_status     verification_status,
  new_status          verification_status NOT NULL,
  changed_by          UUID NOT NULL REFERENCES profiles(id),
  note                TEXT,
  document_id         UUID,
  notification_sent   BOOLEAN DEFAULT false,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- AUTHORIZATION REQUESTS
-- ─────────────────────────────────────────────────────────────

CREATE TABLE authorization_requests (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id     UUID NOT NULL REFERENCES organizations(id),
  client_id           UUID REFERENCES clients(id),
  verification_id     UUID REFERENCES verification_requests(id),
  patient_ref         TEXT NOT NULL,
  payer_id            UUID REFERENCES payers(id),
  payer_name          TEXT,
  procedure_description TEXT NOT NULL,
  cpt_codes           TEXT[],
  hcpcs_codes         TEXT[],
  diagnosis_codes     TEXT[],
  service_start_date  DATE,
  service_end_date    DATE,
  units_requested     INTEGER,
  facility            TEXT,
  rendering_provider  TEXT,
  status              authorization_status NOT NULL DEFAULT 'draft',
  priority            request_priority NOT NULL DEFAULT 'normal',
  assigned_to         UUID REFERENCES profiles(id),
  approval_number     TEXT,
  approval_valid_from DATE,
  approval_valid_to   DATE,
  units_approved      INTEGER,
  follow_up_date      DATE,
  internal_notes      TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by          UUID NOT NULL REFERENCES profiles(id),
  updated_by          UUID REFERENCES profiles(id),
  completed_at        TIMESTAMPTZ,
  cancelled_at        TIMESTAMPTZ,
  expired_at          TIMESTAMPTZ
);

CREATE TABLE authorization_followups (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  authorization_id UUID NOT NULL REFERENCES authorization_requests(id) ON DELETE CASCADE,
  contacted_via    TEXT, -- phone, portal, fax
  contact_name     TEXT,
  reference_number TEXT,
  notes            TEXT NOT NULL,
  follow_up_date   DATE,
  created_by       UUID NOT NULL REFERENCES profiles(id),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE authorization_status_history (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  authorization_id UUID NOT NULL REFERENCES authorization_requests(id) ON DELETE CASCADE,
  previous_status  authorization_status,
  new_status       authorization_status NOT NULL,
  changed_by       UUID NOT NULL REFERENCES profiles(id),
  note             TEXT,
  document_id      UUID,
  notification_sent BOOLEAN DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE authorization_appeals (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  authorization_id UUID NOT NULL REFERENCES authorization_requests(id) ON DELETE CASCADE,
  appeal_type      TEXT, -- internal, external, p2p
  submitted_at     TIMESTAMPTZ,
  due_date         DATE,
  outcome          TEXT,
  outcome_date     TIMESTAMPTZ,
  notes            TEXT,
  created_by       UUID NOT NULL REFERENCES profiles(id),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- DOCUMENTS
-- ─────────────────────────────────────────────────────────────

CREATE TABLE documents (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id  UUID NOT NULL REFERENCES organizations(id),
  uploaded_by      UUID NOT NULL REFERENCES profiles(id),
  category         document_category NOT NULL DEFAULT 'other',
  file_name        TEXT NOT NULL,
  file_size        INTEGER,
  mime_type        TEXT,
  storage_path     TEXT NOT NULL,  -- Supabase Storage path (private)
  bucket_name      TEXT NOT NULL,
  related_type     TEXT,  -- verification | authorization | appeal | client
  related_id       UUID,
  description      TEXT,
  is_deleted       BOOLEAN DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at       TIMESTAMPTZ
);

-- ─────────────────────────────────────────────────────────────
-- TASKS
-- ─────────────────────────────────────────────────────────────

CREATE TABLE tasks (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id  UUID NOT NULL REFERENCES organizations(id),
  title            TEXT NOT NULL,
  description      TEXT,
  status           task_status NOT NULL DEFAULT 'open',
  priority         task_priority NOT NULL DEFAULT 'normal',
  assigned_to      UUID REFERENCES profiles(id),
  due_date         DATE,
  related_type     TEXT,
  related_id       UUID,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by       UUID NOT NULL REFERENCES profiles(id),
  completed_at     TIMESTAMPTZ
);

CREATE TABLE task_comments (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id     UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  body        TEXT NOT NULL,
  created_by  UUID NOT NULL REFERENCES profiles(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE request_comments (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  related_type TEXT NOT NULL, -- verification | authorization
  related_id   UUID NOT NULL,
  body         TEXT NOT NULL,
  is_internal  BOOLEAN DEFAULT false,
  created_by   UUID NOT NULL REFERENCES profiles(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- NOTIFICATIONS
-- ─────────────────────────────────────────────────────────────

CREATE TABLE notifications (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type         notification_type NOT NULL,
  title        TEXT NOT NULL,
  body         TEXT NOT NULL,
  is_read      BOOLEAN NOT NULL DEFAULT false,
  related_type TEXT,
  related_id   UUID,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- AUDIT & ACTIVITY LOGS
-- ─────────────────────────────────────────────────────────────

CREATE TABLE activity_logs (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID REFERENCES profiles(id),
  action       TEXT NOT NULL,
  module       TEXT NOT NULL,
  record_id    UUID,
  record_type  TEXT,
  description  TEXT,
  ip_address   INET,
  user_agent   TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE audit_logs (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id        UUID REFERENCES profiles(id),
  action         TEXT NOT NULL,
  module         TEXT NOT NULL,
  record_id      UUID,
  record_type    TEXT,
  previous_value JSONB,
  new_value      JSONB,
  ip_address     INET,
  user_agent     TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- REPORTS & METRICS
-- ─────────────────────────────────────────────────────────────

CREATE TABLE dashboard_metrics (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  metric_key      TEXT NOT NULL,
  metric_value    TEXT NOT NULL,
  label           TEXT,
  note            TEXT,
  is_placeholder  BOOLEAN DEFAULT true,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by      UUID REFERENCES profiles(id),
  UNIQUE (organization_id, metric_key)
);

-- ─────────────────────────────────────────────────────────────
-- CONTENT MANAGEMENT
-- ─────────────────────────────────────────────────────────────

CREATE TABLE website_pages (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  content      JSONB,
  meta_title   TEXT,
  meta_desc    TEXT,
  og_title     TEXT,
  og_desc      TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by   UUID REFERENCES profiles(id)
);

CREATE TABLE faqs (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question     TEXT NOT NULL,
  answer       TEXT NOT NULL,
  category     TEXT,
  sort_order   INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by   UUID REFERENCES profiles(id)
);

CREATE TABLE testimonials (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote        TEXT NOT NULL,
  author_name  TEXT NOT NULL,
  author_role  TEXT,
  organization TEXT,
  specialty    TEXT,
  is_published BOOLEAN DEFAULT false,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE blog_posts (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  excerpt      TEXT,
  content      TEXT,
  category     TEXT,
  author_id    UUID REFERENCES profiles(id),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE seo_settings (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_slug    TEXT NOT NULL UNIQUE,
  meta_title   TEXT,
  meta_desc    TEXT,
  og_title     TEXT,
  og_image_url TEXT,
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by   UUID REFERENCES profiles(id)
);

-- ─────────────────────────────────────────────────────────────
-- SYSTEM SETTINGS
-- ─────────────────────────────────────────────────────────────

CREATE TABLE system_settings (
  key         TEXT PRIMARY KEY,
  value       JSONB NOT NULL,
  description TEXT,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by  UUID REFERENCES profiles(id)
);

CREATE TABLE integrations (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         TEXT NOT NULL,
  type         TEXT NOT NULL, -- ehr, pms, billing
  config       JSONB,
  is_active    BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────────────────────

CREATE INDEX idx_profiles_organization     ON profiles(organization_id);
CREATE INDEX idx_profiles_role             ON profiles(role);
CREATE INDEX idx_verification_org          ON verification_requests(organization_id);
CREATE INDEX idx_verification_status       ON verification_requests(status);
CREATE INDEX idx_verification_assigned     ON verification_requests(assigned_to);
CREATE INDEX idx_verification_created      ON verification_requests(created_at DESC);
CREATE INDEX idx_authorization_org         ON authorization_requests(organization_id);
CREATE INDEX idx_authorization_status      ON authorization_requests(status);
CREATE INDEX idx_authorization_assigned    ON authorization_requests(assigned_to);
CREATE INDEX idx_authorization_created     ON authorization_requests(created_at DESC);
CREATE INDEX idx_notifications_user        ON notifications(user_id, is_read);
CREATE INDEX idx_audit_logs_user           ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_record         ON audit_logs(record_type, record_id);
CREATE INDEX idx_activity_logs_user        ON activity_logs(user_id);
CREATE INDEX idx_documents_related         ON documents(related_type, related_id);
CREATE INDEX idx_tasks_assigned            ON tasks(assigned_to, status);

-- ─────────────────────────────────────────────────────────────
-- UPDATED_AT TRIGGER FUNCTION
-- ─────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'profiles','organizations','clients','payers','specialties',
    'verification_requests','verification_results',
    'authorization_requests','authorization_appeals',
    'sub_admin_profiles','documents','tasks','task_comments',
    'request_comments','website_pages','faqs','testimonials',
    'blog_posts','system_settings','integrations','seo_settings'
  ] LOOP
    EXECUTE format(
      'CREATE TRIGGER trg_%s_updated_at
       BEFORE UPDATE ON %s
       FOR EACH ROW EXECUTE FUNCTION update_updated_at()',
       t, t
    );
  END LOOP;
END;
$$;
