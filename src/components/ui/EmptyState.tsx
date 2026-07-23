import { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import Button from './Button'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export default function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-[#EEF6F8] flex items-center justify-center mb-4 text-[#1BA098]">
          {icon}
        </div>
      )}
      <h3 className="text-[16px] font-semibold text-[#0B3D62] mb-1.5">{title}</h3>
      {description && (
        <p className="text-[14px] text-[#5A6B78] leading-[1.65] max-w-[360px] mb-5">{description}</p>
      )}
      {action && (
        <Button size="sm" onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  )
}
