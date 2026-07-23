import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Heart, Activity, Zap, Bone, Brain, Smile, Layers, Dumbbell, Scan, Building2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Button from '@/components/ui/Button'

const SPECIALTIES = [
  { slug: 'family-medicine', label: 'Family Medicine', icon: Heart, desc: 'Primary care eligibility and referral-based authorization workflows.' },
  { slug: 'internal-medicine', label: 'Internal Medicine', icon: Activity, desc: 'Chronic condition management verification and specialty referral support.' },
  { slug: 'cardiology', label: 'Cardiology', icon: Zap, desc: 'High-complexity cardiology authorizations including stress tests, cath procedures and device implants.' },
  { slug: 'orthopedics', label: 'Orthopedics', icon: Bone, desc: 'Surgical auth workflows covering joint replacement, arthroscopy and physical therapy coordination.' },
  { slug: 'behavioral-health', label: 'Behavioral Health', icon: Brain, desc: 'Mental health and substance use treatment verification including session limits and network status.' },
  { slug: 'dermatology', label: 'Dermatology', icon: Smile, desc: 'Medical and cosmetic procedure verification, phototherapy and biologics authorization.' },
  { slug: 'pain-management', label: 'Pain Management', icon: Layers, desc: 'Interventional procedures, medication authorization and multi-payer coordination.' },
  { slug: 'physical-therapy', label: 'Physical Therapy', icon: Dumbbell, desc: 'Visit limit verification, auth for extended treatment and progress tracking documentation.' },
  { slug: 'radiology', label: 'Radiology', icon: Scan, desc: 'Advanced imaging authorization including MRI, CT and PET scan pre-certification.' },
  { slug: 'multi-specialty', label: 'Multi-Specialty Groups', icon: Building2, desc: 'Centralized verification management across multiple specialties and clinical sites.' },
]

export default function SpecialtiesPage() {
  return (
    <>
      <Helmet>
        <title>Specialties We Support | U2 Collective</title>
        <meta name="description" content="Insurance verification and prior authorization for family medicine, cardiology, orthopedics, behavioral health, radiology and more. Specialty-adapted workflows." />
        <link rel="canonical" href="https://u2collective.com/specialties" />
      </Helmet>

      <div className="bg-[#EEF6F8] border-b border-[#DCE5EA]">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <Breadcrumb items={[{ label: 'Specialties' }]} />
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-br from-[#062A46] to-[#0B3D62] py-20">
        <div className="max-w-[860px] mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
            className="text-[#22B8B5] text-sm font-semibold uppercase tracking-widest mb-4">
            Supported Practice Types
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.55 }}
            className="text-[2.4rem] lg:text-[3rem] font-bold text-white leading-[1.06] mb-5">
            Workflows Adapted to Your Specialty
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5 }}
            className="text-[#93BAD0] text-lg leading-[1.65]">
            Payer requirements vary significantly by specialty and procedure type. Our team adapts
            verification and authorization workflows to your clinical environment.
          </motion.p>
        </div>
      </section>

      {/* Specialties grid */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SPECIALTIES.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <Link
                  to={`/specialties/${s.slug}`}
                  className="group flex flex-col gap-4 p-7 rounded-xl border border-[#DCE5EA] bg-[#F7F9FA] hover:bg-white hover:shadow-lg hover:-translate-y-1 hover:border-[#1BA098]/30 transition-all duration-300 h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EEF6F8] group-hover:bg-[#1BA098]/10 flex items-center justify-center transition-colors">
                    <s.icon size={22} className="text-[#1BA098]" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-[#0B3D62] text-[16px] mb-2 group-hover:text-[#1BA098] transition-colors">
                      {s.label}
                    </h2>
                    <p className="text-[#5A6B78] text-[13px] leading-[1.65]">{s.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[#1BA098] text-[13px] font-semibold">
                    Learn more <ArrowRight size={13} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F7F9FA] border-t border-[#DCE5EA]">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <h2 className="text-[1.85rem] font-bold text-[#0B3D62] mb-4">Don't See Your Specialty?</h2>
          <p className="text-[#5A6B78] text-[16px] mb-7">
            We work with a wide range of practice types. Contact us to discuss your specific payer mix and workflow requirements.
          </p>
          <Link to="/contact"><Button size="lg">Talk to a Specialist</Button></Link>
        </div>
      </section>
    </>
  )
}
