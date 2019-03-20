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
      return require(`~/assets/img/${this.source}?lqip`)
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

<style lang="scss" scoped>
.image-placeholder {
  overflow: hidden;
  line-height: 0;
  display: inline-block;

  &.fluid {
    img {
      width: 100%;
      max-width: 100%;
      height: auto;
    }
  }
}

img {
  transition: all ease 0.3s;
  opacity: 0.95;
  filter: blur(15px);

  &[lazy='loading'] {
    opacity: 1;
    filter: blur(15px);
  }

  &[lazy='loaded'] {
    opacity: 1;
    filter: none;
  }
}
</style>
