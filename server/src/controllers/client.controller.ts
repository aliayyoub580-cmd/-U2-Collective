import type { Response } from 'express'
import type { AuthRequest } from '../types/index.js'
import { clientService } from '../services/client.service.js'
import { badRequest, created, ok, serverError } from '../utils/response.js'

export const clientController = {
  async list(req: AuthRequest, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.slice('Bearer '.length) ?? ''
      const result = await clientService.list(req.query as Record<string, unknown>, token)
      ok(res, result)
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Failed to list clients')
    }
  },

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.slice('Bearer '.length) ?? ''
      const result = await clientService.create(req.body, token, req.user!.id)
      created(res, result, 'Client created successfully')
    } catch (err) {
      badRequest(res, err instanceof Error ? err.message : 'Failed to create client')
    }
  },
}
