<template>
  <div :class="{supported: isSuported, unsupported: !isSuported}">
    <span v-if="isSuported">✔︎</span>
    <span v-else>✘</span>
  </div>
</template>

<script>
export default {
  props: {
    isSuported: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
  .supported {
    color: green;
  }

  .unsupported {
    color: red;
  }
</style>
