import { getCategoryBySlug } from "@/lib/config";

export default function CategoryBadge({ categorySlug }: { categorySlug: string }) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;

  const colorClasses =
    category.color === "sage"
      ? "bg-sage-100 text-sage-600"
      : "bg-clay-100 text-clay-600";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${colorClasses}`}
    >
      {category.shortName}
    </span>
  );
}
