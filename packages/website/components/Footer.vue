<template>
  <div class="py-8">
    <div
      class="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between px-8"
    >
      <small class="block text-sm text-center text-grey-dark lg:text-left">
        <p class="mb-2">
          {{ $t('footer.prefix') }}
          <a
            :href="$t('footer.link')"
            target="_blank"
            rel="noopener">Bazzite</a
          >.
        </p>

        <p>{{ $t('footer.copyright') }}</p>
      </small>
      <div class="mb-4 lg:mb-0">
        <div
          class="flex flex-col lg:flex-row lg:items-center text-center lg:text-right"
        >
          <nuxt-link
            v-for="locale in $i18n.locales"
            v-if="locale.code !== $i18n.locale"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
            class="link"
          >{{ locale.name }}</nuxt-link
          >

          <a
            v-for="link in links"
            :key="link.url"
            :href="link.url"
            target="_blank"
            class="link"
          >
            {{ link.title }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const $t = this.$t.bind(this)

    return {
      links: [
        {
          title: $t('links.documentation.title'),
          url: $t('links.documentation.url')
        },
        {
          title: $t('links.demo.title'),
          url: $t('links.demo.url')
        },
        {
          title: $t('links.github.title'),
          url: $t('links.github.url')
        }
      ]
    }
  }
}
</script>

<style scoped>
.link {
  @apply text-xl leading-normal text-grey-dark no-underline mb-4;

  &::hover {
    @apply text-black;
  }
}

@screen lg {
  .link {
    @apply text-base mb-0 ml-8;
  }
}
</style>
