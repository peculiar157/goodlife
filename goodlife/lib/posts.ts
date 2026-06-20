import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostFrontmatter = {
  title: string;
  slug: string;
  metaDescription: string;
  category: string;
  featuredImage: string;
  featuredImageAlt: string;
  publishDate: string;
  updatedDate?: string;
  focusKeyword?: string;
  downloadFile?: string;
  downloadLabel?: string;
  excerpt?: string;
};

export type Post = PostFrontmatter & {
  contentHtml: string;
  readingTime: string;
};

export type PostMeta = PostFrontmatter & {
  readingTime: string;
};

function getAllPostFilenames(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
}

export function getAllPostSlugs(): string[] {
  return getAllPostFilenames().map((f) => f.replace(/\.md$/, ""));
}

export function getAllPostsMeta(): PostMeta[] {
  const filenames = getAllPostFilenames();

  const posts = filenames.map((filename) => {
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      ...(data as PostFrontmatter),
      readingTime: stats.text,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export function getPostsByCategory(categorySlug: string): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.category === categorySlug);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  return {
    ...(data as PostFrontmatter),
    contentHtml: processedContent.toString(),
    readingTime: stats.text,
  };
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): PostMeta[] {
  return getAllPostsMeta()
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}

export function getRecentPosts(limit = 6): PostMeta[] {
  return getAllPostsMeta().slice(0, limit);
}
