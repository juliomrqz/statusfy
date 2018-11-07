module.exports = {
  title: 'Statusfy Demo',
  description: 'A marvelous open source Status Page system',
  baseUrl: 'https://demo.statusfy.co',
  analytics: {
    ga: process.env.GA_TRACKING_ID || 'UA-XXXXXXXXX-Y',
    mixpanel: process.env.MIXPANEL_TOKEN || 'mixpanel-token',
    facebook: process.env.FACEBOOK_TOKEN || 'facebook-token',
    segment: process.env.SEGMENT_TOKEN || 'segment-token'
  },
  defaultLocale: 'en',
  locales: [
    { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
    { code: 'es', iso: 'es-ES', name: 'Español', file: 'es.json' }
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
