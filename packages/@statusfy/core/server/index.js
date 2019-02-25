const { logger } = require("@statusfy/common");
const createApp = require("./app");

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
    logger.info("Server listening on http://" + host + ":" + port);
  });
};
