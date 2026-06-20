#!/usr/bin/env node
/**
 * Usage: npm run new-post
 * Walks you through creating a new post file in content/posts/ with the
 * correct frontmatter already filled in, so you only have to write the body.
 */
import { createInterface } from "readline";
import { writeFileSync, existsSync } from "fs";
import { join } from "path";

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

const CATEGORIES = [
  "self-mindfulness",
  "quotes",
  "zodiac",
  "coloring-pages",
  "printables-planners",
];

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function main() {
  console.log("\nNew GoodLife post\n------------------\n");

  const title = await ask("Post title: ");
  const slug = slugify(await ask(`Slug (leave blank to use "${slugify(title)}"): `) || slugify(title)) || slugify(title);

  console.log(`\nCategories: ${CATEGORIES.join(", ")}`);
  let category = await ask("Category: ");
  while (!CATEGORIES.includes(category)) {
    category = await ask(`Please enter one of: ${CATEGORIES.join(", ")}\nCategory: `);
  }

  const metaDescription = await ask("Meta description (17-20 words): ");
  const focusKeyword = await ask("Focus keyword: ");
  const featuredImageAlt = await ask("Featured image alt text: ");

  const filePath = join(process.cwd(), "content", "posts", `${slug}.md`);

  if (existsSync(filePath)) {
    console.log(`\nA post with slug "${slug}" already exists. Aborting.`);
    rl.close();
    return;
  }

  const today = new Date().toISOString().split("T")[0];

  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
metaDescription: "${metaDescription.replace(/"/g, '\\"')}"
category: "${category}"
featuredImage: "/images/posts/${slug}.jpg"
featuredImageAlt: "${featuredImageAlt.replace(/"/g, '\\"')}"
publishDate: "${today}"
focusKeyword: "${focusKeyword}"
excerpt: ""
---

Start writing here.
`;

  writeFileSync(filePath, frontmatter, "utf8");
  console.log(`\nCreated content/posts/${slug}.md`);
  console.log(`Don't forget to add the featured image at public/images/posts/${slug}.jpg\n`);

  rl.close();
}

main();
