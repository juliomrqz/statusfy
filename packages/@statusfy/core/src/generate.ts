const { Nuxt, Builder, Generator } = require("nuxt");

import { logger, path } from "@statusfy/common/src";
import { generateConfig } from "@statusfy/config/src/generate";

export const generate = async (sourceDir, cliOptions: { [key: string]: string | boolean } = {}) => {
  process.env.NODE_ENV = "production";

  const outDir = `${cliOptions.outDir}` || path.join(sourceDir, "dist");
  const { nuxtConfig } = generateConfig(sourceDir, cliOptions);
  nuxtConfig.generate = nuxtConfig.generate || {}
  nuxtConfig.generate.dir = outDir;

  if (!cliOptions.analyze) {
    delete nuxtConfig.build.analyze;
  }

  const nuxt = new Nuxt(nuxtConfig);
  const builder = new Builder(nuxt);
  const generator = new Generator(nuxt, builder);

  const generateOptions = { init: true, build: true };

  try {
    await generator.generate(generateOptions);
    process.exit(0);
  } catch (error) {
    logger.fatal(error);
  }
};
