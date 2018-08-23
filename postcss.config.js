const join = require('path').join
const tailwindJS = join(__dirname, 'tailwind.js')

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')(tailwindJS),
    require('postcss-nested'),
    require('postcss-preset-env'),
    require('autoprefixer'),
    require('css-mqpacker'),
    require('postcss-combine-duplicated-selectors'),
    require('cssnano')
  ]
}
