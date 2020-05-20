// Based on https://github.com/nuxt/nuxt.js/blob/dev/packages/cli/src/commands/build.js
const { Nuxt, Builder } = require("nuxt")

import { logger } from "@statusfy/common"
import { generateConfig } from "@statusfy/config/src/generate"

export const build = async function build(sourceDir: string, cliOptions: { [key: string]: string | boolean } = {}) {
  process.env.NODE_ENV = "production";

  const { nuxtConfig } = generateConfig(sourceDir, cliOptions);

  if (!cliOptions.analyze) {
    delete nuxtConfig.build.analyze;
  }

  const nuxt = new Nuxt(nuxtConfig);
  const builder = new Builder(nuxt);

  // Setup hooks
  nuxt.hook("error", err => logger.fatal(err));

  // Close function
  const close = () => {
    // In analyze mode wait for plugin
    // emitting assets and opening browser
    if (typeof nuxtConfig.build.analyze === "object") {
      return;
    }

    process.exit(0);
  };

  try {
    await builder.build();
    close();
  } catch (error) {
    logger.fatal(error);
  }
};
