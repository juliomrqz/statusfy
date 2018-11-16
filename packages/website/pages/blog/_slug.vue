<template>
  <article class="bg-white">
    <div v-if="post">
      <div class="max-w-lg mx-auto">
        <div class="flex flex-wrap items-center justify-center">
          <div class="w-full p-4">
            <AuthorCard
              :post="post"
              mode="advanced"
              class="mb-4" />

            <h1 class="text-3xl sm:text-4xl font-semibold leading-none mb-8">
              {{ post.title }}
            </h1>

            <div
              class="markdown-body text-lg sm:text-xl font-normal leading-normal"
              v-html="post.content_html"
            />

            <hr
              class="section-divider block my-12 overflow-visible text-center"
            >

            <div class="text-xl mb-12 italic">
              {{ $t('blog.publishedAt') }}
              <a
                :href="parentBlogUrl"
                target="_blank"
                rel="noopener">{{
                  parentBlogUrl
                }}</a>
              {{ $t('blog.on') }} {{ formatDate(post.created) }}.
            </div>

            <Subscribe class="max-w-md mx-auto"/>

            <div class="flex flex-wrap items-center justify-between mb-12">
              <AuthorCard
                :post="post"
                mode="advanced" />
              <div class="py-4 text-center sm:text-right w-full sm:w-auto">
                <div class="mb-2 text-grey-darkest font-semibold">{{ $t('blog.share') }}</div>
                <social-sharing
                  :url="parentBlogUrl"
                  :title="post.title"
                  :description="post.description"
                  :twitter-user="twitterUser"
                  class="text-grey-darkest"
                  inline-template
                >
                  <div>
                    <network network="twitter">
                      <svgicon
                        name="fortawesome/twitter-square-brands"
                        class="svg-inline--fa fa-w-20 cursor-pointer"
                        width="32"
                        height="32"
                      />
                    </network>

                    <network network="facebook">
                      <svgicon
                        name="fortawesome/facebook-square-brands"
                        class="svg-inline--fa fa-w-20 cursor-pointer"
                        width="32"
                        height="32"
                      />
                    </network>

                    <network network="linkedin">
                      <svgicon
                        name="fortawesome/linkedin-brands"
                        class="svg-inline--fa fa-w-20 cursor-pointer"
                        width="32"
                        height="32"
                      />
                    </network>

                    <network network="reddit">
                      <svgicon
                        name="fortawesome/reddit-square-brands"
                        class="svg-inline--fa fa-w-20 cursor-pointer"
                        width="32"
                        height="32"
                      />
                    </network>
                  </div>
                </social-sharing>
              </div>
            </div>

            <div>
              <h2 class="font-normal text-lg mb-6 text-center">
                {{ $t('blog.comments') }}
              </h2>

              <vue-disqus
                :language="$i18n.locale"
                :identifier="`bazzite-blog-${post.slug}`"
                :title="post.title"
                :url="parentBlogUrl"
                shortname="bazzite"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import AuthorCard from '~/components/blog/AuthorCard'
import FormatDate from '~/components/mixins/FormatDate'
import Subscribe from '~/components/common/Subscribe.vue'

import '~/components/icons/fortawesome/twitter-square-brands'
import '~/components/icons/fortawesome/facebook-square-brands'
import '~/components/icons/fortawesome/linkedin-brands'
import '~/components/icons/fortawesome/reddit-square-brands'

export default {
  components: {
    AuthorCard,
    Subscribe
  },
  mixins: [FormatDate],
  async asyncData({ app, params, payload }) {
    const { slug } = params
    const response = payload || (await app.$axios.$get(`blog/${slug}`))

    return {
      post: response,
      title: `${response.title} - ${app.i18n.t('blog.title')}`,
      description: response.description
    }
  },
  head() {
    const $t = this.$t.bind(this)

    return {
      title: this.post.title,
      meta: [
        {
          hid: 'og:type',
          name: 'og:type',
          property: 'og:type',
          content: 'article'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: this.postAbsoluteUrl
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: this.post.title
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: this.post.description
        },
        {
          hid: 'og:image',
          name: 'og:image',
          property: 'og:image',
          content: this.post.cover.source
        },
        {
          hid: 'og:image:width',
          name: 'og:image:width',
          property: 'og:image:width',
          content: this.post.cover.width
        },
        {
          hid: 'og:image:height',
          name: 'og:image:height',
          property: 'og:image:height',
          content: this.post.cover.height
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          property: 'twitter:creator',
          content: `@${this.twitterUser}`
        },
        {
          hid: 'description',
          name: 'description',
          property: 'description',
          content: this.post.description
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: this.parentBlogUrl,
          hid: 'canonical'
        }
      ],
      script: [
        {
          innerHTML: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Article',
            headline: this.post.title,
            articleBody: this.post.content_html,
            image: this.post.cover.source,
            dateCreated: this.post.created,
            dateModified: this.post.modified,
            datePublished: this.post.published,
            inLanguage: this.$i18n.locale,
            author: `${this.post.author.first_name} ${
              this.post.author.last_name
            }`,
            mainEntityOfPage: this.postAbsoluteUrl,
            wordCount: this.post.word_count,
            publisher: {
              '@type': 'Organization',
              name: 'Bazzite',
              url: 'https://www.bazzite.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://media.bazzite.com/logo/logotype.png',
                width: '6170 px',
                height: '1650 px'
              }
            },
            sameAs: [this.parentBlogUrl]
          }),
          type: 'application/ld+json'
        },
        {
          innerHTML: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                item: {
                  '@id': process.env.baseHost,
                  name: 'Home'
                }
              },
              {
                '@type': 'ListItem',
                position: 2,
                item: {
                  '@id': `${process.env.baseHost}/blog`,
                  name: $t('blog.title')
                }
              },
              {
                '@type': 'ListItem',
                position: 3,
                item: {
                  '@id': this.postAbsoluteUrl,
                  name: this.post.title
                }
              }
            ]
          }),
          type: 'application/ld+json'
        }
      ]
    }
  },
  computed: {
    parentBlogUrl() {
      const prefix = this.$i18n.locale === 'es' ? '/es' : ''

      return `https://www.bazzite.com${prefix}/blog/${this.post.slug}`
    },
    postAbsoluteUrl() {
      const prefix = this.$i18n.locale === 'es' ? '/es' : ''

      return `${process.env.baseHost}${prefix}/blog/${this.post.slug}`
    },
    twitterUser() {
      return this.$i18n.locale === 'es'
        ? process.env.twitterUserEs
        : process.env.twitterUserEn
    }
  }
}
</script>

<style scoped>
.section-divider {
  &:before {
    @apply relative inline-block text-grey-darkest font-medium tracking-wide text-4xl;

    content: '...';
    top: -30px;
  }
}
</style>
