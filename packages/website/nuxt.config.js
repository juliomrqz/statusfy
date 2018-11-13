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

const getPosts = async (lang = 'en') => {
  const posts = await axios.get(generateRouteBaseURL, {
    headers: {
      'Accept-Language': lang
    }
  })

  return posts
}

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
  },
  /*
    ** Router
    */
  router: {
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact',
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
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

        const postsEn = await getPosts(lang)

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
    twitterCreator: `@${twitterUserEn}`,
    ogDescription: false,
    ogTitle: false,
    ogImage: false
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
    publicPath: '/static/',
    offlinePage: '/offline',
    runtimeCaching: [
      {
        urlPattern: `${apiBaseURL}blog.*`,
        strategyOptions: {
          cacheName: 'api',
          cacheExpiration: {
            maxEntries: 10,
            maxAgeSeconds: 300
          }
        }
      }
    ]
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
        const posts = await getPosts()

        posts.data.results.forEach(post => {
          routesEn.push({
            url: `/blog/${post.slug}`,
            changefreq: 'daily',
            priority: 0.7,
            lastmodISO: post.created
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
  }
}
