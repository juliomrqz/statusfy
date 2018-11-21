<template>
  <div>
    <HomeCover />

    <Features />

    <HowToUse />

    <GetStarted />

    <Partners />

    <LatestPosts :posts="posts" />
  </div>
</template>

<script>
import SeoHead from '~/components/mixins/SeoHead'
import HomeCover from '~/components/common/HomeCover'
import Features from '~/components/common/Features'
import HowToUse from '~/components/common/HowToUse'
import LatestPosts from '~/components/common/LatestPosts'
import GetStarted from '~/components/common/GetStarted'
import Partners from '~/components/common/Partners'

export default {
  components: {
    HomeCover,
    Features,
    HowToUse,
    LatestPosts,
    GetStarted,
    Partners
  },
  mixins: [SeoHead],
  async asyncData({ app }) {
    let response = { results: [] }

    try {
      response = await app.$axios.$get('blog?tags=statusfy')
    } catch (error) {
      console.log(error)
    }

    return {
      posts: response.results.slice(0, 3),
      title: app.i18n.t('home.title'),
      description: app.i18n.t('home.description'),
      titleTemplate: '%s'
    }
  }
}
</script>
