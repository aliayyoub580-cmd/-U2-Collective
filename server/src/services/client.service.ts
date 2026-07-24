import { createUserClient } from '../config/supabase.js'
import { paginationParams } from '../utils/pagination.js'

export const clientService = {
  async list(query: Record<string, unknown>, token: string) {
    const { page, pageSize, from, to } = paginationParams(
      query.page as string | number,
      query.pageSize as string | number,
    )

    let request = createUserClient(token)
      .from('organizations')
      .select('id, name, specialty, ehr_system, phone, email, status, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (query.search) {
      const search = String(query.search).replace(/[,%()]/g, '')
      request = request.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    const { data, error, count } = await request
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

  async create(input: Record<string, string | undefined>, token: string, userId: string) {
    const { data, error } = await createUserClient(token)
      .from('organizations')
      .insert({
        name: input.name,
        specialty: input.specialty || null,
        ehr_system: input.ehr_system || null,
        phone: input.phone || null,
        email: input.email || null,
        status: 'active',
        created_by: userId,
      })
      .select('id, name, specialty, ehr_system, phone, email, status, created_at')
      .single()

    if (error) throw new Error(error.message)
    return data
  },
}
