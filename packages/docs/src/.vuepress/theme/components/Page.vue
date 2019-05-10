<template>
  <div itemscope itemtype="http://schema.org/Article">
    <meta itemprop="dateCreated" :content="$page.frontmatter.date">
    <meta itemprop="datePublished" :content="$page.frontmatter.date">
    <meta itemprop="dateModified" :content="$page.lastUpdated">
    <meta itemprop="headline" :content="$page.title">
    <meta itemprop="description" :content="$page.frontmatter.description">
    <meta itemprop="inLanguage" :content="language">
    <meta itemprop="mainEntityOfPage" :content="$site.themeConfig.domain + $page.path">
    <meta itemprop="image" :content="require(`@assets/img/social-${language}.png`)">
    <meta itemprop="wordCount" :content="$page.readingTime.words">
    <meta itemprop="timeRequired" :content="`PT${Math.ceil($page.readingTime.minutes)}M`">
    <meta itemprop="license" content="https://github.com/bazzite/statusfy/blob/develop/LICENSE">
    <meta itemprop="version" :content="$site.themeConfig.version">
    <div itemscope itemprop="author" itemtype="http://schema.org/Organization">
      <meta itemprop="legalName" content="Bazzite, LLC">
      <meta itemprop="name" content="Bazzite">
      <meta itemprop="url" content="https://www.bazzite.com">
    </div>
    <div itemscope itemprop="publisher" itemtype="http://schema.org/Organization">
      <meta itemprop="name" content="Statusfy">
      <meta itemprop="url" content="https://statusfy.co">
      <div itemscope itemscope itemprop="logo" itemtype="http://schema.org/ImageObject">
        <meta itemprop="url" :content="require('@public/logo.png')">
        <meta itemprop="width" content="512px">
        <meta itemprop="height" content="512px">
      </div>
    </div>

    <ParentPage :sidebarItems="sidebarItems" itemprop="articleBody" />
  </div>
</template>

<script>
import ParentPage from '@parent-theme/components/Page.vue'

export default {
  components: {
    ParentPage
  },
  props: ['sidebarItems'],
  mounted() {
    console.log(this.$page)
    console.log(this.$site)
  },
  computed: {
    language() {
      return this.$lang.split('-')[0];
    }
  }
}
</script>
