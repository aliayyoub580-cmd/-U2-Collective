import type { Response } from 'express'
import type { AuthRequest } from '../types/index.js'
import { authorizationService } from '../services/authorization.service.js'
import { documentService } from '../services/document.service.js'
import { notificationService } from '../services/notification.service.js'
import { ok, created, badRequest, notFound, serverError } from '../utils/response.js'

export const authorizationController = {

  async list(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await authorizationService.list(req.user!, req.query as Record<string, unknown>)
      ok(res, result)
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Failed to list authorizations')
    }
  },

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await authorizationService.getById(req.params.id, req.user!)
      ok(res, data)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Not found'
      if (msg.includes('not found')) notFound(res, msg)
      else serverError(res, msg)
    }
  },

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await authorizationService.create(req.body, req.user!)
      created(res, data, 'Authorization request created')
    } catch (err) {
      badRequest(res, err instanceof Error ? err.message : 'Create failed')
    }
  },

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await authorizationService.update(req.params.id, req.body, req.user!)

      // Send notifications on key status changes
      if (req.body.status === 'approved' && data.created_by) {
        await notificationService.notifyApproval(
          data.created_by, data.id, data.patient_ref, data.approval_number,
        )
      }
      if (req.body.status === 'denied' && data.created_by) {
        await notificationService.notifyDenial(data.created_by, data.id, data.patient_ref)
      }

      ok(res, data, 'Updated successfully')
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Update failed')
    }
  },

  async addFollowup(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await authorizationService.addFollowup(req.params.id, req.body, req.user!)
      created(res, data, 'Follow-up note added')
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Failed to add follow-up')
    }
  },

  async createAppeal(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await authorizationService.createAppeal(req.params.id, req.body, req.user!)
      created(res, data, 'Appeal created')
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Failed to create appeal')
    }
  },

  async uploadDocument(req: AuthRequest, res: Response): Promise<void> {
    if (!req.file) { badRequest(res, 'No file provided'); return }
    try {
      const data = await documentService.upload(req.file, 'authorization', req.params.id, req.user!, req.body.description)
      created(res, data, 'Document uploaded')
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Upload failed')
    }
  },

  async listDocuments(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await documentService.listForRecord('authorization', req.params.id, req.user!)
      ok(res, data)
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Failed to list documents')
    }
  },
}
