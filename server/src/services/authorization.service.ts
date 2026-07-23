import { supabaseAdmin } from '../config/supabase.js'
import { paginationParams } from '../utils/pagination.js'
import { logger } from '../utils/logger.js'
import type { AuthUser } from '../types/index.js'
import type {
  CreateAuthorizationInput,
  UpdateAuthorizationInput,
  AddFollowupInput,
  CreateAppealInput,
} from '../validators/authorization.validator.js'

const STAFF_ROLES = ['super_admin','admin','sub_admin','manager','verification_specialist','authorization_specialist']

export const authorizationService = {

  async list(user: AuthUser, query: Record<string, unknown>) {
    const { page, pageSize, from, to } = paginationParams(query.page as number, query.pageSize as number)

    let q = supabaseAdmin
      .from('authorization_requests')
      .select('*, payers(name), profiles!assigned_to(full_name)', { count: 'exact' })
      .order(String(query.sortBy ?? 'created_at'), { ascending: query.sortDir === 'asc' })
      .range(from, to)

    if (!STAFF_ROLES.includes(user.role)) {
      q = q.eq('organization_id', user.organization_id!)
    }

    if (query.status)      q = q.eq('status', query.status as string)
    if (query.priority)    q = q.eq('priority', query.priority as string)
    if (query.assigned_to) q = q.eq('assigned_to', query.assigned_to as string)
    if (query.search) {
      q = q.or(`patient_ref.ilike.%${query.search}%,procedure_description.ilike.%${query.search}%`)
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
      .from('authorization_requests')
      .select(`
        *,
        payers(name, phone),
        profiles!assigned_to(full_name, email),
        authorization_followups(*, profiles!created_by(full_name)),
        authorization_status_history(*, profiles!changed_by(full_name)),
        authorization_appeals(*)
      `)
      .eq('id', id)

    if (!STAFF_ROLES.includes(user.role)) {
      q = q.eq('organization_id', user.organization_id!)
    }

    const { data, error } = await q.single()
    if (error || !data) throw new Error('Authorization request not found')
    return data
  },

  async create(input: CreateAuthorizationInput, user: AuthUser) {
    const orgId = user.organization_id
    if (!orgId) throw new Error('User has no organization')

    const { data, error } = await supabaseAdmin
      .from('authorization_requests')
      .insert({ ...input, organization_id: orgId, created_by: user.id, updated_by: user.id })
      .select()
      .single()

    if (error) { logger.error('Auth create', error.message); throw new Error(error.message) }

    await supabaseAdmin.from('authorization_status_history').insert({
      authorization_id: data.id,
      new_status:       'draft',
      changed_by:       user.id,
    })

    return data
  },

  async update(id: string, input: UpdateAuthorizationInput, user: AuthUser) {
    const { data: current } = await supabaseAdmin
      .from('authorization_requests').select('status').eq('id', id).single()

    const { data, error } = await supabaseAdmin
      .from('authorization_requests')
      .update({ ...input, updated_by: user.id })
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)

    if (input.status && current && input.status !== current.status) {
      await supabaseAdmin.from('authorization_status_history').insert({
        authorization_id: id,
        previous_status:  current.status,
        new_status:       input.status,
        changed_by:       user.id,
        note:             input.internal_notes,
      })
    }

    return data
  },

  async addFollowup(id: string, input: AddFollowupInput, user: AuthUser) {
    const { data, error } = await supabaseAdmin
      .from('authorization_followups')
      .insert({ authorization_id: id, ...input, created_by: user.id })
      .select()
      .single()

    if (error) throw new Error(error.message)

    // Update follow_up_date on the request
    if (input.follow_up_date) {
      await supabaseAdmin.from('authorization_requests')
        .update({ follow_up_date: input.follow_up_date, updated_by: user.id })
        .eq('id', id)
    }

    return data
  },

  async createAppeal(id: string, input: CreateAppealInput, user: AuthUser) {
    const { data, error } = await supabaseAdmin
      .from('authorization_appeals')
      .insert({ authorization_id: id, ...input, created_by: user.id })
      .select()
      .single()

    if (error) throw new Error(error.message)

    // Update auth status to appeal_in_progress
    await supabaseAdmin.from('authorization_requests')
      .update({ status: 'appeal_in_progress', updated_by: user.id })
      .eq('id', id)

    await supabaseAdmin.from('authorization_status_history').insert({
      authorization_id: id,
      new_status:       'appeal_in_progress',
      changed_by:       user.id,
      note:             `Appeal created: ${input.appeal_type}`,
    })

    return data
  },
}
