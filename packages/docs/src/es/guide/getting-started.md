# Primeros Pasos

Comenzar con Statusfy es realmente sencillo, solo tiene que centrarse en escribir su contenido y utilizar el [CLI](../guide/commands.md) para crear y desplegar tu sitio web.



::: warning NOTA DE COMPATIBILIDAD
Statusfy requiere Node.js >= 8.
:::



## Instalación

``` bash
# cambia el directorio de trabajo
cd existing_folder

# instala globalmente
npm install -g statusfy # O yarn global add statusfy

# ejecuta el comando de inicialización
statusfy init

# y responde a las preguntas requeridas
```

Se generará una estructura básica para tu proyecto. En el archivo `package.json` estarán disponibles estos comandos para el desarrollo y despliegue de tu Sistema de Página de Estado:

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

Puedes crear un nuevo incidente con:

``` bash
npm run new-incident # O yarn new-incident
```

y lanzar el servidor de desarrollo con:

``` bash
npm run dev # O yarn dev
```

Puede generar un sitio web [Estático](../guide/architecture.md#generacion-estatica) (archivos HTML precompilados) con:

``` bash
npm run generate # O yarn generate
```

::: tip
Los archivos construidos estarán en `./dist`, que se puede configurar a través del argumento `--dest`. Más información en la [Guía de comandos](../guide/commands.md#generate).

:::

o generar un sitio web [Renderizado por Servidor](../guide/architecture.md#renderizado-por-servidor) con:

``` bash
# generar archivos estáticos
npm run build # O yarn build

# lanzar el servidor
npm run start # O yarn start
```

De forma predeterminada, los archivos de origen de Markdown estarán en la carpeta `./content`, la cual se puede configurar a través del [campo dir](../config/README.md#dir) en `./config.js`.

Consulta la [Guía de Despliegue](../guide/deploy.md#despliegue) para obtener más información sobre el Despliegue a servicios populares.



