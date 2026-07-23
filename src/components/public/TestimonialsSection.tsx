import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote:
      'U2 Collective helped our team create a more consistent verification process and reduced the administrative burden on our front-office staff. The turnaround time has been notably faster than what we managed in-house.',
    name: 'Office Manager',
    role: 'Family Medicine Practice',
    initials: 'OM',
    color: '#1BA098',
  },
  {
    quote:
      'Prior authorization used to be a daily headache for our coordinators. Since working with U2 Collective we have a reliable workflow and better visibility into where each request stands at any given time.',
    name: 'Practice Administrator',
    role: 'Multi-Specialty Group',
    initials: 'PA',
    color: '#0B3D62',
  },
  {
    quote:
      'The dashboard gives our billing manager exactly what she needs without having to chase down status updates. The dedicated specialist approach makes a real difference in communication quality.',
    name: 'Clinic Director',
    role: 'Orthopedics & Spine Center',
    initials: 'CD',
    color: '#278A6B',
  },
]

export default function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 bg-[#EEF6F8]" aria-labelledby="testimonials-heading">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">
            What Clients Say
          </p>
          <h2
            id="testimonials-heading"
            className="text-[2rem] lg:text-[2.4rem] font-bold text-[#0B3D62] leading-tight"
          >
            Trusted by Practice Teams
          </h2>
          <p className="mt-2 text-[12px] text-[#5A6B78] italic">
            Testimonials represent illustrative client feedback. Content is placeholder pending real client approval.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 * i }}
              className="bg-white rounded-xl border border-[#DCE5EA] p-7 flex flex-col gap-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <Quote size={24} className="text-[#1BA098]/40" />
              <blockquote className="text-[15px] text-[#3a5060] leading-[1.7] flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-2 border-t border-[#DCE5EA]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ background: t.color }}
                  aria-label={`${t.name} initials`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-[#0B3D62]">{t.name}</div>
                  <div className="text-[12px] text-[#5A6B78]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
