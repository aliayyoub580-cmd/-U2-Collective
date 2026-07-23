import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Bell, ClipboardCheck, FileText, Home, LogOut, Menu, X, BarChart2 } from 'lucide-react'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/store'
import { cn } from '@/utils/cn'

const LINKS = [
  { to: '/portal/dashboard', label: 'Overview', icon: Home },
  { to: '/portal/verifications', label: 'Verifications', icon: ClipboardCheck },
  { to: '/portal/authorizations', label: 'Authorizations', icon: FileText },
  { to: '/portal/reports', label: 'Reports', icon: BarChart2 },
]

export default function ClientLayout() {
  const [open, setOpen] = useState(false)
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  const signOut = async () => {
    await authService.logout()
    navigate('/login', { replace: true })
  }

  const navigation = (
    <nav className="flex flex-col gap-1" aria-label="Client portal navigation">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={() => setOpen(false)}
          className={({ isActive }) => cn(
            'flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
            isActive ? 'bg-[#E6F7F7] text-[#0B3D62]' : 'text-[#5A6B78] hover:bg-[#F7F9FA] hover:text-[#0B3D62]',
          )}
        >
          <link.icon size={18} aria-hidden="true" />
          {link.label}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <div className="flex min-h-screen bg-[#F7F9FA]">
      <aside className="hidden w-64 shrink-0 border-r border-[#DCE5EA] bg-white p-5 lg:block">
        <NavLink to="/portal/dashboard" className="mb-8 block text-xl font-bold text-[#0B3D62]">
          U2 <span className="text-[#1BA098]">Collective</span>
          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5A6B78]">Client Portal</span>
        </NavLink>
        {navigation}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-[#062A46]/50" onClick={() => setOpen(false)} aria-label="Close navigation" />
          <aside className="relative h-full w-72 bg-white p-5 shadow-xl">
            <div className="mb-7 flex items-center justify-between">
              <span className="font-bold text-[#0B3D62]">U2 Collective</span>
              <button className="p-2 text-[#5A6B78]" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={20} /></button>
            </div>
            {navigation}
          </aside>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#DCE5EA] bg-white px-4 sm:px-6">
          <button className="p-2 text-[#0B3D62] lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu size={21} /></button>
          <div className="hidden text-sm font-semibold text-[#0B3D62] sm:block">Secure Client Workspace</div>
          <div className="flex items-center gap-2">
            <NavLink to="/portal/dashboard" className="p-2 text-[#5A6B78]" aria-label="Notifications"><Bell size={18} /></NavLink>
            <span className="hidden text-xs text-[#5A6B78] sm:inline">{user?.full_name}</span>
            <button onClick={signOut} className="p-2 text-[#5A6B78] hover:text-[#C94A4A]" aria-label="Sign out"><LogOut size={18} /></button>
          </div>
        </header>
        <main id="client-main" className="mx-auto max-w-[1400px] p-4 sm:p-6"><Outlet /></main>
      </div>
    </div>
  )
}
