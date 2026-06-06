export const siteConfig = {
  name: '敬礼的唠叨',
  title: '敬礼的唠叨',
  description: '常敬礼的个人博客：前端技术、全栈探索、AI 智能体开发、成长复盘与生活观察。',
  url: 'https://www.iamjingli.com',
  author: '常敬礼',
  locale: 'zh-CN',
  keywords: ['常敬礼', '敬礼的唠叨', '前端', '全栈', 'AI Agent', 'AI 智能体', '终身学习'],
  featuredPostSlugs: [
    'tough-ai-principle-between-ai-and-daughter',
    'project-time-estimation',
    'thinking-about-improving-development-efficiency',
    'nonviolent-communication-note',
  ],
  topics: [
    {
      name: 'AI 与工程实践',
      description: '从真实项目和个人体验出发，理解 AI 如何改变软件开发。',
      href: '/posts/tough-ai-principle-between-ai-and-daughter/',
      action: '阅读代表文章',
    },
    {
      name: '工程效率与判断',
      description: '工时评估、开发效率、技术选择，以及做决定时容易忽略的约束。',
      href: '/tags/工作思考/',
      action: '进入主题',
    },
    {
      name: '长期成长复盘',
      description: '按月记录工作、学习、家庭与健康，观察行动如何积累成变化。',
      href: '/tags/月度总结/',
      action: '进入主题',
    },
  ],
};

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString();
}
