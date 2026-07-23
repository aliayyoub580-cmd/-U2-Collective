// ─── Common ───────────────────────────────────────────────────────────────────

export type ID = string

export interface PaginationMeta {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  code?: string
  field?: string
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'sub_admin'
  | 'manager'
  | 'verification_specialist'
  | 'authorization_specialist'
  | 'client_admin'
  | 'client_staff'
  | 'readonly_client'

export interface User {
  id: ID
  email: string
  full_name: string
  role: UserRole
  organization_id?: ID
  avatar_url?: string
  phone?: string
  is_active: boolean
  created_at: string
  last_login?: string
}

// ─── Organization ─────────────────────────────────────────────────────────────

export interface Organization {
  id: ID
  name: string
  specialty?: string
  ehr_system?: string
  pms_system?: string
  phone?: string
  email?: string
  address_line1?: string
  city?: string
  state?: string
  zip?: string
  status: 'active' | 'inactive' | 'archived'
  account_specialist_id?: ID
  service_package?: string
  notes?: string
  created_at: string
}

// ─── Payer ────────────────────────────────────────────────────────────────────

export interface Payer {
  id: ID
  name: string
  payer_id?: string
  payer_type?: string
  portal_url?: string
  phone?: string
  fax?: string
  notes?: string
  is_active: boolean
}

// ─── Verification ─────────────────────────────────────────────────────────────

export type VerificationStatus =
  | 'draft'
  | 'submitted'
  | 'assigned'
  | 'in_review'
  | 'payer_contacted'
  | 'verified'
  | 'unable_to_verify'
  | 'additional_info_required'
  | 'completed'
  | 'cancelled'

export type RequestPriority = 'low' | 'normal' | 'high' | 'urgent'

export interface VerificationRequest {
  id: ID
  organization_id: ID
  client_id?: ID
  patient_ref: string
  payer_id?: ID
  payer_name?: string
  plan_name?: string
  member_id?: string
  service_date?: string
  provider_npi?: string
  specialty?: string
  status: VerificationStatus
  priority: RequestPriority
  assigned_to?: ID
  due_at?: string
  internal_notes?: string
  created_at: string
  updated_at: string
  created_by: ID
  updated_by?: ID
  completed_at?: string
  cancelled_at?: string
  // Joined
  payers?: { name: string; phone?: string }
  profiles?: { full_name: string; email: string }
  verification_results?: VerificationResult
  verification_status_history?: VerificationStatusHistory[]
}

export interface VerificationResult {
  id: ID
  verification_id: ID
  coverage_status?: string
  plan_type?: string
  network_status?: string
  copay_amount?: number
  coinsurance_pct?: number
  deductible_total?: number
  deductible_met?: number
  oop_max?: number
  oop_met?: number
  referral_required?: boolean
  auth_required?: boolean
  effective_date?: string
  termination_date?: string
  plan_limitations?: string
  secondary_coverage?: string
  raw_notes?: string
  verified_at?: string
  verified_by?: ID
}

export interface VerificationStatusHistory {
  id: ID
  verification_id: ID
  previous_status?: VerificationStatus
  new_status: VerificationStatus
  changed_by: ID
  note?: string
  notification_sent?: boolean
  created_at: string
  profiles?: { full_name: string }
}

// ─── Authorization ────────────────────────────────────────────────────────────

export type AuthorizationStatus =
  | 'draft'
  | 'submitted'
  | 'documents_required'
  | 'assigned'
  | 'under_review'
  | 'submitted_to_payer'
  | 'pending_payer_response'
  | 'additional_clinical_info_required'
  | 'peer_to_peer_required'
  | 'approved'
  | 'partially_approved'
  | 'denied'
  | 'appeal_in_progress'
  | 'appeal_approved'
  | 'appeal_denied'
  | 'expired'
  | 'cancelled'

export interface AuthorizationRequest {
  id: ID
  organization_id: ID
  client_id?: ID
  verification_id?: ID
  patient_ref: string
  payer_id?: ID
  payer_name?: string
  procedure_description: string
  /** Backward-compatible joined/display alias returned by older API records. */
  procedure?: string
  cpt_codes: string[]
  hcpcs_codes?: string[]
  diagnosis_codes: string[]
  service_start_date?: string
  service_end_date?: string
  units_requested?: number
  facility?: string
  rendering_provider?: string
  status: AuthorizationStatus
  priority: RequestPriority
  assigned_to?: ID
  approval_number?: string
  approval_valid_from?: string
  approval_valid_to?: string
  units_approved?: number
  follow_up_date?: string
  internal_notes?: string
  created_at: string
  updated_at: string
  created_by: ID
  updated_by?: ID
  completed_at?: string
  cancelled_at?: string
  expired_at?: string
  // Joined
  payers?: { name: string; phone?: string }
  profiles?: { full_name: string; email: string }
  authorization_followups?: AuthorizationFollowup[]
  authorization_status_history?: AuthorizationStatusHistory[]
  authorization_appeals?: AuthorizationAppeal[]
}

export interface AuthorizationFollowup {
  id: ID
  authorization_id: ID
  contacted_via?: string
  contact_name?: string
  reference_number?: string
  notes: string
  follow_up_date?: string
  created_by: ID
  created_at: string
  profiles?: { full_name: string }
}

export interface AuthorizationStatusHistory {
  id: ID
  authorization_id: ID
  previous_status?: AuthorizationStatus
  new_status: AuthorizationStatus
  changed_by: ID
  note?: string
  notification_sent?: boolean
  created_at: string
  profiles?: { full_name: string }
}

export interface AuthorizationAppeal {
  id: ID
  authorization_id: ID
  appeal_type: 'internal' | 'external' | 'p2p'
  submitted_at?: string
  due_date?: string
  outcome?: string
  outcome_date?: string
  notes?: string
  created_by: ID
  created_at: string
  updated_at: string
}

// ─── Documents ────────────────────────────────────────────────────────────────

export type DocumentCategory = 'verification' | 'authorization' | 'appeal' | 'client' | 'clinical' | 'other'

export interface Document {
  id: ID
  organization_id: ID
  uploaded_by: ID
  category: DocumentCategory
  file_name: string
  file_size?: number
  mime_type?: string
  storage_path: string
  bucket_name: string
  related_type?: string
  related_id?: ID
  description?: string
  is_deleted: boolean
  created_at: string
  updated_at: string
  profiles?: { full_name: string }
}

// ─── Tasks ────────────────────────────────────────────────────────────────────

export type TaskStatus = 'open' | 'in_progress' | 'completed' | 'cancelled'
export type TaskPriority = 'low' | 'normal' | 'high' | 'urgent'

export interface Task {
  id: ID
  organization_id: ID
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assigned_to?: ID
  due_date?: string
  related_type?: string
  related_id?: ID
  created_at: string
  updated_at: string
  created_by: ID
  completed_at?: string
  profiles?: { full_name: string }
  task_comments?: TaskComment[]
}

export interface TaskComment {
  id: ID
  task_id: ID
  body: string
  created_by: ID
  created_at: string
  updated_at: string
  profiles?: { full_name: string }
}

// ─── Request Comments ─────────────────────────────────────────────────────────

export interface RequestComment {
  id: ID
  related_type: 'verification' | 'authorization'
  related_id: ID
  body: string
  is_internal: boolean
  created_by: ID
  created_at: string
  updated_at: string
  profiles?: { full_name: string }
}

// ─── Notifications ────────────────────────────────────────────────────────────

export type NotificationType =
  | 'status_change'
  | 'assignment'
  | 'additional_info'
  | 'approval'
  | 'denial'
  | 'expiration_warning'
  | 'overdue_task'
  | 'follow_up_reminder'

export interface Notification {
  id: ID
  user_id: ID
  type: NotificationType
  title: string
  body: string
  is_read: boolean
  related_id?: ID
  related_type?: 'verification' | 'authorization' | 'task'
  created_at: string
}

// ─── Permissions ──────────────────────────────────────────────────────────────

export type PermissionKey =
  | 'dashboard.view' | 'dashboard.view_org_metrics' | 'dashboard.export_reports'
  | 'users.view' | 'users.create' | 'users.edit' | 'users.deactivate' | 'users.reset_access' | 'users.assign_roles'
  | 'subadmins.view' | 'subadmins.create' | 'subadmins.edit_permissions' | 'subadmins.deactivate'
  | 'clients.view' | 'clients.create' | 'clients.edit' | 'clients.archive' | 'clients.view_contracts' | 'clients.manage_users'
  | 'verification.view' | 'verification.create' | 'verification.edit' | 'verification.assign'
  | 'verification.update_status' | 'verification.upload_documents' | 'verification.export' | 'verification.delete_draft'
  | 'authorization.view' | 'authorization.create' | 'authorization.edit' | 'authorization.assign'
  | 'authorization.submit_status' | 'authorization.add_followup' | 'authorization.record_approval'
  | 'authorization.record_denial' | 'authorization.create_appeal' | 'authorization.upload_files'
  | 'reports.view' | 'reports.export_csv' | 'reports.export_pdf' | 'reports.view_financial'
  | 'reports.view_productivity' | 'reports.view_turnaround'
  | 'content.manage_pages' | 'content.manage_faqs' | 'content.manage_testimonials'
  | 'content.manage_specialties' | 'content.manage_blog' | 'content.manage_metrics' | 'content.manage_seo'
  | 'system.view_audit_logs' | 'system.manage_notifications' | 'system.manage_integrations'
  | 'system.manage_payers' | 'system.manage_ehr' | 'system.manage_settings'

// ─── UI helpers ───────────────────────────────────────────────────────────────

export type SortDirection = 'asc' | 'desc'

export interface TableColumn<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  width?: string
  render?: (value: unknown, row: T) => React.ReactNode
}

export interface FilterOption {
  label: string
  value: string
}
