module.exports = {
  baseUrl: '/',
  defaultLocale: 'en',
  locales: [
    { code: 'en', iso: 'en-US', name: 'English' }
  ],
  contentConfig: {
    dir: 'content',
    systems: [
      'api',
      'cdn',
      'dns',
      'site-delivery'
    ]
  }
}
