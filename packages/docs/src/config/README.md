---
sidebar: auto
sidebarDepth: 2
---

# Config Reference

## title

- Type: `string`
- Default: `undefined`

The Title for of Site. This will be the suffix for all page titles and displayed in the navbar. It is also used in the [Manifest File](../guide/pwa.md#manifest). 

## short_title

- Type: `string`
- Default: `undefined`

The Short Title of the Site. This will be used in the `short_name` attribute of the [Manifest File](../guide/pwa.md#manifest). 

::: tip
If this parameter is not defined, the value of the [`title`](#title) will be used by default.
:::

## name

- Type: `string`
- Default: `undefined`

The Name of the Application. It is also used in the [Manifest File](../guide/pwa.md#manifest) and as id for assets caching with [Service Worker](../guide/pwa.md#service-worker).

::: warning
It should be an alphanumeric and lowercase value.
:::

::: tip
If this parameter is not defined, a value based on the [`title`](#title) will be generated.
:::

## description

- Type: `string`
- Default: `undefined`

The Description for the site. This will be rendered as a `<meta>` tag in the page HTML and used in the [Manifest File](../guide/pwa.md#manifest).

## baseUrl

- Type: `string`
- Default: `/`

The base URL the site will be deployed at. It can be just a slash or a valid URL that shouldn't end with a slash.

::: warning
You should set the `baseUrl` field to your **production domain** in order to make [Alternate URLs fully-qualified](../guide/i18n.md#seo).
:::

## theme

- Type: `Object`
- Default: `{}`

Provide config options to the be used by the theme.

### links

- Type: `Object`
- Default: `{}`

The external links located at the Footer of each page. There only three links you can define: `home`, `contact`, and `support` and must be used the language code as the index of the object. For example:

```json
module.exports = {
  theme: {
    links: {
      en: {
        contact: "https://statusfy.co/contact",
        support: "https://statusfy.co/support",
        home: "https://statusfy.co"
      },
      es: {
        contact: "https://statusfy.co/es/contact",
        support: "https://statusfy.co/es/support",
        home: "https://statusfy.co/es"
      }
    }
  }
}
```

## serviceWorker

- Type: `boolean`
- Default: `true`

If set to `true`, Statusfy will automatically generate and register a service worker that caches the content for offline use (only enabled production builds). For more details, see the guide on [Progressive Web App (PWA)](../guide/pwa.html#service-worker).

::: tip Important
To make your site fully PWA-compliant, you will need to enable the [Web App Manifest](./#manifest).

Also, only enable this if you are able to deploy your site with SSL since service worker can only be registered under HTTPS URLs.
:::

## manifest

- Type: `boolean`
- Default: `true`

Generate a valid **Web App Manifest**. For more details, see the guide on [Progressive Web App (PWA)](../guide/pwa.html#web-app-manifest).

## analytics

- Type: `object`
- Default: `undefined`

The analytics services.

### ga

- Type: `string`
- Default: `undefined`

Provide the Google Analytics ID to enable integration.

### mixpanel

- Type: `string`
- Default: `undefined`

Provide the Mixpanel Token to enable integration.

### facebook

- Type: `string`
- Default: `undefined`

Provide the Facebook Pixel App ID to enable integration.

### segment

- Type: `string`
- Default: `undefined`

Provide the Segment Token to enable integration.

## defaultLocale

- Type: `string`
- Default: `en`

The app's default locale, URLs for this locale won't have a prefix. It is also used in the [Manifest File](../guide/pwa.md#manifest). 

## locales

- Type: `[{ code: string, iso: string, name: string }]`
- Default: `[{ code: 'en', iso: 'en-US', name: 'English' }]`

Specify locales for i18n support. For more details, see the guide on [Internationalization](../guide/i18n.md#configuration).

## content

- Type: `object`
- Default: `{ dir: 'content', systems: [ 'api', 'cdn', 'dns', 'site-delivery' ] }`

Parameters that define some content considerations for your Incidents.

### dir

- Type: `string`
- Default: `content`

The path that defines the location of your incidents' markdown source files.

### frontMatterFormat

- Type: `string`
- Default: `undefined`

Define the default format of the Incidents' Front Matter used by the `new-incident` command (More info [here](../guide/commands.md#new-incident)). You can choose one of the following: yaml, yml, toml, json. For more details, see the guide on [Incidents' Front Matter](../guide/incidents.md#front-matter).

### systems

- Type: `Array`
- Default: `['api', 'cdn', 'dns', 'site-delivery']`

Define the IDs of the Available Systems. These IDs will be used when you indicate the **Affected Systems** in your [Incidents](../guide/incidents.html#front-matter).

::: tip Important
You must define, in your [locales files](../guide/i18n.md), the Human-Friendly titles of the defined IDs Systems.
:::

## head

- Type: `object`
- Default: `undefined`

Extra tags to be injected to the page HTML `<head>`. Each tag can be specified in the form of `{tagCategory: [tagName, { attrName: attrValue }]}`. For example, you can add a custom mask-icon:

``` js
module.exports = {
  head: {
    link: [
      { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3e4e88' }
    ]
  }
}
```

or define a meta tag site verification:

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

To know the list of options you can give to head, take a look at [vue-meta documentation](https://github.com/declandewet/vue-meta#recognized-metainfo-properties).
