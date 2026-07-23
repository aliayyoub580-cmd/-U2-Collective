import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'
import Button from './Button'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export default function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
    if (totalPages <= 7) return i + 1
    if (page <= 4) return i + 1 <= 5 ? i + 1 : i === 5 ? '...' : totalPages
    if (page >= totalPages - 3)
      return i === 0 ? 1 : i === 1 ? '...' : totalPages - (6 - i)
    return i === 0 ? 1 : i === 1 ? '...' : i === 5 ? '...' : i === 6 ? totalPages : page - 2 + (i - 2)
  })

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="px-2"
      >
        <ChevronLeft size={16} />
      </Button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-[#5A6B78] text-sm select-none">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            aria-current={p === page ? 'page' : undefined}
            className={cn(
              'w-8 h-8 text-[13px] font-medium rounded-lg transition-colors',
              p === page
                ? 'bg-[#0B3D62] text-white'
                : 'text-[#5A6B78] hover:bg-[#EEF6F8] hover:text-[#0B3D62]',
            )}
          >
            {p}
          </button>
        ),
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className="px-2"
      >
        <ChevronRight size={16} />
      </Button>
    </nav>
  )
}
