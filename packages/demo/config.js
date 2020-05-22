const oneSignalAppID =
  process.env.ONESIGNAL_APP_ID || "0c13819d-dd92-4c3e-a554-e7ab14c561af";

export default {
  title: "Demo System Status",
  short_title: "System Status",
  description: "A marvelous open source Status Page system",
  baseUrl: "https://demo.statusfy.co",
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
        contact: "https://aceforth.com/products/statusfy#support",
        support: "https://aceforth.com/products/statusfy#support",
        home: "https://aceforth.com/products/statusfy",
        privacy: "https://aceforth.com/legal/privacy",
        legal: "https://aceforth.com/legal/terms"
      },
      es: {
        contact: "https://aceforth.com/es/products/statusfy#support",
        support: "https://aceforth.com/es/products/statusfy#support",
        home: "https://aceforth.com/es/products/statusfy",
        privacy: "https://aceforth.com/es/legal/privacy",
        legal: "https://aceforth.com/es/legal/terms"
      }
    }
  },
  notifications: {
    twitter: {
      en: "AceforthHQ",
      es: "AceforthHQ"
    },
    support: {
      en: "https://aceforth.com/products/statusfy#support",
      es: "https://aceforth.com/es/products/statusfy#support"
    },
    webpush: {
      onesignal: {
        appId: oneSignalAppID
      }
    }
  }
};
