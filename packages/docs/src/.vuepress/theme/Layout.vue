<template>
  <Layout>
    <div slot="page-bottom">
      <Subscribe />

      <Footer class="page-footer"/>
    </div>
  </Layout>
</template>


<script>
import Layout from '@default-theme/Layout.vue'

export default {
  components: {
    Layout
  }
}
</script>


<style lang="stylus" scoped>
  .page-footer
    text-align center
    margin-top 3rem
    font-size 0.9rem
</style>
