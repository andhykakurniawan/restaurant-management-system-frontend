import { useEffect } from "react";

export function BaseModal({
  isOpen,
  onClose,
  children,
  className = "",
  closeOnBackdrop = true,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e) => {
      if (e.key === "Escape" && closeOnBackdrop) {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [isOpen, onClose, closeOnBackdrop]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#141312] p-8 shadow-2xl animate-in zoom-in-95 duration-300 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}