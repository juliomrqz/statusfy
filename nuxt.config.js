const path = require('path')

const pkg = require('./package')

const langDir = 'locales/'

module.exports = {
  srcDir: path.join(__dirname, './client/'),
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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/tailwind.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/vue-fontawesome'
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
    analyze: {
      analyzerMode: 'static'
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
    minify: {
      removeOptionalTags: false
    },
    subFolders: false
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
    langDir
  }
}
