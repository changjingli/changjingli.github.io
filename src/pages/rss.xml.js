import rss from '@astrojs/rss';
import { getPostPath, getPosts } from '@/utils/posts';

export async function GET(context) {
  const posts = await getPosts();

  return rss({
    title: '敬礼的唠叨',
    description: '常敬礼的个人博客：前端技术、成长复盘、读书笔记与生活观察。',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? post.body.slice(0, 160),
      link: getPostPath(post),
    })),
  });
}
