import { Utensils, CheckCircle2, AlertCircle, Tag, Banknote, X, Info } from "lucide-react"
import { BaseModal } from "@/components/ui/modals"
import MenuIngredientTable from "./MenuIngredientTable"
import { useMenuIngredient } from "../hooks/useMenuIngredient"

export default function MenuDetail({
  isOpen,
  onClose,
  menu,
  categoryName,
}) {
  const {
    menuingredients,
    ingredients,
    createMenuIngredient,
    deleteMenuIngredient,
    restoreMenuIngredient,
    updateMenuIngredient,
  } = useMenuIngredient(menu?.id)

  console.log("ingredients:", ingredients)

  if (!isOpen || !menu) return null

  const handleAddIngredient = (ingredientId, quantity) => {
    console.log("Menu ID:", menu?.id);
    console.log("Ingredient ID:", ingredientId);

    if (!menu?.id) {
      alert("Menu ID tidak ditemukan!");
      return;
    }

    createMenuIngredient({
      menuId: menu.id,
      ingredientId: ingredientId,
      quantity,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl transition-all">
      <div className="bg-[#141312] border border-white/5 w-full max-w-5xl rounded-[48px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-300">

        <div className="flex h-full max-h-[200vh]">

          {/* KOLOM KIRI: INFO MENU (Portrait-ish inside Landscape) */}
          <div className="w-[35%] border-r border-white/5 p-10 space-y-8 overflow-y-auto bg-linear-to-b from-white/2 to-transparent">
            <div>
              <h2 className="text-3xl font-black text-temu-cream tracking-tighter uppercase leading-none mb-2">{menu.name}</h2>
              <p className="text-[10px] text-temu-bronze font-black uppercase tracking-[0.3em]">Menu Identity</p>
            </div>

            <div className="relative aspect-square w-full rounded-[40px] overflow-hidden border border-white/10 group">
              <img
                src={menu.imageUrl || "https://placehold.co/600x400/1a1a1a/666"}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 bg-emerald-500/20 backdrop-blur-md text-emerald-400 text-[10px] font-black px-4 py-2 rounded-full border border-emerald-500/30 shadow-lg">
                ● {menu.isAvailable ? "AVAILABLE" : "UNAVAILABLE"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-4xl bg-white/3 border border-white/5">
                <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mb-1">Price</p>
                <p className="text-xl font-bold text-emerald-400">Rp {menu.price?.toLocaleString()}</p>
              </div>
              <div className="p-5 rounded-4xl bg-white/3 border border-white/5">
                <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mb-1">Category</p>
                <p className="text-xl font-bold text-white leading-tight">{categoryName || "Maincourse"}</p>
              </div>
            </div>

            <div className="p-6 rounded-4xl bg-black/40 border border-white/5 italic text-sm text-zinc-400 leading-relaxed">
              "{menu.description || "No description provided."}"
            </div>
          </div>

          {/* KOLOM KANAN: COMPOSITION MANAGEMENT */}
          <div className="flex-1 p-10 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-black text-temu-cream uppercase tracking-tight">Ingredient Composition</h3>
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1">Manage recipe materials and portions</p>
              </div>
              <button
                onClick={onClose}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-zinc-500 transition-all active:scale-90"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <MenuIngredientTable
                data={menuingredients}
                ingredients={ingredients}
                onAdd={handleAddIngredient}
                onDelete={deleteMenuIngredient}
                onRestore={restoreMenuIngredient}
                onEdit={(update) => {
                  updateMenuIngredient(update);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}