const _url = require('url')
const _isURL = require('validator/lib/isURL')

const isURL = (value) => {
  const url = _url.parse(value)

  if (url.pathname && url.pathname.startsWith('//')) {
    return false
  } else if (url.pathname && url.pathname.startsWith('/') && !url.hostname) {
    return true
  } else {
    return _isURL(value, {
      protocols: ['http', 'https'],
      require_tld: true,
      require_protocol: true,
      require_host: true,
      require_valid_protocol: true
    })
  }
}

module.exports = {
  isURL,
  isRFC3339: require('validator/lib/isRFC3339')
}
