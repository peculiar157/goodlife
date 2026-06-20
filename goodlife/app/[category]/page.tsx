import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, categories } from "@/lib/config";
import { getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import NewsletterForm from "@/components/NewsletterForm";

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = getCategoryBySlug(params.category);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  const posts = getPostsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl font-semibold text-ink-800">
          {category.name}
        </h1>
        <p className="mt-3 text-lg text-ink-600 leading-relaxed">
          {category.description}
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-ink-500">
          New posts in this category are on their way. Check back soon.
        </p>
      )}

      <div className="mt-16 rounded-3xl bg-sage-50 px-6 sm:px-10 py-10 text-center">
        <h2 className="font-serif text-2xl font-semibold text-ink-800">
          Want more like this in your inbox?
        </h2>
        <div className="mt-5 max-w-md mx-auto">
          <NewsletterForm variant="inline" />
        </div>
      </div>
    </div>
  );
}
