import { IS_DEV } from '../config/env.js'

const SENSITIVE_KEYS = [
  'password', 'token', 'secret', 'member_id', 'patient_dob',
  'social_security', 'tax_id', 'authorization_key',
]

function sanitize(obj: unknown): unknown {
  if (!obj || typeof obj !== 'object') return obj
  const sanitized = { ...(obj as Record<string, unknown>) }
  for (const key of Object.keys(sanitized)) {
    if (SENSITIVE_KEYS.some((k) => key.toLowerCase().includes(k))) {
      sanitized[key] = '[REDACTED]'
    } else if (typeof sanitized[key] === 'object') {
      sanitized[key] = sanitize(sanitized[key])
    }
  }
  return sanitized
}

export const logger = {
  info: (message: string, meta?: unknown) => {
    console.log(`[INFO] ${new Date().toISOString()} ${message}`, meta ? sanitize(meta) : '')
  },
  warn: (message: string, meta?: unknown) => {
    console.warn(`[WARN] ${new Date().toISOString()} ${message}`, meta ? sanitize(meta) : '')
  },
  error: (message: string, err?: unknown) => {
    console.error(`[ERROR] ${new Date().toISOString()} ${message}`, IS_DEV ? err : '')
  },
  debug: (message: string, meta?: unknown) => {
    if (IS_DEV) {
      console.debug(`[DEBUG] ${new Date().toISOString()} ${message}`, meta ? sanitize(meta) : '')
    }
  },
}
