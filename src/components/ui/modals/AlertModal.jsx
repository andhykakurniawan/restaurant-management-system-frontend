import { AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react"
import { BaseModal } from "./BaseModal"

export function AlertModal({
  isOpen,
  onClose,
  title = "Notice",
  message,
  buttonText = "OK",
  variant = "warning",
  disableBackdropClose = false,
}) {
  const variants = {
    warning: {
      icon: <AlertTriangle size={32} />,
      container: "bg-yellow-500/10 text-yellow-500",
      button: "bg-yellow-600 hover:bg-yellow-500",
    },
    error: {
      icon: <XCircle size={32} />,
      container: "bg-red-500/10 text-red-500",
      button: "bg-red-600 hover:bg-red-500",
    },
    info: {
      icon: <Info size={32} />,
      container: "bg-blue-500/10 text-blue-500",
      button: "bg-blue-600 hover:bg-blue-500",
    },
    success: {
      icon: <CheckCircle2 size={32} />,
      container: "bg-green-500/10 text-green-500",
      button: "bg-green-600 hover:bg-green-500",
    },
  }

  const selected = variants[variant] ?? variants.warning

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={disableBackdropClose ? () => {} : onClose}
      className="max-w-md"
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${selected.container}`}
        >
          {selected.icon}
        </div>

        <h3 className="text-xl font-bold text-white">
          {title}
        </h3>

        {message && (
          <p className="mt-3 text-sm text-zinc-400">
            {message}
          </p>
        )}

        <button
          onClick={onClose}
          className={`mt-8 w-full rounded-xl px-6 py-3 text-sm font-bold text-white transition ${selected.button}`}
        >
          {buttonText}
        </button>
      </div>
    </BaseModal>
  )
}