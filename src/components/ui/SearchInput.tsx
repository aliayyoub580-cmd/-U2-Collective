import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useDebounce } from '@/hooks/useDebounce'

interface SearchInputProps {
  placeholder?: string
  onSearch: (value: string) => void
  debounceMs?: number
  className?: string
  defaultValue?: string
}

export default function SearchInput({
  placeholder = 'Search…',
  onSearch,
  debounceMs = 300,
  className,
  defaultValue = '',
}: SearchInputProps) {
  const [value, setValue] = useState(defaultValue)
  const debouncedValue = useDebounce(value, debounceMs)

  useEffect(() => { onSearch(debouncedValue) }, [debouncedValue, onSearch])

  const handleChange = (v: string) => {
    setValue(v)
  }

  return (
    <div className={cn('relative', className)}>
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9BAAB5] pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-[#DCE5EA] bg-white text-[14px] text-[#0B3D62] placeholder:text-[#9BAAB5] focus:outline-none focus:ring-2 focus:ring-[#1BA098]/40 focus:border-[#1BA098] transition-all"
        aria-label={placeholder}
      />
      {value && (
        <button
          onClick={() => handleChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9BAAB5] hover:text-[#5A6B78]"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
