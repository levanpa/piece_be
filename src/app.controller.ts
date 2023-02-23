import { Controller, Get, Req, Post, Param, Body } from '@nestjs/common'
import { dbWrite, dbRead } from './db'
import { dbSample } from './app.dto'

@Controller()
export class AppController {
  @Get('id/:id')
  async findOne(@Param('id') id: number) {
    let data: dbSample
    await dbRead(id).then((snapshot) => {
      data = snapshot.val()
    })
    return data
  }

  @Post()
  async create(@Body() dbData: dbSample) {
    return await dbWrite(dbData)
  }
}
