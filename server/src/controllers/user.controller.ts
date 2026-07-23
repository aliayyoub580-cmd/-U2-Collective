import type { Response } from 'express'
import type { AuthRequest } from '../types/index.js'
import { userService } from '../services/user.service.js'
import { ok, created, badRequest, noContent, serverError } from '../utils/response.js'

export const userController = {

  async listUsers(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await userService.listUsers(req.query as Record<string, unknown>)
      ok(res, result)
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Failed to list users')
    }
  },

  async createUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await userService.createUser(req.body, req.user!)
      created(res, data, 'User created successfully')
    } catch (err) {
      badRequest(res, err instanceof Error ? err.message : 'Create failed')
    }
  },

  async updateUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await userService.updateUser(req.params.id, req.body, req.user!)
      ok(res, data, 'User updated')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Update failed'
      if (msg.includes('demote') || msg.includes('last')) badRequest(res, msg)
      else serverError(res, msg)
    }
  },

  async deactivateUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      await userService.deactivateUser(req.params.id, req.user!)
      noContent(res)
    } catch (err) {
      badRequest(res, err instanceof Error ? err.message : 'Deactivate failed')
    }
  },

  // Sub-admins

  async listSubAdmins(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await userService.listSubAdmins(req.query as Record<string, unknown>)
      ok(res, result)
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Failed to list sub-admins')
    }
  },

  async createSubAdmin(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await userService.createSubAdmin(req.body, req.user!)
      created(res, data, 'Sub-admin created')
    } catch (err) {
      badRequest(res, err instanceof Error ? err.message : 'Create sub-admin failed')
    }
  },

  async updateSubAdminPermissions(req: AuthRequest, res: Response): Promise<void> {
    try {
      await userService.updateSubAdminPermissions(req.params.id, req.body, req.user!)
      ok(res, null, 'Permissions updated')
    } catch (err) {
      badRequest(res, err instanceof Error ? err.message : 'Permission update failed')
    }
  },
}
