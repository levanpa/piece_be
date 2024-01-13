type dbSampleDto = {
  id?: number
  content: string
  created: number
  expire?: number
}
type dbResponseDto = {
  status: number
  message: string
  id: string
}

type returnDataDto = {
  result: boolean
  message: string
  [index: string]: any
}

export { dbSampleDto, dbResponseDto, returnDataDto }
