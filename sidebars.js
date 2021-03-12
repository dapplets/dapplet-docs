module.exports = {
  someSidebar: [
    'introduction',
    'installation',
    'getting-started',
    {
      type: 'category',
      label: 'Next steps',
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
      items: ['doc1', 'doc2', 'doc3', 'mdx'],
    },
    {
      type: 'category',
      label: 'Development',
      items: [],
    },
    {
      type: 'category',
      label: 'Publishing',
      items: [],
    },
    {
      type: 'category',
      label: 'Join Us',
      items: ['community'],
      collapsed: false,
    },
  ],
};
