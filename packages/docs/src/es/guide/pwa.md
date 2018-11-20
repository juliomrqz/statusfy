# Aplicación Web Progresiva (PWA)

Statusfy proporciona soporte para [PWA](https://developers.google.com/web/progressive-web-apps/?hl=es) por defecto con algunas características maravillosas:

* [Service Worker](#service-worker): Registra un **service worker** para el almacenamiento en caché sin conexión.
* [Icons](#iconos): Genera automáticamente iconos de aplicaciones en diferentes tamaños.
* [Manifest](#manifiesto-de-applicacion-web): Generar automáticamente el archivo **Manifiesto de Applicación Web**.


## Service Worker

Statusfy puede generar y registrar automáticamente un **service worker** (usando [Workbox](https://developers.google.com/web/tools/workbox?hl=es)) que almacena en caché el contenido para su uso sin conexión.

Todas las fuentes en la ruta estática (`/static/`) se almacenarán en caché con la Estrategia CacheFirst y las llamadas a la API con la estrategia networkFirst con **entradas máximas** de  `30` ítems y **tiempo de vencimiento** de `300` segundos.

::: tip
Puede deshabilitar el **Service Worker** en el [archivo de configuración](../config/README.md#serviceworker).

:::



::: warning IMPORTANTE

Los **Service Workers** se utilizarán en el futuro para enviar **Notificaciones Push** a los suscriptores.

:::

## Iconos

Statusfy genera automáticamente iconos de aplicaciones y favicon con diferentes tamaños según el icono de tu aplicación (más información en la [Guía de Personalización de Estilo](./theme-customization.md#archivos)).

Se generan iconos en 7 tamaños diferentes (en px): `16`, `120`, `144`, `152`, `192`, `384` y `512`.


## Manifiesto de Applicación Web

Statusfy crea un [Manifiesto de Aplicación Web](https://developers.google.com/web/fundamentals/web-app-manifest/?hl=es) válido  que cumple con los [criterios para mostrar el banner de instalación](https://developers.google.com/web/fundamentals/app-install-banners/?hl=es#criterios_para_mostrar_el_banner).

```json
{
    "name": "Statusfy Demo",
    "short_name": "Statusfy Demo",
    "description": "Un Estupendo Sistema de Página de Estado de Código Abierto",
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
    "version": "0.1.3"
}
```

Algunos de estos valores se completan desde el archivo de configuración de la siguiente manera:

| Manifiesto de Aplicación Web |              Archivo de Configuración              |
| :--------------------------: | :------------------------------------------------: |
|             name             |         [title](../config/README.md#title)         |
|          short_name          |   [short_title](../config/README.md#short-title)   |
|         description          |   [description](../config/README.md#description)   |
|             lang             | [defaultLocale](../config/README.md#defaultlocale) |

::: tip
Puedes deshabilitar el **Manifiesto de Aplicación Web** en el [archivo de configuración](../config/README.md#manifest).
:::

