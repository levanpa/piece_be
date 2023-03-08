type dbSampleDto = {
  id?: number,
  content: string,
  created: number,
  password?: string,
  expire?: number,
}
type dbResponseDto = {
  status: number,
  message: string,
  nextID: number
}

type returnDataDto = {
  result: boolean,
  message: string,
  [index: string]: any
}

export { dbSampleDto, dbResponseDto, returnDataDto }