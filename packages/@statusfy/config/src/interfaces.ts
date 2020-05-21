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
  sourceDir?: string;
}
