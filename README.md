> ⚠️ WARNING: This the branch for the next planned version (v1): it's unstable and under active development. For the latest stable version, go to the [`master` branch](https://github.com/juliomrqz/statusfy/tree/master) 

<p align="center">
  <a href="https://travis-ci.org/juliomrqz/statusfy" rel="nofollow">
    <img src="https://img.shields.io/travis/juliomrqz/statusfy.svg" alt="Travis">
  </a>
  <a href="https://www.npmjs.com/package/statusfy" rel="nofollow">
    <img src="https://img.shields.io/npm/v/statusfy.svg" alt="version">
  </a>
  <a href="https://github.com/juliomrqz/statusfy/blob/develop/LICENSE" rel="nofollow">
    <img src="https://img.shields.io/github/license/juliomrqz/statusfy.svg" alt="License">
  </a>
</p>

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
  <a href="https://opencollective.com/statusfy">
    <img src="https://img.shields.io/badge/Support%20us-Open%20Collective-0366d6.svg" alt="Support us">
  </a>
</p>


<p align="center">
  <a href="https://marquez.co/statusfy?utm_source=github&utm_medium=readme&utm_campaign=statusfy" target="_blank">
    <img src="https://raw.githubusercontent.com/juliomrqz/statusfy/develop/packages/docs/src/.vuepress/public/assets/img/statusfy-home-en.png" alt="Statusfy" />
  </a>
</p>


# Statusfy

> A marvelous Open Source Status Page system

Statusfy is a Status Page System, easy to use and completely Open Source. You can easily create a fast System, [**Static Generated**](https://marquez.co/docs/statusfy/guide/architecture.html#static-generated), and easily deploy it to a variety of [hosting services](https://marquez.co/docs/statusfy/guide/deploy.html).

A Statusfy site is a Web Application, created on top of [Eleventy][eleventy], [Netlify CMS][netlifycms] and [Tailwind CSS][tailwindcss]. It is used **Eleventy** to make a quick and useful abstraction of the system generation, **Vue** and **Nuxt.js** to dynamically define the System Editor, and **Tailwind CSS** to rapidly define the default themes.


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
- Hosting flexibility

## Sponsoring

I love Open Source Projects, I use them every day and **Statusfy is one of my contribution to the community**. Statusfy is created and maintained by me, a Full Stack Developer, but my resources are limited. If you want to support my work and help me to continue developing this Amazing Project, **please donate**, *I will appreciate it* ❤️.

This is how we use the donations:

- Allow the core team to work on Statusfy.
- Support external projects in the ecosystem.
- Cover any other expense.
- Thank contributors if they invested a large amount of time in contributing.

### Partners

**Become a Partner** and get your logo with a link to your site on the README on Github, **every page** of https://marquez.co/docs/statusfy and, the project **home page** (https://marquez.co/statusfy) and **each blog post** related to Statusfy. [[Become a Partner][opencollective-contribute]]

<a href="https://opencollective.com/statusfy#contributors">
  <img src="https://opencollective.com/statusfy/tiers/partners.svg?avatarHeight=96&width=890&button=false" />
</a>

### Sponsors

**Become a Sponsor** and get your logo on the README on Github with a link to your site. [[Become a Sponsor][opencollective-contribute]]

<a href="https://opencollective.com/statusfy#contributors"><img src="https://opencollective.com/statusfy/tiers/sponsors.svg?avatarHeight=74&width=890&button=false" /></a>

### Backers

**Support me** with a monthly donation and help me continue my activities. It means a lot to me ❤️. [[Become a Backer][opencollective-contribute]]

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
npx @statusfy/cli init

# and install your local dependencies
npm install  # OR yarn install
```

Create a new incident with this command:

``` bash
npm run new-incident # OR yarn new-incident
```

and launch the development server with:

``` bash
npm run start # OR yarn start
```

You can later also generate the final Website with:

``` bash
npm run generate # OR yarn generate
```

More information in the [Documentation][documentation].

## Development

:warning: You must at least use `node >= 10`.

``` bash
# install dependencies
yarn
# serves Statusfy's own demo
yarn demo:dev 
# make sure your code change passes the test
yarn test
```

More information in the [Contributing Guide][contributing].
You can also build and run Statusfy in a free online workspace using Gitpod:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/juliomrqz/statusfy)

## Demo

A Demo application is at [https://statusfy.marquez.co][demo].

## Documentation & Community Support

- 📄 If you want extra details of how to configure and use this project, the **full documentation** is available at [https://marquez.co/docs/statusfy][documentation].
- 💻 You may want to check the **examples projects** for different popular hosting services at [the Examples Repository][examples].
- 🐞 For **Bug reports** or **Feature requests**, use the [Issues section][issues].
- 💬 For **questions**, you can also use the [Issues section][issues].
- 🤓 You can find useful **articles** in [my blog][marquez-blog].
- 🚀 You may also want to **follow me** [on Twitter][twitter].

## Professional Support

This project is sponsored by me, a Full Stack Developers. If you require Professional Assistance on your project(s), please contact me at [https://marquez.co][support-page].

## Contributing

Please make sure to read the [Contributing Guide][contributing] before making a pull request.

## Code of Conduct

Everyone participating in this project is expected to agree to abide by the [Code of Conduct][code-of-conduct].

## License

Code released under the [Apache License 2.0][license-page].

![](https://ga-beacon.appspot.com/UA-65885578-17/juliomrqz/statusfy?pixel)

[examples]: https://github.com/juliomrqz/statusfy/tree/develop/examples
[demo]: https://statusfy.marquez.co?utm_source=github&utm_medium=readme&utm_campaign=statusfy
[documentation]: https://marquez.co/docs/statusfy?utm_source=github&utm_medium=readme&utm_campaign=statusfy
[contributing]: https://github.com/juliomrqz/statusfy/blob/develop/CONTRIBUTING.md
[code-of-conduct]: https://www.contributor-covenant.org/version/2/0/code_of_conduct/
[issues]: https://github.com/juliomrqz/statusfy/issues
[twitter]: https://twitter.com/juliomrqz
[support-page]: https://marquez.co?utm_source=github&utm_medium=readme&utm_campaign=statusfy
[marquez-blog]: https://marquez.co/blog?utm_source=github&utm_medium=readme&utm_campaign=statusfy
[license-page]: https://github.com/juliomrqz/statusfy/blob/develop/LICENSE
[netlifycms]: https://www.netlifycms.org/?utm_source=github&utm_medium=readme&utm_campaign=statusfy
[tailwindcss]: https://tailwindcss.com/?utm_source=github&utm_medium=readme&utm_campaign=statusfy
[eleventy]: https://www.11ty.dev/?utm_source=github&utm_medium=readme&utm_campaign=statusfy
[npx]: https://www.npmjs.com/package/npx
[npm]: https://www.npmjs.com/get-npm
[opencollective-contribute]: https://opencollective.com/statusfy#section-contribute
