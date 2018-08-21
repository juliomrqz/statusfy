const { join, relative } = require('path')
const fse = require('fs-extra')
const fg = require('fast-glob')

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

// Fixes for @nuxt/pwa
exports.fixNuxtPwa = (nuxtConfig, destDir) => {
  // Fix location of Workbox
  const src = join(nuxtConfig.buildDir, 'dist')
  const workboxFile = fg.sync([`${src}/workbox.*.js`])[0]
  const fileName = relative(src, workboxFile)

  fse.moveSync(
    workboxFile,
    join(destDir, fileName)
  )
}
