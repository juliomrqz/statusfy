# Progressive Web App (PWA)

[learn more](https://developers.google.com/web/progressive-web-apps)

Statusfy provides PWA support out of the box with some marvelous features:

* [Service Worker](#service-worker): Registers a service worker for offline caching.
* [Manifest](#manifest): Automatically generate **Web App Manifest** file.
* ​[Icons](#icon): Automatically generates app icons with different sizes.


## Service Worker

Statusfy can automatically generate and register a service worker (using [Workbox](https://developers.google.com/web/tools/workbox?hl=en)) that caches the content for offline use.

## Web App Manifest

Statsufy Adds a valid [Web App Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/?hl=en) that meets the [add to home screen criteria](https://developers.google.com/web/fundamentals/app-install-banners/?hl=en#criteria). 

```json
{
    "name": "Statusfy Demo",
    "short_name": "Statusfy Demo",
    "description": "A marvelous open source Status Page system",
    "publicPath": "/static/",
    "icons": [{
        "src": "/static/icons/icon_16.png",
        "sizes": "16x16",
        "type": "image/png"
    }, {
        "src": "/static/icons/icon_120.png",
        "sizes": "120x120",
        "type": "image/png"
    }, {
        "src": "/static/icons/icon_144.png",
        "sizes": "144x144",
        "type": "image/png"
    }, {
        "src": "/static/icons/icon_152.png",
        "sizes": "152x152",
        "type": "image/png"
    }, {
        "src": "/static/icons/icon_192.png",
        "sizes": "192x192",
        "type": "image/png"
    }, {
        "src": "/static/icons/icon_384.png",
        "sizes": "384x384",
        "type": "image/png"
    }, {
        "src": "/static/icons/icon_512.png",
        "sizes": "512x512",
        "type": "image/png"
    }],
    "start_url": "/?standalone=true&utm_source=web_app&utm_medium=pwa",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#1b1f23",
    "lang": "en",
    "version": "0.0.1-alpha.1"
}
```

::: tip
You can disable the **Web App Manifest** in the [configuration file](../config/README.md#manifest).
:::


## Icons
