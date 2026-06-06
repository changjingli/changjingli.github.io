# Blog Growth Optimization Design

## Goal

Turn the blog from a single-article reading destination into a measurable loop:

`discover -> read -> continue reading -> subscribe/share -> return`

## Scope

### Acquisition

- Make the homepage state the audience and recurring value clearly.
- Add a curated "start here" section that is not dominated by monthly posts.
- Add explicit descriptions to the highest-value evergreen articles.
- Keep only canonical article URLs in the sitemap.

### Activation

- Present topic-led entry points instead of relying only on chronological archives.
- Keep the existing warm editorial visual language while making the primary action obvious.

### Engagement

- Add related articles and previous/next navigation after every article.
- Rank related articles by shared tags, then recency.

### Retention And Referral

- Expose RSS in the header/footer and at the end of articles.
- Add native share with a copy-link fallback.
- Track article views, reading depth, completion, related-post clicks, subscription clicks, share actions, and discovery navigation.

## Architecture

- Keep content in Astro's existing `blog` collection.
- Add pure post-selection helpers to `src/utils/posts.ts`.
- Add focused components for growth analytics and article continuation.
- Keep curated homepage slugs in `src/config/site.ts` so editorial choices remain explicit.
- Add a build-output verification script using Node's standard library.

## Interaction Rules

- Homepage primary CTA: open the curated reading list.
- Article-end primary CTA: continue with a related article.
- RSS remains the only subscription mechanism in this phase.
- Share uses `navigator.share()` when supported and copies the canonical URL otherwise.
- Analytics never blocks navigation or reading.

## Success Criteria

- Every article exposes at least two continuation paths when enough posts exist.
- Every article exposes RSS and share actions.
- The homepage contains a curated section before the chronological feed.
- Legacy redirect URLs are absent from the generated sitemap.
- Dates render as authored calendar dates in the Asia/Shanghai timezone.
- Growth events are emitted on both initial and client-routed page views.
