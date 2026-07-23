import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { Activity, Clock, AlertCircle, CheckCircle2, XCircle, Info } from 'lucide-react'

const lineData = [
  { day: 'Mon', verified: 18, authorized: 9 },
  { day: 'Tue', verified: 24, authorized: 14 },
  { day: 'Wed', verified: 20, authorized: 11 },
  { day: 'Thu', verified: 31, authorized: 18 },
  { day: 'Fri', verified: 27, authorized: 15 },
  { day: 'Sat', verified: 12, authorized: 6 },
]

const pieData = [
  { name: 'Verified', value: 38, color: '#278A6B' },
  { name: 'Pending', value: 14, color: '#D89B2B' },
  { name: 'Add. Info Req.', value: 8, color: '#1BA098' },
  { name: 'Denied', value: 5, color: '#C94A4A' },
]

const recentRows = [
  { id: 'VER-2026-1048', patient: 'Patient A-1042', payer: 'BlueCross PPO', type: 'Verification', status: 'Verified', statusColor: '#278A6B', bg: '#f0faf5' },
  { id: 'AUTH-2026-2082', patient: 'Patient B-2087', payer: 'Aetna HMO', type: 'Authorization', status: 'Pending', statusColor: '#D89B2B', bg: '#fffbf0' },
  { id: 'VER-2026-1051', patient: 'Patient C-3041', payer: 'UnitedHealth', type: 'Verification', status: 'In Review', statusColor: '#1BA098', bg: '#eef6f8' },
  { id: 'AUTH-2026-2085', patient: 'Patient D-4012', payer: 'Cigna PPO', type: 'Authorization', status: 'Approved', statusColor: '#278A6B', bg: '#f0faf5' },
  { id: 'VER-2026-1054', patient: 'Patient E-5019', payer: 'Humana', type: 'Verification', status: 'Verified', statusColor: '#278A6B', bg: '#f0faf5' },
]

const statCards = [
  { label: 'Total Requests', value: '65', icon: Activity, color: '#0B3D62', bg: '#eef6f8' },
  { label: 'Pending Verifications', value: '12', icon: Clock, color: '#D89B2B', bg: '#fffbf0' },
  { label: 'Auth Requests', value: '23', icon: Info, color: '#1BA098', bg: '#f0fafa' },
  { label: 'Approved', value: '38', icon: CheckCircle2, color: '#278A6B', bg: '#f0faf5' },
  { label: 'Add. Info Required', value: '8', icon: AlertCircle, color: '#D89B2B', bg: '#fffbf0' },
  { label: 'Denied', value: '5', icon: XCircle, color: '#C94A4A', bg: '#fff5f5' },
]

