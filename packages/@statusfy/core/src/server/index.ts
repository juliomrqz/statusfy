import { logger } from "@statusfy/common/src";
import { createApp } from "./app";

import { ConfigFile, NuxtConfiguration } from "@statusfy/config/src/interfaces";

/**
 * Create the main Server
 *
 * @param {Object} siteConfig - User Site Configuration.
 * @param {import("@nuxt/types").Configuration} nuxtConfig - Nuxt Configuration.
 * @param {string} host - Server Host.
 * @param {string} port - Server Port.
 * @param {string} [apiPrefix=""] - API prefix.
 */
export const createServer = async function createServer(siteConfig: ConfigFile, nuxtConfig: NuxtConfiguration, host: string, port: number, apiPrefix = "") {
  const app = await createApp(siteConfig, nuxtConfig, host, port, apiPrefix);

  return app.listen(port, host, () => {
    // Listen the server
    logger.info(`Server listening on http://${host}:${port}`);
  });
};
