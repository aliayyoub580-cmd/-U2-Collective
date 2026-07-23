import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { BookOpen } from 'lucide-react'
import api from '@/services/api'
import Pagination from '@/components/ui/Pagination'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import EmptyState from '@/components/ui/EmptyState'

export default function AuditLogsPage() {
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['audit-logs', page],
    queryFn: () => api.get('/audit-logs', { params: { page } }).then(r => r.data.data),
  })

  const logs = data?.data ?? []
  const meta = data?.meta ?? { total: 0, totalPages: 1 }

  return (
    <>
      <Helmet><title>Audit Logs | U2 Collective Admin</title></Helmet>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-[1.5rem] font-bold text-[#0B3D62]">Audit Logs</h1>
          <p className="text-[#5A6B78] text-[14px] mt-0.5">Complete record of all system actions</p>
        </div>

        <div className="bg-white rounded-xl border border-[#DCE5EA] overflow-hidden shadow-sm">
          {isLoading && <SkeletonLoader variant="table" lines={10} className="p-4" />}
          {!isLoading && logs.length === 0 && (
            <EmptyState icon={<BookOpen size={22} />} title="No audit logs yet" description="Audit events will appear here as actions are performed." />
          )}
          {!isLoading && logs.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-[#F0F4F7]">
                      {['Timestamp', 'User', 'Action', 'Module', 'Record ID', 'IP Address'].map(h => (
                        <th key={h} className="px-5 py-3.5 text-left text-[11px] font-semibold text-[#5A6B78] uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log: Record<string, unknown>, i: number) => (
                      <tr key={log.id as string ?? i} className="border-b border-[#F7F9FA] hover:bg-[#FAFCFD] transition-colors">
                        <td className="px-5 py-3 text-[11px] font-mono text-[#5A6B78]">
                          {new Date(log.created_at as string).toLocaleString()}
                        </td>
                        <td className="px-5 py-3 text-[12px] text-[#0B3D62]">{log.user_id as string ?? '—'}</td>
                        <td className="px-5 py-3">
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#EEF6F8] text-[#0B3D62]">
                            {log.action as string}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-[12px] text-[#5A6B78] capitalize">{log.module as string}</td>
                        <td className="px-5 py-3 text-[11px] font-mono text-[#9BAAB5]">
                          {(log.record_id as string)?.slice(0, 8) ?? '—'}
                        </td>
                        <td className="px-5 py-3 text-[11px] text-[#9BAAB5]">{log.ip_address as string ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {meta.totalPages > 1 && (
                <div className="px-5 py-4 border-t border-[#F0F4F7] flex justify-end">
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
