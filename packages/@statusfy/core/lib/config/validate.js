const { chalk, validator } = require("@statusfy/common");

const validFrontMatterFormats = ["yaml", "yml", "toml", "json"];

module.exports = function validateConfig(config) {
  const errors = [];

  // Check Front Matter Format
  const frontMatterFormat = config.content.frontMatterFormat;
  if (frontMatterFormat) {
    if (!validFrontMatterFormats.includes(frontMatterFormat)) {
      errors.push(
        `The default Front Matter Format (${chalk.yellow(
          "content.frontMatterFormat"
        )}) is invalid. These are the valid formats: ${chalk.cyan(
          validFrontMatterFormats.join(", ")
        )}.`
      );
    }
  }

  // Check base url
  if (config.baseUrl && config.baseUrl !== "/") {
    const isValidUrl = validator.isURL(config.baseUrl);

    if (!isValidUrl) {
      errors.push(
        `The Base URL (${chalk.yellow("baseUrl")}) is invalid: ${
          config.baseUrl
        }.\nValid Example: ${chalk.cyan("https://status.yourbaseurl.com")}.`
      );
    }

    // Make sure a trailing slash (at the end of the URL) is not defined
    config.baseUrl = config.baseUrl.replace(/\/$/, "");
  }

  // Check defaultLocale
  const localesCode = config.locales.map(locale => locale.code);
  if (!localesCode.includes(config.defaultLocale)) {
    errors.push(
      `The Default Locale (${chalk.yellow(
        "defaultLocale"
      )}) value must be included in the locales list. Current value ${chalk.cyan(
        config.defaultLocale
      )}, defined codes: ${chalk.cyan(localesCode.join(", "))}.`
    );
  }

  // Send errors
  return errors;
};
