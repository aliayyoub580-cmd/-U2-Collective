import type { Response } from 'express'
import type { AuthRequest } from '../types/index.js'
import { authService } from '../services/auth.service.js'
import { ok, created, badRequest, serverError, unauthorized } from '../utils/response.js'
import { logger } from '../utils/logger.js'

export const authController = {

  async login(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await authService.login(req.body)
      ok(res, result, 'Login successful')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed'
      unauthorized(res, msg)
    }
  },

  async register(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await authService.register(req.body)
      created(res, result, 'Account created successfully')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Registration failed'
      badRequest(res, msg)
    }
  },

  async resetPassword(req: AuthRequest, res: Response): Promise<void> {
    try {
      await authService.resetPassword(req.body.email)
      ok(res, null, 'Password reset email sent if account exists')
    } catch (err) {
      logger.error('Reset password error', err)
      ok(res, null, 'Password reset email sent if account exists') // don't reveal if email exists
    }
  },

  async refreshToken(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await authService.refreshToken(req.body.refresh_token)
      ok(res, result)
    } catch {
      unauthorized(res, 'Invalid refresh token')
    }
  },

  async logout(req: AuthRequest, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1] ?? ''
      await authService.logout(token)
      ok(res, null, 'Logged out successfully')
    } catch (err) {
      logger.error('Logout error', err)
      ok(res, null, 'Logged out')
    }
  },

  async me(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) { unauthorized(res); return }
      const token = req.headers.authorization?.slice('Bearer '.length) ?? ''
      const profile = await authService.getProfile(req.user.id, token)
      ok(res, profile)
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Failed to fetch profile')
    }
  },
}
