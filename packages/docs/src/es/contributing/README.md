---
sidebar: auto
sidebarDepth: 3
---

# Guía de Contribución

Cualquier contribución a Statusfy es más que bienvenida!

::: tip IMPORTANTE
Asegúrate de leer nuestro [Código de Conducta][code-of-conduct] antes de hacer una contribución.
:::

Statusfy se basa en tres tecnologías asombrosas:

- **[Vue.js][vue]:** Define dinámicamente las interfaces que representan los datos.
- **[Nuxt.js][nuxt]:** Una abstracción rápida, flexible y útil de la lógica del cliente y del servidor. También genera/construye la aplicación.
- **[Tailwind CSS][tailwind]:** Un Framework CSS de utilidad que define los estilos de una manera inteligente.

## Reporte de Incidencia

Una excelente manera de contribuir al proyecto es enviar un reporte detallado cuando se encuentra con un problema. Utilizamos la [sección de Issues de Github][github-issues] para estos reportes.

Por favor, asegúrate de incluir un repositorio de reproducción. Podemos comenzar a corregir errores más rápido si proporcionas un proyecto para su reproducción.

## Pull Requests

Cualquier mejora significativa (no importa si es solo para corregir un error tipográfico) debe asociarse con una [solicitud de nueva funcionalidad][feature-request] o un [reporte de error][bug-report].

### Primeros Pasos

Installa [Node.js][node] (8.1 o superior) y [Yarn][yarn]. También se recomienda instalar [Lerna][lerna] a nivel global.

