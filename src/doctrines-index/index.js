/**
 * Docusaurus plugin that builds a site-wide index of doctrines by reading front matter
 * from markdown files in the configured doctrines directory and exposing the data as
 * global plugin metadata.
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const fg = require('fast-glob');

function extractHeadingTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  if (!match) {
    return undefined;
  }
  return match[1].trim();
}

function computeSlug(relativePath, frontMatterSlug) {
  if (frontMatterSlug) {
    return frontMatterSlug;
  }

  const withoutExtension = relativePath.replace(/\.(md|mdx)$/i, '');
  const normalized = withoutExtension
    .replace(/(^|\/)index$/i, '$1')
    .replace(/\/$/, '');
  const segments = ['doctrines'];
  if (normalized) {
    segments.push(normalized);
  }
  return `/${segments.join('/')}`;
}

module.exports = function doctrinesIndexPlugin(context, options = {}) {
  const { dir = 'docs/doctrines' } = options;
  const doctrinesDir = path.isAbsolute(dir) ? dir : path.join(context.siteDir, dir);

  return {
    name: 'doctrines-index',
    async loadContent() {
      const files = await fg('**/*.{md,mdx}', {
        cwd: doctrinesDir,
        absolute: true,
        dot: false,
      });

      const doctrines = files
        .map(filePath => {
          const source = fs.readFileSync(filePath, 'utf8');
          const { data, content } = matter(source);
          const relativeFromDoctrines = path
            .relative(doctrinesDir, filePath)
            .replace(/\\/g, '/');

          const slug = computeSlug(relativeFromDoctrines, data.slug);
          const title = data.title || extractHeadingTitle(content) || slug;
          const stage = data.stage;
          const category = data.category;

          if (!stage || !category) {
            return null;
          }

          return {
            slug,
            title,
            stage,
            category,
          };
        })
        .filter(Boolean)
        .sort((a, b) => a.title.localeCompare(b.title));

      return { doctrines };
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData, createData } = actions;
      const { doctrines } = content;
      const dataPath = await createData(
        'doctrines-index.json',
        JSON.stringify(doctrines, null, 2),
      );
      const dataPathRelative = path
        .relative(context.generatedFilesDir, dataPath)
        .replace(/\\/g, '/');

      setGlobalData({
        dataPath: dataPathRelative,
        count: doctrines.length,
        doctrines,
      });
    },
  };
};
