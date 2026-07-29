import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://www.iamjingli.com',
  publicDir: './static',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !/^https:\/\/www\.iamjingli\.com\/\d{4}\/\d{2}\/\d{2}\//.test(page),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
