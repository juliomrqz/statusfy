<template>
  <div>
    <div
      v-if="mode === 'simple'"
      class="flex flex-wrap items-center text-grey-darker"
    >
      <img
        :src="post.author.avatar"
        class="rounded-full w-10 h-10" >
      <span class="ml-4 font-semibold relative z-10">
        <a
          :href="`https://www.bazzite.com/blog/author/${post.author.username}`"
          target="_blank"
          rel="noopener"
        >
          {{ post.author.first_name }} {{ post.author.last_name }}
        </a>
      </span>
      <span>&nbsp;{{ $t('blog.on') }}&nbsp;</span>
      <time :datetime="post.created">{{ formatDate(post.created) }}</time>
    </div>
    <div
      v-else-if="mode === 'advanced'"
      class="flex flex-wrap items-center justify-center text-grey-darker"
    >
      <img
        :src="post.author.avatar"
        class="rounded-full w-12 h-12" >
      <div class="flex flex-col mx-4 mt-2">
        <span class="font-semibold mb-1 text-center sm:text-left">
          <a
            :href="
              `https://www.bazzite.com/blog/author/${post.author.username}`
            "
            target="_blank"
            rel="noopener"
          >
            {{ post.author.first_name }} {{ post.author.last_name }}
          </a>
        </span>
        <div>
          <time :datetime="post.created">{{ formatDate(post.created) }}</time>
          <span class="dot-divider" />
          <span>{{ post.reading_time }} {{ $t('blog.minRead') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormatDate from '~/components/mixins/FormatDate'

export default {
  mixins: [FormatDate],
  props: {
    post: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      default: 'simple'
    }
  }
}
</script>

<style scoped>
.dot-divider {
  &:after {
    content: '\00B7';
  }
}
</style>
