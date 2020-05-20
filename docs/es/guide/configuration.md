---
title: Configuration
description: Statusfy es fácil de configurar y soporta diferentes formatos de archivo. Defines un archivo de configuración principal y el sistema hace su trabajo.
date: 2018-10-12T17:28:04Z
permalink: /guide/configuration
---

# Configuración

Statusfy es fácil de configurar y soporta diferentes formatos de archivo. Defines un archivo de configuración principal y el sistema hace su trabajo.

## Archivo de Configuración

Sin ninguna configuración, Statusfy utilizará los valores predeterminados para que funcione correctamente tu Sistema de Página de Estado. El archivo de configuración se debe colocar en la raíz de tu proyecto:

```
.
├─ config.js
└─ package.json
```

El archivo esencial para configurar un sitio Statusfy es `./config.js`, que debería exportar un objeto JavaScript:

``` js
module.exports = {
  title: 'Hola Statusfy',
  description: 'Probando 1, 2, 3'
}
```

Consulta la [Referencia de Configuración](../config/README.md) para obtener una lista completa de opciones.

## Formatos de Configuración Alternativos

También puede usar los formatos YAML (`./config.yml`) o TOML (`./config.toml`) para el archivo de configuración:

### YAML

YAML es un lenguaje de serialización de datos diseñado para ser legible por humanos. Actualmente, Statusfy soporta la última especificación, [versión 1.2](http://yaml.org/spec/1.2/spec.html).

``` yaml
title: Hola Statusfy
description: Probando 1, 2, 3
```

### TOML

TOML es otro lenguaje alternativo de serialización de datos, diseñado para ser fácil de leer con una semántica "mínima". Statusfy soporta la versión [0.4.0 de la especificación](https://github.com/toml-lang/toml/blob/master/versions/en/toml-v0.4.0.md).

``` ini
title = "Hola Statusfy"
description = "Probando 1, 2, 3"
```

## Archivo de Ejemplo

```javascript
module.exports = {
  title: 'Título',
  description: 'Descripción',
  baseUrl: 'https://demo.statusfy.co',
  analytics: {
    ga: 'UA-XXXXXXXXX-Y',
  },
  defaultLocale: 'es',
  locales: [
    { code: 'es', iso: 'es-ES', name: 'Español' },
    { code: 'en', iso: 'en-US', name: 'English' }
  ],
  content: {
    frontMatterFormat: 'yaml',
    systems: [
      'cdn',
      'conversions',
      'site-delivery',
      'api'
    ]
  },
  theme: {
    scheduled: {
      position: 'aboveGlobalStatus'
    }
  },
  head: {
    link: [
      { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3e4e88' }
    ]
  }
}
```
