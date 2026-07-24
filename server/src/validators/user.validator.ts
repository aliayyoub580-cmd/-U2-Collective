import { z } from 'zod'

export const createUserSchema = z.object({
  email:           z.string().email(),
  full_name:       z.string().min(2).max(128),
  role:            z.enum(['sub_admin','manager','verification_specialist','authorization_specialist','client_admin','client_staff','readonly_client']),
  organization_id: z.string().uuid().optional(),
  phone:           z.string().max(20).optional(),
  password:        z.string().min(8).max(128).optional(),
})

export const updateUserSchema = z.object({
  full_name:       z.string().min(2).max(128).optional(),
  role:            z.enum(['sub_admin','manager','verification_specialist','authorization_specialist','client_admin','client_staff','readonly_client']).optional(),
  organization_id: z.string().uuid().optional(),
  phone:           z.string().max(20).optional(),
  is_active:       z.boolean().optional(),
})

export const updateProfileSchema = z.object({
  full_name:  z.string().min(2).max(128).optional(),
  phone:      z.string().max(20).optional(),
  avatar_url: z.string().url().optional(),
})

export const createSubAdminSchema = z.object({
  email:          z.string().email(),
  full_name:      z.string().min(2).max(128),
  password:       z.string().min(8).max(128),
  phone:          z.string().max(20).optional(),
  template_id:    z.string().uuid().optional(),
  permissions:    z.array(z.string()).optional(),
})

export const updateSubAdminPermissionsSchema = z.object({
  permissions: z.array(z.string()).min(0),
})

export const updateUserPasswordSchema = z.object({
  password: z.string().min(8).max(128),
})

export type CreateUserInput               = z.infer<typeof createUserSchema>
export type UpdateUserInput               = z.infer<typeof updateUserSchema>
export type UpdateProfileInput            = z.infer<typeof updateProfileSchema>
export type CreateSubAdminInput           = z.infer<typeof createSubAdminSchema>
export type UpdateSubAdminPermissionsInput = z.infer<typeof updateSubAdminPermissionsSchema>
export type UpdateUserPasswordInput         = z.infer<typeof updateUserPasswordSchema>
