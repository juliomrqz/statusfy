module.exports = {
  title: 'Title',
  description: 'Description',
  baseUrl: 'https://demo.statusfy.co',
  analytics: {
    ga: 'UA-XXXXXXXXX-Y'
  },
  defaultLocale: 'en',
  locales: [
    { code: 'en', iso: 'en-US', name: 'English' },
    { code: 'es', iso: 'es-ES', name: 'Español' }
  ],
  content: {
    frontMatterFormat: 'yaml',
    systems: [
      'cdn',
      'conversions',
      'site-delivery',
      'api'
    ]
  },
  head: {
    link: [
      { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3e4e88' }
    ]
  }
}
