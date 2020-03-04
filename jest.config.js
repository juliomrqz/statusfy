// https://github.com/facebook/jest/tree/master/packages/babel-jest
// TODO remove 'babel-core@^7.0.0-0' when babel-jest can work with '@babel/core'

const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname),
  verbose: true,
  roots: [
    'packages/',
  ],
  testURL: 'http://localhost/',
  moduleFileExtensions: [
    'js',
    'vue',
    'json'
  ],
  moduleNameMapper: {
    '^@/markdown/(.*)$': '<rootDir>/packages/@statusfy/markdown/$1',
    '^@/core/(.*)$': '<rootDir>/packages/@statusfy/core/$1',
    '^@/common/(.*)$': '<rootDir>/packages/@statusfy/common/$1'
  },
  transform: {
    '^.+\\.js$': ['babel-jest', { cwd: __dirname }],
    '.*\\.(vue)$': 'vue-jest'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  globals: {
    'vue-jest': {
      babelConfig: './babel.config.js'
    }
  }
}
