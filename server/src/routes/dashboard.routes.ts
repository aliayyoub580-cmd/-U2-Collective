import { Router } from 'express'
import type { Response } from 'express'
import type { AuthRequest } from '../types/index.js'
import { authenticate, requireStaff } from '../middleware/auth.js'
import { supabaseAdmin } from '../config/supabase.js'
import { ok, serverError } from '../utils/response.js'

const router = Router()
router.use(authenticate)

router.get('/stats', async (req: AuthRequest, res: Response) => {
  try {
    const orgId = req.user!.organization_id
    const isStaff = ['super_admin','admin','sub_admin','manager','verification_specialist','authorization_specialist']
      .includes(req.user!.role)

    const buildQuery = (table: string) => {
      let q = supabaseAdmin.from(table).select('*', { count: 'exact', head: true })
      if (!isStaff && orgId) q = q.eq('organization_id', orgId)
      return q
    }

    const countByStatus = async (table: string, statuses: string[]) => {
      let q = supabaseAdmin.from(table).select('*', { count: 'exact', head: true }).in('status', statuses)
      if (!isStaff && orgId) q = q.eq('organization_id', orgId)
      const result = await q
      return result.count ?? 0
    }

    const [verTotal, verPending, authTotal, authApproved, authDenied, authAddInfo] = await Promise.all([
      buildQuery('verification_requests'),
      countByStatus('verification_requests', ['submitted','assigned','in_review','payer_contacted']),
      buildQuery('authorization_requests'),
      countByStatus('authorization_requests', ['approved']),
      countByStatus('authorization_requests', ['denied']),
      countByStatus('authorization_requests', ['additional_clinical_info_required']),
    ])

    ok(res, {
      verification: {
        total:   verTotal.count ?? 0,
        pending: verPending,
      },
      authorization: {
        total:                authTotal.count ?? 0,
        approved:             authApproved,
        denied:               authDenied,
        additional_info:      authAddInfo,
      },
    })
  } catch (err) {
    serverError(res, err instanceof Error ? err.message : 'Failed to load dashboard stats')
  }
})

// Platform-wide metrics (placeholder values)
router.get('/metrics', async (_req: AuthRequest, res: Response) => {
  try {
    const { data } = await supabaseAdmin
      .from('dashboard_metrics')
      .select('metric_key, metric_value, label, is_placeholder')
      .is('organization_id', null)
    ok(res, data ?? [])
  } catch (err) {
    serverError(res, err instanceof Error ? err.message : 'Failed to load metrics')
  }
})

export default router
