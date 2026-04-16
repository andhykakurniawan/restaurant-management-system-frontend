import { useEffect } from "react"
import { CheckCircle } from "lucide-react"
import { BaseModal } from "./BaseModal"

export function SuccessModal({
  isOpen,
  onClose,
  title = "Success",
  message,
  buttonText = "Continue",
  autoClose = false,
  autoCloseDelay = 1500,
}) {
  useEffect(() => {
    if (!isOpen || !autoClose) return

    const timer = setTimeout(() => {
      onClose()
    }, autoCloseDelay)

    return () => clearTimeout(timer)
  }, [isOpen, autoClose, autoCloseDelay, onClose])

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdrop={!autoClose}
      className="max-w-md"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 text-green-500">
          <CheckCircle size={32} />
        </div>

        <h3 className="text-xl font-bold text-white">
          {title}
        </h3>

        {message && (
          <p className="mt-3 text-sm text-zinc-400">
            {message}
          </p>
        )}

        {!autoClose && (
          <button
            onClick={onClose}
            className="mt-8 w-full rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white hover:bg-green-500 transition"
          >
            {buttonText}
          </button>
        )}
      </div>
    </BaseModal>
  )
}