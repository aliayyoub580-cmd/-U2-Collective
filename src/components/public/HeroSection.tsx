import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play, ShieldCheck, Clock, TrendingUp, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

const BENEFITS = [
  { icon: ShieldCheck, label: 'Fewer Preventable Denials', color: '#278A6B' },
  { icon: Clock, label: 'Faster Authorization Follow-Up', color: '#1BA098' },
  { icon: TrendingUp, label: 'Better Revenue Visibility', color: '#0B3D62' },
]

const TRUST_ITEMS = ['Secure workflows', 'Dedicated support', 'EHR/PMS compatible']

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

function HealthcareHeroImage() {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      className="relative mx-auto aspect-square w-full max-w-[438px]"
    >
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
        className="relative h-full overflow-hidden rounded-2xl border border-white/20 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
      >
        <img
          src="/hero-healthcare-team.png"
          alt="Healthcare professionals representing insurance verification and prior authorization support across major payer and EHR platforms"
          width="1254"
          height="1254"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#062A46]/10 via-transparent to-white/10" aria-hidden="true" />
        {!reducedMotion && (
          <motion.div
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"
            animate={{ x: ['0%', '500%'] }}
            transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3.5 }}
            aria-hidden="true"
          />
        )}
      </motion.div>
      <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-[#1BA098]/15 blur-3xl" aria-hidden="true" />
    </motion.div>
  )
}

export default function HeroSection() {
  return (
    <section aria-label="Hero" className="relative overflow-hidden bg-gradient-to-br from-[#062A46] via-[#0B3D62] to-[#0f4a75] lg:h-[570px]">
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#1BA098]/0 via-[#1BA098] to-[#1BA098]/0" aria-hidden="true" />

      <div className="relative mx-auto h-full max-w-[1280px] px-5 sm:px-6">
        <div className="grid h-full grid-cols-1 items-center gap-7 py-10 md:grid-cols-[53%_47%] lg:gap-5 lg:py-0">
          <div className="flex flex-col justify-center gap-4 lg:pr-7">
            <motion.div variants={fade} initial="hidden" animate="show" custom={0} className="inline-flex w-fit items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1BA098]/40 bg-[#1BA098]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#22B8B5]">
                <CheckCircle size={12} /> Insurance Verification &amp; Prior Authorization
              </span>
            </motion.div>

            <motion.h1 variants={fade} initial="hidden" animate="show" custom={0.08} className="text-[2.05rem] font-bold leading-[1.08] text-white sm:text-[2.45rem] lg:text-[2.62rem]">
              Insurance Verification <span className="text-[#22B8B5]">&amp; Authorization</span>—Done Right, Before the Patient Walks In
            </motion.h1>

            <motion.p variants={fade} initial="hidden" animate="show" custom={0.18} className="max-w-[520px] text-base leading-[1.65] text-[#93BAD0] lg:text-[17px]">
              Reduce preventable denials, accelerate reimbursements and relieve your staff from time-consuming payer follow-ups with accurate eligibility verification and authorization management.
            </motion.p>

            <motion.div variants={fade} initial="hidden" animate="show" custom={0.26} className="flex flex-wrap gap-3">
              {BENEFITS.map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.07] px-3.5 py-2 text-sm font-medium text-white">
                  <Icon size={14} style={{ color }} /> {label}
                </div>
              ))}
            </motion.div>

            <motion.div variants={fade} initial="hidden" animate="show" custom={0.34} className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="text-[15px]" onClick={() => { window.location.href = '/contact' }}>
                Get a Free Billing Audit <ArrowRight size={16} />
              </Button>
              <Link to="/how-it-works" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-4 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-white/10">
                <Play size={14} fill="currentColor" /> See How It Works
              </Link>
            </motion.div>

            <motion.div variants={fade} initial="hidden" animate="show" custom={0.42} className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              {TRUST_ITEMS.map((item, index) => (
                <span key={item} className="flex items-center gap-1.5 text-[13px] text-[#93BAD0]">
                  {index > 0 && <span className="h-1 w-1 rounded-full bg-[#1BA098] opacity-60" aria-hidden="true" />}
                  <CheckCircle size={12} className="shrink-0 text-[#1BA098]" /> {item}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="relative flex h-[330px] items-center justify-center sm:h-[390px] md:h-[430px] lg:h-[500px]">
            <HealthcareHeroImage />
          </div>
        </div>
      </div>
    </section>
  )
}
