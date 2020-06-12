const cleaner = require('./htmlcleaner')
const { notesFieldMap, notesMultiFieldMap } = require('./ankiconnect')

// main
;(async function () {
  // notesFieldMap({
  //   queryString: 'note:macmillan7000',
  //   field: 'expression',
  //   callback: origin => cleaner(origin)
  // })

  notesMultiFieldMap({
    queryString: 'note:macmillan7000',
    callback: ({ expression }) => {
      const i = expression.indexOf('[')
      if (i === -1) {
        return null
      }

      return {
        expression: expression.slice(0, i).trim(),
        audio: expression.slice(i)
      }
    }
  })
})()
