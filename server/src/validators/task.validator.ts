import { z } from 'zod'

export const createTaskSchema = z.object({
  title:        z.string().min(2).max(200),
  description:  z.string().max(2000).optional(),
  priority:     z.enum(['low','normal','high','urgent']).default('normal'),
  assigned_to:  z.string().uuid().optional(),
  due_date:     z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  related_type: z.enum(['verification','authorization']).optional(),
  related_id:   z.string().uuid().optional(),
})

export const updateTaskSchema = createTaskSchema.partial().extend({
  status: z.enum(['open','in_progress','completed','cancelled']).optional(),
})

export const taskCommentSchema = z.object({
  body: z.string().min(1).max(5000),
})

export const requestCommentSchema = z.object({
  body:        z.string().min(1).max(5000),
  is_internal: z.boolean().default(false),
})

export const listTasksSchema = z.object({
  page:        z.coerce.number().min(1).default(1),
  pageSize:    z.coerce.number().min(1).max(100).default(20),
  status:      z.string().optional(),
  priority:    z.string().optional(),
  assigned_to: z.string().uuid().optional(),
  related_type:z.string().optional(),
  related_id:  z.string().uuid().optional(),
  sortBy:      z.string().optional(),
  sortDir:     z.enum(['asc','desc']).default('asc'),
})

export type CreateTaskInput   = z.infer<typeof createTaskSchema>
export type UpdateTaskInput   = z.infer<typeof updateTaskSchema>
export type TaskCommentInput  = z.infer<typeof taskCommentSchema>
export type RequestCommentInput = z.infer<typeof requestCommentSchema>
