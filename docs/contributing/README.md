---
title: Contribution Guide
description: Statusfy is one of the Open Source Projects created by Julio Marquez that is under very active development. We hope this document makes the process for contributing clear and answers some questions that you may have.
date: 2018-10-12T17:28:04Z
sidebar: auto
sidebarDepth: 3
---

# Contribution Guide

Statusfy is one of the Open Source Projects created by [Julio Marquez][marquez-home]. It's under very active development. We hope this document makes the process for contributing clear and answers some questions that you may have.

First, you must know that Statusfy relies on three Amazing Technologies:

- **[Vue.js][vue]:** Dynamically defines the interfaces that represent the data.
- **[Nuxt.js][nuxt]:** A quickly, flexible, and useful abstraction of the client and server logic. It also generates/builds the application.
- **[Tailwind CSS][tailwind]:** A utility CSS framework that smartly defines the styles.

***Any contribution is more than welcome!***

## Code of Conduct

We have adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text][code-of-conduct] so that you can understand what actions will and will not be tolerated.

## Semantic Versioning

Julio follows [semantic versioning][semantic-versioning]. We release **patch versions** for bugfixes, **minor versions** for new features, and **major versions** for any breaking changes. 

Every significant change is documented in the [changelog][changelog] file.

## Reporting Issues

A great way to contribute to the project is to send a detailed report when you encounter an issue. We use the [Github Issues section][github-issues] for these reports.

Please make sure to include a reproduction repository. We can start fixing bugs faster if you provide a project for reproduction.

## Proposing a Change

