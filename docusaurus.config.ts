import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Wardley Leadership Strategies',
  tagline: 'The Compendium of Wardley Mapping Leadership Gameplays and Strategies',
  favicon: 'img/knight-cropped.jpg',

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


  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/dave1010/wardley-leadership-strategies/tree/main/',
        },
        blog:false,
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
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Strategies',
        // },
        {
          label: 'Strategies',
          to: '/strategies',
        },
        {
          label: 'Terms',
          to: '/terms',
        },
        {
          label: 'About',
          to: '/about',
        },
        {
          href: 'https://github.com/dave1010/wardley-leadership-strategies',
          label: 'GitHub',
          position: 'right',
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
              label: 'Terms',
              to: '/terms',
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
              label: 'GitHub',
              href: 'https://github.com/dave1010/wardley-leadership-strategies',
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
    '@docusaurus/plugin-vercel-analytics'
  ],
};

export default config;
