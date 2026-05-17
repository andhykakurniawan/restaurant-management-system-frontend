import { useMemo, useState } from "react";
import CustomerSectionHeader from "../components/CustomerSectionHeader";
import { useCustomerMenu } from "./hooks/useCustomerMenu";
import MenuFilterBar from "./components/MenuFilterBar";
import MenuItemCard from "./components/MenuItemCard";

export default function CustomerMenuPage() {
  const { menus, categories, isLoading, errorMessage, isUsingFallback } = useCustomerMenu();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMenus = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return menus.filter((menu) => {
      const matchesCategory = activeCategory === "all" || menu.categoryId === activeCategory;
      const matchesSearch =
        !normalizedSearch ||
        menu.name.toLowerCase().includes(normalizedSearch) ||
        menu.description.toLowerCase().includes(normalizedSearch) ||
        menu.categoryName.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, menus, searchTerm]);

  return (
    <main className="bg-temu-darker px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <CustomerSectionHeader
            eyebrow="Our Curations"
            title="A menu built for slow, cinematic indulgence."
            description="Explore specialty coffee, refined comfort dishes, and sweet signatures from Temu Rasa."
          />

          {(errorMessage || isUsingFallback) && (
            <div className="max-w-md rounded-2xl border border-temu-bronze/20 bg-temu-bronze/10 p-4 text-sm leading-6 text-temu-cream">
              {errorMessage ?? "Menampilkan curated preview sambil menunggu data live."}
            </div>
          )}
        </div>

        <MenuFilterBar
          categories={categories}
          activeCategory={activeCategory}
          searchTerm={searchTerm}
          onCategoryChange={setActiveCategory}
          onSearchChange={setSearchTerm}
        />

        {isLoading ? (
          <div className="py-24 text-center text-xs font-bold uppercase tracking-[0.3em] text-temu-muted">
            Curating live menu...
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMenus.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {!isLoading && !filteredMenus.length && (
          <div className="py-24 text-center text-temu-muted">
            Menu yang lu cari belum ada di kategori ini.
          </div>
        )}
      </div>
    </main>
  );
}
