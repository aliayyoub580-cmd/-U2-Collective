import type { Response } from 'express'
import type { AuthRequest } from '../types/index.js'
import { verificationService } from '../services/verification.service.js'
import { documentService } from '../services/document.service.js'
import { ok, created, badRequest, notFound, serverError } from '../utils/response.js'

export const verificationController = {

  async list(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await verificationService.list(req.user!, req.query as Record<string, unknown>)
      ok(res, result)
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Failed to list verifications')
    }
  },

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await verificationService.getById(req.params.id, req.user!)
      ok(res, data)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Not found'
      if (msg.includes('not found')) notFound(res, msg)
      else serverError(res, msg)
    }
  },

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await verificationService.create(req.body, req.user!)
      created(res, data, 'Verification request created')
    } catch (err) {
      badRequest(res, err instanceof Error ? err.message : 'Create failed')
    }
  },

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await verificationService.update(req.params.id, req.body, req.user!)
      ok(res, data, 'Updated successfully')
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Update failed')
    }
  },

  async saveResult(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await verificationService.saveResult(req.params.id, req.body, req.user!)
      ok(res, data, 'Verification result saved')
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Save result failed')
    }
  },

  async uploadDocument(req: AuthRequest, res: Response): Promise<void> {
    if (!req.file) { badRequest(res, 'No file provided'); return }
    try {
      const data = await documentService.upload(req.file, 'verification', req.params.id, req.user!, req.body.description)
      created(res, data, 'Document uploaded')
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Upload failed')
    }
  },

  async listDocuments(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await documentService.listForRecord('verification', req.params.id, req.user!)
      ok(res, data)
    } catch (err) {
      serverError(res, err instanceof Error ? err.message : 'Failed to list documents')
    }
  },
}
