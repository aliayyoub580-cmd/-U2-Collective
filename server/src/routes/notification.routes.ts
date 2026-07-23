import { Router } from 'express'
import type { Response } from 'express'
import type { AuthRequest } from '../types/index.js'
import { authenticate } from '../middleware/auth.js'
import { notificationService } from '../services/notification.service.js'
import { ok, serverError } from '../utils/response.js'

const router = Router()
router.use(authenticate)

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { page, pageSize } = req.query
    const data = await notificationService.listForUser(req.user!.id, Number(page ?? 1), Number(pageSize ?? 30))
    ok(res, data)
  } catch (err) {
    serverError(res, err instanceof Error ? err.message : 'Failed to fetch notifications')
  }
})

router.patch('/:id/read', async (req: AuthRequest, res: Response) => {
  try {
    await notificationService.markRead(req.params.id, req.user!.id)
    ok(res, null, 'Marked as read')
  } catch (err) {
    serverError(res, err instanceof Error ? err.message : 'Failed')
  }
})

router.post('/read-all', async (req: AuthRequest, res: Response) => {
  try {
    await notificationService.markAllRead(req.user!.id)
    ok(res, null, 'All notifications marked as read')
  } catch (err) {
    serverError(res, err instanceof Error ? err.message : 'Failed')
  }
})

export default router
