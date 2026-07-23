import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[#1BA098] text-white hover:-translate-y-0.5 hover:bg-[#179088] active:translate-y-0 shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#1BA098] focus-visible:ring-offset-2',
  secondary:
    'bg-white text-[#0B3D62] border border-[#0B3D62] hover:-translate-y-0.5 hover:bg-[#EEF6F8] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[#0B3D62] focus-visible:ring-offset-2',
  ghost:
    'text-[#0B3D62] hover:bg-[#EEF6F8] active:bg-[#DCE5EA] focus-visible:ring-2 focus-visible:ring-[#0B3D62] focus-visible:ring-offset-2',
  destructive:
    'bg-[#C94A4A] text-white hover:-translate-y-0.5 hover:bg-[#b53e3e] active:translate-y-0 shadow-sm focus-visible:ring-2 focus-visible:ring-[#C94A4A] focus-visible:ring-offset-2',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-base font-semibold',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 cursor-pointer select-none',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export default Button
