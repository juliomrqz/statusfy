const slugify = require('slugify')
const isString = require('lodash.isstring')

module.exports = (text, replacement = '_') => {
  if (isString(text)) {
    return slugify(text, { replacement, lower: true });
  } else {
    return ''
  }
}
