const { logger } = require("@statusfy/common");
const createApp = require("./app");

/**
 * Create the main Server
 *
 * @param {Object} siteConfig - User Site Configuration.
 * @param {import("@nuxt/types").Configuration} nuxtConfig - Nuxt Configuration.
 * @param {string} host - Server Host.
 * @param {string} port - Server Port.
 * @param {string} [apiPrefix=""] - API prefix.
 */
module.exports = async function createServer(
  siteConfig,
  nuxtConfig,
  host,
  port,
  apiPrefix = ""
) {
  const app = await createApp(siteConfig, nuxtConfig, host, port, apiPrefix);

  return app.listen(port, host, () => {
    // Listen the server
    logger.info(`Server listening on http://${host}:${port}`);
  });
};
