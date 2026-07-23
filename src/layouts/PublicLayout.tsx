import { Outlet } from 'react-router-dom'
import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer'
import SkipToContent from '@/components/ui/SkipToContent'

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipToContent />
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
