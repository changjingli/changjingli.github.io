import { getPosts } from '@/utils/posts';
import { generateLlmsFullTxt } from '@/utils/llms';

export async function GET() {
  const posts = await getPosts();

  return new Response(generateLlmsFullTxt(posts), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
