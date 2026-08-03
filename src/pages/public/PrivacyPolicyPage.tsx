import { Helmet } from 'react-helmet-async'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | U2 Collective</title>
        <meta name="description" content="Privacy Policy for U2 Collective — how we collect, use and protect information." />
        <link rel="canonical" href="https://u2collective.com/privacy-policy" />
      </Helmet>

      <div className="bg-[#EEF6F8] border-b border-[#DCE5EA]">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-[780px] mx-auto px-6">
          <div className="mb-10">
            <h1 className="text-[2.2rem] font-bold text-[#0B3D62] mb-3">Privacy Policy</h1>
            <p className="text-[#5A6B78] text-[14px]">Last updated: July 2026 — Placeholder. Replace with reviewed legal document before go-live.</p>
          </div>

          {[
            { heading: 'Overview', body: 'This Privacy Policy describes how U2 Collective ("we," "us" or "our") collects, uses and protects information obtained through our website and client portal. This is a placeholder document. Before launching publicly, this section must be replaced with a reviewed and legally appropriate privacy policy.' },
            { heading: 'Information We Collect', body: 'We collect information you provide directly when completing contact forms, creating accounts or submitting requests. We also collect usage data through standard web analytics tools. This section is a placeholder and must be completed with accurate disclosures.' },
            { heading: 'How We Use Information', body: 'Information collected is used to respond to inquiries, provide services and improve our platform. We do not sell personal information to third parties. This section is a placeholder.' },
            { heading: 'Data Security', body: 'Our platform is designed to support HIPAA-aligned data handling. We implement access controls, encrypted transmission and audit logging. Software and process design alone do not constitute HIPAA compliance. This section is a placeholder.' },
            { heading: 'Cookies and Tracking', body: 'We may use cookies and analytics tools to understand how visitors use our website. This section is a placeholder.' },
            { heading: 'Your Rights', body: 'Depending on your location, you may have rights regarding your personal data. This section is a placeholder.' },
            { heading: 'Contact', body: 'For privacy-related questions, contact us at info@u2collective.com. This section is a placeholder.' },
          ].map((s) => (
            <section key={s.heading} className="mb-8">
              <h2 className="text-[1.1rem] font-bold text-[#0B3D62] mb-3 pb-2 border-b border-[#DCE5EA]">{s.heading}</h2>
              <p className="text-[#5A6B78] text-[15px] leading-[1.7]">{s.body}</p>
            </section>
          ))}

          <div className="mt-10 p-5 rounded-xl bg-[#fffbf0] border border-[#D89B2B]/30">
            <p className="text-[13px] text-[#D89B2B] font-semibold mb-1">⚠ Placeholder Document</p>
            <p className="text-[13px] text-[#5A6B78]">
              This privacy policy is a placeholder for development purposes. It must be replaced with a
              reviewed, legally appropriate document prior to any public launch or client onboarding.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
