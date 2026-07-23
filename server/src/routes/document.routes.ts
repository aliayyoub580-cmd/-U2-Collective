import { Router } from 'express'
import type { Response } from 'express'
import type { AuthRequest } from '../types/index.js'
import { authenticate } from '../middleware/auth.js'
import { documentService } from '../services/document.service.js'
import { ok, serverError, badRequest } from '../utils/response.js'

const router = Router()
router.use(authenticate)

// Get signed download URL for a document
router.get('/:id/download', async (req: AuthRequest, res: Response) => {
  try {
    const data = await documentService.getSignedUrl(req.params.id, req.user!)
    ok(res, data)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to generate download link'
    if (msg === 'Access denied') { res.status(403).json({ success: false, message: msg }); return }
    serverError(res, msg)
  }
})

// Soft-delete a document (admin only)
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  if (!['super_admin','admin'].includes(req.user!.role)) {
    res.status(403).json({ success: false, message: 'Admin access required' })
    return
  }
  try {
    await documentService.softDelete(req.params.id, req.user!)
    ok(res, null, 'Document removed')
  } catch (err) {
    serverError(res, err instanceof Error ? err.message : 'Delete failed')
  }
})

export default router
