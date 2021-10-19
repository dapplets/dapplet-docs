module.exports = {
  title: 'Documentation | Dapplets Platform',
  tagline: 'Welcome to the Dapplets',
  url: 'https://docs.dapplets.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  organizationName: 'Dapplets', // Usually your GitHub org/user name.
  projectName: 'dapplet-extension', // Usually your repo name.
  themeConfig: {
    colorMode: {
      disableSwitch: true,
    },
    sidebarCollapsible: true,
    prism: {
      theme: require('./src/theme/custom-theme-code'),
    },
    navbar: {
      items: [
        // {
        //   type: 'localeDropdown',
        //   position: 'left',
        // },
        {
          to: 'https://dapplets.org/',
          label: 'Home',
          position: 'right',
          className: 'home-hover-menu'
        },
        {
          href: 'https://forum.dapplets.org/',
          label: 'Forum',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [

        // 1 Coll
        {
          title: 'Home',
          items: [
            {
              label: 'What is Dapplets Project?',
              href: 'https://dapplets.org/#what-is'
            },
            {
              label: 'Innovation',
              href: 'https://dapplets.org/#innovation'
            },
            {
              label: 'How to use it?',
              href: 'https://dapplets.org/#to-use'
            },
            {
              label: 'Role model',
              href: 'https://dapplets.org/#economic'
            },
          ],
        },

        // 2 Coll
        {
          title: 'Join Us',
          items: [
            {
              label: 'Owner ',
              href: 'https://dapplets.org/join-us.html#owner'
            },
            {
              label: 'Lister',
              href: 'https://dapplets.org/join-us.html#lister'
            },
            {
              label: 'Developer',
              href: 'https://dapplets.org/join-us.html#auditors'
            },
            {
              label: 'Auditor',
              href: 'https://dapplets.org/join-us.html#auditors'
            },
          ],
        },

        // 4 Coll
        {
          title: 'About Dapplets',
          items: [
            {
              label: 'Our Mission ',
              href: 'https://dapplets.org/about.html#mission'
            },
            {
              label: 'Motivation',
              href: 'https://dapplets.org/about.html#motivation'
            },
            {
              label: 'Career at Dapplets',
              href: 'https://dapplets.org/about.html#career'
            },
          ],
        },

        // 5 Coll
        {
          title: 'Forum',
          items: [
            {
              label: 'Forum Dapplets',
              href: 'https://forum.dapplets.org'
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
            'https://github.com/dapplets/dapplet-docs/blob/master/',
        },
        theme: {
          customCss: require.resolve('./src/scss/custom.scss'),
        },
      },
    ],
  ],
  plugins: ['docusaurus-plugin-sass', 'docusaurus-plugin-fontloader'],
  // i18n: {
  //   defaultLocale: 'ENG',
  //   locales: ['ENG']
  // }
};
