const { slugify } = require("@statusfy/common");

const title = "ES5 Config Format";

module.exports = {
  title,
  name: slugify(title),
  description: "The ES5 Config Format Example",
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
