module.exports = (api) => {
  api.cache(true)

  return {
    env: {
      test: {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }]
        ]
      }
    }
  }
}
