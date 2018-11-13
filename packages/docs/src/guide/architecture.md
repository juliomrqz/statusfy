# Architecture

Statusfy was designed to generate a Status Page System that acts as a Web Application with the [JAMstack](https://jamstack.org/) architecture in mind. The goal behind is to lower costs and complexity providing a simpler and versatile [**Serverless**](https://serverless.com/learn/overview/) alternative. 

You can serve your Status Page System created with Statusfy in two different ways: **Static Generated** or **Server Rendered**.

## Static Generated

When building your Status Page System, you can generate the HTML for every one of the routes and store it in a file. With this, you can host the generated web application on any static hosting!.

### Advantages

- Deploy to any static hosting.
- Fast Response Time: static hostings usually use a CDN.
- Reduce your hosting costs.

### Disadvantages

- You must **regenerate** the web application **at least once a day** in order to keep updated the Incidents Timeline on the Homepage.
- For a Status Page System with a huge amount of Incidents, the pages generation could take a significant amount of time.

## Server Rendered

If you want to reduce your deployment time or just not want to use a Static Hosting, you may consider Server Render your Status Page System.

### Advantages

- For a Status Page System with a huge amount of Incidents, the pages generation time is not an issue.
- Redirection based on user's browser language

### Disadvantages

- You can't use a static hosting.
- You are limited to use a hosting service that supports Node.js.
- Node.js Hosting can be more expensive than a Static Hosting.

::: tip NOTE
Node.js is the backend technology used to run Statufy in a Non-Static Server.
:::

