import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  return posts.sort((left, right) => right.data.date.getTime() - left.data.date.getTime());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Shanghai',
  }).format(date);
}

export function formatDay(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    day: '2-digit',
    timeZone: 'Asia/Shanghai',
  }).format(date);
}

export function formatYearMonth(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    timeZone: 'Asia/Shanghai',
  }).format(date);
}

export function getPostPath(post: BlogPost) {
  return `/posts/${getPostSlug(post)}/`;
}

export function getPostSlug(post: BlogPost) {
  return post.id.replace(/\.md$/, '');
}

export function getReadingTime(body = '') {
  const words = body.replace(/```[\s\S]*?```/g, '').replace(/<[^>]+>/g, '').trim().length;
  return Math.max(1, Math.ceil(words / 450));
}

export function getExcerpt(body = '', maxLength = 108) {
  const excerpt = body
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[[^\]]+\]\([^)]*\)/g, (match) => match.replace(/^\[|\]\([^)]*\)$/g, ''))
    .replace(/[#>*_`~\-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return excerpt.length > maxLength ? `${excerpt.slice(0, maxLength)}…` : excerpt;
}

export function getAllTags(posts: BlogPost[]) {
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.data.tags.forEach((tag) => tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1));
  });

  return [...tagMap.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name, 'zh-CN'));
}

export function getPostsBySlugs(posts: BlogPost[], slugs: readonly string[]) {
  const postMap = new Map(posts.map((post) => [getPostSlug(post), post]));
  return slugs.flatMap((slug) => {
    const post = postMap.get(slug);
    return post ? [post] : [];
  });
}

export function getRelatedPosts(
  posts: BlogPost[],
  currentPost: BlogPost,
  limit = 3,
  excludedSlugs: string[] = [],
) {
  const currentSlug = getPostSlug(currentPost);
  const currentTags = new Set(currentPost.data.tags);
  const excluded = new Set([currentSlug, ...excludedSlugs]);

  return posts
    .filter((post) => !excluded.has(getPostSlug(post)))
    .map((post) => ({
      post,
      sharedTags: post.data.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .sort(
      (left, right) =>
        right.sharedTags - left.sharedTags ||
        right.post.data.date.getTime() - left.post.data.date.getTime(),
    )
    .slice(0, limit)
    .map(({ post }) => post);
}

export function getAdjacentPosts(posts: BlogPost[], currentPost: BlogPost) {
  const currentIndex = posts.findIndex((post) => getPostSlug(post) === getPostSlug(currentPost));

  return {
    newerPost: currentIndex > 0 ? posts[currentIndex - 1] : undefined,
    olderPost: currentIndex >= 0 ? posts[currentIndex + 1] : undefined,
  };
}
