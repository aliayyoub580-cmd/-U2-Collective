import { Helmet } from 'react-helmet-async'
import { Download, TrendingUp, Clock, XCircle, CheckCircle2 } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend,
} from 'recharts'

const monthlyData = [
  { month: 'Feb', verifications: 180, authorizations: 120 },
  { month: 'Mar', verifications: 210, authorizations: 145 },
  { month: 'Apr', verifications: 195, authorizations: 132 },
  { month: 'May', verifications: 240, authorizations: 168 },
  { month: 'Jun', verifications: 228, authorizations: 155 },
  { month: 'Jul', verifications: 248, authorizations: 186 },
]

const turnaroundData = [
  { week: 'W1', hours: 4.2 }, { week: 'W2', hours: 3.8 }, { week: 'W3', hours: 5.1 },
  { week: 'W4', hours: 3.5 }, { week: 'W5', hours: 4.0 }, { week: 'W6', hours: 3.2 },
]

const payerData = [
  { payer: 'BlueCross', avg_hrs: 3.2 }, { payer: 'Aetna', avg_hrs: 4.8 },
  { payer: 'United', avg_hrs: 3.9 }, { payer: 'Cigna', avg_hrs: 5.2 },
  { payer: 'Humana', avg_hrs: 4.1 },
]

const SUMMARY = [
  { icon: CheckCircle2, label: 'Total Approved', value: '112', color: '#278A6B', bg: '#f0faf5' },
  { icon: XCircle, label: 'Total Denied', value: '22', color: '#C94A4A', bg: '#fff5f5' },
  { icon: Clock, label: 'Avg. Turnaround', value: '3.8 hrs', color: '#D89B2B', bg: '#fffbf0' },
  { icon: TrendingUp, label: 'Denial Rate', value: '11.8%', color: '#0B3D62', bg: '#eef6f8' },
]

export default function ReportsPage() {
  const exportCsv = () => {
    const rows = ['Month,Verifications,Authorizations', ...monthlyData.map((row) => `${row.month},${row.verifications},${row.authorizations}`)]
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `u2-collective-report-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Helmet><title>Reports | U2 Collective Admin</title></Helmet>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[1.5rem] font-bold text-[#0B3D62]">Reports</h1>
            <p className="text-[#5A6B78] text-[14px] mt-0.5">Platform performance metrics — sample data</p>
          </div>
          <div className="flex gap-2">
            <button onClick={exportCsv} aria-label="Export report as CSV" className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium text-[#0B3D62] border border-[#DCE5EA] rounded-lg hover:bg-[#EEF6F8] transition-colors">
              <Download size={14} />CSV
            </button>
            <button onClick={() => window.print()} aria-label="Print or save report as PDF" className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium text-[#0B3D62] border border-[#DCE5EA] rounded-lg hover:bg-[#EEF6F8] transition-colors">
              <Download size={14} />PDF
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {SUMMARY.map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-[#DCE5EA] p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-[11px] text-[#5A6B78]">{s.label}</div>
                <div className="text-[1.4rem] font-bold" style={{ color: s.color }}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Volume chart */}
          <div className="bg-white rounded-xl border border-[#DCE5EA] p-5">
            <h2 className="text-[14px] font-semibold text-[#0B3D62] mb-4">Monthly Request Volume</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F7" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#5A6B78' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#5A6B78' }} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={{ fontSize: 12, border: '1px solid #DCE5EA', borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="verifications" fill="#1BA098" radius={[3,3,0,0]} />
                <Bar dataKey="authorizations" fill="#0B3D62" opacity={0.6} radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Turnaround chart */}
          <div className="bg-white rounded-xl border border-[#DCE5EA] p-5">
            <h2 className="text-[14px] font-semibold text-[#0B3D62] mb-4">Avg. Turnaround Time (Hours)</h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={turnaroundData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F7" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#5A6B78' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#5A6B78' }} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={{ fontSize: 12, border: '1px solid #DCE5EA', borderRadius: 8 }} />
                <Line type="monotone" dataKey="hours" stroke="#D89B2B" strokeWidth={2.5} dot={{ r: 4, fill: '#D89B2B' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payer response times */}
        <div className="bg-white rounded-xl border border-[#DCE5EA] p-5">
          <h2 className="text-[14px] font-semibold text-[#0B3D62] mb-4">Avg. Payer Response Time (Hours)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={payerData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F7" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#5A6B78' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="payer" tick={{ fontSize: 11, fill: '#5A6B78' }} axisLine={false} tickLine={false} width={72} />
              <Tooltip contentStyle={{ fontSize: 12, border: '1px solid #DCE5EA', borderRadius: 8 }} />
              <Bar dataKey="avg_hrs" fill="#1BA098" radius={[0,3,3,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
