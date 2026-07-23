import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { Plus, Download, MoreHorizontal } from 'lucide-react'
import { verificationService } from '@/services/verification.service'
import Button from '@/components/ui/Button'
import StatusBadge from '@/components/ui/StatusBadge'
import SearchInput from '@/components/ui/SearchInput'
import Pagination from '@/components/ui/Pagination'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import EmptyState from '@/components/ui/EmptyState'
import { useDebounce } from '@/hooks/useDebounce'
import type { VerificationRequest } from '@/types'

const PRIORITY_COLORS: Record<string, string> = {
  urgent: '#C94A4A', high: '#D89B2B', normal: '#1BA098', low: '#9BAAB5',
}

export default function VerificationsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const { data, isLoading } = useQuery({
    queryKey: ['verifications', page, debouncedSearch, status],
    queryFn: () => verificationService.list({ page, search: debouncedSearch, status: status || undefined }),
  })

  const requests: VerificationRequest[] = data?.data ?? []
  const meta = data?.meta ?? { total: 0, totalPages: 1 }

  return (
    <>
      <Helmet><title>Verifications | U2 Collective Admin</title></Helmet>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[1.5rem] font-bold text-[#0B3D62]">Verification Requests</h1>
            <p className="text-[#5A6B78] text-[14px] mt-0.5">{meta.total} total requests</p>
          </div>
          <Button size="sm"><Plus size={15} />New Request</Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <SearchInput placeholder="Search by patient ref or payer…" onSearch={setSearch} className="w-72" />
          <select
            className="px-3 py-2.5 rounded-lg border border-[#DCE5EA] bg-white text-[13px] text-[#0B3D62] focus:outline-none focus:ring-2 focus:ring-[#1BA098]/40"
            value={status}
            onChange={e => { setStatus(e.target.value); setPage(1) }}
            aria-label="Filter by status"
          >
            <option value="">All Statuses</option>
            {['draft','submitted','assigned','in_review','payer_contacted','verified','unable_to_verify','additional_info_required','completed','cancelled'].map(s => (
              <option key={s} value={s}>{s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>
            ))}
          </select>
          <Button variant="ghost" size="sm"><Download size={14} />Export</Button>
        </div>

        <div className="bg-white rounded-xl border border-[#DCE5EA] overflow-hidden shadow-sm">
          {isLoading && <SkeletonLoader variant="table" lines={8} className="p-4" />}
          {!isLoading && requests.length === 0 && (
            <EmptyState icon={<Plus size={22} />} title="No verification requests" description="Submit a new verification request to get started." />
          )}
          {!isLoading && requests.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-[#F0F4F7]">
                      {['Request ID', 'Patient Ref.', 'Payer', 'Service Date', 'Priority', 'Status', 'Assigned To', 'Due', ''].map(h => (
                        <th key={h} className="px-4 py-3.5 text-left text-[11px] font-semibold text-[#5A6B78] uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => (
                      <tr key={req.id} className="border-b border-[#F7F9FA] hover:bg-[#FAFCFD] transition-colors">
                        <td className="px-4 py-3.5 text-[11px] font-mono font-semibold text-[#0B3D62]">VER-{req.id.slice(-6).toUpperCase()}</td>
                        <td className="px-4 py-3.5 text-[12px] text-[#3a5060]">{req.patient_ref}</td>
                        <td className="px-4 py-3.5 text-[12px] text-[#5A6B78]">{req.payer_name ?? '—'}</td>
                        <td className="px-4 py-3.5 text-[12px] text-[#5A6B78]">{req.service_date ?? '—'}</td>
                        <td className="px-4 py-3.5">
                          <span className="text-[11px] font-semibold capitalize" style={{ color: PRIORITY_COLORS[req.priority] }}>
                            {req.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3.5"><StatusBadge status={req.status} /></td>
                        <td className="px-4 py-3.5 text-[12px] text-[#5A6B78]">{req.assigned_to ?? '—'}</td>
                        <td className="px-4 py-3.5 text-[11px] text-[#9BAAB5]">{req.due_at ? new Date(req.due_at).toLocaleDateString() : '—'}</td>
                        <td className="px-4 py-3.5">
                          <button className="p-1.5 rounded text-[#9BAAB5] hover:text-[#0B3D62] hover:bg-[#EEF6F8]"><MoreHorizontal size={15} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {meta.totalPages > 1 && (
                <div className="px-5 py-4 border-t border-[#F0F4F7] flex justify-between items-center">
                  <span className="text-[12px] text-[#5A6B78]">Showing {requests.length} of {meta.total}</span>
                  <Pagination page={page} totalPages={meta.totalPages} onPageChange={setPage} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
