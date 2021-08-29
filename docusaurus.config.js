module.exports = {
  title: 'Dapplets Platform',
  tagline: 'Welcome to the Dapplets',
  url: 'https://docs.dapplets.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  organizationName: 'Dapplets', // Usually your GitHub org/user name.
  projectName: 'dapplet-extension', // Usually your repo name.
  themeConfig: {
    sidebarCollapsible: true,
    prism: {
      /**
       * -- POSSIBLE OPTIONS --
       * dracula
       * github
       * nightOwlLight
       * palenight
       * ultramin
       * duotoneDark
       * oceanicNext
       * shadesOfPurple
       * vsDark
       * duotoneLight
       * nightOwl
       * okaidia
       * synthwave84
       * vsLight
       */
      theme: require('./src/theme/custom-theme-code'),
    },
    navbar: {
      title: 'Dapplet Platform',
      logo: {
        alt: 'Dapplet Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'right',
        },
        {
          href: 'https://github.com/dapplets/dapplet-extension',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [

        // 1 Coll
        {
          title: 'Home',
          items: [],
        },

        // 2 Coll
        {
          title: 'Dapplets Store',
          items: [
            {
              label: 'Category 1',
              href: '#1'
            },
            {
              label: 'Category 2',
              href: '#2'
            },
            {
              label: 'Category 3',
              href: '#3'
            },
            {
              label: 'Category 4',
              href: '#4'
            },
          ],
        },

        // 3 Coll
        {
          title: 'Join Us',
          items: [
            {
              label: 'Owner ',
              href: '#5'
            },
            {
              label: 'Lister',
              href: '#6'
            },
            {
              label: 'Developer',
              href: '#7'
            },
            {
              label: 'Auditor',
              href: '#8'
            },
          ],
        },

        // 4 Coll
        {
          title: 'About Dapplets',
          items: [
            {
              label: 'Our Mission ',
              href: '#'
            },
            {
              label: 'Motivation',
              href: '#9'
            },
            {
              label: 'Developer',
              href: '#11'
            },
            {
              label: 'Strategy',
              href: '#12'
            },
            {
              label: 'Project News',
              href: '#13'
            },
            {
              label: 'FAQ',
              href: '#14'
            },
            {
              label: 'Career at Dapplets',
              href: '#15'
            },
          ],
        },

        // 5 Coll
        {
          title: 'Forum',
          items: [
            {
              label: 'Menu  Item 1',
              href: '#21'
            },
            {
              label: 'Menu  Item 2',
              href: '#22'
            },
          ],
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/dapplets/dapplet-docs',
        },
        theme: {
          customCss: require.resolve('./src/scss/custom.scss'),
        },
      },
    ],
  ],
  plugins: ['docusaurus-plugin-sass', 'docusaurus-plugin-fontloader']
};
