const { logger, chalk } = require("@statusfy/common");

const createServer = require("../server");
const generateConfig = require("./config/generate");

module.exports = async function start(sourceDir, cliOptions = {}) {
  process.env.NODE_ENV = "production";

  // Generate configuration
  const { nuxtConfig, siteConfig } = generateConfig(sourceDir, cliOptions);

  // Initialize the server
  await createServer(
    siteConfig,
    nuxtConfig,
    nuxtConfig.server.host,
    nuxtConfig.server.port
  );

  logger.warn(
    `The ${chalk.cyan("Server Rendered mode")} ${chalk.red(
      "is deprecated"
    )} and will be removed in Statusfy v1. Use Static Mode instead. More info at ${chalk.cyan(
      "https://git.io/JUPRI"
    )}.`
  );
};
