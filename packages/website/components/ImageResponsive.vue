<template>
  <span
    v-lazy-container="{ selector: 'img' }"
    class="image-placeholder"
    :class="{ fluid: fluid, 'rounded-full': rounded }"
  >
    <img
      :src="imagePlaceholder"
      :data-src="imageSource"
      :data-loading="imagePlaceholder"
      :width="`${width}`"
      :height="`${height}`"
      :class="finalClass"
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
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imageSource() {
      return require(`~/assets/img/${this.source}`)
    },
    imagePlaceholder() {
      const { placeholder } = require(`~/assets/img/${this.source}?resize&placeholder=true`)
      return placeholder
    },
    finalClass() {
      let theClass = this.classes

      if (this.rounded) {
        theClass += ' rounded-full'
      }

      return theClass
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
