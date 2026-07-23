import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  wrapperClassName?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, wrapperClassName, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-semibold text-[#0B3D62]"
          >
            {label}
            {props.required && (
              <span className="text-[#C94A4A] ml-0.5" aria-hidden="true">*</span>
            )}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6B78] pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            className={cn(
              'w-full rounded-lg border bg-white text-[14px] text-[#0B3D62] placeholder:text-[#9BAAB5]',
              'px-3.5 py-2.5 transition-all duration-150',
              'focus:outline-none focus:ring-2 focus:ring-[#1BA098]/40 focus:border-[#1BA098]',
              'disabled:bg-[#F7F9FA] disabled:text-[#9BAAB5] disabled:cursor-not-allowed',
              Boolean(leftIcon) && 'pl-9',
              Boolean(rightIcon) && 'pr-9',
              error
                ? 'border-[#C94A4A] focus:ring-[#C94A4A]/30 focus:border-[#C94A4A]'
                : 'border-[#DCE5EA]',
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6B78]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} role="alert" className="text-[12px] text-[#C94A4A] flex items-center gap-1">
            <span aria-hidden="true">⚠</span> {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-[12px] text-[#5A6B78]">
            {hint}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'
export default Input
