const plugins = (tailwindJS) => {
  return [
    require('postcss-import'),
    tailwindJS ? require('tailwindcss')(tailwindJS) : null,
    require('postcss-nested'),
    require('postcss-preset-env'),
    require('autoprefixer'),
    require('css-mqpacker'),
    require('postcss-combine-duplicated-selectors'),
    require('cssnano')
  ]
}

module.exports = {
  plugins
}
