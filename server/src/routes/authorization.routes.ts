import { Router } from 'express'
import { authorizationController } from '../controllers/authorization.controller.js'
import { authenticate } from '../middleware/auth.js'
import { requirePermission } from '../middleware/permissions.js'
import { validate } from '../middleware/validate.js'
import { upload, handleUploadError } from '../middleware/upload.js'
import {
  createAuthorizationSchema,
  updateAuthorizationSchema,
  addFollowupSchema,
  createAppealSchema,
  listAuthorizationSchema,
} from '../validators/authorization.validator.js'

const router = Router()

router.use(authenticate)

router.get('/', validate(listAuthorizationSchema, 'query'), requirePermission('authorization.view'), authorizationController.list)
router.post('/', validate(createAuthorizationSchema), requirePermission('authorization.create'), authorizationController.create)
router.get('/:id', requirePermission('authorization.view'), authorizationController.getById)
router.patch('/:id', validate(updateAuthorizationSchema), requirePermission('authorization.edit'), authorizationController.update)
router.post('/:id/followups', validate(addFollowupSchema), requirePermission('authorization.add_followup'), authorizationController.addFollowup)
router.post('/:id/appeals', validate(createAppealSchema), requirePermission('authorization.create_appeal'), authorizationController.createAppeal)
router.post('/:id/documents', requirePermission('authorization.upload_files'), upload.single('file'), handleUploadError, authorizationController.uploadDocument)
router.get('/:id/documents', requirePermission('authorization.view'), authorizationController.listDocuments)

export default router
