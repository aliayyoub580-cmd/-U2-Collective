import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1', className)}>
      <ol className="flex items-center gap-1 flex-wrap" role="list">
        <li>
          <Link to="/" className="text-[#5A6B78] hover:text-[#1BA098] transition-colors" aria-label="Home">
            <Home size={13} />
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-1">
              <ChevronRight size={12} className="text-[#DCE5EA]" aria-hidden="true" />
              {isLast || !item.href ? (
                <span
                  className={cn(
                    'text-[13px]',
                    isLast ? 'font-medium text-[#0B3D62]' : 'text-[#5A6B78]',
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="text-[13px] text-[#5A6B78] hover:text-[#1BA098] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
