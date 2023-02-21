import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, get, set, update, child } from 'firebase/database'

// firebase
const firebaseConfig = {
  databaseURL: "https://piece-0001-default-rtdb.asia-southeast1.firebasedatabase.app/",
}
const dbApp = initializeApp(firebaseConfig)
const db = getDatabase(dbApp)

type dbSample = {
  content: string,
  createDate: number,
  password?: string,
  expire?: number,
}
type dbResponse = {
  status: number,
  message: string,
  postId: number
}

function dbRead(id: number, callback: (a: dbSample) => void) {
  const reference = ref(db, `pieces/${id}`)
  onValue(reference, (snapshot) => {
    callback(snapshot.val())
  }, { onlyOnce: true })
}

async function dbWrite(dataJson: any, callback: (data: dbResponse) => void) {
  let status: number, message: string, postId: number
  let data = dataJson
  message = 'Saved successfully!'
  status = 1
  postId = 1

  getNextID((nextID) => {
    // conditions for testing
    if (nextID > 0 && nextID < 100) {
      let promise = set(ref(db, `pieces/${nextID}`), {
        content: data.content,
        password: data.password || '',
        expire: data.expire || 0,
        created: data.createDate || '',
      })
      promise.then(() => {
        postId = nextID
        // increase nextID every time add new one
        update(ref(db), { '/pieces/nextID': ++nextID })
        if (typeof callback === 'function') callback({ status, message, postId })
      }).catch((error) => {
        console.log(222)
        status = 0
        message = 'error: ' + error.message
        postId = 0
        if (typeof callback === 'function') callback({ status, message, postId })
      })
    }
  })
}

async function getNextID(callback: (a: number) => void) {
  // get(child(ref(db), `pieces/nextID`)).then((snapshot) => {
  //   callback(snapshot.val())
  // })
  onValue(ref(db, `pieces/nextID`), (snapshot) => {
    callback(snapshot.val())
  }, { onlyOnce: true })
}

export { dbRead, dbWrite, getNextID }