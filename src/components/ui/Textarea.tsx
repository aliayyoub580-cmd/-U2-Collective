import { forwardRef, TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  wrapperClassName?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, wrapperClassName, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label htmlFor={inputId} className="text-[13px] font-semibold text-[#0B3D62]">
            {label}
            {props.required && <span className="text-[#C94A4A] ml-0.5" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            'w-full rounded-lg border bg-white text-[14px] text-[#0B3D62] placeholder:text-[#9BAAB5]',
            'px-3.5 py-2.5 transition-all duration-150 resize-y min-h-[100px]',
            'focus:outline-none focus:ring-2 focus:ring-[#1BA098]/40 focus:border-[#1BA098]',
            'disabled:bg-[#F7F9FA] disabled:cursor-not-allowed',
            error ? 'border-[#C94A4A]' : 'border-[#DCE5EA]',
            className,
          )}
          {...props}
        />
        {error && <p id={`${inputId}-error`} role="alert" className="text-[12px] text-[#C94A4A]">{error}</p>}
        {hint && !error && <p className="text-[12px] text-[#5A6B78]">{hint}</p>}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'
export default Textarea
