import { Helmet } from 'react-helmet-async'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | U2 Collective</title>
        <link rel="canonical" href="https://u2collective.com/terms" />
      </Helmet>

      <div className="bg-[#EEF6F8] border-b border-[#DCE5EA]">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <Breadcrumb items={[{ label: 'Terms of Service' }]} />
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-[780px] mx-auto px-6">
          <div className="mb-10">
            <h1 className="text-[2.2rem] font-bold text-[#0B3D62] mb-3">Terms of Service</h1>
            <p className="text-[#5A6B78] text-[14px]">Last updated: July 2026 — Placeholder. Replace with reviewed legal document before go-live.</p>
          </div>

          {[
            { heading: 'Acceptance of Terms', body: 'By accessing or using U2 Collective services or platform, you agree to be bound by these terms. This is a placeholder document.' },
            { heading: 'Services Provided', body: 'U2 Collective provides insurance verification and prior authorization support services to healthcare organizations. Service outcomes vary by payer, documentation quality, specialty and individual case requirements. We do not guarantee authorization approval or reimbursement.' },
            { heading: 'Client Responsibilities', body: 'Clients are responsible for providing accurate patient and insurance information, maintaining appropriate authorizations for information sharing, and ensuring compliance with applicable regulations within their own organization. This section is a placeholder.' },
            { heading: 'Limitation of Liability', body: 'This section is a placeholder. Final terms must be reviewed and approved by qualified legal counsel before go-live.' },
            { heading: 'Confidentiality', body: 'Both parties agree to maintain confidentiality of proprietary information. This section is a placeholder.' },
            { heading: 'Governing Law', body: 'This section is a placeholder and must be completed prior to launch.' },
          ].map((s) => (
            <section key={s.heading} className="mb-8">
              <h2 className="text-[1.1rem] font-bold text-[#0B3D62] mb-3 pb-2 border-b border-[#DCE5EA]">{s.heading}</h2>
              <p className="text-[#5A6B78] text-[15px] leading-[1.7]">{s.body}</p>
            </section>
          ))}

          <div className="mt-10 p-5 rounded-xl bg-[#fffbf0] border border-[#D89B2B]/30">
            <p className="text-[13px] text-[#D89B2B] font-semibold mb-1">⚠ Placeholder Document</p>
            <p className="text-[13px] text-[#5A6B78]">
              This terms of service is a placeholder. Replace with a reviewed legal document before any client onboarding.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
