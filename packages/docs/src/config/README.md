---
sidebar: auto
sidebarDepth: 2
---

# Config Reference

## title

- Type: `string`
- Default: `undefined`

The Title for the site. This will be the suffix for all page titles and displayed in the navbar. It is also used in the [Manifest File](../guide/pwa.md#manifest). 

## description

- Type: `string`
- Default: `undefined`

The Description for the site. This will be rendered as a `<meta>` tag in the page HTML and used in the [Manifest File](../guide/pwa.md#manifest).

## baseUrl

- Type: `string`
- Default: `/`

The base URL the site will be deployed at. It can be just a slash or a valid URL that shouldn't end with a slash.

::: warning Warning
You should set the baseUrl option to your **production domain** in order to make [Alternate URLs fully-qualified](../guide/i18n.md).
:::

## serviceWorker

- Type: `boolean`
- Default: `true`

If set to `true`, Statusfy will automatically generate and register a service worker that caches the content for offline use (only enabled production builds). For more details, see the guide on [Progressive Web App (PWA)](../guide/pwa.html#service-worker).

::: tip Important
To make your site fully PWA-compliant, you will need to enable the [Web App Manifest](./#manifest).

Also, only enable this if you are able to deploy your site with SSL, since service worker can only be registered under HTTPs URLs.
:::

## manifest

- Type: `boolean`
- Default: `true`

Generate a valid **Web App Manifest**. For more details, see the guide on [Progressive Web App (PWA)](../guide/pwa.html#web-app-manifest).

## ga

- Type: `string`
- Default: `undefined`

Provide the Google Analytics ID to enable integration.

## defaultLocale

- Type: `string`
- Default: `en`

The app's default locale, URLs for this locale won't have a prefix. It is also used in the [Manifest File](../guide/pwa.md#manifest). 

## locales

- Type: `[{ code: string, iso: string, name: string }]`
- Default: `[{ code: 'en', iso: 'en-US', name: 'English' }]`

Specify locales for i18n support. For more details, see the guide on [Internationalization](../guide/i18n.md).

## content

- Type: `object`
- Default: `{ dir: 'content', systems: [ 'api', 'cdn', 'dns', 'site-delivery' ] }`

Parameters that define some content considerations for your Incidents.

### dir

- Type: `string`
- Default: `content`

The path that define the location of your incidents' markdown source files.

### frontMatterFormat

- Type: `string`
- Default: `undefined`

Define the format of the Incidents' Front Matter. You can choose one of the following: yaml, yml, toml, json. For more details, see the guide on [Incidents' Front Matter](../guide/markdown.md#front-matter).

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

Extra tags to be injected to the page HTML `<head>`. Each tag can be specified in the form of `{tagCategory: [tagName, { attrName: attrValue }]}`. For example, to add a custom mask-icon:

``` js
module.exports = {
  head: {
    link: [
      { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3e4e88' }
    ]
  }
}
```

To know the list of options you can give to head, take a look at [vue-meta documentation](https://github.com/declandewet/vue-meta#recognized-metainfo-properties).
