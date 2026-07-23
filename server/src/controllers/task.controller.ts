import type { Response } from 'express'
import type { AuthRequest } from '../types/index.js'
import { taskService } from '../services/task.service.js'
import { ok, created, notFound, badRequest, serverError } from '../utils/response.js'

export const taskController = {

  async list(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await taskService.list(req.user!, req.query as Record<string, unknown>)
      ok(res, result)
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Failed to list tasks')
    }
  },

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await taskService.getById(req.params.id, req.user!)
      ok(res, data)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Not found'
      msg.includes('not found') ? notFound(res, msg) : serverError(res, msg)
    }
  },

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await taskService.create(req.body, req.user!)
      created(res, data, 'Task created')
    } catch (err) {
      badRequest(res, err instanceof Error ? err.message : 'Create failed')
    }
  },

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await taskService.update(req.params.id, req.body, req.user!)
      ok(res, data, 'Task updated')
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Update failed')
    }
  },

  async addComment(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await taskService.addComment(req.params.id, req.body, req.user!)
      created(res, data, 'Comment added')
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Failed to add comment')
    }
  },

  async listComments(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await taskService.listComments(req.params.id)
      ok(res, data)
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Failed to list comments')
    }
  },

  // Request comments (for verification / authorization)
  async addRequestComment(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { type, id } = req.params
      const data = await taskService.addRequestComment(type, id, req.body, req.user!)
      created(res, data, 'Comment added')
    } catch (err) {
      badRequest(res, err instanceof Error ? err.message : 'Failed to add comment')
    }
  },

  async listRequestComments(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { type, id } = req.params
      const data = await taskService.listRequestComments(type, id, req.user!)
      ok(res, data)
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Failed to list comments')
    }
  },
}
