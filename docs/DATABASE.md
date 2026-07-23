# Database relationships

`organizations` is the tenant boundary. `profiles` and `organization_users` associate authenticated users with an organization and role.

```text
organizations
├── profiles / organization_users
├── clients ── client_locations / client_contacts
├── verification_requests
│   ├── verification_results / verification_status_history
│   └── request_comments / documents
├── authorization_requests
│   ├── authorization_followups / authorization_status_history
│   └── authorization_appeals / documents
├── tasks ── task_comments
├── notifications / audit_logs
└── dashboard_metrics
```

RBAC uses `roles`, `permissions`, and `role_permissions`; sub-admin overrides use `sub_admin_profiles` and `sub_admin_permissions`. CMS data resides in `website_pages`, `faqs`, `testimonials`, `blog_posts`, and `seo_settings`.

See `supabase/migrations/001_initial_schema.sql` for constraints and `002_rls_policies.sql` for tenant isolation.
