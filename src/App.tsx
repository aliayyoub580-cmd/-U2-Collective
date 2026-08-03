import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import PublicLayout from '@/layouts/PublicLayout'
import AdminLayout from '@/layouts/AdminLayout'
import ClientLayout from '@/layouts/ClientLayout'
import AuthGuard from '@/components/auth/AuthGuard'
import PageLoader from '@/components/ui/PageLoader'
import { authService } from '@/services/auth.service'

// ── Public pages ──────────────────────────────────────────────────────────────
const HomePage                   = lazy(() => import('@/pages/public/HomePage'))
const ProviderCredentiallingPage = lazy(() => import('@/pages/public/ProviderCredentiallingPage'))
const AppointmentSchedulingPage  = lazy(() => import('@/pages/public/AppointmentSchedulingPage'))
const InsuranceVerificationPage  = lazy(() => import('@/pages/public/InsuranceVerificationPage'))
const PriorAuthorizationPage     = lazy(() => import('@/pages/public/PriorAuthorizationPage'))
const AuthorizationAppealsPage   = lazy(() => import('@/pages/public/AuthorizationAppealsPage'))
const HowItWorksPage             = lazy(() => import('@/pages/public/HowItWorksPage'))
const SpecialtiesPage            = lazy(() => import('@/pages/public/SpecialtiesPage'))
const AboutPage                  = lazy(() => import('@/pages/public/AboutPage'))
const ResourcesPage              = lazy(() => import('@/pages/public/ResourcesPage'))
const ContactPage                = lazy(() => import('@/pages/public/ContactPage'))
const LoginPage                  = lazy(() => import('@/pages/public/LoginPage'))
const PrivacyPolicyPage          = lazy(() => import('@/pages/public/PrivacyPolicyPage'))
const TermsPage                  = lazy(() => import('@/pages/public/TermsPage'))
const HipaaSecurityPage          = lazy(() => import('@/pages/public/HipaaSecurityPage'))
const NotFoundPage               = lazy(() => import('@/pages/public/NotFoundPage'))

// ── Admin pages ───────────────────────────────────────────────────────────────
const AdminDashboardPage  = lazy(() => import('@/pages/admin/AdminDashboardPage'))
const UsersPage           = lazy(() => import('@/pages/admin/UsersPage'))
const SubAdminsPage       = lazy(() => import('@/pages/admin/SubAdminsPage'))
const ClientsPage         = lazy(() => import('@/pages/admin/ClientsPage'))
const VerificationsPage   = lazy(() => import('@/pages/admin/VerificationsPage'))
const AuthorizationsPage  = lazy(() => import('@/pages/admin/AuthorizationsPage'))
const ReportsPage         = lazy(() => import('@/pages/admin/ReportsPage'))
const AuditLogsPage       = lazy(() => import('@/pages/admin/AuditLogsPage'))
const SettingsPage        = lazy(() => import('@/pages/admin/SettingsPage'))
const ContentManagementPage = lazy(() => import('@/pages/admin/ContentManagementPage'))
const ClientDashboardPage = lazy(() => import('@/pages/client/ClientDashboardPage'))

const ADMIN_ROLES = ['super_admin', 'admin', 'sub_admin', 'manager', 'verification_specialist', 'authorization_specialist'] as const
const CLIENT_ROLES = ['client_admin', 'client_staff', 'readonly_client'] as const

export default function App() {
  // Restore auth session on app load
  useEffect(() => {
    authService.restoreSession()
    const { data: { subscription } } = authService.onAuthStateChange(() => {})
    return () => subscription.unsubscribe()
  }, [])

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── Public website ─────────────────────────────────────────────── */}
        <Route element={<PublicLayout />}>
          <Route path="/"                                element={<HomePage />} />
          <Route path="/services/provider-credentialling" element={<ProviderCredentiallingPage />} />
          <Route path="/services/appointment-scheduling"  element={<AppointmentSchedulingPage />} />
          <Route path="/services/insurance-verification"  element={<InsuranceVerificationPage />} />
          <Route path="/services/prior-authorization"     element={<PriorAuthorizationPage />} />
          <Route path="/services/appeals"                 element={<AuthorizationAppealsPage />} />
          <Route path="/how-it-works"                    element={<HowItWorksPage />} />
          <Route path="/specialties"                    element={<SpecialtiesPage />} />
          <Route path="/specialties/:slug"              element={<SpecialtiesPage />} />
          <Route path="/about"                          element={<AboutPage />} />
          <Route path="/resources"                      element={<ResourcesPage />} />
          <Route path="/resources/:slug"                element={<ResourcesPage />} />
          <Route path="/contact"                        element={<ContactPage />} />
          <Route path="/login"                          element={<LoginPage />} />
          <Route path="/privacy-policy"                 element={<PrivacyPolicyPage />} />
          <Route path="/terms"                          element={<TermsPage />} />
          <Route path="/hipaa-security"                 element={<HipaaSecurityPage />} />
        </Route>

        {/* ── Admin panel — staff only ───────────────────────────────────── */}
        <Route element={<AuthGuard allowedRoles={[...ADMIN_ROLES]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard"      element={<AdminDashboardPage />} />
            <Route path="/admin/users"          element={<UsersPage />} />
            <Route path="/admin/sub-admins"     element={<SubAdminsPage />} />
            <Route path="/admin/clients"        element={<ClientsPage />} />
            <Route path="/admin/verifications"  element={<VerificationsPage />} />
            <Route path="/admin/authorizations" element={<AuthorizationsPage />} />
            <Route path="/admin/reports"        element={<ReportsPage />} />
            <Route path="/admin/audit-logs"     element={<AuditLogsPage />} />
            <Route path="/admin/settings"       element={<SettingsPage />} />
            <Route path="/admin/content"        element={<ContentManagementPage />} />
          </Route>
        </Route>

        <Route element={<AuthGuard allowedRoles={[...CLIENT_ROLES]} />}>
          <Route element={<ClientLayout />}>
            <Route path="/portal/dashboard"      element={<ClientDashboardPage />} />
            <Route path="/portal/verifications"  element={<VerificationsPage />} />
            <Route path="/portal/authorizations" element={<AuthorizationsPage />} />
            <Route path="/portal/reports"        element={<ReportsPage />} />
          </Route>
        </Route>

        {/* ── Catch-all ─────────────────────────────────────────────────── */}
        <Route element={<PublicLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
