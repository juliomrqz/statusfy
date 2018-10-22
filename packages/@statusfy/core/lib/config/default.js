module.exports = {
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
