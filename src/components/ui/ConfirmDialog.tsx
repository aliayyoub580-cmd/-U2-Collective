import Modal from './Modal'
import Button from './Button'
import { AlertTriangle } from 'lucide-react'

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'destructive' | 'warning' | 'default'
  loading?: boolean
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center gap-4">
        {variant !== 'default' && (
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            variant === 'destructive' ? 'bg-[#fff5f5]' : 'bg-[#fffbf0]'
          }`}>
            <AlertTriangle
              size={22}
              className={variant === 'destructive' ? 'text-[#C94A4A]' : 'text-[#D89B2B]'}
            />
          </div>
        )}
        <div>
          <h3 className="text-[17px] font-bold text-[#0B3D62] mb-1.5">{title}</h3>
          <p className="text-[14px] text-[#5A6B78] leading-[1.65]">{description}</p>
        </div>
        <div className="flex gap-3 w-full pt-2">
          <Button variant="secondary" size="md" onClick={onClose} className="flex-1" disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'destructive' ? 'destructive' : 'primary'}
            size="md"
            onClick={onConfirm}
            className="flex-1"
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
