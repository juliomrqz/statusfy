---
title: "Introducing Statusfy: A Marvelous Open Source Status Page System"
slug: "introducing-statusfy-marvelous-open-source-status-page-system"
author: juliomrqz
description: "Statusfy is a Status Page System, easy to use and completely Open Source. You can easily create a fast System either Static Generated or Server Rendered and easily deploy it to a variety of hosting services."
published: "2018-11-14T14:58:34Z"
created: "2018-11-14T14:58:34.140255Z"
canonical: https://www.bazzite.com/blog/introducing-statusfy-marvelous-open-source-status-page-system
---


<NuxtLink :to="`${localePath('index')}`">Statusfy</NuxtLink> is a Status Page System, easy to use and completely Open Source. You can easily create a fast System either **Static Generated** or **Server Rendered** and easily deploy it to a variety of hosting services. The goal behind is to lower costs and complexity providing a simpler and versatile Open Source alternative.

But, you may be thinking: Why do I need a Status Page System?. These systems are pretty simple and have one main task: communicate the status of an application or service. Nowadays, every single SaaS product should have a Status Page System, they allow us to increase customer confidence and reduce customer frustration about any service disruptions by giving retrospectives (also called Root Cause Analysis). With these systems, you can notify about service disruptions, planned maintenance or possible outages through multiple channels: email, SMS, Push, Webhooks, etc.


## Another Status Page System. Why?

Currently, you can find several paid and open source Status Page Systems, but Statusfy is different, it was designed to generate one of these Systems that acts as a Web Application with the [JAMstack][jamstack] and  [Serverless][serverless] architecture in mind. It can  also be created an [Isomorphic][isomorphic] application with Server Side Rendering if static contents are not a suitable choice. With these approaches, we wanted to enjoy a Status Page System that gives us better performance, higher security, cheaper hosting, and a better user experience.

## Technology Behind

A Statusfy site is a Web Application, created with [Vue][vue], [Nuxt.js][nuxt] and [Tailwind CSS][tailwindcss]: we use **Vue** to dynamically define the interfaces that represent the data, **Nuxt.js** to make a quick and useful abstraction of the client and server logic, and **Tailwind CSS** to rapidly define the style of the default theme.

Besides, the System Incidents are created using **Markdown** and Statusfy generates all the needed logic of your Status Page. The final Web Application can be generated from a single CLI, can be easily configured or customized with your Style requirements.

On the other hand, you can serve your Status Page System created with Statusfy in two different ways: 

1. **Static Generated:** you can generate the HTML for every one of the routes and store it in a file. With this, you can host the generated web application on any static hosting!.
2. **Server Rendered:** If you want to reduce your deployment time or just not want to use a Static Hosting, you may consider rendering the pages on both the server and client side.

For these two ways of delivering your Statusfy Application, you can use great Hosting services. We created examples projects so you can start playing around right away with different popular hosting services you may want to use:


|                                                              |                       Example Project                        |                       Example Project                        |
| ------------------------------------------------------------ | :----------------------------------------------------------: | :----------------------------------------------------------: |
| **Service**                                                  |                     **Static Generated**                     |                     **Server Rendered**                      |
| [GitHub Pages](https://docs.statusfy.co/guide/deploy.html#github-pages) | [Yes](https://github.com/bazzite/statusfy-examples/blob/master/github-pages/static-generated) |                              No                              |
| [GitLab Pages](https://docs.statusfy.co/guide/deploy.html#gitlab-pages-and-gitlab-ci) | [Yes](https://github.com/bazzite/statusfy-examples/blob/master/gitlab-pages/static-generated) |                              No                              |
| [Netlify](https://docs.statusfy.co/guide/deploy.html#netlify) | [Yes](https://github.com/bazzite/statusfy-examples/blob/master/netlify/static-generated) |                              No                              |
| [Firebase](https://docs.statusfy.co/guide/deploy.html#firebase) | [Yes](https://github.com/bazzite/statusfy-examples/blob/master/firebase/static-generated) | [Yes](https://github.com/bazzite/statusfy-examples/blob/master/firebase/server-rendered) |
| [Surge](https://docs.statusfy.co/guide/deploy.html#surge)    | [Yes](https://github.com/bazzite/statusfy-examples/blob/master/surge/static-generated) |                              No                              |
| [Heroku](https://docs.statusfy.co/guide/deploy.html#heroku)  | [Yes](https://github.com/bazzite/statusfy-examples/blob/master/heroku/static-generated) | [Yes](https://github.com/bazzite/statusfy-examples/blob/master/heroku/server-rendered) |
| [Now](https://docs.statusfy.co/guide/deploy.html#now)        | [Yes](https://github.com/bazzite/statusfy-examples/blob/master/now/static-generated) | [Yes](https://github.com/bazzite/statusfy-examples/blob/master/heroku/server-rendered) |

## Creating a Status Page System

It’s pretty easy to get started with Statusfy. Install it globally with npm:

***Make sure you have [npx][npx] installed (`npx` is shipped by default since [npm][npm] `5.2.0`)***

```bash
# change the working directory
cd existing_folder

# run the initialization command
npx statusfy init

# and install your local dependencies
npm install  # OR yarn install
```

Create a new incident with this command:

```bash
npm run new-incident # OR yarn new-incident
```

and launch the development server with:

```bash
npm run dev # OR yarn dev
```

You can also generate a Static Generated Website with:

```bash
npm run generate # OR yarn generate
```

or generate a Server Rendered Website with:

```bash
# generate static assets
npm run build # OR yarn build

# launch the server
npm run start # OR yarn start
```


## What's next

In the next couple of months, we're going to continue to improve the [documentation][statusy-docs], <NuxtLink :to="`${localePath('blog')}`">create tutorials</NuxtLink>, [fix bugs][statusy-github], create a Project Editor, and add [extra features][statusy-docs-todo].


## Contribute to Statusfy

Statusfy is a completely open source project, sponsored by [Bazzite][bazzite-home]. It's still a work in progress, so any contribution is very welcome. We're passionate about building a versatile and a lower cost solution.

You can also support us by giving a [GitHub star ★][statusy-github] and spread the word 🤓.


[statusfy-home]: https://statusfy.co/
[statusy-docs]: https://docs.statusfy.co
[statusy-docs-todo]: https://docs.statusfy.co/guide/#todo
[statusy-blog]: https://statusfy.co/blog
[statusy-github]: https://github.com/bazzite/statusfy
[bazzite-home]: https://www.bazzite.com
[jamstack]: https://jamstack.org/
[serverless]: https://serverless.com/learn/overview/
[isomorphic]: https://www.netlify.com/blog/2017/06/06/jamstack-vs-isomorphic-server-side-rendering/
[vue]: http://vuejs.org/
[nuxt]: https://nuxtjs.org/
[tailwindcss]: https://tailwindcss.com/
[npx]: https://www.npmjs.com/package/npx
[npm]: https://www.npmjs.com/get-npm
