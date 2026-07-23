import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | U2 Collective</title>
      </Helmet>
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F7F9FA] px-6">
        <div className="text-center max-w-[480px]">
          <div className="mb-6 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-[#EEF6F8] border border-[#DCE5EA] flex items-center justify-center">
              <span className="text-[2.5rem] font-bold text-[#1BA098]">404</span>
            </div>
          </div>
          <h1 className="text-[2rem] font-bold text-[#0B3D62] mb-3">Page Not Found</h1>
          <p className="text-[#5A6B78] text-base mb-8 leading-[1.65]">
            The page you are looking for may have moved or does not exist. Return to the homepage
            to continue.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button size="md" className="gap-2">
                <Home size={16} />
                Back to Home
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="md" variant="secondary" className="gap-2">
                <ArrowLeft size={16} />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
