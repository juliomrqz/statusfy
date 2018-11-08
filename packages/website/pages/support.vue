<template>
  <div>
    <section
      :style="
        `background-image: url(${require('~/assets/img/dividers/inclined-line.svg')});`
      "
      class="bg-bottom bg-repeat-x bg-white h-full pb-16"
    >
      <div class="container">
        <div
          class="flex flex-wrap items-center justify-center text-center lg:text-left"
        >
          <div class="w-full p-4">
            <h1
              class="text-3xl sm:text-4xl font-semibold leading-none tracking-tight mb-4"
            >
              {{ $t('support.title') }}
            </h1>
            <h2
              class="text-lg sm:text-xl text-blue-darker font-normal leading-normal mb-2"
            >
              {{ $t('support.description') }}
            </h2>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-black pb-6 leading-normal">
      <div class="flex flex-wrap items-stretch mb-6 p-6">
        <div class="w-full sm:w-full lg:w-2/3 mb-6">
          <div class="flex flex-col flex-wrap items-stretch">
            <div class="w-full sm:w-full mb-6">
              <div class="relative block lg:mx-4 p-6 bg-white rounded shadow h-full">
                <h2 class="text-2xl text-center font-semibold">
                  {{ $t('support.community.title') }}
                </h2>
                <div class="text-black mt-6">
                  <ul class="pl-4">
                    <li
                      v-for="(item, key) in supportItems.community"
                      :key="key"
                      v-html="item" />
                  </ul>
                </div>
              </div>
            </div>
            <div class="w-full sm:w-full">
              <div class="relative block lg:mx-4 p-6 bg-white rounded shadow h-full">
                <h2 class="text-2xl text-center font-semibold">
                  {{ $t('support.email.title') }}
                </h2>
                <div class="text-black mt-6">
                  <p
                    v-for="(item, key) in supportItems.email"
                    :key="key"
                    v-html="item" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full sm:w-full lg:w-1/3 mb-6">
          <div class="relative block lg:mx-4 p-6 bg-white rounded shadow h-full">
            <h2 class="text-2xl text-center font-semibold">
              {{ $t('support.updates.title') }}
            </h2>
            <div class="leading-normal text-black mt-6">
              <p
                v-for="(item, key) in supportItems.updates"
                :key="key"
                class="mb-2"
                v-html="item" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import format from 'date-fns/format'

import AticleCard from '~/components/blog/ArticleCard'

export default {
  components: {
    AticleCard
  },
  computed: {
    supportItems() {
      const $t = this.$t.bind(this)

      const replacements = {
        docs_url: $t('links.documentation.url'),
        issues_url: $t('links.issues.url'),
        github_url: $t('links.github.url'),
        stackoverflow_url: $t('links.stackoverflow.url'),
        bazzite_url: $t('links.bazzite.url'),
        blog_url: this.localePath('blog'),
        email: $t('support.supportEmail'),
        twitter_username: $t('support.supportTwitter'),
      }

      const data = {
        community: {
          docs: $t('support.community.items.docs', replacements),
          issues: $t('support.community.items.issues', replacements),
          questions: $t('support.community.items.questions', replacements),
        },
        email: {
          description: $t('support.email.items.description', replacements),
          cost: $t('support.email.items.cost', replacements),
        },
        updates: {
          blog: $t('support.updates.items.blog', replacements),
          twitter: $t('support.updates.items.twitter', replacements)
        }
      }

      return data
    }
  },
  head() {
    const $t = this.$t.bind(this)

    return {
      title: $t('support.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: $t('support.description')
        }
      ]
    }
  }
}
</script>

<style scoped>
section {
  background-size: 100% 100px;
}

p >>> small {
  @apply text-center block mt-4 text-grey-darkest;
}
</style>
