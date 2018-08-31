const path = require('path')

const generateContent = require('../../test/demo/generate-content')

const prepare = () => {
  generateContent(
    path.resolve(__dirname, '../content'),
    new Date(),
    50
  )
}

prepare()
