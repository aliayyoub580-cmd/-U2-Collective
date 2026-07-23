import { supabaseAdmin } from '../config/supabase.js'
import { paginationParams } from '../utils/pagination.js'
import { logger } from '../utils/logger.js'
import type { AuthUser } from '../types/index.js'
import type {
  CreateVerificationInput,
  UpdateVerificationInput,
  VerificationResultInput,
} from '../validators/verification.validator.js'

const STAFF_ROLES = ['super_admin','admin','sub_admin','manager','verification_specialist','authorization_specialist']

export const verificationService = {

  async list(user: AuthUser, query: Record<string, unknown>) {
    const { page, pageSize, from, to } = paginationParams(query.page as number, query.pageSize as number)

    let q = supabaseAdmin
      .from('verification_requests')
      .select('*, payers(name), profiles!assigned_to(full_name)', { count: 'exact' })
      .order(String(query.sortBy ?? 'created_at'), { ascending: query.sortDir === 'asc' })
      .range(from, to)

    // Scope by org if client user
    if (!STAFF_ROLES.includes(user.role)) {
      q = q.eq('organization_id', user.organization_id!)
    }

    if (query.status)      q = q.eq('status', query.status as string)
    if (query.priority)    q = q.eq('priority', query.priority as string)
    if (query.assigned_to) q = q.eq('assigned_to', query.assigned_to as string)
    if (query.search) {
      q = q.or(`patient_ref.ilike.%${query.search}%,payer_name.ilike.%${query.search}%`)
    }

    const { data, error, count } = await q
    if (error) throw new Error(error.message)

    return {
      data: data ?? [],
      meta: { page, pageSize, total: count ?? 0, totalPages: Math.ceil((count ?? 0) / pageSize) },
    }
  },

  async getById(id: string, user: AuthUser) {
    let q = supabaseAdmin
      .from('verification_requests')
      .select(`
        *,
        payers(name, phone),
        profiles!assigned_to(full_name, email),
        verification_results(*),
        verification_status_history(*, profiles!changed_by(full_name))
      `)
      .eq('id', id)

    if (!STAFF_ROLES.includes(user.role)) {
      q = q.eq('organization_id', user.organization_id!)
    }

    const { data, error } = await q.single()
    if (error || !data) throw new Error('Verification request not found')
    return data
  },

  async create(input: CreateVerificationInput, user: AuthUser) {
    const orgId = user.organization_id
    if (!orgId) throw new Error('User has no organization')

    const { data, error } = await supabaseAdmin
      .from('verification_requests')
      .insert({ ...input, organization_id: orgId, created_by: user.id, updated_by: user.id })
      .select()
      .single()

    if (error) { logger.error('Verification create', error.message); throw new Error(error.message) }

    // Record initial status history
    await supabaseAdmin.from('verification_status_history').insert({
      verification_id: data.id,
      new_status:      'draft',
      changed_by:      user.id,
    })

    return data
  },

  async update(id: string, input: UpdateVerificationInput, user: AuthUser) {
    // Fetch current for history
    const { data: current } = await supabaseAdmin
      .from('verification_requests').select('status').eq('id', id).single()

    const { data, error } = await supabaseAdmin
      .from('verification_requests')
      .update({ ...input, updated_by: user.id })
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)

    // Log status change
    if (input.status && current && input.status !== current.status) {
      await supabaseAdmin.from('verification_status_history').insert({
        verification_id: id,
        previous_status: current.status,
        new_status:      input.status,
        changed_by:      user.id,
        note:            input.internal_notes,
      })
    }

    return data
  },

  async saveResult(id: string, input: VerificationResultInput, user: AuthUser) {
    const { data, error } = await supabaseAdmin
      .from('verification_results')
      .upsert({ verification_id: id, ...input, verified_by: user.id, verified_at: new Date().toISOString() })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  },

  async addStatusNote(id: string, newStatus: string, note: string, userId: string) {
    const { data: current } = await supabaseAdmin
      .from('verification_requests').select('status').eq('id', id).single()

    await supabaseAdmin.from('verification_requests').update({ status: newStatus, updated_by: userId }).eq('id', id)
    await supabaseAdmin.from('verification_status_history').insert({
      verification_id: id,
      previous_status: current?.status,
      new_status: newStatus,
      changed_by: userId,
      note,
    })
  },
}
