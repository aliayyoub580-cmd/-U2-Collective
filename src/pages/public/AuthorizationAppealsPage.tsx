import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  FileText, Scale, RefreshCw, Clock, CheckCircle,
  AlertTriangle, Phone, ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Breadcrumb from '@/components/ui/Breadcrumb'

const APPEAL_TYPES = [
  {
    icon: RefreshCw,
    title: 'Internal Appeal',
    body: 'A formal request submitted directly to the payer asking them to reconsider the denial using additional clinical documentation or clarification of medical necessity.',
    timeline: 'Typically 30–60 days',
    color: '#1BA098',
    bg: '#e6f7f7',
  },
  {
    icon: Scale,
    title: 'External Review',
    body: 'An independent review organization (IRO) evaluates the denial when the internal appeal is exhausted or when the denial involves urgent medical need.',
    timeline: 'Typically 45–72 hours (expedited) or 45 days',
    color: '#0B3D62',
    bg: '#eef6f8',
  },
  {
    icon: Phone,
    title: 'Peer-to-Peer Review',
    body: 'A direct clinical discussion between your provider and the payer\'s medical reviewer to address medical necessity concerns before or after a denial.',
    timeline: 'Usually within 1–3 business days',
    color: '#D89B2B',
    bg: '#fffbf0',
  },
]

const WHAT_WE_DO = [
  { icon: FileText, text: 'Review denial reason codes and payer-specific criteria' },
  { icon: CheckCircle, text: 'Identify grounds for appeal and clinical documentation required' },
  { icon: RefreshCw, text: 'Prepare and submit appeal letters with supporting clinical records' },
  { icon: Clock, text: 'Track appeal status and follow up with payers proactively' },
  { icon: Scale, text: 'Coordinate peer-to-peer scheduling with your clinical staff' },
  { icon: AlertTriangle, text: 'Document outcomes and escalate to external review when warranted' },
]

