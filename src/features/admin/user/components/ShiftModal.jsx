import { useState } from "react"
import { BaseModal } from "@/components/ui/modals"
import { X, Save, CalendarPlus, Clock8, Timer } from "lucide-react"

export default function ShiftModal({
    isOpen,
    onClose,
    onSubmit,
    initialData = null,
}) {
    const isEdit = !!initialData

    const [formData, setFormData] = useState({
        shiftName: initialData?.shiftName ?? "",
        startTime: initialData?.startTime ?? "09:00",
        endTime: initialData?.endTime ?? "17:00",
        graceMinutes: initialData?.graceMinutes ?? "15",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
        onClose()
    }

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} className="max-w-lg">
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />

                {/* Modal Content */}
                <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#141312] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-temu-bronze/10 text-temu-bronze shadow-[0_0_15px_rgba(212,163,115,0.1)]">
                                {isEdit ? <Save size={20} /> : <CalendarPlus size={20} />}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight">
                                    {isEdit ? "Update Shift" : "Add New Shift"}
                                </h2>
                                <p className="text-[10px] text-temu-coffee uppercase tracking-[0.2em] font-black mt-0.5">
                                    {isEdit ? "Modify working hours" : "Create operational schedule"}
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="rounded-full p-2 text-zinc-500 hover:bg-white/5 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Shift Name */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1">Shift Name</label>
                            <input
                                value={formData.shiftName}
                                onChange={(e) => setFormData({...formData, shiftName: e.target.value})}
                                placeholder="e.g. Morning Shift, Full Time..."
                                className="w-full rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-4 text-sm text-temu-cream focus:border-temu-bronze/50 focus:outline-none focus:ring-1 focus:ring-temu-bronze/30 transition-all"
                                required
                            />
                        </div>

                        {/* Working Hours Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1">Start Time</label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={formData.startTime}
                                        onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                                        className="w-full rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-4 text-sm text-temu-cream focus:border-temu-bronze/50 outline-none transition-all"
                                        required
                                    />
                                    <Clock8 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-temu-bronze pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1">End Time</label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={formData.endTime}
                                        onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                                        className="w-full rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-4 text-sm text-temu-cream focus:border-temu-bronze/50 outline-none transition-all"
                                        required
                                    />
                                    <Clock8 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-temu-bronze pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Grace Period */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1 flex items-center gap-2">
                                Grace Period <span className="text-[8px] opacity-50">(Minutes)</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={formData.graceMinutes}
                                    onChange={(e) => setFormData({...formData, graceMinutes: e.target.value})}
                                    placeholder="15"
                                    className="w-full rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-4 text-sm text-temu-cream focus:border-temu-bronze/50 outline-none transition-all"
                                    required
                                />
                                <Timer size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none" />
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 rounded-xl border border-white/5 bg-white/5 px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-white/10"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-2 rounded-xl bg-temu-bronze px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-temu-darker transition hover:bg-temu-cream active:scale-95 shadow-lg shadow-temu-bronze/20"
                            >
                                {isEdit ? "Update Shift" : "Save Shift"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BaseModal>
    )
}