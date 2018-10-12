const url = require('url')
const { chalk, validator } = require('@statusfy/shared-utils')

const validFrontMatterFormats = ['yaml', 'yml', 'toml', 'json']

module.exports = function validateConfig (config) {
  let errors = []

  // Check Front Matter Format
  const frontMatterFormat = config.content.frontMatterFormat
  if (frontMatterFormat) {
    if (!validFrontMatterFormats.includes(frontMatterFormat)) {
      errors.push(`The default Front Matter Format (${chalk.yellow('content.frontMatterFormat')}) is invalid. These are the valid formats: ${chalk.cyan(validFrontMatterFormats.join(', '))}.`)
    }
  }

  // Check base url
  if (config.baseUrl && config.baseUrl !== '/') {
    const validBaseUrl = validator.isURL(config.baseUrl, {
      protocols: ['http', 'https'],
      require_tld: true,
      require_protocol: true,
      require_host: true,
      require_valid_protocol: true
    })

    let isValid = validBaseUrl

    if (isValid) {
      isValid = url.parse(config.baseUrl).pathname === '/'
    }

    if (!isValid) {
      errors.push(`The Base URL (${chalk.yellow('baseUrl')}) is invalid. Example: ${chalk.cyan('https://status.yourbaseurl.com')}.`)
    }

    // Make sure a trailing slash (at the end of the URL) is not defined
    config.baseUrl = config.baseUrl.replace(/\/$/, '')

    // Check defaultLocale
    const localesCode = config.locales.map(locale => locale.code)
    if (!localesCode.includes(config.defaultLocale)) {
      errors.push(`The Default Locale (${chalk.yellow('defaultLocale')}) value must be included in the locales list. Current value ${chalk.cyan(config.defaultLocale)}, defined codes: ${chalk.cyan(localesCode.join(', '))}.`)
    }

    // Send errors
    return errors
  }
}
