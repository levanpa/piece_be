import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get, set, update, child } from 'firebase/database'
import { dbSampleDto, dbResponseDto } from './app.dto'

// firebase
const firebaseConfig = {
  databaseURL: "https://piece-0001-default-rtdb.asia-southeast1.firebasedatabase.app/",
}
const dbApp = initializeApp(firebaseConfig)
const db = getDatabase(dbApp)

async function dbRead(id: number) {
  return await get(child(ref(db), `pieces/${id}`))
}

async function dbWrite(data: dbSampleDto) {
  let nextID: number
  let returnData: dbResponseDto = {
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
      created: data.created || '',
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