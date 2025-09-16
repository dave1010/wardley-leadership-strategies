import path from 'path';
import {promises as fs} from 'fs';
import matter from 'gray-matter';
import type {LoadContext, Plugin} from '@docusaurus/types';
import type {StrategyMetadata, StrategyMetadataGlobalData} from '../types/strategyMetadata';

type FrontMatter = Record<string, unknown>;

async function readFileSafely(filePath: string): Promise<string> {
  return fs.readFile(filePath, 'utf8');
}

function ensureStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }
  if (typeof value === 'string') {
    return [value];
  }
  return [];
}

function ensureString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

async function collectStrategyFiles(rootDir: string): Promise<string[]> {
  const files: string[] = [];

  async function traverse(currentDir: string) {
    const entries = await fs.readdir(currentDir, {withFileTypes: true});
    await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          await traverse(fullPath);
        } else if (entry.isFile() && entry.name === 'index.md') {
          files.push(fullPath);
        }
      }),
    );
  }

  await traverse(rootDir);
  return files;
}

function buildMetadata({
  frontMatter,
  relativePath,
}: {
  frontMatter: FrontMatter;
  relativePath: string;
}): StrategyMetadata | null {
  const segments = relativePath.split(path.sep);
  if (segments.length !== 3) {
    return null;
  }
  const [category, strategyFolder, fileName] = segments;
  if (fileName !== 'index.md') {
    return null;
  }

  const slug = `${category}/${strategyFolder}`;
  const permalink = `/strategies/${slug}/`;

  const title = ensureString(frontMatter.title) ?? strategyFolder.replace(/-/g, ' ');
  const description = ensureString(frontMatter.description) ?? '';
  const tags = ensureStringArray(frontMatter.tags);
  const leadershipSkills = ensureStringArray(frontMatter.leadership_skills_needed);
  const relatedStrategies = ensureStringArray(frontMatter.related_strategies);
  const authors = ensureStringArray(frontMatter.authors);

  return {
    id: slug,
    title,
    description,
    permalink,
    category,
    tags,
    evolutionStage: ensureString(frontMatter.evolution_stage),
    strategicInsightArea: ensureString(frontMatter.strategic_insight_area),
    ethicalAlignment: ensureString(frontMatter.ethical_alignment),
    leadershipSkills,
    whenToUse: ensureString(frontMatter.when_to_use),
    whenToAvoid: ensureString(frontMatter.when_to_avoid),
    coreChallenge: ensureString(frontMatter.core_challenge),
    relatedStrategies,
    authors,
  };
}

export default function strategyMetadataPlugin(
  context: LoadContext,
): Plugin<StrategyMetadataGlobalData> {
  return {
    name: 'strategy-metadata-plugin',
    async loadContent() {
      const strategiesDir = path.join(context.siteDir, 'docs', 'strategies');
      const allFiles = await collectStrategyFiles(strategiesDir);

      const strategies: StrategyMetadata[] = [];
      for (const file of allFiles) {
        const relativePath = path.relative(strategiesDir, file);
        const parsed = matter(await readFileSafely(file));
        const metadata = buildMetadata({
          frontMatter: parsed.data ?? {},
          relativePath,
        });
        if (metadata) {
          strategies.push(metadata);
        }
      }

      strategies.sort((a, b) => a.title.localeCompare(b.title));
      return {strategies};
    },
    async contentLoaded({content, actions}) {
      const {setGlobalData} = actions;
      setGlobalData(content);
    },
  };
}
