import api from '@/services/api'
import type { AuthorizationRequest, PaginationMeta } from '@/types'

export interface AuthorizationListResponse {
  data: AuthorizationRequest[]
  meta: PaginationMeta
}

export const authorizationService = {

  async list(params?: Record<string, unknown>): Promise<AuthorizationListResponse> {
    const res = await api.get<{ data: AuthorizationListResponse }>('/authorizations', { params })
    return res.data.data
  },

  async getById(id: string) {
    const res = await api.get<{ data: AuthorizationRequest }>(`/authorizations/${id}`)
    return res.data.data
  },

  async create(data: Partial<AuthorizationRequest>) {
    const res = await api.post<{ data: AuthorizationRequest }>('/authorizations', data)
    return res.data.data
  },

  async update(id: string, data: Partial<AuthorizationRequest>) {
    const res = await api.patch<{ data: AuthorizationRequest }>(`/authorizations/${id}`, data)
    return res.data.data
  },

  async addFollowup(id: string, data: Record<string, unknown>) {
    const res = await api.post(`/authorizations/${id}/followups`, data)
    return res.data.data
  },

  async createAppeal(id: string, data: Record<string, unknown>) {
    const res = await api.post(`/authorizations/${id}/appeals`, data)
    return res.data.data
  },

  async uploadDocument(id: string, file: File, description?: string) {
    const form = new FormData()
    form.append('file', file)
    if (description) form.append('description', description)
    const res = await api.post(`/authorizations/${id}/documents`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  },

  async listDocuments(id: string) {
    const res = await api.get(`/authorizations/${id}/documents`)
    return res.data.data
  },
}
