import { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, Shield, Building2, ClipboardCheck,
  FileText, BarChart2, Settings, Bell, LogOut, Menu, X,
  ChevronDown, Activity, BookOpen,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { useAuthStore, useUIStore, useNotificationStore } from '@/store/index'
import { authService } from '@/services/auth.service'
import { toast } from 'sonner'

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/admin/activity', icon: Activity, label: 'Activity' },
    ],
  },
  {
    label: 'People',
    items: [
      { to: '/admin/users', icon: Users, label: 'Users' },
      { to: '/admin/sub-admins', icon: Shield, label: 'Sub-Admins' },
      { to: '/admin/clients', icon: Building2, label: 'Clients' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { to: '/admin/verifications', icon: ClipboardCheck, label: 'Verifications' },
      { to: '/admin/authorizations', icon: FileText, label: 'Authorizations' },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { to: '/admin/reports', icon: BarChart2, label: 'Reports' },
      { to: '/admin/audit-logs', icon: BookOpen, label: 'Audit Logs' },
    ],
  },
  {
    label: 'System',
    items: [
      { to: '/admin/content', icon: BookOpen, label: 'Content' },
      { to: '/admin/settings', icon: Settings, label: 'Settings' },
    ],
  },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { sidebarOpen, toggleSidebar } = useUIStore()
  const { unreadCount } = useNotificationStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile sidebar on route change
  useEffect(() => { setMobileOpen(false) }, [navigate])

  const handleLogout = async () => {
    await authService.logout()
    toast.success('Signed out successfully')
    navigate('/login')
  }

  const initials = user?.full_name
    ?.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() ?? 'U'

  return (
    <div className="flex h-screen bg-[#F7F9FA] overflow-hidden">
      {/* ── Desktop Sidebar ───────────────────────────────────────────────── */}
      <aside
        className={cn(
          'hidden lg:flex flex-col bg-[#062A46] text-white transition-all duration-300 shrink-0',
          sidebarOpen ? 'w-[240px]' : 'w-[68px]',
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#1BA098] flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xs">U2</span>
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <div className="font-bold text-white text-[15px] whitespace-nowrap">U2 Collective</div>
              <div className="text-[10px] text-white/40 whitespace-nowrap">Admin Panel</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-2">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mb-2">
              {sidebarOpen && (
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  {group.label}
                </div>
              )}
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg transition-all duration-150 group',
                      sidebarOpen ? 'px-3 py-2.5' : 'px-2 py-2.5 justify-center',
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'text-white/60 hover:bg-white/10 hover:text-white',
                    )
                  }
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <item.icon size={17} strokeWidth={1.8} className="shrink-0" />
                  {sidebarOpen && (
                    <span className="text-[13px] font-medium whitespace-nowrap">{item.label}</span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="px-2 py-3 border-t border-white/10">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center gap-2 p-2 rounded-lg text-white/50 hover:bg-white/10 hover:text-white transition-colors"
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <ChevronDown
              size={16}
              className={cn('transition-transform duration-300', sidebarOpen ? '-rotate-90' : 'rotate-90')}
            />
          </button>
        </div>
      </aside>

      {/* ── Mobile Overlay ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 top-0 bottom-0 z-50 w-[260px] bg-[#062A46] text-white flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#1BA098] flex items-center justify-center">
                    <span className="text-white font-bold text-xs">U2</span>
                  </div>
                  <span className="font-bold text-white text-[15px]">Admin Panel</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 text-white/60 hover:text-white">
                  <X size={18} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4 px-2 flex flex-col gap-1">
                {NAV_GROUPS.map((group) => (
                  <div key={group.label} className="mb-2">
                    <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                      {group.label}
                    </div>
                    {group.items.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                            isActive ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white',
                          )
                        }
                      >
                        <item.icon size={17} strokeWidth={1.8} />
                        <span className="text-[13px] font-medium">{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main area ──────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-[#DCE5EA] flex items-center justify-between px-5 shrink-0 shadow-[0_1px_4px_rgba(11,61,98,0.06)]">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-[#5A6B78] hover:bg-[#EEF6F8]"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>
            {/* Page title filled by child routes via context — placeholder */}
            <div className="text-[14px] font-semibold text-[#0B3D62] hidden sm:block">
              Admin Panel
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Link
              to="/admin/notifications"
              className="relative p-2 rounded-lg text-[#5A6B78] hover:bg-[#EEF6F8] hover:text-[#0B3D62] transition-colors"
              aria-label={`Notifications${unreadCount > 0 ? ` — ${unreadCount} unread` : ''}`}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C94A4A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>

            {/* User menu */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-[#DCE5EA]">
              <div className="w-8 h-8 rounded-full bg-[#0B3D62] flex items-center justify-center text-white text-[12px] font-bold shrink-0">
                {initials}
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[13px] font-semibold text-[#0B3D62]">{user?.full_name ?? 'Admin'}</span>
                <span className="text-[11px] text-[#5A6B78] capitalize">{user?.role?.replace('_', ' ')}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-[#5A6B78] hover:bg-[#EEF6F8] hover:text-[#C94A4A] transition-colors"
                title="Sign out"
                aria-label="Sign out"
              >
                <LogOut size={15} />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main
          id="admin-main"
          className="flex-1 overflow-y-auto"
          tabIndex={-1}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
