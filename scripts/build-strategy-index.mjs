#!/usr/bin/env node
/**
 * Generates a rich strategy index from the MDX files under docs/strategies.
 *
 * The output is written to src/data/strategyIndex.ts and includes the
 * front-matter metadata alongside the MapSignals and Readiness statements used
 * by the assessment component on each strategy page.
 */

import {promises as fs} from 'fs';
import path from 'path';
import matter from 'gray-matter';

const __dirname = path.resolve();
const docsDir = path.join(__dirname, 'docs', 'strategies');
const outputFile = path.join(__dirname, 'src', 'data', 'strategyIndex.ts');

const HEADER = `// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY.
// Run \`node scripts/build-strategy-index.mjs\` to regenerate.

export type StrategyMetadata = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  permalink: string;
  category: string;
  mapSignals: string[];
  readiness: string[];
};

const strategies: StrategyMetadata[] = `;

const FOOTER = `;

export default strategies;
`;

function cleanHtml(text) {
  return text
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractList(content, tagName) {
  const regex = new RegExp(String.raw`<${tagName}[^>]*>([\s\S]*?)</${tagName}>`, 'i');
  const match = content.match(regex);
  if (!match) {
    return [];
  }

  const inner = match[1];
  const items = [];

  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let liMatch;
  while ((liMatch = liRegex.exec(inner)) !== null) {
    const cleaned = cleanHtml(liMatch[1]);
    if (cleaned) {
      items.push(cleaned);
    }
  }

  if (items.length === 0) {
    const bulletRegex = /^\s*[-*+]\s+(.*)$/gim;
    let bulletMatch;
    while ((bulletMatch = bulletRegex.exec(inner)) !== null) {
      const cleaned = cleanHtml(bulletMatch[1]);
      if (cleaned) {
        items.push(cleaned);
      }
    }
  }

  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item)) {
      return false;
    }
    seen.add(item);
    return true;
  });
}

function normalisePermalink(relativePath) {
  const withoutIndex = relativePath.replace(/index\.md$/i, '');
  return `/${withoutIndex.replace(/\\/g, '/').replace(/\/+/g, '/')}`;
}

async function collectStrategyFiles(dir) {
  const entries = await fs.readdir(dir, {withFileTypes: true});
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await collectStrategyFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase() === 'index.md') {
      const relative = path.relative(path.join(__dirname, 'docs'), fullPath).replace(/\\/g, '/');
      const segments = relative.split('/');
      // strategies/<category>/<strategy>/index.md -> segments length >= 4
      if (segments.length >= 4 && segments[0] === 'strategies') {
        results.push(fullPath);
      }
    }
  }

  return results;
}

async function buildIndex() {
  const files = await collectStrategyFiles(docsDir);
  const strategies = [];

  for (const filePath of files) {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const {data, content} = matter(fileContent);

    const relative = path.relative(path.join(__dirname, 'docs'), filePath).replace(/\\/g, '/');
    const segments = relative.split('/');
    const category = segments[1] ?? 'uncategorised';
    const slugSegments = segments.slice(0, -1);
    const permalink = normalisePermalink(slugSegments.join('/') + '/');
    const id = segments.slice(1, -1).join('/');

    const strategy = {
      id,
      title: data.title ?? slugSegments.at(-1) ?? 'Unknown strategy',
      description: data.description ?? '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      permalink,
      category,
      mapSignals: extractList(content, 'MapSignals'),
      readiness: extractList(content, 'Readiness'),
    };

    strategies.push(strategy);
  }

  strategies.sort((a, b) => a.title.localeCompare(b.title));

  const output = `${HEADER}${JSON.stringify(strategies, null, 2)}${FOOTER}`;
  await fs.mkdir(path.dirname(outputFile), {recursive: true});
  await fs.writeFile(outputFile, output);
  console.log(`Generated ${strategies.length} strategies to ${path.relative(__dirname, outputFile)}`);
}

buildIndex().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
