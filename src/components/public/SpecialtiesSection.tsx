import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import SpecialtyIcon from './SpecialtyIcon'

const HOMEPAGE_SPECIALTIES = [
  { label: 'Orthopedic', href: '/specialties/orthopedic' },
  { label: 'Neurosurgery', href: '/specialties/neurosurgery' },
  { label: 'Ambulatory Surgery', href: '/specialties/ambulatory-surgery' },
  { label: 'Oncology', href: '/specialties/oncology' },
  { label: 'Urgent Care', href: '/specialties/urgent-care' },
  { label: 'Pathology', href: '/specialties/pathology' },
  { label: 'General Surgery', href: '/specialties/general-surgery' },
  { label: 'Dermatology', href: '/specialties/dermatology' },
]

export default function SpecialtiesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-20 bg-[#F7F9FA]" aria-labelledby="specialties-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <p className="text-[#1BA098] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            SPECIALTIES SUPPORTED
          </p>
          <h2
            id="specialties-heading"
            className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#0B3D62] tracking-tight leading-tight"
          >
            Serving a Broad Range of Practice Types
          </h2>
          <p className="mt-3.5 text-[#5A6B78] text-base lg:text-[17px] max-w-[620px] mx-auto leading-relaxed">
            Our verification and authorization workflows are adapted to payer requirements
            across a wide range of clinical specialties.
          </p>
        </motion.div>

        {/* 4 Cards per Row x 2 Rows Grid (Total 8 Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {HOMEPAGE_SPECIALTIES.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1], delay: 0.04 * i }}
            >
              <Link
                to={s.href}
                className="group flex flex-col items-center justify-center p-7 sm:p-8 rounded-2xl border border-[#E8EEF5] bg-white hover:bg-white hover:border-[#1BA098]/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center h-full min-h-[170px]"
              >
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                  <SpecialtyIcon name={s.label} className="w-14 h-14" />
                </div>
                <span className="text-base sm:text-lg font-bold text-[#0B3D62] group-hover:text-[#1BA098] transition-colors leading-snug">
                  {s.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Centered "View All Specialties" Button After 8 Cards */}
        <div className="text-center">
          <Link to="/specialties">
            <Button size="lg" className="px-8 py-3.5 text-base font-bold shadow-md hover:shadow-lg">
              View All Specialties <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
