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
      theme: require('prism-react-renderer/themes/vsLight'),
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
      style: 'dark',
      links: [
        {
          title: 'Dapplets',
          items: [
            {
              label: 'Dapplets',
              to: 'https://dapplets.org',
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Telegram',
              href: 'https://t.me/dapplets',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              href: 'https://dapplets.org/publications.html'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/dapplets/dapplet-extension',
            },
          ],
        },
      ],
      copyright: `Copyleft © ${new Date().getFullYear()}`,
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
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
  plugins: ['docusaurus-plugin-sass']
};
