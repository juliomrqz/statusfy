const join = require('path').join
const { postcss } = require('@statusfy/common')

const tailwindJS = join(__dirname, 'tailwind.js')

module.exports = {
  plugins: postcss.plugins(tailwindJS)
}
