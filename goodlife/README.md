# GoodLife

A fast, SEO-friendly lifestyle blog covering mindfulness, quotes, zodiac and horoscope content, and free printables. Built with Next.js (App Router), TypeScript, and Tailwind CSS. Content lives as Markdown files in the repo, no CMS or database required.

## Tech Stack

- **Framework:** Next.js 14 (App Router), React, TypeScript
- **Content:** Markdown files in `content/posts/`
- **Styling:** Tailwind CSS
- **Hosting:** GitHub → Vercel (auto-deploy on push to `main`)
- **Email capture:** MailerLite (free plan, see setup below)

## Getting Started Locally

You'll need [Node.js](https://nodejs.org) 18.17 or later installed.

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

Visit `http://localhost:3000` to see the site.

```bash
# Build for production (also a good way to catch errors before deploying)
npm run build

# Run the production build locally
npm run start
```

## Adding a New Post

The easiest way is the built-in helper script:

```bash
npm run new-post
```

It will ask for a title, category, meta description, focus keyword, and image alt text, then create a correctly formatted file in `content/posts/` for you. You just need to write the body underneath the frontmatter, and drop a featured image at the path it tells you.

### Doing it manually

Create a new `.md` file inside `content/posts/`. The filename (minus `.md`) becomes the post's URL slug. Start the file with frontmatter like this:

```markdown
---
title: "Your Post Title"
slug: "your-post-title"
metaDescription: "17 to 20 words, includes your focus keyword, reads like a real sentence."
category: "self-mindfulness"
featuredImage: "/images/posts/your-post-title.jpg"
featuredImageAlt: "Description of the image for accessibility"
publishDate: "2026-06-20"
focusKeyword: "your focus keyword"
excerpt: "One sentence shown on category/home page cards."
---

Your post content goes here, written in Markdown.
```

**Valid `category` values:** `self-mindfulness`, `quotes`, `zodiac`, `coloring-pages`, `printables-planners`.

**Optional frontmatter fields:**

- `updatedDate` — shows an "Updated" date on the post if you revise it later
- `downloadFile` — path to a PDF in `public/downloads/`, shows a download box on the post (used for coloring pages and printables)
- `downloadLabel` — custom button text for the download box

### Adding the featured image

Drop a `.jpg` or `.webp` image into `public/images/posts/` matching the `featuredImage` path in your frontmatter. Recommended size: at least 1200x800px, ideally under 300KB. Convert to WebP where possible for faster load times.

### Adding a downloadable PDF

Drop the file into `public/downloads/` and reference it in the post's `downloadFile` frontmatter field, e.g. `/downloads/your-file.pdf`.

## Writing Voice

This site has a deliberate, specific voice (warm, honest, no AI-sounding filler, no em dashes, varied sentence rhythm). If you're writing new posts yourself or briefing someone else, refer to the original `GoodLife Blog Writing Guide` document for the full rules. The six starter posts in `content/posts/` were written to match it and can serve as reference examples for tone and structure.

## Newsletter Setup (MailerLite, free plan)

The newsletter form is fully wired to MailerLite's API, it just needs your credentials to go live.

1. Sign up free at [mailerlite.com](https://www.mailerlite.com) (free plan covers up to 1,000 subscribers).
2. Go to **Integrations > API** and generate an API key.
3. Create a subscriber **Group** for this site and copy its Group ID.
4. In your Vercel project, go to **Settings > Environment Variables** and add:
   - `MAILERLITE_API_KEY`
   - `MAILERLITE_GROUP_ID`
5. Redeploy. The signup forms across the site will now add subscribers directly to your MailerLite group.

Until these are set, the form still works visually and won't error, it just logs the email instead of sending it anywhere.

## Setting Up the Admin Editor (`/admin`)

This site includes a visual content editor at `yoursite.vercel.app/admin`, built with [Decap CMS](https://decapcms.org). It lets you create and edit blog posts through a normal web form (no Markdown, no code editor), upload images, and publish, all of which commits directly to this GitHub repo behind the scenes. Vercel then auto-deploys the change like any other push.

It needs a one-time setup so GitHub knows to trust it. This takes about 5 minutes.

### 1. Create a GitHub OAuth App

1. Go to [github.com/settings/developers](https://github.com/settings/developers).
2. Click **OAuth Apps** → **New OAuth App**.
3. Fill in:
   - **Application name:** `GoodLife Admin` (or anything you like)
   - **Homepage URL:** your live site URL, e.g. `https://goodlifehq.vercel.app`
   - **Authorization callback URL:** your live site URL plus `/api/callback`, e.g. `https://goodlifehq.vercel.app/api/callback`
4. Click **Register application**.
5. Click **Generate a new client secret**, and copy both the **Client ID** and the **Client Secret** somewhere safe. You won't be able to see the secret again after leaving this page.

### 2. Add the credentials to Vercel

1. In your Vercel project, go to **Settings → Environment Variables**.
2. Add:
   - `GITHUB_OAUTH_CLIENT_ID` → the Client ID from step 1
   - `GITHUB_OAUTH_CLIENT_SECRET` → the Client Secret from step 1
3. Redeploy (Deployments tab → ⋯ on latest → Redeploy) so the new variables take effect.

### 3. Update the config to match your domain

Open `public/admin/config.yml` and check the `base_url` line matches your actual live domain exactly, including `https://`:

```yaml
base_url: https://goodlifehq.vercel.app
```

If your domain changes later (e.g. you add a custom domain), update this line and also update the OAuth App's Homepage URL and Authorization callback URL on GitHub to match, then redeploy.

### 4. Log in

Go to `yoursite.vercel.app/admin`, click **Login with GitHub**, approve access when GitHub asks, and you're in. You'll see all 6 starter posts listed, ready to edit, plus a button to create new ones.

**Note:** authentication only works on your live, deployed site, not when running `npm run dev` locally, since GitHub needs a real public callback URL to redirect to.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com), click **Add New Project**, and import the repository.
3. Vercel will auto-detect Next.js, no configuration changes needed.
4. Add the MailerLite environment variables (see above) before your first deploy if you want the newsletter live immediately, or add them later and redeploy.
5. Click **Deploy**. Every push to `main` after this will auto-deploy.
6. Once you have a custom domain, add it under **Settings > Domains** and update `siteConfig.url` in `lib/config.ts` to match, so SEO metadata and the sitemap use the right domain.

## Before Going Fully Live

A few things in this starter are intentionally left as placeholders for you to finalize:

- **Legal pages** (`/privacy-policy`, `/cookie-policy`, `/disclosure`): contain bracketed placeholder text. Update with your real practices, especially once ads or affiliate links go live. Consider a lawyer review.
- **Contact email**: update the `mailto:` address in `app/contact/page.tsx`.
- **OG/social share image**: `public/images/og-default.png` is a generated placeholder, swap for branded artwork when ready.
- **Favicon**: `app/favicon.ico` is a simple placeholder, replace with your real logo mark.
- **Post images**: the 6 starter posts use generated placeholder images in `public/images/posts/`. Swap in real photography or graphics before launch.
- **Domain**: update `siteConfig.url` in `lib/config.ts` once you have a custom domain.

## Project Structure

```
app/                    Next.js routes (pages)
  [category]/           Dynamic category listing pages
  [category]/[slug]/    Dynamic single post pages
  api/newsletter/       Newsletter signup API route
components/             Reusable React components
content/posts/          All blog posts, as Markdown files
lib/                    Config and post-loading logic
public/images/          Site and post images
public/downloads/       Downloadable PDFs (printables, coloring pages)
scripts/                Helper scripts (new-post, image/PDF generation)
```
