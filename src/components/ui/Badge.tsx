import { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'navy' | 'outline'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  dot?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  default:  'bg-[#EEF6F8] text-[#0B3D62] border-transparent',
  success:  'bg-[#f0faf5] text-[#278A6B] border-transparent',
  warning:  'bg-[#fffbf0] text-[#D89B2B] border-transparent',
  error:    'bg-[#fff5f5] text-[#C94A4A] border-transparent',
  info:     'bg-[#e6f7f7] text-[#1BA098] border-transparent',
  navy:     'bg-[#0B3D62] text-white border-transparent',
  outline:  'bg-transparent text-[#5A6B78] border-[#DCE5EA]',
}

const dotColors: Record<BadgeVariant, string> = {
  default:  'bg-[#0B3D62]',
  success:  'bg-[#278A6B]',
  warning:  'bg-[#D89B2B]',
  error:    'bg-[#C94A4A]',
  info:     'bg-[#1BA098]',
  navy:     'bg-white',
  outline:  'bg-[#5A6B78]',
}

export default function Badge({
  variant = 'default',
  size = 'sm',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium border rounded-full',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
