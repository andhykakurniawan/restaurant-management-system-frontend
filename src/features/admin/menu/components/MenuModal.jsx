import { useState } from "react"
import { BaseModal } from "@/components/ui/modals"
import { X, Save, Utensils, Image as ImageIcon, AlignLeft } from "lucide-react"

export default function MenuModal({
    isOpen,
    onClose,
    onSubmit,
    // categories,
    initialData
}) {
    const isEdit = !!initialData

    const [formData, setFormData] = useState({
        name: initialData?.name ?? "",
        description: initialData?.description ?? "",
        price: initialData?.price ?? 0,
        imageUrl: initialData?.imageUrl ?? "",
        categoryId: initialData?.categoryId ?? "",
        isAvailable: initialData?.isAvailable ?? true,
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : type === "number"
                    ? (value === "" ? 0 : Number(value))
                    : value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.categoryId) {
            alert("Category wajib dipilih")
            return
        }
        
        // Kita pastiin isAvailable itu Boolean, bukan String atau Null
        const finalData = {
            ...formData,
            isAvailable: formData.isAvailable === null || formData.isAvailable === undefined
                ? true
                : Boolean(formData.isAvailable)
        }

        console.log("Data dikirim ke Backend:", finalData) // Buat debug di console
        onSubmit(finalData)
        onClose()
    }

    const labelClass = "text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee ml-1 mb-2 block"
    const inputClass = "w-full rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-4 text-sm text-temu-cream focus:border-temu-bronze/50 focus:outline-none transition-all"

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} className="max-w-lg">
            <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#141312] p-8 shadow-2xl">

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-temu-bronze/10 text-temu-bronze">
                            {isEdit ? <Save size={22} /> : <Utensils size={22} />}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">
                                {isEdit ? "Update Menu" : "Add New Menu"}
                            </h2>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 1. Name Input */}
                    <div className="space-y-1">
                        <label className={labelClass}>Product Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Enter menu name..."
                            required
                        />
                    </div>

                    {/* 2. Category & Price */}
                    {/* <div className="grid grid-cols-2 gap-4"> */}
                        {/* <div className="space-y-1">
                            <label className={labelClass}>Category</label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                className={inputClass}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div> */}

                        <div className="space-y-1">
                            <label className={labelClass}>Price</label>
                            <input
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                className={inputClass}
                                required
                            />
                        </div>
                    {/* </div> */}

                    {/* 3. Description Area */}
                    <div className="space-y-1">
                        <label className={labelClass}>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className={`${inputClass} resize-none`}
                            placeholder="Tell more about this menu..."
                        />
                    </div>

                    {/* 4. Image URL */}
                    <div className="space-y-1">
                        <label className={labelClass}>Image URL</label>
                        <div className="relative">
                            <input
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="https://path-to-image.jpg"
                            />
                            <ImageIcon className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                            Availability
                        </label>
                        <div className="relative group">
                            <select
                                name="isAvailable"
                                value={formData.isAvailable}
                                onChange={(e) => {
                                    const val = e.target.value === "true"; // Ini menghasilkan boolean murni
                                    setFormData({ ...formData, isAvailable: val });
                                }}
                                className="w-full appearance-none rounded-2xl border border-white/5 bg-[#0d0c0b] px-5 py-4 text-sm text-gray-200 outline-none transition-all focus:border-temu-bronze/50 focus:ring-1 focus:ring-temu-bronze/50 group-hover:bg-[#121110]"
                            >
                                <option value="true" className="bg-[#141312]">Available (Ready to Serve)</option>
                                <option value="false" className="bg-[#141312]">Sold Out (Temporary Unavailable)</option>
                            </select>

                            {/* Icon Panah Custom biar cakep */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-zinc-500 group-hover:text-temu-bronze transition-colors">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-2xl bg-white/5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:bg-white/10 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-2 rounded-2xl bg-temu-bronze py-4 text-[10px] font-black uppercase tracking-[0.2em] text-temu-darker hover:opacity-90 transition-all"
                        >
                            {isEdit ? "Update Item" : "Confirm & Save"}
                        </button>
                    </div>
                </form>
            </div>
        </BaseModal>
    )
}