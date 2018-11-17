# Progressive Web App (PWA)

Statusfy provides [PWA](https://developers.google.com/web/progressive-web-apps/?hl=en) support out of the box with some marvelous features:

* [Service Worker](#service-worker): Registers a service worker for offline caching.
* ​[Icons](#icon): Automatically generates app icons in different sizes.
* [Manifest](#manifest): Automatically generate **Web App Manifest** file.


## Service Worker

Statusfy can automatically generate and register a service worker (using [Workbox](https://developers.google.com/web/tools/workbox?hl=en)) that caches the content for offline use.

All the sources in the static path (`/static/`) will be cached with the CacheFirst Strategy and the API calls with the networkFirst strategy with **maximum entries** of `30` items and **expiration time** of `300` seconds.  

::: tip
You can disable the **Service Worker** in the [configuration file](../config/README.md#serviceworker).
:::

::: warning IMPORTANT
Service workers will be used in the future for sending **Web Push Notifications** to subscribers.
:::

## Icons

Statusfy automatically generates app icons and favicon with different sizes based on the icon of your Application (more information in the [Theme Customization Guide](./theme-customization.md#assets)).

It's generated icons in 7 different sizes (in px): `16`, `120`, `144`, `152`, `192`, `384` and `512`.


## Web App Manifest

Statusfy creates a valid [Web App Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/?hl=en) that meets the [add to home screen criteria](https://developers.google.com/web/fundamentals/app-install-banners/?hl=en#criteria). 

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
    "version": "0.1.1"
}
```

Some of these values are populated from the config file as follows:

| Web App Manifest |                     Config File                    |
|:----------------:|:--------------------------------------------------:|
|       name       |         [title](../config/README.md#title)         |
|    short_name    |          [name](../config/README.md#name)          |
|    description   |   [description](../config/README.md#description)   |
|       lang       | [defaultLocale](../config/README.md#defaultlocale) |


::: tip
You can disable the **Web App Manifest** in the [configuration file](../config/README.md#manifest).
:::

