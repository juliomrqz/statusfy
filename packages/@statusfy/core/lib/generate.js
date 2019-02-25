const { Nuxt, Builder, Generator } = require("nuxt");

const { logger, path } = require("@statusfy/common");
const generateConfig = require("./config/generate");
const { fixHomePages } = require("./utils/fixes");

/* eslint-disable require-await */
module.exports = async (sourceDir, cliOptions = {}) => {
  process.env.NODE_ENV = "production";

  const outDir = cliOptions.outDir || path.join(sourceDir, "dist");
  const { nuxtConfig, siteConfig } = generateConfig(sourceDir, cliOptions);
  nuxtConfig.generate.dir = outDir;

  if (!cliOptions.analyze) {
    delete nuxtConfig.build.analyze;
  }

  const nuxt = new Nuxt(nuxtConfig);
  const builder = new Builder(nuxt);
  const generator = new Generator(nuxt, builder);

  const generateOptions = {
    init: true,
    build: true
  };

  try {
    await generator.generate(generateOptions);

    fixHomePages(siteConfig, outDir);
    process.exit(0);
  } catch (error) {
    logger.fatal(error);
  }
};
