# Configuración


## Config File


```
.
├─ config.js
└─ package.json
```

The essential file for configuring a Statusfy site is `./config.js`, which should export a JavaScript object:

``` js
module.exports = {
  title: 'Hello Statusfy',
  description: 'Just playing around'
}
```

...

Consult the [Config Reference](../config/README.md) for a full list of options.

::: tip Alternative Config Formats
You can also use YAML (`./config.yml`) or TOML (`./config.toml`) formats for the configuration file.
:::
