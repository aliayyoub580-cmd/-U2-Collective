import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { Building2, Plus, Phone, Mail, MoreHorizontal } from 'lucide-react'
import api from '@/services/api'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import SearchInput from '@/components/ui/SearchInput'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import EmptyState from '@/components/ui/EmptyState'
import Pagination from '@/components/ui/Pagination'
import { useDebounce } from '@/hooks/useDebounce'

export default function ClientsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-clients', page, debouncedSearch],
    queryFn: () => api.get('/clients', { params: { page, search: debouncedSearch } }).then(r => r.data.data),
  })

  const clients = data?.data ?? []
  const meta = data?.meta ?? { total: 0, totalPages: 1 }

  return (
    <>
      <Helmet><title>Clients | U2 Collective Admin</title></Helmet>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[1.5rem] font-bold text-[#0B3D62]">Clients</h1>
            <p className="text-[#5A6B78] text-[14px] mt-0.5">{meta.total} client organizations</p>
          </div>
          <Button size="sm"><Plus size={15} />Add Client</Button>
        </div>

        <div className="flex gap-3 mb-5">
          <SearchInput placeholder="Search clients…" onSearch={setSearch} className="w-72" />
        </div>

        {/* Card grid */}
        {isLoading && <SkeletonLoader variant="card" className="mb-4" />}
        {!isLoading && clients.length === 0 && (
          <EmptyState icon={<Building2 size={22} />} title="No clients found" description="Onboard your first client organization." action={{ label: 'Add Client', onClick: () => {} }} />
        )}
        {!isLoading && clients.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {clients.map((client: Record<string, unknown>) => (
              <div key={client.id as string} className="bg-white rounded-xl border border-[#DCE5EA] p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#EEF6F8] flex items-center justify-center">
                      <Building2 size={18} className="text-[#1BA098]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#0B3D62] text-[14px]">{client.name as string}</div>
                      <div className="text-[12px] text-[#5A6B78]">{client.specialty as string ?? '—'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Badge variant={client.status === 'active' ? 'success' : 'outline'} dot>
                      {(client.status as string) ?? 'Active'}
                    </Badge>
                    <button className="p-1.5 rounded text-[#9BAAB5] hover:text-[#0B3D62] hover:bg-[#EEF6F8]">
                      <MoreHorizontal size={15} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  {Boolean(client.email) && (
                    <div className="flex items-center gap-2 text-[12px] text-[#5A6B78]">
                      <Mail size={12} className="text-[#1BA098]" />
                      {client.email as string}
                    </div>
                  )}
                  {Boolean(client.phone) && (
                    <div className="flex items-center gap-2 text-[12px] text-[#5A6B78]">
                      <Phone size={12} className="text-[#1BA098]" />
                      {client.phone as string}
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-[#DCE5EA] flex items-center justify-between">
                  <div className="text-[11px] text-[#9BAAB5]">EHR: {(client.ehr_system as string) ?? '—'}</div>
                  <button className="text-[12px] font-semibold text-[#1BA098] hover:underline">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {meta.totalPages > 1 && (
          <div className="mt-5 flex justify-end">
            <Pagination page={page} totalPages={meta.totalPages} onPageChange={setPage} />
          </div>
        )}
      </div>
    </>
  )
}
