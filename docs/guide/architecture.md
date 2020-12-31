---
title: Architecture
description: Statusfy was designed to generate a Status Page System that acts as a Web Application with the JAMstack architecture in mind. The goal is to lower costs and complexity, providing a simpler and versatile Serverless alternative.
date: 2018-10-12T17:28:04Z
permalink: /guide/architecture
---

# Architecture

Statusfy was designed to generate a Status Page System that acts as a Web Application with the [JAMstack](https://jamstack.org/) architecture in mind. The goal is to lower costs and complexity, providing a more straightforward and versatile [**Serverless**](https://serverless.com/learn/overview/) alternative. 

You can serve your Status Page System created with Statusfy in two ways: **Static Generated** or **Server Rendered**.

## Static Generated

When building your Status Page System, you can generate the HTML for every one of the routes and store it in a file. With this, you can host the generated web application on any static hosting!.

### Advantages

- Deploy to any static hosting.
- Fast Response Time: static hostings usually use a CDN.
- Reduce your hosting costs.

### Disadvantages

- You must **regenerate** the web application **at least once a day** to keep updated the Incidents Timeline on the Homepage.
- For a Status Page System with a considerable amount of Incidents, the generation of pages could take a significant amount of time.

## Server Rendered

If you want to reduce your deployment time or do not want to use Static Hosting, you may consider Server Render your Status Page System.

### Advantages

- For a Status Page System with a considerable amount of Incidents, the pages generation time is not an issue.
- Redirection based on the user's browser language

### Disadvantages

- You can't use static hosting.
- You are limited to use a hosting service that supports Node.js.
- Node.js Hosting can be more expensive than Static Hosting.

::: tip NOTE
Node.js is the backend technology used to run Statusfy in a Non-Static Server.
:::
