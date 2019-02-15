<template>
  <ErrorPage :error="error" />
</template>

<script>
import ErrorPage from '~/layouts/error'

export default {
  layout: '404',
  components: {
    ErrorPage
  },
  data () {
    return {
      error: {
        statusCode: 404
      }
    }
  }
}
</script>
