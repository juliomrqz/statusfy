const plugins = (tailwindJS) => {
  return {
    'postcss-import': {},
    ...tailwindJS ? { 'tailwindcss': tailwindJS } : {},
    'postcss-nested': {},
    'postcss-preset-env': {},
    'postcss-combine-duplicated-selectors': {},
    'autoprefixer': {},
  }
}

module.exports = {
  plugins
}
