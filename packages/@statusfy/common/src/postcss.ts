export const postcss = (tailwindJS: Object) => {
  return {
    'postcss-import': {},
    ...tailwindJS ? { 'tailwindcss': tailwindJS } : {},
    'postcss-nested': {},
    'postcss-preset-env': {},
    'postcss-combine-duplicated-selectors': {},
    'autoprefixer': {},
  }
}
