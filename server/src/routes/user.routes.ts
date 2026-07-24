import { Router } from 'express'
import { userController } from '../controllers/user.controller.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'
import { requirePermission } from '../middleware/permissions.js'
import { validate } from '../middleware/validate.js'
import {
  createUserSchema,
  updateUserSchema,
  createSubAdminSchema,
  updateSubAdminPermissionsSchema,
  updateUserPasswordSchema,
} from '../validators/user.validator.js'

const router = Router()
router.use(authenticate)

// Users
router.get('/',     requirePermission('users.view'),       userController.listUsers)
router.post('/',    validate(createUserSchema), requirePermission('users.create'), userController.createUser)
router.put('/:id/password', validate(updateUserPasswordSchema), requireAdmin, userController.updatePassword)
router.patch('/:id', validate(updateUserSchema), requirePermission('users.edit'),  userController.updateUser)
router.delete('/:id', requirePermission('users.deactivate'), userController.deactivateUser)

// Sub-admins
router.get('/sub-admins',     requirePermission('subadmins.view'),   userController.listSubAdmins)
router.get('/sub-admins/:id/permissions', requirePermission('subadmins.view'), userController.getSubAdminPermissions)
router.post('/sub-admins',    validate(createSubAdminSchema), requireAdmin, userController.createSubAdmin)
router.put('/sub-admins/:id/permissions',
  validate(updateSubAdminPermissionsSchema),
  requirePermission('subadmins.edit_permissions'),
  userController.updateSubAdminPermissions,
)

export default router
