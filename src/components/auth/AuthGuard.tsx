import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/index'
import PageLoader from '@/components/ui/PageLoader'
import type { UserRole } from '@/types'

interface AuthGuardProps {
  allowedRoles?: UserRole[]
  redirectTo?: string
}

export default function AuthGuard({ allowedRoles, redirectTo = '/login' }: AuthGuardProps) {
  const { isAuthenticated, isLoading, user } = useAuthStore()

  if (isLoading) return <PageLoader />
  if (!isAuthenticated || !user) return <Navigate to={redirectTo} replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const isClient = ['client_admin', 'client_staff', 'readonly_client'].includes(user.role)
    return <Navigate to={isClient ? '/portal/dashboard' : '/admin/dashboard'} replace />
  }

  return <Outlet />
}
