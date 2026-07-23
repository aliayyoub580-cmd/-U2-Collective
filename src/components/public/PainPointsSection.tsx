import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { AlertCircle, Clock, Users, TrendingDown } from 'lucide-react'

const CARDS = [
  {
    icon: AlertCircle,
    title: 'Eligibility Errors',
    body: 'Inaccurate coverage, deductible or copay information can create denials and unexpected patient balances that damage trust and require costly rework.',
    accent: '#C94A4A',
    bg: '#fff5f5',
  },
  {
    icon: Clock,
    title: 'Authorization Delays',
    body: 'Missing payer requirements can postpone scheduled procedures, disrupt patient care and increase the administrative burden on your clinical team.',
    accent: '#D89B2B',
    bg: '#fffbf0',
  },
  {
    icon: Users,
    title: 'Staff Workload',
    body: 'Manual portal checks, phone holds and repeated follow-ups consume valuable staff time that could be directed toward patient care and operations.',
    accent: '#1BA098',
    bg: '#f0fafa',
  },
  {
    icon: TrendingDown,
    title: 'Revenue Leakage',
    body: 'Missed pre-authorization requirements result in avoidable write-offs, delayed reimbursement and disrupted cash flow across your revenue cycle.',
    accent: '#0B3D62',
    bg: '#eef6f8',
  },
]

function Card({ card, index }: { card: typeof CARDS[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="group relative bg-white rounded-xl border border-[#DCE5EA] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Top accent bar */}
      <div className="h-[3px] w-full" style={{ background: card.accent }} />
      <div className="p-7 flex flex-col gap-4 flex-1">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center"
          style={{ background: card.bg }}
        >
          <card.icon size={20} style={{ color: card.accent }} strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="text-[#0B3D62] font-semibold text-[17px] mb-2">{card.title}</h3>
          <p className="text-[#5A6B78] text-[15px] leading-[1.65]">{card.body}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function PainPointsSection() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section className="py-20 bg-[#F7F9FA]" aria-labelledby="pain-points-heading">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">
            Why Revenue Gets Delayed
          </p>
          <h2
            id="pain-points-heading"
            className="text-[2rem] lg:text-[2.4rem] font-bold text-[#0B3D62] leading-tight max-w-[680px] mx-auto"
          >
            Small Verification Errors Create{' '}
            <span className="text-[#C94A4A]">Expensive Revenue Problems</span>
          </h2>
          <p className="mt-4 text-[#5A6B78] text-base lg:text-[17px] leading-[1.65] max-w-[600px] mx-auto">
            Incomplete eligibility checks and missed authorization requirements delay care,
            increase rework and affect cash flow across your entire practice.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARDS.map((card, i) => (
            <Card key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
