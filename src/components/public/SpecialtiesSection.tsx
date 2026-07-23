import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Heart, Activity, Bone, Brain, Zap,
  Layers, Smile, Dumbbell, Scan, ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const SPECIALTIES = [
  { label: 'Family Medicine',   icon: Heart,    href: '/specialties/family-medicine' },
  { label: 'Internal Medicine', icon: Activity, href: '/specialties/internal-medicine' },
  { label: 'Cardiology',        icon: Zap,      href: '/specialties/cardiology' },
  { label: 'Orthopedics',       icon: Bone,     href: '/specialties/orthopedics' },
  { label: 'Behavioral Health', icon: Brain,    href: '/specialties/behavioral-health' },
  { label: 'Dermatology',       icon: Smile,    href: '/specialties/dermatology' },
  { label: 'Pain Management',   icon: Layers,   href: '/specialties/pain-management' },
  { label: 'Physical Therapy',  icon: Dumbbell, href: '/specialties/physical-therapy' },
  { label: 'Radiology',         icon: Scan,     href: '/specialties/radiology' },
]

export default function SpecialtiesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-20 bg-white" aria-labelledby="specialties-heading">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">
            Specialties Supported
          </p>
          <h2
            id="specialties-heading"
            className="text-[2rem] lg:text-[2.4rem] font-bold text-[#0B3D62] leading-tight"
          >
            Serving a Broad Range of Practice Types
          </h2>
          <p className="mt-4 text-[#5A6B78] text-base lg:text-[17px] max-w-[520px] mx-auto leading-[1.65]">
            Our verification and authorization workflows are adapted to payer requirements
            across a wide range of clinical specialties.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {/* Specialty cards */}
          {SPECIALTIES.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.04 * i }}
            >
              <Link
                to={s.href}
                className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-[#DCE5EA] bg-[#F7F9FA] hover:bg-white hover:border-[#1BA098]/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-250 text-center h-full"
              >
                <div className="w-10 h-10 rounded-lg bg-[#EEF6F8] group-hover:bg-[#1BA098]/10 flex items-center justify-center transition-colors">
                  <s.icon size={18} className="text-[#1BA098]" strokeWidth={1.8} />
                </div>
                <span className="text-[13px] font-semibold text-[#0B3D62] group-hover:text-[#1BA098] transition-colors leading-snug">
                  {s.label}
                </span>
              </Link>
            </motion.div>
          ))}

          {/* 70+ Specialties CTA card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.04 * SPECIALTIES.length }}
          >
            <Link
              to="/specialties"
              className="group flex flex-col items-center justify-center gap-3 p-5 rounded-xl border-2 border-dashed border-[#1BA098]/40 bg-gradient-to-br from-[#EEF6F8] to-white hover:border-[#1BA098] hover:shadow-md hover:-translate-y-0.5 transition-all duration-250 text-center h-full min-h-[110px]"
              aria-label="View all 70+ specialties"
            >
              <div className="flex items-baseline gap-0.5">
                <span className="text-[1.6rem] font-extrabold text-[#1BA098] leading-none">70</span>
                <span className="text-[1rem] font-bold text-[#1BA098]">+</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[12px] font-semibold text-[#0B3D62] leading-tight">
                  Specialties
                </span>
                <span className="text-[11px] text-[#5A6B78]">Supported</span>
              </div>
              <div className="flex items-center gap-1 text-[#1BA098] text-[11px] font-semibold">
                View all <ArrowRight size={11} />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
