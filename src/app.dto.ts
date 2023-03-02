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

export { dbSampleDto, dbResponseDto }