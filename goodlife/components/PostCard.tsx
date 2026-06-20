import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { PostMeta } from "@/lib/posts";
import { getCategoryBySlug } from "@/lib/config";
import CategoryBadge from "./CategoryBadge";

export default function PostCard({ post }: { post: PostMeta }) {
  const category = getCategoryBySlug(post.category);

  return (
    <article className="group">
      <Link href={`/${post.category}/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-clay-100">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="mt-4">
          <CategoryBadge categorySlug={post.category} />
          <h3 className="mt-2 font-serif text-xl font-semibold text-ink-800 leading-snug group-hover:text-clay-600 transition-colors">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-ink-500 leading-relaxed line-clamp-2">
            {post.excerpt || post.metaDescription}
          </p>
          <p className="mt-3 text-xs text-ink-400">
            {format(new Date(post.publishDate), "MMMM d, yyyy")} &middot; {post.readingTime}
          </p>
        </div>
      </Link>
    </article>
  );
}
