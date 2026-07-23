import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, FileText, Shield, TrendingUp, Users, ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Breadcrumb from '@/components/ui/Breadcrumb'

const WHAT_WE_VERIFY = [
  'Coverage status and plan type',
  'Copay, coinsurance and deductible',
  'Out-of-pocket balance remaining',
  'Referral and authorization requirements',
  'Plan limitations and exclusions',
  'Network participation status',
  'Effective and termination dates',
  'Secondary coverage coordination',
]

const BENEFITS = [
  { icon: Clock, title: 'Same-Day Turnaround', body: 'Most verification requests completed the same business day, reducing delays before scheduled visits.' },
  { icon: Shield, title: 'Accurate, Complete Results', body: 'Multi-source verification that goes beyond portal checks to confirm deductibles, copay and limitations.' },
  { icon: FileText, title: 'EHR-Ready Documentation', body: 'Results formatted for direct documentation in your EHR or practice management system.' },
  { icon: TrendingUp, title: 'Reduced Claim Denials', body: 'Front-end accuracy prevents the downstream eligibility errors that trigger costly claim rework.' },
  { icon: Users, title: 'Staff Time Saved', body: 'Offloading manual portal checks and payer calls frees your staff to focus on patient-facing responsibilities.' },
  { icon: CheckCircle, title: 'Proactive Issue Flagging', body: 'Coverage gaps, inactive policies and coordination issues surfaced before the patient arrives.' },
]

const FADE = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] } }),
}

export default function InsuranceVerificationPage() {
  return (
    <>
      <Helmet>
        <title>Insurance Verification Services | U2 Collective</title>
        <meta name="description" content="Real-time insurance eligibility verification — coverage, deductibles, copay, network status and more. Reduce claim denials before the patient walks in." />
        <link rel="canonical" href="https://u2collective.com/services/insurance-verification" />
      </Helmet>

      {/* Page header */}
      <div className="bg-[#EEF6F8] border-b border-[#DCE5EA]">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <Breadcrumb items={[{ label: 'Services' }, { label: 'Insurance Verification' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#062A46] to-[#0B3D62] py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-[680px]">
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
              className="text-[#22B8B5] text-sm font-semibold uppercase tracking-widest mb-4"
            >
              Service Overview
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.55 }}
              className="text-[2.4rem] lg:text-[3rem] font-bold text-white leading-[1.06] mb-5"
            >
              Insurance Eligibility Verification—
              <span className="text-[#22B8B5]"> Before Problems Happen</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5 }}
              className="text-[#93BAD0] text-lg leading-[1.65] mb-8"
            >
              We confirm coverage status, benefits, network participation and deductible information
              before every scheduled visit—giving your team reliable data and preventing front-end
              billing errors that trigger avoidable denials.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
              className="flex flex-wrap gap-3"
            >
              <Link to="/contact"><Button size="lg">Get Started <ArrowRight size={16} /></Button></Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="secondary" className="border-white/25 text-white hover:bg-white/10 bg-transparent">
                  How It Works
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What we verify */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">What We Verify</p>
              <h2 className="text-[2rem] lg:text-[2.3rem] font-bold text-[#0B3D62] leading-tight mb-5">
                Comprehensive Coverage Confirmation
              </h2>
              <p className="text-[#5A6B78] text-[16px] leading-[1.7] mb-8">
                Our verification process goes beyond a basic eligibility check. We confirm every data
                point your billing team needs to process a clean claim the first time.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WHAT_WE_VERIFY.map((item, i) => (
                  <motion.li
                    key={item}
                    custom={i}
                    variants={FADE}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-40px' }}
                    className="flex items-start gap-2.5 text-[14px] text-[#3a5060]"
                  >
                    <CheckCircle size={15} className="text-[#278A6B] shrink-0 mt-0.5" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            {/* Info card */}
            <div className="rounded-xl border border-[#DCE5EA] overflow-hidden shadow-sm">
              <div className="bg-[#0B3D62] px-6 py-5">
                <h3 className="text-white font-semibold text-[16px]">Verification Turnaround</h3>
                <p className="text-[#93BAD0] text-[13px] mt-1">Typical completion times by request type</p>
              </div>
              <div className="divide-y divide-[#DCE5EA]">
                {[
                  { type: 'Routine Outpatient', time: 'Same Business Day', color: '#278A6B' },
                  { type: 'Specialist Visit', time: 'Same Business Day', color: '#278A6B' },
                  { type: 'Surgical/Facility', time: '24–48 Hours', color: '#D89B2B' },
                  { type: 'Behavioral Health', time: 'Same Business Day', color: '#278A6B' },
                  { type: 'Urgent / STAT', time: '2–4 Hours', color: '#1BA098' },
                ].map((r) => (
                  <div key={r.type} className="flex items-center justify-between px-6 py-4">
                    <span className="text-[14px] text-[#0B3D62] font-medium">{r.type}</span>
                    <span className="text-[13px] font-semibold" style={{ color: r.color }}>{r.time}</span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-[#F7F9FA] border-t border-[#DCE5EA]">
                <p className="text-[12px] text-[#5A6B78] italic">
                  Sample turnaround guidelines. Actual timing varies by payer and case complexity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="py-20 bg-[#F7F9FA]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">Why It Matters</p>
            <h2 className="text-[2rem] lg:text-[2.3rem] font-bold text-[#0B3D62]">
              What Accurate Verification Delivers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                custom={i}
                variants={FADE}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                className="bg-white rounded-xl border border-[#DCE5EA] p-7 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#EEF6F8] flex items-center justify-center mb-4">
                  <b.icon size={18} className="text-[#1BA098]" strokeWidth={1.8} />
                </div>
                <h3 className="font-semibold text-[#0B3D62] text-[16px] mb-2">{b.title}</h3>
                <p className="text-[#5A6B78] text-[14px] leading-[1.65]">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#062A46] to-[#0B3D62]">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <h2 className="text-[2rem] font-bold text-white mb-4">Ready to Reduce Front-End Errors?</h2>
          <p className="text-[#93BAD0] text-[16px] mb-7">
            Connect with a specialist to discuss verification volume, EHR integration and onboarding.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact"><Button size="lg">Schedule a Consultation</Button></Link>
            <a href="tel:8000000000" className="inline-flex items-center justify-center gap-2 px-6 py-4 text-[15px] font-semibold text-white border border-white/25 rounded-lg hover:bg-white/10 transition-all">
              <Phone size={16} /> (800) 000-0000
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
