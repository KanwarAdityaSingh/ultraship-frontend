import './ConfirmDialog.css'
import { AnimatePresence, motion } from 'framer-motion'

type ConfirmDialogProps = {
  open: boolean
  title: string
  body: string
  confirmLabel?: string
  cancelLabel?: string
  tone?: 'default' | 'danger'
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'default',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="confirm-backdrop"
          onClick={onCancel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          <motion.div
            className="confirm-panel"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 3 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <h2 className="confirm-title">{title}</h2>
            <p className="confirm-body">{body}</p>
            <div className="confirm-actions">
              <button type="button" className="ghost-chip" onClick={onCancel}>
                {cancelLabel}
              </button>
              <button
                type="button"
                className={`confirm-btn ${tone === 'danger' ? 'danger' : ''}`}
                onClick={onConfirm}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


