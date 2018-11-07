<template>
  <article
    class="bg-white shadow hover:shadow-md p-8 mb-4 rounded leading-tight relative"
  >
    <h2 class="text-2xl font-semibold leading-none">
      <nuxt-link
        :to="localePath({ name: 'blog-slug', params: { slug: post.slug } })"
        class="text-black"
      >
        {{ post.title }}
      </nuxt-link>
    </h2>

    <p
      class="my-4 text-lg text-grey-darkest font-open-sans"
      v-html="post.description"
    />

    <AuthorCard :post="post" />

    <nuxt-link
      :to="localePath({ name: 'blog-slug', params: { slug: post.slug } })"
      class="absolute pin overflow-hidden whitespace-no-wrap text-transparent hover:text-transparent z-0"
    >
      {{ $t('blog.readMore') }}
    </nuxt-link>
  </article>
</template>

<script>
import AuthorCard from '~/components/blog/AuthorCard'

export default {
  components: {
    AuthorCard
  },
  props: {
    post: {
      type: Object,
      require: true,
      default: () => {}
    }
  }
}
</script>
