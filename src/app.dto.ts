type dbSampleDto = {
  id?: number
  content: string
  created: number
  expire?: number
  isExpired?: boolean
}
type dbResponseDto = {
  status: number
  message: string
  id: string | number
}

type returnDataDto = {
  result: boolean
  message: string
  [index: string]: any
}

export { dbSampleDto, dbResponseDto, returnDataDto }
