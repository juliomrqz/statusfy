<template></template>

<script>
export default {
  created() {
    if (typeof this.$ssrContext !== "undefined") {
      const { domain } = this.$site.themeConfig
      const pagePath = this.$page.path.replace(/\.html$/, "")
      const url = path => `${domain}${path}`
      const lang = this.$lang.split('-')[0]

      // canonical
      this.$ssrContext.userHeadTags += `<link rel="canonical" href="${url(pagePath)}"/>`;

      // alternate
      let enPath;
      let esPath;

      if (pagePath.startsWith('/es/')) {
        enPath = pagePath.substring(3)
        esPath = pagePath
      } else {
        enPath = pagePath
        esPath = `/es${pagePath}`
      }

      this.$ssrContext.userHeadTags += `<link rel="alternate" href="${url(enPath)}" hreflang="en-US"/>`;
      this.$ssrContext.userHeadTags += `<link rel="alternate" href="${url(esPath)}" hreflang="es-US"/>`;

      // logo
      const logo = domain + require(`@assets/img/social-${lang}.png`)

      this.$ssrContext.userHeadTags += `<meta name="twitter:image" content="${logo}">`;
      this.$ssrContext.userHeadTags += `<meta property="og:image" content="${logo}">`;
      this.$ssrContext.userHeadTags += `<meta property="og:image:width" content="2136">`;
      this.$ssrContext.userHeadTags += `<meta property="og:image:height" content="1116">`;
    }
  }
};
</script>
