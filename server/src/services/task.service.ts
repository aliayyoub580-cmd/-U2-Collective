import { supabaseAdmin } from '../config/supabase.js'
import { paginationParams } from '../utils/pagination.js'
import { logger } from '../utils/logger.js'
import type { AuthUser } from '../types/index.js'
import type {
  CreateTaskInput,
  UpdateTaskInput,
  TaskCommentInput,
  RequestCommentInput,
} from '../validators/task.validator.js'

const STAFF_ROLES = [
  'super_admin','admin','sub_admin','manager',
  'verification_specialist','authorization_specialist',
]

export const taskService = {

  async list(user: AuthUser, query: Record<string, unknown>) {
    const { page, pageSize, from, to } = paginationParams(
      query.page as number,
      query.pageSize as number,
    )

    let q = supabaseAdmin
      .from('tasks')
      .select(
        '*, profiles!assigned_to(full_name, email), profiles!created_by(full_name)',
        { count: 'exact' },
      )
      .order(String(query.sortBy ?? 'due_date'), { ascending: query.sortDir !== 'desc', nullsFirst: false })
      .range(from, to)

    if (!STAFF_ROLES.includes(user.role)) {
      q = q.eq('organization_id', user.organization_id!)
    }
    if (query.status)       q = q.eq('status', query.status as string)
    if (query.priority)     q = q.eq('priority', query.priority as string)
    if (query.assigned_to)  q = q.eq('assigned_to', query.assigned_to as string)
    if (query.related_type) q = q.eq('related_type', query.related_type as string)
    if (query.related_id)   q = q.eq('related_id', query.related_id as string)

    const { data, error, count } = await q
    if (error) throw new Error(error.message)

    return {
      data: data ?? [],
      meta: {
        page,
        pageSize,
        total: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / pageSize),
      },
    }
  },

  async getById(id: string, user: AuthUser) {
    let q = supabaseAdmin
      .from('tasks')
      .select('*, profiles!assigned_to(full_name, email), task_comments(*, profiles!created_by(full_name))')
      .eq('id', id)

    if (!STAFF_ROLES.includes(user.role)) {
      q = q.eq('organization_id', user.organization_id!)
    }

    const { data, error } = await q.single()
    if (error || !data) throw new Error('Task not found')
    return data
  },

  async create(input: CreateTaskInput, user: AuthUser) {
    const orgId = user.organization_id
    if (!orgId) throw new Error('User has no organization')

    const { data, error } = await supabaseAdmin
      .from('tasks')
      .insert({ ...input, organization_id: orgId, created_by: user.id })
      .select()
      .single()

    if (error) { logger.error('Task create', error.message); throw new Error(error.message) }
    return data
  },

  async update(id: string, input: UpdateTaskInput, user: AuthUser) {
    const updates: Record<string, unknown> = { ...input, updated_by: user.id }
    if (input.status === 'completed') updates.completed_at = new Date().toISOString()

    const { data, error } = await supabaseAdmin
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  },

  async addComment(taskId: string, input: TaskCommentInput, user: AuthUser) {
    const { data, error } = await supabaseAdmin
      .from('task_comments')
      .insert({ task_id: taskId, body: input.body, created_by: user.id })
      .select('*, profiles!created_by(full_name)')
      .single()

    if (error) throw new Error(error.message)
    return data
  },

  async listComments(taskId: string) {
    const { data, error } = await supabaseAdmin
      .from('task_comments')
      .select('*, profiles!created_by(full_name)')
      .eq('task_id', taskId)
      .order('created_at', { ascending: true })

    if (error) throw new Error(error.message)
    return data ?? []
  },

  // ── Request comments (shared between verification + authorization) ──────────

  async addRequestComment(
    relatedType: string,
    relatedId: string,
    input: RequestCommentInput,
    user: AuthUser,
  ) {
    // Non-staff cannot post internal notes
    if (input.is_internal && !STAFF_ROLES.includes(user.role)) {
      throw new Error('Only staff can post internal notes')
    }

    const { data, error } = await supabaseAdmin
      .from('request_comments')
      .insert({
        related_type: relatedType,
        related_id:   relatedId,
        body:         input.body,
        is_internal:  input.is_internal,
        created_by:   user.id,
      })
      .select('*, profiles!created_by(full_name)')
      .single()

    if (error) throw new Error(error.message)
    return data
  },

  async listRequestComments(relatedType: string, relatedId: string, user: AuthUser) {
    let q = supabaseAdmin
      .from('request_comments')
      .select('*, profiles!created_by(full_name)')
      .eq('related_type', relatedType)
      .eq('related_id', relatedId)
      .order('created_at', { ascending: true })

    // Non-staff cannot see internal notes
    if (!STAFF_ROLES.includes(user.role)) {
      q = q.eq('is_internal', false)
    }

    const { data, error } = await q
    if (error) throw new Error(error.message)
    return data ?? []
  },
}
