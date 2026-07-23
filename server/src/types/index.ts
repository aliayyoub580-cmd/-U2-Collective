import type { Request } from 'express'

export type UserRole =
  | 'super_admin' | 'admin' | 'sub_admin' | 'manager'
  | 'verification_specialist' | 'authorization_specialist'
  | 'client_admin' | 'client_staff' | 'readonly_client'

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  organization_id?: string
  is_active: boolean
}

export interface AuthRequest extends Request {
  user?: AuthUser
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

export type PermissionKey = string

export interface PaginationQuery {
  page?: number
  pageSize?: number
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  search?: string
}
