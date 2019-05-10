# Commands

Statusfy comes with a set of useful commands, both for development and production purposes. You can use `--help` with any command to get detailed usage.


## init

Create a base project.

``` bash
statusfy init
```

### Arguments

- `-d` or `--dir`: specify the installation directory (default: current/working directory).

## dev

Starts the application in development mode (hot-code reloading, error reporting, etc.).

``` bash
statusfy dev
```

### Arguments

- `-p <port>` or `--port <port>`: use specified **port** (default: 3000).
- `-s` or `--ssr`: force SSR (Server-Side Rendering).

## build

Compiles the application for production deployment.

``` bash
statusfy build
```

::: warning
After executing this command, you should launch the application using the [`statusfy start`](#start) command.
:::

### Arguments

- `-a` or `--analyze`: launch the final bundle analysis. ***This should not be used for production***. 

## generate

Generate a static web application (server-rendered).

``` bash
statusfy generate
```

### Arguments

- `-d` or `--dir`: specify generate output dir (default: ./dist)
- `-a` or `--analyze`: launch the final bundle analysis. ***This should not be used for production***. 

## start

Starts the application in production mode.

``` bash
statusfy start
```

::: warning
The application should be compiled with [`statusfy build`](#build) first.
:::

### Arguments

- `-p <port>` or `--port <port>`: use specified **port** (default: 3000).
- `-H <port>` or `--host <host>`: use specified **host** (default: 127.0.0.1).

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

Delete an incident including its translations.

``` bash
statusfy delete-incident
```

## update-incident  <Badge text="0.3.0+"/>

Update the common values of an incident and its translations.

``` bash
statusfy update-incident
```
