/**
 * Seed Admin User Script
 * Creates admin@gmail.com / admin123 as super_admin
 * Run: npx tsx src/scripts/seed-admin.ts
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function seedAdmin() {
  console.log('🌱 Seeding admin user...')

  const ADMIN_EMAIL    = 'admin@gmail.com'
  const ADMIN_PASSWORD = 'admin123'
  const ADMIN_NAME     = 'U2 Admin'

  // ── 1. Create or retrieve auth user ─────────────────────────────────────────
  let userId: string

  // Check if already exists
  const { data: listData } = await supabaseAdmin.auth.admin.listUsers()
  const existing = listData?.users?.find(u => u.email === ADMIN_EMAIL)

  if (existing) {
    console.log(`  ✓ Auth user already exists: ${ADMIN_EMAIL} (${existing.id})`)
    userId = existing.id

    // Ensure password is set correctly
    await supabaseAdmin.auth.admin.updateUserById(userId, { password: ADMIN_PASSWORD })
    console.log('  ✓ Password updated')
  } else {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email:          ADMIN_EMAIL,
      password:       ADMIN_PASSWORD,
      email_confirm:  true,
    })

    if (error || !data?.user) {
      console.error('  ✗ Failed to create auth user:', error?.message)
      process.exit(1)
    }

    userId = data.user.id
    console.log(`  ✓ Auth user created: ${ADMIN_EMAIL} (${userId})`)
  }

  // ── 2. Upsert profile ────────────────────────────────────────────────────────
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .upsert({
      id:         userId,
      email:      ADMIN_EMAIL,
      full_name:  ADMIN_NAME,
      role:       'super_admin',
      is_active:  true,
    }, { onConflict: 'id' })

  if (profileError) {
    console.error('  ✗ Failed to upsert profile:', profileError.message)
    process.exit(1)
  }

  console.log('  ✓ Profile upserted as super_admin')

  // ── 3. Seed sample organization ─────────────────────────────────────────────
  const ORG_ID = 'aaaaaaaa-0000-0000-0000-000000000001'

  const { error: orgError } = await supabaseAdmin
    .from('organizations')
    .upsert({
      id:       ORG_ID,
      name:     'U2 Collective (Internal)',
      specialty:'Multi-Specialty',
      status:   'active',
    }, { onConflict: 'id' })

  if (orgError) {
    console.warn('  ⚠ Organization upsert warning:', orgError.message)
  } else {
    console.log('  ✓ Sample organization seeded')
  }

  // Link admin to org
  await supabaseAdmin
    .from('profiles')
    .update({ organization_id: ORG_ID })
    .eq('id', userId)

  // ── 4. Seed sample client org ────────────────────────────────────────────────
  const CLIENT_ORG_ID = 'bbbbbbbb-0000-0000-0000-000000000001'

  await supabaseAdmin.from('organizations').upsert({
    id:          CLIENT_ORG_ID,
    name:        'Family Medicine Group (Demo)',
    specialty:   'Family Medicine',
    ehr_system:  'Epic',
    email:       'demo@familymed.example',
    phone:       '(555) 100-0001',
    status:      'active',
    notes:       'Demo client for development',
  }, { onConflict: 'id' })

  console.log('  ✓ Demo client organization seeded')

  // ── 5. Seed sample verification requests ─────────────────────────────────────
  const sampleVerifications = [
    { patient_ref: 'PT-10021', payer_name: 'BlueCross BlueShield', status: 'verified',    priority: 'normal', service_date: '2026-07-22' },
    { patient_ref: 'PT-10022', payer_name: 'Aetna HMO',           status: 'in_review',   priority: 'high',   service_date: '2026-07-23' },
    { patient_ref: 'PT-10023', payer_name: 'UnitedHealthcare',    status: 'submitted',   priority: 'normal', service_date: '2026-07-24' },
    { patient_ref: 'PT-10024', payer_name: 'Cigna PPO',           status: 'draft',       priority: 'low',    service_date: '2026-07-25' },
    { patient_ref: 'PT-10025', payer_name: 'Humana',              status: 'completed',   priority: 'normal', service_date: '2026-07-18' },
  ]

  for (const v of sampleVerifications) {
    await supabaseAdmin.from('verification_requests').upsert({
      ...v,
      organization_id: ORG_ID,
      created_by:      userId,
      updated_by:      userId,
    }, { onConflict: 'id' })
  }
  console.log('  ✓ Sample verification requests seeded')

  // ── 6. Seed sample authorization requests ────────────────────────────────────
  const sampleAuthorizations = [
    { patient_ref: 'PT-10021', payer_name: 'BlueCross BlueShield', procedure_description: 'MRI Lumbar Spine', cpt_codes: ['72148'], diagnosis_codes: ['M54.5'], status: 'approved',      priority: 'normal' },
    { patient_ref: 'PT-10022', payer_name: 'Aetna HMO',           procedure_description: 'Physical Therapy (12 visits)', cpt_codes: ['97110','97014'], diagnosis_codes: ['M25.511'], status: 'pending_payer_response', priority: 'high' },
    { patient_ref: 'PT-10023', payer_name: 'UnitedHealthcare',    procedure_description: 'Echocardiogram',    cpt_codes: ['93306'], diagnosis_codes: ['I10'],    status: 'submitted',   priority: 'normal' },
    { patient_ref: 'PT-10024', payer_name: 'Cigna PPO',           procedure_description: 'Knee Arthroscopy',  cpt_codes: ['29881'], diagnosis_codes: ['M23.61'], status: 'denied',      priority: 'urgent' },
    { patient_ref: 'PT-10025', payer_name: 'Humana',              procedure_description: 'CT Chest w/Contrast', cpt_codes: ['71250'], diagnosis_codes: ['R05.9'], status: 'appeal_in_progress', priority: 'high' },
  ]

  for (const a of sampleAuthorizations) {
    await supabaseAdmin.from('authorization_requests').upsert({
      ...a,
      hcpcs_codes:     [],
      organization_id: ORG_ID,
      created_by:      userId,
      updated_by:      userId,
    }, { onConflict: 'id' })
  }
  console.log('  ✓ Sample authorization requests seeded')

  // ── 7. Seed sample tasks ──────────────────────────────────────────────────────
  const sampleTasks = [
    { title: 'Follow up with BlueCross on auth #BCB-2026-4892', priority: 'high',   status: 'open',        due_date: '2026-07-22' },
    { title: 'Request clinical notes from Dr. Martinez',        priority: 'normal', status: 'in_progress', due_date: '2026-07-23' },
    { title: 'Review denial reason for PT-10024',               priority: 'urgent', status: 'open',        due_date: '2026-07-21' },
    { title: 'Confirm expiration date on auth for PT-10021',    priority: 'low',    status: 'open',        due_date: '2026-07-28' },
  ]

  for (const t of sampleTasks) {
    await supabaseAdmin.from('tasks').upsert({
      ...t,
      organization_id: ORG_ID,
      assigned_to:     userId,
      created_by:      userId,
    }, { onConflict: 'id' })
  }
  console.log('  ✓ Sample tasks seeded')

  console.log('\n✅ Seed complete!')
  console.log('─────────────────────────────────')
  console.log(`   Email:    ${ADMIN_EMAIL}`)
  console.log(`   Password: ${ADMIN_PASSWORD}`)
  console.log(`   Role:     super_admin`)
  console.log('─────────────────────────────────')
  console.log('   Login at: http://localhost:5174/login')
  console.log('   Admin at: http://localhost:5174/admin/dashboard')
}

seedAdmin().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
