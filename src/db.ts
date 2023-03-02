import { dbSampleDto, dbResponseDto } from './app.dto'
import { TaskController } from './task/task.controller'

const HOST_URL = 'http://localhost:3000/'

function dbRead(id: number) {
  // return await TaskController.get(id)
}

function dbWrite() { }

function getNextID() { }



export { dbRead, dbWrite, getNextID }