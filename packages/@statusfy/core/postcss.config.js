const { postcss, path } = require('@statusfy/common')

const tailwindJS = path.join(__dirname, 'tailwind.js')

module.exports = {
  plugins: postcss.plugins(tailwindJS)
}
