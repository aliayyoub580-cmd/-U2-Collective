import type { Response, NextFunction } from 'express'
import type { AuthRequest } from '../types/index.js'
import { supabaseAdmin } from '../config/supabase.js'
import { logger } from '../utils/logger.js'

interface AuditOptions {
  action: string
  module: string
  getRecordId?: (req: AuthRequest) => string | undefined
  getRecordType?: () => string
}

/**
 * Middleware factory to log audit events after a successful response.
 */
export function auditLog(options: AuditOptions) {
  return (_req: AuthRequest, _res: Response, next: NextFunction): void => {
    // Store original json method
    const originalJson = _res.json.bind(_res)
    _res.json = (body) => {
      // Log only successful mutations
      if (_res.statusCode < 300 && _req.user) {
        const recordId = options.getRecordId?.(_req)
        const recordType = options.getRecordType?.()
        supabaseAdmin
          .from('audit_logs')
          .insert({
            user_id: _req.user.id,
            action: options.action,
            module: options.module,
            record_id: recordId,
            record_type: recordType,
            new_value: body?.data ? { summary: 'see request' } : null,
            ip_address: _req.ip,
            user_agent: _req.headers['user-agent'],
          })
          .then(({ error }) => {
            if (error) logger.warn('Audit log insert failed', error.message)
          })
      }
      return originalJson(body)
    }
    next()
  }
}
