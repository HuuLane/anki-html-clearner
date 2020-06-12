const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

function invoke (action, version, params = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('error', () => reject('failed to issue request'))
    xhr.addEventListener('load', () => {
      try {
        const response = JSON.parse(xhr.responseText)
        if (Object.getOwnPropertyNames(response).length != 2) {
          throw 'response has an unexpected number of fields'
        }
        if (!response.hasOwnProperty('error')) {
          throw 'response is missing required error field'
        }
        if (!response.hasOwnProperty('result')) {
          throw 'response is missing required result field'
        }
        if (response.error) {
          throw response.error
        }
        resolve(response.result)
      } catch (e) {
        reject(e)
      }
    })

    xhr.open('POST', 'http://127.0.0.1:8765')
    xhr.send(JSON.stringify({ action, version, params }))
  })
}

const query = async function (queryString) {
  return invoke('findNotes', 6, {
    // query: 'deck:default'
    query: queryString
  })
}

async function * notesInfo (notesID) {
  for (const id of notesID) {
    // the api notesInfo is not stable when passing too many notes at once
    // so, using iter here
    const r = await invoke('notesInfo', 6, {
      notes: [id]
    })
    yield [id, r[0]]
  }
}

const notesFieldMap = async ({ queryString, field, callback }) => {
  const notesID = await query(queryString)
  for await (const [id, note] of notesInfo(notesID)) {
    const origin = note.fields[field].value
    const processed = callback(origin)
    console.log(`${id} modified: ${processed !== origin}`)

    try {
      // console.log(callback(origin))
      await invoke('updateNoteFields', 6, {
        note: {
          id,
          fields: {
            // field: 'new field content'
            [field]: processed
          }
        }
      })
    } catch (error) {
      console.log(error)
      break
    }
  }
}

module.exports = {
  notesFieldMap: notesFieldMap
}
