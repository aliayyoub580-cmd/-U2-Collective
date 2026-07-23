# REST API

Base path: `/api`. Protected endpoints require a Supabase bearer token.

| Area | Routes | Purpose |
|---|---|---|
| Auth | `/auth` | Login, registration, sessions and passwords |
| Dashboard | `/dashboard` | Organization-scoped metrics |
| Verifications | `/verifications` | Requests, results and documents |
| Authorizations | `/authorizations` | Requests, follow-ups, decisions and appeals |
| Documents | `/documents` | Private storage and signed downloads |
| Tasks and comments | `/tasks`, `/comments` | Operational collaboration |
| Notifications | `/notifications` | User notifications |
| Users and permissions | `/users`, `/permissions` | Administration and permission templates |
| Audit logs | `/audit-logs` | Paginated system audit trail |
| Content | `/content` | Permission-protected CMS data |

Successful responses use `{ "success": true, "data": ... }`; errors use `{ "success": false, "message": "..." }`. The API authenticates and permission-checks requests, scopes client access by organization, and relies on RLS as defense in depth.
