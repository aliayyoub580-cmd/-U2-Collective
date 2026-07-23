import type { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'
import { badRequest } from '../utils/response.js'

type Target = 'body' | 'query' | 'params'

export function validate(schema: ZodSchema, target: Target = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target])
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors as Record<string, string[]>
      badRequest(res, 'Validation failed', errors)
      return
    }
    req[target] = result.data
    next()
  }
}

export function zodError(err: ZodError): Record<string, string[]> {
  return err.flatten().fieldErrors as Record<string, string[]>
}
