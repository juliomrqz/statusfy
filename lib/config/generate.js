const path = require('path')

const loadConfig = require('./load')

module.exports = function generateConfig (sourceDir, cliOptions) {
  const nuxtConfig = require(path.join(__dirname, '../../nuxt.config.js'))
  const siteConfig = loadConfig(sourceDir)

  // General
  nuxtConfig.dev = !(process.env.NODE_ENV === 'production')
  nuxtConfig.rootDir = path.join(__dirname, '..', '..')
  nuxtConfig.buildDir = path.join(sourceDir, '.statusfy')

  // Statusfy module configuration
  nuxtConfig.statusfy.host = cliOptions.host || process.env.HOST || '127.0.0.1'
  nuxtConfig.statusfy.port = cliOptions.port || process.env.PORT || 3000
  nuxtConfig.statusfy.locales = siteConfig.locales
  nuxtConfig.statusfy.sourceDir = sourceDir

  // Head Configuration
  nuxtConfig.head.title = siteConfig.title
  nuxtConfig.head.meta.push({ hid: 'description', name: 'description', content: siteConfig.description })
  nuxtConfig.head.titleTemplate = `%s | ${siteConfig.title}`

  // Generate Configuration
  nuxtConfig.generate.dir = path.join(sourceDir, cliOptions.outDir || 'dist')

  // nuxt-i18n module configuration
  const nuxti18nModuleConfig = nuxtConfig.modules.find(item => item[0] === 'nuxt-i18n')[1]
  // Update the locales list
  siteConfig.locales.forEach(locale => {
    nuxti18nModuleConfig.locales.push({
      ...locale,
      file: `${locale.code}.js`
    })
  })
  nuxti18nModuleConfig.defaultLocale = siteConfig.defaultLocale
  nuxti18nModuleConfig.detectBrowserLanguage.cookieKey = `${siteConfig.name}.lang_redirected`
  nuxti18nModuleConfig.vueI18n.fallbackLocale = siteConfig.defaultLocale
  if (siteConfig.baseUrl) {
    nuxti18nModuleConfig.baseUrl = siteConfig.baseUrl === '/' ? null : siteConfig.baseUrl
  }

  return nuxtConfig
}
