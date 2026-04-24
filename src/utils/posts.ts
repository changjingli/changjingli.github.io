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
