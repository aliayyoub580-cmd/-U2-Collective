import { Helmet } from 'react-helmet-async'
import { Bell, Shield, Database, Mail, Globe } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const SECTIONS = [
  { id: 'company', icon: Globe, label: 'Company Profile' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'integrations', icon: Database, label: 'Integrations' },
  { id: 'email', icon: Mail, label: 'Email Templates' },
]

export default function SettingsPage() {
  return (
    <>
      <Helmet><title>Settings | U2 Collective Admin</title></Helmet>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-[1.5rem] font-bold text-[#0B3D62]">Settings</h1>
          <p className="text-[#5A6B78] text-[14px] mt-0.5">Configure platform-wide settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Sidebar nav */}
          <div className="bg-white rounded-xl border border-[#DCE5EA] p-3 h-fit">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium text-[#5A6B78] hover:bg-[#EEF6F8] hover:text-[#0B3D62] transition-colors text-left"
              >
                <s.icon size={15} className="text-[#1BA098]" />
                {s.label}
              </button>
            ))}
          </div>

          {/* Content area */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Company Profile */}
            <div className="bg-white rounded-xl border border-[#DCE5EA] p-6">
              <h2 className="text-[15px] font-bold text-[#0B3D62] mb-5">Company Profile</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input label="Company Name" defaultValue="U2 Collective" />
                <Input label="Support Email" type="email" defaultValue="support@u2collective.com" />
                <Input label="Support Phone" defaultValue="(800) 000-0000" />
                <Input label="Website" defaultValue="https://u2collective.com" />
              </div>
              <Button size="sm">Save Changes</Button>
            </div>

            {/* Security */}
            <div className="bg-white rounded-xl border border-[#DCE5EA] p-6">
              <h2 className="text-[15px] font-bold text-[#0B3D62] mb-5">Security Settings</h2>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Require MFA for Admin accounts', hint: 'Users with admin roles must complete MFA on login.', enabled: false },
                  { label: 'Session timeout after inactivity', hint: 'Automatically log out inactive sessions after 30 minutes.', enabled: true },
                  { label: 'Authentication attempt logging', hint: 'Record all login attempts to the audit log.', enabled: true },
                ].map(s => (
                  <div key={s.label} className="flex items-start justify-between gap-4 p-4 rounded-lg bg-[#F7F9FA] border border-[#DCE5EA]">
                    <div>
                      <div className="text-[13px] font-semibold text-[#0B3D62]">{s.label}</div>
                      <div className="text-[12px] text-[#5A6B78] mt-0.5">{s.hint}</div>
                    </div>
                    <div className={`w-10 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${s.enabled ? 'bg-[#1BA098]' : 'bg-[#DCE5EA]'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full mt-1 shadow-sm transition-all ${s.enabled ? 'ml-5' : 'ml-1'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* File upload limits */}
            <div className="bg-white rounded-xl border border-[#DCE5EA] p-6">
              <h2 className="text-[15px] font-bold text-[#0B3D62] mb-5">Document Storage</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input label="Max File Size (MB)" type="number" defaultValue="25" hint="Maximum upload size per document" />
                <Input label="Signed URL Expiry (seconds)" type="number" defaultValue="3600" hint="How long download links remain valid" />
              </div>
              <div className="p-4 rounded-lg bg-[#EEF6F8] border border-[#DCE5EA] mb-4">
                <p className="text-[12px] font-semibold text-[#0B3D62] mb-1">Allowed File Types</p>
                <p className="text-[12px] text-[#5A6B78]">PDF, PNG, JPEG, TIFF, DOC, DOCX</p>
              </div>
              <Button size="sm">Save Storage Settings</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
