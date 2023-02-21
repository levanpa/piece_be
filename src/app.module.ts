import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { IdController } from './id/id.controller';

@Module({
  controllers: [AppController, IdController],
  providers: [AppService],
})
export class AppModule { }
