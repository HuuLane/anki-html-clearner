const sanitizeHtml = require('sanitize-html')
const deepmerge = require('deepmerge')

const defaults = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    // We don't currently allow img itself by default, but this
    // would make sense if we did. You could add srcset here,
    // and if you do the URL is checked for safety
    img: ['src']
  }
}

options = {
  removeAllStyle: defaults,

  keepAllStyle: deepmerge(defaults, {
    allowedAttributes: {
      '*': ['style']
    }
  }),

  // TODO
  // keepAllStyleExceptTheFontFamily: deepmerge(defaults, {
  //   allowedAttributes: {
  //     '*': ['style']
  //   },
  //   allowedStyles: {
  //     '*': {
  //       'font-family': []
  //     }
  //   }
  // }),

  yourCustom: deepmerge(defaults, {})
}

module.exports = cleaner = (data, option = 'keepAllStyle') => {
  // console.log(options[option])
  return sanitizeHtml(data, options[option])
}
