import {
  AlertTriangle,
  XCircle,
  CheckCircle,
  Info,
} from "lucide-react"
import { BaseModal } from "./BaseModal"

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Yes, Proceed",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
}) {
  const styles = {
    danger: {
      icon: <AlertTriangle size={32} strokeWidth={2.5} />,
      wrapper: "bg-orange-500/10 text-orange-500",
      button: "bg-orange-600 hover:bg-orange-500 shadow-orange-900/20",
    },
    error: {
      icon: <XCircle size={32} />,
      wrapper: "bg-red-500/10 text-red-500",
      button: "bg-red-600 hover:bg-red-500",
    },
    warning: {
      icon: <AlertTriangle size={32} />,
      wrapper: "bg-yellow-500/10 text-yellow-500",
      button: "bg-yellow-600 hover:bg-yellow-500",
    },
    info: {
      icon: <Info size={32} />,
      wrapper: "bg-blue-500/10 text-blue-500",
      button: "bg-blue-600 hover:bg-blue-500",
    },
    success: {
      icon: <CheckCircle size={32} />,
      wrapper: "bg-green-500/10 text-green-500",
      button: "bg-green-600 hover:bg-green-500",
    },
  }

  const current = styles[variant] ?? styles.danger

  const handleConfirm = () => {
    if (!onConfirm) return
    onConfirm()
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={loading ? () => {} : onClose}
      closeOnBackdrop={!loading}
      className="max-w-md"
    >
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div
          className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${current.wrapper}`}
        >
          {current.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white tracking-tight">
          {title}
        </h3>

        {/* Message */}
        {message && (
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            {message}
          </p>
        )}

        {/* Buttons */}
        <div className="mt-8 flex w-full gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-xl bg-white/5 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10 active:scale-95 transition disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`flex-1 rounded-xl px-6 py-3.5 text-sm font-black uppercase tracking-widest text-white active:scale-95 transition shadow-lg disabled:opacity-50 ${current.button}`}
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </BaseModal>
  )
}