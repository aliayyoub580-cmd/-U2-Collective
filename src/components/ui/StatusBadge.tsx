import Badge from './Badge'
import type { VerificationStatus, AuthorizationStatus } from '@/types'

type AnyStatus = VerificationStatus | AuthorizationStatus | string

const STATUS_CONFIG: Record<string, { label: string; variant: 'success' | 'warning' | 'error' | 'info' | 'default' | 'navy' | 'outline' }> = {
  // Verification
  draft:                    { label: 'Draft', variant: 'outline' },
  submitted:                { label: 'Submitted', variant: 'info' },
  assigned:                 { label: 'Assigned', variant: 'info' },
  in_review:                { label: 'In Review', variant: 'warning' },
  payer_contacted:          { label: 'Payer Contacted', variant: 'warning' },
  verified:                 { label: 'Verified', variant: 'success' },
  unable_to_verify:         { label: 'Unable to Verify', variant: 'error' },
  additional_info_required: { label: 'Info Required', variant: 'warning' },
  completed:                { label: 'Completed', variant: 'success' },
  cancelled:                { label: 'Cancelled', variant: 'outline' },
  // Authorization
  documents_required:               { label: 'Docs Required', variant: 'warning' },
  under_review:                     { label: 'Under Review', variant: 'warning' },
  submitted_to_payer:               { label: 'Submitted to Payer', variant: 'info' },
  pending_payer_response:           { label: 'Pending Payer', variant: 'warning' },
  additional_clinical_info_required:{ label: 'Clinical Info Req.', variant: 'warning' },
  peer_to_peer_required:            { label: 'Peer-to-Peer Req.', variant: 'warning' },
  approved:                         { label: 'Approved', variant: 'success' },
  partially_approved:               { label: 'Partially Approved', variant: 'warning' },
  denied:                           { label: 'Denied', variant: 'error' },
  appeal_in_progress:               { label: 'Appeal In Progress', variant: 'info' },
  appeal_approved:                  { label: 'Appeal Approved', variant: 'success' },
  appeal_denied:                    { label: 'Appeal Denied', variant: 'error' },
  expired:                          { label: 'Expired', variant: 'error' },
}

interface StatusBadgeProps {
  status: AnyStatus
  size?: 'sm' | 'md'
}

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? { label: status, variant: 'default' as const }
  return (
    <Badge variant={config.variant} size={size} dot>
      {config.label}
    </Badge>
  )
}
