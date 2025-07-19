import fs from 'fs';
import path from 'path';

function getSeoTags({docPath, siteConfig}) {
  const url = siteConfig.url;
  const pageUrl = url + docPath;

  if (!docPath) {
    return [];
  }

  const docPathClean = docPath.startsWith('/') ? docPath.substring(1) : docPath;
  let filePath = path.join('docs', docPathClean + '.md');

  if(docPathClean.length === 0) {
    filePath = path.join('docs', 'index.md');
  } else if (!fs.existsSync(filePath)) {
    filePath = path.join('docs', docPathClean, 'index.md');
  }

  console.log(`[getSeoTags] Processing ${filePath}`);

  if (!fs.existsSync(filePath)) {
    console.log(`[getSeoTags] File not found: ${filePath}`);
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const firstLine = content.split('\n')[0];
  const description = firstLine.replace(/# /g, '');

  return [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: description,
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:description',
        content: description,
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'twitter:description',
        content: description,
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:type',
        content: 'website',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:url',
        content: pageUrl,
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'twitter:card',
        content: 'summary_large_image',
      },
    },
  ];
}


export default function (context, options) {
  return {
    name: 'seo-plugin',
    injectHtmlTags({content, ...props}) {
      const {routes, siteConfig} = props;
      const currentRoute = routes.find(r => content.includes(r.path));
      if (currentRoute) {
        return {
          headTags: getSeoTags({docPath: currentRoute.path, siteConfig}),
        };
      }
      return {};
    },
  };
}
