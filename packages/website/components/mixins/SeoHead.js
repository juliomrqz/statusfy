export default {
  head() {
    const i18nSeo = this.$nuxtI18nSeo()

    const currentAbsoluteUrl = `${process.env.baseHost}${this.$router.currentRoute.path}`
    const ogImage = [
      {
        hid: 'og:image',
        name: 'og:image',
        property: 'og:image',
        content: process.env.baseHost + require(`~/assets/img/social-${this.$i18n.locale}.png`)
      },
      {
        hid: 'og:image:width',
        name: 'og:image:width',
        property: 'og:image:width',
        content: 1068
      },
      {
        hid: 'og:image:height',
        name: 'og:image:height',
        property: 'og:image:height',
        content: 558
      },
      {
        hid: 'og:image:type',
        name: 'og:image:type',
        property: 'og:image:type',
        content: 'image/png'
      }
    ]

    return {
      title: this.title,
      titleTemplate: this.titleTemplate ? this.titleTemplate : '%s | Statusfy',
      htmlAttrs: {
        ...i18nSeo.htmlAttrs
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: this.description
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: this.title
        },
        {
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: currentAbsoluteUrl
        },
        ...ogImage,
        ...i18nSeo.meta
      ],
      link: [
        {
          rel: 'canonical',
          href: this.canonical ? this.canonical : currentAbsoluteUrl,
          hid: 'canonical'
        },
        ...i18nSeo.link
      ]
    }
  }
}
