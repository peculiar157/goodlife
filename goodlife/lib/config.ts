export const siteConfig = {
  name: "GoodLife",
  title: "GoodLife — Mindfulness, Quotes, Zodiac & Free Printables",
  description:
    "A calmer corner of the internet for mindfulness, quotes that actually land, zodiac insight, and free printable coloring pages and planners.",
  url: "https://goodlife.vercel.app",
  ogImage: "/images/og-default.png",
  social: {
    pinterest: "https://pinterest.com/goodlife",
    instagram: "https://instagram.com/goodlife",
  },
};

export type Category = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  color: "clay" | "sage";
};

export const categories: Category[] = [
  {
    slug: "self-mindfulness",
    name: "Self & Mindfulness",
    shortName: "Mindfulness",
    description:
      "Habits, presence, and small honest shifts for days that feel like too much.",
    color: "sage",
  },
  {
    slug: "quotes",
    name: "Quotes",
    shortName: "Quotes",
    description:
      "Roundups of words worth saving, organized by mood, month, and moment.",
    color: "clay",
  },
  {
    slug: "zodiac",
    name: "Zodiac & Horoscope",
    shortName: "Zodiac",
    description:
      "Sign-by-sign insight that's playful and specific, never a horoscope-shaped shrug.",
    color: "clay",
  },
  {
    slug: "coloring-pages",
    name: "Coloring Pages",
    shortName: "Coloring",
    description:
      "Free printable coloring pages for the nights you need your hands busy and your mind quiet.",
    color: "sage",
  },
  {
    slug: "printables-planners",
    name: "Printables & Planners",
    shortName: "Printables",
    description:
      "Downloadable planners and trackers built to actually get used, not just pinned.",
    color: "sage",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
