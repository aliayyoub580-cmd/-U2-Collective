import { createClient } from '@supabase/supabase-js'
import { createUserClient, supabase, supabaseAdmin } from '../config/supabase.js'
import { env } from '../config/env.js'
import { logger } from '../utils/logger.js'
import type { LoginInput, RegisterInput } from '../validators/auth.validator.js'

export const authService = {

  async login(input: LoginInput) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    })
    if (error || !data.session) {
      throw new Error('Invalid email or password')
    }

    const userClient = createUserClient(data.session.access_token)
    const { data: profile, error: profileError } = await userClient
      .from('profiles')
      .select('id, full_name, email, role, organization_id, is_active')
      .eq('id', data.user.id)
      .single()

    if (profileError || !profile) {
      throw new Error('Admin profile could not be loaded')
    }

    if (!profile.is_active) {
      await supabase.auth.signOut()
      throw new Error('Account is deactivated')
    }

    return {
      access_token:  data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_in:    data.session.expires_in,
      user: profile,
    }
  },

  async register(input: RegisterInput) {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: input.email,
      password: input.password,
      email_confirm: true,
    })

    if (error) {
      logger.error('Register error', error.message)
      throw new Error(error.message)
    }

    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id:              data.user.id,
        email:           input.email,
        full_name:       input.full_name,
        role:            input.role ?? 'readonly_client',
        organization_id: input.organization_id ?? null,
        is_active:       true,
      })

    if (profileError) {
      logger.error('Profile insert error', profileError.message)
      await supabaseAdmin.auth.admin.deleteUser(data.user.id)
      throw new Error('Failed to create user profile')
    }

    return { id: data.user.id, email: input.email }
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${env.CLIENT_URL}/reset-password`,
    })
    if (error) throw new Error(error.message)
  },

  async refreshToken(refreshToken: string) {
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken })
    if (error || !data.session) throw new Error('Invalid refresh token')
    return {
      access_token:  data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_in:    data.session.expires_in,
    }
  },

  async logout(token: string) {
    // Create a temporary client scoped to this token to sign out that session
    const tempClient = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth:   { autoRefreshToken: false, persistSession: false },
    })
    await tempClient.auth.signOut()
  },

  async getProfile(userId: string, token: string) {
    const { data, error } = await createUserClient(token)
      .from('profiles')
      .select('id, full_name, email, role, organization_id, avatar_url, phone, is_active, created_at, last_login')
      .eq('id', userId)
      .single()
    if (error) throw new Error('Profile not found')
    return data
  },
}
