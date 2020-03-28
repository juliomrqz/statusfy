import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import helmet from "helmet"
const { Nuxt } = require("nuxt");

import language from "./middlewares/language"
import sitemap from "./extra/sitemap"
import feeds from "./extra/feeds"
import calendar from "./extra/calendar"
import buildApiRouter from "./api"

import { ConfigFile, NuxtConfiguration } from "@statusfy/config/src/interfaces";

/**
 * Create the base Server App
 *
 * @param {Object} siteConfig - User Site Configuration.
 * @param {import("@nuxt/types").Configuration} nuxtConfig - Nuxt Configuration.
 * @param {string} host - Server Host.
 * @param {string} port - Server Port.
 * @param {string} [apiPrefix=""] - API prefix.
 */
export async function createApp(siteConfig: ConfigFile, nuxtConfig: NuxtConfiguration, host: string, port: number, apiPrefix = "") {
  const app = express();

  if (port) {
    app.set("port", port);
  }

  if (host) {
    app.set("host", host);
  }

  // Save Config
  app.use((req, res, next) => {
    req.app.set("siteConfig", siteConfig);

    next();
  });

  if (nuxtConfig && !nuxtConfig.dev) {
    app.use(
      helmet({
        dnsPrefetchControl: false
      })
    );
  }

  app.use(cors());
  // parse application/json
  app.use(bodyParser.json());
  app.use(language);

  if (nuxtConfig && nuxtConfig.statusfy.publicFilesPath) {
    app.use(require("serve-static")(nuxtConfig.statusfy.publicFilesPath));
  }

  app.use("/sitemap.xml", sitemap);
  app.use(feeds);
  app.use(calendar);
  app.use(`${apiPrefix}/api/v0`, buildApiRouter(siteConfig));

  if (nuxtConfig) {
    // Init Nuxt.js
    const nuxt = new Nuxt(nuxtConfig);

    // Build only in dev mode
    if (nuxtConfig.dev) {
      const { Builder } = require("nuxt");

      const builder = new Builder(nuxt);
      await builder.build();
    }

    // Give nuxt middleware to express
    app.use(nuxt.render);
  }

  return app;
};
