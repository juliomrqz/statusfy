module.exports = {
  title: 'Statusfy Demo',
  description: 'A marvelous open source Status Page system',
  defaultLocale: 'en',
  locales: [
    { code: 'en', iso: 'en-US', name: 'English' },
    { code: 'es', iso: 'es-ES', name: 'Español' }
  ],
  contentConfig: {
    systems: [
      'cdn',
      'conversions',
      'site-delivery',
      'api'
    ]
  }
}
