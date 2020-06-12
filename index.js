const cleaner = require('./htmlcleaner')
const { notesFieldMap } = require('./ankiconnect')

// main
;(async function () {
  notesFieldMap({
    queryString: 'note:macmillan7000',
    field: 'expression',
    callback: origin => cleaner(origin)
  })
})()
