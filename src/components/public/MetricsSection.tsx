import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// NOTE: All metrics are placeholder / sample values.
// Replace via admin content management once live data is available.
const METRICS = [
  {
    value: 'Up to 40%',
    label: 'Reduction in Preventable Denials',
    note: 'Sample placeholder — update with actual data',
  },
  {
    value: '< 4 hrs',
    label: 'Average Verification Turnaround',
    note: 'Sample placeholder — update with actual data',
  },
  {
    value: '500+',
    label: 'Monthly Eligibility Checks',
    note: 'Sample placeholder — update with actual data',
  },
  {
    value: '95%',
    label: 'Authorization Follow-Up Completion',
    note: 'Sample placeholder — update with actual data',
  },
]

export default function MetricsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      className="py-16 bg-gradient-to-br from-[#062A46] to-[#0B3D62]"
      aria-labelledby="metrics-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <p className="text-[#22B8B5] text-sm font-semibold uppercase tracking-widest mb-2">
            Results Overview
          </p>
          <h2
            id="metrics-heading"
            className="text-[1.85rem] lg:text-[2.2rem] font-bold text-white"
          >
            Performance That Protects Your Revenue
          </h2>
          <p className="text-[#93BAD0] text-sm mt-2">
            Sample values shown. Actual results vary by payer and practice.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="text-center p-6 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="text-[2.2rem] font-bold text-[#22B8B5] leading-none mb-2">
                {m.value}
              </div>
              <div className="text-white text-[14px] font-medium mb-1.5">{m.label}</div>
              <div className="text-[11px] text-[#93BAD0] italic">{m.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