const FADE = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function AuthorizationAppealsPage() {
  return (
    <>
      <Helmet>
        <title>Authorization Appeals Support | U2 Collective</title>
        <meta
          name="description"
          content="End-to-end authorization denial management and appeal support — internal appeals, peer-to-peer reviews and external IRO coordination. Protect your reimbursement."
        />
        <link rel="canonical" href="https://u2collective.com/services/appeals" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-[#EEF6F8] border-b border-[#DCE5EA]">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <Breadcrumb
            items={[
              { label: 'Services', href: '/services/prior-authorization' },
              { label: 'Authorization Appeals' },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#062A46] to-[#0B3D62] py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-[700px]">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="text-[#22B8B5] text-sm font-semibold uppercase tracking-widest mb-4"
            >
              Service Overview
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55 }}
              className="text-[2.4rem] lg:text-[3rem] font-bold text-white leading-[1.06] mb-5"
            >
              Authorization Appeals &amp;{' '}
              <span className="text-[#22B8B5]">Denial Management</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.5 }}
              className="text-[#93BAD0] text-lg leading-[1.65] mb-8"
            >
              A denied authorization is not always final. Our specialists review every denial,
              identify clinical grounds for appeal and manage the entire reconsideration process
              — from documentation preparation through final resolution.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
              className="flex flex-wrap gap-3"
            >
              <Link to="/contact">
                <Button size="lg">
                  Start an Appeal <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold text-white border border-white/25 rounded-lg hover:bg-white/10 active:bg-white/15 transition-all duration-200">
                  How It Works
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Appeal types */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">
              Types of Appeals
            </p>
            <h2 className="text-[2rem] lg:text-[2.3rem] font-bold text-[#0B3D62] leading-tight max-w-[560px] mx-auto">
              Every Path to Reconsideration, Covered
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {APPEAL_TYPES.map((a, i) => (
              <motion.div
                key={a.title}
                custom={i}
                variants={FADE}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                className="rounded-xl border border-[#DCE5EA] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top accent */}
                <div className="h-1 w-full" style={{ background: a.color }} />
                <div className="p-7">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: a.bg }}
                  >
                    <a.icon size={20} style={{ color: a.color }} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-bold text-[#0B3D62] text-[17px] mb-3">{a.title}</h3>
                  <p className="text-[#5A6B78] text-[14px] leading-[1.7] mb-4">{a.body}</p>
                  <div className="flex items-center gap-2 pt-3 border-t border-[#DCE5EA]">
                    <Clock size={12} className="text-[#1BA098] shrink-0" />
                    <span className="text-[12px] text-[#5A6B78]">{a.timeline}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-20 bg-[#F7F9FA]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">
                Our Process
              </p>
              <h2 className="text-[2rem] font-bold text-[#0B3D62] mb-5 leading-tight">
                What We Handle From Denial to Resolution
              </h2>
              <p className="text-[#5A6B78] text-[15px] leading-[1.7] mb-6">
                When a payer denies an authorization, the window to appeal is time-sensitive.
                We act quickly — reviewing the denial, organizing supporting documentation
                and submitting through the correct channel before deadlines pass.
              </p>
              <ul className="flex flex-col gap-3">
                {WHAT_WE_DO.map((item, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={FADE}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-40px' }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EEF6F8] flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={14} className="text-[#1BA098]" />
                    </div>
                    <span className="text-[14px] text-[#3a5060] leading-[1.65]">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Outcome stat panel */}
            <div className="rounded-xl border border-[#DCE5EA] overflow-hidden shadow-sm">
              <div className="bg-[#0B3D62] px-6 py-5">
                <h3 className="text-white font-semibold text-[16px]">Appeal Outcome Tracking</h3>
                <p className="text-[#93BAD0] text-[13px] mt-1">
                  Every appeal is tracked through final resolution
                </p>
              </div>
              <div className="divide-y divide-[#DCE5EA]">
                {[
                  { label: 'Initial Denial Review',      status: 'Completed',       color: '#278A6B', bg: '#f0faf5' },
                  { label: 'Documentation Compiled',     status: 'Completed',       color: '#278A6B', bg: '#f0faf5' },
                  { label: 'Internal Appeal Submitted',  status: 'Submitted',       color: '#1BA098', bg: '#e6f7f7' },
                  { label: 'Payer Review in Progress',   status: 'Pending',         color: '#D89B2B', bg: '#fffbf0' },
                  { label: 'Peer-to-Peer (if required)', status: 'Scheduled',       color: '#D89B2B', bg: '#fffbf0' },
                  { label: 'Final Outcome Documented',   status: 'Awaiting',        color: '#9BAAB5', bg: '#F7F9FA' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between px-6 py-4">
                    <span className="text-[13px] text-[#0B3D62] font-medium">{row.label}</span>
                    <span
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ color: row.color, background: row.bg }}
                    >
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-[#F7F9FA] border-t border-[#DCE5EA]">
                <p className="text-[12px] text-[#5A6B78] italic">
                  Sample workflow shown. Actual steps vary by payer and denial type.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important note on timelines */}
      <section className="py-12 bg-[#fffbf0] border-y border-[#D89B2B]/20">
        <div className="max-w-[860px] mx-auto px-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#D89B2B]/15 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle size={18} className="text-[#D89B2B]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0B3D62] text-[15px] mb-1.5">
                Appeal Deadlines Are Strict
              </h3>
              <p className="text-[#5A6B78] text-[14px] leading-[1.7]">
                Most payers impose deadlines of 30–180 days from the date of denial to submit
                an appeal. Missing these windows forfeits your right to reconsideration.
                Contact our team as soon as you receive a denial to preserve your options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#062A46] to-[#0B3D62]">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <h2 className="text-[2rem] font-bold text-white mb-4">
            Don't Let a Denial Be the Final Answer
          </h2>
          <p className="text-[#93BAD0] text-[16px] mb-7 leading-[1.65]">
            Talk to a specialist about your denial and we'll assess the grounds for appeal
            and the documentation needed to support reconsideration.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact">
              <Button size="lg">Start an Appeal Review</Button>
            </Link>
            <a
              href="tel:8000000000"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 text-[15px] font-semibold text-white border border-white/25 rounded-lg hover:bg-white/10 transition-all"
            >
              <Phone size={16} /> (800) 000-0000
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
