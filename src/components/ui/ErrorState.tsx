import { AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/utils/cn'
import Button from './Button'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export default function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      <div className="w-14 h-14 rounded-2xl bg-[#fff5f5] flex items-center justify-center mb-4">
        <AlertCircle size={24} className="text-[#C94A4A]" />
      </div>
      <h3 className="text-[16px] font-semibold text-[#0B3D62] mb-1.5">{title}</h3>
      <p className="text-[14px] text-[#5A6B78] max-w-[360px] mb-5">{description}</p>
      {onRetry && (
        <Button size="sm" variant="secondary" onClick={onRetry}>
          <RefreshCw size={14} />
          Try Again
        </Button>
      )}
    </div>
  )
}
