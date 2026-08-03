import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CalendarCheck, Clock, ShieldAlert, PhoneCall, Sparkles, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Breadcrumb from '@/components/ui/Breadcrumb'

const SCHEDULING_FEATURES = [
  'Multi-Location & Provider Calendar Coordination',
  'Pre-Registration & Insurance Eligibility Screening',
  'Automated SMS & Email Appointment Reminders',
  'Patient Self-Scheduling Portal Integration',
  'No-Show & Cancellation Recovery Workflows',
  'Specialty-Specific Intake Questionnaire Collection',
  'Recall & Recurring Appointment Tracking',
  'HIPAA-Compliant Patient Communication',
]

const BENEFITS = [
  { icon: CalendarCheck, title: '85% Reduced No-Shows', body: 'Automated multi-channel reminders and confirmation calls ensure patients arrive on time.' },
  { icon: ShieldAlert, title: 'Front-End Eligibility Filter', body: 'Verify insurance coverage and referral prerequisites during scheduling to prevent day-of cancellations.' },
  { icon: PhoneCall, title: 'Offload Front-Desk Calls', body: 'Reduce call waiting times and phone volume for your clinic staff through structured scheduling support.' },
  { icon: Sparkles, title: 'Optimized Provider Schedules', body: 'Intelligent booking slots tailored to specialty visit types, provider buffer times, and equipment availability.' },
  { icon: Clock, title: 'Faster Intake & Check-In', body: 'Digital pre-registration captures demographics and insurance cards prior to appointment day.' },
  { icon: CheckCircle, title: 'EHR/PM Real-Time Sync', body: 'Direct integration with major practice management platforms ensuring instant appointment synchronization.' },
]

export default function AppointmentSchedulingPage() {
  return (
    <>
      <Helmet>
        <title>Appointment Scheduling & Front-Desk Services | U2 Collective</title>
        <meta
          name="description"
          content="Streamlined patient appointment scheduling services. Reduce no-shows, verify insurance upfront, and optimize provider clinic calendars with U2 Collective."
        />
        <link rel="canonical" href="https://u2collective.com/services/appointment-scheduling" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-[#EEF6F8] border-b border-[#DCE5EA]">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <Breadcrumb items={[{ label: 'Services' }, { label: 'Appointment Scheduling' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#062A46] to-[#0B3D62] py-20 text-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-[720px]">
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
              className="text-[2.4rem] lg:text-[3rem] font-bold leading-[1.08] mb-5"
            >
              Patient Appointment Scheduling—
              <span className="text-[#22B8B5]"> Optimized Clinic Access</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.5 }}
              className="text-[#93BAD0] text-lg leading-[1.65] mb-8"
            >
              Fill provider schedules efficiently while reducing no-shows and front-desk phone friction.
              We combine automated reminder tech with expert scheduling coordination.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
              className="flex flex-wrap gap-3"
            >
              <Link to="/contact">
                <Button size="lg">Get Started <ArrowRight size={16} /></Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="secondary" className="border-white/25 text-white hover:bg-white/10 bg-transparent">
                  How It Works
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Features */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">Core Capabilities</p>
              <h2 className="text-[2rem] lg:text-[2.3rem] font-bold text-[#0B3D62] leading-tight mb-5">
                End-to-End Scheduling & Intake
              </h2>
              <p className="text-[#5A6B78] text-[16px] leading-[1.7] mb-8">
                Our scheduling services eliminate gaps in provider calendars and collect vital clinical and financial data before the patient arrives.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SCHEDULING_FEATURES.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-[#1BA098] shrink-0 mt-0.5" />
                    <span className="text-[14px] text-[#0B3D62] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#F7F9FA] border border-[#DCE5EA] rounded-2xl p-8 shadow-sm">
              <div className="text-4xl font-bold text-[#0B3D62] mb-2">85%</div>
              <div className="text-sm font-semibold text-[#1BA098] uppercase tracking-wide mb-4 font-mono">No-Show Reduction</div>
              <p className="text-sm text-[#5A6B78] leading-relaxed mb-6">
                Proactive scheduling workflows keep your appointment slots filled and minimize lost clinical revenue from unexpected patient cancellations.
              </p>
              <div className="space-y-3 pt-4 border-t border-[#DCE5EA]">
                <div className="flex justify-between text-xs text-[#5A6B78]">
                  <span>Automated Reminders</span>
                  <span className="font-semibold text-[#0B3D62]">SMS, Email & Phone</span>
                </div>
                <div className="flex justify-between text-xs text-[#5A6B78]">
                  <span>Insurance Pre-Screening</span>
                  <span className="font-semibold text-[#0B3D62]">Real-Time Upfront</span>
                </div>
                <div className="flex justify-between text-xs text-[#5A6B78]">
                  <span>PM/EHR Integration</span>
                  <span className="font-semibold text-[#0B3D62]">Bi-Directional Sync</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[#F7F9FA]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">Service Value</p>
            <h2 className="text-[2rem] font-bold text-[#0B3D62]">Scheduling Service Benefits</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white p-7 rounded-xl border border-[#DCE5EA] shadow-sm">
                <b.icon className="w-9 h-9 text-[#1BA098] mb-4" />
                <h3 className="text-lg font-bold text-[#0B3D62] mb-2">{b.title}</h3>
                <p className="text-sm text-[#5A6B78] leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
