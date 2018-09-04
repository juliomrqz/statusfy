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

    return {
      link: favicons
    }
  }
}
