import type { PostMeta } from "@/lib/posts";
import PostCard from "./PostCard";

export default function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-clay-100 pt-12">
      <h2 className="font-serif text-2xl font-semibold text-ink-800 mb-6">
        You might also like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
