import { Router } from 'express'
import { clientController } from '../controllers/client.controller.js'
import { authenticate } from '../middleware/auth.js'
import { requirePermission } from '../middleware/permissions.js'
import { validate } from '../middleware/validate.js'
import { z } from 'zod'

const router = Router()
const createClientSchema = z.object({
  name: z.string().min(2).max(160),
  specialty: z.string().max(160).optional(),
  ehr_system: z.string().max(160).optional(),
  phone: z.string().max(30).optional(),
  email: z.string().email().optional().or(z.literal('')),
})

router.use(authenticate)
router.get('/', requirePermission('clients.view'), clientController.list)
router.post('/', validate(createClientSchema), requirePermission('clients.manage'), clientController.create)

export default router
