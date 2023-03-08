import { Controller, Get, Req, Post, Param, Body } from '@nestjs/common'
// import { dbWrite, dbRead } from './db-firebase'
// import { dbSampleDto } from './app.dto'

@Controller()
export class AppController {
  // @Get('id/:id')
  // async findOne(@Param('id') id: number) {
  //   let data: dbSampleDto
  //   await dbRead(id).then((snapshot: any) => {
  //     data = snapshot.val()
  //     console.log(data)
  //   })
  //   return data
  // }

  // @Post()
  // async create(@Body() dbData: dbSampleDto) {
  //   return await dbWrite(dbData)
  // }
}