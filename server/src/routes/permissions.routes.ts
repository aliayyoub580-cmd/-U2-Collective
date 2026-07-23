import { Router } from 'express'
import type { Response } from 'express'
import type { AuthRequest } from '../types/index.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'
import { supabaseAdmin } from '../config/supabase.js'
import { ok, serverError } from '../utils/response.js'

const router = Router()
router.use(authenticate)

// GET  /api/permissions              → all permission keys (auth users)
// GET  /api/permissions/template/:id → keys for a template
router.get('/', async (_req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('permissions')
      .select('key, label, category, description')
      .order('category')
      .order('key')

    if (error) throw new Error(error.message)
    ok(res, data ?? [])
  } catch (err) {
    serverError(res, err instanceof Error ? err.message : 'Failed to fetch permissions')
  }
})

router.get('/template/:id', requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('permission_template_items')
      .select('permission_key')
      .eq('template_id', req.params.id)

    if (error) throw new Error(error.message)
    ok(res, (data ?? []).map((i: { permission_key: string }) => i.permission_key))
  } catch (err) {
    serverError(res, err instanceof Error ? err.message : 'Failed to fetch template')
  }
})

// GET  /api/permissions/templates → list all templates
router.get('/templates', async (_req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('permission_templates')
      .select('id, name, description, is_system')
      .order('name')

    if (error) throw new Error(error.message)
    ok(res, data ?? [])
  } catch (err) {
    serverError(res, err instanceof Error ? err.message : 'Failed to fetch templates')
  }
})

export default router
