<script lang="js">
/* eslint-disable vue/require-prop-types, no-unused-expressions, no-new-func */

export default {
  props: ['renderFunc', 'staticRenderFuncs'],
  mounted() {
    this.initHighlightJs
  },
  created: function () {
    this.templateRender = new Function(this.renderFunc)()
    this.$options.staticRenderFns = new Function(this.staticRenderFuncs)()
  },
  render: function (createElement) {
    return this.templateRender ? this.templateRender() : createElement('div', 'Rendering')
  }
}
</script>
