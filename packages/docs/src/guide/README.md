# Introduction

Statusfy is a simple open source Status Page system designed to be built and maintained with minimum effort. You can easily create a fast Status Page Website either [**Static Generated**](../guide/deploy.md#static-generated) or [**Server Rendered**](../guide/deploy.md#server-rendered) and easily deploy it to a variety of [hosting services](../guide/deploy.md#services).

![An image](/assets/img/statusfy-home-en.png)

## How It Works

A Statusfy site is a SPA (Simple Page Application) Website created with [Vue](http://vuejs.org/), [Nuxt.js](https://nuxtjs.org/) and [Tailwind](https://tailwindcss.com/). But, don't worry, you don't need to know how to use these amazing Technologies, you just create your [Incidents](../guide/incidents.md) using Markdown and **Statusfy** generates all the needed logic of your Status Page System.

The final Web Aplication can be [generated or built](../guide/deploy.md) from a single CLI, can be [easily configured](../guide/pwa.md) or [customized](../guide/theme-customization.md) with your Style requirements. 

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

- A Statusfy GUI: create and manage your project in an easier way.
- Notifications
- Metrics
- RSS
- Plugins support
- Custom Themes support
- Different Data Sources: MySQL, PostgreSQL, NoSQL alternatives, etc.

[Contributions are welcome!](https://github.com/bazzite/statusfy)
