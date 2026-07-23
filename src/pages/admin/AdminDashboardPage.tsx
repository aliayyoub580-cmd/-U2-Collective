import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import {
  ClipboardCheck, FileText, CheckCircle2, XCircle, Clock as ClockIcon,
  Users, Building2, AlertCircle,
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { dashboardService } from '@/services/dashboard.service'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import ErrorState from '@/components/ui/ErrorState'

const MOCK_STATS = {
  verification: { total: 248, pending: 34 },
  authorization: { total: 186, approved: 112, denied: 22, additional_info: 18 },
}

const lineData = [
  { day: 'Mon', verifications: 22, authorizations: 14 },
  { day: 'Tue', verifications: 31, authorizations: 19 },
  { day: 'Wed', verifications: 26, authorizations: 16 },
  { day: 'Thu', verifications: 38, authorizations: 24 },
  { day: 'Fri', verifications: 34, authorizations: 21 },
  { day: 'Sat', verifications: 14, authorizations: 8 },
  { day: 'Sun', verifications: 9, authorizations: 5 },
]

const pieData = [
  { name: 'Approved', value: 112, color: '#278A6B' },
  { name: 'Pending', value: 34, color: '#D89B2B' },
  { name: 'Add. Info', value: 18, color: '#1BA098' },
  { name: 'Denied', value: 22, color: '#C94A4A' },
]

const recentActivity = [
  { id: 'VER-2026-1048', type: 'Verification', patient: 'Patient A-1042', payer: 'BlueCross PPO', status: 'Verified', statusColor: '#278A6B', bg: '#f0faf5', time: '12 min ago' },
  { id: 'AUTH-2026-2082', type: 'Authorization', patient: 'Patient B-2087', payer: 'Aetna HMO', status: 'Pending', statusColor: '#D89B2B', bg: '#fffbf0', time: '28 min ago' },
  { id: 'VER-2026-1051', type: 'Verification', patient: 'Patient C-3041', payer: 'UnitedHealth', status: 'In Review', statusColor: '#1BA098', bg: '#eef6f8', time: '41 min ago' },
  { id: 'AUTH-2026-2085', type: 'Authorization', patient: 'Patient D-4012', payer: 'Cigna PPO', status: 'Approved', statusColor: '#278A6B', bg: '#f0faf5', time: '1 hr ago' },
  { id: 'VER-2026-1054', type: 'Verification', patient: 'Patient E-5019', payer: 'Humana', status: 'Verified', statusColor: '#278A6B', bg: '#f0faf5', time: '1.5 hr ago' },
]

function StatCard({ icon: Icon, label, value, sub, color, bg }: {
  icon: React.ElementType; label: string; value: string | number
  sub?: string; color: string; bg: string
}) {
  return (
    <div className="bg-white rounded-xl border border-[#DCE5EA] p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: bg }}>
        <Icon size={18} style={{ color }} strokeWidth={1.8} />
      </div>
      <div>
        <div className="text-[11px] font-medium text-[#5A6B78] mb-0.5">{label}</div>
        <div className="text-[1.6rem] font-bold leading-none" style={{ color }}>{value}</div>
        {sub && <div className="text-[11px] text-[#5A6B78] mt-1">{sub}</div>}
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: dashboardService.getStats,
    retry: 1,
    staleTime: 30_000,
  })

  const stats = (data as typeof MOCK_STATS | undefined) ?? MOCK_STATS

  return (
    <>
      <Helmet><title>Dashboard | U2 Collective Admin</title></Helmet>
      <div className="p-6 max-w-[1400px] mx-auto">
        <div className="mb-6">
          <h1 className="text-[1.5rem] font-bold text-[#0B3D62]">Dashboard</h1>
          <p className="text-[#5A6B78] text-[14px] mt-0.5">Platform overview — sample data shown</p>
        </div>

        {isLoading && <SkeletonLoader variant="card" className="mb-6" />}
        {isError && <ErrorState title="Could not load stats" onRetry={refetch} className="mb-6" />}

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-6">
          <div className="col-span-2">
            <StatCard icon={ClipboardCheck} label="Total Verifications" value={stats.verification.total} sub="All time" color="#0B3D62" bg="#eef6f8" />
          </div>
          <div className="col-span-2">
            <StatCard icon={ClockIcon} label="Pending Verifications" value={stats.verification.pending} sub="Awaiting action" color="#D89B2B" bg="#fffbf0" />
          </div>
          <div className="col-span-2">
            <StatCard icon={FileText} label="Total Authorizations" value={stats.authorization.total} sub="All time" color="#0B3D62" bg="#eef6f8" />
          </div>
          <div className="col-span-2">
            <StatCard icon={CheckCircle2} label="Approved" value={stats.authorization.approved} sub="Authorizations" color="#278A6B" bg="#f0faf5" />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={XCircle} label="Denied" value={stats.authorization.denied} color="#C94A4A" bg="#fff5f5" />
          <StatCard icon={AlertCircle} label="Add. Info Required" value={stats.authorization.additional_info} color="#D89B2B" bg="#fffbf0" />
          <StatCard icon={Users} label="Active Staff" value={12} sub="Specialists" color="#1BA098" bg="#e6f7f7" />
          <StatCard icon={Building2} label="Active Clients" value={28} sub="Organizations" color="#0B3D62" bg="#eef6f8" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#DCE5EA] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[14px] font-semibold text-[#0B3D62]">Request Volume — Last 7 Days</h2>
              <div className="flex items-center gap-4 text-[11px] text-[#5A6B78]">
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 inline-block bg-[#1BA098]" />Verifications</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 inline-block bg-[#0B3D62] opacity-50 border-dashed border-t border-[#0B3D62]" />Authorizations</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#5A6B78' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#5A6B78' }} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={{ fontSize: 12, border: '1px solid #DCE5EA', borderRadius: 8, padding: '6px 10px' }} />
                <Line type="monotone" dataKey="verifications" stroke="#1BA098" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="authorizations" stroke="#0B3D62" strokeWidth={2} dot={false} strokeDasharray="4 2" opacity={0.6} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-[#DCE5EA] p-5">
            <h2 className="text-[14px] font-semibold text-[#0B3D62] mb-4">Authorization Status</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={2} dataKey="value">
                  {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-xl border border-[#DCE5EA] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#DCE5EA] flex items-center justify-between">
            <h2 className="text-[14px] font-semibold text-[#0B3D62]">Recent Activity</h2>
            <span className="text-[12px] text-[#1BA098] font-medium cursor-pointer hover:underline">View All</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-[#F0F4F7]">
                  {['Request ID', 'Patient Ref.', 'Type', 'Payer', 'Status', 'Time'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold text-[#5A6B78] uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((row, i) => (
                  <tr key={row.id} className={cn('hover:bg-[#FAFCFD] transition-colors', i % 2 === 0 ? 'bg-white' : 'bg-[#FAFCFD]')}>
                    <td className="px-5 py-3 text-[12px] font-mono font-semibold text-[#0B3D62]">{row.id}</td>
                    <td className="px-5 py-3 text-[12px] text-[#3a5060]">{row.patient}</td>
                    <td className="px-5 py-3 text-[12px] text-[#5A6B78]">{row.type}</td>
                    <td className="px-5 py-3 text-[12px] text-[#5A6B78]">{row.payer}</td>
                    <td className="px-5 py-3">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ color: row.statusColor, background: row.bg }}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[11px] text-[#9BAAB5]">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

function cn(...c: (string | false | undefined)[]) { return c.filter(Boolean).join(' ') }
