# [0.4.2](https://github.com/statusfy/statusfy/compare/v0.4.1...v0.4.2) (2019-08-22)


### Performance

* **chore:** improve performance and reliability


### Bug Fixes

* **core:** fix initializing a new project with YAML as a config format ([#68](https://github.com/statusfy/statusfy/issues/68)) ([2a616d7](https://github.com/statusfy/statusfy/commit/2a616d7))
* **docs:** fix minor typo ([#255](https://github.com/statusfy/statusfy/issues/255)) ([d568a9f](https://github.com/statusfy/statusfy/commit/d568a9f))
* improve Gitpod port configuration ([35fa7f6](https://github.com/statusfy/statusfy/commit/35fa7f6))

### Minor Features

- **core:**  create Dutch translation ([ea626b4](https://github.com/bazzite/statusfy/commit/ea626b4)) [thanks to [@cafferata](https://github.com/cafferata)]



## [0.4.1](https://github.com/statusfy/statusfy/compare/v0.4.0...v0.4.1) (2019-06-27)


### Bug Fixes

* **docs:** make explicit the under-maintenance definition ([b2a41c9](https://github.com/statusfy/statusfy/commit/b2a41c9))
* **website:** remove responsive image from the article "statusfy-release-0-2-0" ([fa58780](https://github.com/statusfy/statusfy/commit/fa58780))
* **website:** remove unused definitions in the Spanish translation ([ae73c45](https://github.com/statusfy/statusfy/commit/ae73c45))


### Features

* **website:** create blog article "statusfy-release-0-4-0" ([b136e7d](https://github.com/statusfy/statusfy/commit/b136e7d))
* **website:** include the community post in the blog section ([5e42ed4](https://github.com/statusfy/statusfy/commit/5e42ed4))
* **website:** remove disqus comments ([e4e3bd0](https://github.com/statusfy/statusfy/commit/e4e3bd0))



## [0.4.0](https://github.com/statusfy/statusfy/compare/v0.3.1...v0.4.0) (2019-06-13)


### Bug Fixes

* **core:** fix displaying the date of incidents when using the cli [#184](https://github.com/statusfy/statusfy/issues/184) ([#208](https://github.com/statusfy/statusfy/issues/208)) ([6e7d26e](https://github.com/statusfy/statusfy/commit/6e7d26e))
* **core, website:** return postcss plugins as an object ([5c33b84](https://github.com/statusfy/statusfy/commit/5c33b84))
* **docs:** fix heading of the page "Guide/PWA" ([#219](https://github.com/statusfy/statusfy/issues/219)) ([eb436af](https://github.com/statusfy/statusfy/commit/eb436af))
* **docs:** fix the dimension of the images ([83b6705](https://github.com/statusfy/statusfy/commit/83b6705))
* **docs:** fix the Firebase SSR reference in the deploy section ([2cedb4f](https://github.com/statusfy/statusfy/commit/2cedb4f))
* **package:** update @nuxtjs/sitemap to version 1.0.0 ([#183](https://github.com/statusfy/statusfy/issues/183)) ([75db9c3](https://github.com/statusfy/statusfy/commit/75db9c3))
* **package:** update intersection-observer to version 0.6.0 ([#186](https://github.com/statusfy/statusfy/issues/186)) ([6e9b3f0](https://github.com/statusfy/statusfy/commit/6e9b3f0))
* **package:** update semver to version 6.0.0 ([38fdf8a](https://github.com/statusfy/statusfy/commit/38fdf8a))
* **website:** fix the reponsive images placeholder values ([d38eb7f](https://github.com/statusfy/statusfy/commit/d38eb7f))


### Features

* **core:** add Italian translation ([#179](https://github.com/statusfy/statusfy/issues/179)) ([e5a80c4](https://github.com/statusfy/statusfy/commit/e5a80c4))
* use docker multi-stage build ([#193](https://github.com/statusfy/statusfy/issues/193)) ([2b12153](https://github.com/statusfy/statusfy/commit/2b12153))
* **core:** support web-push notifications with OneSignal ([2adff5e](https://github.com/statusfy/statusfy/commit/2adff5e))
* **core, website:** upgrade workbox to v4.x ([6952de3](https://github.com/statusfy/statusfy/commit/6952de3))
* **docs:** create the onsignal section ([cc648a0](https://github.com/statusfy/statusfy/commit/cc648a0))
* **docs:** support sitemap generation and improve SEO ([c31c107](https://github.com/statusfy/statusfy/commit/c31c107))



## [0.3.1](https://github.com/statusfy/statusfy/compare/v0.3.0...v0.3.1) (2019-03-23)


### Bug Fixes

* **bug:** incorrect context referenct in nuxt ([647cab0](https://github.com/statusfy/statusfy/commit/647cab0))
* **website:** fix avatar position ([821deea](https://github.com/statusfy/statusfy/commit/821deea))
* **website:** fix starting the website when no internet connection is available ([2e08200](https://github.com/statusfy/statusfy/commit/2e08200))


### Features

* **website:** support lazy loading the images from the blog section ([136c01a](https://github.com/statusfy/statusfy/commit/136c01a))



## [0.3.1](https://github.com/statusfy/statusfy/compare/v0.3.0...v0.3.1) (2019-03-23)


### Bug Fixes

* **bug:** incorrect context referenct in nuxt ([647cab0](https://github.com/statusfy/statusfy/commit/647cab0))
* **website:** fix avatar position ([821deea](https://github.com/statusfy/statusfy/commit/821deea))
* **website:** fix starting the website when no internet connection is available ([2e08200](https://github.com/statusfy/statusfy/commit/2e08200))


### Performance Improvements

* **website:** support lazy loading the images from the blog section ([136c01a](https://github.com/statusfy/statusfy/commit/136c01a))



# [0.3.0](https://github.com/statusfy/statusfy/compare/v0.2.1...v0.3.0) (2019-03-18)


### Bug Fixes

* **cli:** notify the user when the production server is initialized ([9973555](https://github.com/statusfy/statusfy/commit/9973555))
* **cli, core:** fix detection of the 'analyze' argument ([1981e43](https://github.com/statusfy/statusfy/commit/1981e43))
* **core:** display the content for 'Scheduled Maintenance Incidents' ([05b0bd1](https://github.com/statusfy/statusfy/commit/05b0bd1))
* **core:** fix referencing the dates lib ([0a2fe50](https://github.com/statusfy/statusfy/commit/0a2fe50))
* **core:** fix the font style of the time indicator of each incident ([88cb2ae](https://github.com/statusfy/statusfy/commit/88cb2ae))
* **core:** improve dates parsing and formatting ([aa32346](https://github.com/statusfy/statusfy/commit/aa32346))
* **docs:** fix incorrect flag for start command ([#148](https://github.com/statusfy/statusfy/issues/148)) ([d4b376d](https://github.com/statusfy/statusfy/commit/d4b376d))
* **core:** fix text wrapping of the system names ([637f7bb](https://github.com/statusfy/statusfy/commit/637f7bb))
* **core,website:** enable subfolder generation on static mode ([a94270c](https://github.com/statusfy/statusfy/commit/a94270c))
* **core,website:** fix regeneratorRuntime dependencies requirement ([2fb0b2e](https://github.com/statusfy/statusfy/commit/2fb0b2e))
* **core:** the base url cannot contain a sub-path ([e7ce6bc](https://github.com/statusfy/statusfy/commit/e7ce6bc))

### Features

* **cli:** create the 'delete-incident' command ([8aef1f9](https://github.com/statusfy/statusfy/commit/8aef1f9))
* **cli:** create the 'update-incident' command ([a22d72a](https://github.com/statusfy/statusfy/commit/a22d72a))
* **core:** display the end date of the scheduled incidents ([858c3ea](https://github.com/statusfy/statusfy/commit/858c3ea))
* **core:** support defining the position of the scheduled section in the home page ([22c85d2](https://github.com/statusfy/statusfy/commit/22c85d2))
* **core, docs:** explicitly make YAML as the default front matter format ([a3a5675](https://github.com/statusfy/statusfy/commit/a3a5675))
* **website:** configure @bazzite/nuxt-netlify ([7e46bd1](https://github.com/statusfy/statusfy/commit/7e46bd1))
* officially support Docker 🤓 ([289b296](https://github.com/statusfy/statusfy/commit/289b296))
* **core:** create the "days since latest incident" sub-section in the home page ([cbaf025](https://github.com/statusfy/statusfy/commit/cbaf025))
* **core:** new interface translations:
  * German (thanks to [dennis47528](https://github.com/bazzite/statusfy/commits?author=dennis47528))
  * Hungarian (thanks to [asrob](https://github.com/bazzite/statusfy/commits?author=asrob))
  * Portuguese (Brazil) (thanks to [felipeklasen](https://github.com/bazzite/statusfy/commits?author=felipeklasen))
* **website:** migrate the blog section to local markdown files ([dfa141c](https://github.com/statusfy/statusfy/commit/dfa141c))


### BREAKING CHANGES

* **core:** deployments under a subpath (e.g. `https://example.com/status/`) are no longer supported
* **core, docs:** the `new-incident` command no longer asks for the *front matter* format ([a3a5675](https://github.com/statusfy/statusfy/commit/a3a5675))



## [0.2.1](https://github.com/statusfy/statusfy/compare/v0.2.0...v0.2.1) (2018-12-11)


### Bug Fixes

* **core:** add the Atom & RSS feeds alternate meta links ([fcffb67](https://github.com/statusfy/statusfy/commit/fcffb67))
* **core:** display the Subscribe button if the notifications are enabled ([22e7950](https://github.com/statusfy/statusfy/commit/22e7950))
* **core:** fix the rendering of the Subscribe modal ([34c03a2](https://github.com/statusfy/statusfy/commit/34c03a2))



# [0.2.0](https://github.com/statusfy/statusfy/compare/v0.1.3...v0.2.0) (2018-12-11)


### Bug Fixes

* downgrade prettier to 1.14.3 ([e0023c3](https://github.com/statusfy/statusfy/commit/e0023c3))
* **core:** exclude the dynamic pages building from the SSR mode ([28ed4eb](https://github.com/statusfy/statusfy/commit/28ed4eb))
* **package:** update [@nuxtjs/opencollective](https://github.com/nuxt/opencollective) to version 0.2.0 ([#76](https://github.com/statusfy/statusfy/issues/76)) ([15776b9](https://github.com/statusfy/statusfy/commit/15776b9))


### Features

* support contributions from Open Collective ([257261f](https://github.com/statusfy/statusfy/commit/257261f))
* **core:** create the subscriptions sub-section ([b798439](https://github.com/statusfy/statusfy/commit/b798439))
* **core:** support iCalendar generation from scheduled incidents ([c139aad](https://github.com/statusfy/statusfy/commit/c139aad))
* **core:** support RSS and Atom feeds generation ([81371e2](https://github.com/statusfy/statusfy/commit/81371e2))
* **core:** support Scheduled Maintenance definition ([2edbe9e](https://github.com/statusfy/statusfy/commit/2edbe9e))
* **core:** support sitemap generation ([965f496](https://github.com/statusfy/statusfy/commit/965f496))
* **docs:** create the incidents sub-section ([cbc5539](https://github.com/statusfy/statusfy/commit/cbc5539))
* **docs:** create the Notifications sub-section ([7fa8959](https://github.com/statusfy/statusfy/commit/7fa8959))
* **docs:** improve the Contribution Guide ([1d9bcdd](https://github.com/statusfy/statusfy/commit/1d9bcdd))
* **docs:** support Algolia DocSearch ([9cd9bdb](https://github.com/statusfy/statusfy/commit/9cd9bdb))



## [0.1.3](https://github.com/statusfy/statusfy/compare/v0.1.2...v0.1.3) (2018-11-20)


### Bug Fixes

* **core:** fix reading the user's translations ([b039d17](https://github.com/statusfy/statusfy/commit/b039d17))
* use exact versions for internal packages ([a491b19](https://github.com/statusfy/statusfy/commit/a491b19))



## [0.1.2](https://github.com/statusfy/statusfy/compare/v0.1.1...v0.1.2) (2018-11-20)


### Bug Fixes

* **core:** add the missing `short_title` config attribute ([d981eb6](https://github.com/statusfy/statusfy/commit/d981eb6))
* **core:** fix defining the description meta tag ([db9e4df](https://github.com/statusfy/statusfy/commit/db9e4df))
* **core:** fix defining the user's locales and systems ([b488ec0](https://github.com/statusfy/statusfy/commit/b488ec0))
* **core:** fix validating the Base URL ([a988620](https://github.com/statusfy/statusfy/commit/a988620))



## [0.1.1](https://github.com/statusfy/statusfy/compare/v0.1.0...v0.1.1) (2018-11-17)


### Bug Fixes

* **cli:** add the missing "dependencies installation" message when initializing a new project ([1841390](https://github.com/statusfy/statusfy/commit/1841390))
* **cli:** fix the new project creation ([1cbdf5e](https://github.com/statusfy/statusfy/commit/1cbdf5e))
* **cli:** fix the new incident creation ([#64](https://github.com/bazzite/statusfy/pull/64))


### Features

* **docs:** create the news subscription form ([0844d14](https://github.com/statusfy/statusfy/commit/0844d14))
* **website:** create the news subscription form ([6be629b](https://github.com/statusfy/statusfy/commit/6be629b))



# [0.1.0](https://github.com/statusfy/statusfy/compare/06a1d7f...v0.1.0) (2018-11-14)


First Release
