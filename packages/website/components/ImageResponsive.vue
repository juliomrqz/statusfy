<template>
  <span
    v-lazy-container="{ selector: 'img' }"
    class="image-placeholder"
    :class="{ fluid: fluid }"
  >
    <img
      :src="placeholder"
      :data-src="source"
      :data-loading="placeholder"
      :width="`${width}`"
      :height="`${height}`"
      :class="classes"
      :alt="alt"
    >
  </span>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    classes: {
      type: String,
      default: ''
    },
    fluid: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.image-placeholder {
  @apply overflow-hidden leading-none inline-block;

  &.fluid {
    img {
      @apply max-w-full h-auto;
    }
  }
}

img {
  @apply opacity-75;
  transition: all ease 0.3s;
  filter: blur(15px);

  &[lazy='loading'] {
    @apply opacity-100;
    filter: blur(15px);
  }

  &[lazy='loaded'] {
    @apply opacity-100;
    filter: none;
  }
}
</style>
