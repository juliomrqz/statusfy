---
title: "Actualización v0.2.0"
slug: "statusfy-release-0-2-0"
author: patriciajumper
description: "Acabamos de lanzar una nueva versión de Statusfy con nuevas funciones que pueden mejorar la experiencia de los usuarios/clientes de tu Sistema de Páginas de estado: Mantenimiento Programado, Notificaciones y Mapa de Sitio."
published: "2018-12-11T16:25:29Z"
created: "2018-12-11T16:25:29.723915Z"
canonical: https://www.bazzite.com/es/blog/statusfy-release-0-2-0
---

Acabamos de lanzar una [nueva versión][github-release] de Statusfy con nuevas funciones que pueden mejorar la experiencia de los usuarios de tu Sistema de Páginas de estado: ***Mantenimiento Programado***, ***Notificaciones*** y ***Mapa de Sitio***.

## Mantenimiento Programado

<ImageResponsive
  source="blog/statusfy-release-v-0-2-0/scheduled-maintenance-es.jpg"
  alt="Statusfy - Mantenimiento Programado"
  :fluid="true"
  :width="879"
  :height="278"
/>

La definición de [Mantenimiento Programados][docs-scheduled-maintenance] es una forma de informar con anticipación a tus usuarios cuando su sistema no puede manejar solicitudes debido a una actualización de mantenimiento temporal.

Tratamos de mantener la definición de Mantenimiento Programado lo más simple posible, compartiendo los mismos parámetros de los incidentes regulares pero agregando dos nuevos parámetros: [***scheduled***][docs-scheduled-maintenance] y [***duration***][docs-scheduled-maintenance].

## Notificaciones

Con la nueva [funcionalidad de Notificaciones][docs-notifications] puedes mantener a tus usuarios notificados con cualquier actualización de Incidentes que pueda tener tu Sistema.  Los espectadores de su página de estado pueden acceder a las siguientes opciones haciendo clic en el botón Suscribirse.

- **Feeds Atom y RSS:** Estos feeds incluyen todos los incidentes Mantenimientos Programados que han pasado. Tus usuarios pueden usar lectores de feeds o herramientas como [IFTT][iftt-rss] y [Zapier][zapier-rss] para recibir notidicaciones de estos feeds..
- **iCalendar:** Tus usuarios pueden suscribirse a un calendario que contiene todos tus Mantenimientos Programados futuros y pasados. El calendario se publica utilizando iCalendar, un formato popular que es compatible con la mayoría de las aplicaciones de calendario modernas.
- **Twitter:** Define cuentas de Twitter a las que tus usuarios pueden acceder para recibir actualizaciones.
- **Support Site:** Define Sitios de Soporte externos que puedan acceder tus usuarios para recibir actualizaciones de otras fuentes que desees proporcionar.

***La mayoría de estas opciones de notificación están habilitadas de forma predeterminada, pero puedes deshabilitarlas en tu archivo de configuración. Más información [aquí][docs-docs-notifications].***


## Mapa de Sitio

Ahora puedes indicarle a los bots de los motores de búsqueda las páginas disponible en tu Sistema de Pagina de Estado con el **Mapa de Sitio**. Esto puede ayudar a que todas las páginas de tu sistema puedan ser encontradas con más facilidad.

## Contribuye a Statusfy

Statusfy es un proyecto completamente abierto, creado y actualizado por [Bazzite][bazzite-home]. Todavía es un trabajo en progreso, por lo que cualquier contribución es bienvenida. Nos apasiona construir una solución versátil y de menor costo.

También puedes ayudarnos dando una [estrella en GitHub ★][statusy-github], corriendo la voz o <NuxtLink :to="`${localePath('support')}#sponsoring`">dando una donación</NuxtLink> 🤓.



[bazzite-home]: https://www.bazzite.com/es
[statusy-github]: https://github.com/bazzite/statusfy
[docs-scheduled-maintenance]: https://docs.statusfy.co/es/guide/incidents.html#mantenimiento-programado
[docs-notifications]: https://docs.statusfy.co/es/guide/notifications.html
[docs-docs-notifications]: https://docs.statusfy.co/es/config/#notifications
[github-release]: https://github.com/bazzite/statusfy/releases/tag/v0.2.0
[iftt-rss]: https://ifttt.com/feed
[zapier-rss]: https://zapier.com/apps/rss/integrations
