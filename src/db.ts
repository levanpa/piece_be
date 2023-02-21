import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, get, set, update, child } from 'firebase/database'
import { dbSample, dbResponse } from './app.dto'

// firebase
const firebaseConfig = {
  databaseURL: "https://piece-0001-default-rtdb.asia-southeast1.firebasedatabase.app/",
}
const dbApp = initializeApp(firebaseConfig)
const db = getDatabase(dbApp)

function dbRead(id: number, callback: (a: dbSample) => void) {
  const reference = ref(db, `pieces/${id}`)
  onValue(reference, (snapshot) => {
    callback(snapshot.val())
  }, { onlyOnce: true })
}

async function dbWrite(data: dbSample) {
  let nextID: number
  let returnData: dbResponse = {
    message: 'Saved successfully!',
    status: 1,
    nextID: 1,
  }

  await getNextID().then((snapshot: any) => {
    nextID = parseInt(snapshot.val(), 10)
  })

  // conditions for testing
  if (!nextID || nextID < 0 || nextID > 100) {
    returnData = {
      message: 'Saved failed!',
      status: 0,
      nextID,
    }
  } else {
    await set(ref(db, `pieces/${nextID}`), {
      content: data.content,
      password: data.password || '',
      expire: data.expire || 0,
      created: data.createDate || '',
    }).then(() => {
      returnData.nextID = nextID
      // increase nextID every time add new one
      update(ref(db), { '/pieces/nextID': ++nextID })
    }).catch((error) => {
      returnData = {
        message: error.message,
        status: 0,
        nextID,
      }
    })
  }
  return returnData
}

async function getNextID() {
  return await get(child(ref(db), `pieces/nextID`))
}

export { dbRead, dbWrite, getNextID }