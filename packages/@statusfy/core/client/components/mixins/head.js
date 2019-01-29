export default {
  head () {
    const i18nSeo = this.$nuxtI18nSeo()

    const favicons = this.$statusfy.iconSizes.map(size => {
      return {
        hid: `favicon-${size}`,
        rel: 'icon',
        href: this.$icon(size),
        sizes: `${size}x${size}`
      }
    })

    const canonical = `${this.$statusfy.baseUrl}${this.$route.path}`

    // Atom and RSS
    let linksFeeds = []
    if (this.$statusfy.notifications && this.$statusfy.notifications.feeds) {
      const feedsBaseUrl = this.$statusfy.baseUrl === '/'
        ? '/feeds'
        : `${this.$statusfy.baseUrl}/feeds`

      linksFeeds = [{
        rel: 'alternate',
        type: 'application/rss+xml',
        hid: 'alternate-feed-rss',
        title: '',
        href: `${feedsBaseUrl}/incidents.${this.$i18n.locale}.xml`
      },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        hid: 'alternate-feed-atom',
        title: '',
        href: `${feedsBaseUrl}/incidents.${this.$i18n.locale}.atom`
      }
      ]
    }

    return {
      htmlAttrs: {
        ...i18nSeo.htmlAttrs
      },
      meta: [
        ...i18nSeo.meta
      ],
      link: [
        ...favicons,
        ...linksFeeds,
        {
          rel: 'canonical',
          href: canonical,
          hid: 'canonical'
        },
        ...i18nSeo.link
      ]

    }
  }
}
