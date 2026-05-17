import { Search } from "lucide-react";
import { CustomerMenuCategory } from "../../type";

interface MenuFilterBarProps {
  categories: CustomerMenuCategory[];
  activeCategory: string;
  searchTerm: string;
  onCategoryChange: (categoryId: string) => void;
  onSearchChange: (value: string) => void;
}

export default function MenuFilterBar({
  categories,
  activeCategory,
  searchTerm,
  onCategoryChange,
  onSearchChange,
}: MenuFilterBarProps) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => onCategoryChange("all")}
          className={`shrink-0 rounded-full border px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] transition ${
            activeCategory === "all"
              ? "border-temu-bronze bg-temu-bronze/15 text-temu-bronze"
              : "border-white/10 text-temu-muted hover:border-temu-bronze/50"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`shrink-0 rounded-full border px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] transition ${
              activeCategory === category.id
                ? "border-temu-bronze bg-temu-bronze/15 text-temu-bronze"
                : "border-white/10 text-temu-muted hover:border-temu-bronze/50"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <label className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-temu-muted lg:w-80">
        <Search size={18} />
        <input
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full border-none bg-transparent text-sm text-temu-cream outline-none placeholder:text-temu-muted focus:ring-0"
          placeholder="Search curated menu..."
        />
      </label>
    </div>
  );
}
