const { join } = require('path')
const fse = require('fs-extra')

// Nuxt bug: Fix the home page file of each locale
exports.fixHomePages = (siteConfig, destDir) => {
  siteConfig.locales.forEach(locale => {
    if (locale.code !== siteConfig.defaultLocale) {
      const from = join(destDir, locale.code, '.html')
      const to = join(destDir, `${locale.code}.html`)

      fse.moveSync(from, to)
    }
  })
}
