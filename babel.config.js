module.exports = () => {
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
