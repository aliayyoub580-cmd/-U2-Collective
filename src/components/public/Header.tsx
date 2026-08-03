import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, ChevronDown, Shield, CheckCircle, FileText,
  LogIn, Stethoscope, Building2, BookOpen, UserCheck, Calendar,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/utils/cn'

const NAV_ITEMS = [
  {
    label: 'Services',
    children: [
      { label: 'Provider Credentialling', href: '/services/provider-credentialling', icon: UserCheck, desc: 'Payer enrollment & primary verification' },
      { label: 'Appointment Scheduling', href: '/services/appointment-scheduling', icon: Calendar, desc: 'Patient scheduling & intake' },
      { label: 'Insurance Verification', href: '/services/insurance-verification', icon: CheckCircle, desc: 'Real-time eligibility and benefits' },
      { label: 'Authorization', href: '/services/prior-authorization', icon: Shield, desc: 'End-to-end auth management' },
      { label: 'Appeals', href: '/services/appeals', icon: FileText, desc: 'Denial management and appeals' },
    ],
  },
  {
    label: 'How It Works',
    href: '/how-it-works',
  },
  {
    label: 'Specialties',
    children: [
      { label: 'Family Medicine', href: '/specialties/family-medicine', icon: Stethoscope, desc: 'Primary care verification' },
      { label: 'Cardiology', href: '/specialties/cardiology', icon: Stethoscope, desc: 'Cardiology auth workflows' },
      { label: 'Orthopedics', href: '/specialties/orthopedics', icon: Stethoscope, desc: 'Surgical auth support' },
      { label: 'Behavioral Health', href: '/specialties/behavioral-health', icon: Stethoscope, desc: 'Mental health verification' },
      { label: 'All Specialties', href: '/specialties', icon: Building2, desc: 'View all supported specialties' },
    ],
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Resources',
    children: [
      { label: 'Blog & Insights', href: '/resources', icon: BookOpen, desc: 'RCM guides and updates' },
      { label: 'FAQ', href: '/#faq', icon: FileText, desc: 'Common questions answered' },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Lock body scroll when mobile nav open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white shadow-[0_1px_16px_rgba(11,61,98,0.10)] h-[72px]'
            : 'bg-white/90 backdrop-blur-md h-[80px]',
        )}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between" ref={dropdownRef}>
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label="U2 Collective — home"
          >
            <div className="w-9 h-9 rounded-[8px] bg-gradient-to-br from-[#0B3D62] to-[#062A46] flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm tracking-tight">U2</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-[#0B3D62] text-[17px] tracking-tight group-hover:text-[#1BA098] transition-colors">
                U2 Collective
              </span>
              <span className="text-[10px] text-[#5A6B78] tracking-widest uppercase font-medium">
                Verify · Authorize · Get Paid
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="relative">
                  <button
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 text-[14px] font-medium rounded-lg transition-colors duration-150',
                      activeDropdown === item.label
                        ? 'text-[#1BA098] bg-[#EEF6F8]'
                        : 'text-[#0B3D62] hover:text-[#1BA098] hover:bg-[#EEF6F8]',
                    )}
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={cn('transition-transform duration-200', activeDropdown === item.label && 'rotate-180')}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#DCE5EA] overflow-hidden"
                        role="menu"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            role="menuitem"
                            className="flex items-start gap-3 px-5 py-3.5 hover:bg-[#EEF6F8] transition-colors group/item"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="mt-0.5 w-7 h-7 rounded-md bg-[#EEF6F8] group-hover/item:bg-[#1BA098]/10 flex items-center justify-center shrink-0 transition-colors">
                              <child.icon size={14} className="text-[#1BA098]" />
                            </div>
                            <div>
                              <div className="text-[13px] font-semibold text-[#0B3D62] group-hover/item:text-[#1BA098] transition-colors">
                                {child.label}
                              </div>
                              <div className="text-[12px] text-[#5A6B78] mt-0.5">{child.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.href!}
                  className={({ isActive }) =>
                    cn(
                      'px-4 py-2 text-[14px] font-medium rounded-lg transition-colors duration-150',
                      isActive
                        ? 'text-[#1BA098] bg-[#EEF6F8]'
                        : 'text-[#0B3D62] hover:text-[#1BA098] hover:bg-[#EEF6F8]',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium text-[#0B3D62] hover:text-[#1BA098] hover:bg-[#EEF6F8] rounded-lg transition-colors"
            >
              <LogIn size={15} />
              Client Login
            </Link>
            <Button
              size="sm"
              onClick={() => window.location.href = '/contact'}
              className="text-[13px] px-5"
            >
              Free Billing Audit
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-[#0B3D62] hover:bg-[#EEF6F8] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[320px] bg-white shadow-2xl overflow-y-auto lg:hidden"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#DCE5EA]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-[7px] bg-[#0B3D62] flex items-center justify-center">
                    <span className="text-white font-bold text-xs">U2</span>
                  </div>
                  <span className="font-bold text-[#0B3D62] text-base">U2 Collective</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-[#5A6B78] hover:bg-[#EEF6F8]"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-5 flex flex-col gap-1">
                {NAV_ITEMS.map((item) =>
                  item.children ? (
                    <MobileAccordion key={item.label} item={item} onNavigate={() => setMobileOpen(false)} />
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href!}
                      className="px-4 py-3 text-[15px] font-medium text-[#0B3D62] hover:text-[#1BA098] hover:bg-[#EEF6F8] rounded-lg transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </div>

              <div className="p-5 border-t border-[#DCE5EA] flex flex-col gap-3">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 px-5 py-3 text-[14px] font-medium text-[#0B3D62] border border-[#0B3D62] rounded-lg hover:bg-[#EEF6F8] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <LogIn size={15} />
                  Client Login
                </Link>
                <Button size="md" className="w-full justify-center">
                  Free Billing Audit
                </Button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-[80px]" aria-hidden="true" />
    </>
  )
}

function MobileAccordion({
  item,
  onNavigate,
}: {
  item: (typeof NAV_ITEMS)[0]
  onNavigate: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-[15px] font-medium text-[#0B3D62] hover:bg-[#EEF6F8] rounded-lg transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown size={16} className={cn('transition-transform duration-200', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 mt-1 flex flex-col gap-0.5">
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#5A6B78] hover:text-[#1BA098] hover:bg-[#EEF6F8] rounded-lg transition-colors"
                  onClick={onNavigate}
                >
                  <child.icon size={14} className="text-[#1BA098] shrink-0" />
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
