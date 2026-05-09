import { useState } from "react"
import { BaseModal } from "@/components/ui/modals"
import { X, Save, ClipboardCheck, User, Clock, MessageSquare } from "lucide-react"

export default function AttendanceModal({
    isOpen,
    onClose,
    onSubmit,
    initialData = null,
    users = [], // Data dari userApi
    shifts = [], // Data dari shiftApi
}) {
    const isEdit = !!initialData

    const [formData, setFormData] = useState({
        userId: initialData?.userId ?? "",
        shiftId: initialData?.shiftId ?? "",
        attendanceDate: initialData?.attendanceDate ?? new Date().toISOString().split('T')[0],
        clockIn: initialData?.clockIn ?? "",
        clockOut: initialData?.clockOut ?? "",
        status: initialData?.status ?? "IN_TIME",
        notes: initialData?.notes ?? "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
        onClose()
    }

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
                
                <div className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#141312] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-temu-bronze/10 text-temu-bronze shadow-[0_0_15px_rgba(212,163,115,0.1)]">
                                {isEdit ? <Save size={20} /> : <ClipboardCheck size={20} />}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight">
                                    {isEdit ? "Edit Attendance" : "Manual Attendance"}
                                </h2>
                                <p className="text-[10px] text-temu-coffee uppercase tracking-[0.2em] font-black mt-0.5">
                                    {isEdit ? "Update attendance record" : "Log a new presence entry"}
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="rounded-full p-2 text-zinc-500 hover:bg-white/5 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Employee Selection */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1">Employee</label>
                                <div className="relative">
                                    <select
                                        value={formData.userId}
                                        onChange={(e) => setFormData({...formData, userId: e.target.value})}
                                        className="w-full appearance-none rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-3.5 text-sm text-temu-cream focus:border-temu-bronze/50 focus:outline-none transition-all cursor-pointer"
                                        required
                                    >
                                        <option value="">Select Staff</option>
                                        {users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
                                    </select>
                                    <User size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-temu-bronze pointer-events-none" />
                                </div>
                            </div>

                            {/* Shift Selection */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1">Assigned Shift</label>
                                <div className="relative">
                                    <select
                                        value={formData.shiftId}
                                        onChange={(e) => setFormData({...formData, shiftId: e.target.value})}
                                        className="w-full appearance-none rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-3.5 text-sm text-temu-cream focus:border-temu-bronze/50 focus:outline-none transition-all cursor-pointer"
                                        required
                                    >
                                        <option value="">Select Shift</option>
                                        {shifts.map(s => <option key={s.id} value={s.id}>{s.shiftName}</option>)}
                                    </select>
                                    <Clock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-temu-bronze pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {/* Attendance Date */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1">Date</label>
                                <input
                                    type="date"
                                    value={formData.attendanceDate}
                                    onChange={(e) => setFormData({...formData, attendanceDate: e.target.value})}
                                    className="w-full rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-3.5 text-sm text-temu-cream focus:border-temu-bronze/50 outline-none transition-all"
                                    required
                                />
                            </div>
                            {/* Clock In */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1">Clock In</label>
                                <input
                                    type="time"
                                    value={formData.clockIn}
                                    onChange={(e) => setFormData({...formData, clockIn: e.target.value})}
                                    className="w-full rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-3.5 text-sm text-emerald-400 focus:border-emerald-500/50 outline-none transition-all"
                                />
                            </div>
                            {/* Clock Out */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1">Clock Out</label>
                                <input
                                    type="time"
                                    value={formData.clockOut}
                                    onChange={(e) => setFormData({...formData, clockOut: e.target.value})}
                                    className="w-full rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-3.5 text-sm text-red-400 focus:border-red-500/50 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Status & Notes */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1">Attendance Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-3.5 text-sm text-temu-cream focus:border-temu-bronze/50 outline-none transition-all cursor-pointer"
                            >
                                <option value="IN_TIME">IN TIME</option>
                                <option value="LATE">LATE</option>
                                <option value="EARLY_LEAVE">EARLY LEAVE</option>
                                <option value="ABSENT">ABSENT</option>
                                <option value="ON_LEAVE">ON LEAVE</option>
                                <option value="OFF_DAY">OFF DAY</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1">Notes / Reason</label>
                            <div className="relative">
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                    placeholder="Add specific notes if any..."
                                    rows="2"
                                    className="w-full resize-none rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-3.5 text-sm text-temu-cream focus:border-temu-bronze/50 outline-none transition-all"
                                />
                                <MessageSquare size={16} className="absolute right-4 top-4 text-zinc-700 pointer-events-none" />
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center gap-3 pt-4">
                            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-white/5 bg-white/5 px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-white/10">
                                Cancel
                            </button>
                            <button type="submit" className="flex-2 rounded-xl bg-temu-bronze px-8 py-3.5 text-[10px] font-black uppercase tracking-widest text-temu-darker transition hover:bg-temu-cream active:scale-95 shadow-lg shadow-temu-bronze/20">
                                {isEdit ? "Update Log" : "Confirm Attendance"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BaseModal>
    )
}