import rss from '@astrojs/rss';
import { siteConfig } from '@/config/site';
import { getExcerpt, getPostPath, getPosts } from '@/utils/posts';

export async function GET(context) {
  const posts = await getPosts();

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? getExcerpt(post.body, 160),
      link: getPostPath(post),
    })),
  });
}
