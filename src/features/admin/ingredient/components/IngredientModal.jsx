import { useState } from "react"
import { BaseModal } from "@/components/ui/modals"
import { X, Save, FolderPlus, ChevronDown } from "lucide-react"

// Sesuaikan dengan Enum DB kamu
const UNIT_OPTIONS = [
    { label: "G", value: "GRAMS" },
    { label: "KG", value: "KG" },
    { label: "L", value: "L" },
    { label: "ML", value: "ML" },
    { label: "PCS", value: "PCS" },
]

export default function IngredientModal({
    isOpen,
    onClose,
    onSubmit,
    initialData = null,
}) {
    // Inisialisasi state langsung dari props (Best Practice)
    const [formData, setFormData] = useState({
        name: initialData?.name ?? "",
        unit: initialData?.unit ?? "GRAMS",
        currentStock: initialData?.currentStock ?? 0,
        minimumStock: initialData?.minimumStock ?? 0,
        costPerUnit: initialData?.costPerUnit ?? 0,
    })

    const isEdit = !!initialData

    const handleChange = (e) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === "number" ? parseFloat(value) || 0 : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
        onClose()
    }

    // --- REUSABLE CLASSNAMES ---

    // Style dasar input field (tanpa padding kanan/kiri agar fleksibel)
    const baseInputStyle = "w-full rounded-2xl border border-white/5 bg-[#0d0c0b] py-3.5 text-sm text-temu-cream focus:border-temu-bronze/50 focus:outline-none focus:ring-1 focus:ring-temu-bronze/30 transition-all placeholder:text-zinc-700"

    // Style label field utama (di luar field)
    const mainLabelStyle = "text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1 mb-1.5 block"

    // Style untuk input number yang ada di dalam "Tab" (Current & Min Stock)
    const tabInputStyle = "w-full appearance-none rounded-none border-none bg-transparent px-4 py-3 text-sm text-temu-cream focus:outline-none transition-all placeholder:text-zinc-700"

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} className="max-w-lg">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Container */}
            <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#141312] p-8 shadow-2xl animate-in zoom-in-95 duration-300">

                {/* Header (Sama) */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-temu-bronze/10 text-temu-bronze shadow-[0_0_20px_rgba(212,163,115,0.1)]">
                            {isEdit ? <Save size={22} /> : <FolderPlus size={22} />}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight leading-none">
                                {isEdit ? "Update Ingredient" : "Add Ingredient"}
                            </h2>
                            <p className="text-[10px] text-temu-coffee uppercase tracking-[0.2em] font-black mt-1.5">
                                {isEdit ? "Modify inventory details" : "Inventory management"}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="rounded-full p-2 text-zinc-500 hover:bg-white/5 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                        <label className={mainLabelStyle}>Ingredient Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Arabica Beans"
                            className={`${baseInputStyle} px-5`} // Input ini pakai padding horizontal penuh
                            required
                        />
                    </div>

                    {/* Cost Field dengan Prefix Rupiah */}
                    <div className="space-y-1.5">
                        <label className={mainLabelStyle}>Cost Per Unit</label>
                        <div className="relative flex items-center">
                            {/* Prefix "Rp" di dalam field */}
                            <span className="absolute left-5 text-sm text-temu-coffee font-medium">
                                Rp
                            </span>
                            <input
                                name="costPerUnit"
                                type="number"
                                step="0.01"
                                value={formData.costPerUnit}
                                onChange={handleChange}
                                placeholder="0.00"
                                className={`${baseInputStyle} pl-14 pr-5`} // Padding kiri diperbesar untuk space prefix
                                required
                            />
                        </div>
                    </div>

                    {/* --- INI PERUBAHAN UTAMA: STOCK & UNIT DI SATU BARIS --- */}
                    <div className="space-y-1.5">
                        {/* Label Induk */}
                        <label className={mainLabelStyle}>Stock & Unit Configuration</label>

                        {/* Kontainer Utama yang terlihat seperti satu "field/tab" */}
                        <div className="w-full flex items-stretch rounded-2xl border border-white/5 bg-[#0d0c0b] overflow-hidden focus-within:border-temu-bronze/50 focus-within:ring-1 focus-within:ring-temu-bronze/30 transition-all">

                            {/* 1. Current Stock (Grid Kolom 1) */}
                            <div className="flex-1 flex flex-col border-r border-white/5">
                                <label className="text-[9px] font-black uppercase text-zinc-600 px-4 pt-2">Current</label>
                                <input
                                    name="currentStock"
                                    type="number"
                                    value={formData.currentStock}
                                    onChange={handleChange}
                                    className={tabInputStyle}
                                    required
                                />
                            </div>

                            {/* 2. Min Stock (Grid Kolom 2) */}
                            <div className="flex-1 flex flex-col border-r border-white/5">
                                <label className="text-[9px] font-black uppercase text-zinc-600 px-4 pt-2">Min. Stock</label>
                                <input
                                    name="minimumStock"
                                    type="number"
                                    value={formData.minimumStock}
                                    onChange={handleChange}
                                    className={tabInputStyle}
                                    required
                                />
                            </div>

                            {/* 3. Unit (Dropdown di sebelah kanan) */}
                            <div className="w-24 relative group">
                                <select
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleChange}
                                    className="h-full w-full appearance-none bg-[#1a1918] group-hover:bg-[#1f1d1c] px-4 text-sm text-temu-cream focus:outline-none cursor-pointer pr-8"
                                    required
                                >
                                    {UNIT_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value} className="bg-[#141312] text-white">
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                {/* Icon Panah Kecil */}
                                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
                                    <ChevronDown size={14} />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Actions (Sama) */}
                    <div className="flex items-center gap-3 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-2xl border border-white/5 bg-white/5 px-6 py-4 text-xs font-bold text-zinc-400 transition hover:bg-white/10 hover:text-white"
                        >
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            className="flex-[1.5] rounded-2xl bg-temu-bronze px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-temu-darker transition hover:bg-temu-cream active:scale-[0.98] shadow-lg shadow-temu-bronze/20"
                        >
                            {isEdit ? "Confirm Update" : "Save Ingredient"}
                        </button>
                    </div>
                </form>
            </div>
        </BaseModal>
    )
}