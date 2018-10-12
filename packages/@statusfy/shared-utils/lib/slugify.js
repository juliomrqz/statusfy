const slugify = require('slugify')

module.exports = (input, replacement = '_') => {
  return slugify(input, { replacement, lower: true });
}
