module.exports = {
  title: 'Statusfy Demo',
  description: 'A marvelous open source Status Page system',
  defaultLocale: 'en',
  locales: [
    { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
    { code: 'es', iso: 'es-ES', name: 'Español', file: 'en.json' }
  ],
  contentConfig: {
    frontMatterFormat: 'yaml',
    systems: [
      'cdn',
      'conversions',
      'site-delivery',
      'api'
    ]
  }
}
