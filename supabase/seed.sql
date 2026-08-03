-- ============================================================
-- U2 Collective — Development Seed Data
-- seed.sql — Uses masked references only, NO real patient data
-- ============================================================

-- ─── Payers ──────────────────────────────────────────────────────────────────
INSERT INTO payers (id, name, payer_id, payer_type, phone, is_active) VALUES
  ('11000000-0000-0000-0000-000000000001', 'BlueCross BlueShield', 'BCBS-01', 'commercial', '800-555-0101', true),
  ('11000000-0000-0000-0000-000000000002', 'Aetna',               'AETNA-01','commercial', '800-555-0102', true),
  ('11000000-0000-0000-0000-000000000003', 'UnitedHealthcare',    'UHC-01',  'commercial', '800-555-0103', true),
  ('11000000-0000-0000-0000-000000000004', 'Cigna',               'CIGNA-01','commercial', '800-555-0104', true),
  ('11000000-0000-0000-0000-000000000005', 'Humana',              'HUM-01',  'commercial', '800-555-0105', true),
  ('11000000-0000-0000-0000-000000000006', 'Medicare',            'CMS-01',  'medicare',   '800-633-4227', true),
  ('11000000-0000-0000-0000-000000000007', 'Medicaid',            'MCD-STATE','medicaid',  '800-555-0107', true)
ON CONFLICT (id) DO NOTHING;

-- ─── Specialties ─────────────────────────────────────────────────────────────
INSERT INTO specialties (id, slug, name, is_active, sort_order) VALUES
  ('22000000-0000-0000-0000-000000000001','family-medicine',    'Family Medicine',       true, 1),
  ('22000000-0000-0000-0000-000000000002','internal-medicine',  'Internal Medicine',     true, 2),
  ('22000000-0000-0000-0000-000000000003','cardiology',         'Cardiology',            true, 3),
  ('22000000-0000-0000-0000-000000000004','orthopedics',        'Orthopedics',           true, 4),
  ('22000000-0000-0000-0000-000000000005','behavioral-health',  'Behavioral Health',     true, 5),
  ('22000000-0000-0000-0000-000000000006','dermatology',        'Dermatology',           true, 6),
  ('22000000-0000-0000-0000-000000000007','pain-management',    'Pain Management',       true, 7),
  ('22000000-0000-0000-0000-000000000008','physical-therapy',   'Physical Therapy',      true, 8),
  ('22000000-0000-0000-0000-000000000009','radiology',          'Radiology',             true, 9),
  ('22000000-0000-0000-0000-000000000010','multi-specialty',    'Multi-Specialty Groups',true, 10)
ON CONFLICT (slug) DO NOTHING;

-- ─── FAQs ─────────────────────────────────────────────────────────────────────
INSERT INTO faqs (question, answer, sort_order, is_published) VALUES
  ('Which insurance plans do you verify?',
   'We verify coverage across Medicare, Medicaid, and a wide range of commercial payers including BlueCross BlueShield, Aetna, Cigna, UnitedHealthcare, Humana and many regional plans.',
   1, true),
  ('How long does prior authorization usually take?',
   'Timelines vary by payer and procedure type. Our team submits requests promptly and monitors each one proactively. Routine authorizations often return within 1–3 business days.',
   2, true),
  ('Do you integrate with our EHR or practice management system?',
   'We work within your existing workflow and document results in your EHR or PMS. We support major platforms and can discuss your specific system during onboarding.',
   3, true),
  ('How do you protect patient information?',
   'Our platform and processes are designed to support HIPAA-aligned data handling, including access controls, encrypted data transmission, audit logging and secure document storage.',
   4, true),
  ('What happens if an authorization is denied?',
   'Our team documents the denial, reviews the reason, and coordinates appeal support including clinical documentation preparation and resubmission tracking.',
   5, true),
  ('Can you handle high-volume verification requests?',
   'Yes. Our workflows are designed to scale with your practice volume. Contact us to discuss your monthly request volume.',
   6, true),
  ('Do you support Medicare and Medicaid?',
   'Yes. We have experience with Medicare Advantage plans, traditional Medicare, Medicaid managed care organizations and state programs.',
   7, true),
  ('Can our staff monitor authorization progress?',
   'Yes. Your team has access to a secure client dashboard with real-time status on all pending and completed requests.',
   8, true),
  ('Do you provide reporting?',
   'Yes. The client portal includes request volume reports, turnaround summaries, denial tracking and exportable records.',
   9, true),
  ('How is pricing calculated?',
   'Pricing is based on service type, volume and practice needs. Contact us for a customized quote.',
   10, true)
ON CONFLICT DO NOTHING;

-- ─── Testimonials ─────────────────────────────────────────────────────────────
INSERT INTO testimonials (quote, author_name, author_role, organization, specialty, is_published, sort_order) VALUES
  ('U2 Collective helped our team create a more consistent verification process and reduced the administrative burden on our front-office staff. The turnaround time has been notably faster than what we managed in-house.',
   'Office Manager', 'Office Manager', 'Family Medicine Practice', 'Family Medicine', false, 1),
  ('Prior authorization used to be a daily headache for our coordinators. Since working with U2 Collective we have a reliable workflow and better visibility into where each request stands.',
   'Practice Administrator', 'Practice Administrator', 'Multi-Specialty Group', 'Multi-Specialty', false, 2),
  ('The dashboard gives our billing manager exactly what she needs without having to chase down status updates.',
   'Clinic Director', 'Clinic Director', 'Orthopedics & Spine Center', 'Orthopedics', false, 3)
ON CONFLICT DO NOTHING;

-- ─── Dashboard Metrics (all placeholder) ─────────────────────────────────────
INSERT INTO dashboard_metrics (organization_id, metric_key, metric_value, label, is_placeholder) VALUES
  (NULL, 'denial_reduction',       'Up to 40%',  'Reduction in Preventable Denials', true),
  (NULL, 'avg_turnaround',         '< 4 hrs',    'Average Verification Turnaround',  true),
  (NULL, 'monthly_checks',         '500+',       'Monthly Eligibility Checks',       true),
  (NULL, 'auth_followup_rate',     '95%',        'Authorization Follow-Up Rate',     true)
ON CONFLICT (organization_id, metric_key) DO NOTHING;

-- ─── System Settings ──────────────────────────────────────────────────────────
INSERT INTO system_settings (key, value, description) VALUES
  ('company_name',      '"U2 Collective"',                          'Company display name'),
  ('company_email',     '"info@u2collective.com"',               'Support email'),
  ('company_phone',     '"(800) 000-0000"',                         'Support phone'),
  ('max_file_size_mb',  '25',                                       'Max document upload size in MB'),
  ('allowed_mime_types','["application/pdf","image/png","image/jpeg","image/tiff","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]',
                                                                    'Allowed MIME types for document uploads'),
  ('signed_url_expiry', '3600',                                     'Signed URL expiry in seconds'),
  ('notification_email_enabled', 'true',                            'Enable email notifications')
ON CONFLICT (key) DO NOTHING;
