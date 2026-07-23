import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

const FAQS = [
  {
    q: 'Which insurance plans do you verify?',
    a: 'We verify coverage across Medicare, Medicaid, and a wide range of commercial payers including BlueCross BlueShield, Aetna, Cigna, UnitedHealthcare, Humana and many regional and specialty plans. Contact us to confirm coverage for your specific payer mix.',
  },
  {
    q: 'How long does prior authorization usually take?',
    a: 'Timelines vary by payer and procedure type. Our team submits requests promptly and monitors each one proactively. Routine authorizations often return within 1–3 business days, while complex or non-urgent requests may take longer depending on the payer.',
  },
  {
    q: 'Do you integrate with our EHR or practice management system?',
    a: 'We work within your existing workflow and document results in your EHR or PMS. We support major platforms and can discuss your specific system requirements during onboarding.',
  },
  {
    q: 'How do you protect patient information?',
    a: 'Our platform and processes are designed to support HIPAA-aligned data handling, including access controls, encrypted data transmission, audit logging and secure document storage. We do not represent that software alone constitutes full HIPAA compliance.',
  },
  {
    q: 'What happens if an authorization is denied?',
    a: 'Our team documents the denial, reviews the reason, and coordinates appeal support including clinical documentation preparation and resubmission tracking where appropriate.',
  },
  {
    q: 'Can you handle high-volume verification requests?',
    a: 'Yes. Our workflows are designed to scale with your practice volume. We support high-volume practices and multi-specialty groups. Contact us to discuss your monthly request volume.',
  },
  {
    q: 'Do you support Medicare and Medicaid?',
    a: 'Yes. We have experience with Medicare Advantage plans, traditional Medicare, Medicaid managed care organizations and state Medicaid programs across multiple states.',
  },
  {
    q: 'Can our staff monitor authorization progress?',
    a: 'Yes. Your team has access to a secure client dashboard where you can view real-time status on all pending and completed requests, filter by payer or status, and download reports.',
  },
  {
    q: 'Do you provide reporting?',
    a: 'Yes. The client portal includes request volume reports, turnaround time summaries, denial tracking and exportable records for internal review and compliance documentation.',
  },
  {
    q: 'How is pricing calculated?',
    a: 'Pricing is based on service type, volume and practice needs. We offer flexible arrangements for practices of different sizes. Contact us for a customized quote based on your requirements.',
  },
]

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const id = `faq-${index}`
  const panelId = `faq-panel-${index}`

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.045 }}
      className="border border-[#DCE5EA] rounded-xl overflow-hidden"
    >
      <button
        id={id}
        aria-controls={panelId}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-start justify-between gap-4 px-6 py-5 text-left transition-colors',
          open ? 'bg-[#EEF6F8]' : 'bg-white hover:bg-[#F7F9FA]',
        )}
      >
        <span className="text-[15px] font-semibold text-[#0B3D62] leading-snug flex-1">{faq.q}</span>
        <ChevronDown
          size={18}
          className={cn('text-[#1BA098] shrink-0 mt-0.5 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 py-5 bg-white border-t border-[#DCE5EA]">
              <p className="text-[14px] text-[#5A6B78] leading-[1.7]">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-20 bg-[#F7F9FA]" aria-labelledby="faq-heading" id="faq">
      <div className="max-w-[860px] mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">
            Common Questions
          </p>
          <h2
            id="faq-heading"
            className="text-[2rem] lg:text-[2.4rem] font-bold text-[#0B3D62] leading-tight"
          >
            Frequently Asked Questions
          </h2>
        </motion.div>
        <div className="flex flex-col gap-2.5">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
