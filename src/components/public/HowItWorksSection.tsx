import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Search, FileText, Send, RefreshCw, Flag } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    icon: Calendar,
    title: 'Appointment Scheduling',
    body: 'Patient intake details and scheduling are coordinated seamlessly across provider calendars to initiate the verification workflow.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Real-Time Eligibility Verification',
    body: 'Coverage, plan status, deductible, copay and benefits are reviewed before the scheduled visit to prevent billing surprises.',
  },
  {
    number: '03',
    icon: FileText,
    title: 'Benefits Documentation',
    body: 'Verification results are documented clearly in your EHR, PMS or secure workflow for staff reference and compliance.',
  },
  {
    number: '04',
    icon: Send,
    title: 'Prior Authorization Submission',
    body: 'Payer-specific requirements and supporting documents are prepared, reviewed and submitted on your behalf.',
  },
  {
    number: '05',
    icon: RefreshCw,
    title: 'Tracking & Follow-Up',
    body: 'Authorization status is monitored through approval, request for information or denial—with proactive updates to your team.',
  },
  {
    number: '06',
    icon: Flag,
    title: 'Pre-Claim Risk Flagging',
    body: 'Missing information and authorization risks are surfaces before claim submission to protect your reimbursement.',
  },
]

export default function HowItWorksSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 bg-[#EEF6F8]" aria-labelledby="how-it-works-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">
            The Process
          </p>
          <h2
            id="how-it-works-heading"
            className="text-[2rem] lg:text-[2.4rem] font-bold text-[#0B3D62] leading-tight"
          >
            A Clear Workflow From Scheduling to Approval
          </h2>
          <p className="mt-4 text-[#5A6B78] text-base lg:text-[17px] max-w-[540px] mx-auto leading-[1.65]">
            Every step is handled with clinical precision so your team can focus on what matters most.
          </p>
        </motion.div>

        {/* Desktop: Horizontal steps (6 steps in 1 line) */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line connecting centers of 6 columns */}
            <div className="absolute top-[2.1rem] left-[calc(100%/12)] right-[calc(100%/12)] h-[2px] bg-gradient-to-r from-[#DCE5EA] via-[#1BA098]/40 to-[#DCE5EA]" aria-hidden="true" />
            <div className="grid grid-cols-6 gap-3 lg:gap-4">
              {STEPS.map((step, i) => (
                <StepCard key={step.number} step={step} index={i} inView={inView} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden flex flex-col gap-0">
          {STEPS.map((step, i) => (
            <MobileStep key={step.number} step={step} index={i} inView={inView} isLast={i === STEPS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, index, inView }: { step: typeof STEPS[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.09 }}
      className="flex flex-col items-center text-center gap-4"
    >
      {/* Circle icon */}
      <div className="relative z-10 w-[3.5rem] h-[3.5rem] rounded-full bg-white border-2 border-[#1BA098] flex items-center justify-center shadow-md">
        <step.icon size={20} className="text-[#1BA098]" strokeWidth={1.8} />
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#0B3D62] text-white text-[9px] font-bold flex items-center justify-center">
          {step.number}
        </span>
      </div>
      <div className="pt-2">
        <h3 className="font-semibold text-[#0B3D62] text-[13px] xl:text-[14px] leading-snug mb-1.5">{step.title}</h3>
        <p className="text-[#5A6B78] text-[12px] xl:text-[13px] leading-[1.5]">{step.body}</p>
      </div>
    </motion.div>
  )
}

function MobileStep({
  step,
  index,
  inView,
  isLast,
}: {
  step: typeof STEPS[0]
  index: number
  inView: boolean
  isLast: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.1 }}
      className="flex gap-4"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-white border-2 border-[#1BA098] flex items-center justify-center shadow-sm shrink-0">
          <step.icon size={16} className="text-[#1BA098]" strokeWidth={1.8} />
        </div>
        {!isLast && <div className="w-[2px] flex-1 bg-[#DCE5EA] mt-1 mb-1" />}
      </div>
      {/* Content */}
      <div className="pb-8 pt-1.5 flex-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-bold text-[#1BA098] uppercase tracking-widest">
            Step {step.number}
          </span>
        </div>
        <h3 className="font-semibold text-[#0B3D62] text-[16px] mb-1.5">{step.title}</h3>
        <p className="text-[#5A6B78] text-[14px] leading-[1.65]">{step.body}</p>
      </div>
    </motion.div>
  )
}
