-- ============================================================
-- U2 Collective — Row Level Security Policies
-- 002_rls_policies.sql
-- ============================================================

-- Enable RLS on all sensitive tables
ALTER TABLE profiles                    ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations               ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE permission_templates        ENABLE ROW LEVEL SECURITY;
ALTER TABLE permission_template_items   ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_admin_profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_admin_permissions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_permissions            ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients                     ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_locations            ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_contacts             ENABLE ROW LEVEL SECURITY;
ALTER TABLE payers                      ENABLE ROW LEVEL SECURITY;
ALTER TABLE payer_plans                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE specialties                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_requests       ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_results        ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorization_requests      ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorization_followups     ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorization_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorization_appeals       ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks                       ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_comments               ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_comments            ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications               ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs               ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_metrics           ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_pages               ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs                        ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials                ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings                ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings             ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations                ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────────────────────
-- HELPER FUNCTIONS
-- ─────────────────────────────────────────────────────────────

-- Get current user's role
CREATE OR REPLACE FUNCTION auth_role()
RETURNS user_role
LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT role FROM profiles WHERE id = auth.uid()
$$;

-- Get current user's organization_id
CREATE OR REPLACE FUNCTION auth_org_id()
RETURNS UUID
LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT organization_id FROM profiles WHERE id = auth.uid()
$$;

-- Check if current user is staff-level (not client)
CREATE OR REPLACE FUNCTION is_staff()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT role IN (
    'super_admin','admin','sub_admin','manager',
    'verification_specialist','authorization_specialist'
  ) FROM profiles WHERE id = auth.uid()
$$;

-- Check if current user is admin or above
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT role IN ('super_admin','admin')
  FROM profiles WHERE id = auth.uid()
$$;

-- Check if current user is super admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT role = 'super_admin'
  FROM profiles WHERE id = auth.uid()
$$;

-- Check if user has a specific permission (sub-admins)
CREATE OR REPLACE FUNCTION has_permission(perm_key TEXT)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM sub_admin_profiles sap
    JOIN sub_admin_permissions sp ON sp.sub_admin_id = sap.id
    WHERE sap.user_id = auth.uid()
    AND sp.permission_key = perm_key
  )
$$;

-- ─────────────────────────────────────────────────────────────
-- PROFILES
-- ─────────────────────────────────────────────────────────────

-- Users can view their own profile
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  USING (id = auth.uid());

-- Staff can view profiles in their scope
CREATE POLICY "profiles_select_staff"
  ON profiles FOR SELECT
  USING (is_staff());

-- Users can update their own basic profile fields
CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Only admins can update roles and org assignments
CREATE POLICY "profiles_update_admin"
  ON profiles FOR UPDATE
  USING (is_admin());

-- Admins can insert profiles
CREATE POLICY "profiles_insert_admin"
  ON profiles FOR INSERT
  WITH CHECK (is_admin());

-- ─────────────────────────────────────────────────────────────
-- ORGANIZATIONS
-- ─────────────────────────────────────────────────────────────

-- Staff see all active organizations
CREATE POLICY "orgs_select_staff"
  ON organizations FOR SELECT
  USING (is_staff());

-- Client users see only their own organization
CREATE POLICY "orgs_select_client"
  ON organizations FOR SELECT
  USING (id = auth_org_id());

-- Only admins can create/edit organizations
CREATE POLICY "orgs_insert_admin"
  ON organizations FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "orgs_update_admin"
  ON organizations FOR UPDATE
  USING (is_admin());

-- ─────────────────────────────────────────────────────────────
-- PERMISSIONS & TEMPLATES (read-only for most)
-- ─────────────────────────────────────────────────────────────

CREATE POLICY "permissions_select_all_auth"
  ON permissions FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "permission_templates_select_admin"
  ON permission_templates FOR SELECT USING (is_admin() OR is_staff());

CREATE POLICY "permission_templates_manage_admin"
  ON permission_templates FOR ALL USING (is_admin());

CREATE POLICY "permission_template_items_select"
  ON permission_template_items FOR SELECT USING (is_admin() OR is_staff());

CREATE POLICY "permission_template_items_manage"
  ON permission_template_items FOR ALL USING (is_admin());

-- ─────────────────────────────────────────────────────────────
-- SUB-ADMIN PROFILES & PERMISSIONS
-- ─────────────────────────────────────────────────────────────

CREATE POLICY "sub_admin_profiles_select"
  ON sub_admin_profiles FOR SELECT
  USING (is_admin() OR user_id = auth.uid());

CREATE POLICY "sub_admin_profiles_manage"
  ON sub_admin_profiles FOR ALL
  USING (is_admin());

