---
title: Deploying
description: "You can deliver your Status Page System created with Statusfy in two different ways: Static Generated or Server Rendered."
date: 2018-10-12T17:28:04Z
sidebarDepth: 3
permalink: /guide/deploy
---

# Deploying

You can deliver your Status Page System created with Statusfy in two ways: **Static Generated** or **Server Rendered**.

::: warning REMEMBER
You must set a valid [`baseUrl`](../config/README.md#baseurl) value in `config.js` in order to make [Alternate URLs fully-qualified](../guide/i18n.md#seo).
:::

We listed a few different services you can use for hosting your Status Page System. Take into consideration the supported site delivery/deployment for each service:

|                       Service                      |  Static Generated  |             Server Rendered            |
|:--------------------------------------------------:|:------------------:|:--------------------------------------:|
|            [GitHub Pages](#github-pages)           | <FeatureSupport /> | <FeatureSupport :isSuported="false" /> |
|     [GitLab Pages](#gitlab-pages-and-gitlab-ci)    | <FeatureSupport /> | <FeatureSupport :isSuported="false" /> |
|                 [Netlify](#netlify)                | <FeatureSupport /> | <FeatureSupport :isSuported="false" /> |
|                [Firebase](#firebase)               | <FeatureSupport /> | <FeatureSupport :isSuported="false" /> |
|                   [Surge](#surge)                  | <FeatureSupport /> | <FeatureSupport :isSuported="false" /> |
|                  [Heroku](#heroku)                 | <FeatureSupport /> |           <FeatureSupport />           |
| [Now <Badge text="v1" type="warn" />](#now-legacy) | <FeatureSupport /> |           <FeatureSupport />           |
|           [Now <Badge text="v2" />](#now)          | <FeatureSupport /> |           <FeatureSupport />           |

The following guides are based on a few shared assumptions:

- You are using the default build output location (./dist).
- Statusfy is installed as a local dependency in your project, and you have set up the following npm scripts:

``` json
{
  "scripts": {
    "start": "statusfy start",
    "generate": "statusfy generate"
  }
}
```

## GitHub Pages

1. Set the custom domain in `baseUrl` from your `config.js` 

::: warning
Since version `v0.3.0`, deployments under a subpath (e.g. `https://<username>.github.io/<repo>/`) are no longer supported. You need to set up a [custom domain](https://help.github.com/en/articles/quick-start-setting-up-a-custom-domain).
:::

2. Add a deploy script to `package.json`:

```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

3. And run:

```bash
#!/usr/bin/env sh

# install gh-pages
npm install gh-pages --save-dev # or yarn add gh-pages --dev

# generate
npm run generate # or yarn run generate

# deploy
npm run deploy # or yarn run deploy
```

Visit the [GitHub Pages](https://help.github.com/articles/using-a-custom-domain-with-github-pages/) to find out about advanced configurations.

### References

- [Gatsby: How Gatsby Works with GitHub Pages](https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/)
- [Nuxt: How to deploy on GitHub Pages?](https://nuxtjs.org/faq/github-pages)
- [VuePress: Deploying to GitHub Pages](https://vuepress.vuejs.org/guide/deploy.html#github-pages)


## GitLab Pages and GitLab CI

1. Set the custom domain in `baseUrl` from your `config.js` 

::: warning
Since version `v0.3.0`, deployments under a subpath (e.g. `https://<username or group>.gitlab.io/<repo>/`) are no longer supported. You need to set up a [custom domain](https://gitlab.com/help/user/project/pages/getting_started_part_three.md).
:::


2. Create a file called `.gitlab-ci.yml` in the root of your project with the content below. This will build and deploy your site whenever you make changes to your content.

```yaml
image: node:latest

# This folder is cached between builds
# http://docs.gitlab.com/ce/ci/yaml/README.html#cache
cache:
  paths:
    - node_modules/

pages:
  script:
    - npm install # or yarn install
    - npm run generate -- -d public # or yarn run generate -d public
  artifacts:
    paths:
      - public
  only:
    - master
```

Visit the [GitLab Pages](https://gitlab.com/help/user/project/pages/getting_started_part_one.md) to find out about advanced configurations.

## CloudFlare Workers

1. To start, install [CloudFlare Wrangler CLI](https://developers.cloudflare.com/workers/cli-wrangler)

2. Create `wrangler.toml` at the root of your project with the following content:

```
name = "status"
type = "webpack"
account_id = "YOUR CLOUDFLARE ACCOUNT ID"
workers_dev = true

[site]
bucket = "dist"
```

3. Run `wrangler publish`

### References

- [Gatsby: Deploying to GitLab Pages](https://www.gatsbyjs.org/docs/deploying-to-gitlab-pages/)
- [VuePress: Deploying to GitLab Pages and GitLab CI](https://vuepress.vuejs.org/guide/deploy.html#gitlab-pages-and-gitlab-ci)

## Netlify

1. On Netlify, setup up a new project with the following settings:

- Build Command: `npm run generate` or `yarn generate`
- Publish directory: `dist`

Netlify will auto-deploy the site and publish it whenever you push to your Git repo.

### References

- [Gatsby: Hosting on Netlify](https://www.gatsbyjs.org/docs/hosting-on-netlify)
- [Nuxt: How to deploy on Netlify?](https://nuxtjs.org/faq/netlify-deployment)
- [VuePress: Deploying to Netlify](https://vuepress.vuejs.org/guide/deploy.html#netlify)

## Firebase

First, make sure you have [firebase-tools](https://firebase.google.com/docs/cli/?hl=en) installed.


### Static Generated

1. Create `firebase.json` at the root of your project with the following content:

```json
{
 "hosting": {
   "public": "./dist",
   "ignore": []
 }
}
```

2. Create `.firebaserc` at the root of your project with the following content:

```json
{
 "projects": {
   "default": "<YOUR_FIREBASE_ID>"
 }
}
```

3. And run:

```bash
#!/usr/bin/env sh

# generate
npm run generate # or yarn run generate

# deploy
firebase deploy
```

#### References

- [VuePress: Deploying to Firebase](https://vuepress.vuejs.org/guide/deploy.html#google-firebase)

<!-- ### Server Rendered

**TODO** -->

## Surge

1. Make sure you have [surge](https://surge.sh/help/getting-started-with-surge) installed.

2. Run:

```bash
#!/usr/bin/env sh

# generate
npm run generate # or yarn run generate

# deploy
surge dist
```

Visit the [Surge Help](https://surge.sh/help/adding-a-custom-domain) to learn how to set up a custom domain and find out about advanced configurations.

### References

- [Nuxt: How to deploy with Surge?](https://nuxtjs.org/faq/surge-deployment)
- [VuePress: Deploying to Surge](https://vuepress.vuejs.org/guide/deploy.html#surge)


## Heroku

First, install and configure the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

### Static Generated

You can use the [Heroku Buildpack Static](https://github.com/heroku/heroku-buildpack-static) to handle your site's static files.

1. Create a file called `static.json` in the root of your project with the content below:

```json
{
  "root": "./dist"
}
```

2. Add a `heroku-postbuild` script in your `package.json`:

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

3. Set up the Heroku git remote:

```bash
#!/usr/bin/env sh

# register changes
git init
git add .
git commit -m "My Status Page System is ready for deployment."

# creates a new empty application on Heroku
heroku create

# set buildpack for static sites
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git
```

4. Deploying the application:

```bash
#!/usr/bin/env sh

# publish site
git push heroku master
```

#### References

- [Gatsby: Deploying to Heroku](https://www.gatsbyjs.org/docs/deploying-to-heroku/)
- [VuePress: Deploying to Heroku](https://vuepress.vuejs.org/guide/deploy.html#heroku)

### Server Rendered

1. First, you should read the [Heroku documentation for Node.js](https://devcenter.heroku.com/articles/nodejs-support).

2. We need to tell Heroku to install the `devDependencies` of the project:

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

3. Set the host the application should listen to:

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

5. Create a file called `Procfile` in the root of your project with the content below:

```
web: npm run start
```

6. Deploying the application:

```bash
#!/usr/bin/env sh

# publish site
git push heroku master
```

#### References

- [Nuxt: How to deploy on Heroku?](https://nuxtjs.org/faq/heroku-deployment)


## Now (legacy) <Badge text="v1" type="warn" />

::: warning IMPORTANT
The version v1 of Now is deprecated. Read the announcement [here](https://zeit.co/blog/now-2).
:::

First, you must install the Now CLI globally: 

```bash
npm install -g now
```

### Static Generated 

1. Add a `now.json` file to the project root:

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

2. Add a deploy script to `package.json`:

```json
{
  "scripts": {
    "deploy": "npm run generate && now && now alias"
  }
}
```

3. And run:

```bash
# deploy
npm run deploy # or yarn run deploy
```

Visit the [Now Docs](https://zeit.co/docs/v1/static-deployments/introduction-and-deploying) to learn how to customize the static serving behavior.

#### References

- [Gatsby: Deploying to Now](https://www.gatsbyjs.org/docs/deploying-to-now/)
- [VuePress: Deploying to Now](https://vuepress.vuejs.org/guide/deploy.html#now)

### Server Rendered

1. Add a `now.json` file to the project root:

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

2. Add a deploy script to `package.json`:

```json
{
  "scripts": {
    "deploy": "now && now alias"
  }
}
```

3. And run:

```bash
# deploy
npm run deploy # or yarn run deploy
```

Visit the [Now Docs](https://zeit.co/docs/v1/deployment-types/node) for more information about Node.js deployments.

## Now <Badge text="v2" />

First, you must install the Now CLI globally: 

```bash
npm install -g now
```

### Static Generated 

1. Add a `now.json` file to the project root:

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

2. Create a file called `.nowignore` in the root of your project with the content below:

```
node_modules
```

3. Add a deploy script to `package.json`:

```json
{
  "scripts": {
    "now-build": "npm run generate"
  }
}
```

#### References

- [Now: Static Build (@now/static-build)](https://zeit.co/docs/v2/deployments/official-builders/static-build-now-static-build#technical-details)


### Server Rendered

At this time, you cannot deploy a Server Rendered Statusfy app with Now v2. Please use Now v1.
