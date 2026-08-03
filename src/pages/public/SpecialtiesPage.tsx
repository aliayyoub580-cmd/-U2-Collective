import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Button from '@/components/ui/Button'
import SpecialtyIcon from '@/components/public/SpecialtyIcon'

interface SpecialtyItem {
  slug: string
  label: string
  category: 'Surgical' | 'Diagnostics' | 'Clinical' | 'Therapy' | 'Behavioral' | 'Equipment & Facilities'
}

const ALL_SPECIALTIES: SpecialtyItem[] = [
  // Surgical
  { slug: 'orthopedic', label: 'Orthopedic', category: 'Surgical' },
  { slug: 'neurosurgery', label: 'Neurosurgery', category: 'Surgical' },
  { slug: 'ambulatory-surgery', label: 'Ambulatory Surgery', category: 'Surgical' },
  { slug: 'thoracic-surgery', label: 'Thoracic Surgery', category: 'Surgical' },
  { slug: 'general-surgery', label: 'General Surgery', category: 'Surgical' },
  { slug: 'traumatology', label: 'Traumatology', category: 'Surgical' },
  { slug: 'urgent-care', label: 'Urgent Care', category: 'Surgical' },

  // Diagnostics
  { slug: 'pathology', label: 'Pathology', category: 'Diagnostics' },
  { slug: 'radiology', label: 'Radiology', category: 'Diagnostics' },
  { slug: 'clinical-laboratory', label: 'Clinical Laboratory', category: 'Diagnostics' },
  { slug: 'molecular-testing-labs', label: 'Molecular Labs', category: 'Diagnostics' },
  { slug: 'toxicology', label: 'Toxicology', category: 'Diagnostics' },

  // Clinical
  { slug: 'oncology', label: 'Oncology', category: 'Clinical' },
  { slug: 'dermatology', label: 'Dermatology', category: 'Clinical' },
  { slug: 'gastroenterology', label: 'Gastroenterology', category: 'Clinical' },
  { slug: 'cardiology', label: 'Cardiology', category: 'Clinical' },
  { slug: 'urology', label: 'Urology', category: 'Clinical' },
  { slug: 'ob-gyn', label: 'Ob Gyn', category: 'Clinical' },
  { slug: 'rheumatology', label: 'Rheumatology', category: 'Clinical' },
  { slug: 'immunology', label: 'Immunology', category: 'Clinical' },
  { slug: 'endocrinology', label: 'Endocrinology', category: 'Clinical' },
  { slug: 'pulmonology', label: 'Pulmonology', category: 'Clinical' },
  { slug: 'nephrology', label: 'Nephrology', category: 'Clinical' },
  { slug: 'hepatology', label: 'Hepatology', category: 'Clinical' },
  { slug: 'infectious-disease', label: 'Infectious Disease', category: 'Clinical' },
  { slug: 'ophthalmology', label: 'Ophthalmology', category: 'Clinical' },
  { slug: 'internal-medicine', label: 'Internal Medicine', category: 'Clinical' },
  { slug: 'family-practice', label: 'Family Practice', category: 'Clinical' },
  { slug: 'geriatrics', label: 'Geriatrics', category: 'Clinical' },
  { slug: 'pediatrics', label: 'Pediatrics', category: 'Clinical' },

  // Therapy & Rehab
  { slug: 'physical-therapy', label: 'Physical Therapy', category: 'Therapy' },
  { slug: 'substance-abuse-rehab', label: 'Substance Abuse Rehab', category: 'Therapy' },
  { slug: 'home-health', label: 'Home Health', category: 'Therapy' },
  { slug: 'hospice', label: 'Hospice', category: 'Therapy' },
  { slug: 'nursing-home', label: 'Nursing Home', category: 'Therapy' },
  { slug: 'podiatry', label: 'Podiatry', category: 'Therapy' },
  { slug: 'wound-care', label: 'Wound Care', category: 'Therapy' },
  { slug: 'disability-care', label: 'Disability Care', category: 'Therapy' },

  // Behavioral
  { slug: 'psychiatric', label: 'Psychiatric', category: 'Behavioral' },
  { slug: 'psychology', label: 'Psychology', category: 'Behavioral' },
  { slug: 'mental-health', label: 'Mental Health', category: 'Behavioral' },
  { slug: 'dental-billing', label: 'Dental Billing', category: 'Behavioral' },

  // Equipment & Facilities
  { slug: 'dme', label: 'DME', category: 'Equipment & Facilities' },
  { slug: 'prostheses', label: 'Prostheses', category: 'Equipment & Facilities' },
  { slug: 'medical-clinics', label: 'Medical Clinics', category: 'Equipment & Facilities' },
  { slug: 'fqhc', label: 'FQHC Centers', category: 'Equipment & Facilities' },
  { slug: 'pain-management', label: 'Pain Management', category: 'Equipment & Facilities' },
  { slug: 'hematology', label: 'Hematology', category: 'Equipment & Facilities' },
  { slug: 'census-entry', label: 'Census Entry', category: 'Equipment & Facilities' },
]

