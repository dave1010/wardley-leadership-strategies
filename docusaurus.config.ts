import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import storeSiteDataPlugin from './src/plugins/storeSiteData';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Wardley Leadership Strategies',
  tagline: 'The Compendium of Wardley Mapping Leadership Gameplays and Strategies',
  favicon: 'img/knight-cropped.jpg',

  future: {
    experimental_faster: {
      rspackBundler: process.env.DISABLE_FASTER_BUILD !== 'true',
      rspackPersistentCache: process.env.DISABLE_FASTER_BUILD !== 'true',
      ssgWorkerThreads: process.env.DISABLE_FASTER_BUILD !== 'true',
    },
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
      useCssCascadeLayers: true,
    },
  },

  // Set the production url of your site here
  url: 'https://www.wardleyleadershipstrategies.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dave1010', // Usually your GitHub org/user name.
  projectName: 'wardley-leadership-strategies', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'true',
      },
    },
    {
      tagName: 'link',
      attributes: {
        href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=EB+Garamond:wght@400;700&display=swap',
        rel: 'stylesheet',
      },
    },
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],


  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/dave1010/wardley-leadership-strategies/tree/main/',
        },
        blog: {
          routeBasePath: 'blog',
          blogTitle: 'AI & Leadership',
          blogDescription:
            'Analysis of how AI reshapes leadership practice, doctrine, and Wardley Mapping strategy.',
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'AI & Leadership',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social-card.png',
    navbar: {
      title: 'Wardley Leadership Strategies',
      logo: {
        alt: 'Wardley Leadership Strategies',
        src: 'img/knight-cropped.jpg',
      },
      items: [
        {
          label: 'Strategies',
          to: '/strategies',
        },
        {
          type: 'dropdown',
          label: 'Knowledge Base',
          items: [
            {
              label: 'Doctrines',
              to: '/doctrines',
            },
            {
              label: 'Strategy Guides',
              to: '/strategy-guides',
            },
            {
              label: 'Climatic Patterns',
              to: '/climatic-patterns',
            },
            {
              label: 'Terms',
              to: '/terms',
            },
            {
              label: 'AI & Leadership',
              to: '/blog',
            },
            {
              label: 'Books',
              to: '/books',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Tools',
          items: [
            {
              label: 'Strategy Navigator',
              to: '/strategy-navigator',
            },
            {
              label: 'Assessment Tool',
              to: '/about/assessment-tool',
            },
            {
              label: 'My Assessments',
              to: '/my-progress',
            },
            {
              label: 'Strategy Maturity Model',
              to: '/tools/strategy-maturity-model',
            },
          ],
        },
        {
          label: 'About',
          to: '/about',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Wardley Leadership Strategies',
          items: [
            {
              label: 'About',
              to: '/about',
            },
            {
              label: 'Strategies',
              to: '/strategies',
            },
            {
              label: 'Doctrines',
              to: '/doctrines',
            },
            {
              label: 'Climatic Patterns',
              to: '/climatic-patterns',
            },
          ],
        },
        {
          title: 'Knowledge Base',
          items: [
            {
              label: 'Strategy Guides',
              to: '/strategy-guides',
            },
            {
              label: 'Terms',
              to: '/terms',
            },
            {
              label: 'AI & Leadership',
              to: '/blog',
            },
            {
              label: 'Books',
              to: '/books',
            },
            {
              label: 'Tags',
              to: '/tags',
            },
          ],
        },
        {
          title: 'Tools & Community',
          items: [
            {
              label: 'Strategy Navigator',
              to: '/strategy-navigator',
            },
            {
              label: 'My Assessments',
              to: '/my-progress',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/dave1010/wardley-leadership-strategies',
            },
          ],
        },
        {
          title: 'Wardley Mapping Resources',
          items: [
            {
              label: 'Simon Wardley\'s Blog',
              href: 'https://blog.gardeviance.org/',
            },
            {
              label: 'Learn Wardley Mapping',
              href: 'https://learnwardleymapping.com/',
            },
            {
              label: 'Wardley Maps Book',
              href: 'https://medium.com/wardleymaps',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Privacy Policy',
              to: '/privacy-policy',
            },
            {
              label: 'Home',
              to: '/',
            },
          ],
        },
      ],
      copyright: `
        <p>
          Wardley Leadership Strategies is Copyright © ${new Date().getFullYear()} <a href="https://dave.engineer">Dave Hulbert</a>
          and licenced <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.
          <br />
          Wardley Mapping is provided courtesy of Simon Wardley and is also licensed <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.
          Simon Wardley is not associated with this website.
        </p>
        `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    require.resolve('docusaurus-lunr-search'),
    '@docusaurus/plugin-vercel-analytics',
    storeSiteDataPlugin,
    [require.resolve('./plugins/books-index'), {dir: 'docs/books'}],
  ],
};

export default config;
