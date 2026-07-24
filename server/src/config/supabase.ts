import { createClient } from '@supabase/supabase-js'
import { env } from './env.js'

// Public client — uses anon key, respects RLS
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// User-scoped client — forwards the caller's JWT so database RLS policies apply.
export function createUserClient(token: string) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

// Admin client — uses service role key, bypasses RLS
// NEVER expose to frontend. Server-side only.
export const supabaseAdmin = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } },
)
