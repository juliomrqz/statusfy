<template>
  <section
    :style="`background-image: url(${require('~/assets/img/dividers/top-curve.svg')});`"
    class="bg-top bg-repeat-x py-6 z-10">
    <div class="container mb-8">
      <div class="text-center mb-8">
        <h2
          class="text-3xl sm:text-3xl font-semibold leading-none mb-4">
          {{ $t('blog.titleLatest') }}
        </h2>

        <p
          class="text-xl sm:text-2xl text-blue-darker font-normal leading-tight mb-8">
          {{ $t('blog.description') }}
        </p>
      </div>
      <div class="max-w-md mx-auto">
        <AticleCard
          v-for="post in posts"
          :key="post.slug"
          :post="post" />

        <div
          v-if="posts.length === 0"
          class="text-center pb-8">
          <h2
            class="text-xl font-semibold pb-8 text-blue"
            v-html="$t('blog.noPosts')"
          />
        </div>
      </div>

      <div class="text-center mb-8">
        <nuxt-link
          :to="localePath('blog')"
          class="btn btn-blue">
          {{ $t('blog.readMore') }}
        </nuxt-link>
      </div>

      <Subscribe class="max-w-md mx-auto"/>
    </div>
  </section>
</template>

<script>
import AticleCard from '~/components/blog/ArticleCard'
import Subscribe from '~/components/common/Subscribe.vue'

export default {
  components: {
    AticleCard,
    Subscribe
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
section {
  background-size: 100% 80px;
}
</style>
