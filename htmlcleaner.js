const sanitizeHtml = require('sanitize-html-hacked')

const defaults = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    // We don't currently allow img itself by default, but this
    // would make sense if we did. You could add srcset here,
    // and if you do the URL is checked for safety
    img: ['src'],
    '*': ['style']
  },
  disallowedStyles: ["font-family"]
}

module.exports = cleaner = (data) => {
  return sanitizeHtml(data, defaults)
}
