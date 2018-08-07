const path = require('path')
const merge = require('deepmerge')
const slugify = require('slugify')

const defaultConfig = require('./default')

module.exports = function generateConfig(sourceDir, cliOptions) {
  const nuxtConfig = require(path.join(__dirname, '../../nuxt.config.js'))
  const userConfig = require(path.join(sourceDir, 'config.js'))
  const siteConfig = merge(defaultConfig, userConfig)

  const siteName = (siteConfig.name || slugify(siteConfig.title, '_')).toLowerCase()

  // General
  nuxtConfig.dev = !(process.env.NODE_ENV === 'production')
  nuxtConfig.rootDir = path.join(__dirname, '..', '..')
  nuxtConfig.buildDir = path.join(sourceDir, '.statusfy')

  // Statusfy module configuration
  nuxtConfig.statusfy.host = cliOptions.host || process.env.HOST || '0.0.0.0'
  nuxtConfig.statusfy.port = cliOptions.port || process.env.PORT || 8080

  // Head Configuration
  nuxtConfig.head.title = siteConfig.title
  nuxtConfig.head.meta.push({ hid: 'description', name: 'description', content: siteConfig.description })
  nuxtConfig.head.titleTemplate = '%s | ' + siteConfig.title,

  // Generate Configuration
  nuxtConfig.generate.dir = path.join(sourceDir, cliOptions.outDir || 'dist')

  // nuxt-i18n module configuration
  const nuxti18nModuleConfig = nuxtConfig.modules.find(item => item[0] === 'nuxt-i18n')[1]
  // TODO: Update locale list
  nuxti18nModuleConfig.defaultLocale = siteConfig.defaultLocale
  nuxti18nModuleConfig.detectBrowserLanguage.cookieKey = `${siteName}.lang_redirected`
  nuxti18nModuleConfig.vueI18n.fallbackLocale = siteConfig.defaultLocale

  return nuxtConfig
}
