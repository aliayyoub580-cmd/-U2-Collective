import { Router } from 'express'
import { taskController } from '../controllers/task.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { requestCommentSchema } from '../validators/task.validator.js'

const router = Router()
router.use(authenticate)

// GET  /api/comments/:type/:id   → list comments for a request
// POST /api/comments/:type/:id   → add comment to a request
// type = 'verification' | 'authorization'
router.get('/:type/:id', taskController.listRequestComments)
router.post('/:type/:id', validate(requestCommentSchema), taskController.addRequestComment)

export default router
