export interface AtmosphereGalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  className: string;
}

export const atmosphereGalleryItems: AtmosphereGalleryItem[] = [
  {
    id: "lounge",
    title: "The Lounge",
    imageUrl:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1100&q=80",
    imageAlt: "Dark cafe lounge with warm interior lighting",
    className: "md:col-span-4 md:row-span-2",
  },
  {
    id: "architecture",
    title: "Architecture",
    imageUrl:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Elegant cafe bar with warm lighting",
    className: "md:col-span-8 md:row-span-3",
  },
  {
    id: "detail",
    title: "The Detail",
    imageUrl:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Coffee cup detail in moody lighting",
    className: "md:col-span-4 md:row-span-3",
  },
  {
    id: "bar",
    title: "The Bar",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Premium restaurant bar and seating",
    className: "md:col-span-4 md:row-span-2",
  },
  {
    id: "solitude",
    title: "Solitude",
    imageUrl:
      "https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Quiet cafe table with coffee",
    className: "md:col-span-4 md:row-span-2",
  },
];
