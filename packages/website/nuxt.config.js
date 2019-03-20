const path = require('path')

import BlogIndex from './content/blog'
import markdown from './webpack/markdown'
const pkg = require('./package')

const buildCode = `${pkg.version}-${(
  process.env.COMMIT_REF || String(new Date().getTime())
).substring(0, 7)}`
const title = 'Statusfy'
const description = 'A marvelous open source Status Page system'
const mainColor = '#3e4e88'
const secondColor = '#eff0f4'
const baseHost = 'https://statusfy.co'
const twitterUserEn = 'BazziteTech'
const twitterUserEs = 'BazziteEs'

module.exports = {
  mode: 'universal',
  modulesDir: [
    path.join(__dirname, 'node_modules'),
    path.join(__dirname, '..', '..', 'node_modules')
  ],
  env: {
    mainColor,
    secondColor,
    baseHost,
    twitterUserEn,
    twitterUserEs
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s | Statusfy',
    title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { name: 'apple-mobile-web-app-status-bar-style', content: mainColor },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'msapplication-navbutton-color', content: mainColor }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: true },
      { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: mainColor },

  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/dracula-prism.css',
    'github-markdown-css/github-markdown.css',
    '~/assets/css/tailwind.css',
    'animate.css/source/_base.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/statusfy-blog.js',
    '~/plugins/statusfy-global-components.js',
    '~/plugins/axios.js',
    '~/plugins/vue-disqus',
    '~/plugins/vue-lazyload.js',
    '~/plugins/vue-social-sharing.js',
    '~/plugins/vue-svgicon.js',
    '~/plugins/vue-scrollto.client.js',
    '~/plugins/web-font-loader.client.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '~/modules/statusfy',
    // Doc: https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/analytics-module#usage
    '@nuxtjs/google-analytics',
    // Doc: https://github.com/nuxt-community/sitemap-module
    '@nuxtjs/sitemap',
    // Doc: https://www.bazzite.com/docs/nuxt-netlify/
    '@bazzite/nuxt-netlify',
    // Doc: https://nuxt-community.github.io/nuxt-i18n/
    [
      'nuxt-i18n',
      {
        seo: false,
        parsePages: false,
        baseUrl: baseHost,
        locales: [
          { code: 'en', iso: 'en-US', name: 'English', file: 'en.js' },
          { code: 'es', iso: 'es-ES', name: 'Español', file: 'es.js' }
        ],
        defaultLocale: 'en',
        lazy: true,
        langDir: './locales/',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'statusfy.lang_redirected'
        },
        vueI18n: {
          fallbackLocale: 'en'
        }
      }
    ],
  ],

  /*
  ** Babel configuration
  */
  babel: {
    plugins: ['@babel/transform-runtime']
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      // Markdown
      config.module.rules.push({
        test: /\.md$/,
        loader: path.resolve(__dirname, './webpack/markdown-loader.js'),
        include: path.resolve(__dirname, './content'),
        options: {
          markdown
        }
      })
    },
  },
  /*
    ** Router
    */
  router: {
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact',
    scrollBehavior: function () {
      return { x: 0, y: 0 }
    }
  },
  /*
   ** Generate Configuration
   */
  generate: {
    fallback: '404.html',
    routes: async () => {
      const generateRoutes = async lang => {
        const prefix = lang === 'es' ? '/es' : ''
        return BlogIndex.articles.map(slug => `${prefix}/blog/${slug}`)
      }

      const routesEn = await generateRoutes('en')
      const routesEs = await generateRoutes('es')

      return [...routesEn, ...routesEs]
    }
  },
  // Modules Configurations
  /*
   ** PWA module configuration
   */
  meta: {
    mobileApp: false,
    mobileAppIOS: false,
    name: title,
    author: 'Bazzite',
    description,
    theme_color: mainColor,
    ogHost: baseHost,
    twitterCard: 'summary_large_image',
    twitterSite: `@${twitterUserEn}`,
    twitterCreator: `@${twitterUserEn}`,
    ogDescription: false,
    ogTitle: false
  },
  manifest: {
    name: title,
    short_name: title,
    description,
    start_url: '/blog?standalone=true&utm_source=web_app&utm_medium=pwa',
    display: 'standalone',
    background_color: secondColor,
    theme_color: mainColor,
    version: pkg.version
  },
  workbox: {
    offlinePage: '/offline'
  },
  /*
   ** Google Analytics configuration
   */
  'google-analytics': {
    id: process.env.GA_TRACKING_ID || 'UA-XXXXXXXXX-Y'
  },
  /*
   ** Sitemap configuration
   */
  sitemap: {
    path: '/sitemap.xml',
    hostname: baseHost,
    cacheTime: 604800, // 7 days
    gzip: true,
    generate: true,
    routes: async () => {
      const websitePages = ['', 'support', 'blog']
      const routesEn = []
      const routesEs = []

      // Generate Website routes
      websitePages.forEach(page => {
        routesEn.push({
          url: `/${page}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmodISO: new Date().toISOString()
        })
      })

      // Generate from Blog Posts
      try {
        BlogIndex.articles.map(slug => {
          routesEn.push({
            url: `/blog/${slug}`,
            changefreq: 'weekly',
            priority: 0.7,
            lastmodISO: new Date().toISOString()
          })
        })
      } catch (error) {
        throw new Error(error);
      }

      // Generate Spanish Version
      routesEn.forEach(route => {
        routesEs.push({
          ...route,
          url: `/es${route.url === '/' ? '' : route.url}`,
        })
      })

      return [...routesEn, ...routesEs]
    }
  },
  netlify: {
    redirects: [
      {
        from: 'https://statusfy-website-b61d39.netlify.com/*',
        to: 'https://statusfy.co/:splat',
        force: true
      },
      {
        from: 'https://www.statusfy.co/*',
        to: 'http://statusfy.co/:splat',
        force: true
      }
    ],
    headers: {
      '/*': [
        'X-UA-Compatible: ie=edge',
        'Access-Control-Allow-Origin: *',
        `X-Build: ${buildCode}`
      ],
      '/robots.txt': ['Cache-Control: public, max-age=86400'],
      '/sitemap.xml': ['Cache-Control: public, max-age=3600, s-maxage=14400']
    }
  }
}
