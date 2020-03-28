import { Configuration } from "@nuxt/types"

interface OneSignalOptions {
  appId: string;
  allowLocalhostAsSecureOrigin: boolean;
  welcomeNotification: {
    disable: boolean;
  }
}

export interface ConfigFile {
  title?: string;
  short_title?: string;
  name?: string;
  description?: string;
  baseUrl: string;
  theme: {
    scheduled: { position: 'belowSystems' | 'aboveSystems' | 'aboveGlobalStatus' };
  };
  links?: { [key: string]: { [key: string]: string; } };
  serviceWorker: boolean;
  manifest: boolean;
  analytics?: {
    ga?: string;
    mixpanel?: string;
    facebook?: string;
    segment?: string;
  };
  notifications?: {
    webpush?: { onesignal: OneSignalOptions; };
    icalendar?: boolean;
    feeds?: boolean;
    twitter?: boolean | { [key: string]: string };
    support?: boolean | { [key: string]: string };
  },
  defaultLocale: string;
  locales: {
    code: string;
    iso: string;
    name: string;
  }[];
  content: {
    dir: string;
    frontMatterFormat: 'yaml' | 'yml' | 'toml' | 'json';
    systems: string[];
  };
  head?: { [key: string]: any };

  // internal
  build: {
    isStatic: boolean;
  },
  sourceDir?: string;
}

export interface NuxtConfiguration extends Configuration {
  workbox: {
    workboxVersion?: string;
    workboxURL?: string;
    importScripts?: string[];
    autoRegister: boolean;
    dev?: boolean;
    cacheNames?: { [key: string]: string };
    config?: { [key: string]: string };
    clientsClaim: boolean;
    skipWaiting: boolean;
    offlineAnalytics?: boolean;
    workboxExtensions?: string | string[];
    preCaching: string[];
    cacheOptions: {
      cacheId?: string;
      directoryIndex?: string;
      revision?: string;
    };
    cachingExtensions?: string | string[];
    cleanupOutdatedCaches?: boolean;
    offline: boolean;
    offlineStrategy: 'NetworkFirst';
    offlinePage?: string;
    offlineAssets?: string[];
    runtimeCaching: { strategyOptions: { [key: string]: string; } }[];
    cacheAssets: boolean;
    routingExtensions?: string | string[];
    assetsURLPattern: string | RegExp;
    pagesURLPattern: string | RegExp;
    swTemplate?: string;
    swURL?: string;
    swScope: string;
    routerBase: string;
    publicPath: string;

    // REMOVE?
    globDirectory?: string;
  },

  oneSignal: {
    init: OneSignalOptions;
  };

  icon: {
    iconSrc: string;
    iconFileName: string;
    sizes: string[];
    targetDir: string;
    accessibleIcons: boolean;
    iconProperty: string;
  }
}
