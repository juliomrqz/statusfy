<template>
  <div class="text-center h-100 w-100">
    <nuxt/>
  </div>
</template>

<script>
export default {
  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          innerHTML: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Organization',
            name: 'Statusfy',
            description: this.$i18n.t('slogan'),
            url: 'https://statusfy.co' + this.localePath('index'),
            logo: 'https://statusfy.co' + require('~/assets/img/logo.svg'),
            foundingDate: '2018-07-26',
            founders: [
              {
                '@type': 'Person',
                name: 'Julio Marquez',
                url: 'https://marquez.co',
                sameAs: [
                  'https://www.linkedin.com/in/juliomrqz/',
                  'https://github.com/juliomrqz',
                  'https://twitter.com/juliomrqz'
                ]
              }
            ],
            parentOrganization: [
              {
                '@type': 'Organization',
                name: 'Bazzite',
                url: 'https://www.bazzite.com'
              }
            ]
          }),
          type: 'application/ld+json'
        }
      ],
      link: [
        {
          rel: 'mask-icon',
          href: require('~/assets/icons/safari-pinned-tab.svg'),
          color: process.env.mainColor
        }
      ]
    }
  }
}
</script>
