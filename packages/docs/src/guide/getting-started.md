---
title: Getting Started
description: Starting with Statusfy is really easy, you just focus on writing your content and making use of the CLI for building and deploying your Website.
date: 2018-10-12T17:28:04Z
permalink: /guide/getting-started
---

# Getting Started

Starting with Statusfy is really easy, you just focus on writing your content and making use of the [CLI](../guide/commands.md) for building and deploying your Website.

::: warning COMPATIBILITY NOTE
Statusfy requires Node.js >= 8.
:::

## Installation

Make sure you have [npx](https://www.npmjs.com/package/npx) installed (`npx` is shipped by default since [npm](https://www.npmjs.com/get-npm) `5.2.0`)

``` bash
# change the working directory
cd existing_folder

# run the initialization command
npx statusfy init

# and install your local dependencies
npm install  # OR yarn install
```

It will be generated a basic structure for your project. In the `package.json` file will be available these commands for the development and deployment of your Status Page System:

``` json
{
  "scripts": {
    "dev": "statusfy dev",
    "build": "statusfy build",
    "start": "statusfy start",
    "generate": "statusfy generate",
    "new-incident": "statusfy new-incident"
  }
}
```

You can create a new incident with:

``` bash
npm run new-incident # OR yarn new-incident
```

and launch the development server with:

``` bash
npm run dev # OR yarn dev
```

You can generate a [Static Generated](../guide/architecture.md#static-generated) Website (pre-built HTML files) with:

``` bash
npm run generate # OR yarn generate
```

::: tip
The built files will be in `./dist`, which can be configured via the `--dest` argument. More info in the [Commands Guide](../guide/commands.md#generate).
:::

or generate a [Server Rendered](../guide/architecture.md#server-rendered) Website with:

``` bash
# generate static assets
npm run build # OR yarn build

# launch the server
npm run start # OR yarn start
```

By default, the Markdown source files will be in `./content`, which can be configured via the [dir field](../config/README.md#dir) in `./config.js`.

The built files can be deployed as [**Static Generated**](../guide/architecture.md#static-generated) or [**Server Rendered**](../guide/architecture.md#server-rendered) Website. See [Deployment Guide](../guide/deploy.md) for guides on deploying to popular services.



