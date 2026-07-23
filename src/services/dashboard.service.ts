import api from '@/services/api'

export const dashboardService = {
  async getStats() {
    const res = await api.get<{ data: unknown }>('/dashboard/stats')
    return res.data.data
  },
  async getMetrics() {
    const res = await api.get<{ data: unknown[] }>('/dashboard/metrics')
    return res.data.data
  },
}
