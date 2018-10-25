module.exports = {
  title: 'Statusfy Demo',
  description: 'A marvelous open source Status Page system',
  baseUrl: '/',
  defaultLocale: 'en',
  locales: [
    { code: 'en', iso: 'en-US', name: 'English' }
  ],
  content: {
    dir: 'content',
    systems: [
      'api',
      'cdn',
      'dns',
      'site-delivery'
    ]
  },
  build: {
    isStatic: false
  },
  serviceWorker: true,
  manifest: true
}
