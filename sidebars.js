module.exports = {
  someSidebar: [
    'introduction',
    'installation',
    'getting-started',
    {
      type: 'category',
      label: 'Exercises',
      items: [
        'exercises',
        'extra-button',
        'state-machine',
        'insertion-points',
        'overlays',
        'wallet',
        'viewport-adapter',
        'virtual-adapter-int',
        'new-site-adapter',
        'new-viewport-adapter',
        'new-virtual-adapter',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Adapters API',
      items: [
        'using-adapters',
        'adapters-docs-list',
        'create-adapter-doc',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Development',
      items: [],
    },
    {
      type: 'category',
      label: 'Publishing',
      items: ['publishing'],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Join Us',
      items: ['community'],
      collapsed: false,
    },
  ],
};
