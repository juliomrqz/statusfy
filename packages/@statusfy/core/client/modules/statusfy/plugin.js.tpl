// vue
<% if (typeof(options.siteConfig.analytics) !== 'undefined') { %>
<% if (options.dev === true) { %>/*<% } %>
import Vue from 'vue'
import VueMultianalytics from 'vue-multianalytics'
<% if (options.dev === true) { %>*/<% } %>
<% } %>

// Dates
import Dates from '@statusfy/common/lib/dates'

const extraLangs = [
<%= options.locales.map(locale => locale.code !== 'en' ? "require('dayjs/locale/" + locale.code + "')," : '').join('\n') %>
]

const dates = Dates()
dates.addLocales(extraLangs)

export default (ctx, inject) => {
  // Analytics
  <% if (typeof(options.siteConfig.analytics) !== 'undefined') { %>
  if (process.browser) {
    <% if (options.dev === true) { %>/*<% } %>
    const modules = {}

    <% if (typeof(options.siteConfig.analytics.ga) !== 'undefined') { %>
    modules['ga'] = {
      appName: '<%= options.siteConfig.title %>',
      appVersion: '<%= options.version %>',
      trackingId: '<%= options.siteConfig.analytics.ga %>',
      debug: ctx.app.isDev
    }
    <% } %>

    <% if (typeof(options.siteConfig.analytics.mixpanel) !== 'undefined') { %>
    modules['mixpanel'] = {
      token: '<%= options.siteConfig.analytics.mixpanel %>',
      debug: ctx.app.isDev
    }
    <% } %>

    <% if (typeof(options.siteConfig.analytics.facebook) !== 'undefined') { %>
    modules['facebook'] = {
      token: '<%= options.siteConfig.analytics.facebook %>',
      debug: ctx.app.isDev
    }
    <% } %>

    <% if (typeof(options.siteConfig.analytics.segment) !== 'undefined') { %>
    modules['segment'] = {
      token: '<%= options.siteConfig.analytics.segment %>',
      debug: ctx.app.isDev
    }
    <% } %>

    Vue.use(VueMultianalytics, {
      modules,
      routing: {
        vueRouter: ctx.app.router
      }
    })
    <% if (options.dev === true) { %>*/<% } %>
  }
  <% } %>

  //
  const statusfy = {
    dates,
    assets: {
      mainLogo: require('<%= options.assets.mainLogo %>')
    },
    iconSizes: [<%= options.iconSizes.join(', ') %>],
    theme: <%= serialize(options.siteConfig.theme) %>,
    baseUrl: <%= serialize(options.siteConfig.baseUrl) %>,
    notifications: <%= serialize(options.siteConfig.notifications) %>
  }

  // Inject Statusfy to the context as $statusfy
  ctx['$statusfy'] = statusfy
  inject('statusfy', statusfy)
}
