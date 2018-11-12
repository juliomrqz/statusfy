export default {
  head () {
    const favicons = this.$statusfy.iconSizes.map(size => {
      return {
        hid: `favicon-${size}`,
        rel: 'icon',
        href: this.$icon(size),
        sizes: `${size}x${size}`
      }
    })

    const canonical = `${this.$statusfy.baseUrl}${this.$route.path}`

    return {
      link: [
        ...favicons,
        { rel: 'canonical', href: canonical, hid: 'canonical' }
      ]
    }
  }
}
