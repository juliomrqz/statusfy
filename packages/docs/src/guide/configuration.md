# Configuration


## Config File

Without any configuration, Statusfy will use default values in order to make work properly your Status Page System. The configuration file must be placed at the root of your project:

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

Consult the [Config Reference](../config/README.md) for a full list of options.

## Alternative Config Formats

You can also use YAML (`./config.yml`) or TOML (`./config.toml`) formats for the configuration file:

### YAML

YAML is a data serialization language designed to be human-readable. Currently, Statusfy supports the latest specification, [version 1.2](http://yaml.org/spec/1.2/spec.html).

``` yaml
title: Hello Statusfy
description: Just playing around
```

### TOML

TOML is another alternative data serialization language, designed to be easy to read with a "minimal" semantics. Statusfy supports version [0.4.0 of the specification](https://github.com/toml-lang/toml/blob/master/versions/en/toml-v0.4.0.md).

``` ini
title = "Hello Statusfy"
description = "Just playing around"
```
