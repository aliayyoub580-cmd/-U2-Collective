import { Router } from 'express'
import { taskController } from '../controllers/task.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import {
  createTaskSchema,
  updateTaskSchema,
  taskCommentSchema,
  requestCommentSchema,
  listTasksSchema,
} from '../validators/task.validator.js'

const router = Router()
router.use(authenticate)

// ── Tasks ──────────────────────────────────────────────────────────────────────
router.get('/', validate(listTasksSchema, 'query'), taskController.list)
router.post('/', validate(createTaskSchema), taskController.create)
router.get('/:id', taskController.getById)
router.patch('/:id', validate(updateTaskSchema), taskController.update)
router.get('/:id/comments', taskController.listComments)
router.post('/:id/comments', validate(taskCommentSchema), taskController.addComment)

export default router
