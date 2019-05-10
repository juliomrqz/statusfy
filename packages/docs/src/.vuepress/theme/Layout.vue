<template>
  <ParentLayout>
    <div slot="sidebar-top">
      <Partners mode="sidebar" />
    </div>
    <div slot="page-bottom">
      <Subscribe />

      <Footer class="page-footer"/>
    </div>
  </ParentLayout>
</template>


<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'

export default {
  components: {
    ParentLayout
  }
}
</script>


<style lang="stylus" scoped>
  .page-footer
    text-align center
    margin-top 3rem
    font-size 0.9rem
</style>
