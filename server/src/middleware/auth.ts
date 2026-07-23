import type { Response, NextFunction } from 'express'
import type { AuthRequest, UserRole } from '../types/index.js'
import { supabase } from '../config/supabase.js'
import { supabaseAdmin } from '../config/supabase.js'
import { unauthorized, forbidden } from '../utils/response.js'
import { logger } from '../utils/logger.js'

const STAFF_ROLES: UserRole[] = [
  'super_admin', 'admin', 'sub_admin', 'manager',
  'verification_specialist', 'authorization_specialist',
]
const ADMIN_ROLES: UserRole[] = ['super_admin', 'admin']

/**
 * Validates the Bearer JWT from the Authorization header.
 * Attaches the verified user profile to req.user.
 */
export async function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    unauthorized(res, 'Missing authorization token')
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    // Validate token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      unauthorized(res, 'Invalid or expired token')
      return
    }

    // Fetch profile from database
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('id, email, role, organization_id, is_active')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      unauthorized(res, 'User profile not found')
      return
    }

    if (!profile.is_active) {
      unauthorized(res, 'Account is deactivated')
      return
    }

    req.user = {
      id: profile.id,
      email: profile.email,
      role: profile.role as UserRole,
      organization_id: profile.organization_id ?? undefined,
      is_active: profile.is_active,
    }

    // Update last_login (fire-and-forget)
    supabaseAdmin
      .from('profiles')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id)
      .then(() => {})

    next()
  } catch (err) {
    logger.error('Auth middleware error', err)
    unauthorized(res, 'Authentication failed')
  }
}

/** Require any of the given roles */
export function requireRole(...roles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) { unauthorized(res); return }
    if (!roles.includes(req.user.role)) {
      forbidden(res, `Requires role: ${roles.join(' | ')}`)
      return
    }
    next()
  }
}

/** Require staff-level access */
export function requireStaff(req: AuthRequest, res: Response, next: NextFunction): void {
  if (!req.user) { unauthorized(res); return }
  if (!STAFF_ROLES.includes(req.user.role)) {
    forbidden(res, 'Staff access required')
    return
  }
  next()
}

/** Require admin-level access */
export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  if (!req.user) { unauthorized(res); return }
  if (!ADMIN_ROLES.includes(req.user.role)) {
    forbidden(res, 'Admin access required')
    return
  }
  next()
}

/** Require super admin */
export function requireSuperAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  if (!req.user) { unauthorized(res); return }
  if (req.user.role !== 'super_admin') {
    forbidden(res, 'Super admin access required')
    return
  }
  next()
}
