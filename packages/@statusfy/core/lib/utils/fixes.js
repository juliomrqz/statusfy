const { fse, path } = require('@statusfy/common')

// Nuxt bug: Fix the home page file of each locale
exports.fixHomePages = (siteConfig, destDir) => {
  siteConfig.locales.forEach(locale => {
    if (locale.code !== siteConfig.defaultLocale) {
      const from = path.join(destDir, locale.code, '.html')
      const to = path.join(destDir, `${locale.code}.html`)

      fse.moveSync(from, to)
    }
  })
}
