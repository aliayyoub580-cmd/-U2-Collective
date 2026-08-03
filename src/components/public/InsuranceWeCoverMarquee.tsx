import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface InsuranceProvider {
  name: string
  category: string
  image: string
}

const INSURANCE_PROVIDERS: InsuranceProvider[] = [
  { name: 'Medicare (CMS)', category: 'Government', image: '/logos/insurance/medicare.svg' },
  { name: 'Medicaid', category: 'Government', image: '/logos/insurance/medicaid.svg' },
  { name: 'TRICARE', category: 'Government / Military', image: '/logos/insurance/tricare.svg' },
  { name: 'Blue Cross Blue Shield', category: 'Commercial / National', image: '/logos/insurance/bcbs.svg' },
  { name: 'UnitedHealthcare (UHC)', category: 'Commercial / National', image: '/logos/insurance/uhc.svg' },
  { name: 'Aetna', category: 'Commercial / National', image: '/logos/insurance/aetna.svg' },
  { name: 'Cigna', category: 'Commercial / National', image: '/logos/insurance/cigna.svg' },
  { name: 'Humana', category: 'Commercial / Medicare', image: '/logos/insurance/humana.svg' },
  { name: 'Kaiser Permanente', category: 'Commercial / HMO', image: '/logos/insurance/kaiser.svg' },
  { name: 'Centene', category: 'Managed Care / Medicaid', image: '/logos/insurance/centene.svg' },
  { name: 'Molina Healthcare', category: 'Managed Care / Medicaid', image: '/logos/insurance/molina.svg' },
  { name: 'WellCare', category: 'Medicare / Medicaid', image: '/logos/insurance/wellcare.svg' },
  { name: 'Anthem (Elevance Health)', category: 'Commercial / Regional', image: '/logos/insurance/anthem.svg' },
  { name: 'Florida Blue', category: 'Regional BCBS', image: '/logos/insurance/florida-blue.svg' },
  { name: 'Horizon BCBS', category: 'Regional BCBS', image: '/logos/insurance/horizon-bcbs.svg' },
  { name: 'CareSource', category: 'Managed Care', image: '/logos/insurance/caresource.svg' },
  { name: 'Oscar Health', category: 'Commercial', image: '/logos/insurance/oscar.svg' },
  { name: 'MultiPlan', category: 'Network / TPA', image: '/logos/insurance/multiplan.svg' },
  { name: 'OptumHealth', category: 'Specialty Network', image: '/logos/insurance/optum.svg' },
  { name: 'eviCore Healthcare', category: 'Utilization Mgmt', image: '/logos/insurance/evicore.svg' },
  { name: 'Travelers', category: "Workers' Comp", image: '/logos/insurance/travelers.svg' },
  { name: 'Liberty Mutual', category: "Workers' Comp", image: '/logos/insurance/liberty-mutual.svg' },
  { name: 'State Farm', category: 'Auto / PIP', image: '/logos/insurance/state-farm.svg' },
  { name: 'Progressive', category: 'Auto / PIP', image: '/logos/insurance/progressive.svg' },
]

function LogoGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="trusted-platforms-group" aria-hidden={hidden || undefined}>
      {INSURANCE_PROVIDERS.map((provider) => (
        <div className="trusted-platform-card group hover:border-cyan-500/40 hover:shadow-md transition-all duration-300" key={provider.name}>
          <img
            src={provider.image}
            alt={hidden ? '' : `${provider.name} logo`}
            className="trusted-platform-logo max-h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}

export default function InsuranceWeCoverMarquee() {
  const headingRef = useRef(null)
  const inView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-white py-16 border-t border-[#DCE5EA]" aria-labelledby="insurance-cover-heading">
      <div className="mx-auto max-w-[1280px] px-6">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-10 text-center"
        >
          <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">
            Payer Coverage & Contracting
          </p>
          <h2
            id="insurance-cover-heading"
            className="mx-auto max-w-[720px] text-[2rem] font-bold leading-tight text-[#0B3D62] lg:text-[2.4rem]"
          >
            Insurance We Cover
          </h2>
          <p className="mx-auto mt-4 max-w-[780px] text-base leading-[1.65] text-[#5A6B78] lg:text-[17px]">
            We handle provider enrollment, primary source verification, and contracting across major government programs,
            national commercial carriers, regional Blue Cross Blue Shield affiliates, and specialty networks nationwide.
          </p>
        </motion.div>

        {/* Continuous Right-to-Left Infinite Marquee Slider (Same as Homepage) */}
        <div className="trusted-platforms-marquee" role="region" aria-label="Insurance payers and health networks we cover">
          <div className="trusted-platforms-track">
            <LogoGroup />
            <LogoGroup hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
