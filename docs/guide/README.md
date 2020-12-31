---
title: Introduction
description: Statusfy is a Status Page System that is easy to use and completely Open Source. You can create a Static Generated or Server Rendered System and easily deploy it to several hosting services.
date: 2018-10-12T17:28:04Z
---

# Introduction

Statusfy is a Status Page System that is easy to use and completely Open Source. You can create a [**Static Generated**](../guide/architecture.md#static-generated) or [**Server Rendered**](../guide/architecture.md#server-rendered) System and easily deploy it to a variety of [hosting services](../guide/deploy.md#services).

![Statusfy Homepage](/assets/img/statusfy-home-en.png =1280x829)

## How It Works

A Statusfy site is a Status Page System Generator that acts as a web application, created with [Vue](http://vuejs.org/), [Nuxt.js](https://nuxtjs.org/) and [Tailwind CSS](https://tailwindcss.com/). But don't worry, you don't need to know how to use these fantastic technologies. Just create your [Incidents](../guide/incidents.md) using Markdown and **Statusfy** generates all the necessary pieces for your Status Page System.

The final web application can be [generated or built](../guide/deploy.md) from a single CLI and can be [easily configured](../guide/pwa.md) or [customized](../guide/theme-customization.md) to your style requirements. 

## Features

- [Progressive Web App (PWA) Support](../guide/pwa.md)
- [Google Analytics Integration](../config/README.md#ga)
- [Multi-language support](./i18n.md)
- A default theme with:
  - Responsive layout
  - [Easy Customization](../guide/theme-customization.md)
  - Beautiful Design 
- SEO Friendly
- [Hosting flexibility: Static Generated or Server Rendered](../guide/deploy.md)
- [Web Push Notifications](/guide/notifications/#web-push)

## Todo

Statusfy is still a work in progress. There are a few things that are not currently supported but are planned:

- Notifications: Webhooks, etc.
- A Statusfy GUI: create and manage your project in an easier way.
- Metrics.
- Custom Themes support.
- Different Data Sources: MySQL, PostgreSQL, SQLite, etc.

[:nerd_face: Contributions are welcome!](../contributing/README.md)
