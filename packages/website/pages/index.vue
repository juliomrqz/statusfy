<template>
  <div>
    <HomeCover />

    <Features />

    <HowToUse />

    <GetStarted />

    <LatestPosts :posts="posts" />
  </div>
</template>

<script>
import HomeCover from '~/components/common/HomeCover'
import Features from '~/components/common/Features'
import HowToUse from '~/components/common/HowToUse'
import LatestPosts from '~/components/common/LatestPosts'
import GetStarted from '~/components/common/GetStarted'

export default {
  components: {
    HomeCover,
    Features,
    HowToUse,
    LatestPosts,
    GetStarted
  },
  mounted() {
    this.$store.commit('SET_NAVBAR_STYLE', 'light')
  },
  async asyncData({ app }) {
    let response = { results: [] }

    try {
      response = await app.$axios.$get('blog?tags=statusfy')
    } catch (error) {
      console.log(error)
    }

    return {
      posts: response.results.slice(0, 3)
    }
  },
  head() {
    return {
      titleTemplate: 'Statusfy'
    }
  }
}
</script>
