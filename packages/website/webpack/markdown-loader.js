const loaderUtils = require('loader-utils')
const vueCompiler = require('vue-template-compiler')
const vueCompilerStripWith = require('vue-template-es2015-compiler')

const stringify = src => JSON.stringify(src).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')

const findEntry = mod => {
  if (mod.reasons.length > 0 && mod.reasons[0].module.resource) {
    return findEntry(mod.reasons[0].module)
  }
  return mod.resource;
}

// Based on https://github.com/hmsk/frontmatter-markdown-loader
module.exports = function (source) {
  if (this.cacheable) this.cacheable()

  const entry = findEntry(this._module)
  const options = loaderUtils.getOptions(this) || {}

  const {
    html,
    body,
    attributes
  } = options.markdown(entry, source)

  const template = html
    .replace(/<(code\s.+)>/g, '<$1 v-pre>')
    .replace(/<code>/g, '<code v-pre>')
  const compiled = vueCompiler.compile(`<div class="article-content">${template}</div>`)
  const render = `return ${vueCompilerStripWith(`function render() { ${compiled.render} }`)}`

  let staticRenderFns = ''
  if (compiled.staticRenderFns.length > 0) {
    staticRenderFns = `return ${vueCompilerStripWith(`[${compiled.staticRenderFns.map(fn => `function () { ${fn} }`).join(',')}]`)}`
  }

  const output = `
      body: ${stringify(body)},
      html: ${stringify(html)},
      attributes: ${stringify(attributes)},
      vue: {
        render: ${stringify(render)},
        staticRenderFns: ${stringify(staticRenderFns)},
        component: {
          data: function () {
            return {
              templateRender: null
            }
          },
          render: function (createElement) {
            return this.templateRender ? this.templateRender() : createElement("div", "Rendering");
          },
          created: function () {
            this.templateRender = ${vueCompilerStripWith(`function render() { ${compiled.render} }`)};
            this.$options.staticRenderFns = ${vueCompilerStripWith(`[${compiled.staticRenderFns.map(fn => `function () { ${fn} }`).join(',')}]`)};
          }
        }
      }
    `

  return `module.exports = { ${output} }`
}
