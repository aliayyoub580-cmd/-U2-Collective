import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle, Shield, ClipboardList, FileCheck, RefreshCw, Bell } from 'lucide-react'

const VERIFICATION_ITEMS = [
  'Coverage status & plan type',
  'Copay, coinsurance & deductible',
  'Out-of-pocket balance remaining',
  'Referral requirements',
  'Plan limitations & exclusions',
  'Network participation status',
  'Effective & termination dates',
]

const AUTH_ITEMS = [
  'Payer-specific documentation requirements',
  'Submission preparation & coordination',
  'Clinical document coordination',
  'Real-time status follow-up',
  'Approval & denial tracking',
  'Appeal support & documentation',
  'Expiration monitoring & alerts',
]

function DashboardPreview() {
  return (
    <div className="rounded-xl border border-[#DCE5EA] bg-white shadow-lg overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#0B3D62] border-b border-[#0f4a75]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C94A4A]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#D89B2B]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#278A6B]/80" />
        </div>
        <span className="text-[11px] text-white/50 font-mono">U2 Collective — Verification Dashboard</span>
        <div className="w-16" />
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-[#DCE5EA] border-b border-[#DCE5EA]">
        {[
          { label: 'Verified Today', value: '34', color: '#278A6B' },
          { label: 'Pending Auth', value: '12', color: '#D89B2B' },
          { label: 'Avg. Turnaround', value: '3.2h', color: '#1BA098' },
        ].map((s) => (
          <div key={s.label} className="px-4 py-4 text-center">
            <div className="text-[22px] font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[11px] text-[#5A6B78] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
      {/* Table */}
      <div className="p-4">
        <div className="text-[11px] font-semibold text-[#5A6B78] uppercase tracking-wide mb-2 px-2">
          Recent Requests
        </div>
        {[
          { id: 'VER-2026-1048', patient: 'Patient A-1042', payer: 'BlueCross PPO', status: 'Verified', statusColor: '#278A6B', statusBg: '#f0faf5' },
          { id: 'AUTH-2026-2082', patient: 'Patient B-2087', payer: 'Aetna HMO', status: 'Pending', statusColor: '#D89B2B', statusBg: '#fffbf0' },
          { id: 'VER-2026-1051', patient: 'Patient C-3041', payer: 'UnitedHealth', status: 'In Review', statusColor: '#0B3D62', statusBg: '#eef6f8' },
          { id: 'AUTH-2026-2085', patient: 'Patient D-4012', payer: 'Cigna', status: 'Approved', statusColor: '#278A6B', statusBg: '#f0faf5' },
        ].map((row) => (
          <div key={row.id} className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-[#F7F9FA] transition-colors">
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold text-[#0B3D62]">{row.id}</span>
              <span className="text-[11px] text-[#5A6B78]">{row.patient} · {row.payer}</span>
            </div>
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ color: row.statusColor, background: row.statusBg }}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ServiceOverviewSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 bg-white" aria-labelledby="services-heading">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">
            Core Services
          </p>
          <h2
            id="services-heading"
            className="text-[2rem] lg:text-[2.4rem] font-bold text-[#0B3D62] leading-tight"
          >
            Two Services. One Seamless Workflow.
          </h2>
          <p className="mt-4 text-[#5A6B78] text-base lg:text-[17px] max-w-[560px] mx-auto leading-[1.65]">
            From eligibility checks to authorization approvals, we manage every step between
            scheduling and claim submission.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Service cards */}
          <div className="flex flex-col gap-6">
            {/* Insurance Verification */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="rounded-xl border border-[#DCE5EA] overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-[#DCE5EA] bg-[#EEF6F8] flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1BA098]/15 flex items-center justify-center">
                  <ClipboardList size={18} className="text-[#1BA098]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B3D62] text-base">Insurance Verification</h3>
                  <p className="text-[#5A6B78] text-[13px]">Real-time eligibility &amp; benefits confirmation</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="grid grid-cols-1 gap-2.5">
                  {VERIFICATION_ITEMS.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[14px] text-[#3a5060]">
                      <CheckCircle size={14} className="text-[#278A6B] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Prior Authorization */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="rounded-xl border border-[#DCE5EA] overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-[#DCE5EA] bg-[#EEF6F8] flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0B3D62]/10 flex items-center justify-center">
                  <Shield size={18} className="text-[#0B3D62]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B3D62] text-base">Prior Authorization</h3>
                  <p className="text-[#5A6B78] text-[13px]">End-to-end auth management &amp; follow-up</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="grid grid-cols-1 gap-2.5">
                  {AUTH_ITEMS.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[14px] text-[#3a5060]">
                      <FileCheck size={14} className="text-[#1BA098] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right: Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:sticky lg:top-24"
          >
            <div className="mb-4 flex items-center gap-2">
              <RefreshCw size={13} className="text-[#1BA098]" />
              <span className="text-[13px] text-[#5A6B78]">Live dashboard preview — sample data only</span>
            </div>
            <DashboardPreview />
            <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-[#EEF6F8] border border-[#DCE5EA]">
              <Bell size={13} className="text-[#1BA098] mt-0.5 shrink-0" />
              <p className="text-[12px] text-[#5A6B78] leading-relaxed">
                Real-time status updates keep your team informed at every step—from submission to approval.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
