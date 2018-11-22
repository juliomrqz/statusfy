<template>
  <div>
    <section
      :style="`background-image: url(${require('~/assets/img/dividers/inclined-line.svg')});`"
      class="bg-bottom bg-repeat-x bg-white h-full pb-16">
      <div class="container">
        <div
          class="flex flex-wrap items-center justify-center text-center lg:text-left">
          <div class="w-full p-4">
            <h1
              class="text-3xl sm:text-4xl font-semibold leading-none mb-4">
              {{ $t('support.title') }}
            </h1>
            <h2
              class="text-lg sm:text-xl text-blue-darker font-normal leading-normal mb-2">
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
            <div
              id="community"
              class="w-full sm:w-full mb-6">
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
            <div
              id="email"
              class="w-full sm:w-full">
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
        <div
          id="updates"
          class="w-full sm:w-full lg:w-1/3 mb-6">
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
        <div
          id="sponsoring"
          class="w-full mx-auto sm:w-full lg:w-2/3">
          <div class="flex flex-col flex-wrap items-stretch">
            <div class="w-full sm:w-full mb-6">
              <div class="relative block lg:mx-4 p-6 bg-white rounded shadow h-full">
                <h2 class="text-2xl text-center font-semibold">
                  {{ $t('support.sponsoring.title') }}
                </h2>

                <div class="leading-normal text-black mt-6">
                  <p
                    class="mb-2"
                    v-html="$t('support.sponsoring.description', { bazzite_url: $t('links.bazzite.url') })" />
                </div>

                <div class="text-black mt-6">
                  <p
                    class="mb-2"
                    v-html="$t('support.sponsoring.howWeUseDonations.description')" />

                  <ul class="pl-4">
                    <li>{{ $t('support.sponsoring.howWeUseDonations.items.team') }}</li>
                    <li>{{ $t('support.sponsoring.howWeUseDonations.items.support') }}</li>
                    <li>{{ $t('support.sponsoring.howWeUseDonations.items.expenses') }}</li>
                    <li>{{ $t('support.sponsoring.howWeUseDonations.items.contributors') }}</li>
                  </ul>
                </div>

                <div class="flex flex-col lg:flex-row items-stretch justify-center flex-no-wrap my-6">
                  <div
                    v-for="item in ['backers', 'sponsors', 'partners']"
                    :key="item"
                    class="category sm:w-full lg:w-1/3">
                    <div
                      :class="`border-${categoriesColors[item]}`"
                      class="m-4 flex flex-col justify-between border rounded shadow h-full">
                      <div class="p-4 self-stretch">
                        <div class="font-bold text-xl text-center mb-2">
                          {{ $t(`support.sponsoring.categories.${item}.title`) }}
                        </div>
                        <p
                          class="text-grey-darkest"
                          v-html="$t(`support.sponsoring.categories.${item}.description`)" />
                      </div>
                      <a
                        :class="`btn-${categoriesColors[item]}`"
                        href="https://bazzite.xyz/StatusfyOpenCollective#contribute"
                        class="btn"
                        target="_blank"
                        rel="noopener">{{ $t(`support.sponsoring.categories.${item}.action`) }}</a>
                    </div>
                  </div>
                </div>
              </div>
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
import SeoHead from '~/components/mixins/SeoHead'

export default {
  components: {
    AticleCard
  },
  mixins: [SeoHead],
  data() {
    const $t = this.$t.bind(this)

    return {
      title: $t('support.title'),
      description: $t('support.description'),
      categoriesColors: {
        backers: 'purple',
        sponsors: 'blue',
        partners: 'green'
      }
    }
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

.category {
  .btn {
    @apply rounded-t-none w-full text-center whitespace-normal;
  }
}
</style>
