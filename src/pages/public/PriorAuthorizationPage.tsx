import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CheckCircle, FileText, Send, RefreshCw, AlertCircle, Scale, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Breadcrumb from '@/components/ui/Breadcrumb'

const SERVICES = [
  { icon: FileText, title: 'Documentation Preparation', body: 'We review payer-specific requirements and prepare all supporting clinical documentation for submission.' },
  { icon: Send, title: 'Timely Submission', body: 'Requests are submitted through the appropriate payer portal or fax channel promptly after intake.' },
  { icon: RefreshCw, title: 'Active Status Tracking', body: 'Each request is monitored through the payer review cycle with proactive follow-up on pending cases.' },
  { icon: CheckCircle, title: 'Approval Documentation', body: 'Approval numbers, validity dates and clinical limitations are documented and communicated to your team.' },
  { icon: AlertCircle, title: 'Denial Management', body: 'Denial reasons are reviewed and appeal documentation prepared when clinical criteria support an appeal.' },
  { icon: Scale, title: 'Appeal Support', body: 'We coordinate peer-to-peer requests, prepare appeal letters and track appeal outcomes through resolution.' },
  { icon: Clock, title: 'Expiration Monitoring', body: 'Active authorizations are monitored with advance notification before expiration to prevent service disruptions.' },
]

const STATUSES = [
  { label: 'Approved', color: '#278A6B', bg: '#f0faf5' },
  { label: 'Partially Approved', color: '#D89B2B', bg: '#fffbf0' },
  { label: 'Pending Payer Response', color: '#1BA098', bg: '#e6f7f7' },
  { label: 'Peer-to-Peer Required', color: '#0B3D62', bg: '#eef6f8' },
  { label: 'Appeal In Progress', color: '#D89B2B', bg: '#fffbf0' },
  { label: 'Denied', color: '#C94A4A', bg: '#fff5f5' },
]

export default function PriorAuthorizationPage() {
  return (
    <>
      <Helmet>
        <title>Prior Authorization Services | U2 Collective</title>
        <meta name="description" content="End-to-end prior authorization management — submission, tracking, denial support and appeals. Let specialists handle payer follow-up while your team focuses on care." />
        <link rel="canonical" href="https://u2collective.com/services/prior-authorization" />
      </Helmet>

      <div className="bg-[#EEF6F8] border-b border-[#DCE5EA]">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <Breadcrumb items={[{ label: 'Services' }, { label: 'Prior Authorization' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#062A46] to-[#0B3D62] py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-[680px]">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
              className="text-[#22B8B5] text-sm font-semibold uppercase tracking-widest mb-4">
              Service Overview
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.55 }}
              className="text-[2.4rem] lg:text-[3rem] font-bold text-white leading-[1.06] mb-5">
              Prior Authorization—
              <span className="text-[#22B8B5]"> End-to-End Management</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5 }}
              className="text-[#93BAD0] text-lg leading-[1.65] mb-8">
              We manage the entire prior authorization process—from documentation preparation and
              submission to payer follow-up, denial review and appeal coordination—so your clinical
              staff can remain focused on patient care.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
              className="flex flex-wrap gap-3">
              <Link to="/contact"><Button size="lg">Get Started <ArrowRight size={16} /></Button></Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="secondary" className="border-white/25 text-white hover:bg-white/10 bg-transparent">
                  View Workflow
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What we manage */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">Full-Scope Management</p>
            <h2 className="text-[2rem] lg:text-[2.3rem] font-bold text-[#0B3D62] max-w-[560px] mx-auto leading-tight">
              Every Step of the Authorization Cycle Covered
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="p-6 rounded-xl border border-[#DCE5EA] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 bg-[#F7F9FA] hover:bg-white"
              >
                <div className="w-10 h-10 rounded-lg bg-[#EEF6F8] flex items-center justify-center mb-4">
                  <s.icon size={18} className="text-[#1BA098]" strokeWidth={1.8} />
                </div>
                <h3 className="font-semibold text-[#0B3D62] text-[15px] mb-1.5">{s.title}</h3>
                <p className="text-[#5A6B78] text-[13px] leading-[1.65]">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Authorization statuses */}
      <section className="py-16 bg-[#EEF6F8]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">Complete Tracking</p>
              <h2 className="text-[2rem] font-bold text-[#0B3D62] mb-4">Every Status, Every Payer Response</h2>
              <p className="text-[#5A6B78] text-[15px] leading-[1.7] mb-6">
                Your portal dashboard reflects the true status of every request across the complete
                payer review cycle—from initial submission through final resolution.
              </p>
              <p className="text-[#5A6B78] text-[14px] leading-[1.65]">
                Status changes trigger automatic notifications to your team so nothing falls through
                the cracks and follow-up happens on time.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {STATUSES.map((s) => (
                <div key={s.label} className="flex items-center gap-2.5 px-4 py-3.5 rounded-lg bg-white border border-[#DCE5EA]">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                  <span className="text-[13px] font-semibold" style={{ color: s.color }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-[#DCE5EA]">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <h2 className="text-[2rem] font-bold text-[#0B3D62] mb-4">Stop Chasing Payers. Start Approving Procedures.</h2>
          <p className="text-[#5A6B78] text-[16px] mb-7">
            Talk to a specialist about your authorization volume and how we fit into your existing workflow.
          </p>
          <Link to="/contact"><Button size="lg">Schedule a Free Consultation</Button></Link>
        </div>
      </section>
    </>
  )
}
