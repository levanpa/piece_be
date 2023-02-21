import { Controller, Get, Req, Post, Param, Body } from '@nestjs/common'
import { dbWrite } from './db'
import { dbSample } from './app.dto'

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello'
  }

  @Post()
  async create(@Body() dbData: dbSample) {
    return await dbWrite(dbData)
  }
}
