# Deployment

## Required services

- Supabase project with PostgreSQL, Auth, Realtime, and private Storage buckets
- Node.js 18+ host for `server/`
- Static/SPA host for `client/dist/`

## Database

Run `001_initial_schema.sql`, `002_rls_policies.sql`, and `003_seed_permissions.sql` in order. Load `seed.sql` only after reviewing its non-production sample content. Create private `client-documents` and `authorization-documents` buckets and verify their policies.

## API and client

Configure `.env.example`, run `npm ci && npm run build` in each package, then start the server with `npm start`. Keep the Supabase service-role key server-only, terminate TLS at the platform, restrict `CLIENT_URL` to the production origin, and expose `GET /health` for health checks.

Serve `client/dist` with SPA fallback to `index.html`. Cache hashed assets long-term while keeping `index.html`, `robots.txt`, and `sitemap.xml` on short cache lifetimes.

## Pre-launch checklist

- Apply migrations and test in staging first.
- Verify staff, client-admin, client-staff, and read-only authorization boundaries.
- Test keyboard navigation, reduced motion, and 360px/768px/1440px layouts.
- Test private uploads, downloads, and signed-URL expiration.
- Configure backups, log retention, monitoring, uptime checks, and secret rotation.
- Replace placeholder metrics, contact details, testimonials, and legal copy.
- Run dependency audit and Lighthouse against production.

Technical controls alone do not establish HIPAA compliance. Complete BAAs, policies, risk review, incident response, and vendor governance before processing PHI.
