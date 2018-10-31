/* eslint-disable import/first */
if (process.browser) {
  require('intersection-observer')
}

import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  silent: !process.env.isDev,
  observer: true,
  loading: require('~/assets/img/loading.svg')
})
