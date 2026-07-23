import { forwardRef, SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: SelectOption[]
  placeholder?: string
  wrapperClassName?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, placeholder, wrapperClassName, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label htmlFor={inputId} className="text-[13px] font-semibold text-[#0B3D62]">
            {label}
            {props.required && <span className="text-[#C94A4A] ml-0.5" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              'w-full appearance-none rounded-lg border bg-white text-[14px] text-[#0B3D62]',
              'px-3.5 py-2.5 pr-9 transition-all duration-150',
              'focus:outline-none focus:ring-2 focus:ring-[#1BA098]/40 focus:border-[#1BA098]',
              'disabled:bg-[#F7F9FA] disabled:cursor-not-allowed',
              error ? 'border-[#C94A4A]' : 'border-[#DCE5EA]',
              className,
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6B78] pointer-events-none" />
        </div>
        {error && <p id={`${inputId}-error`} role="alert" className="text-[12px] text-[#C94A4A]">{error}</p>}
        {hint && !error && <p className="text-[12px] text-[#5A6B78]">{hint}</p>}
      </div>
    )
  },
)
Select.displayName = 'Select'
export default Select