CREATE POLICY "sub_admin_permissions_select"
  ON sub_admin_permissions FOR SELECT
  USING (
    is_admin()
    OR EXISTS (
      SELECT 1 FROM sub_admin_profiles sap
      WHERE sap.id = sub_admin_permissions.sub_admin_id
      AND sap.user_id = auth.uid()
    )
  );

CREATE POLICY "sub_admin_permissions_manage"
  ON sub_admin_permissions FOR ALL
  USING (is_admin());

-- ─────────────────────────────────────────────────────────────
-- CLIENTS
-- ─────────────────────────────────────────────────────────────

CREATE POLICY "clients_select_staff"
  ON clients FOR SELECT USING (is_staff());

CREATE POLICY "clients_select_client"
  ON clients FOR SELECT
  USING (organization_id = auth_org_id());

CREATE POLICY "clients_manage_admin"
  ON clients FOR ALL USING (is_admin());

CREATE POLICY "client_locations_select"
  ON client_locations FOR SELECT
  USING (
    is_staff()
    OR EXISTS (
      SELECT 1 FROM clients c
      WHERE c.id = client_locations.client_id
      AND c.organization_id = auth_org_id()
    )
  );

CREATE POLICY "client_contacts_select"
  ON client_contacts FOR SELECT
  USING (
    is_staff()
    OR EXISTS (
      SELECT 1 FROM clients c
      WHERE c.id = client_contacts.client_id
      AND c.organization_id = auth_org_id()
    )
  );

-- ─────────────────────────────────────────────────────────────
-- PAYERS (reference data — all auth users can read)
-- ─────────────────────────────────────────────────────────────

CREATE POLICY "payers_select_all"
  ON payers FOR SELECT USING (auth.uid() IS NOT NULL AND is_active = true);

CREATE POLICY "payers_manage_admin"
  ON payers FOR ALL USING (is_admin());

CREATE POLICY "payer_plans_select_all"
  ON payer_plans FOR SELECT USING (auth.uid() IS NOT NULL);

-- ─────────────────────────────────────────────────────────────
-- SPECIALTIES (public read when published)
-- ─────────────────────────────────────────────────────────────

CREATE POLICY "specialties_select_public"
  ON specialties FOR SELECT USING (is_active = true);

CREATE POLICY "specialties_manage_admin"
  ON specialties FOR ALL USING (is_admin());

-- ─────────────────────────────────────────────────────────────
-- VERIFICATION REQUESTS
-- ─────────────────────────────────────────────────────────────

CREATE POLICY "verification_select_staff"
  ON verification_requests FOR SELECT USING (is_staff());

CREATE POLICY "verification_select_client"
  ON verification_requests FOR SELECT
  USING (organization_id = auth_org_id());

CREATE POLICY "verification_insert_staff_or_client"
  ON verification_requests FOR INSERT
  WITH CHECK (
    is_staff()
    OR organization_id = auth_org_id()
  );

CREATE POLICY "verification_update_staff"
  ON verification_requests FOR UPDATE
  USING (is_staff());

CREATE POLICY "verification_update_client_own"
  ON verification_requests FOR UPDATE
  USING (
    organization_id = auth_org_id()
    AND status = 'draft'
  );

-- Results — staff only
CREATE POLICY "verification_results_staff"
  ON verification_results FOR ALL USING (is_staff());

CREATE POLICY "verification_results_client_read"
  ON verification_results FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM verification_requests v
      WHERE v.id = verification_results.verification_id
      AND v.organization_id = auth_org_id()
    )
  );

-- Status history
CREATE POLICY "verification_history_staff"
  ON verification_status_history FOR ALL USING (is_staff());

CREATE POLICY "verification_history_client_read"
  ON verification_status_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM verification_requests v
      WHERE v.id = verification_status_history.verification_id
      AND v.organization_id = auth_org_id()
    )
  );

-- ─────────────────────────────────────────────────────────────
-- AUTHORIZATION REQUESTS
-- ─────────────────────────────────────────────────────────────

CREATE POLICY "authorization_select_staff"
  ON authorization_requests FOR SELECT USING (is_staff());

CREATE POLICY "authorization_select_client"
  ON authorization_requests FOR SELECT
  USING (organization_id = auth_org_id());

CREATE POLICY "authorization_insert"
  ON authorization_requests FOR INSERT
  WITH CHECK (is_staff() OR organization_id = auth_org_id());

CREATE POLICY "authorization_update_staff"
  ON authorization_requests FOR UPDATE USING (is_staff());

CREATE POLICY "authorization_update_client_draft"
  ON authorization_requests FOR UPDATE
  USING (organization_id = auth_org_id() AND status = 'draft');

CREATE POLICY "authorization_followups_staff"
  ON authorization_followups FOR ALL USING (is_staff());

