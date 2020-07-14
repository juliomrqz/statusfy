const oneSignalAppID =
  process.env.ONESIGNAL_APP_ID || "0c13819d-dd92-4c3e-a554-e7ab14c561af";

export default {
  title: "Demo System Status",
  short_title: "System Status",
  description: "A marvelous open source Status Page system",
  baseUrl: "https://statusfy.marquez.co",
  analytics: {
    ga: process.env.GA_TRACKING_ID || "UA-XXXXXXXXX-Y",
    mixpanel: process.env.MIXPANEL_TOKEN || "mixpanel-token",
    facebook: process.env.FACEBOOK_TOKEN || "facebook-token",
    segment: process.env.SEGMENT_TOKEN || "segment-token"
  },
  defaultLocale: "en",
  locales: [
    { code: "en", iso: "en-US", name: "English" },
    { code: "es", iso: "es-ES", name: "Español" }
  ],
  content: {
    frontMatterFormat: "yaml",
    systems: ["cdn", "conversions", "site-delivery", "api"]
  },
  head: {
    link: [
      {
        rel: "mask-icon",
        href: "/icons/safari-pinned-tab.svg",
        color: "#3e4e88"
      }
    ]
  },
  theme: {
    links: {
      en: {
        contact: "https://marquez.co/statusfy#support",
        support: "https://marquez.co/statusfy#support",
        home: "https://marquez.co/statusfy",
        privacy: "https://marquez.co/legal/privacy",
        legal: "https://marquez.co/legal/terms"
      },
      es: {
        contact: "https://marquez.co/es/products/statusfy#support",
        support: "https://marquez.co/es/products/statusfy#support",
        home: "https://marquez.co/es/products/statusfy",
        privacy: "https://marquez.co/es/legal/privacy",
        legal: "https://marquez.co/es/legal/terms"
      }
    }
  },
  notifications: {
    twitter: {
      en: "juliomrqz",
      es: "juliomrqz"
    },
    support: {
      en: "https://marquez.co/statusfy#support",
      es: "https://marquez.co/es/products/statusfy#support"
    },
    webpush: {
      onesignal: {
        appId: oneSignalAppID
      }
    }
  }
};
