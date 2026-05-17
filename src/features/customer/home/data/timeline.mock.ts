export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    year: "2018",
    title: "The First Pour",
    description:
      "Temu Rasa started as a quiet studio experiment, pairing architectural minimalism with the warmth of Indonesian specialty coffee.",
    imageUrl:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1100&q=80",
    imageAlt: "Barista pouring coffee in a dark cafe",
  },
  {
    year: "2021",
    title: "The Flagship",
    description:
      "The first flagship opened as a low-lit sanctuary where coffee, dining, and atmosphere move with deliberate calm.",
    imageUrl:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1100&q=80",
    imageAlt: "Warm modern cafe interior",
  },
  {
    year: "2024",
    title: "A Living Ritual",
    description:
      "Today, Temu Rasa is shaped as a complete ritual: specialty beans, refined plates, and cinematic hospitality.",
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1100&q=80",
    imageAlt: "Specialty coffee preparation with warm lighting",
  },
];
