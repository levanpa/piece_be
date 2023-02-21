type dbSample = {
  content: string,
  createDate: number,
  password?: string,
  expire?: number,
}
type dbResponse = {
  status: number,
  message: string,
  nextID: number
}

export { dbSample, dbResponse }