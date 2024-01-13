import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get, set, update, child } from 'firebase/database'
import { dbSampleDto, dbResponseDto } from './app.dto'
import { Md5 } from 'ts-md5'

// firebase
const firebaseConfig = {
  databaseURL:
    'https://piece-0001-default-rtdb.asia-southeast1.firebasedatabase.app/',
}
const dbApp = initializeApp(firebaseConfig)
const db = getDatabase(dbApp)

async function dbRead(id: number) {
  return await get(child(ref(db), `pieces/${id}`))
}

async function dbWrite(data: dbSampleDto) {
  let id: string = Md5.hashStr(data.content)
  let returnData: dbResponseDto = {
    message: 'Saved successfully!',
    status: 1,
    id,
  }

  await set(ref(db, `pieces/${id}`), {
    content: data.content,
    expire: data.expire || 0,
    created: data.created || '',
  }).catch((error) => {
    returnData = {
      message: error.message,
      status: 0,
      id,
    }
  })

  return returnData
}

export { dbRead, dbWrite }
