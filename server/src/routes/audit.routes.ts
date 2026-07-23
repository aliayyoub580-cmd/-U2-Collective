import { Router } from 'express'
import type { Response } from 'express'
import type { AuthRequest } from '../types/index.js'
import { authenticate, requireStaff } from '../middleware/auth.js'
import { requirePermission } from '../middleware/permissions.js'
import { supabaseAdmin } from '../config/supabase.js'
import { paginationParams } from '../utils/pagination.js'
import { ok, serverError } from '../utils/response.js'

const router = Router()
router.use(authenticate, requireStaff)

router.get('/', requirePermission('system.view_audit_logs'), async (req: AuthRequest, res: Response) => {
  try {
    const { page, pageSize, from, to } = paginationParams(req.query.page as string, req.query.pageSize as string)
    const { data, count, error } = await supabaseAdmin.from('audit_logs').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(from, to)
    if (error) throw error
    const total = count ?? 0
    ok(res, { data: data ?? [], meta: { page, pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) } })
  } catch (error) { serverError(res, error instanceof Error ? error.message : 'Failed to load audit logs') }
})

export default router
