---
sidebar: auto
---

# Referencia de Configuración


## Basic Config

### title

- Type: `string`
- Default: `undefined`

### description

- Type: `string`
- Default: `undefined`

### baseUrl

- Type: `string`
- Default: `/`

### serviceWorker

- Type: `boolean`
- Default: `true`

### ga

- Type: `string`
- Default: `undefined`

### defaultLocale

- Type: `string`
- Default: `en`

### locales

- Type: `[{ code: string, iso: string, name: string }]`
- Default: `[{ code: 'en', iso: 'en-US', name: 'English' }]`

Specify locales for i18n support. For more details, see the guide on [Internationalization](../guide/i18n.md).

### content

- Type: `object`
- Default: `{ dir: 'content', systems: [ 'api', 'cdn', 'dns', 'site-delivery' ] }`

#### dir

- Type: `string`
- Default: `content`

#### frontMatterFormat

- Type: `string`
- Default: `undefined`

#### systems

- Type: `Array`
- Default: `['api', 'cdn', 'dns', 'site-delivery']`

### head

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
