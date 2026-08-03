import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

interface ServiceCard {
  id: string
  kicker: string
  title: string
  description: string
  stat: string
  statLabel: string
  bgImage: string
  link: string
  icon: JSX.Element
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    id: 'provider-credentialling',
    kicker: 'Provider Enrollment',
    title: 'Provider Credentialling',
    description:
      'Streamlined physician enrollment and primary source verification with commercial payers, Medicare, and Medicaid.',
    stat: '99%',
    statLabel:
      'on-time enrollment approval rate with zero credentialing delays.',
    bgImage: '/images/services/provider-credentialling.jpg',
    link: '/services/provider-credentialling',
    icon: (
      <svg className="w-6 h-6 stroke-cyan-400" fill="none" viewBox="0 0 48 48" strokeWidth="2.2">
        <path d="M24 6l14 6v12c0 9.5-6.5 17-14 20-7.5-3-14-10.5-14-20V12l14-6z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="20" r="5" />
        <path d="M16 32c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'appointment-scheduling',
    kicker: 'Optimized Access',
    title: 'Appointment Scheduling',
    description:
      'Seamless patient scheduling, front-desk coordination, eligibility screening, and automated reminder workflows.',
    stat: '85%',
    statLabel:
      'reduction in patient no-shows and scheduling friction.',
    bgImage: '/images/services/appointment-scheduling.jpg',
    link: '/services/appointment-scheduling',
    icon: (
      <svg className="w-6 h-6 stroke-cyan-400" fill="none" viewBox="0 0 48 48" strokeWidth="2.2">
        <rect x="8" y="12" width="32" height="28" rx="4" />
        <path d="M16 8v8M32 8v8M8 20h32" strokeLinecap="round" />
        <circle cx="20" cy="28" r="2" fill="currentColor" />
        <circle cx="28" cy="28" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'insurance-verification',
    kicker: 'Eligibility Check',
    title: 'Insurance Verification',
    description:
      'Real-time insurance coverage status, copay, deductible, out-of-pocket tracking, and active benefit verification.',
    stat: '3.5h',
    statLabel:
      'average eligibility verification turnaround time before encounters.',
    bgImage: '/images/services/insurance-verification.jpg',
    link: '/services/insurance-verification',
    icon: (
      <svg className="w-6 h-6 stroke-cyan-400" fill="none" viewBox="0 0 48 48" strokeWidth="2.2">
        <path d="M12 8h24v32H12z" rx="3" />
        <path d="M18 16h12M18 22h8" strokeLinecap="round" />
        <path d="M18 30l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'authorization',
    kicker: 'Prior Authorization',
    title: 'Authorization',
    description:
      'Fast clinical document coordination, payer submission management, real-time approval tracking, and status follow-up.',
    stat: '98%',
    statLabel:
      'clean prior authorization approval rate with payers.',
    bgImage: '/images/services/authorization.jpg',
    link: '/services/prior-authorization',
    icon: (
      <svg className="w-6 h-6 stroke-cyan-400" fill="none" viewBox="0 0 48 48" strokeWidth="2.2">
        <path d="M14 10h20v28H14z" rx="3" />
        <path d="M20 18h8M20 24h5" strokeLinecap="round" />
        <circle cx="34" cy="34" r="8" fill="#071927" stroke="currentColor" />
        <path d="M31 34l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'appeals',
    kicker: 'Denial Resolution',
    title: 'Appeals',
    description:
      'Expert clinical appeal drafting, medical necessity documentation support, and aggressive claim denial overturn management.',
    stat: '88%',
    statLabel:
      'overturn rate on denied insurance authorizations.',
    bgImage: '/images/services/appeals.jpg',
    link: '/services/appeals',
    icon: (
      <svg className="w-6 h-6 stroke-cyan-400" fill="none" viewBox="0 0 48 48" strokeWidth="2.2">
        <path d="M24 10a14 14 0 1014 14" strokeLinecap="round" />
        <path d="M38 16v8h-8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 18v6l4 4" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function MedCareServicesAccordionSection() {
  // Default is null so all cards take EQUAL space initially
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section className="py-6 lg:py-8 bg-[#071927] text-white relative overflow-hidden" aria-labelledby="services-accordion-heading">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-sky-500/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
          <p className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-1.5">
            Core Service Offerings
          </p>
          <h2 id="services-accordion-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Specialized Healthcare Solutions
          </h2>
        </div>

        {/* Accordion Cards Container (360px height) */}
        <div
          onMouseLeave={() => setActiveId(null)}
          className="flex flex-col lg:flex-row gap-3 h-auto lg:h-[360px] transition-all duration-500"
        >
          {SERVICE_CARDS.map((card) => {
            const isExpanded = activeId === card.id

            return (
              <div
                key={card.id}
                onMouseEnter={() => setActiveId(card.id)}
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] border border-white/15 hover:border-cyan-400/50 shadow-lg ${
                  isExpanded
                    ? 'lg:flex-[2.6_1_0%] bg-slate-900'
                    : 'lg:flex-[1_1_0%] bg-slate-950/80 hover:bg-slate-900'
                } flex flex-col justify-between p-4 sm:p-5 group min-h-[280px] lg:min-h-full`}
              >
                {/* Background Image with Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${card.bgImage})` }}
                />

                {/* Dark Gradient Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isExpanded
                      ? 'bg-gradient-to-t from-black/95 via-black/80 to-black/60 backdrop-blur-[2px]'
                      : 'bg-gradient-to-t from-black/90 via-black/70 to-black/45 group-hover:opacity-90'
                  }`}
                />

                {/* Content Wrapper */}
                <div className="relative z-10 flex flex-col justify-between h-full w-full">
                  {/* Top Portion */}
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.15em] uppercase text-cyan-300/90 mb-1.5">
                      {card.kicker}
                    </p>

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
                      <h3
                        className={`font-bold tracking-tight text-white transition-all duration-300 ${
                          isExpanded
                            ? 'text-lg sm:text-xl lg:text-2xl max-w-xs leading-snug'
                            : 'text-base sm:text-lg font-bold max-w-[190px] leading-snug'
                        }`}
                      >
                        {card.title}
                      </h3>

                      {/* Expanded Description Box */}
                      {isExpanded && (
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="hidden lg:block text-xs text-slate-200/90 leading-relaxed max-w-xs bg-black/50 p-3 rounded-lg border border-white/10 backdrop-blur-md"
                        >
                          {card.description}
                        </motion.p>
                      )}
                    </div>

                    {/* Mobile/Tablet Description */}
                    {isExpanded && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:hidden mt-2 text-xs text-slate-200/90 leading-relaxed bg-black/60 p-3 rounded-lg border border-white/10"
                      >
                        {card.description}
                      </motion.p>
                    )}
                  </div>

                  {/* Center Icon Box (Collapsed State) */}
                  <AnimatePresence>
                    {!isExpanded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hidden lg:flex items-center justify-start my-auto"
                      >
                        <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md">
                          {card.icon}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom Portion: Stat + CTA Link */}
                  <div className="mt-3 lg:mt-auto pt-2.5 border-t border-white/15">
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.05 }}
                        className="mb-2.5"
                      >
                        <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-1 drop-shadow-md">
                          <span>{card.stat}</span>
                        </div>
                        <p className="text-[11px] text-slate-300/90 font-normal leading-tight mt-0.5 max-w-xs">
                          {card.statLabel}
                        </p>
                      </motion.div>
                    )}

                    {/* CTA Link Bar */}
                    <Link
                      to={card.link}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-between w-full text-[11px] font-semibold tracking-wider uppercase text-white hover:text-cyan-300 transition-colors group/link"
                    >
                      <span className="flex items-center gap-1.5">
                        Learn More
                        <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                          →
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
