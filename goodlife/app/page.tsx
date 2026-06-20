import Link from "next/link";
import { getRecentPosts } from "@/lib/posts";
import { categories } from "@/lib/config";
import PostCard from "@/components/PostCard";
import NewsletterForm from "@/components/NewsletterForm";

export default function HomePage() {
  const recentPosts = getRecentPosts(6);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="max-w-2xl">
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-ink-800 leading-tight">
            A slower corner of the internet.
          </h1>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            Mindfulness that doesn&apos;t require an overhaul. Quotes worth
            saving. Zodiac insight with a little wink in it. And free
            printables for the nights you need your hands busy and your mind
            quiet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="rounded-full border border-clay-200 bg-white px-4 py-2 text-sm font-medium text-ink-600 hover:border-clay-400 hover:text-clay-600 transition-colors"
              >
                {cat.shortName}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent posts grid */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink-800">
            Lately on GoodLife
          </h2>
        </div>

        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-ink-500">
            New posts are on their way. Check back soon.
          </p>
        )}
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-3xl bg-clay-50 px-6 sm:px-12 py-12 sm:py-16 text-center">
          <h2 className="font-serif text-3xl font-semibold text-ink-800">
            Get the free weekly planner
          </h2>
          <p className="mt-3 max-w-md mx-auto text-ink-600 leading-relaxed">
            Join the list and we&apos;ll send you a free printable weekly
            planner, plus the occasional note when something worth reading
            goes up.
          </p>
          <div className="mt-6 max-w-md mx-auto">
            <NewsletterForm variant="inline" />
          </div>
          <p className="mt-3 text-xs text-ink-400">
            No spam. Unsubscribe whenever you want.
          </p>
        </div>
      </section>

      {/* Category overview */}
      <section className="mx-auto max-w-6xl px-5 py-12 pb-20">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink-800 mb-8">
          Find your corner
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="group rounded-2xl border border-clay-100 bg-white p-6 hover:border-clay-300 transition-colors"
            >
              <h3 className="font-serif text-xl font-semibold text-ink-800 group-hover:text-clay-600 transition-colors">
                {cat.name}
              </h3>
              <p className="mt-2 text-sm text-ink-500 leading-relaxed">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
