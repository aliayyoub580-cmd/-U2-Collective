import type { Response, NextFunction } from 'express'
import type { AuthRequest, PermissionKey } from '../types/index.js'
import { supabaseAdmin } from '../config/supabase.js'
import { forbidden, unauthorized } from '../utils/response.js'

const ADMIN_ROLES = ['super_admin', 'admin']
const CLIENT_PERMISSIONS: Record<string, string[]> = {
  readonly_client: ['dashboard.view', 'verification.view', 'authorization.view', 'reports.view'],
  client_staff: [
    'dashboard.view', 'verification.view', 'verification.create', 'verification.edit',
    'verification.upload_documents', 'verification.export', 'authorization.view',
    'authorization.create', 'authorization.edit', 'authorization.upload_files',
    'reports.view', 'reports.export_csv', 'reports.export_pdf', 'reports.view_turnaround',
  ],
  client_admin: [
    'dashboard.view', 'dashboard.export_reports', 'verification.view', 'verification.create',
    'verification.edit', 'verification.upload_documents', 'verification.export',
    'authorization.view', 'authorization.create', 'authorization.edit',
    'authorization.upload_files', 'reports.view', 'reports.export_csv',
    'reports.export_pdf', 'reports.view_turnaround', 'clients.manage_users',
  ],
}

/**
 * Checks if a sub_admin user has the given permission.
 * Admins and super admins always pass — sub_admins must have the explicit grant.
 */
export function requirePermission(permissionKey: PermissionKey) {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) { unauthorized(res); return }

    // Admins always have all permissions
    if (ADMIN_ROLES.includes(req.user.role)) {
      next()
      return
    }

    // Sub-admins must have explicit permission grant
    if (req.user.role === 'sub_admin') {
      const { data } = await supabaseAdmin
        .from('sub_admin_profiles')
        .select('id, sub_admin_permissions(permission_key)')
        .eq('user_id', req.user.id)
        .single()

      const granted = (data?.sub_admin_permissions as Array<{ permission_key: string }> | undefined)
        ?.some((p) => p.permission_key === permissionKey)

      if (!granted) {
        forbidden(res, `Missing permission: ${permissionKey}`)
        return
      }
      next()
      return
    }

    // Other staff roles — evaluate based on role capabilities (future: configurable)
    const clientPermissions = CLIENT_PERMISSIONS[req.user.role]
    if (clientPermissions && !clientPermissions.includes(permissionKey)) {
      forbidden(res, `Missing permission: ${permissionKey}`)
      return
    }

    next()
  }
}
