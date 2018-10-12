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
    'vue'
  ],
  moduleNameMapper: {
    '^@/markdown/(.*)$': '<rootDir>/packages/@statusfy/markdown/$1',
    '^@/core/(.*)$': '<rootDir>/packages/@statusfy/core/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue'
  ]
}
