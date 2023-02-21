import { Controller, Get } from '@nestjs/common';

@Controller('id')
export class IdController {
  @Get()
  find(): any {
    return {
      mes: 'successfully id'
    }
  }
}