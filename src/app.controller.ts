import { Controller, Get, Req, Post, Param, Body } from '@nestjs/common'
import { Request } from 'express'
import { dbWrite } from './db'


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

@Controller()
export class AppController {
  @Get()
  route(): any {
    return {
      mes: 'successfully'
    }
  }
  getHello(): string {
    return 'Hello'
  }

  @Post()
  async create(@Body() dbData: dbSample) {
    let returnData: dbResponse
    await dbWrite(dbData, (data: dbResponse) => {
      console.log('await dbWrite', data)
      returnData = data
    })
    return returnData ? returnData : {}

  }
}
