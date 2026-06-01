import { siteConfig, absoluteUrl } from '@/config/site';
import { formatDate, getExcerpt, getPostPath, type BlogPost } from '@/utils/posts';

const FULL_TEXT_POST_LIMIT = 20;

function cleanMarkdown(body = '') {
  return body
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/\r\n/g, '\n')
    .trim();
}

function postUrl(post: BlogPost) {
  return absoluteUrl(getPostPath(post));
}

function formatTags(post: BlogPost) {
  return post.data.tags.length > 0 ? ` Tags: ${post.data.tags.join(', ')}.` : '';
}

export function generateLlmsTxt(posts: BlogPost[]) {
  const postLinks = posts
    .map((post) => {
      const description = post.data.description ?? getExcerpt(post.body, 120);
      return `- [${post.data.title}](${postUrl(post)}) - ${description} Published: ${formatDate(post.data.date)}.${formatTags(post)}`;
    })
    .join('\n');

  return `# ${siteConfig.title}

> ${siteConfig.description}

${siteConfig.author} writes about frontend engineering, full-stack development, AI agents, learning, communication, and monthly reflections.

## Site

- [Home](${absoluteUrl('/')}) - Blog homepage and latest writing.
- [Archives](${absoluteUrl('/archives/')}) - Chronological archive of all posts.
- [Tags](${absoluteUrl('/tags/')}) - Topic index for browsing by theme.
- [About](${absoluteUrl('/about/')}) - Author profile and background.
- [RSS](${absoluteUrl('/rss.xml')}) - RSS feed for new posts.
- [Full LLM Context](${absoluteUrl('/llms-full.txt')}) - Selected posts with full Markdown content.

## Featured Posts

${postLinks}
`;
}

export function generateLlmsFullTxt(posts: BlogPost[]) {
  const selectedPosts = posts.slice(0, FULL_TEXT_POST_LIMIT);
  const fullPosts = selectedPosts
    .map((post) => {
      const description = post.data.description ?? getExcerpt(post.body, 160);
      return `### ${post.data.title}

URL: ${postUrl(post)}
Published: ${formatDate(post.data.date)}
${post.data.updated ? `Updated: ${formatDate(post.data.updated)}\n` : ''}Description: ${description}
${post.data.tags.length > 0 ? `Tags: ${post.data.tags.join(', ')}\n` : ''}
${cleanMarkdown(post.body)}
`;
    })
    .join('\n\n---\n\n');

  return `# ${siteConfig.title}

> ${siteConfig.description}

This file contains selected Markdown content from ${siteConfig.title} for large language model context. For the compact index, see ${absoluteUrl('/llms.txt')}.

## Site

- Home: ${absoluteUrl('/')}
- Archives: ${absoluteUrl('/archives/')}
- Tags: ${absoluteUrl('/tags/')}
- About: ${absoluteUrl('/about/')}
- RSS: ${absoluteUrl('/rss.xml')}

## Featured Posts

${fullPosts}
`;
}
