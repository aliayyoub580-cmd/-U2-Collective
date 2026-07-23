import { Router } from 'express'
import { authController } from '../controllers/auth.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from '../validators/auth.validator.js'

const router = Router()

// Public routes
router.post('/login',          validate(loginSchema),          authController.login)
router.post('/register',       validate(registerSchema),       authController.register)
router.post('/reset-password', validate(resetPasswordSchema),  authController.resetPassword)
router.post('/refresh',        authController.refreshToken)

// Protected routes
router.post('/logout', authenticate, authController.logout)
router.get('/me',      authenticate, authController.me)

export default router
