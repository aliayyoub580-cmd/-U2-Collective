import { z } from 'zod'

export const createVerificationSchema = z.object({
  patient_ref:   z.string().min(2).max(50),
  payer_id:      z.string().uuid().optional(),
  payer_name:    z.string().max(200).optional(),
  plan_name:     z.string().max(200).optional(),
  member_id:     z.string().max(100).optional(),
  service_date:  z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  provider_npi:  z.string().max(20).optional(),
  specialty:     z.string().max(100).optional(),
  priority:      z.enum(['low','normal','high','urgent']).default('normal'),
  due_at:        z.string().datetime().optional(),
  internal_notes:z.string().max(2000).optional(),
})

export const updateVerificationSchema = createVerificationSchema.partial().extend({
  status: z.enum([
    'draft','submitted','assigned','in_review','payer_contacted',
    'verified','unable_to_verify','additional_info_required','completed','cancelled',
  ]).optional(),
  assigned_to: z.string().uuid().optional(),
})

export const verificationResultSchema = z.object({
  coverage_status:   z.string().max(100).optional(),
  plan_type:         z.string().max(100).optional(),
  network_status:    z.string().max(100).optional(),
  copay_amount:      z.number().min(0).optional(),
  coinsurance_pct:   z.number().min(0).max(100).optional(),
  deductible_total:  z.number().min(0).optional(),
  deductible_met:    z.number().min(0).optional(),
  oop_max:           z.number().min(0).optional(),
  oop_met:           z.number().min(0).optional(),
  referral_required: z.boolean().optional(),
  auth_required:     z.boolean().optional(),
  effective_date:    z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  termination_date:  z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  plan_limitations:  z.string().max(2000).optional(),
  secondary_coverage:z.string().max(500).optional(),
  raw_notes:         z.string().max(5000).optional(),
})

export const listVerificationSchema = z.object({
  page:       z.coerce.number().min(1).default(1),
  pageSize:   z.coerce.number().min(1).max(100).default(20),
  status:     z.string().optional(),
  priority:   z.string().optional(),
  assigned_to:z.string().uuid().optional(),
  search:     z.string().max(200).optional(),
  sortBy:     z.string().optional(),
  sortDir:    z.enum(['asc','desc']).default('desc'),
})

export type CreateVerificationInput = z.infer<typeof createVerificationSchema>
export type UpdateVerificationInput = z.infer<typeof updateVerificationSchema>
export type VerificationResultInput = z.infer<typeof verificationResultSchema>