1. Clona este repositorio: [https://github.com/bazzite/statusfy][repo].
2. Ejecuta `yarn install-dependencies` para instalar las dependencias..

::: tip
Para usar **@statusfy/cli** en el repositorio como un comando global. Ingresa a la carpeta `./packages/@statusfy/cli` y ejecuta `npm link`.
:::

El repositorio de Statusfy es un [monorepo][monorepo] con múltiples [subproyectos/paquetes](#paquetes). Antes de enviar un *pull request*, debes conocer la tarea de cada subproyecto [abajo](#paquetes).

### Pruebas

Un gran **Pull Request** a menudo incluirá pruebas. Para escribir buenas pruebas, te explicamos nuestra estructura de pruebas:

#### Demo

El proyecto de demostración utiliza casi todas las funciones de Statusfy y se usa como punto de partida para las pruebas. Antes de ejecutar cualquier prueba, el proyecto de demostración debe generarse/construirse ejecutando `yarn run test:demo`.

#### Pruebas Unitarias

Cada **subproyecto** tiene sus propias pruebas unitarias y se ejecutarán con Lerna ejecutando el comando `yarn run test`.

#### Probando tus Cambios

Mientras trabajas en tu **Pull Request** probablemente querrás verificar si tus cambios no están rompiendo ninguna característica existente.

Para ello, genere/construye la *proyecto de demostración* y ejecuta las pruebas.

```bash
yarn run test:demo
yarn run test
```

### Linting

Como ya habrás notado, estamos usando ESLint para hacer cumplir un estándar de codificación. Por favor  ejecuta `yarn lint` antes de confirmar tus cambios para corregir automáticamente el estilo del código. Si aún quedan errores, debes corregirlos manualmente.

### Documentación

Si estás agregando una nueva función, haciendo una refactorización o cambiando el comportamiento de Statusfy de alguna otra manera, es probable que desees documentar los cambios.

Actualmente, la documentación está traducida al inglés y al español, pero no tienes que documentar los cambios en ambos idiomas, solo puedes elegir uno y nosotros nos encargamos del otro idioma.

::: tip TIP

No tienes que escribir la documentación inmediatamente (pero házlo tan pronto como tu pull request sea lo suficientemente maduro).

:::

### Traducciones

Estamos abiertos a cualquier contribución que traduzca el núcleo de Statusfy a otros idiomas. Solo usa como idioma base [este archivo][english-language] y traduce las cadenas. El nuevo archivo que se cree debe seguir este patrón `lang-default.json` donde `lang` es la identificación del idioma en una representación de dos letras (en format [ISO 639-1][iso-639-1]) con una región opcional (en formato [ISO 3166-1 Alpha 2][iso-3166-1-alpha-2]).

### Lista de verificación final

Al enviar tu **Pull Request**, hay una plantilla simple que debes completar. Por favor, marcas todas las respuestas adecuadas en las listas de verificación.

## Paquetes

Statusfy es un proyecto completamente abierto, tu repositorio es un monorepo con múltiples subproyectos/paquetes ubicados en la carpeta `./packages`.

### CLI

***CLI para Statusfy***

En este proyecto se encuentra el conjunto de [comandos útiles](../guide/commands.md), tanto para fines de desarrollo como de producción.

### Common

***Utilidades Comunes*** 

Se utiliza para los otros proyectos internos.

### Core

***El núcleo de Statusfy.***

Es una aplicación [Nuxt.js][nuxt] y toda la magia de Stastufy ocurre aquí. Utilizamos bibliotecas adicionales que amplían fácilmente algunas de las funciones de Statusfy:

- [Font Awesome][fontawesome]: Un conjunto de iconos versátiles.
- [@nuxtjs/axios][axios-module]: Integración segura y fácil de Axios para Nuxt.js.
- [@nuxtjs/pwa][pwa-module]: Soporte PWA para Nuxt.js.
- [nuxt-i18n][nuxt-i18n]:  Características de Internacionalización para Nuxt.js.
- [Express][express]: Un framework para Node.js.
- [vue-multianalytics][vue-multianalytics]: un simple complemento que rastrea cualquier evento en múltiples plataformas al mismo tiempo.
- [Tailwind CSS][tailwindcss]: Un Framework CSS de utilidad usado por el teme por defecto.

### Editor

***El editor de Statusfy.***

::: warning IMPORTANTE
Este editor aún no está listo, está en desarrollo.
:::

### Markdown

***Markdown Parser para Statusfy.***

El Parser que convierte todos los incidentes desde Markdown a HTML. Usamos [markdown-it][markdown-it] para esta tarea.

### Testing Utilities

***Utilidades de prueba para Statusfy.***

### Demo

***Demostración Principal de Statusfy.***

### Documentation

***Donde se almacena la Documentación..***

La documentación se crea con archivos Markdown y se genera con [Vuepress][vuepress].

### Website

***Sitio Web Principal para Statusfy.***

Es una aplicación [Nuxt.js][nuxt] simple.



<!-- enlaces -->


[repo]: https://github.com/bazzite/statusfy
[code-of-conduct]: https://www.bazzite.com/es/open-source/code-of-conduct?utm_source=docs&utm_medium=contributing&utm_campaign=statusfy
[github-issues]: https://github.com/bazzite/statusfy/issues
[feature-request]: https://github.com/bazzite/statusfy/issues/new?template=feature_request.md
[bug-report]: https://github.com/bazzite/statusfy/issues/new?template=bug_report.md
[support-page]: https://statusfy.co/es/support
[node]: https://nodejs.org/es/download/
[yarn]: https://yarnpkg.com/es-ES/docs/install
[lerna]: https://www.npmjs.com/package/lerna
[monorepo]: https://en.wikipedia.org/wiki/Monorepo
[english-language]: https://github.com/bazzite/statusfy/blob/develop/packages/@statusfy/core/client/locales/en-default.json
[iso-639-1]: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
[iso-3166-1-alpha-2]: http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
[nuxt]: https://nuxtjs.org/
[fontawesome]: https://fontawesome.com/
[axios-module]: https://github.com/nuxt-community/axios-module
[pwa-module]: https://github.com/nuxt-community/pwa-module
[express]: https://expressjs.com/
[nuxt-i18n]: https://github.com/nuxt-community/nuxt-i18n
[vue-multianalytics]: https://github.com/Glovo/vue-multianalytics
[tailwindcss]: https://github.com/tailwindcss/tailwindcss
[vuepress]: https://vuepress.vuejs.org/
[markdown-it]: https://github.com/markdown-it/markdown-it
[vue]: http://vuejs.org/
[tailwind]: https://tailwindcss.com/

