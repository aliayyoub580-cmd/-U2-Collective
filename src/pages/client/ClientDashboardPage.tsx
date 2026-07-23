import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { AlertCircle, CheckCircle2, ClipboardCheck, Clock, FileText, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { dashboardService } from '@/services/dashboard.service'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import ErrorState from '@/components/ui/ErrorState'

type Stats = {
  verification: { total: number; pending: number }
  authorization: { total: number; approved: number; denied: number; additional_info: number }
}

const fallback: Stats = { verification: { total: 0, pending: 0 }, authorization: { total: 0, approved: 0, denied: 0, additional_info: 0 } }

export default function ClientDashboardPage() {
  const query = useQuery({ queryKey: ['client-dashboard'], queryFn: dashboardService.getStats, staleTime: 30_000 })
  const stats = (query.data as Stats | undefined) ?? fallback
  const cards = [
    { label: 'Submitted requests', value: stats.verification.total + stats.authorization.total, icon: ClipboardCheck, color: '#0B3D62' },
    { label: 'Pending eligibility', value: stats.verification.pending, icon: Clock, color: '#D89B2B' },
    { label: 'Pending authorizations', value: Math.max(0, stats.authorization.total - stats.authorization.approved - stats.authorization.denied), icon: FileText, color: '#1BA098' },
    { label: 'Approved', value: stats.authorization.approved, icon: CheckCircle2, color: '#278A6B' },
    { label: 'Information required', value: stats.authorization.additional_info, icon: AlertCircle, color: '#D89B2B' },
  ]

  return (
    <>
      <Helmet><title>Client Portal | U2 Collective</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><h1 className="text-2xl font-bold text-[#0B3D62]">Client Dashboard</h1><p className="mt-1 text-sm text-[#5A6B78]">Track requests and act on items requiring attention.</p></div>
        <div className="flex flex-wrap gap-2">
          <Link to="/portal/verifications" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#1BA098] px-4 py-2 text-sm font-semibold text-white"><Plus size={16} />Verification</Link>
          <Link to="/portal/authorizations" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#0B3D62] bg-white px-4 py-2 text-sm font-semibold text-[#0B3D62]"><Plus size={16} />Authorization</Link>
        </div>
      </div>
      {query.isLoading && <SkeletonLoader variant="card" className="mb-5" />}
      {query.isError && <ErrorState title="Could not load portal metrics" onRetry={query.refetch} className="mb-5" />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => <div key={card.label} className="rounded-xl border border-[#DCE5EA] bg-white p-5 shadow-card"><card.icon size={20} style={{ color: card.color }} /><p className="mt-4 text-xs font-medium text-[#5A6B78]">{card.label}</p><p className="mt-1 text-3xl font-bold" style={{ color: card.color }}>{card.value}</p></div>)}
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section className="rounded-xl border border-[#DCE5EA] bg-white p-5"><h2 className="font-semibold text-[#0B3D62]">Recent activity</h2><p className="mt-4 text-sm text-[#5A6B78]">Request activity will appear here as your team submits and updates records.</p></section>
        <section className="rounded-xl border border-[#DCE5EA] bg-white p-5"><h2 className="font-semibold text-[#0B3D62]">Upcoming expirations</h2><p className="mt-4 text-sm text-[#5A6B78]">No authorization expirations are currently due.</p></section>
      </div>
    </>
  )
}
