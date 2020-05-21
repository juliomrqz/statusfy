import fs from "fs"
import defaultsDeep from "lodash/defaultsDeep"
import { esm, logger, style, path } from "@statusfy/common/src";

import { ConfigFile } from "./interfaces";
import { loadConfig } from "./load";

const { colors } = style;

export function generateConfig(sourceDir: string, cliOptions: { [key: string]: string | boolean }): { siteConfig: ConfigFile } {
  // const nuxtConfig: NuxtConfiguration = Object.assign({}, esm("@statusfy/core/nuxt.config.js"));
  const loadedConfig = loadConfig(sourceDir);

  const siteConfig = loadedConfig.config;
  // const siteConfigErrors = loadedConfig.errors;

  // try {
  //   if (siteConfigErrors && siteConfigErrors.length > 0) {
  //     logger.fatal(
  //       `Your site configuration is invalid:\n${siteConfigErrors.join("\n")}`
  //     );
  //     process.exit(1);
  //   }
  // } catch (error) {
  //   logger.error(error);
  //   process.exit(1);
  // }

  // // General
  // nuxtConfig.dev = !(process.env.NODE_ENV === "production");
  // nuxtConfig.rootDir = path.join(__dirname, "..", "..");
  // nuxtConfig.buildDir = path.join(sourceDir, ".statusfy");
  // nuxtConfig.modulesDir = nuxtConfig.modulesDir || []
  // nuxtConfig.modulesDir.push(path.join(sourceDir, "node_modules"));
  // nuxtConfig.modulesDir = [...new Set(nuxtConfig.modulesDir)];

  // // Style
  // nuxtConfig.loading = (nuxtConfig.loading || {}) as NuxtConfigurationLoading
  // nuxtConfig.loading.color = colors.black;
  // nuxtConfig.meta.theme_color = colors.black;

  // // Statusfy module configuration
  // nuxtConfig.server = {
  //   host: `${cliOptions.host}` || process.env.HOST || "127.0.0.1",
  //   port: `${cliOptions.port}` || process.env.PORT || 3000
  // };

  // // Statusfy module configuration
  // nuxtConfig.statusfy.version = nuxtConfig.manifest.version;
  // nuxtConfig.statusfy.dev = nuxtConfig.dev;
  // nuxtConfig.statusfy.locales = siteConfig.locales;
  // nuxtConfig.statusfy.sourceDir = sourceDir;
  // nuxtConfig.statusfy.siteConfig = siteConfig;
  // nuxtConfig.statusfy.publicFilesPath = fs.existsSync(path.join(sourceDir, "public"))
  //   ? path.join(sourceDir, "public")
  //   : null;

  // const validLogoExtension = ["png", "jpg", "jpeg", "gif", "svg"];

  // // eslint-disable-next-line no-unused-vars
  // for (const ext of validLogoExtension) {
  //   const filePath = path.join(
  //     sourceDir,
  //     "theme",
  //     "default",
  //     "img",
  //     `logo.${ext}`
  //   );

  //   if (fs.existsSync(filePath)) {
  //     nuxtConfig.statusfy.assets.mainLogo = filePath;
  //     break;
  //   }
  // }

  // // Head Configuration
  // nuxtConfig.head = { ...siteConfig.head, ...nuxtConfig.head };
  // nuxtConfig.head = nuxtConfig.head || {}
  // nuxtConfig.head.meta = nuxtConfig.head.meta || []
  // nuxtConfig.head.title = siteConfig.title;
  // // Hack: fix duplicate descripton object
  // const descriptionIndex = nuxtConfig.head.meta.findIndex(o => o.hid === "description");
  // const descriptionValue = {
  //   hid: "description",
  //   name: "description",
  //   content: siteConfig.description
  // };
  // if (descriptionIndex === -1) {
  //   // @ts-ignore
  //   nuxtConfig.head.meta.push(descriptionValue);
  // } else {
  //   // @ts-ignore
  //   nuxtConfig.head.meta[descriptionIndex] = descriptionValue;
  // }

  // nuxtConfig.head.titleTemplate = `%s | ${siteConfig.title}`;
  // nuxtConfig.head = defaultsDeep(siteConfig.head, nuxtConfig.head);

  // // Generate Configuration
  // nuxtConfig.generate = nuxtConfig.generate || {};
  // nuxtConfig.generate.dir = path.join(sourceDir, cliOptions.outDir || "dist");

  // // nuxt-i18n module configuration
  // nuxtConfig.modules = nuxtConfig.modules || []
  // // TODO: improve this
  // // @ts-ignore
  // const nuxti18nModuleConfig = nuxtConfig.modules.find((item: NuxtConfigurationModule) => item[0] === "nuxt-i18n")[1];
  // // Update the locales list
  // nuxti18nModuleConfig.locales = [];
  // siteConfig.locales.forEach(locale => {
  //   nuxti18nModuleConfig.locales.push({
  //     ...locale,
  //     file: `${locale.code}.js`
  //   });
  // });
  // nuxti18nModuleConfig.defaultLocale = siteConfig.defaultLocale;
  // nuxti18nModuleConfig.detectBrowserLanguage.cookieKey = `${siteConfig.name}.lang_redirected`;
  // nuxti18nModuleConfig.vueI18n.fallbackLocale = siteConfig.defaultLocale;
  // if (siteConfig.baseUrl) {
  //   nuxti18nModuleConfig.baseUrl =
  //     siteConfig.baseUrl === "/" ? null : siteConfig.baseUrl;
  // }

  // // PWA Module
  // if (siteConfig.serviceWorker === true) {
  //   // @ts-ignore
  //   nuxtConfig.workbox.cacheOptions.cacheId = siteConfig.name;
  //   nuxtConfig.workbox.globDirectory = path.resolve(
  //     nuxtConfig.buildDir,
  //     "dist",
  //     "client"
  //   );

  //   nuxtConfig.workbox.runtimeCaching.forEach(runtime => {
  //     if (runtime.strategyOptions) {
  //       runtime.strategyOptions.cacheName = `${siteConfig.name}_${runtime.strategyOptions.cacheName}`;
  //     }
  //   });

  //   if (siteConfig.analytics && siteConfig.analytics.ga) {
  //     nuxtConfig.workbox.offlineAnalytics = true;
  //   }

  //   // onesignal notifications
  //   const onesignalAppId = siteConfig.notifications?.webpush?.onesignal?.appId

  //   if (onesignalAppId) {
  //     nuxtConfig.modules.unshift("@nuxtjs/onesignal");

  //     nuxtConfig.oneSignal = {
  //       init: {
  //         appId: onesignalAppId,
  //         allowLocalhostAsSecureOrigin: true,
  //         welcomeNotification: {
  //           disable: true
  //         }
  //       }
  //     };
  //   }
  // } else {
  //   // TODO: improve this
  //   // @ts-ignore
  //   const nuxtiPwaModuleConfig = nuxtConfig.modules.find(item => item[0] === "@nuxtjs/pwa")[1];
  //   nuxtiPwaModuleConfig.workbox = false;

  //   delete nuxtConfig.workbox;
  // }

  // if (siteConfig.manifest === true) {
  //   nuxtConfig.manifest.name = siteConfig.title;
  //   nuxtConfig.manifest.short_name = siteConfig.short_title;
  //   nuxtConfig.manifest.description = siteConfig.description;
  //   nuxtConfig.manifest.lang = siteConfig.defaultLocale;
  // } else {
  //   // TODO: improve this
  //   // @ts-ignore
  //   const nuxtiPwaModuleConfig = nuxtConfig.modules.find(item => item[0] === "@nuxtjs/pwa")[1];
  //   nuxtiPwaModuleConfig.manifest = false;

  //   delete nuxtConfig.manifest;
  // }

  // nuxtConfig.meta.ogHost = siteConfig.baseUrl;

  // const customIconPath = path.join(sourceDir, "theme", "default", "img", "icon.png");
  // if (fs.existsSync(customIconPath)) {
  //   nuxtConfig.icon.iconSrc = customIconPath;
  // }

  // // Custom Styles
  // const validStylesExtension = ["css", "less", "sass", "scss", "styl", "stylus"];
  // const stylesPath = [];

  // // eslint-disable-next-line no-unused-vars
  // for (const ext of validStylesExtension) {
  //   const filePath = path.join(sourceDir, "theme", "default", `style.${ext}`);

  //   if (fs.existsSync(filePath)) {
  //     stylesPath.push(filePath);
  //   }
  // }

  // if (stylesPath.length > 0) {
  //   logger.info(
  //     `Loading Styles from:\n${stylesPath
  //       .map(p => path.relative(sourceDir, p))
  //       .join("\n")}`
  //   );

  //   nuxtConfig.css = nuxtConfig.css || []
  //   nuxtConfig.css.push(...stylesPath);
  // }

  return {
    // nuxtConfig,
    siteConfig
  };
};