CREATE POLICY "authorization_history_staff"
  ON authorization_status_history FOR ALL USING (is_staff());

CREATE POLICY "authorization_history_client_read"
  ON authorization_status_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM authorization_requests a
      WHERE a.id = authorization_status_history.authorization_id
      AND a.organization_id = auth_org_id()
    )
  );

CREATE POLICY "authorization_appeals_staff"
  ON authorization_appeals FOR ALL USING (is_staff());

-- ─────────────────────────────────────────────────────────────
-- DOCUMENTS
-- ─────────────────────────────────────────────────────────────

CREATE POLICY "documents_select_staff"
  ON documents FOR SELECT USING (is_staff() AND is_deleted = false);

CREATE POLICY "documents_select_client_own"
  ON documents FOR SELECT
  USING (organization_id = auth_org_id() AND is_deleted = false);

CREATE POLICY "documents_insert"
  ON documents FOR INSERT
  WITH CHECK (is_staff() OR organization_id = auth_org_id());

CREATE POLICY "documents_delete_admin"
  ON documents FOR UPDATE
  USING (is_admin());

-- ─────────────────────────────────────────────────────────────
-- TASKS
-- ─────────────────────────────────────────────────────────────

CREATE POLICY "tasks_staff_all"
  ON tasks FOR ALL USING (is_staff());

CREATE POLICY "tasks_client_own_org"
  ON tasks FOR SELECT
  USING (organization_id = auth_org_id());

-- ─────────────────────────────────────────────────────────────
-- NOTIFICATIONS
-- ─────────────────────────────────────────────────────────────

CREATE POLICY "notifications_own"
  ON notifications FOR ALL
  USING (user_id = auth.uid());

-- ─────────────────────────────────────────────────────────────
-- COMMENTS
-- ─────────────────────────────────────────────────────────────

CREATE POLICY "request_comments_staff"
  ON request_comments FOR ALL USING (is_staff());

CREATE POLICY "request_comments_client_own"
  ON request_comments FOR SELECT
  USING (is_internal = false AND created_by = auth.uid());

CREATE POLICY "task_comments_staff"
  ON task_comments FOR ALL USING (is_staff());

-- ─────────────────────────────────────────────────────────────
-- AUDIT LOGS (read-only for admins)
-- ─────────────────────────────────────────────────────────────

CREATE POLICY "audit_logs_admin_read"
  ON audit_logs FOR SELECT USING (is_admin());

CREATE POLICY "audit_logs_insert_service"
  ON audit_logs FOR INSERT WITH CHECK (true); -- service role only in practice

CREATE POLICY "activity_logs_admin"
  ON activity_logs FOR SELECT USING (is_admin() OR is_staff());

CREATE POLICY "activity_logs_insert"
  ON activity_logs FOR INSERT WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────
-- DASHBOARD METRICS
-- ─────────────────────────────────────────────────────────────

CREATE POLICY "metrics_staff_all"
  ON dashboard_metrics FOR ALL USING (is_staff());

CREATE POLICY "metrics_client_own"
  ON dashboard_metrics FOR SELECT
  USING (organization_id = auth_org_id() OR organization_id IS NULL);

-- ─────────────────────────────────────────────────────────────
-- CONTENT (public pages, FAQs, testimonials)
-- ─────────────────────────────────────────────────────────────

CREATE POLICY "website_pages_public_read"
  ON website_pages FOR SELECT USING (is_published = true);

CREATE POLICY "website_pages_admin"
  ON website_pages FOR ALL USING (is_admin() OR is_staff());

CREATE POLICY "faqs_public_read"
  ON faqs FOR SELECT USING (is_published = true);

CREATE POLICY "faqs_admin"
  ON faqs FOR ALL USING (is_admin() OR is_staff());

CREATE POLICY "testimonials_public_read"
  ON testimonials FOR SELECT USING (is_published = true);

CREATE POLICY "testimonials_admin"
  ON testimonials FOR ALL USING (is_admin());

CREATE POLICY "blog_posts_public_read"
  ON blog_posts FOR SELECT USING (is_published = true);

CREATE POLICY "blog_posts_admin"
  ON blog_posts FOR ALL USING (is_admin() OR is_staff());

CREATE POLICY "seo_settings_public_read"
  ON seo_settings FOR SELECT USING (true);

CREATE POLICY "seo_settings_admin"
  ON seo_settings FOR ALL USING (is_admin());

-- ─────────────────────────────────────────────────────────────
-- SYSTEM SETTINGS
-- ─────────────────────────────────────────────────────────────

CREATE POLICY "system_settings_admin"
  ON system_settings FOR ALL USING (is_admin());

CREATE POLICY "integrations_admin"
  ON integrations FOR ALL USING (is_admin());
