import { z } from 'zod'

export const createAuthorizationSchema = z.object({
  patient_ref:            z.string().min(2).max(50),
  verification_id:        z.string().uuid().optional(),
  payer_id:               z.string().uuid().optional(),
  payer_name:             z.string().max(200).optional(),
  procedure_description:  z.string().min(3).max(500),
  cpt_codes:              z.array(z.string().max(10)).default([]),
  hcpcs_codes:            z.array(z.string().max(10)).default([]),
  diagnosis_codes:        z.array(z.string().max(10)).default([]),
  service_start_date:     z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  service_end_date:       z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  units_requested:        z.number().min(1).optional(),
  facility:               z.string().max(200).optional(),
  rendering_provider:     z.string().max(200).optional(),
  priority:               z.enum(['low','normal','high','urgent']).default('normal'),
  follow_up_date:         z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  internal_notes:         z.string().max(2000).optional(),
})

export const updateAuthorizationSchema = createAuthorizationSchema.partial().extend({
  status: z.enum([
    'draft','submitted','documents_required','assigned','under_review',
    'submitted_to_payer','pending_payer_response',
    'additional_clinical_info_required','peer_to_peer_required',
    'approved','partially_approved','denied',
    'appeal_in_progress','appeal_approved','appeal_denied',
    'expired','cancelled',
  ]).optional(),
  assigned_to:       z.string().uuid().optional(),
  approval_number:   z.string().max(100).optional(),
  approval_valid_from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  approval_valid_to:   z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  units_approved:    z.number().min(0).optional(),
})

export const addFollowupSchema = z.object({
  contacted_via:    z.enum(['phone','portal','fax','email']).optional(),
  contact_name:     z.string().max(200).optional(),
  reference_number: z.string().max(100).optional(),
  notes:            z.string().min(2).max(5000),
  follow_up_date:   z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
})

export const createAppealSchema = z.object({
  appeal_type:   z.enum(['internal','external','p2p']),
  submitted_at:  z.string().datetime().optional(),
  due_date:      z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  notes:         z.string().max(5000).optional(),
})

export const listAuthorizationSchema = z.object({
  page:      z.coerce.number().min(1).default(1),
  pageSize:  z.coerce.number().min(1).max(100).default(20),
  status:    z.string().optional(),
  priority:  z.string().optional(),
  assigned_to: z.string().uuid().optional(),
  search:    z.string().max(200).optional(),
  sortBy:    z.string().optional(),
  sortDir:   z.enum(['asc','desc']).default('desc'),
})

export type CreateAuthorizationInput = z.infer<typeof createAuthorizationSchema>
export type UpdateAuthorizationInput = z.infer<typeof updateAuthorizationSchema>
export type AddFollowupInput         = z.infer<typeof addFollowupSchema>
export type CreateAppealInput        = z.infer<typeof createAppealSchema>
