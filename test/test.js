const cleaner = require('../htmlcleaner')
const fs = require('fs')

fs.readFile('raw.html', (err, raw) => {
  fs.writeFile('out-default.html', cleaner(raw), err => {
    if (err) {
      console.log(err)
    }
  })
  fs.writeFile(
    'out-removeAllStyle.html',
    cleaner(raw, 'removeAllStyle'),
    err => {
      if (err) {
        console.log(err)
      }
    }
  )
})
