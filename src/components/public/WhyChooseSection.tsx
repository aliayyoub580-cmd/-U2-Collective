import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Lock, Globe, Layers, User, BarChart2 } from 'lucide-react'

const DIFFERENTIATORS = [
  {
    icon: Zap,
    title: 'Same-Day or 24–48 Hour Turnaround',
    body: 'Most verification requests completed the same business day. Authorization submissions managed within 24–48 hours based on payer requirements.',
    accent: '#D89B2B',
  },
  {
    icon: Lock,
    title: 'HIPAA-Aligned Secure Workflows',
    body: 'Designed to support HIPAA-aligned data handling with access controls, audit logs and secure document workflows throughout.',
    accent: '#0B3D62',
  },
  {
    icon: Globe,
    title: 'Medicare, Medicaid & Commercial Payers',
    body: 'Experienced with government programs and commercial payer portals, reducing submission errors across your payer mix.',
    accent: '#1BA098',
  },
  {
    icon: Layers,
    title: 'Major EHR & PMS Compatibility',
    body: 'Results documented directly into your existing workflow, reducing duplicate entry and keeping your team in their system.',
    accent: '#1BA098',
  },
  {
    icon: User,
    title: 'Dedicated Account Specialist',
    body: 'A consistent point of contact who understands your specialty, payer mix and workflow—not a rotating support queue.',
    accent: '#278A6B',
  },
  {
    icon: BarChart2,
    title: 'Real-Time Dashboard & Reporting',
    body: 'Track verification status, authorization progress and turnaround metrics through your secure client dashboard.',
    accent: '#0B3D62',
  },
]

export default function WhyChooseSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 bg-white" aria-labelledby="why-choose-heading">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">
            Why U2 Collective
          </p>
          <h2
            id="why-choose-heading"
            className="text-[2rem] lg:text-[2.4rem] font-bold text-[#0B3D62] leading-tight max-w-[600px] mx-auto"
          >
            Built for Healthcare Operations Teams
          </h2>
          <p className="mt-4 text-[#5A6B78] text-base lg:text-[17px] max-w-[520px] mx-auto leading-[1.65]">
            Purpose-built workflows, dedicated expertise and transparent reporting—everything
            your revenue cycle team needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DIFFERENTIATORS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 * i }}
              className="group p-7 rounded-xl border border-[#DCE5EA] bg-[#F7F9FA] hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                style={{ background: `${item.accent}15` }}
              >
                <item.icon size={20} style={{ color: item.accent }} strokeWidth={1.8} />
              </div>
              <h3 className="font-semibold text-[#0B3D62] text-[16px] mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-[#5A6B78] text-[14px] leading-[1.65]">{item.body}</p>
            </motion.div>
          ))}
        </div>

        {/* SOC 2 note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-[#DCE5EA] bg-[#F7F9FA] text-[12px] text-[#5A6B78]">
            SOC 2 readiness / certification — placeholder (to be confirmed)
          </span>
        </motion.div>
      </div>
    </section>
  )
}
