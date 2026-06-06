import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

async function readDist(path) {
  return readFile(resolve(root, 'dist', path), 'utf8');
}

const [home, article, sitemap] = await Promise.all([
  readDist('index.html'),
  readDist('posts/monthly-2026-04/index.html'),
  readDist('sitemap-0.xml'),
]);

assert.match(home, /新读者从这里开始/, 'homepage should include a curated start-here section');
assert.match(home, /data-growth-event="featured_post_click"/, 'featured article clicks should be measurable');

assert.match(article, /继续阅读/, 'article should offer continuation paths');
assert.match(article, /订阅 RSS/, 'article should expose an RSS subscription action');
assert.match(article, /data-share-article/, 'article should expose a share action');
assert.match(article, /2026\/05\/31/, 'article should preserve the authored Shanghai calendar date');

assert.doesNotMatch(
  sitemap,
  /\/2026\/03\/30\/monthly-2026-02\//,
  'legacy redirect URLs should be excluded from the sitemap',
);
assert.match(
  sitemap,
  /\/posts\/monthly-2026-02\//,
  'canonical article URLs should remain in the sitemap',
);

console.log('Growth verification passed.');
