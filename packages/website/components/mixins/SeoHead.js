export default {
  head() {
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
        }
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
