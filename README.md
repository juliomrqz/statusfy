[![Bazzite Project](https://img.shields.io/badge/Bazzite-project-blue.svg)](https://statusfy.co)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/afb1b57affaa4f5d8fcaac5c0beee5c0)](https://www.codacy.com/app/bazzite/statusfy?utm_source=github.com&utm_medium=referral&utm_content=bazzite/statusfy&utm_campaign=Badge_Grade)
[![Travis](https://img.shields.io/travis/bazzite/statusfy.svg)](https://travis-ci.org/bazzite/statusfy)
[![David](https://img.shields.io/david/bazzite/statusfy.svg)](https://david-dm.org/bazzite/statusfy)
[![David](https://img.shields.io/david/dev/bazzite/statusfy.svg)](https://david-dm.org/bazzite/statusfy?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/bazzite/statusfy.svg)](https://greenkeeper.io/)
[![version](https://img.shields.io/npm/v/statusfy.svg)](https://www.npmjs.com/package/statusfy)
[![License](https://img.shields.io/github/license/bazzite/statusfy.svg)][license-page]
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbazzite%2Fstatusfy.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbazzite%2Fstatusfy?ref=badge_shield)

<p align="center">
  <a href="#partners" alt="Partner on Open Collective">
    <img src="https://opencollective.com/statusfy/tiers/partners/badge.svg" />
  </a>
  <a href="#sponsors" alt="Sponsors on Open Collective">
    <img src="https://opencollective.com/statusfy/tiers/sponsors/badge.svg" />
  </a>
  <a href="#backers" alt="Backers on Open Collective">
    <img src="https://opencollective.com/statusfy/tiers/backers/badge.svg" />
  </a>
  <a href="https://bazzite.xyz/StatusfyOpenCollective">
    <img src="https://img.shields.io/badge/Support%20us-Open%20Collective-0366d6.svg" alt="Support us">
  </a>
</p>


<p align="center">
  <a href="https://statusfy.co?utm_source=github&utm_medium=readme&utm_campaign=statusfy" target="_blank">
    <img src="https://raw.githubusercontent.com/bazzite/statusfy/develop/packages/docs/src/.vuepress/public/assets/img/statusfy-home-en.png" alt="Statusfy" />
  </a>
</p>

# Statusfy

> A marvelous Open Source Status Page system

Statusfy is a Status Page System, easy to use and completely Open Source. You can easily create a fast System either [**Static Generated**](https://docs.statusfy.co/guide/architecture.html#static-generated) or [**Server Rendered**](https://docs.statusfy.co/guide/architecture.html#server-rendered) and easily deploy it to a variety of [hosting services](https://docs.statusfy.co/guide/deploy.html).

A Statusfy site is a Web Application, created with [Vue][vue], [Nuxt.js][nuxt] and [Tailwind CSS][tailwindcss]. We use **Vue** to dynamically define the interfaces that represent the data, **Nuxt.js** to make a quick and useful abstraction of the client and server logic, and **Tailwind CSS** to rapidly define the default theme.


## Features

- Systems Definition
- Incidents Reports
- Progressive Web App (PWA) Support
- Google Analytics Integration
- Multi-language support
- A default theme with:
  - Responsive layout
  - Easy Customization
  - Beautiful Design 
- SEO Friendly
- Hosting flexibility: Static Generated or Server Rendered

## Sponsoring

We love Open Source Projects, we use them every day and **Statusfy is our contribution to the community**. Statusfy is created and maintained by [Bazzite][bazzite-website], a Software Development Company, but our resources are limited. If you want to support our work and help us to continue developing this Amazing Project, **please donate**, *we will appreciate it* ❤️.

This is how we use the donations:

- Allow the core team to work on Statusfy.
- Support external projects in the ecosystem.
- Cover any other expense.
- Thank contributors if they invested a large amount of time in contributing.

### Partners

**Become a Partner** and get your logo with a link to your site on our README on Github, **every page** of https://docs.statusfy.co and, the **home page** and **each blog post** of https://statusfy.co. [[Become a Partner][opencollective-contribute]]

<a href="https://opencollective.com/statusfy#contributors">
  <img src="https://opencollective.com/statusfy/tiers/partners.svg?avatarHeight=96&width=890&button=false" />
</a>

### Sponsors

**Become a Sponsor** and get your logo on our README on Github with a link to your site.. [[Become a Sponsor][opencollective-contribute]]

<a href="https://opencollective.com/statusfy#contributors"><img src="https://opencollective.com/statusfy/tiers/sponsors.svg?avatarHeight=74&width=890&button=false" /></a>

### Backers

**Support us** with a monthly donation and help us continue our activities. It means a lot to us ❤️. [[Become a Backer][opencollective-contribute]]

<a href="https://opencollective.com/statusfy#contributors">
  <img src="https://opencollective.com/statusfy/tiers/backers.svg?width=890&button=false" />
</a>

## Getting started

It’s pretty easy to get started with Statusfy. Install it globally with npm:

***Make sure you have [npx][npx] installed (npx is shipped by default since [npm][npm] 5.2.0)***

``` bash
# change the working directory
cd existing_folder

# run the initialization command
npx statusfy init

# and install your local dependencies
npm install  # OR yarn install
```

Create a new incident with this command:

``` bash
npm run new-incident # OR yarn new-incident
```

and launch the development server with:

``` bash
npm run dev # OR yarn dev
```

You can also generate a Static Generated Website with:

``` bash
npm run generate # OR yarn generate
```

or generate a Server Rendered Website with:

``` bash
# generate static assets
npm run build # OR yarn build

# launch the server
npm run start # OR yarn start
```

More information in the [Documentation][documentation].

## Development

:warning: You must at least use `node >= 8.10`.

``` bash
# install dependencies
yarn
# serves Statusfy's own demo
yarn demo:dev 
# make sure your code change passes the test
yarn test
```

More information in the [Contributing Guide][contributing].

## Demo

A Demo application is at [https://demo.statusfy.co][demo].

## Documentation & Community Support

- If you want extra details of how to configure and use this project, the **full documentation** is available at [https://docs.statusfy.co][documentation].
- You may want to check the **examples projects** for different popular hosting services at [the Examples Repository][examples].
- For **Bug reports** or **Feature requests**, use the [Issues section][issues].
- For **questions**, go to [https://stackoverflow.com/questions/ask?tags=statusfy](https://stackoverflow.com/questions/ask?tags=statusfy).
- You can find useful **articles** in [our blog][statusfy-blog].
- You may also want to **follow the company** supporting this project [on Twitter][twitter].

## Professional Support

This project is sponsored by [Bazzite][bazzite-website]. If you require Professional Assistance on your project(s), please contact us at [https://statusfy.co/support][support-page].

## Contributing

Please make sure to read the [Contributing Guide][contributing] before making a pull request.

## Code of Conduct

Everyone participating in this project is expected to agree to abide by the [Code of Conduct][code-of-conduct].

## License

Code released under the [Apache License 2.0][license-page].

[examples]: https://github.com/bazzite/statusfy-examples
[demo]: https://demo.statusfy.co?utm_source=github&utm_medium=readme&utm_campaign=statusfy
[documentation]: https://docs.statusfy.co?utm_source=github&utm_medium=readme&utm_campaign=statusfy
[contributing]: https://github.com/bazzite/statusfy/blob/develop/CONTRIBUTING.md
[code-of-conduct]: https://www.bazzite.com/open-source/code-of-conduct?utm_source=github&utm_medium=readme&utm_campaign=statusfy
[issues]: https://github.com/bazzite/statusfy/issues
[twitter]: https://bazzite.xyz/Twitter
[bazzite-website]: https://www.bazzite.com?utm_source=github&utm_medium=readme&utm_campaign=statusfy
[support-page]: https://statusfy.co/support?utm_source=github&utm_medium=readme&utm_campaign=statusfy
[statusfy-blog]: https://statusfy.co/blog?utm_source=github&utm_medium=readme&utm_campaign=statusfy
[license-page]: https://github.com/bazzite/statusfy/blob/develop/LICENSE
[vue]: http://vuejs.org/
[nuxt]: https://nuxtjs.org/
[tailwindcss]: https://tailwindcss.com/
[npx]: https://www.npmjs.com/package/npx
[npm]: https://www.npmjs.com/get-npm
[opencollective-contribute]: https://bazzite.xyz/StatusfyOpenCollective#contribute
