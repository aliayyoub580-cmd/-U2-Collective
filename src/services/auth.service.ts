import { supabase } from '@/lib/supabase'
import api from '@/services/api'
import { useAuthStore } from '@/store/index'
import type { User } from '@/types'

let sessionRestore: Promise<void> | null = null

export const authService = {

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)

    // Fetch full profile from our API
    const profileRes = await api.get<{ data: User }>('/auth/me', {
      headers: { Authorization: `Bearer ${data.session.access_token}` },
    })

    const store = useAuthStore.getState()
    store.setToken(data.session.access_token)
    store.setUser(profileRes.data.data)

    return profileRes.data.data
  },

  async logout() {
    await supabase.auth.signOut()
    useAuthStore.getState().logout()
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) throw new Error(error.message)
  },

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  },

  // Restore auth state on app load
  restoreSession() {
    if (sessionRestore) return sessionRestore

    sessionRestore = (async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const store = useAuthStore.getState()

      if (session?.access_token) {
        try {
          store.setToken(session.access_token)
          const profileRes = await api.get<{ data: User }>('/auth/me')
          store.setUser(profileRes.data.data)
        } catch {
          store.logout()
          await supabase.auth.signOut({ scope: 'local' })
        }
      }

      store.setLoading(false)
    })().finally(() => { sessionRestore = null })

    return sessionRestore
  },

  // Listen to Supabase auth state changes (token refresh, etc.)
  onAuthStateChange(callback: (event: string) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      const store = useAuthStore.getState()
      if (event === 'TOKEN_REFRESHED' && session) {
        store.setToken(session.access_token)
      }
      if (event === 'SIGNED_OUT') {
        store.logout()
      }
      callback(event)
    })
  },
}
