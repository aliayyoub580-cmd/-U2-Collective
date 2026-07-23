-- ============================================================
-- U2 Collective — Permission Seed Data
-- 003_seed_permissions.sql
-- ============================================================

INSERT INTO permissions (key, label, category, description) VALUES
-- Dashboard
('dashboard.view',              'View Dashboard',           'Dashboard', 'Access main dashboard'),
('dashboard.view_org_metrics',  'View Org-Wide Metrics',    'Dashboard', 'View platform-wide analytics'),
('dashboard.export_reports',    'Export Reports',           'Dashboard', 'Download dashboard exports'),
-- Users
('users.view',           'View Users',         'Users', 'List and view user profiles'),
('users.create',         'Create Users',       'Users', 'Invite and create new users'),
('users.edit',           'Edit Users',         'Users', 'Update user information'),
('users.deactivate',     'Deactivate Users',   'Users', 'Disable user accounts'),
('users.reset_access',   'Reset User Access',  'Users', 'Reset passwords and sessions'),
('users.assign_roles',   'Assign Roles',       'Users', 'Change user role assignments'),
-- Sub-admins
('subadmins.view',               'View Sub-Admins',             'Sub-Admins', 'List sub-admin accounts'),
('subadmins.create',             'Create Sub-Admins',           'Sub-Admins', 'Create new sub-admin accounts'),
('subadmins.edit_permissions',   'Edit Sub-Admin Permissions',  'Sub-Admins', 'Modify sub-admin permission sets'),
('subadmins.deactivate',         'Deactivate Sub-Admins',       'Sub-Admins', 'Disable sub-admin accounts'),
-- Clients
('clients.view',           'View Clients',           'Clients', 'View client accounts and profiles'),
('clients.create',         'Create Clients',         'Clients', 'Onboard new client organizations'),
('clients.edit',           'Edit Clients',           'Clients', 'Update client information'),
('clients.archive',        'Archive Clients',        'Clients', 'Archive inactive clients'),
('clients.view_contracts', 'View Client Contracts',  'Clients', 'Access client service agreements'),
('clients.manage_users',   'Manage Client Users',    'Clients', 'Add/remove users from clients'),
-- Verification
('verification.view',            'View Verification',         'Verification', 'View verification requests'),
('verification.create',          'Create Verification',       'Verification', 'Submit new verification requests'),
('verification.edit',            'Edit Verification',         'Verification', 'Update verification data'),
('verification.assign',          'Assign Verification',       'Verification', 'Assign requests to specialists'),
('verification.update_status',   'Update Verification Status','Verification', 'Change request status'),
('verification.upload_documents','Upload Documents',          'Verification', 'Attach files to requests'),
('verification.export',          'Export Verification',       'Verification', 'Export verification reports'),
('verification.delete_draft',    'Delete Draft Requests',     'Verification', 'Remove draft verifications'),
-- Authorization
('authorization.view',            'View Authorization',          'Authorization', 'View authorization requests'),
('authorization.create',          'Create Authorization',        'Authorization', 'Submit new auth requests'),
('authorization.edit',            'Edit Authorization',          'Authorization', 'Update authorization data'),
('authorization.assign',          'Assign Authorization',        'Authorization', 'Assign to specialists'),
('authorization.submit_status',   'Update Auth Status',          'Authorization', 'Change authorization status'),
('authorization.add_followup',    'Add Follow-Up Notes',         'Authorization', 'Record payer contact notes'),
('authorization.record_approval', 'Record Approval',             'Authorization', 'Document approval details'),
('authorization.record_denial',   'Record Denial',               'Authorization', 'Document denial details'),
('authorization.create_appeal',   'Create Appeal',               'Authorization', 'Initiate appeal process'),
('authorization.upload_files',    'Upload Auth Documents',       'Authorization', 'Attach clinical files'),
-- Reports
('reports.view',              'View Reports',            'Reports', 'Access reporting section'),
('reports.export_csv',        'Export CSV',              'Reports', 'Download CSV exports'),
('reports.export_pdf',        'Export PDF',              'Reports', 'Download PDF exports'),
('reports.view_financial',    'View Financial Metrics',  'Reports', 'Access revenue metrics'),
('reports.view_productivity', 'View Productivity',       'Reports', 'Access staff performance data'),
('reports.view_turnaround',   'View Turnaround Reports', 'Reports', 'Access timing reports'),
-- Content
('content.manage_pages',       'Manage Pages',       'Content', 'Edit website page content'),
('content.manage_faqs',        'Manage FAQs',        'Content', 'Edit FAQ entries'),
('content.manage_testimonials','Manage Testimonials','Content', 'Manage client testimonials'),
('content.manage_specialties', 'Manage Specialties', 'Content', 'Edit specialty listings'),
('content.manage_blog',        'Manage Blog',        'Content', 'Create and edit blog posts'),
('content.manage_metrics',     'Manage Metrics',     'Content', 'Update site metric values'),
('content.manage_seo',         'Manage SEO',         'Content', 'Edit SEO settings'),
-- System
('system.view_audit_logs',       'View Audit Logs',         'System', 'Access audit trail'),
('system.manage_notifications',  'Manage Notifications',    'System', 'Configure notification rules'),
('system.manage_integrations',   'Manage Integrations',     'System', 'Configure EHR/PMS connections'),
('system.manage_payers',         'Manage Payer Directory',  'System', 'Add and edit payers'),
('system.manage_ehr',            'Manage EHR Configs',      'System', 'Configure EHR systems'),
('system.manage_settings',       'Manage System Settings',  'System', 'Access global settings')
ON CONFLICT (key) DO NOTHING;

-- ─── Permission Templates ─────────────────────────────────────────────────────

INSERT INTO permission_templates (id, name, description, is_system) VALUES
  ('00000000-0000-0000-0000-000000000001', 'View Only',            'Read-only access to assigned modules', true),
  ('00000000-0000-0000-0000-000000000002', 'Operations Manager',   'Full operational access except system settings', true),
  ('00000000-0000-0000-0000-000000000003', 'Authorization Manager','Authorization and follow-up management', true),
  ('00000000-0000-0000-0000-000000000004', 'Content Manager',      'Website and content management', true)
ON CONFLICT (id) DO NOTHING;

-- View Only template
INSERT INTO permission_template_items (template_id, permission_key)
SELECT '00000000-0000-0000-0000-000000000001', key
FROM permissions
WHERE key IN (
  'dashboard.view','verification.view','authorization.view',
  'clients.view','reports.view','users.view'
)
ON CONFLICT DO NOTHING;

-- Operations Manager template
INSERT INTO permission_template_items (template_id, permission_key)
SELECT '00000000-0000-0000-0000-000000000002', key
FROM permissions
WHERE category IN ('Dashboard','Verification','Authorization','Reports','Clients')
AND key NOT IN ('dashboard.view_org_metrics','clients.archive')
ON CONFLICT DO NOTHING;

-- Authorization Manager template
INSERT INTO permission_template_items (template_id, permission_key)
SELECT '00000000-0000-0000-0000-000000000003', key
FROM permissions
WHERE category IN ('Authorization','Dashboard') OR key IN ('verification.view','reports.view')
ON CONFLICT DO NOTHING;

-- Content Manager template
INSERT INTO permission_template_items (template_id, permission_key)
SELECT '00000000-0000-0000-0000-000000000004', key
FROM permissions
WHERE category = 'Content' OR key = 'dashboard.view'
ON CONFLICT DO NOTHING;