Any significant improvement (no matter if it's just to fix a typo) should be associated with a [feature request][feature-request] or [bug report][bug-report]. If you require Professional Support on your project(s) or want to ask general questions, go to our [Support Page][support-page].

### Pull Requests

If you intend to add a new feature, we recommend filing [an issue][github-issues]. This lets us reach an agreement on your proposal before you put significant effort into it.

#### Getting started

Install [Node.js][node] (8.1 or higher) and [Yarn][yarn]. It's also recommended to install [Lerna][lerna] globally.

1. Clone this repository: [https://github.com/juliomrqz/statusfy][repo].
2. Run `yarn install` to install the dependencies.

::: tip TIP
To use **@statusfy/cli** in the repo as a global command. Enter the `./packages/@statusfy/cli` folder and run `npm link`.
:::

The Statusfy repository is a [monorepo][monorepo] with multiple [sub-projects/packages](#packages). Before sending a pull request, you should know the task of each sub-project [bellow](#packages).

### Testing

A great **Pull Request** will often include tests. To write great tests, we explain to you our testing structure:

#### Demo

The Demo project uses almost all the Statusfy features, and it's used as a starting point for testing. Before running any test, the demo project must be generated/built running `yarn run test:demo`.

#### Unit tests

Each **sub-project** has its unit tests, and they will be executed with Lerna running the command `yarn run test`.

#### Testing your Changes

While working on your **Pull Request**, you will likely want to check if your changes are not breaking any existing feature.

To do so, generate/build the demo and run the tests.

```bash
yarn run test:demo
yarn run test
```

### Linting

As you might have noticed already, we are using ESLint to enforce a coding standard. Please run `yarn lint` before committing your changes to fix the style of the code automatically. If there are still errors left, you must correct them manually.

### Documentation

Suppose you are adding a new feature, doing a refactoring, or changing the behavior of Statusfy in any other manner. In that case, you'll likely want to document the changes.

Currently, the documentation is translated into English and Spanish, but you don't have to document the changes in both languages. You can just pick one of them, and we take care of the other language.

::: tip TIP
You don't have to write documentation up immediately (but please do so as soon as your pull request is mature enough).
:::

### Translations

We're open to any contribution that translates the Statusfy core to other languages. Just use as a base language [this file][english-language] and translate the strings. The new file you create must follow this pattern `lang-default.json` where `lang` is the identification of the language in a two-letter representation (in [ISO 639-1][iso-639-1] format) with an optional region (in [ISO 3166-1 Alpha 2][iso-3166-1-alpha-2] format).

### Contributor License Agreement (CLA)

To accept your pull request, we need you to submit a CLA. You only need to do this once. **By signing a contributor license agreement, we ensure that the Community is free to use your contributions.**

[**Complete your CLA here.**][cla]

### Final checklist

When submitting your **Pull Request**, there is a simple template that you have to fill out. Please tick all suitable answers in the checklists.

## License

By contributing to Statusfy, you agree that your contributions will be licensed under its [Apache 2.0][license].


## Financial Contribution

I love Open Source Projects. I use them every day, and **Statusfy is one of my contribution to the Community**, but our resources are limited. If you want to support my work and help me continue developing this Amazing Project, please donate. We will appreciate it ❤️.

[**Become a Backer, Sponsor or Partner on OpenCollective.**][open-collective]

## Project Structure

Statusfy is an entirely open-source project. Its repository is a monorepo with multiple sub-projects/packages located at the `./packages` folder.

### CLI

***CLI for Statusfy***

This project is located the set of [useful commands](../guide/commands.md), both for development and production purposes.

### Common

***Common Utils*** 

It's used for the other internal projects.

### Core

***The core of Statusfy.***

It's a [Nuxt.js][nuxt] application, and all the Stastufy Magic happens here. We use extra libraries that easily extends some of the Statusfy features:

- [Font Awesome][fontawesome]: A versatile Icons Set.
- [@nuxtjs/axios][axios-module]: Secure and Easy Axios integration for Nuxt.js.
- [@nuxtjs/pwa][pwa-module]: PWA support for Nuxt.js.
- [nuxt-i18n][nuxt-i18n]: i18n features for Nuxt.js.
- [Express][express]: A Node.js framework.
- [vue-multianalytics][vue-multianalytics]: a simple plugin that tracks any event on multiple platforms simultaneously.
- [Tailwind CSS][tailwindcss]: A Utility-First CSS Framework used by the default theme.

### Editor

***The Editor for Statusfy.***

::: warning IMPORTANT
This editor is not ready yet; it's under development.
:::

### Markdown

***Markdown Parser for Statusfy.***

The Parser converts all the incidents from Markdown to HTML. We use [markdown-it][markdown-it] for this task.

### Testing Utilities

***Test Utils for Statusfy.***

### Demo

***Main Demo for Statusfy.***

### Documentation

***Where the documentation is stored.***

The documentation is created in Markdown Files and generated with [Vuepress][vuepress].

### Website

***Main Website for Statusfy.***

It's a simple [Nuxt.js][nuxt] application.

<!-- links -->

[repo]: https://github.com/juliomrqz/statusfy
[code-of-conduct]: https://marquez.co/open-source/code-of-conduct?utm_source=docs&utm_medium=contributing&utm_campaign=statusfy
[github-issues]: https://github.com/juliomrqz/statusfy/issues
[feature-request]: https://github.com/juliomrqz/statusfy/issues/new?template=feature_request.md
[bug-report]: https://github.com/juliomrqz/statusfy/issues/new?template=bug_report.md
[support-page]: https://marquez.co/statusfy#support
[node]: https://nodejs.org/en/download/
[yarn]: https://yarnpkg.com/lang/en/docs/install/
[lerna]: https://www.npmjs.com/package/lerna
[monorepo]: https://en.wikipedia.org/wiki/Monorepo
[english-language]: https://github.com/juliomrqz/statusfy/blob/develop/packages/@statusfy/core/client/locales/en-default.json
[iso-639-1]: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
[iso-3166-1-alpha-2]: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
[nuxt]: https://nuxtjs.org/
[fontawesome]: https://fontawesome.com/
[axios-module]: https://github.com/nuxt-community/axios-module
[pwa-module]: https://github.com/nuxt-community/pwa-module
[express]: https://expressjs.com/
[nuxt-i18n]: https://github.com/nuxt-community/nuxt-i18n
[vue-multianalytics]: https://github.com/Glovo/vue-multianalytics
[tailwindcss]: https://github.com/tailwindcss/tailwindcss
[vuepress]: https://vuepress.vuejs.org/
[markdown-it]: https://github.com/markdown-it/markdown-it
[vue]: http://vuejs.org/
[tailwind]: https://tailwindcss.com/
[semantic-versioning]: https://semver.org/
[marquez-home]: https://marquez.co?utm_source=docs&utm_medium=contributing&utm_campaign=statusfy
[changelog]: https://github.com/juliomrqz/statusfy/blob/master/CHANGELOG.md
[examples]: https://github.com/juliomrqz/statusfy/tree/develop/examples
[cla]: https://cla-assistant.io/juliomrqz/statusfy
[license]: https://github.com/juliomrqz/statusfy/blob/develop/LICENSE
[open-collective]: https://opencollective.com/statusfy#section-contribute
