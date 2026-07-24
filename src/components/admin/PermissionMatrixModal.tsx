import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { CheckSquare, Square, Search, ChevronDown, ChevronRight } from 'lucide-react'
import api from '@/services/api'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { toast } from 'sonner'

interface Permission {
  key: string
  label: string
  category: string
  description?: string
}

interface PermissionMatrixModalProps {
  open: boolean
  onClose: () => void
  subAdminId: string | null
  onSaved?: () => void
}

const TEMPLATE_OPTIONS = [
  { id: '00000000-0000-0000-0000-000000000001', name: 'View Only' },
  { id: '00000000-0000-0000-0000-000000000002', name: 'Operations Manager' },
  { id: '00000000-0000-0000-0000-000000000003', name: 'Authorization Manager' },
  { id: '00000000-0000-0000-0000-000000000004', name: 'Content Manager' },
]

export default function PermissionMatrixModal({
  open, onClose, subAdminId, onSaved,
}: PermissionMatrixModalProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  // Fetch all permissions
  const { data: allPerms } = useQuery<Permission[]>({
    queryKey: ['permissions-list'],
    queryFn: () => api.get('/permissions').then(r => r.data.data),
    enabled: open,
  })

  // Fetch current sub-admin permissions if editing
  const { data: currentPerms } = useQuery<{ sub_admin_permissions: { permission_key: string }[] }>({
    queryKey: ['sub-admin-perms', subAdminId],
    queryFn: () => api.get(`/users/sub-admins/${subAdminId}/permissions`).then(r => r.data.data),
    enabled: open && !!subAdminId,
  })

  useEffect(() => {
    if (currentPerms?.sub_admin_permissions) {
      setSelected(new Set(currentPerms.sub_admin_permissions.map(p => p.permission_key)))
    } else {
      setSelected(new Set())
    }
  }, [currentPerms, subAdminId])

  useEffect(() => {
    if (open && !subAdminId) {
      setFullName('')
      setEmail('')
      setPhone('')
      setPassword('')
    }
  }, [open, subAdminId])

  // Group permissions by category
  const grouped = (allPerms ?? []).reduce<Record<string, Permission[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = []
    acc[p.category].push(p)
    return acc
  }, {})

  // Filtered
  const filteredGrouped = Object.entries(grouped).reduce<Record<string, Permission[]>>((acc, [cat, perms]) => {
    const filtered = perms.filter(p =>
      search === '' || p.label.toLowerCase().includes(search.toLowerCase()) || p.key.includes(search.toLowerCase())
    )
    if (filtered.length > 0) acc[cat] = filtered
    return acc
  }, {})

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  const togglePermission = (key: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const selectAllInCategory = (cat: string) => {
    const catPerms = grouped[cat] ?? []
    setSelected(prev => {
      const next = new Set(prev)
      catPerms.forEach(p => next.add(p.key))
      return next
    })
  }

  const clearAllInCategory = (cat: string) => {
    const catPerms = grouped[cat] ?? []
    setSelected(prev => {
      const next = new Set(prev)
      catPerms.forEach(p => next.delete(p.key))
      return next
    })
  }

  const applyTemplate = async (templateId: string) => {
    const permsRes = await api.get(`/permissions/template/${templateId}`)
    const keys = permsRes.data.data as string[]
    setSelected(new Set(keys))
    toast.info('Template applied — review before saving.')
  }

  const saveMutation = useMutation({
    mutationFn: () => subAdminId
      ? api.put(`/users/sub-admins/${subAdminId}/permissions`, { permissions: Array.from(selected) })
      : api.post('/users/sub-admins', {
          full_name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          password,
          permissions: Array.from(selected),
        }),
    onSuccess: () => {
      toast.success(subAdminId ? 'Permissions saved successfully' : 'Sub-admin created successfully')
      onSaved?.()
      onClose()
    },
    onError: (err: Error) => toast.error(err.message ?? 'Failed to save permissions'),
  })

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={subAdminId ? 'Edit Sub-Admin Permissions' : 'Create Sub-Admin'}
      description="Select the exact permissions this sub-admin will have. Every change is audit-logged."
      size="xl"
    >
      <div className="flex flex-col gap-4">
        {!subAdminId && (
          <div className="grid grid-cols-1 gap-3 rounded-lg border border-[#DCE5EA] bg-[#F7F9FA] p-4 md:grid-cols-2">
            <Input label="Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Input label="Email Address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input
              label="Temporary Password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              hint="At least 8 characters"
            />
          </div>
        )}

        {/* Template row */}
        <div>
          <p className="text-[12px] font-semibold text-[#5A6B78] uppercase tracking-wide mb-2">Apply Template</p>
          <div className="flex flex-wrap gap-2">
            {TEMPLATE_OPTIONS.map((t) => (
              <button
                key={t.id}
                onClick={() => applyTemplate(t.id)}
                className="px-3 py-1.5 text-[12px] font-medium rounded-lg border border-[#DCE5EA] text-[#0B3D62] hover:border-[#1BA098] hover:bg-[#EEF6F8] transition-colors"
              >
                {t.name}
              </button>
            ))}
            <button
              onClick={() => setSelected(new Set())}
              className="px-3 py-1.5 text-[12px] font-medium rounded-lg border border-[#DCE5EA] text-[#C94A4A] hover:border-[#C94A4A] hover:bg-[#fff5f5] transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9BAAB5]" />
          <input
            type="search"
            placeholder="Search permissions…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#DCE5EA] text-[13px] text-[#0B3D62] focus:outline-none focus:ring-2 focus:ring-[#1BA098]/40 focus:border-[#1BA098]"
          />
        </div>

        {/* Permission matrix */}
        <div className="max-h-[420px] overflow-y-auto rounded-lg border border-[#DCE5EA] divide-y divide-[#DCE5EA]">
          {Object.entries(filteredGrouped).map(([category, perms]) => {
            const isExpanded = expandedCategories.has(category)
            return (
              <div key={category}>
                {/* Category header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#F7F9FA] cursor-pointer hover:bg-[#EEF6F8] transition-colors select-none"
                  onClick={() => toggleCategory(category)}>
                  <div className="flex items-center gap-2">
                    {isExpanded ? <ChevronDown size={14} className="text-[#1BA098]" /> : <ChevronRight size={14} className="text-[#9BAAB5]" />}
                    <span className="text-[13px] font-semibold text-[#0B3D62]">{category}</span>
                    <span className="text-[11px] text-[#5A6B78]">
                      ({perms.filter(p => selected.has(p.key)).length}/{perms.length})
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                    <button
                      className="text-[11px] font-medium text-[#1BA098] hover:underline px-1.5 py-0.5"
                      onClick={() => selectAllInCategory(category)}
                    >
                      Select All
                    </button>
                    <span className="text-[#DCE5EA]">|</span>
                    <button
                      className="text-[11px] font-medium text-[#C94A4A] hover:underline px-1.5 py-0.5"
                      onClick={() => clearAllInCategory(category)}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Permissions in category */}
                {isExpanded && (
                  <div className="divide-y divide-[#F7F9FA]">
                    {perms.map((perm) => {
                      const isChecked = selected.has(perm.key)
                      return (
                        <label
                          key={perm.key}
                          className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-[#FAFCFD] transition-colors"
                        >
                          <button
                            onClick={() => togglePermission(perm.key)}
                            className="mt-0.5 shrink-0"
                            aria-checked={isChecked}
                            role="checkbox"
                            aria-label={perm.label}
                          >
                            {isChecked
                              ? <CheckSquare size={16} className="text-[#1BA098]" />
                              : <Square size={16} className="text-[#DCE5EA]" />}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-medium text-[#0B3D62]">{perm.label}</div>
                            {perm.description && (
                              <div className="text-[11px] text-[#9BAAB5] mt-0.5">{perm.description}</div>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-[#9BAAB5] shrink-0 mt-0.5">{perm.key}</span>
                        </label>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
          {Object.keys(filteredGrouped).length === 0 && (
            <div className="px-4 py-8 text-center text-[13px] text-[#9BAAB5]">No permissions match your search.</div>
          )}
        </div>

        {/* Summary & save */}
        <div className="flex items-center justify-between pt-2 border-t border-[#DCE5EA]">
          <div className="text-[13px] text-[#5A6B78]">
            <span className="font-semibold text-[#0B3D62]">{selected.size}</span> permissions selected
            {selected.size === 0 && (
              <span className="ml-2 text-[#C94A4A] text-[12px]">⚠ No permissions — this sub-admin will have no access</span>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
            <Button
              size="sm"
              onClick={() => saveMutation.mutate()}
              loading={saveMutation.isPending}
              disabled={!subAdminId && (!fullName.trim() || !email.trim() || password.length < 8)}
            >
              {subAdminId ? 'Save Permissions' : 'Create Sub-Admin'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
