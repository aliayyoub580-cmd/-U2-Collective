import { Router } from 'express'
import type { Response } from 'express'
import type { AuthRequest } from '../types/index.js'
import { authenticate, requireStaff } from '../middleware/auth.js'
import { requirePermission } from '../middleware/permissions.js'
import { supabaseAdmin } from '../config/supabase.js'
import { ok, serverError } from '../utils/response.js'

const router = Router()
router.use(authenticate, requireStaff)

router.get('/summary', requirePermission('content.manage_pages'), async (_req: AuthRequest, res: Response) => {
  try {
    const tables = ['website_pages', 'faqs', 'testimonials', 'blog_posts'] as const
    const results = await Promise.all(tables.map((table) => supabaseAdmin.from(table).select('*', { count: 'exact', head: true })))
    ok(res, Object.fromEntries(tables.map((table, index) => [table === 'website_pages' ? 'pages' : table.replace('_', '-'), results[index].count ?? 0])))
  } catch (error) { serverError(res, error instanceof Error ? error.message : 'Failed to load content summary') }
})

export default router
