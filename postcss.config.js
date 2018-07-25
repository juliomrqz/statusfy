const join = require('path').join
const tailwindJS = join(__dirname, 'tailwind.js')

module.exports = {
  plugins: [
    require('tailwindcss')(tailwindJS),
    require('postcss-import'),
    require('autoprefixer'),
    require('postcss-preset-env'),
    require('css-mqpacker'),
    require('postcss-combine-duplicated-selectors'),
    require('cssnano')
  ]
}
