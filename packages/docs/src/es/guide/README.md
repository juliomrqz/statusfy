---
title: Introducción
description: Statusfy es un Sistema de Página de Estado, fácil de usar y completamente de código abierto. Puedes crear fácilmente un Sistema rápido, ya sea Stático o Renderizado por Servidor e implementarlo fácilmente en una variedad de servicios de alojamiento.
date: 2018-10-12T17:28:04Z
---

# Introducción

Statusfy es un Sistema de Página de Estado, fácil de usar y completamente de código abierto. Puedes crear fácilmente un Sistema rápido, ya sea [**Stático**](../guide/architecture.md#generacion-estatica) o [**Renderizado por Servidor**](../guide/architecture.md#srenderizado-por-servidor) e implementarlo fácilmente en una variedad de [servicios de alojamiento](../guide/deploy.md).

![Statusfy Homepage](/assets/img/statusfy-home-es.png =1280x829)

## Cómo Funciona

Un sitio Statusfy es un generador de sistema de páginas de estado que actúa como una aplicación web, creada con [Vue](http://vuejs.org/), [Nuxt.js](https://nuxtjs.org/) and [Tailwind CSS](https://tailwindcss.com/). Pero, no te preocupes, no necesitas saber cómo usar estas increíbles tecnologías, simplemente crea tus [Incidentes](../guide/incidents.md) utilizando Markdown y **Statusfy** genera toda la lógica necesaria de tu Sistema de Páginas de Estado.

La aplicación web final se puede [generar o construir](../guide/deploy.md) a partir de un solo CLI y [se puede configurar](../guide/pwa.md) o personalizar fácilmente con tus requisitos de estilo.



## Funcionalidades

- [Soporte para Aplicación Web Progresiva (PWA)](../guide/pwa.md)
- [Integración de Google Analytics](../config/README.md#ga)
- [Soporte Multi-idioma](./i18n.md)
- Un tema por defecto con:
  - Diseño Responsive
  - [Fácil Personalización](../guide/theme-customization.md)
  - Hermoso Diseño
- Amigable con el SEO
- [Flexibilidad de alojamiento: Generación Estática o Renderizado por Servidor](../guide/deploy.md)
- [Notificaciones Web Push](/es/guide/notifications/#web-push)


## Por hacer

Statusfy es todavía un trabajo en progreso. Hay algunas cosas que actualmente no están soportadas pero están planeadas:

- Notificaciones: Webhooks, etc.
- Una GUI de Statusfy: crea y administra tu proyecto de una manera más fácil.
- Métrica.
- Soporte de Temas Personalizados.
- Diferentes fuentes de datos: MySQL, PostgreSQL, SQLite, etc.



[:nerd_face: ¡Cualquier contribución en bienvenida!](../contributing/README.md)