export default function DashboardPreviewSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 bg-[#F7F9FA]" aria-labelledby="dashboard-preview-heading">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">
            Client Dashboard
          </p>
          <h2
            id="dashboard-preview-heading"
            className="text-[2rem] lg:text-[2.4rem] font-bold text-[#0B3D62] leading-tight"
          >
            Full Visibility Into Every Request
          </h2>
          <p className="mt-4 text-[#5A6B78] text-base lg:text-[17px] max-w-[520px] mx-auto leading-[1.65]">
            Your dedicated portal gives your team real-time access to verification status,
            authorization progress and turnaround metrics.
          </p>
          <div className="mt-3 inline-block px-3 py-1 rounded-full bg-[#EEF6F8] border border-[#DCE5EA] text-[12px] text-[#5A6B78]">
            Sample data shown — no real patient information
          </div>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="rounded-2xl border border-[#DCE5EA] bg-white shadow-xl overflow-hidden"
        >
          {/* Browser bar */}
          <div className="flex items-center gap-2 px-5 py-3.5 bg-[#0B3D62] border-b border-[#0f4570]">
            <div className="flex gap-1.5">
              {['#C94A4A', '#D89B2B', '#278A6B'].map((c) => (
                <div key={c} className="w-3 h-3 rounded-full" style={{ background: c + 'aa' }} />
              ))}
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-[#ffffff10] rounded px-3 py-1 text-[11px] text-white/40 font-mono max-w-[320px]">
                portal.u2collective.com/dashboard
              </div>
            </div>
          </div>

          <div className="flex min-h-0">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-[200px] border-r border-[#DCE5EA] bg-[#F7F9FA] shrink-0">
              <div className="p-4 border-b border-[#DCE5EA]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-[6px] bg-[#0B3D62] flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">U2</span>
                  </div>
                  <span className="text-[12px] font-semibold text-[#0B3D62]">Client Portal</span>
                </div>
              </div>
              <nav className="p-3 flex flex-col gap-0.5">
                {['Dashboard', 'Verifications', 'Authorizations', 'Documents', 'Reports', 'Settings'].map((item, i) => (
                  <div
                    key={item}
                    className={`px-3 py-2 rounded-lg text-[12px] font-medium cursor-default ${
                      i === 0 ? 'bg-[#EEF6F8] text-[#1BA098]' : 'text-[#5A6B78] hover:bg-[#EEF6F8]'
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 p-5 overflow-auto">
              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
                {statCards.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl p-3.5 border border-[#DCE5EA]"
                    style={{ background: s.bg }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <s.icon size={14} style={{ color: s.color }} />
                      <span className="text-[11px] text-[#5A6B78]">{s.label}</span>
                    </div>
                    <div className="text-[22px] font-bold" style={{ color: s.color }}>
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
                {/* Line chart */}
                <div className="lg:col-span-2 rounded-xl border border-[#DCE5EA] bg-white p-4">
                  <div className="text-[12px] font-semibold text-[#0B3D62] mb-4">
                    Request Volume — This Week
                  </div>
                  <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={lineData}>
                      <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#5A6B78' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#5A6B78' }} axisLine={false} tickLine={false} width={24} />
                      <Tooltip
                        contentStyle={{ fontSize: 11, border: '1px solid #DCE5EA', borderRadius: 8, padding: '6px 10px' }}
                      />
                      <Line type="monotone" dataKey="verified" stroke="#1BA098" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="authorized" stroke="#0B3D62" strokeWidth={2} dot={false} strokeDasharray="4 2" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie chart */}
                <div className="rounded-xl border border-[#DCE5EA] bg-white p-4">
                  <div className="text-[12px] font-semibold text-[#0B3D62] mb-2">
                    Status Distribution
                  </div>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={62}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend
                        iconSize={8}
                        wrapperStyle={{ fontSize: 10 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent activity table */}
              <div className="rounded-xl border border-[#DCE5EA] bg-white overflow-hidden">
                <div className="px-4 py-3 border-b border-[#DCE5EA] flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#0B3D62]">Recent Activity</span>
                  <span className="text-[11px] text-[#1BA098] font-medium cursor-pointer">View All</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px]">
                    <thead>
                      <tr className="border-b border-[#F0F4F7]">
                        {['Request ID', 'Patient Ref.', 'Payer', 'Type', 'Status'].map((h) => (
                          <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-[#5A6B78] uppercase tracking-wide">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {recentRows.map((row, i) => (
                        <tr key={row.id} className={i % 2 === 0 ? 'bg-[#FAFCFD]' : 'bg-white'}>
                          <td className="px-4 py-2.5 text-[11px] font-mono font-semibold text-[#0B3D62]">{row.id}</td>
                          <td className="px-4 py-2.5 text-[11px] text-[#3a5060]">{row.patient}</td>
                          <td className="px-4 py-2.5 text-[11px] text-[#5A6B78]">{row.payer}</td>
                          <td className="px-4 py-2.5 text-[11px] text-[#5A6B78]">{row.type}</td>
                          <td className="px-4 py-2.5">
                            <span
                              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                              style={{ color: row.statusColor, background: row.bg }}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
