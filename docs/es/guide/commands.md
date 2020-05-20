---
title: Comandos
description: Statusfy viene con un conjunto de comandos útiles, tanto para fines de desarrollo como de producción. Puedes usar --help con cualquier comando para obtener un uso detallado.
date: 2018-10-12T17:28:04Z
permalink: /guide/commands
---

# Comandos

Statusfy viene con un conjunto de comandos útiles, tanto para fines de desarrollo como de producción. Puedes usar `--help` con cualquier comando para obtener un uso detallado.


## init

Crea una proyecto base.

``` bash
statusfy init
```

### Argumentos

- `-d` o `--dir`: especifica el directorio de instalación (por defecto: directorio actual/de trabajo).

## dev

Inicia la aplicación en modo de desarrollo (recarga de código en caliente, informe de errores, etc.).

``` bash
statusfy dev
```

### Argumentos

- `-p <port>` o `--port <port>`: usa el **puerto** especificado (predeterminado: 3000).
- `-s` o `--ssr`: forza SSR (Server-Side Rendering).

## build

Compila la aplicación para el despliegue de producción.

``` bash
statusfy build
```

::: warning ADVERTENCIA
Después de ejecutar este comando, debes iniciar la aplicación utilizando el comando [`statusfy start`](#start).
:::

### Argumentos

- `-a` o `--analyze`: lanzar el análisis final del paquete. ***Esto no debe ser utilizado para producción***.

## generate

Generar una aplicación web estática (renderizado por servidor).

``` bash
statusfy generate
```

### Argumentos

- `-d` o `--dir`: especificar el directorio de destino (predeterminado: ./dist)
- `-a` o `--analyze`: lanzar el análisis final del paquete. ***Esto no debe ser utilizado para producción***.

## start

Inicia la aplicación en modo producción.

``` bash
statusfy start
```

::: warning ADVERTENCIA
La aplicación se debe compilar con [`statusfy build`](#build) primero.
:::

### Argumentos

- `-p <port>` o `--port <port>`: usa el **puerto** especificado (predeterminado: 3000).
- `-H <port>` o `--host <host>`: usa el **host** especificado (predeterminado: 127.0.0.1).

## new-incident

Crea un nuevo incidente después de responder algunas preguntas. Se generará un archivo Markdown inicial para tu incidente en todos los idiomas disponibles.

``` bash
statusfy new-incident
```

The name of the created file follows this pattern:

```
YYYY-MM-DD_slug.md
```

Donde `YYYY-MM-DD` es la ***fecha de creación*** y `slug` un ***nombre corto***.


## delete-incident <Badge text="0.3.0+"/>

Eliminar un incidente incluyendo sus traducciones.

``` bash
statusfy delete-incident
```

## update-incident <Badge text="0.3.0+"/>

Actualizar los valores comunes de un incidente y sus traducciones.

``` bash
statusfy update-incident
```
