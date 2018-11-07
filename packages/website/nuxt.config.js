import axios from 'axios'
import { path } from '@statusfy/common'
const pkg = require('./package')

const title = 'Statusfy'
const description = 'A marvelous open source Status Page system'
const mainColor = '#3e4e88'
const secondColor = '#eff0f4'
const baseHost = 'https://statusfy.co'
const twitterUserEn = 'BazziteTech'
const twitterUserEs = 'BazziteEs'
const apiBaseURL = process.env.API_URL || 'http://127.0.0.1:8000/api/v1/'
const generateRouteBaseURL =
  process.env.GENRATE_ROUTES_URL || `${apiBaseURL}blog?tags=statusfy`

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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: mainColor },

  /*
   ** Global CSS
   */
  css: [
    'github-markdown-css/github-markdown.css',
    '~/assets/css/tailwind.css',
    'animate.css/source/_base.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'prismjs/themes/prism-tomorrow.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/vue-disqus',
    '~/plugins/vue-lazyload.js',
    '~/plugins/vue-social-sharing.js',
    '~/plugins/vue-svgicon.js',
    {
      src: '~/plugins/vue-scrollto.js',
      ssr: false
    },
    {
      src: '~/plugins/web-font-loader.js',
      ssr: false
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/analytics-module#usage
    '@nuxtjs/google-analytics',
    // Doc: https://github.com/nuxt-community/sitemap-module
    '@nuxtjs/sitemap',
    // https://nuxt-community.github.io/nuxt-i18n/
    [
      'nuxt-i18n',
      {
        parsePages: false,
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
    ]
  ],
  /*
   ** Build configuration
   */
  build: {
    publicPath: '/static/',
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
    },
    /*
     ** Router
     */
    router: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'exact'
    }
  },
  /*
   ** Generate Configuration
   */
  generate: {
    subFolders: false,
    fallback: '404.html',
    routes: async () => {
      const generateRoutes = async lang => {
        const prefix = lang === 'es' ? '/es' : ''

        const postsEn = await axios.get(generateRouteBaseURL, {
          headers: {
            'Accept-Language': lang
          }
        })

        return postsEn.data.results.map(post => {
          return {
            route: `${prefix}/blog/${post.slug}`,
            payload: post
          }
        })
      }

      const routesEn = await generateRoutes('en')
      const routesEs = await generateRoutes('es')

      return [...routesEn, ...routesEs]
    }
  },
  // Modules Configurations
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: apiBaseURL
  },
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
    twitterCreator: `@${twitterUserEn}`
  },
  manifest: {
    name: title,
    short_name: title,
    description,
    start_url: null,
    display: null,
    background_color: secondColor,
    theme_color: mainColor,
    version: pkg.version
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
    cacheTime: 1000 * 60 * 15,
    gzip: false,
    generate: true
  }
}
