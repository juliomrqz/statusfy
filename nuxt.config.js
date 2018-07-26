const pkg = require('./package')

module.exports = {
  srcDir: './client/',
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
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
    '~/assets/css/tailwind.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // https://nuxt-community.github.io/nuxt-i18n/
    ['nuxt-i18n', {
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
    ** Webpack plugins
    */
    plugins: [
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
    },
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
    // See https://github.com/nuxt-community/axios-module#options
  }
}
