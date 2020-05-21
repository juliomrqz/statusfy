import { ConfigFile } from "./interfaces";

export const defaultConfig: ConfigFile = {
  title: "Statusfy Demo",
  description: "A marvelous open source Status Page system",
  baseUrl: "/",
  defaultLocale: "en",
  locales: [{ code: "en", iso: "en-US", name: "English" }],
  content: {
    dir: "content",
    systems: ["api", "cdn", "dns", "site-delivery"],
    frontMatterFormat: "yaml"
  },
  serviceWorker: true,
  manifest: true,
  theme: {
    scheduled: {
      position: "belowSystems" // or aboveSystems, aboveGlobalStatus
    }
  },
  notifications: {
    icalendar: true,
    feeds: true,
    twitter: false,
    support: false
  }
};
