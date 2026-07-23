import api from '@/services/api'
import type { VerificationRequest, PaginationMeta } from '@/types'

export interface VerificationListResponse {
  data: VerificationRequest[]
  meta: PaginationMeta
}

export const verificationService = {

  async list(params?: Record<string, unknown>): Promise<VerificationListResponse> {
    const res = await api.get<{ data: VerificationListResponse }>('/verifications', { params })
    return res.data.data
  },

  async getById(id: string) {
    const res = await api.get<{ data: VerificationRequest }>(`/verifications/${id}`)
    return res.data.data
  },

  async create(data: Partial<VerificationRequest>) {
    const res = await api.post<{ data: VerificationRequest }>('/verifications', data)
    return res.data.data
  },

  async update(id: string, data: Partial<VerificationRequest>) {
    const res = await api.patch<{ data: VerificationRequest }>(`/verifications/${id}`, data)
    return res.data.data
  },

  async uploadDocument(id: string, file: File, description?: string) {
    const form = new FormData()
    form.append('file', file)
    if (description) form.append('description', description)
    const res = await api.post(`/verifications/${id}/documents`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  },

  async listDocuments(id: string) {
    const res = await api.get(`/verifications/${id}/documents`)
    return res.data.data
  },
}
