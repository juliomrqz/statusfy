<template>
  <article class="bg-white">
    <div v-if="attributes">
      <div class="max-w-lg mx-auto">
        <div class="flex flex-wrap items-center justify-center">
          <div class="w-full p-4">
            <AuthorCard
              :post="attributes"
              mode="advanced"
              class="mb-4"
            />

            <h1 class="text-3xl sm:text-4xl font-semibold leading-none mb-8">
              {{ attributes.title }}
            </h1>

            <div class="markdown-body text-lg sm:text-xl font-normal leading-normal">
              <DynamicMarkdown
                :render-func="renderFunc"
                :static-render-funcs="staticRenderFuncs"
              />
            </div>

            <hr class="section-divider block my-12 overflow-visible text-center">

            <div class="text-xl mb-12 italic">
              {{ $t('blog.publishedAt') }}
              <a
                :href="`${attributes.canonical}?ref=statusfy-blog`"
                target="_blank"
                rel="noopener"
              >bazzite.com</a>
              {{ $t('blog.on') }} {{ formatDate(attributes.created) }}.
            </div>

            <Partners
              mode="secondary"
              class="pb-0"
            />

            <Subscribe class="max-w-md mx-auto" />

            <div class="flex flex-wrap items-center justify-between mb-12">
              <AuthorCard
                :post="attributes"
                mode="advanced"
                class="w-full sm:w-auto"
              />
              <div class="py-4 text-center sm:text-right w-full sm:w-auto">
                <div class="mb-2 text-grey-darkest font-semibold">
                  {{ $t('blog.share') }}
                </div>
                <social-sharing
                  :url="attributes.canonical"
                  :title="attributes.title"
                  :description="attributes.description"
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
                :identifier="`bazzite-blog-${attributes.slug}`"
                :title="attributes.title"
                :url="attributes.canonical"
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
import DynamicMarkdown from '~/components/blog/DynamicMarkdown'
import FormatDate from '~/components/mixins/FormatDate'
import Subscribe from '~/components/common/Subscribe'
import Partners from '~/components/common/Partners'

import '~/components/icons/fortawesome/twitter-square-brands'
import '~/components/icons/fortawesome/facebook-square-brands'
import '~/components/icons/fortawesome/linkedin-brands'
import '~/components/icons/fortawesome/reddit-square-brands'

export default {
  components: {
    AuthorCard,
    Subscribe,
    Partners,
    DynamicMarkdown
  },
  mixins: [FormatDate],
  computed: {
    postAbsoluteUrl() {
      const prefix = this.$i18n.locale === 'es' ? '/es' : ''

      return `${process.env.baseHost}${prefix}/blog/${this.attributes.slug}`
    },
    twitterUser() {
      return this.$i18n.locale === 'es'
        ? process.env.twitterUserEs
        : process.env.twitterUserEn
    }
  },
  async asyncData({ app, params }) {
    const { slug } = params
    const { vue, attributes, html } = await app.$blog.getArticle(slug, app.i18n.locale)

    return {
      html,
      attributes,
      title: `${attributes.title} - ${app.i18n.t('blog.title')}`,
      description: attributes.description,
      renderFunc: vue.render,
      staticRenderFuncs: vue.staticRenderFns
    }
  },
  head() {
    const $t = this.$t.bind(this)

    return {
      title: this.attributes.title,
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
          content: this.attributes.title
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: this.attributes.description
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
          content: this.attributes.description
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: this.attributes.canonical,
          hid: 'canonical'
        }
      ],
      script: [
        {
          innerHTML: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Article',
            headline: this.attributes.title,
            articleBody: this.html,
            image: `${process.env.baseHost}${this.$icon(512)}`,
            dateCreated: this.attributes.created,
            dateModified: this.attributes.modified,
            datePublished: this.attributes.published,
            inLanguage: this.$i18n.locale,
            author: this.attributes.author.name,
            mainEntityOfPage: this.postAbsoluteUrl,
            wordCount: this.attributes.wordCount,
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
            sameAs: [this.attributes.canonical]
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
                  name: this.attributes.title
                }
              }
            ]
          }),
          type: 'application/ld+json'
        }
      ]
    }
  },
  validate({ params, app }) {
    return app.$blog.validate('articleSlug', params.slug)
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