const CATEGORIES = ['All', 'Surgical', 'Diagnostics', 'Clinical', 'Therapy', 'Behavioral', 'Equipment & Facilities'] as const

export default function SpecialtiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredSpecialties = ALL_SPECIALTIES.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory
    const matchesSearch = s.label.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Helmet>
        <title>Specialties Supported | U2 Collective</title>
        <meta
          name="description"
          content="Explore our full spectrum of medical billing, insurance verification, and prior authorization specialties across 49+ clinical practice types."
        />
        <link rel="canonical" href="https://u2collective.com/specialties" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-[#EEF6F8] border-b border-[#DCE5EA]">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <Breadcrumb items={[{ label: 'Specialties' }]} />
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-br from-[#062A46] to-[#0B3D62] py-20 text-white">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="text-[#22B8B5] text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Specialties Supported
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="text-[2.4rem] lg:text-[3.2rem] font-bold leading-[1.08] mb-5"
          >
            Full Spectrum of Medical Billing Expertise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="text-[#93BAD0] text-lg leading-[1.65] max-w-2xl mx-auto"
          >
            Payer requirements and CPT codes vary significantly by specialty. Our verification and authorization team adapts
            workflows to your exact clinical environment across 49+ specialties.
          </motion.p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-8 bg-white border-b border-[#DCE5EA] sticky top-0 z-20 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-[#0B3D62] text-white shadow-md'
                      : 'bg-[#F7F9FA] text-[#5A6B78] hover:bg-[#EEF6F8] hover:text-[#0B3D62]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6B78]" />
              <input
                type="text"
                placeholder="Search specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#DCE5EA] text-sm text-[#0B3D62] placeholder-[#8EA3B0] focus:border-[#1BA098] focus:outline-none bg-[#F7F9FA] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Card Grid (Only Logo & Name — No Description Text, No Learn More Button) */}
      <section className="py-16 bg-[#F7F9FA]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredSpecialties.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 8) * 0.04, duration: 0.4 }}
              >
                <Link
                  to={`/specialties/${s.slug}`}
                  className="group flex flex-col items-center justify-center text-center p-7 sm:p-8 rounded-2xl border border-[#E8EEF5] bg-white hover:bg-white hover:border-[#1BA098]/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full min-h-[170px]"
                >
                  <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                    <SpecialtyIcon name={s.label} className="w-14 h-14" />
                  </div>
                  <h2 className="font-bold text-[#0B3D62] text-lg group-hover:text-[#1BA098] transition-colors leading-snug">
                    {s.label}
                  </h2>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredSpecialties.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#DCE5EA]">
              <p className="text-lg font-bold text-[#0B3D62] mb-2">No Specialties Found</p>
              <p className="text-sm text-[#5A6B78]">Try adjusting your search query or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 bg-white border-t border-[#DCE5EA]">
        <div className="max-w-[640px] mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B3D62] mb-3">Don't See Your Specific Practice Specialty?</h2>
          <p className="text-[#5A6B78] text-base mb-8 leading-relaxed">
            We adapt verification and authorization workflows for virtually all healthcare disciplines. Talk to our clinical workflow team today.
          </p>
          <Link to="/contact">
            <Button size="lg">Talk to a Specialist</Button>
          </Link>
        </div>
      </section>
    </>
  )
}
