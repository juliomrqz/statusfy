<template>
  <div class="h-100 w-100">
    <GlobalMessage />

    <Navbar mode="dark" />

    <nuxt />

    <TheFooter />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import TheFooter from '~/components/Footer'
import GlobalMessage from '~/components/common/GlobalMessage'
import BaseLayout from '~/components/mixins/BaseLayout'

export default {
  components: {
    Navbar,
    TheFooter,
    GlobalMessage
  },
  mixins: [BaseLayout],
}
</script>
