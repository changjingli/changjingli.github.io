export const siteConfig = {
  name: '敬礼的唠叨',
  title: '敬礼的唠叨',
  description: '常敬礼的个人博客：前端技术、全栈探索、AI 智能体开发、成长复盘与生活观察。',
  url: 'https://www.iamjingli.com',
  author: '常敬礼',
  locale: 'zh-CN',
  keywords: ['常敬礼', '敬礼的唠叨', '前端', '全栈', 'AI Agent', 'AI 智能体', '终身学习'],
};

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString();
}
