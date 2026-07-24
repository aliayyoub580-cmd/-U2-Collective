import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery } from '@tanstack/react-query'
import { UserPlus, MoreHorizontal, Filter, Download, Eye, EyeOff } from 'lucide-react'
import api from '@/services/api'
import Button from '@/components/ui/Button'
import StatusBadge from '@/components/ui/StatusBadge'
import SearchInput from '@/components/ui/SearchInput'
import Pagination from '@/components/ui/Pagination'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'
import { useDebounce } from '@/hooks/useDebounce'
import type { User } from '@/types'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import { toast } from 'sonner'

const ROLE_LABELS: Record<string, string> = {
  super_admin: 'Super Admin', admin: 'Admin', sub_admin: 'Sub-Admin',
  manager: 'Manager', verification_specialist: 'Verification Spec.',
  authorization_specialist: 'Auth Specialist', client_admin: 'Client Admin',
  client_staff: 'Client Staff', readonly_client: 'Read-Only',
}

const ROLE_COLORS: Record<string, string> = {
  super_admin: '#C94A4A', admin: '#0B3D62', sub_admin: '#D89B2B',
  manager: '#1BA098', verification_specialist: '#278A6B',
  authorization_specialist: '#278A6B', client_admin: '#5A6B78',
  client_staff: '#5A6B78', readonly_client: '#9BAAB5',
}

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [passwordUser, setPasswordUser] = useState<User | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const debouncedSearch = useDebounce(search, 300)

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-users', page, debouncedSearch],
    queryFn: () => api.get('/users', { params: { page, pageSize: 20, search: debouncedSearch } }).then(r => r.data.data),
  })

  const users: User[] = data?.data ?? []
  const meta = data?.meta ?? { total: 0, page: 1, totalPages: 1 }
  const passwordMutation = useMutation({
    mutationFn: () => api.put(`/users/${passwordUser!.id}/password`, { password: newPassword }),
    onSuccess: () => {
      toast.success('Password updated successfully')
      setPasswordUser(null)
      setNewPassword('')
      setShowPassword(false)
    },
    onError: (error: Error) => toast.error(error.message || 'Password update failed'),
  })

  return (
    <>
      <Helmet><title>Users | U2 Collective Admin</title></Helmet>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[1.5rem] font-bold text-[#0B3D62]">Users</h1>
            <p className="text-[#5A6B78] text-[14px] mt-0.5">{meta.total} total accounts</p>
          </div>
          <Button size="sm">
            <UserPlus size={15} />
            Add User
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-5">
          <SearchInput
            placeholder="Search by name or email…"
            onSearch={setSearch}
            className="w-72"
          />
          <Button variant="secondary" size="sm">
            <Filter size={14} />
            Filters
          </Button>
          <Button variant="ghost" size="sm">
            <Download size={14} />
            Export
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#DCE5EA] overflow-hidden shadow-sm">
          {isLoading && <SkeletonLoader variant="table" lines={8} className="p-4" />}
          {isError && <ErrorState title="Could not load users" onRetry={refetch} />}
          {!isLoading && !isError && users.length === 0 && (
            <EmptyState
              icon={<UserPlus size={22} />}
              title="No users found"
              description="Create a user account or adjust your search filter."
              action={{ label: 'Add User', onClick: () => {} }}
            />
          )}
          {!isLoading && !isError && users.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-[#F0F4F7]">
                      {['Name', 'Email', 'Role', 'Organization', 'Status', 'Last Login', ''].map((h) => (
                        <th key={h} className="px-5 py-3.5 text-left text-[11px] font-semibold text-[#5A6B78] uppercase tracking-wide">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-[#F7F9FA] hover:bg-[#FAFCFD] transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#0B3D62] flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                              {user.full_name.split(' ').map(n => n[0]).slice(0,2).join('')}
                            </div>
                            <span className="text-[13px] font-semibold text-[#0B3D62]">{user.full_name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-[13px] text-[#5A6B78]">{user.email}</td>
                        <td className="px-5 py-3.5">
                          <span
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                            style={{ color: ROLE_COLORS[user.role] ?? '#5A6B78', background: `${ROLE_COLORS[user.role] ?? '#5A6B78'}18` }}
                          >
                            {ROLE_LABELS[user.role] ?? user.role}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-[12px] text-[#5A6B78]">—</td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={user.is_active ? 'verified' : 'cancelled'} />
                        </td>
                        <td className="px-5 py-3.5 text-[12px] text-[#9BAAB5]">
                          {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                        </td>
                        <td className="px-5 py-3.5">
                          <button
                            className="p-1.5 rounded text-[#9BAAB5] hover:text-[#0B3D62] hover:bg-[#EEF6F8] transition-colors"
                            onClick={() => { setPasswordUser(user); setNewPassword(''); setShowPassword(false) }}
                            aria-label={`Set password for ${user.full_name}`}
                            title="Set password"
                          >
                            <MoreHorizontal size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {meta.totalPages > 1 && (
                <div className="px-5 py-4 border-t border-[#F0F4F7] flex justify-between items-center">
                  <span className="text-[12px] text-[#5A6B78]">
                    Showing {users.length} of {meta.total} users
                  </span>
                  <Pagination page={page} totalPages={meta.totalPages} onPageChange={setPage} />
                </div>
              )}
            </>
          )}
        </div>
        <Modal
          open={Boolean(passwordUser)}
          onClose={() => setPasswordUser(null)}
          title="Set User Password"
          description={`Set a replacement password for ${passwordUser?.full_name ?? 'this user'}. Existing passwords cannot be viewed.`}
          size="sm"
        >
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              passwordMutation.mutate()
            }}
          >
            <Input
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              hint="At least 8 characters. This also confirms the user's email account."
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />
            <div className="flex justify-end gap-3 border-t border-[#DCE5EA] pt-4">
              <Button type="button" variant="secondary" size="sm" onClick={() => setPasswordUser(null)}>Cancel</Button>
              <Button type="submit" size="sm" loading={passwordMutation.isPending} disabled={newPassword.length < 8}>
                Update Password
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  )
}
