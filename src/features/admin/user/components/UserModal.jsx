import { useState } from "react"
import { BaseModal } from "@/components/ui/modals"
import { X, Save, UserPlus, ShieldCheck } from "lucide-react"

export default function UserModal({
    isOpen,
    onClose,
    onSubmit,
    initialData = null,
}) {
    const isEdit = !!initialData

    const [formData, setFormData] = useState({
        username: initialData?.username ?? "",
        email: initialData?.email ?? "",
        password: "",
        role: initialData?.role ?? "WAITER",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
        onClose()
    }

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-lg"
        >
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={onClose}
                />

                {/* Modal Content */}
                <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#141312] p-8 shadow-2xl animate-in zoom-in-95 duration-300">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-temu-bronze/10 text-temu-bronze shadow-[0_0_15px_rgba(212,163,115,0.1)]">
                                {isEdit ? <Save size={20} /> : <UserPlus size={20} />}
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight">
                                    {isEdit ? "Update User" : "Add New User"}
                                </h2>
                                <p className="text-[10px] text-temu-coffee uppercase tracking-[0.2em] font-black mt-0.5">
                                    {isEdit ? "Modify employee access" : "Register new staff member"}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-full p-2 text-zinc-500 hover:bg-white/5 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1">
                                Username
                            </label>
                            <input
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                placeholder="e.g. hendra_kurniawan"
                                className="w-full rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-3.5 text-sm text-temu-cream focus:border-temu-bronze/50 focus:outline-none focus:ring-1 focus:ring-temu-bronze/30 transition-all"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="staff@temurasa.com"
                                className="w-full rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-3.5 text-sm text-temu-cream focus:border-temu-bronze/50 focus:outline-none focus:ring-1 focus:ring-temu-bronze/30 transition-all"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder={isEdit ? "••••••" : "Required"}
                                    className="w-full rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-3.5 text-sm text-temu-cream focus:border-temu-bronze/50 focus:outline-none focus:ring-1 focus:ring-temu-bronze/30 transition-all"
                                    required={!isEdit}
                                />
                            </div>

                            {/* Role Select */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1">
                                    Role Access
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full appearance-none rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-3.5 text-sm text-temu-cream focus:border-temu-bronze/50 focus:outline-none focus:ring-1 focus:ring-temu-bronze/30 transition-all cursor-pointer"
                                    >
                                        <option value="SUPER_ADMIN">Admin</option>
                                        <option value="WAREHOUSE_MANAGER">Warehouse</option>
                                        <option value="CHEF">Chef</option>
                                        <option value="CASHIER">Cashier</option>
                                        <option value="WAITER">Waiter</option>
                                        <option value="CUSTOMER">Customer</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-temu-bronze">
                                        <ShieldCheck size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center gap-3 pt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 rounded-xl border border-white/5 bg-white/5 px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-white/10"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-2 rounded-xl bg-temu-bronze px-8 py-3.5 text-[10px] font-black uppercase tracking-widest text-temu-darker transition hover:bg-temu-cream active:scale-95 shadow-lg shadow-temu-bronze/20"
                            >
                                {isEdit ? "Update User" : "Save User"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BaseModal>
    )
}