import multer, { FileFilterCallback } from 'multer'
import type { Request } from 'express'
import { badRequest } from '../utils/response.js'
import type { Response, NextFunction } from 'express'

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/tiff',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const MAX_SIZE_BYTES = 25 * 1024 * 1024 // 25 MB

const storage = multer.memoryStorage()

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error(`File type not allowed: ${file.mimetype}`))
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE_BYTES },
})

/** Error handler middleware for multer upload errors */
export function handleUploadError(err: Error, _req: Request, res: Response, next: NextFunction): void {
  if (err?.message?.includes('File type not allowed')) {
    badRequest(res, err.message)
    return
  }
  if (err?.message?.includes('File too large')) {
    badRequest(res, 'File exceeds maximum allowed size of 25 MB')
    return
  }
  next(err)
}
