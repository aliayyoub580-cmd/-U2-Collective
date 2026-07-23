import { z } from 'zod'

export const loginSchema = z.object({
  email:    z.string().email('Valid email required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = z.object({
  email:          z.string().email(),
  password:       z.string().min(8).max(128),
  full_name:      z.string().min(2).max(128),
  organization_id:z.string().uuid().optional(),
  role:           z.enum(['client_admin','client_staff','readonly_client']).optional(),
})

export const resetPasswordSchema = z.object({
  email: z.string().email('Valid email required'),
})

export const updatePasswordSchema = z.object({
  password: z.string().min(8).max(128),
})

export type LoginInput           = z.infer<typeof loginSchema>
export type RegisterInput        = z.infer<typeof registerSchema>
export type ResetPasswordInput   = z.infer<typeof resetPasswordSchema>
export type UpdatePasswordInput  = z.infer<typeof updatePasswordSchema>
