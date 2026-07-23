import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Shield, Lock, User, Layers } from 'lucide-react'
import Button from '@/components/ui/Button'

const TRUST = [
  { icon: Lock, label: 'Secure Workflow' },
  { icon: Shield, label: 'HIPAA-Aligned Processes' },
  { icon: User, label: 'Dedicated Support' },
  { icon: Layers, label: 'EHR/PMS Compatibility' },
]

export default function FinalCTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-20 bg-gradient-to-br from-[#062A46] to-[#0B3D62]" aria-labelledby="cta-heading">
      <div className="max-w-[860px] mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-7"
        >
          <div>
            <h2
              id="cta-heading"
              className="text-[2rem] lg:text-[2.6rem] font-bold text-white leading-tight mb-4"
            >
              Stop Losing Revenue to{' '}
              <span className="text-[#22B8B5]">Preventable Verification Errors</span>
            </h2>
            <p className="text-[#93BAD0] text-base lg:text-[17px] leading-[1.65] max-w-[580px] mx-auto">
              Let our specialists manage eligibility checks, authorization requirements and payer
              follow-up while your team stays focused on patient care.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact">
              <Button size="lg" className="text-[15px]">
                Schedule a Free Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="text-[15px]">
                Request a Billing Audit
              </Button>
            </Link>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-4 border-t border-white/10 w-full">
            {TRUST.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-[#93BAD0] text-[13px]">
                <Icon size={13} className="text-[#22B8B5]" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
