import { getPosts } from '@/utils/posts';
import { generateLlmsTxt } from '@/utils/llms';

export async function GET() {
  const posts = await getPosts();

  return new Response(generateLlmsTxt(posts), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
