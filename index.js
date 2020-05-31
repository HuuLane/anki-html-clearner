const cleaner = require('./htmlcleaner')
const { updateNotesField } = require('./ankiconnect')

// main
;(async function () {
  updateNotesField(
    // query
    // 'note:ODH -tag:Twitter -tag:YouTube -tag:os -tag:book'
    // 'deck:words reinvent'
    // 'deck:words'
    // 'deck:words surge'
    // 'deck:"System Design"',
    'tag:cs Immutable objects are thread safe',

    // filed
    'sentence',
    // 'Back',

    // callback
    origin => cleaner(origin)
  )
})()
