<template>
  <div>
    <section
      :style="
        `background-image: url(${require('~/assets/img/dividers/wave-curve.svg')});`
      "
      class="bg-bottom bg-repeat-x bg-black h-full pb-32 text-white"
    >
      <div class="container">
        <div
          class="flex flex-wrap items-center justify-center text-center lg:text-left"
        >
          <div class="w-full p-4">
            <h1
              class="text-3xl sm:text-4xl font-semibold leading-none mb-4"
            >
              {{ $t('blog.title') }}
            </h1>
            <h2
              class="text-lg sm:text-xl text-blue-darker font-normal leading-normal mb-2"
            >
              {{ $t('blog.description') }}
            </h2>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-grey-lighter pb-6">
      <div class="max-w-md mx-auto px-4">
        <AticleCard
          v-for="post in posts"
          :key="post.slug"
          :post="post" />

        <div
          v-if="posts.length === 0"
          class="text-center pb-8">
          <h2
            class="text-3xl font-semibold pb-8"
            v-html="$t('blog.noPosts')" />
        </div>
      </div>

      <Subscribe class="max-w-md mx-auto"/>
    </section>
  </div>
</template>

<script>
import format from 'date-fns/format'

import SeoHead from '~/components/mixins/SeoHead'
import AticleCard from '~/components/blog/ArticleCard'
import Subscribe from '~/components/common/Subscribe.vue'

export default {
  layout: 'dark',
  components: {
    AticleCard,
    Subscribe
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
      posts: response.results,
      title: app.i18n.t('blog.title'),
      description: app.i18n.t('blog.description')
    }
  }
}
</script>

<style scoped>
section {
  background-size: 100% 100px;
}
</style>
