import { cn } from '@/utils/cn'

interface SkeletonProps {
  className?: string
  lines?: number
  variant?: 'text' | 'card' | 'avatar' | 'table'
}

function Bone({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'bg-gradient-to-r from-[#DCE5EA] via-[#EEF6F8] to-[#DCE5EA] bg-[length:200%_100%] rounded animate-[shimmer_1.5s_infinite]',
        className,
      )}
      aria-hidden="true"
    />
  )
}

export default function SkeletonLoader({ className, lines = 3, variant = 'text' }: SkeletonProps) {
  if (variant === 'card') {
    return (
      <div className={cn('rounded-xl border border-[#DCE5EA] p-5 flex flex-col gap-3', className)}>
        <Bone className="h-4 w-1/3" />
        <Bone className="h-3 w-full" />
        <Bone className="h-3 w-4/5" />
        <Bone className="h-3 w-2/3" />
      </div>
    )
  }
  if (variant === 'avatar') {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <Bone className="w-10 h-10 rounded-full shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <Bone className="h-3 w-1/3" />
          <Bone className="h-2.5 w-1/2" />
        </div>
      </div>
    )
  }
  if (variant === 'table') {
    return (
      <div className={cn('flex flex-col', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="flex gap-4 py-3 border-b border-[#F0F4F7]">
            <Bone className="h-3 w-1/4" />
            <Bone className="h-3 w-1/3" />
            <Bone className="h-3 w-1/5" />
            <Bone className="h-3 w-1/6" />
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Bone key={i} className={cn('h-3', i === lines - 1 ? 'w-2/3' : 'w-full')} />
      ))}
    </div>
  )
}

// Add shimmer animation to tailwind config via index.css inline keyframes
