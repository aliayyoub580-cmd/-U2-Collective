import { useEffect, useRef, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useScrollLock } from '@/hooks/useScrollLock'

type DrawerSide = 'left' | 'right'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  side?: DrawerSide
  width?: string
  className?: string
}

const slideVariants = {
  left: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },
  right: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },
}

export default function Drawer({
  open,
  onClose,
  title,
  children,
  side = 'right',
  width = '400px',
  className,
}: DrawerProps) {
  const ref = useRef<HTMLDivElement>(null)
  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const v = slideVariants[side]

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            ref={ref}
            initial={v.initial}
            animate={v.animate}
            exit={v.exit}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ width, maxWidth: '95vw' }}
            className={cn(
              'absolute top-0 bottom-0 bg-white shadow-2xl flex flex-col overflow-hidden',
              side === 'right' ? 'right-0' : 'left-0',
              className,
            )}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#DCE5EA] shrink-0">
              {title && <h2 className="text-[16px] font-bold text-[#0B3D62]">{title}</h2>}
              <button
                onClick={onClose}
                className="ml-auto p-1.5 rounded-lg text-[#5A6B78] hover:bg-[#F7F9FA] transition-colors"
                aria-label="Close panel"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
