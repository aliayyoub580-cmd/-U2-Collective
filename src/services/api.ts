import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { toast } from 'sonner'

const configuredUrl = import.meta.env.VITE_API_URL as string | undefined
const isLoopbackUrl = configuredUrl
  ? /^https?:\/\/(localhost|127\.0\.0\.1)(?::\d+)?(?:\/|$)/i.test(configuredUrl)
  : false
const BASE_URL = import.meta.env.PROD
  ? (configuredUrl && !isLoopbackUrl ? configuredUrl : '/api')
  : (configuredUrl ?? 'http://localhost:4000/api')

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
})

// ── Request interceptor — attach token ────────────────────────────────────────
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  try {
    const raw = localStorage.getItem('u2-auth')
    if (raw) {
      const parsed = JSON.parse(raw) as { state?: { token?: string } }
      const token = parsed?.state?.token
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
  } catch {
    // ignore parse errors
  }
  return config
})

// ── Response interceptor — normalise errors ───────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status
    if (status === 401) {
      localStorage.removeItem('u2-auth')
      const isProtectedRoute = window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/portal')
      if (isProtectedRoute) window.location.replace('/login')
      return Promise.reject(error)
    }

    if (status === 403) {
      toast.error('Access denied. You do not have permission for this action.')
    } else if (status === 429) {
      toast.error('Too many requests. Please wait a moment and try again.')
    } else if (status && status >= 500) {
      toast.error('A server error occurred. Please try again later.')
    } else if (!error.response) {
      toast.error('Network error. Please check your connection.')
    }

    return Promise.reject(error)
  },
)

export default api
