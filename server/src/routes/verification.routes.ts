import { Router } from 'express'
import { verificationController } from '../controllers/verification.controller.js'
import { authenticate, requireStaff } from '../middleware/auth.js'
import { requirePermission } from '../middleware/permissions.js'
import { validate } from '../middleware/validate.js'
import { upload, handleUploadError } from '../middleware/upload.js'
import {
  createVerificationSchema,
  updateVerificationSchema,
  verificationResultSchema,
  listVerificationSchema,
} from '../validators/verification.validator.js'

const router = Router()

// All routes require authentication
router.use(authenticate)

router.get(
  '/',
  validate(listVerificationSchema, 'query'),
  requirePermission('verification.view'),
  verificationController.list,
)

router.post(
  '/',
  validate(createVerificationSchema),
  requirePermission('verification.create'),
  verificationController.create,
)

router.get('/:id', requirePermission('verification.view'), verificationController.getById)

router.patch(
  '/:id',
  validate(updateVerificationSchema),
  requirePermission('verification.edit'),
  verificationController.update,
)

router.put(
  '/:id/result',
  validate(verificationResultSchema),
  requireStaff,
  requirePermission('verification.update_status'),
  verificationController.saveResult,
)

router.post(
  '/:id/documents',
  requirePermission('verification.upload_documents'),
  upload.single('file'),
  handleUploadError,
  verificationController.uploadDocument,
)

router.get(
  '/:id/documents',
  requirePermission('verification.view'),
  verificationController.listDocuments,
)

export default router
