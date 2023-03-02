import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from './task/task.entity/task.entity'
import { TaskModule } from './task/task.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'piece',
      entities: [Task],
      synchronize: true, // remove in production
    }),
    TaskModule,
  ],
})
export class AppModule { }
