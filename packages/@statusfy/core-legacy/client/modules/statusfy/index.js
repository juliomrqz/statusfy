const fs = require("fs");
const defaultsDeep = require("lodash/defaultsDeep");

const { logger, fse, path } = require("@statusfy/common");
const createSitemap = require("../../../lib/content/sitemap");
const createFeeds = require("../../../lib/content/feeds");
const createCalendar = require("../../../lib/content/calendar");
const createServer = require("../../../server");
const buildContent = require("./build");

const copyPublicFiles = async (src, dest) => {
  if (src) {
    logger.debug(`Copying public files ${dest}`);

    try {
      await fse.copy(src, dest);
    } catch (error) {
      logger.error(`Couldn't copy public files ${dest}`);
      logger.error(error);
    }
  }
};

/** @type {import("@nuxt/types").Module} */
/* eslint-disable require-await */
const statusfyModule = async function Statusfy() {
  // Merge all option sources
  const statusfyOptions = this.options.statusfy;

  // Create language files
  statusfyOptions.locales.forEach(locale => {
    const localePath = path.resolve(
      __dirname,
      "../../",
      statusfyOptions.langDir,
      `${locale.code}.js`
    );
    let defaultLocaleContent = {};
    let userLocaleContent = {};

    // Default locale
    const defaultLocalePath = path.resolve(
      __dirname,
      "../../",
      "locales",
      `${locale.code}-default.json`
    );
    if (fs.existsSync(defaultLocalePath)) {
      defaultLocaleContent = require(defaultLocalePath);
    }

    // User locale
    const userLocalePath = path.join(
      statusfyOptions.sourceDir,
      "locales",
      `${locale.code}.json`
    );
    if (fs.existsSync(userLocalePath)) {
      userLocaleContent = require(userLocalePath);
    }

    // Crate locale file content
    const messages = JSON.stringify(
      defaultsDeep(userLocaleContent, defaultLocaleContent),
      null,
      2
    );
    const fileContent = `export default ${messages}`;

    fse.outputFileSync(localePath, fileContent);
  });

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js.tpl"),
    fileName: "statusfy.js",
    options: statusfyOptions
  });

  this.nuxt.hook("build:before", async builder => {
    const { isStatic } = builder.bundleBuilder.buildContext;

    if (isStatic) {
      this.nuxt.hook("build:done", async generator => {
        if (isStatic) {
          logger.debug("Open the server connection");

          statusfyOptions.siteConfig.build.isStatic = true;

          const server = await createServer(
            statusfyOptions.siteConfig,
            null,
            this.options.server.host,
            this.options.server.port,
            "/static/content"
          );

          this.nuxt.hook("generate:done", () => {
            logger.debug("Close the server connection");
            server.close();
          });
        }
      });
    }

    // Build dynamic content
    await buildContent(this, isStatic);
  });

  this.nuxt.hook("build:done", async generator => {
    await copyPublicFiles(
      statusfyOptions.publicFilesPath,
      path.join(this.options.buildDir, "dist", "client")
    );
  });

  this.nuxt.hook("generate:done", async generator => {
    await copyPublicFiles(
      statusfyOptions.publicFilesPath,
      this.options.generate.dir
    );

    /* Sitemap */
    const sitemap = await createSitemap(statusfyOptions.siteConfig);
    const xmlPath = path.join(this.options.generate.dir, "sitemap.xml");

    // Ensure no sitemap file exists
    await fse.remove(xmlPath);
    await fse.ensureFile(xmlPath);

    await fse.writeFile(xmlPath, sitemap);

    logger.success("Generated /sitemap.xml");

    /* Feeds */
    if (
      statusfyOptions.siteConfig.notifications &&
      statusfyOptions.siteConfig.notifications.feeds
    ) {
      // eslint-disable-next-line no-unused-vars
      for (const locale of statusfyOptions.locales) {
        const feeds = await createFeeds(
          statusfyOptions.siteConfig,
          locale.code
        );

        const rssPath = path.join(
          this.options.generate.dir,
          "feeds",
          `incidents.${locale.code}.xml`
        );
        const atomPath = path.join(
          this.options.generate.dir,
          "feeds",
          `incidents.${locale.code}.atom`
        );

        // Ensure no feed file exists
        await fse.remove(rssPath);
        await fse.ensureFile(rssPath);
        await fse.remove(atomPath);
        await fse.ensureFile(atomPath);

        await fse.writeFile(rssPath, feeds.rss());
        await fse.writeFile(atomPath, feeds.atom());

        logger.success(`Generated /feeds/incidents.${locale.code}.xml`);
        logger.success(`Generated /feeds/incidents.${locale.code}.atom`);
      }
    }

    /* Calendars */
    if (
      statusfyOptions.siteConfig.notifications &&
      statusfyOptions.siteConfig.notifications.icalendar
    ) {
      // eslint-disable-next-line no-unused-vars
      for (const locale of statusfyOptions.locales) {
        const lang = locale.code;
        const calPath = path.join(
          this.options.generate.dir,
          "calendars",
          `scheduled.${locale.code}.ics`
        );

        const content = await createCalendar(statusfyOptions.siteConfig, lang);

        // Ensure no calendar file exists
        await fse.remove(calPath);
        await fse.ensureFile(calPath);

        await fse.writeFile(calPath, content);

        logger.success(`Generated /calendars/scheduled.${locale.code}.ics`);
      }
    }
  });
};

module.exports = statusfyModule;
module.exports.meta = require("../../../package.json");
