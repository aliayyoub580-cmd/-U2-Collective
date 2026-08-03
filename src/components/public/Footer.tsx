import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, ArrowRight } from 'lucide-react'

const SERVICES = [
  { label: 'Provider Credentialling', href: '/services/provider-credentialling' },
  { label: 'Appointment Scheduling', href: '/services/appointment-scheduling' },
  { label: 'Insurance Verification', href: '/services/insurance-verification' },
  { label: 'Authorization', href: '/services/prior-authorization' },
  { label: 'Appeals', href: '/services/appeals' },
]

const SPECIALTIES = [
  { label: 'Family Medicine', href: '/specialties/family-medicine' },
  { label: 'Cardiology', href: '/specialties/cardiology' },
  { label: 'Orthopedics', href: '/specialties/orthopedics' },
  { label: 'Behavioral Health', href: '/specialties/behavioral-health' },
  { label: 'All Specialties', href: '/specialties' },
]

const COMPANY = [
  { label: 'About U2 Collective', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Resources & Blog', href: '/resources' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Book a Consultation', href: '/contact' },
]

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'HIPAA & Security', href: '/hipaa-security' },
]

export default function Footer() {
  return (
    <footer className="bg-[#062A46] text-white" role="contentinfo">
      {/* Main grid */}
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group w-fit">
              <div className="w-9 h-9 rounded-[8px] bg-gradient-to-br from-[#1BA098] to-[#0B3D62] flex items-center justify-center">
                <span className="text-white font-bold text-sm">U2</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-white text-[17px] tracking-tight">U2 Collective</span>
                <span className="text-[10px] text-[#93BAD0] tracking-widest uppercase">
                  Verify · Authorize · Get Paid
                </span>
              </div>
            </Link>
            <p className="text-[#93BAD0] text-[14px] leading-[1.7] max-w-[300px] mb-6">
              U2 Collective provides professional insurance verification and prior authorization
              support for physician practices, clinics and healthcare organizations across the U.S.
            </p>
            {/* Contact info */}
            <div className="flex flex-col gap-2.5 mb-6">
              {[
                { icon: Mail, text: 'support@u2collective.com' },
                { icon: Phone, text: '(800) 000-0000' },
                { icon: MapPin, text: 'United States' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-[13px] text-[#93BAD0]">
                  <Icon size={13} className="text-[#1BA098] shrink-0" />
                  {text}
                </div>
              ))}
            </div>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Twitter, label: 'Twitter / X' },
                { icon: Facebook, label: 'Facebook' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-white/15 flex items-center justify-center text-[#93BAD0] hover:text-white hover:border-[#1BA098] hover:bg-[#1BA098]/15 transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-widest text-[#22B8B5] mb-4">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-[14px] text-[#93BAD0] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-widest text-[#22B8B5] mb-4">
              Specialties
            </h3>
            <ul className="flex flex-col gap-2.5">
              {SPECIALTIES.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-[14px] text-[#93BAD0] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-widest text-[#22B8B5] mb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5 mb-6">
              {COMPANY.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-[14px] text-[#93BAD0] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Client Login */}
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#22B8B5] hover:text-white transition-colors"
            >
              Client Portal Login
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-white/10 border-b border-white/10 mb-8">
          <div className="max-w-[460px]">
            <h3 className="text-[15px] font-semibold text-white mb-1.5">
              Stay Informed on RCM Changes
            </h3>
            <p className="text-[13px] text-[#93BAD0] mb-4">
              Payer updates, compliance news and workflow tips — straight to your inbox.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="Your work email"
                required
                className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-[#93BAD0] text-[14px] focus:outline-none focus:border-[#1BA098] transition-colors"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#1BA098] text-white text-[14px] font-semibold rounded-lg hover:bg-[#179088] transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-[12px] text-[#5A6B78] leading-relaxed max-w-[680px]">
            <p>
              &copy; {new Date().getFullYear()} U2 Collective. All rights reserved.
            </p>
            <p className="mt-1">
              Service outcomes vary by payer, documentation quality, specialty and individual case
              requirements. U2 Collective does not guarantee authorization approval or reimbursement.
              Designed to support HIPAA-aligned workflows and secure data handling.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            {LEGAL.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className="text-[12px] text-[#5A6B78] hover:text-[#93BAD0] transition-colors whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
