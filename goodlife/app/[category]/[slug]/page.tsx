import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { getCategoryBySlug } from "@/lib/config";
import { siteConfig } from "@/lib/config";
import CategoryBadge from "@/components/CategoryBadge";
import DownloadBox from "@/components/DownloadBox";
import Disclosure from "@/components/Disclosure";
import AdSlot from "@/components/AdSlot";
import RelatedPosts from "@/components/RelatedPosts";
import NewsletterForm from "@/components/NewsletterForm";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  const url = `${siteConfig.url}/${post.category}/${post.slug}`;

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.metaDescription,
      url,
      images: [{ url: post.featuredImage }],
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate || post.publishDate,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.featuredImage],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post || post.category !== params.category) notFound();

  const category = getCategoryBySlug(post.category);
  const relatedPosts = getRelatedPosts(post.slug, post.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: `${siteConfig.url}${post.featuredImage}`,
    datePublished: post.publishDate,
    dateModified: post.updatedDate || post.publishDate,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: `${siteConfig.url}/${post.category}/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-ink-400 mb-6">
        <Link href="/" className="hover:text-clay-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/${post.category}`} className="hover:text-clay-600">
          {category?.name}
        </Link>
      </nav>

      <CategoryBadge categorySlug={post.category} />

      <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-semibold text-ink-800 leading-tight">
        {post.title}
      </h1>

      <p className="mt-4 text-sm text-ink-400">
        {format(new Date(post.publishDate), "MMMM d, yyyy")} &middot; {post.readingTime}
        {post.updatedDate && (
          <> &middot; Updated {format(new Date(post.updatedDate), "MMMM d, yyyy")}</>
        )}
      </p>

      <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-clay-100">
        <Image
          src={post.featuredImage}
          alt={post.featuredImageAlt || post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      <div
        className="prose prose-lg mt-10 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <AdSlot placement="in-content" />

      {post.downloadFile && (
        <DownloadBox fileUrl={post.downloadFile} label={post.downloadLabel || "Download the free printable"} />
      )}

      <Disclosure />

      <div className="mt-10 rounded-2xl bg-clay-50 px-6 py-8 text-center">
        <p className="font-serif text-lg font-semibold text-ink-800">
          Like what you just read?
        </p>
        <p className="mt-1 text-sm text-ink-500">
          Get the next one straight to your inbox.
        </p>
        <div className="mt-4 max-w-sm mx-auto">
          <NewsletterForm variant="compact" />
        </div>
      </div>

      <RelatedPosts posts={relatedPosts} />
    </article>
  );
}
