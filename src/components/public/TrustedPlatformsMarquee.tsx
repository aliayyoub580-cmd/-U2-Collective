import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PLATFORMS = [
  { name: 'eClinicalWorks', image: '/logos/ehr/eclinicalworks.svg' },
  { name: 'athenahealth', image: '/logos/ehr/athenahealth.svg' },
  { name: 'Epic', image: '/logos/ehr/epic.svg' },
  { name: 'NextGen Healthcare', image: '/logos/ehr/nextgen-healthcare.svg' },
  { name: 'AdvancedMD', image: '/logos/ehr/advancedmd.svg' },
  { name: 'Practice Fusion', image: '/logos/ehr/practice-fusion.svg' },
  { name: 'Kareo', image: '/logos/ehr/kareo.png' },
  { name: 'ChiroTouch', image: '/logos/ehr/chirotouch.webp' },
  { name: 'WebPT', image: '/logos/ehr/webpt.svg' },
  { name: 'Phoenix Ortho', image: '/logos/ehr/phoenix-ortho.svg' },
]

function LogoGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="trusted-platforms-group" aria-hidden={hidden || undefined}>
      {PLATFORMS.map((platform) => (
        <div className="trusted-platform-card" key={platform.name}>
          <img
            src={platform.image}
            alt={hidden ? '' : `${platform.name} software logo`}
            className="trusted-platform-logo"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}

export default function TrustedPlatformsMarquee() {
  const headingRef = useRef(null)
  const inView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-white py-16" aria-labelledby="trusted-platforms-heading">
      <div className="mx-auto max-w-[1280px] px-6">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <h2
            id="trusted-platforms-heading"
            className="mx-auto max-w-[720px] text-[2rem] font-bold leading-tight text-[#0B3D62] lg:text-[2.4rem]"
          >
            Trusted Across Leading Healthcare Platforms
          </h2>
          <p className="mx-auto mt-4 max-w-[760px] text-base leading-[1.65] text-[#5A6B78] lg:text-[17px]">
            Our team has extensive experience working with the industry&apos;s leading Electronic
            Health Records (EHR), Practice Management, and Orthopedic software platforms.
          </p>
        </motion.div>

        <div className="trusted-platforms-marquee" role="region" aria-label="Supported healthcare software platforms">
          <div className="trusted-platforms-track">
            <LogoGroup />
            <LogoGroup hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
