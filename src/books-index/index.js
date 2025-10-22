/**
 * Docusaurus plugin that builds a site-wide index of books by reading front matter
 * from markdown files in the configured books directory and exposing the data as
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

module.exports = function booksIndexPlugin(context, options = {}) {
  const {dir = 'docs/books'} = options;
  const booksDir = path.isAbsolute(dir) ? dir : path.join(context.siteDir, dir);

  return {
    name: 'books-index',
    async loadContent() {
      const files = await fg('**/*.{md,mdx}', {
        cwd: booksDir,
        absolute: true,
        dot: false,
      });

      const books = files
        .map((filePath) => {
          const source = fs.readFileSync(filePath, 'utf8');
          const {data, content} = matter(source);
          const relativeFromBooks = path
            .relative(booksDir, filePath)
            .replace(/\\/g, '/');
          const baseSlug = relativeFromBooks.replace(/\.(md|mdx)$/i, '');
          const slug = data.slug || `/books/${baseSlug}`;
          const title = data.title || extractHeadingTitle(content) || '';

          return {
            slug,
            title,
            authors: data.authors || [],
            isbn13: data.isbn13,
            year: data.year || null,
            tags: data.tags || [],
            summary: data.summary || '',
          };
        })
        .filter((book) => Boolean(book.isbn13));

      return {books};
    },
    async contentLoaded({content, actions}) {
      const {setGlobalData, createData} = actions;
      const {books} = content;
      const sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));
      const dataPath = await createData(
        'books-index.json',
        JSON.stringify(sortedBooks, null, 2),
      );
      const dataPathRelative = path
        .relative(context.generatedFilesDir, dataPath)
        .replace(/\\/g, '/');

      setGlobalData({
        dataPath: dataPathRelative,
        count: sortedBooks.length,
        books: sortedBooks,
      });
    },
  };
};
