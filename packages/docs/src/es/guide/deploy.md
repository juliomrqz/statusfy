---
sidebarDepth: 3
---

# Despliegue

Puedes entregar su Sistema de Páginas de Estado creado con Statusfy de dos maneras diferentes:: **Generación Estática** o **Renderizado por Servidor**.



::: warning RECUERDA

Debes configurar un valor válido de [`baseUrl`](../config/README.md#baseurl) en ` config.js` para que las [URL Alternativas sean completamente válidas](../guide/i18n.md#seo).

:::



Enumeramos algunos servicios diferentes que puedes utilizar para alojar su Sistema de Páginas de Estado. Ten en cuenta la entrega/implementación del sitio compatible con cada servicio:



|                      Servicio                      | Generación Estática |        Renderizado por Servidor        |
|:--------------------------------------------------:|:-------------------:|:--------------------------------------:|
|            [GitHub Pages](#github-pages)           |  <FeatureSupport /> | <FeatureSupport :isSuported="false" /> |
|     [GitLab Pages](#gitlab-pages-and-gitlab-ci)    |  <FeatureSupport /> | <FeatureSupport :isSuported="false" /> |
|                 [Netlify](#netlify)                |  <FeatureSupport /> | <FeatureSupport :isSuported="false" /> |
|                [Firebase](#firebase)               |  <FeatureSupport /> |           <FeatureSupport />           |
|                   [Surge](#surge)                  |  <FeatureSupport /> | <FeatureSupport :isSuported="false" /> |
|                  [Heroku](#heroku)                 |  <FeatureSupport /> |           <FeatureSupport />           |
| [Now <Badge text="v1" type="warn" />](#now-legacy) |  <FeatureSupport /> |           <FeatureSupport />           |
|           [Now <Badge text="v2" />](#now)          |  <FeatureSupport /> |           <FeatureSupport />           |

Las siguientes guías se basan en algunas suposiciones compartidas:

- Estás utilizando la ubicación de destino de compilación predeterminada (./dist).
- Statusfy se instala como una dependencia local en su proyecto, y has configurado los siguientes scripts npm:

``` json
{
  "scripts": {
    "dev": "statusfy dev",
    "generate": "statusfy generate",
    "build": "statusfy build",
    "start": "statusfy start"
  }
}
```

## GitHub Pages

1. Si no tiene ningún dominio personalizado, configura el `baseUrl` correcto en `config.js`. Por ejemplo, si estás desplegando a `https://<username>.github.io/<repo>/`, (por ejemplo, tu repositorio está en `https://github.com/<username>/<username>`), puedes establecer `baseUrl` como `"/<repo>/"` o `"https://<username>.github.io/<repo>/"` (recomendado).

2. Agrega un script de implementación a `package.json`:

```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

3. Y ejecuta:

```bash
#!/usr/bin/env sh

# instala gh-pages
npm install gh-pages --save-dev # o yarn install -D gh-pages

# genera
npm run generate # o yarn run generate

# despliega
npm run deploy # o yarn run deploy
```

Visita las [Páginas de GitHub](https://help.github.com/articles/using-a-custom-domain-with-github-pages/) para obtener información sobre cómo configurar dominios personalizados y obtener información sobre configuraciones avanzadas.

### Referencias

- [Gatsby: How Gatsby Works with GitHub Pages](https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/)
- [Nuxt: How to deploy on GitHub Pages?](https://nuxtjs.org/faq/github-pages)
- [VuePress: Deploying to GitHub Pages](https://vuepress.vuejs.org/guide/deploy.html#github-pages)


## GitLab Pages y GitLab CI

1. Si no tiene ningún dominio personalizado, configura el `baseUrl` correcto en `config.js`. Por ejemplo, si estás desplegando a `https://<username or group>.gitlab.io/<repo>/`, (por ejemplo, tu repositorio está en `https://gitlab.com/<username or group>/<username or group>`), puedes establecer `baseUrl` como `"/<repo>/"` o `"https://<username or group>.gitlab.io/<repo>/"` (recomendado).

2. Cree un archivo llamado `.gitlab-ci.yml` en la raíz de tu proyecto con el contenido a continuación. Esto construirá e implementará tu sitio cada vez que realices cambios en su contenido.

```yaml
image: node:latest

# Esta carpeta se almacena en caché entre las compilaciones
# http://docs.gitlab.com/ce/ci/yaml/README.html#cache
cache:
  paths:
    - node_modules/

pages:
  script:
    - npm install # o yarn install
    - npm run generate -d public # o yarn run generate -d public
  artifacts:
    paths:
      - public
  only:
    - master
```

Visita las [GitLab Pages](https://gitlab.com/help/user/project/pages/getting_started_part_one.md) para aprender cómo configurar dominios personalizados y conocer las configuraciones avanzadas.

### Referencias

- [Gatsby: Deploying to GitLab Pages](https://www.gatsbyjs.org/docs/deploying-to-gitlab-pages/)
- [VuePress: Deploying to GitLab Pages and GitLab CI](https://vuepress.vuejs.org/guide/deploy.html#gitlab-pages-and-gitlab-ci)

## Netlify

1. En Netlify, configura un nuevo proyecto con la siguiente configuración:

- Comando de Compilación: `npm run generate` o `yarn generate`
- Directorio de Publicación: `dist`

Netlify desplegará automáticamente el sitio y lo publicará cada vez que envíes tu repositorio Git.

### Referencias

- [Gatsby: Hosting on Netlify](https://www.gatsbyjs.org/docs/hosting-on-netlify)
- [Nuxt: How to deploy on Netlify?](https://nuxtjs.org/faq/netlify-deployment)
- [VuePress: Deploying to Netlify](https://vuepress.vuejs.org/guide/deploy.html#netlify)

## Firebase

Primero, asegúrese de tener [firebase-tools](https://firebase.google.com/docs/cli/?hl=es) instalado.


### Generación Estática

1. Create el archivo `firebase.json` en la raíz de tu proyecto con el siguiente contenido:

```json
{
 "hosting": {
   "public": "./dist",
   "ignore": []
 }
}
```

2. Crea el archivo `.firebaserc` en la raíz de tu proyecto con el siguiente contenido:

```json
{
 "projects": {
   "default": "<YOUR_FIREBASE_ID>"
 }
}
```

3. Y ejecuta:

```bash
#!/usr/bin/env sh

# genera
npm run generate # o yarn run generate

# depliega
firebase deploy
```

#### Referencias

- [VuePress: Deploying to Firebase](https://vuepress.vuejs.org/guide/deploy.html#google-firebase)

### Renderizado por Servidor

**TODO**

## Surge

1. Asegúrete de tener [surge](https://surge.sh/help/getting-started-with-surge) instalado.

2. Ejecuta:

```bash
#!/usr/bin/env sh

# genera
npm run generate # o yarn run generate

# depliega
surge dist
```

Visite la [Ayuda de Surge](https://surge.sh/help/adding-a-custom-domain) para obtener información sobre cómo configurar un dominio personalizado y obtener información sobre las configuraciones avanzadas.

### Referencias

- [Nuxt: How to deploy with Surge?](https://nuxtjs.org/faq/surge-deployment)
- [VuePress: Deploying to Surge](https://vuepress.vuejs.org/guide/deploy.html#surge)


## Heroku

Primero, instala y configura el [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

### Generación Estática

Puede usar el [Heroku Buildpack Static](https://github.com/heroku/heroku-buildpack-static) para manejar los archivos estáticos de tu sitio.



1. Cree un archivo llamado `static.json` en la raíz de tu proyecto con el contenido a continuación:

```json
{
  "root": "./dist"
}
```

2. Añade al script `heroku-postbuild` en tu archivo `package.json`:

```json
{
  // ...
  "scripts": {
    // ...
    "heroku-postbuild": "npm run generate"
    // ...
  }
  // ...
}
```

3. Configura el control remoto Heroku git:

```bash
#!/usr/bin/env sh

# registrar los cambios
git init
git add .
git commit -m "Mi sistema de página de estado está listo para su despliegue."

# crea una nueva aplicación vacía en Heroku
heroku create

# configurar buildpack para sitios estáticos
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git
```

4. Despliega la aplicación:

```bash
#!/usr/bin/env sh

# publicar el sitio
git push heroku master
```

#### Referencias

- [Gatsby: Deploying to Heroku](https://www.gatsbyjs.org/docs/deploying-to-heroku/)
- [VuePress: Deploying to Heroku](https://vuepress.vuejs.org/guide/deploy.html#heroku)

### Renderizado por Servidor

1. Primero, debe leer la [documentación de Heroku para Node.js](https://devcenter.heroku.com/articles/nodejs-support).

2. Necesitamos decirle a Heroku que instale las `devDependencies` del proyecto:

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

3. Establece el host que la aplicación debería escuchar:

```bash
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production
```

4. Add a `heroku-postbuild` script in your `package.json`:

```json
{
  // ...
  "scripts": {
    // ...
    "heroku-postbuild": "npm run build"
    // ...
  }
  // ...
}
```

5. Cree un archivo llamado `Procfile` en la raíz de su proyecto con el contenido a continuación:

```
web: npm run start
```

6. Despliega la aplicación:

```bash
#!/usr/bin/env sh

# publicar el sitio
git push heroku master
```

#### Referencias

- [Nuxt: How to deploy on Heroku?](https://nuxtjs.org/faq/heroku-deployment)


## Now (legacy) <Badge text="v1" type="warn" />

::: warning IMPORTANTE
La versión v1 de Now está en desuso. Lea el anuncio [aquí](https://zeit.co/blog/now-2).

:::



Primero, debes instalar la CLI de Now globalmente:

```bash
npm install -g now
```

### Generación Estática 

1. Agrega un archivo `now.json` a la raíz del proyecto:

```json
{
  "version": 1,
  "name": "my-cool-statusfy",
  "alias": "my-cool-statusfy",
  "type": "static",
  "files": [
    "dist"
  ],
  "static": {
    "public": "dist"
  }
}
```

2. Agrega un script de despliegue a `package.json`:

```json
{
  "scripts": {
    "deploy": "npm run generate && now && now alias"
  }
}
```

3. Y ejecuta:

```bash
# despliegue
npm run deploy # o yarn run deploy
```

Visita la [Documentación de Now](https://zeit.co/docs/v1/static-deployments/introduction-and-deploying) para aprender cómo personalizar el comportamiento del servicio estático.

#### Referencias

- [Gatsby: Deploying to Now](https://www.gatsbyjs.org/docs/deploying-to-now/)
- [VuePress: Deploying to Now](https://vuepress.vuejs.org/guide/deploy.html#now)

### Renderizado por Servidor

1. Agrega un archivo `now.json` a la raíz del proyecto:

```json
{
  "version": 1,
  "name": "my-cool-statusfy",
  "alias": "my-cool-statusfy",
  "env": {
    "NODE_ENV": "production",
    "NPM_CONFIG_PRODUCTION": "false"
  },
  "engines": {
    "node": "8"
  }
}
```

2. Agrega un script de despliegue a `package.json`:

```json
{
  "scripts": {
    "deploy": "now && now alias"
  }
}
```

3. Y ejecuta:

```bash
# despliegue
npm run deploy # o yarn run deploy
```

Visita la [Documentación de Now](https://zeit.co/docs/v1/deployment-types/node) para obtener más información sobre los despliegues de Node.js.

## Now <Badge text="v2" />

Primero, debes instalar la CLI de Now globalmente:

```bash
npm install -g now
```

### Generación Estática 

1. Agrega un archivo `now.json` a la raíz del proyecto:

```json
{
  "version": 2,
  "name": "my-cool-statusfy",
  "alias": "my-cool-statusfy",
  "builds": [
    { "src": "package.json", "use": "@now/static-build" }
  ]
}
```

2. Crea un archivo llamado `.nowignore` en la raíz de tu proyecto con el contenido a continuación:

```
node_modules
```

3. Agrega un script de despliegue a `package.json`:

```json
{
  "scripts": {
    "now-build": "npm run generate"
  }
}
```

#### Referencias

- [Now: Static Build (@now/static-build)](https://zeit.co/docs/v2/deployments/official-builders/static-build-now-static-build#technical-details)


### Renderizado por Servidor

**TODO**
