---
title: Incidentes
description: "Los incidentes son el núcleo de Statusfy: no hay un sistema de página de estado sin un registro de incidentes. La información de incidentes se almacena en un archivo de Markdown con atributos y un contenido que proporciona información adicional a sus usuarios."
date: 2018-10-12T17:28:04Z
sidebarDepth: 3
permalink: /guide/incidents
---

# Incidentes

Los incidentes son el núcleo de Statusfy: no hay un sistema de página de estado sin un registro de incidentes.

La información de incidentes se almacena en un archivo de Markdown con atributos y un contenido que proporciona información adicional a sus usuarios.

Debes crear los incidentes en la carpeta `./content` (este nombre de ruta se puede cambiar, más información [aquí](../config/README.md#dir)) para que Statusfy la descubra. Se genera una página HTML para cada uno de tus incidentes, y se listan en la sección Historial de tu Sistema de Páginas de Estado.

::: warning RECUERDA

Debes crear una subcarpeta para cada uno de tus [Idiomas secundarios](../guide/i18n.md#configuracion) y colocar la fuente de la traducción de sus incidentes.

:::

Puede crear tus incidentes para cada uno de los idiomas disponibles a mano o puedes usar el CLI:

```bash
npm run new-incident
```

::: tip TIP

Con este comando, después de responder algunas preguntas, se genera automáticamente un archivo de Markdown inicial para tu incidente en todos los idiomas disponibles. Más información en la [Guía de Comandos](../guide/commands.md#new-incident).

:::

## Convención de Nombres

Puedes nombrar el archivo de tus incidentes de la manera que más desees, pero te recomendamos este patrón: `YYYY-MM-DD_slug.md`, donde ` YYYY-MM-DD` ***es la fecha de creación*** y ` slug` un ***nombre corto***. Por ejemplo

```
/content/2018-11-21_networking-issues.md
/content/2018-11-22_origin-server-errors.md
/content/2018-11-22_origin-server-errors_2.md
```

De esta manera, puedes ordenar fácilmente por fecha tus incidentes y garantizar un nombre de archivo único.

::: tip TIP
El comando `new-incident` usa este patrón por defecto.
:::

## Front Matter

El Front Matter es la forma en que puedes definir propiedades adicionales para tus incidentes. Debe ser lo primero en el archivo y debe definirse entre líneas de triple guión. El Front Matter en formato [YAML](https://jekyllrb.com/docs/front-matter/) se admite de forma predeterminada:



```yaml
---
id: 382ee1ab
title: "Problemas de Red"
description: "Detectamos un problema de red que causaba problemas temporales para nuestra API y servidores de origen."
date: 2018-10-16T13:14:03.000Z
modified: 2018-10-16T13:14:03.000Z
severity: "degraded-performance"
affectedsystems:
  - "site-delivery"
  - "api"
resolved: true
---
```

### Parámetros Soportados

#### id

- Tipo: `string`
- Requisito: `opcional`

Un identificador único para el incidente. Debe ser alfanumérico para evitar errores al generar/construir/acceder al sistema.

Si este valor no se define explícitamente, se generará automáticamente una cadena única basada en el nombre de archivo del incidente.

#### title

- Tipo: `string`
- Requisito: `obligatorio`

El título del Incidente.

#### description

- Tipo: `string`
- Requisito: `opcional pero recomendado`

Una breve descripción del incidente. Se utiliza como una **meta description** y como un resumen del incidente en la sección del Historial.

#### date

- Tipo: `string`
- Requisito: `obligatorio`

La fecha de creación del Incidente en [formato ISO-8601](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/toISOString): `YYYY-MM-DDTHH:mm:ss.sssZ`.

#### modified

- Tipo: `string`
- Requisito: `opcional`

La última modificación del incidente. Si se define un valor, debe actualizarlo cada vez que se actualice el incidente.

::: tip TIP

Si utiliza `git` en tu proyecto, este valor puede generarse automáticamente a partir de la fecha del último commit del archivo.

:::

#### severity

- Tipo: `string`
- Requisito: `obligatorio`

La severidad del incidente. Hay 4 valores disponibles:

- *under-maintenance*: El sistema (s) no puede manejar solicitudes debido a una actualización de mantenimiento temporal.
- *major-outage*: Nadie puede acceder al sistema (s) porque está completamente caído.
- *partial-outage*: Acceso limitado al (a los) sistema(s), porque probablemente esté experimentando dificultades.
- *degraded-performance*: El (los) sistema(s) no es (están) estable(es), está funcionando lento o se ve afectado de manera menor.

#### affectedsystems

- Tipo: `string`
- Requisito: `obligatorio`

Los sistemas afectados a los que se refiere el incidente. Los valores que se pueden usar deben definirse en el archivo de configuración (Más información en [Referencia de configuración](../config/README.md#systems)).


#### resolved

- Tipo: `boolean`
- Requisito: `obligatorio`
- Default: `false`

Si este campo se establece como `true`, el incidente se marca como resuelto.


#### scheduled <Badge text="0.2.0+"/>

- Tipo: `string`
- Requisito: `opcional`
- Default: `undefined`

La hora de inicio programada. Esto define la inicial de la ventana de mantenimiento planificada.

#### duration <Badge text="0.2.0+"/>

- Tipo: `string`
- Requisito: `opcional`
- Default: `undefined`

La duración programada en **minutos**. Esto define la duración de la ventana de mantenimiento planificada.

### Formatos Alternativos de Front Matter

Además, puedes definir el front matter como un [JSON](https://es.wikipedia.org/wiki/JSON) o [TOML](https://github.com/toml-lang/toml).

El Front Matter en JSON debe comenzar y terminar con llaves y debe marcarse explícitamente como JSON:

```markdown
---json
{
  "id": "382ee1ab",
  "title": "Problemas de Red",
  "description": "Detectamos un problema de red que causaba problemas temporales para nuestra API y servidores de origen.",
  "date": "2018-10-16T13:14:03.000Z",
  "modified": "2018-10-16T13:14:03.000Z",
  "severity": "degraded-performance",
  "affectedsystems": [
    "site-delivery",
    "api"
  ],
  "resolved": true
}
---
```

Y el Front Matter en TOML front matter también se debe marcar explícitamente, como TOML:

```markdown
---toml
id = "382ee1ab"
title = "Problemas de Red"
description = "Detectamos un problema de red que causaba problemas temporales para nuestra API y servidores de origen."
date = 2018-10-16T13:14:03.000Z
modified = 2018-10-16T13:14:03.000Z
severity = "degraded-performance"
affectedsystems = [
  "site-delivery",
  "api"
]
resolved = true
---
```

::: warning IMPORTANTE
Statusfy solo es compatible con la [versión 0.4.0](https://github.com/toml-lang/toml/blob/master/versions/en/toml-v0.4.0.md) de la especificación TOML.
:::


## Mantenimiento Programado <Badge text="0.2.0+"/>

La definición de Mantenimiento Programado es una forma de informar con anticipación a tus usuarios cuando su sistema no puede manejar solicitudes debido a una actualización de mantenimiento temporal.

Los mantenimientos programados comparten los mismos parámetros que los incidentes regulares, pero siempre son requeridos dos parámetros: [`scheduled`](#scheduled) y [`duration`](#duration).

Debe tener en cuenta que estas definiciones se manejan de manera diferente a los incidentes regulares:

- Estos Incidentes Especiales se muestran en la sección **Mantenimiento Programado** (en la página de inicio) mientras la fecha programada ([`scheduled`](#scheduled)) no ha llegado.
- Después que pase la fecha programada ([`scheduled`](#scheduled)), se debe establecer el campo [`resolved`](#resolved) en `true` si la ventana de mantenimiento ha finalizado.
- Los Mantenimientos Programados no se muestran en la **Línea de Tiempo de Incidentes** ni en el **Historial de Incidentes** mientras no haya llegado la fecha programada ([`scheduled`](#scheduled)).

::: warning IMPORTANTE
Recuerda establecer el campo `severity` a `under-maintenance` (más información [aquí](#severity)) para considerar la definición de tu Mantenimiento Programado.
:::

## Contenido

El contenido de los Incidentes se escribe en un formato de Markdown válido, pero hay Extensiones adicionales que proporciona Statusfy.

### Contenedores de Actualizaciones

Estos contenedores son la forma en que se definen las Actualizaciones de Incidentes.

```markdown
::: update Resuelto | 2018-02-06T01:24:45.752Z
Detectamos un problema de red que causaba problemas temporales para nuestra API y servidores de origen. All systems are back to normal now, but we're monitoring closely.
:::
```

Debes proporcionar un Título, una Fecha en [formato ISO-8601][iso-format] (`YYYY-MM-DDTHH: mm: ss.sssZ`) y un contenido válido en Markdown.

### Vínculos

#### Vínculos Internos

Cualquier enlace absoluto o relativo se trata como un enlace interno.

#### Enlaces Externos

Un enlace con un dominio definido se identifica como un enlace externo y se obtiene automáticamente `target="_blank" rel="noopener noreferrer" class="external"`:

### Emojis :nerd_face:

También se pueden utilizar emojis.

**Entrada**

```
:nerd_face: :tada: :100:
```

**Salida**

:nerd_face: :tada: :100:

Puede encontrar una lista de todos los emojis disponibles [aquí](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json).


## Archivo de Ejemplo

```markdown
---
id: 382ee1ab
title: Problemas de la API
description: Nuestro proceso de conversión de archivos respondía lentamente.
date: 2018-01-28T18:28:48.878Z
modified: 2018-01-28T20:28:48.878Z
severity: degraded-performance
affectedsystems:
  - api
  - cdn
resolved: true
---

<!-- Su Contenido General -->
Nuestro proceso de conversión de archivos respondía lentamente.

<!-- Definición de las Actualizaciones del Incidente -->
::: update Resuelto | 2018-01-28T22:28:48.878Z
El rendimiento vuelve a la normalidad y continuaremos supervisando.
:::

::: update Supervisando | 2018-01-28T23:28:48.878Z
The Conversion Process is back to normal and we'll continue to monitor.
:::

::: update Resuelto | 2018-01-28T23:58:48.878Z
El sistema de conversión de archivos ha vuelto a la normalidad y seguiremos supervisando.
:::
```

Este archivo se procesará como una página HTML similar a esta: [Demo Incident - #382ee1ab](https://statusfy.marquez.co/es/incidents/382ee1ab)


<!-- Enlaces -->

[iso-format]: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/toISOString
