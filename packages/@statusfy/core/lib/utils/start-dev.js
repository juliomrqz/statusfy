const portfinder = require("portfinder");
const bs = require("browser-sync").create();

const { logger, path } = require("@statusfy/common");
const createServer = require("../../server");
const generateConfig = require("../config/generate");

/* eslint-disable require-await */
const start = async () => {
  process.env.NODE_ENV = "development";
  const sourceDir = process.env.STATUSFY_SOURCE_DIR;
  const cliOptions = JSON.parse(process.env.STATUSFY_CLI_OPTIONS);

  // Generate configuration
  const { nuxtConfig, siteConfig } = generateConfig(sourceDir, cliOptions);
  nuxtConfig.mode = cliOptions.ssr ? "universal" : "spa";
  delete nuxtConfig.build.analyze;

  portfinder
    .getPortPromise()
    .then(async port => {
      const serverPort = nuxtConfig.server.port;

      // Update server port
      nuxtConfig.server.port = port;

      // Initialize the server
      await createServer(
        siteConfig,
        nuxtConfig,
        nuxtConfig.server.host,
        nuxtConfig.server.port
      );

      // Create borwser-sync server
      bs.init({
        port: serverPort,
        proxy: `${nuxtConfig.server.host}:${nuxtConfig.server.port}`,
        open: false
      });

      bs.watch(path.join(sourceDir, siteConfig.content.dir, "**/*.md")).on(
        "change",
        bs.reload
      );
    })
    .catch(err => {
      logger.error(err);
    });
};

start();
