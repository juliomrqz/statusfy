<template>
  <div v-if="post.author">
    <div
      v-if="mode === 'simple'"
      class="flex flex-wrap items-center text-grey-darker"
    >
      <ImageResponsive
        :source="require(`~/assets/img/avatars/${post.author.username}.jpg`)"
        :placeholder="require(`~/assets/img/avatars/${post.author.username}.jpg?lqip`)"
        :alt="post.author.name"
        classes="w-10 h-10"
        :width="40"
        :height="40"
        class="rounded-full"
      />

      <span class="ml-4 font-semibold relative z-10">
        <a
          :href="`https://www.bazzite.com/blog/author/${post.author.username}`"
          target="_blank"
          rel="noopener"
        >
          {{ post.author.name }}
        </a>
      </span>
      <span>&nbsp;{{ $t('blog.on') }}&nbsp;</span>
      <time :datetime="post.created">{{ formatDate(post.created) }}</time>
    </div>
    <div
      v-else-if="mode === 'advanced'"
      class="flex flex-wrap flex-col items-center justify-center text-grey-darker sm:justify-start sm:flex-row"
    >
      <ImageResponsive
        :source="require(`~/assets/img/avatars/${post.author.username}.jpg`)"
        :placeholder="require(`~/assets/img/avatars/${post.author.username}.jpg?lqip`)"
        :alt="post.author.name"
        classes="w-12 h-12"
        :width="40"
        :height="40"
        class="rounded-full"
      />

      <div class="flex flex-col mx-4 mt-2 sm:mt-0">
        <span class="font-semibold mb-1 text-center sm:text-left">
          <a
            :href="`https://www.bazzite.com/blog/author/${post.author.username}`"
            target="_blank"
            rel="noopener"
          >
            {{ post.author.name }}
          </a>
        </span>
        <div>
          <time :datetime="post.created">{{ formatDate(post.created) }}</time>
          <span class="dot-divider" />
          <span>{{ post.readingTime }} {{ $t('blog.minRead') }}</span>
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
      required: true,
      default: () => {}
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
