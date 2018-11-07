const fs = require('fs')
const defaultsDeep = require('lodash/defaultsDeep')
const { esm, logger, style, path } = require('@statusfy/common')

const loadConfig = require('./load')
const { colors } = style

module.exports = function generateConfig (sourceDir, cliOptions) {
  const nuxtConfig = Object.assign({}, esm(path.join(__dirname, '../../nuxt.config.js')))
  const loadedConfig = loadConfig(sourceDir)

  const siteConfig = loadedConfig.config
  const siteConfigErrors = loadedConfig.errors

  try {
    if (siteConfigErrors && siteConfigErrors.length > 0) {
      logger.fatal('Your site configuration is invalid', siteConfigErrors.join('\n'))
      process.exit(1)
    }
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }

  // General
  nuxtConfig.dev = !(process.env.NODE_ENV === 'production')
  nuxtConfig.rootDir = path.join(__dirname, '..', '..')
  nuxtConfig.buildDir = path.join(sourceDir, '.statusfy')
  nuxtConfig.modulesDir.push(path.join(sourceDir, 'node_modules'))
  nuxtConfig.modulesDir = [...new Set(nuxtConfig.modulesDir)]

  // Style
  nuxtConfig.loading.color = colors.black
  nuxtConfig.meta.theme_color = colors.black

  // Statusfy module configuration
  nuxtConfig.server = {
    host: cliOptions.host || process.env.HOST || '127.0.0.1',
    port: cliOptions.port || process.env.PORT || 3000
  }

  // Statusfy module configuration
  nuxtConfig.statusfy.locales = siteConfig.locales
  nuxtConfig.statusfy.sourceDir = sourceDir
  nuxtConfig.statusfy.siteConfig = siteConfig
  nuxtConfig.statusfy.publicFilesPath = fs.existsSync(path.join(sourceDir, 'public'))
    ? path.join(sourceDir, 'public')
    : null

  const validLogoExtension = ['png', 'jpg', 'jpeg', 'gif', 'svg']

  for (let ext of validLogoExtension) {
    const filePath = path.join(sourceDir, 'assets', 'img', `logo.${ext}`)
    if (fs.existsSync(filePath)) {
      nuxtConfig.statusfy.assets.mainLogo = filePath
      break
    }
  }

  // Head Configuration
  nuxtConfig.head = { ...siteConfig.head, ...nuxtConfig.head }
  nuxtConfig.head.title = siteConfig.title
  nuxtConfig.head.meta.push({ hid: 'description', name: 'description', content: siteConfig.description })
  nuxtConfig.head.titleTemplate = `%s | ${siteConfig.title}`
  nuxtConfig.head = defaultsDeep(siteConfig.head, nuxtConfig.head)

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

  // PWA Module
  if (siteConfig.serviceWorker === true) {
    nuxtConfig.workbox.cacheId = siteConfig.name
    nuxtConfig.workbox.globDirectory = path.resolve(nuxtConfig.buildDir, 'dist', 'client')

    nuxtConfig.workbox.runtimeCaching.forEach(runtime => {
      if (runtime.strategyOptions) {
        runtime.strategyOptions.cacheName = `${siteConfig.name}_${runtime.strategyOptions.cacheName}`
      }
    })
  } else {
    const nuxtiPwaModuleConfig = nuxtConfig.modules.find(item => item[0] === '@nuxtjs/pwa')[1]
    nuxtiPwaModuleConfig.workbox = false

    delete nuxtConfig.workbox
  }

  if (siteConfig.manifest === true) {
    nuxtConfig.manifest.name = siteConfig.title
    nuxtConfig.manifest.short_name = siteConfig.title
    nuxtConfig.manifest.description = siteConfig.description
    nuxtConfig.manifest.lang = siteConfig.defaultLocale
  } else {
    const nuxtiPwaModuleConfig = nuxtConfig.modules.find(item => item[0] === '@nuxtjs/pwa')[1]
    nuxtiPwaModuleConfig.manifest = false

    delete nuxtConfig.manifest
  }

  nuxtConfig.meta.ogHost = siteConfig.baseUrl

  const customIconPath = path.join(sourceDir, 'assets', 'icon.png')
  if (fs.existsSync(customIconPath)) {
    nuxtConfig.icon.iconSrc = customIconPath
  }

  // Google Analytics Module
  if (siteConfig.ga && !nuxtConfig.dev) {
    // Doc: https://github.com/nuxt-community/analytics-module#usage
    nuxtConfig.modules.push('@nuxtjs/google-analytics')

    // Google Analytics
    nuxtConfig['google-analytics'] = {
      id: siteConfig.ga
    }
  }

  // Custom Styles
  const validStylesExtension = ['css', 'less', 'sass', 'scss', 'styl', 'stylus']
  const stylesPath = []

  for (let ext of validStylesExtension) {
    const filePath = path.join(sourceDir, 'theme', 'default', `style.${ext}`)

    if (fs.existsSync(filePath)) {
      stylesPath.push(filePath)
    }
  }

  if (stylesPath.length > 0) {
    logger.info('Loading Styles from: ', stylesPath.map(p => path.relative(sourceDir, p)).join('\n'))

    nuxtConfig.css.push(...stylesPath)
  }

  return {
    nuxtConfig,
    siteConfig
  }
}
