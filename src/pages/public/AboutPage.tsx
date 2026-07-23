import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Target, Shield, Users, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Breadcrumb from '@/components/ui/Breadcrumb'

const VALUES = [
  { icon: Target, title: 'Accuracy First', body: 'Every verification result is reviewed for completeness. We do not accept partial data when your revenue depends on full coverage confirmation.' },
  { icon: Shield, title: 'Secure by Design', body: 'Our workflows are designed to support HIPAA-aligned data handling with access controls, audit trails and encrypted document management.' },
  { icon: Users, title: 'Dedicated Specialists', body: 'You work with consistent team members who understand your specialty, payer mix and workflow—not a rotating support queue.' },
  { icon: TrendingUp, title: 'Revenue-Focused', body: 'We measure success by your outcomes: fewer denials, faster turnaround and improved visibility across your revenue cycle.' },
]

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About U2 Collective | Insurance Verification & Prior Authorization</title>
        <meta name="description" content="U2 Collective provides professional insurance verification and prior authorization services for healthcare practices across the United States." />
        <link rel="canonical" href="https://u2collective.com/about" />
      </Helmet>

      <div className="bg-[#EEF6F8] border-b border-[#DCE5EA]">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <Breadcrumb items={[{ label: 'About' }]} />
        </div>
      </div>

      {/* Mission hero */}
      <section className="bg-gradient-to-br from-[#062A46] to-[#0B3D62] py-20">
        <div className="max-w-[860px] mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
            className="text-[#22B8B5] text-sm font-semibold uppercase tracking-widest mb-4">
            About U2 Collective
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.55 }}
            className="text-[2.4rem] lg:text-[3rem] font-bold text-white leading-[1.06] mb-5">
            Built to Reduce Administrative Burden for Healthcare Teams
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5 }}
            className="text-[#93BAD0] text-lg leading-[1.65]">
            U2 Collective was founded to address one of the most persistent operational challenges in
            healthcare: the front-end verification and authorization process that determines whether
            services get paid.
          </motion.p>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-20 bg-white">
        <div className="max-w-[860px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">Our Mission</p>
              <h2 className="text-[2rem] font-bold text-[#0B3D62] mb-5 leading-tight">
                Verify. Authorize. Get Paid.
              </h2>
              <p className="text-[#5A6B78] text-[15px] leading-[1.7] mb-4">
                Healthcare practices spend significant time and resources on insurance verification and prior
                authorization processes that—when done correctly—should be predictable and systematic.
              </p>
              <p className="text-[#5A6B78] text-[15px] leading-[1.7]">
                We built U2 Collective to bring structure, speed and accountability to these workflows.
                Our team of RCM specialists operates as an extension of your practice, handling the
                payer communication and documentation work that consumes your staff's time.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="p-6 rounded-xl bg-[#EEF6F8] border border-[#DCE5EA]">
                <div className="text-[2rem] font-bold text-[#1BA098] mb-1">Healthcare</div>
                <div className="text-[14px] text-[#5A6B78]">Revenue Cycle Management Focus</div>
              </div>
              <div className="p-6 rounded-xl bg-[#EEF6F8] border border-[#DCE5EA]">
                <div className="text-[2rem] font-bold text-[#1BA098] mb-1">U.S.-Based</div>
                <div className="text-[14px] text-[#5A6B78]">Serving practices nationwide</div>
              </div>
              <div className="p-6 rounded-xl bg-[#EEF6F8] border border-[#DCE5EA]">
                <div className="text-[2rem] font-bold text-[#1BA098] mb-1">HIPAA-Aligned</div>
                <div className="text-[14px] text-[#5A6B78]">Secure workflow design throughout</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#F7F9FA]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">Core Values</p>
            <h2 className="text-[2rem] font-bold text-[#0B3D62]">What Guides How We Work</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="p-7 bg-white rounded-xl border border-[#DCE5EA] hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#EEF6F8] flex items-center justify-center mb-4">
                  <v.icon size={18} className="text-[#1BA098]" />
                </div>
                <h3 className="font-semibold text-[#0B3D62] text-[16px] mb-2">{v.title}</h3>
                <p className="text-[#5A6B78] text-[14px] leading-[1.65]">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#062A46] to-[#0B3D62]">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <h2 className="text-[2rem] font-bold text-white mb-4">Work With a Team That Knows RCM</h2>
          <p className="text-[#93BAD0] text-[16px] mb-7">
            Schedule a consultation to discuss your verification and authorization needs.
          </p>
          <Link to="/contact"><Button size="lg">Get in Touch</Button></Link>
        </div>
      </section>
    </>
  )
}
