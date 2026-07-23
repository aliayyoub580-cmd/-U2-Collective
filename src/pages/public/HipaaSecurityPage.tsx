import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Lock, Shield, FileText, Users, Eye, Server } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'

const MEASURES = [
  { icon: Lock, title: 'Encrypted Data Transmission', body: 'All data transmitted between our platform and your browser uses TLS encryption. Sensitive documents are stored with server-side encryption.' },
  { icon: Shield, title: 'Access Controls', body: 'Role-based and permission-based access controls ensure users can only access data relevant to their assigned function and organization.' },
  { icon: FileText, title: 'Audit Logging', body: 'All system actions are recorded with user, timestamp, record and IP address for accountability and compliance review.' },
  { icon: Users, title: 'Staff Training', body: 'Team members handling protected health information operate under policies designed to support HIPAA-aligned data handling practices.' },
  { icon: Eye, title: 'Minimum Necessary Standard', body: 'Access to patient-related information is limited to what is necessary to complete the specific verification or authorization task.' },
  { icon: Server, title: 'Secure Infrastructure', body: 'Our platform is hosted on infrastructure designed with security and availability in mind, including private document storage with signed URLs.' },
]

export default function HipaaSecurityPage() {
  return (
    <>
      <Helmet>
        <title>HIPAA & Security | U2 Collective</title>
        <meta name="description" content="How U2 Collective approaches HIPAA-aligned workflow design and data security for insurance verification and prior authorization services." />
        <link rel="canonical" href="https://u2collective.com/hipaa-security" />
      </Helmet>

      <div className="bg-[#EEF6F8] border-b border-[#DCE5EA]">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <Breadcrumb items={[{ label: 'HIPAA & Security' }]} />
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-br from-[#062A46] to-[#0B3D62] py-16">
        <div className="max-w-[860px] mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }}
            className="w-14 h-14 rounded-2xl bg-[#1BA098]/15 border border-[#1BA098]/30 flex items-center justify-center mx-auto mb-6">
            <Shield size={26} className="text-[#22B8B5]" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
            className="text-[2.4rem] font-bold text-white mb-4">
            HIPAA & Security
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5 }}
            className="text-[#93BAD0] text-lg leading-[1.65]">
            Our platform and processes are designed to support HIPAA-aligned data handling. We do not represent
            that software design alone constitutes full HIPAA compliance.
          </motion.p>
        </div>
      </section>

      {/* Disclaimer banner */}
      <div className="bg-[#fffbf0] border-b border-[#D89B2B]/30 py-3">
        <div className="max-w-[860px] mx-auto px-6 text-center">
          <p className="text-[13px] text-[#D89B2B] font-medium">
            HIPAA compliance involves administrative, physical and technical safeguards at both the
            platform and organizational level. Clients are responsible for their own HIPAA obligations.
          </p>
        </div>
      </div>

      {/* Security measures */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#1BA098] text-sm font-semibold uppercase tracking-widest mb-3">Our Approach</p>
            <h2 className="text-[2rem] font-bold text-[#0B3D62]">Security Measures by Design</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MEASURES.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="p-7 rounded-xl border border-[#DCE5EA] bg-[#F7F9FA] hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#EEF6F8] flex items-center justify-center mb-4">
                  <m.icon size={18} className="text-[#1BA098]" />
                </div>
                <h3 className="font-semibold text-[#0B3D62] text-[16px] mb-2">{m.title}</h3>
                <p className="text-[#5A6B78] text-[14px] leading-[1.65]">{m.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BAA note */}
      <section className="py-12 bg-[#EEF6F8] border-t border-[#DCE5EA]">
        <div className="max-w-[780px] mx-auto px-6">
          <div className="rounded-xl bg-white border border-[#DCE5EA] p-7">
            <h2 className="font-bold text-[#0B3D62] text-[17px] mb-3">Business Associate Agreement</h2>
            <p className="text-[#5A6B78] text-[15px] leading-[1.7]">
              As a service provider handling protected health information on behalf of covered entities,
              U2 Collective enters into a Business Associate Agreement (BAA) with clients as part of
              the service onboarding process. Contact us to discuss BAA requirements for your
              organization.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
