import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'y0sh1ne',
  tagline: 'okane ga nai! okane ga hoshii!',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://y0sh1ne.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'y0sh1ne', // Usually your GitHub org/user name.
  projectName: 'y0sh1ne.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'y0sh1ne',
      hideOnScroll: false,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Notes',
        },
        {
          // type: 'default',
          to: '/blog', 
          label: 'Blog', 
          position: 'left'},
        {
          type: 'search',
          position: 'right',
        },
        {
          // type: 'default',
          href: 'https://github.com/y0sh1ne/y0sh1ne.github.io',
          className: "header-github-link",
          position: 'right',
        }
      ],
    },
/*
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} - PRESENT y0sh1ne. Built with Docusaurus.`,
    },
*/
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {// The information provided by Algolia, safe to commit it
      appId: 'AQAO8AOGGJ',
      apiKey: 'aa067878c0dc27ebd0742a7c146e6fd5',
      indexName: 'y0sh1neio',
    }
  } satisfies Preset.ThemeConfig,
};

export default config;
