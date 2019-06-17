---
title: "Actualización v0.4.0"
slug: "statusfy-release-0-4-0"
author: juliomrqz
description: "Acabamos de lanzar una nueva versión de Statusfy con soporte para Notificaciones Web Push, mejoras en el rendimiento y una nueva traducción de la interfaz: italiano."
published: "2019-06-15T13:58:14Z"
created: "2019-06-15T13:58:14Z"
canonical: https://www.bazzite.com/es/blog/statusfy-release-0-3-0
spectrum:
  - channel: statusfy
  - id: f5befabd-d36e-4256-a69b-0a6474c6942e
---

Acabamos de lanzar una nueva [versión][github-release] menor de Statusfy centrada en corregir errores, actualizar dependencias y mejorar del rendimiento con algunas nuevas funcionalidades: [Notificaciones Web Push](#notificaciones-web-push), [Analíticas Offline](#analíticas-offline) y traducción al italiano. Además, tenemos un lugar mejor para tus preguntas y dudas, nuestro [Chat de la Comunidad][community-chat] 🤓

## Notificaciones Web Push

Tus usuarios ahora pueden suscribirse a [Notificaciones Web Push][statusfy-docs-web-push] desde sus navegadores. Estas notificaciones sólo pueden enviarse a los usuarios que hayan aceptado recibirlas.

Por ahora, esta funcionalidad es soportada por OneSignal, un servicio de notificación push gratuito, de gran volumen y fiable para sitios web y aplicaciones móviles. En el futuro, planeamos soportar más proveedores, si tienes uno en mente, por favor sugiérelo en el [Chat de la Comunidad][community-chat].

## Analíticas Offline

El soporte Offline y el almacenamiento en caché del navegador los proporciona **Workbox**, una librería Javascript de Google que facilita estas tareas. La actualizamos a la última versión aportando un mejor rendimiento y **Offline Google Analytics**: todavía puedes entender cómo interactúan los usuarios con tu Sistema de Páginas de Estado incluso cuando no tienen conectividad.

## Chat de la Comunidad

Creemos que el éxito de cualquier producto se define en gran medida por la **interacción** y la **fuerte conexión** con los usuarios. Es por eso que decidimos crear un canal de comunicación para Statusfy en nuestro [Chat de la Comunidad][community-chat]. Cualquier pregunta, duda o inquietud son bienvenidas.

## Comentarios, impresiones y sugerencias

Si tu organización está utilizando Statusfy, te invitamos a dejar tus comentarios, impresiones y sugerencias en nuestro [Chat de la Comunidad][user-issue].

## Apóyanos 🙏

Uno de los principales objetivos de Statusfy es **ahorrarte dinero**. Este proyecto es completamente de [código abierto][statusy-github] y todavía es un trabajo en progreso, así que cualquier contribución es bienvenida.

**Si utilizas Statusfy en tu empresa, considera la posibilidad de contribuir a nuestro [OpenCollective][open-collective].**


[statusfy-docs-web-push]: https://docs.statusfy.co/es/guide/notifications/#web-push
[github-release]: https://github.com/bazzite/statusfy/releases/tag/v0.4.0
[statusy-github]: https://github.com/bazzite/statusfy
[open-collective]: https://bazzite.xyz/StatusfyOpenCollective#contribute
[community-chat]: https://spectrum.chat/bazzite/statusfy
[user-issue]: https://spectrum.chat/bazzite/statusfy/statusfy-users~0e09d9ec-ea7a-4a19-985e-ba35045d8a55
