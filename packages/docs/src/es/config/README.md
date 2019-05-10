---
sidebar: auto
sidebarDepth: 2
---

# Referencia de Configuración

## title

- Tipo: `string`
- Por defecto: `undefined`

El Título del Sitio. Éste será el sufijo para todos los títulos de las páginas y se mostrará en la barra de navegación. También se utiliza en el [Manifiesto de Applicación Web](../guide/pwa.md#manifiesto-de-applicacion-web).

## short_title

- Type: `string`
- Por defecto: `undefined`

El Título Corto del Sitio. Será usado en el atributo `short_name` del [Manifiesto de Applicación Web](../guide/pwa.md#manifiesto-de-applicacion-web).

::: tip
Si no se define este parámetro, se usará por defecto el valor del [`title`](#title).
:::

## name

- Tipo: `string`
- Por defecto: `undefined`

El Nombre de la Aplicación. También se utiliza en el [Manifiesto de Applicación Web](../guide/pwa.md#manifiesto-de-applicacion-web) y como id para el almacenamiento en caché de archivos con [Service Worker](../guide/pwa.md#service-worker).

::: warning ADVERTENCIA
Debe ser un valor alfanumérico con solo minúsculas.
:::

::: tip
Si no se define este parámetro, se generará un valor basado en el [`title`](#title).
:::

## description

- Tipo: `string`
- Por defecto: `undefined`

La Descripción para el sitio. Esto se representará como una etiqueta `<meta>` en la página HTML y se utiliza en el [Manifiesto de Applicación Web](../guide/pwa.md#manifiesto-de-applicacion-web).

## baseUrl

- Tipo: `string`
- Por defecto: `/`

La URL base en la que se desplegará el sitio. Puede ser solo una barra o una URL válida que no debe terminar con una barra.

::: warning ADVERTENCIA
Desde la versión `v0.3.0`, los despliegues bajo una sub-ruta (p.e. `https://ejemplo.com/status/`) ya no son soportados.
:::

::: tip
Debes establecer el campo `baseUrl` como su **dominio de producción** para que las [URL alternativas sean completamente válidas](../guide/i18n.md#seo).

:::

## theme

- Tipo: `Object`

Proporcionar opciones de configuración para ser utilizado por el tema.

### scheduled <Badge text="0.3.0+"/>

- Tipo: `Object`
- Por defecto: `{ position: 'belowSystems' }`

Define la posición de la Sección **Mantenimiento Programado** in la página de inicio. Los valores permitidos son: `belowSystems`, `aboveSystems` y `aboveGlobalStatus`.

### links

- Tipo: `Object`
- Por defecto: `{}`

Los enlaces externos ubicados en el footer de cada página. Solo se pueden definir tres enlaces: `home`, `contact`  y  `support` y se debe utilizar el código de idioma como índice del objeto. Por ejemplo:

```json
module.exports = {
  theme: {
    links: {
      es: {
        contact: "https://statusfy.co/es/contact",
        support: "https://statusfy.co/es/support",
        home: "https://statusfy.co/es"
      },
      en: {
        contact: "https://statusfy.co/contact",
        support: "https://statusfy.co/support",
        home: "https://statusfy.co"
      }
    }
  }
}
```

## serviceWorker

- Tipo: `boolean`
- Por defecto: `true`



Si se establece en `true`, Statusfy generará y registrará automáticamente un ***service worker*** que almacena en caché el contenido para su uso fuera de línea (solo habilitado en producción). Para obtener más detalles, consulta la guía de [Aplicación Web Progresiva (PWA)](../guide/pwa.html#service-worker).



::: tip Importante
Para que tu sitio sea totalmente compatible con PWA, deberás habilitar el [Manifiesto de Applicación Web](../guide/pwa.md#manifiesto-de-applicacion-web).

Además, solo habilita esto si puedes implementar tu sitio con SSL ya que el ***service worker*** solo puede registrarse bajo las URL en HTTPS.

:::

## manifest

- Tipo: `boolean`
- Por defecto: `true`

Generar un valido **Manifiesto de Applicación Web**. Para más detalles, consulta la guía del [Manifiesto de Applicación Web](../guide/pwa.md#manifiesto-de-applicacion-web).

## analytics

- Tipo: `object`
- Por defecto: `undefined`

Los servicios analíticos.

### ga

- Tipo: `string`
- Por defecto: `undefined`

Proporciona el ID de Google Analytics para habilitar la integración.

### mixpanel

- Tipo: `string`
- Por defecto: `undefined`

Proporciona el token de Mixpanel para habilitar la integración.

### facebook

- Tipo: `string`
- Por defecto: `undefined`

Proporciona el Facebook Pixel App ID para habilitar la integración.

### segment

- Tipo: `string`
- Por defecto: `undefined`

Proporciona el token de Segment para habilitar la integración.

## notifications <Badge text="0.2.0+"/>

- Type: `object`
- Default: `{}`

Las opciones de notificaciones disponibles.

### icalendar <Badge text="0.2.0+"/>

- Type: `boolean`
- Default: `true`

Activa calendario que contiene todos tus Mantenimientos Programados futuros y pasados. Para más detalles, consulta la guía de [Notificationes](../guide/notifications.md#icalendar).

### feeds <Badge text="0.2.0+"/>

- Type: `boolean`
- Default: `true`

Activa feeds incluyen todos los incidentes Mantenimientos Programados que han pasado. Para más detalles, consulta la guía de [Notificationes](../guide/notifications.md#feeds-atom-y-rss).

### twitter <Badge text="0.2.0+"/>

- Type: `object`
- Default: `undefined`

Define las cuentas de Twitter a las que tus usuarios pueden acceder para recibir actualizaciones.

Debes definir un valor para cada idioma que soporte tu sistema:
```json
...
  notifications: {
    twitter: {
      en: "BazziteTech",
      es: "BazziteES"
    }
  }
...
```

Para más detalles, consulta la guía de [Notificationes](../guide/notifications.md#twitter).

### support <Badge text="0.2.0+"/>

- Type: `object`
- Default: `undefined`

Define los sitios de Soporte Externo al que puedan acceder tus usuarios para recibir actualizaciones de otras fuentes que desees proporcionar.

Debes definir un valor para cada idioma que soporte tu sistema:

```json
...
  notifications: {
    support: {
      en: "https://statusfy.co/support",
      es: "https://statusfy.co/es/support"
    }
  }
...
```

Para más detalles, consulta la guía de [Notificationes](../guide/notifications.md#sitio-de-soporte).


## defaultLocale

- Tipo: `string`
- Por defecto: `en`

La configuración regional predeterminada de la aplicación, las URL de esta configuración regional no tendrán un prefijo. También se utiliza en el [Manifiesto de Applicación Web](../guide/pwa.md#manifiesto-de-applicacion-web).

## locales

- Tipo: `[{ code: string, iso: string, name: string }]`
- Por defecto: `[{ code: 'en', iso: 'en-US', name: 'English' }]`

Especifique las configuraciones regionales para el soporte de Internacionalización. Para obtener más detalles, consulta la guía sobre [Internacionalización](../guide/i18n.md#configuracion).

## content

- Tipo: `object`
- Por defecto: `{ dir: 'content', systems: [ 'api', 'cdn', 'dns', 'site-delivery' ] }`

Parámetros que definen algunas consideraciones de contenido para sus incidentes.

### dir

- Tipo: `string`
- Por defecto: `content`

La ruta que define la ubicación de los archivos markdown fuente de los incidentes.

### frontMatterFormat

- Tipo: `string`
- Por defecto: `yaml`

Define el formato predeterminado para el Front Matter de Incidentes utilizado por el comando `new-incident` (Más información [aquí](../guide/commands.md#new-incident)). Puedes elegir uno de los siguientes: yaml, yml, toml, json. Para más detalles, consulta la guía de [los Front Matter de los Incidentes](../guide/incidents.md#front-matter).

### systems

- Tipo: `Array`
- Por defecto: `['api', 'cdn', 'dns', 'site-delivery']`

Define los IDs de los sistemas disponibles. Estos IDs se utilizarán cuando indiques los **Sistemas afectados** en tus [Incidentes](../guide/incidents.html#front-matter).

::: tip Importante

Debes definir, en tus [archivos de traducción](../guide/i18n.md), los títulos de forma amigable de los IDs de los Sistemas definidos.
:::

## head

- Tipo: `object`
- Por defecto: `undefined`

Etiquetas adicionales que se inyectarán en la página HTML `<head>`. Cada etiqueta se puede especificar en la forma de `{tagCategory: [tagName, { attrName: attrValue }]}`. Por ejemplo, puedes agregar un icono de máscara personalizado:

``` js
module.exports = {
  head: {
    link: [
      { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3e4e88' }
    ]
  }
}
```

o definir una metaetiqueta de verificación del sitio:

``` js
module.exports = {
  head: {
    meta: [
      { 
        name: 'google-site-verification', 
        content: '+nxGUDJ4QpAZ5l9Bsjdi102tLVC21AIh5d1Nl23908vVuFHs34=' 
      }
    ]
  }
}
```

Para conocer la lista de opciones que puedes usar, echa un vistazo a la [documentación de vue-meta](https://github.com/declandewet/vue-meta#recognized-metainfo-properties).
