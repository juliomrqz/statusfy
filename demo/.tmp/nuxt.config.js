module.exports = {
  "srcDir": "/Volumes/Sensitive/Projects/bazzite/open-source/active/statusfy/statusfy/client/",
  "mode": "universal",
  "env": {
    "isDev": false
  },
  "head": {
    "title": "Statusfy Demo",
    "meta": [{
        "charset": "utf-8"
      },
      {
        "name": "viewport",
        "content": "width=device-width, initial-scale=1"
      },
      {
        "hid": "description",
        "name": "description",
        "content": "A marvelous open source Status Page system"
      }
    ],
    "link": [{
      "rel": "icon",
      "type": "image/x-icon",
      "href": "/favicon.ico"
    }],
    "titleTemplate": "%s | Statusfy Demo"
  },
  "loading": {
    "color": "#FFFFFF"
  },
  "css": [
    "~/assets/css/tailwind.css"
  ],
  "plugins": [],
  "modules": [
    "@nuxtjs/axios", [
      "nuxt-i18n",
      {
        "locales": [{
            "code": "en",
            "iso": "en-US",
            "name": "English",
            "file": "en.js"
          },
          {
            "code": "es",
            "iso": "es-ES",
            "name": "Español",
            "file": "es.js"
          }
        ],
        "defaultLocale": "en",
        "lazy": true,
        "langDir": "./locales/",
        "detectBrowserLanguage": {
          "useCookie": true,
          "cookieKey": "statusfy_demo.lang_redirected"
        },
        "vueI18n": {
          "fallbackLocale": "en"
        }
      }
    ]
  ],
  "build": {
    "publicPath": "/static/",
    "plugins": [{}],
    "analyze": {
      "analyzerMode": "static"
    },
    "router": {
      "linkActiveClass": "active",
      "linkExactActiveClass": "exact"
    }
  },
  "generate": {
    "minify": {
      "removeOptionalTags": false
    },
    "subFolders": false,
    "dir": "/Volumes/Sensitive/Projects/bazzite/open-source/active/statusfy/statusfy/demo/dist"
  },
  "axios": {},
  "statusfy": {
    "host": "0.0.0.0",
    "port": 8080
  },
  "dev": false,
  "rootDir": "/Volumes/Sensitive/Projects/bazzite/open-source/active/statusfy/statusfy",
  "buildDir": "/Volumes/Sensitive/Projects/bazzite/open-source/active/statusfy/statusfy/demo/.statusfy"
}
