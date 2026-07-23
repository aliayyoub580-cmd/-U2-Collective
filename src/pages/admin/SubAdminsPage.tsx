import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { Shield, Plus, Edit2 } from 'lucide-react'
import api from '@/services/api'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Pagination from '@/components/ui/Pagination'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import EmptyState from '@/components/ui/EmptyState'
import PermissionMatrixModal from '@/components/admin/PermissionMatrixModal'

export default function SubAdminsPage() {
  const [page, setPage] = useState(1)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [matrixOpen, setMatrixOpen] = useState(false)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-sub-admins', page],
    queryFn: () => api.get('/users/sub-admins', { params: { page } }).then(r => r.data.data),
  })

  const admins = data?.data ?? []
  const meta = data?.meta ?? { total: 0, totalPages: 1 }

  return (
    <>
      <Helmet><title>Sub-Admins | U2 Collective Admin</title></Helmet>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[1.5rem] font-bold text-[#0B3D62]">Sub-Admins</h1>
            <p className="text-[#5A6B78] text-[14px] mt-0.5">Manage permission-based admin accounts</p>
          </div>
          <Button size="sm" onClick={() => { setSelectedId(null); setMatrixOpen(true) }}>
            <Plus size={15} />
            Create Sub-Admin
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-[#DCE5EA] overflow-hidden shadow-sm">
          {isLoading && <SkeletonLoader variant="table" lines={5} className="p-4" />}
          {!isLoading && admins.length === 0 && (
            <EmptyState
              icon={<Shield size={22} />}
              title="No sub-admins yet"
              description="Create a sub-admin and assign a custom permission set."
              action={{ label: 'Create Sub-Admin', onClick: () => setMatrixOpen(true) }}
            />
          )}
          {!isLoading && admins.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#F0F4F7]">
                    {['Name', 'Email', 'Template', 'Permissions', 'Status', 'Last Active', ''].map((h) => (
                      <th key={h} className="px-5 py-3.5 text-left text-[11px] font-semibold text-[#5A6B78] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {admins.map((sa: Record<string, unknown>) => {
                    const profile = sa.profiles as Record<string, unknown> | null
                    const template = sa.permission_templates as Record<string, unknown> | null
                    const perms = sa.sub_admin_permissions as unknown[] ?? []
                    return (
                      <tr key={sa.id as string} className="border-b border-[#F7F9FA] hover:bg-[#FAFCFD] transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#D89B2B]/20 flex items-center justify-center text-[#D89B2B] text-[11px] font-bold">
                              SA
                            </div>
                            <span className="text-[13px] font-semibold text-[#0B3D62]">{profile?.full_name as string ?? '—'}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-[12px] text-[#5A6B78]">{profile?.email as string ?? '—'}</td>
                        <td className="px-5 py-3.5">
                          <Badge variant="warning">{template?.name as string ?? 'Custom'}</Badge>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-[12px] font-semibold text-[#1BA098]">{perms.length} permissions</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <Badge variant={profile?.is_active ? 'success' : 'error'} dot>
                            {profile?.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td className="px-5 py-3.5 text-[12px] text-[#9BAAB5]">
                          {profile?.last_login ? new Date(profile.last_login as string).toLocaleDateString() : 'Never'}
                        </td>
                        <td className="px-5 py-3.5">
                          <button
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-[#1BA098] hover:bg-[#EEF6F8] transition-colors"
                            onClick={() => { setSelectedId(sa.id as string); setMatrixOpen(true) }}
                          >
                            <Edit2 size={12} />
                            Edit Permissions
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
          {meta.totalPages > 1 && (
            <div className="px-5 py-4 border-t border-[#F0F4F7] flex justify-end">
              <Pagination page={page} totalPages={meta.totalPages} onPageChange={setPage} />
            </div>
          )}
        </div>

        <PermissionMatrixModal
          open={matrixOpen}
          onClose={() => setMatrixOpen(false)}
          subAdminId={selectedId}
          onSaved={refetch}
        />
      </div>
    </>
  )
}
