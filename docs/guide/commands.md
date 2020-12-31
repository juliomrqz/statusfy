---
title: Commands
description: Statusfy comes with a set of useful commands, both for development and production purposes. You can use `--help` with any command to get detailed usage.
date: 2018-10-12T17:28:04Z
permalink: /guide/commands
---

# Commands

Statusfy comes with a set of useful commands, both for development and production purposes. You can use `--help` with any command to get detailed usage.

## init

Create a base project.

``` bash
statusfy init
```

### Arguments

- `-d` or `--dir`: specify the installation directory (default: current/working directory).

## start

Starts the application in development mode (hot-code reloading, error reporting, etc.).

``` bash
statusfy start
```

### Arguments

- `-p <port>` or `--port <port>`: use specified **port** (default: 3000).
- `-s` or `--ssr`: force SSR (Server-Side Rendering).

## generate

Generate a static web application.

``` bash
statusfy generate
```

### Arguments

- `-d` or `--dir`: specify generate output dir (default: ./dist)
- `-a` or `--analyze`: launch the final bundle analysis. ***This should not be used for production***. 

## new-incident

Creates a new incident after answering a few questions. An initial Markdown file is generated for your incident for all the available languages.

``` bash
statusfy new-incident
```

The name of the created file follows this pattern:

```
YYYY-MM-DD_slug.md
```

where `YYYY-MM-DD` is the ***creation date*** and `slug` a ***short name***.

## delete-incident  <Badge text="0.3.0+"/>

Delete an incident, including its translations.

``` bash
statusfy delete-incident
```

## update-incident  <Badge text="0.3.0+"/>

Update the shared values of an incident and its translations.

``` bash
statusfy update-incident
```
