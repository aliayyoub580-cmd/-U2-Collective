import { createUserClient, supabaseAdmin } from '../config/supabase.js'
import { paginationParams } from '../utils/pagination.js'
import { logger } from '../utils/logger.js'
import type { AuthUser } from '../types/index.js'
import type {
  CreateUserInput,
  UpdateUserInput,
  CreateSubAdminInput,
  UpdateSubAdminPermissionsInput,
} from '../validators/user.validator.js'

export const userService = {

  async listUsers(query: Record<string, unknown>, token: string) {
    const { page, pageSize, from, to } = paginationParams(query.page as number, query.pageSize as number)

    let q = createUserClient(token)
      .from('profiles')
      .select('id, email, full_name, role, organization_id, is_active, created_at, last_login, organizations!fk_profiles_organization(name)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (query.search) {
      q = q.or(`full_name.ilike.%${query.search}%,email.ilike.%${query.search}%`)
    }
    if (query.role)      q = q.eq('role', query.role as string)
    if (query.is_active !== undefined) q = q.eq('is_active', query.is_active)

    const { data, error, count } = await q
    if (error) throw new Error(error.message)

    return {
      data: data ?? [],
      meta: { page, pageSize, total: count ?? 0, totalPages: Math.ceil((count ?? 0) / pageSize) },
    }
  },

  async createUser(input: CreateUserInput, createdBy: AuthUser) {
    // Create Supabase auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: input.email,
      password: input.password ?? generateTempPassword(),
      email_confirm: true,
    })

    if (authError) throw new Error(authError.message)

    const { error: profileError } = await supabaseAdmin.from('profiles').insert({
      id:              authData.user.id,
      email:           input.email,
      full_name:       input.full_name,
      role:            input.role,
      organization_id: input.organization_id,
      phone:           input.phone,
      is_active:       true,
      created_by:      createdBy.id,
    })

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      throw new Error(profileError.message)
    }

    return { id: authData.user.id, email: input.email }
  },

  async updateUser(id: string, input: UpdateUserInput, updatedBy: AuthUser) {
    // Prevent last super_admin demotion
    if (input.role) {
      const { count } = await supabaseAdmin
        .from('profiles').select('*', { count: 'exact', head: true })
        .eq('role', 'super_admin').eq('is_active', true)
      if ((count ?? 0) <= 1) {
        const { data: target } = await supabaseAdmin
          .from('profiles').select('role').eq('id', id).single()
        if (target?.role === 'super_admin') {
          throw new Error('Cannot demote the last super admin')
        }
      }
    }

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ ...input, updated_by: updatedBy.id })
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  },

  async updatePassword(id: string, password: string) {
    const { error } = await supabaseAdmin.auth.admin.updateUserById(id, {
      password,
      email_confirm: true,
    })
    if (error) throw new Error(error.message)
  },

  async deactivateUser(id: string, updatedBy: AuthUser) {
    // Prevent last super_admin deactivation
    const { data: profile } = await supabaseAdmin.from('profiles').select('role').eq('id', id).single()
    if (profile?.role === 'super_admin') {
      const { count } = await supabaseAdmin
        .from('profiles').select('*', { count: 'exact', head: true })
        .eq('role', 'super_admin').eq('is_active', true)
      if ((count ?? 0) <= 1) throw new Error('Cannot deactivate the last super admin')
    }

    const { error } = await supabaseAdmin
      .from('profiles')
      .update({ is_active: false, updated_by: updatedBy.id })
      .eq('id', id)

    if (error) throw new Error(error.message)
  },

  // ── Sub-admin management ──────────────────────────────────────────────────

  async listSubAdmins(query: Record<string, unknown>, token: string) {
    const { from, to, page, pageSize } = paginationParams(query.page as number, query.pageSize as number)

    const { data, error, count } = await createUserClient(token)
      .from('sub_admin_profiles')
      .select(`
        id, created_at,
        profiles!user_id(id, full_name, email, is_active, last_login),
        permission_templates(name),
        sub_admin_permissions(permission_key)
      `, { count: 'exact' })
      .range(from, to)

    if (error) throw new Error(error.message)

    return {
      data: data ?? [],
      meta: { page, pageSize, total: count ?? 0, totalPages: Math.ceil((count ?? 0) / pageSize) },
    }
  },

  async createSubAdmin(input: CreateSubAdminInput, createdBy: AuthUser, token: string) {
    // Use public signup for the Auth identity; authenticated admin RLS handles
    // all role/profile and permission writes.
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: input.email,
      password: input.password,
      email_confirm: true,
    })
    if (authError || !authData.user) throw new Error(authError?.message ?? 'Failed to create login')

    const userClient = createUserClient(token)
    const { error: profileError } = await userClient.from('profiles').insert({
      id: authData.user.id,
      email: input.email,
      full_name: input.full_name,
      role: 'sub_admin',
      phone: input.phone,
      is_active: true,
      created_by: createdBy.id,
    })
    if (profileError) throw new Error(profileError.message)

    const { data: sadmin, error } = await userClient
      .from('sub_admin_profiles')
      .insert({ user_id: authData.user.id, template_id: input.template_id, created_by: createdBy.id })
      .select()
      .single()

    if (error) throw new Error(error.message)

    // Resolve permissions from template or direct input
    let permKeys: string[] = input.permissions ?? []
    if (input.template_id && permKeys.length === 0) {
      const { data: tItems } = await userClient
        .from('permission_template_items')
        .select('permission_key')
        .eq('template_id', input.template_id)
      permKeys = (tItems ?? []).map((i: { permission_key: string }) => i.permission_key)
    }

    if (permKeys.length > 0) {
      const { error: permissionsError } = await userClient.from('sub_admin_permissions').insert(
        permKeys.map((k) => ({ sub_admin_id: sadmin.id, permission_key: k, granted_by: createdBy.id })),
      )
      if (permissionsError) throw new Error(permissionsError.message)
    }

    return sadmin
  },

  async getSubAdminPermissions(subAdminId: string, token: string) {
    const { data, error } = await createUserClient(token)
      .from('sub_admin_profiles')
      .select('sub_admin_permissions(permission_key)')
      .eq('id', subAdminId)
      .single()
    if (error) throw new Error(error.message)
    return data
  },

  async updateSubAdminPermissions(
    subAdminId: string,
    input: UpdateSubAdminPermissionsInput,
    updatedBy: AuthUser,
  ) {
    // Privilege escalation check: sub_admin cannot grant permissions they don't have
    if (updatedBy.role === 'sub_admin') {
      const { data: myPerms } = await supabaseAdmin
        .from('sub_admin_profiles')
        .select('sub_admin_permissions(permission_key)')
        .eq('user_id', updatedBy.id)
        .single()

      const myKeys = new Set(
        (myPerms?.sub_admin_permissions as Array<{permission_key:string}>|undefined)?.map(p => p.permission_key) ?? []
      )
      const invalid = input.permissions.filter(k => !myKeys.has(k))
      if (invalid.length > 0) {
        throw new Error(`Cannot grant permissions you do not possess: ${invalid.join(', ')}`)
      }
    }

    // Replace all permissions
    await supabaseAdmin.from('sub_admin_permissions').delete().eq('sub_admin_id', subAdminId)

    if (input.permissions.length > 0) {
      await supabaseAdmin.from('sub_admin_permissions').insert(
        input.permissions.map((k) => ({
          sub_admin_id:   subAdminId,
          permission_key: k,
          granted_by:     updatedBy.id,
        })),
      )
    }

    // Audit
    await supabaseAdmin.from('audit_logs').insert({
      user_id:     updatedBy.id,
      action:      'update_permissions',
      module:      'sub_admins',
      record_id:   subAdminId,
      record_type: 'sub_admin_profile',
      new_value:   { permissions: input.permissions },
    })
  },
}

function generateTempPassword(): string {
  return `Tmp_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}!`
}
