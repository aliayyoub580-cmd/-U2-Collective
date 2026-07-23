import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { BookOpen, Calendar, ArrowRight, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'

const ARTICLES = [
  {
    slug: 'prior-auth-delays',
    category: 'Authorization',
    title: 'Why Prior Authorization Delays Happen—and How to Prevent Them',
    excerpt: 'Incomplete documentation and missed payer-specific requirements are the leading causes of authorization delays. Here is what your team can do before submission.',
    date: 'July 2026',
    readTime: '5 min read',
  },
  {
    slug: 'eligibility-verification-best-practices',
    category: 'Verification',
    title: '8 Eligibility Verification Practices That Reduce Claim Denials',
    excerpt: 'Front-end verification errors account for a significant percentage of initial claim denials. These practices help catch issues before the patient visit.',
    date: 'June 2026',
    readTime: '6 min read',
  },
  {
    slug: 'medicare-advantage-authorization',
    category: 'Payer Guidance',
    title: 'Navigating Prior Authorization Requirements with Medicare Advantage Plans',
    excerpt: 'Medicare Advantage plans vary widely in their prior authorization requirements. Understanding plan-level differences is essential for effective submission.',
    date: 'June 2026',
    readTime: '7 min read',
  },
  {
    slug: 'ehr-verification-workflow',
    category: 'Operations',
    title: 'Integrating Verification Results Directly Into Your EHR Workflow',
    excerpt: 'Structured benefit documentation reduces rework and ensures your billing team has the information needed to support a clean first claim.',
    date: 'May 2026',
    readTime: '4 min read',
  },
  {
    slug: 'denial-appeal-tips',
    category: 'Denials & Appeals',
    title: 'Authorization Denial Management: What to Document Before You Appeal',
    excerpt: 'The strength of an appeal depends heavily on the clinical documentation assembled at the time of submission. This guide covers key documentation requirements.',
    date: 'May 2026',
    readTime: '6 min read',
  },
  {
    slug: 'rcm-staffing',
    category: 'Operations',
    title: 'When to Outsource Verification and Authorization vs. Managing In-House',
    excerpt: 'Practice size, payer mix complexity and staff capacity all factor into the decision to outsource RCM front-end functions. Here is a practical framework.',
    date: 'April 2026',
    readTime: '5 min read',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  Authorization: '#0B3D62',
  Verification: '#1BA098',
  'Payer Guidance': '#D89B2B',
  Operations: '#278A6B',
  'Denials & Appeals': '#C94A4A',
}

export default function ResourcesPage() {
  return (
    <>
      <Helmet>
        <title>Resources & Blog | U2 Collective</title>
        <meta name="description" content="Insurance verification and prior authorization guides, payer updates and RCM best practices from U2 Collective." />
        <link rel="canonical" href="https://u2collective.com/resources" />
      </Helmet>

      <div className="bg-[#EEF6F8] border-b border-[#DCE5EA]">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <Breadcrumb items={[{ label: 'Resources' }]} />
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-br from-[#062A46] to-[#0B3D62] py-16">
        <div className="max-w-[860px] mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
            className="text-[2.4rem] font-bold text-white mb-4">
            Resources & Insights
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5 }}
            className="text-[#93BAD0] text-lg">
            Practical guidance on verification, authorization and revenue cycle management for healthcare practices.
          </motion.p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.map((a, i) => (
              <motion.article
                key={a.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="group bg-white rounded-xl border border-[#DCE5EA] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="h-2 w-full" style={{ background: CATEGORY_COLORS[a.category] ?? '#1BA098' }} />
                <div className="p-7 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <Tag size={11} style={{ color: CATEGORY_COLORS[a.category] }} />
                    <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: CATEGORY_COLORS[a.category] }}>
                      {a.category}
                    </span>
                  </div>
                  <h2 className="font-bold text-[#0B3D62] text-[16px] leading-snug group-hover:text-[#1BA098] transition-colors">
                    <Link to={`/resources/${a.slug}`}>{a.title}</Link>
                  </h2>
                  <p className="text-[#5A6B78] text-[14px] leading-[1.65] flex-1">{a.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-[#F0F4F7]">
                    <div className="flex items-center gap-3 text-[12px] text-[#9BAAB5]">
                      <span className="flex items-center gap-1"><Calendar size={11} />{a.date}</span>
                      <span className="flex items-center gap-1"><BookOpen size={11} />{a.readTime}</span>
                    </div>
                    <Link to={`/resources/${a.slug}`} className="text-[12px] font-semibold text-[#1BA098] flex items-center gap-1 hover:gap-2 transition-all">
                      Read <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
