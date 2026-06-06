# Blog Growth Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Add measurable discovery, continuation, subscription, and sharing loops to the Astro blog.

**Architecture:** Pure post-selection helpers provide curated and related content. Small Astro components render growth surfaces, while one client script records GA events across initial loads and Astro client navigation. A Node verification script checks the generated site.

**Tech Stack:** Astro 5, TypeScript, CSS, Google Analytics 4, Node.js.

---

### Task 1: Build-output growth verification

**Files:**
- Create: `scripts/verify-growth.mjs`
- Modify: `package.json`

- [x] Add assertions for homepage curated content, article continuation actions, canonical sitemap entries, and the authored calendar date.
- [x] Add `verify:growth` that builds the site and runs the verifier.
- [x] Run `npm run verify:growth` and confirm it fails before implementation.

### Task 2: Post discovery helpers and date correctness

**Files:**
- Modify: `src/utils/posts.ts`
- Modify: `src/config/site.ts`

- [x] Add curated post slugs to site configuration.
- [x] Add helpers to select configured posts and rank related posts by shared tags and recency.
- [x] Format displayed dates with `Asia/Shanghai`.
- [x] Parse content dates as authored Shanghai calendar values so JSON-LD and ordering do not shift by one day.

### Task 3: Growth analytics

**Files:**
- Create: `src/components/GrowthAnalytics.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/GoogleAnalytics.astro`

- [x] Track page views after `astro:page-load`.
- [x] Emit `article_view`, `scroll_50`, and `read_complete` once per article navigation.
- [x] Emit delegated events from `data-growth-event` elements.
- [x] Keep analytics calls no-op when GA is unavailable.

### Task 4: Article continuation and retention

**Files:**
- Create: `src/components/ArticleGrowth.astro`
- Modify: `src/pages/posts/[...slug].astro`
- Modify: `src/styles/global.css`

- [x] Render related posts, previous/next navigation, RSS CTA, and share/copy action.
- [x] Add Web Share with clipboard fallback and visible status feedback.
- [x] Add accessible responsive styling consistent with the existing editorial design.

### Task 5: Homepage activation

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/components/PostCard.astro`
- Modify: `src/styles/global.css`

- [x] Rewrite the hero around AI-assisted engineering, full-stack practice, and reflective growth.
- [x] Add a curated "start here" section before latest posts.
- [x] Add topic entry points and growth-event attributes.
- [x] Reduce mobile header height by keeping brand and navigation compact.

### Task 6: Acquisition metadata and sitemap

**Files:**
- Modify: `astro.config.mjs`
- Modify: selected files under `src/content/blog/`

- [x] Filter legacy dated redirect routes from sitemap generation.
- [x] Add explicit descriptions to curated evergreen articles.
- [x] Verify canonical metadata and sitemap output.

### Task 7: Verification

**Files:**
- Verify all modified files.

- [x] Run `npm run check`.
- [x] Run `npm run verify:llms`.
- [x] Run `npm run verify:growth`.
- [x] Inspect homepage and article pages at desktop and 390px mobile widths.
- [x] Confirm no browser console errors.
