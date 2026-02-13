# World News Blog

![World News Blog](https://imgix.cosmicjs.com/f53575a0-08aa-11f1-9563-f7cc37f51ae9-photo-1541872703-74c5e44368f9-1770966577175.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern world news blog platform built with Next.js 16 and Cosmic. Browse the latest headlines in Politics, Technology, and Climate, read rich markdown articles, and explore journalist profiles — all powered by your Cosmic content.

## Features

- 📰 **Hero Featured Article** — Latest post showcased with large featured image
- 🏷️ **Category Browsing** — Filter posts by Politics, Technology, or Climate
- ✍️ **Author Profiles** — Journalist pages with bio, avatar, and article listings
- 📝 **Rich Markdown Content** — Full article rendering with styled headings, lists, and blockquotes
- 📱 **Fully Responsive** — Mobile-first design with hamburger navigation
- 🔍 **SEO Optimized** — Dynamic metadata on every page
- ⚡ **Server-Side Rendering** — Fast initial loads with Next.js App Router
- 🎨 **Editorial Design** — Clean, newspaper-inspired UI with category color coding

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=698ecdd9f6f1f05e8514af9b&clone_repository=698ecfdaf6f1f05e8514afc4)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "A blog with posts about latest world news, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for 'A blog with posts about latest world news, authors, and categories', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [marked](https://marked.js.org/) — Markdown parsing

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with the world news blog content model

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd world-news-blog
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:

Create a `.env.local` file with your Cosmic credentials:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Posts with Author & Category

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Post by Slug

```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post-slug' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)
```

### Fetching Categories

```typescript
const { objects: categories } = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])
```

## Cosmic CMS Integration

This app uses three Cosmic object types:

| Object Type | Fields | Description |
|------------|--------|-------------|
| **Posts** | content (markdown), featured_image (file), author (object→authors), category (object→categories) | News articles |
| **Categories** | name (text), description (textarea) | Post categories (Politics, Technology, Climate) |
| **Authors** | name (text), avatar (file), bio (textarea) | Journalists and writers |

All data is fetched server-side using the Cosmic SDK with `depth(1)` to resolve object relationships in a single query.

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add your environment variables (COSMIC_BUCKET_SLUG, COSMIC_READ_KEY, COSMIC_WRITE_KEY)
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the repository on [Netlify](https://netlify.com)
3. Set the build command to `bun run build`
4. Set the publish directory to `.next`
5. Add your environment variables
6. Deploy

<!-- README_END -->