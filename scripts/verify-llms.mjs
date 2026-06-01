import { readFile } from 'node:fs/promises';

const requiredFiles = ['dist/llms.txt', 'dist/llms-full.txt'];

async function readRequiredFile(path) {
  try {
    return await readFile(path, 'utf8');
  } catch (error) {
    throw new Error(`Expected ${path} to be generated. ${error.message}`);
  }
}

const [llms, llmsFull] = await Promise.all(requiredFiles.map(readRequiredFile));

const expectations = [
  [llms.includes('# 敬礼的唠叨'), 'llms.txt includes the site title'],
  [llms.includes('https://www.iamjingli.com/rss.xml'), 'llms.txt includes the RSS URL'],
  [llms.includes('## Featured Posts'), 'llms.txt includes a featured posts section'],
  [llms.includes('- ['), 'llms.txt includes Markdown post links'],
  [llmsFull.includes('# 敬礼的唠叨'), 'llms-full.txt includes the site title'],
  [llmsFull.includes('## Featured Posts'), 'llms-full.txt includes featured post content'],
  [llmsFull.includes('### '), 'llms-full.txt includes individual post headings'],
];

const failures = expectations.filter(([passed]) => !passed).map(([, message]) => message);

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log('llms.txt and llms-full.txt generated with expected content.');
