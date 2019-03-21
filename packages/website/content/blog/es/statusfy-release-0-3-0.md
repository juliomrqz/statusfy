---
title: "Statusfy: Actualización v0.3.0"
slug: "statusfy-release-0-3-0"
author: juliomrqz
description: "Acabamos de lanzar una nueva versión de Statusfy con nuevas características y mejoras de rendimiento: soporte para Docker, nuevos comandos, tres nuevos idiomas que traducen la interfaz y mucho más."
published: "2019-03-21T14:45:43.472Z"
created: "2019-03-21T14:45:43.472Z"
canonical: https://www.bazzite.com/es/blog/statusfy-release-0-3-0
---

Acabamos de lanzar una [nueva versión][github-release] de Statusfy con nuevas características y mejoras de rendimiento: soporte para Docker, nuevos comandos, tres nuevos idiomas que traducen la interfaz y mucho más.

## CLI

Hay dos nuevos comandos disponibles: [`delete-incident`][delete-incident] y [`update-incident`][delete-incident]. Son útiles si estás gestionando una gran cantidad de incidentes o varios idiomas.

## Mantenimiento Programado

Aplicamos pequeñas mejoras en el diseño de los Incidentes Programados: ahora se muestra la fecha de finalización, así como el contenido del incidente. También puedes personalizar la [posición de esta sección][scheduled-position], eligiendo una de estas opciones: `belowSystems`, `aboveSystems` y `aboveGlobalStatus`.

## Docker

Soportamos oficialmente a [Docker][docker]. Todavía no lo recomendamos su uso en producción, primero necesitamos tus comentarios para asegurarnos de que la imagen funciona correctamente.

## Nuevas traducciones:

Tres nuevos idiomas traducen la Interfaz:

  * Alemán (gracias a [Dennis Herzberg](https://github.com/dennis47528))
  * Húngaro (gracias a [Peter Borsa](https://github.com/asrob))
  * Portugués de Brasil (gracias a [felipeklasen](https://github.com/felipeklasen))

Si utilizas uno de estos idiomas, ya no necesitas proporcionar manualmente un archivo de traducción 🤓.

## Usuarios de Statusfy

Si tu empresa u organización está utilizando Statusfy, te invitamos a dejar tus comentarios, opiniones, impresiones y sugerencias [aquí][user-issue].

Tus comentarios serán una gran motivación para mejorar Statusfy. Estamos muy agradecidos por tus respuestas y apoyo.

## Agradecimientos Especiales

Queremos agradecer a [Thomas Jensen][thomas-jensen] y [Janez Troha][janez-troha] por haber contribuido financieramente al desarrollo de Statusfy a través de [OpenCollective][open-collective]. Estamos muy agradecidos por su contribución.


## Contribuye a Statusfy

Statusfy es un proyecto completamente de [código abierto][statusy-github], creado y mantenido por [Bazzite][bazzite-home]. Todavía es un trabajo en progreso, así que cualquier contribución es bienvenida. Nos apasiona construir una solución versátil y de bajo costo.

También puedes apoyarnos:

  * Dando un [GitHub star ★][statusy-github].
  * [Difundiendo el mensaje][share-twitter].
  * Haciendo una <NuxtLink :to="`${localePath('support')}#sponsoring`">donación</NuxtLink>.
  * O convirtiéndote en <NuxtLink :to="`${localePath('support')}#sponsoring`">Patrocinador</NuxtLink>.



[github-release]: https://github.com/bazzite/statusfy/releases/tag/v0.3.0
[delete-incident]: https://docs.statusfy.co/es/guide/commands.html#delete-incident
[update-incident]: https://docs.statusfy.co/es/guide/commands.html#update-incident
[scheduled-position]: https://docs.statusfy.co/es/config/#scheduled
[docker]: https://hub.docker.com/r/bazzite/statusfy
[thomas-jensen]: https://opencollective.com/thomasjsn
[janez-troha]: https://opencollective.com/janez-troha
[statusy-github]: https://github.com/bazzite/statusfy
[bazzite-home]: https://www.bazzite.com/es?ref=statusfy
[share-twitter]: https://twitter.com/intent/tweet?url=https%3A%2F%2Fstatusfy.co&via=BazziteEs&text=Statusfy%3A%20Un%20estupendo%20sistema%20de%20P%E1gina%20de%20Estado%20de%20c%F3digo%20abierto
[user-issue]: https://github.com/bazzite/statusfy/issues/159
[open-collective]: https://bazzite.xyz/StatusfyOpenCollective#contribute
