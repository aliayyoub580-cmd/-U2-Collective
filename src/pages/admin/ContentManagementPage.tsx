import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { FileText, HelpCircle, MessageSquareQuote, Newspaper } from 'lucide-react'
import api from '@/services/api'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import ErrorState from '@/components/ui/ErrorState'

const collections = [
  { key: 'pages', label: 'Website pages', icon: FileText },
  { key: 'faqs', label: 'FAQs', icon: HelpCircle },
  { key: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { key: 'blog-posts', label: 'Resources', icon: Newspaper },
]

export default function ContentManagementPage() {
  const query = useQuery({ queryKey: ['content-summary'], queryFn: () => api.get('/content/summary').then((r) => r.data.data) })
  const counts = (query.data ?? {}) as Record<string, number>
  return <><Helmet><title>Content Management | U2 Collective Admin</title></Helmet><div className="p-6"><h1 className="text-2xl font-bold text-[#0B3D62]">Content Management</h1><p className="mt-1 text-sm text-[#5A6B78]">Manage publishable website content and SEO records.</p>{query.isLoading && <SkeletonLoader variant="card" className="mt-6" />}{query.isError && <ErrorState title="Could not load content" onRetry={query.refetch} className="mt-6" />}<div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{collections.map((item) => <section key={item.key} className="rounded-xl border border-[#DCE5EA] bg-white p-5"><item.icon className="text-[#1BA098]" size={20} /><h2 className="mt-4 font-semibold text-[#0B3D62]">{item.label}</h2><p className="mt-1 text-2xl font-bold text-[#0B3D62]">{counts[item.key] ?? 0}</p><p className="mt-2 text-xs text-[#5A6B78]">Records available in the CMS</p></section>)}</div></div></>
}
