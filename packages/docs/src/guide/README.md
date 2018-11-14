# Introduction

Statusfy is a Status Page System, easy to use and completely Open Source. You can easily create a fast System either [**Static Generated**](../guide/architecture.md#static-generated) or [**Server Rendered**](../guide/architecture.md#server-rendered) and easily deploy it to a variety of [hosting services](../guide/deploy.md#services).

![Statusfy Homepage](/assets/img/statusfy-home-en.png =1280x829)

## How It Works

A Statusfy site is a Status Page System Generator that acts as a Web Application, created with [Vue](http://vuejs.org/), [Nuxt.js](https://nuxtjs.org/) and [Tailwind CSS](https://tailwindcss.com/). But, don't worry, you don't need to know how to use these amazing Technologies, you just create your [Incidents](../guide/incidents.md) using Markdown and **Statusfy** generates all the needed logic of your Status Page System.

The final Web Application can be [generated or built](../guide/deploy.md) from a single CLI, can be [easily configured](../guide/pwa.md) or [customized](../guide/theme-customization.md) with your Style requirements. 

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

## Todo

Statusfy is still a work in progress. There are a few things that are not currently supported but are planned:

- Atom and RSS Feeds.
- Notifications: Web Push, Webhooks, etc.
- A Statusfy GUI: create and manage your project in an easier way.
- Metrics.
- Custom Themes support.
- Different Data Sources: MySQL, PostgreSQL, SQLite, etc.

[:nerd_face: Contributions are welcome!](../contributing/README.md)
