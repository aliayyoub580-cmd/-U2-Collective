import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Calendar, Search, FileText, Send, RefreshCw, Flag, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Breadcrumb from '@/components/ui/Breadcrumb'

const STEPS = [
  {
    number: '01', icon: Calendar, color: '#1BA098',
    title: 'Appointment Scheduling',
    body: 'We capture patient details, verify intake information upfront, coordinate scheduling across provider calendars, and streamline clinic front-desk workflows to minimize no-shows and initiate timely verification.',
    details: ['Patient intake & registration', 'Multi-provider scheduling', 'Calendar optimization', 'Pre-visit info collection'],
  },
  {
    number: '02', icon: Search, color: '#0B3D62',
    title: 'Real-Time Eligibility Verification',
    body: 'Before every scheduled visit, we confirm coverage status, deductible, copay, out-of-pocket balances, network participation, referral requirements and plan limitations through payer portals and direct contact when needed.',
    details: ['Payer portal checks', 'Benefits documentation', 'Network status confirmation', 'Referral flag when required'],
  },
  {
    number: '03', icon: FileText, color: '#1BA098',
    title: 'Benefits Documentation',
    body: 'Verified benefits are documented in a structured format compatible with your EHR or PMS. Your team receives clear, complete information without needing to re-verify or interpret raw portal output.',
    details: ['Structured results delivered', 'EHR/PMS documentation', 'Staff notification', 'Issue flagging for review'],
  },
  {
    number: '04', icon: Send, color: '#0B3D62',
    title: 'Prior Authorization Submission',
    body: 'When prior authorization is required, we prepare all payer-specific documentation, coordinate clinical records and submit through the appropriate channel—portal, fax or phone—for each individual payer.',
    details: ['Payer requirement review', 'Clinical doc coordination', 'Timely submission', 'Confirmation tracking'],
  },
  {
    number: '05', icon: RefreshCw, color: '#D89B2B',
    title: 'Active Tracking & Follow-Up',
    body: 'Every pending authorization is monitored through the payer review cycle. We follow up proactively on delayed responses, respond to requests for additional information and coordinate peer-to-peer reviews when required.',
    details: ['Status monitoring', 'P2P coordination', 'Additional info responses', 'Real-time portal updates'],
  },
  {
    number: '06', icon: Flag, color: '#278A6B',
    title: 'Pre-Claim Risk Flagging',
    body: 'Before claim submission, outstanding authorization gaps and eligibility discrepancies are identified and communicated to your billing team—protecting reimbursement and reducing the risk of avoidable denials.',
    details: ['Auth gap identification', 'Eligibility discrepancy flags', 'Billing team alerts', 'Documentation review'],
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <Helmet>
        <title>How It Works | U2 Collective</title>
        <meta name="description" content="A clear step-by-step workflow from appointment scheduling and eligibility verification to pre-claim risk flagging. See how U2 Collective manages healthcare workflows end-to-end." />
        <link rel="canonical" href="https://u2collective.com/how-it-works" />
      </Helmet>

      <div className="bg-[#EEF6F8] border-b border-[#DCE5EA]">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <Breadcrumb items={[{ label: 'How It Works' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#062A46] to-[#0B3D62] py-20">
        <div className="max-w-[860px] mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
            className="text-[#22B8B5] text-sm font-semibold uppercase tracking-widest mb-4">
            The Process
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.55 }}
            className="text-[2.4rem] lg:text-[3rem] font-bold text-white leading-[1.06] mb-5">
            A Clear Workflow From Scheduling to Approval
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5 }}
            className="text-[#93BAD0] text-lg leading-[1.65]">
            Every step is managed by dedicated specialists working within your existing workflow—so
            your clinical and billing teams always know where each request stands.
          </motion.p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-6 pb-12 last:pb-0 relative"
              >
                {/* Vertical line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-[1.6rem] top-[4.5rem] bottom-0 w-[2px] bg-[#DCE5EA]" aria-hidden="true" />
                )}
                {/* Icon */}
                <div className="shrink-0 z-10">
                  <div
                    className="w-[3.2rem] h-[3.2rem] rounded-full bg-white border-2 flex items-center justify-center shadow-sm"
                    style={{ borderColor: step.color }}
                  >
                    <step.icon size={18} style={{ color: step.color }} strokeWidth={1.8} />
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: step.color }}>
                      Step {step.number}
                    </span>
                  </div>
                  <h2 className="text-[1.25rem] font-bold text-[#0B3D62] mb-3">{step.title}</h2>
                  <p className="text-[#5A6B78] text-[15px] leading-[1.7] mb-4">{step.body}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {step.details.map((d) => (
                      <div key={d} className="flex items-center gap-2 text-[13px] text-[#3a5060]">
                        <CheckCircle size={12} className="text-[#1BA098] shrink-0" />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F7F9FA] border-t border-[#DCE5EA]">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <h2 className="text-[2rem] font-bold text-[#0B3D62] mb-4">Ready to Simplify Your Workflow?</h2>
          <p className="text-[#5A6B78] text-[16px] mb-7">
            Talk to a specialist about how we integrate with your practice's scheduling and billing process.
          </p>
          <Link to="/contact"><Button size="lg">Schedule a Free Consultation</Button></Link>
        </div>
      </section>
    </>
  )
}
