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
          title: 'Getting Started',
          items: [
            {
              label: 'Welcome!',
              to: '/docs',
            },
            {
              label: 'Installation',
              to: 'docs/installation',
            },
            {
              label: 'Getting Started',
              to: 'docs/getting-started',
            },
          ],
        },

        // 2 Coll
        {
          title: 'Exercises',
          items: [
            {
              label: 'About exercises!',
              to: '/docs/exercises',
            },
            {
              label: 'Ex01: Extra button',
              to: '/docs/extra-button',
            },
            {
              label: 'Ex02: State machine',
              to: '/docs/state-machine',
            },
            {
              label: 'Ex03: Insertion points',
              to: '/docs/insertion-points',
            },
            {
              label: 'Ex04: Overlays',
              to: '/docs/overlays',
            },
            {
              label: 'Ex05: Wallet',
              to: '/docs/wallet',
            },
            {
              label: 'Ex06: Viewport adapter',
              to: '/docs/viewport-adapter',
            },
            {
              label: 'Ex07: Virtual adapter (interface)',
              to: '/docs/virtual-adapter-int',
            },
            {
              label: 'Ex08: New Site specific adapter',
              to: 'docs/new-site-adapter',
            },
            {
              label: 'Ex09: New Viewport adapter',
              to: '/docs/new-viewport-adapter',
            },
            {
              label: 'Ex10: New Virtual adapter (interface)',
              to: '/docs/new-virtual-adapter',
            },
            {
              label: 'Ex11: Widgets Iterator',
              to: '/docs/widgets-iterator',
            },
            {
              label: 'Ex12: New Overlay Interface',
              to: '/docs/new-overlay-interface',
            },
            {
              label: 'Ex 13: Dark theme support',
              to: '/docs/dark-theme-support',
            },
          ],
        },

        // 3 Coll
        {
          title: 'Adapters API',
          items: [
            {
              label: 'Using adapters',
              to: '/docs/using-adapters',
            },
            {
              label: 'Community-created adapters',
              to: 'docs/adapters-docs-list',
            },
            {
              label: 'Creating adapter docs',
              to: 'docs/create-adapter-doc',
            },
          ],
        },

        // 4 Coll
        {
          title: 'Publishing',
          items: [
            {
              label: 'Publishing',
              to: 'docs/publishing',
            },
          ],
        },

        // 5 Coll
        {
          title: 'Join Us',
          items: [
            {
              label: 'Community',
              to: 'docs/community',
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
