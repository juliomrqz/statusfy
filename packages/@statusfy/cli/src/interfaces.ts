export interface Incident {
  name: string;
  value: {
    name: string;
    path: string;
  },
}

export interface ConfigFile {
  title?: string;
  short_title?: string;
  name?: string;
  description?: string;
  baseUrl: string;
  theme: { [key: string]: string };
  scheduled: { position: 'belowSystems' | 'aboveSystems' | 'aboveGlobalStatus' };
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
    webpush?: { [key: string]: string | boolean };
    icalendar?: boolean;
    feeds?: boolean;
    twitter?: { [key: string]: string };
    support?: { [key: string]: string };
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
}

export interface ParsedIncident {
  content: string;
  data: { [key: string]: string | boolean };
}
