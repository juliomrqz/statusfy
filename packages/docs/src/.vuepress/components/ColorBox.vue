<template>
  <div :title="`Color: ${color}`">
    <span class="box" :style="`background-color: ${color};`">&nbsp;</span>
    <span class="text">{{ color }}</span>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: true
    }
  }
}
</script>

<style scoped>
  .box {
    border: 1px solid #e1e4e8;
    height: 18px;
    width: 18px;
    display: inline-block;
    border-radius: 4px;
  }
</style>
