const { path } = require('@statusfy/common')

const pkg = require('./package')

const langDir = 'locales/'
const mainColor = '#000000'
const iconSizes = [16, 120, 144, 152, 192, 384, 512]
const modulesDir = [
  path.join(__dirname, 'node_modules')
]

// Hack: allow to execute using lerna/yarn workspaces on testing
if (process.env.STATUSFY_LERNA) {
  modulesDir.push(path.relative(__dirname, path.join(__dirname, '..', '..', '..', 'node_modules')))
}

module.exports = {
  srcDir: path.join(__dirname, './client/'),
  modulesDir,
  mode: 'universal',
  /*
  ** Environment variables
  */
  env: {
    isDev: process.env.NODE_ENV !== 'production'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'generator', content: 'Statusfy' }
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
    '~assets/css/tailwind.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/vue-svgicon'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '~/modules/statusfy',
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // https://nuxt-community.github.io/nuxt-i18n/
    ['nuxt-i18n', {
      locales: [ ],
      defaultLocale: 'en',
      lazy: true,
      langDir,
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'statusfy.lang_redirected'
      },
      vueI18n: {
        fallbackLocale: 'en',
        silentTranslationWarn: process.env.NODE_ENV === 'production'
      }
    }],
    // Doc: https://pwa.nuxtjs.org/
    ['@nuxtjs/pwa', {
      workbox: true,
      manifest: true
    }]
  ],
  /*
  ** Build configuration
  */
  build: {
    publicPath: '/static/',
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
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
    ** Webpack plugins
    */
    plugins: [
      /* eslint-disable no-new-require, new-cap */
      new require('stylelint-webpack-plugin')({
        files: ['client/**/*.vue']
      })
    ],
    /*
    ** Webpack bundle analyzer
    */
    analyze: process.env.NODE_ENV !== 'production',
    /*
    ** Router
    */
    router: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'exact',
      scrollBehavior: (to, from, savedPosition) => {
        return { x: 0, y: 0 }
      }
    }
  },
  /*
   ** Generate Configuration
   */
  generate: {
    subFolders: false,
    fallback: '404.html'
  },
  // Modules Configurations
  /*
   ** Axios module configuration
   */
  axios: {
    browserBaseURL: '/'
  },
  /*
   ** Statusfy module configuration
   */
  statusfy: {
    langDir,
    assets: {
      // Prefer absolute path name
      mainLogo: path.join(__dirname, 'client', 'assets/img/logo.svg')
    },
    iconSizes
  },
  // PWA
  manifest: {
    publicPath: '/static/',
    name: pkg.name,
    short_name: pkg.name,
    lang: 'en',
    start_url: '/?standalone=true&utm_source=web_app&utm_medium=pwa',
    version: pkg.version,
    description: pkg.description
  },
  meta: {
    charset: 'utf-8',
    mobileApp: false,
    mobileAppIOS: false,
    theme_color: mainColor,
    ogTitle: false,
    ogDescription: false,
    author: 'Statusfy'
  },
  workbox: {
    publicPath: '/static/',
    offlinePage: '/offline',
    _runtimeCaching: [
      {
        urlPattern: '/static/(?!content).*$',
        handler: 'cacheFirst',
        method: 'GET'
      }
    ],
    runtimeCaching: [
      {
        urlPattern: '(/static/content)?/api/v1/.*',
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
  icon: {
    iconSrc: path.join(__dirname, 'client/static/icon.png'),
    sizes: iconSizes
  }
}
