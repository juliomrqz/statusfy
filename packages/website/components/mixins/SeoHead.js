export default {
  head() {
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
        ...ogImage
      ],
      link: [
        {
          rel: 'canonical',
          href: this.canonical ? this.canonical : `${process.env.baseHost}${this.$router.currentRoute.path}`,
          hid: 'canonical'
        }
      ]
    }
  }
}
