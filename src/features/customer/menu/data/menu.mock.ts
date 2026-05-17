import { CustomerMenuCategory, CustomerMenuItem } from "../../type";

export const customerMenuCategoriesMock: CustomerMenuCategory[] = [
  { id: "coffee", name: "Coffee" },
  { id: "non-coffee", name: "Non-Coffee" },
  { id: "main-course", name: "Main Course" },
  { id: "dessert", name: "Dessert" },
];

export const customerMenusMock: CustomerMenuItem[] = [
  {
    id: "gayo-v60",
    name: "Gayo Highlands V60",
    description:
      "Hand-picked Aceh beans with dark chocolate, dried berry, and warm spice notes.",
    price: 65000,
    imageUrl:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80",
    categoryId: "coffee",
    categoryName: "Coffee",
    isAvailable: true,
    isActive: true,
    tags: ["Single Origin", "Full Body"],
    badge: "Popular",
  },
  {
    id: "charcoal-latte",
    name: "Smoked Charcoal Latte",
    description:
      "Bamboo charcoal, espresso, organic honey, and sea salt in a matte black cup.",
    price: 55000,
    imageUrl:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
    categoryId: "coffee",
    categoryName: "Coffee",
    isAvailable: true,
    isActive: true,
    tags: ["Signature", "Creamy"],
    badge: "Signature",
  },
  {
    id: "botanical-avocado",
    name: "Botanical Avocado Tartine",
    description:
      "Sourdough tartine with whipped yuzu avocado, radish, herbs, and edible flowers.",
    price: 82000,
    imageUrl:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
    categoryId: "main-course",
    categoryName: "Main Course",
    isAvailable: true,
    isActive: true,
    tags: ["Fresh", "Brunch"],
  },
  {
    id: "saffron-brioche",
    name: "Saffron Brioche Trio",
    description:
      "Hand-rolled brioche infused with saffron and served with house honey butter.",
    price: 72000,
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    categoryId: "dessert",
    categoryName: "Dessert",
    isAvailable: true,
    isActive: true,
    tags: ["Buttery", "Warm"],
    badge: "New",
  },
];
