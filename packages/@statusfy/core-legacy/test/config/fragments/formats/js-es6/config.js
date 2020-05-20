import { slugify } from "@statusfy/common";

const title = "ES6 Config Format";

export default {
  title,
  name: slugify(title),
  description: "The ES6 Config Format Example",
  defaultLocale: "en",
  serviceWorker: true,
  manifest: false,
  locales: [
    {
      code: "en",
      iso: "en-US",
      name: "English"
    }
  ]
};
