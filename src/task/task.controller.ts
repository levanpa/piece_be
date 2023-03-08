import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { TaskService } from './task.service'
import { Task } from './task.entity/task.entity'


@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll()
  }

  @Get(':id')
  async get(@Param() params: any) {
    let item = await this.taskService.findOne(params.id)

    // check if exists
    if (!item) return new Promise((resolve) => {
      resolve({
        error: true,
        message: 'This task is not found'
      })
    })

    // check if expired
    let isExpired = item.created * 1 + item.expire * 60000 < Date.now()
    if (isExpired) {
      // update db
      item.isExpired = true
      this.update(item)
      return new Promise((resolve) => {
        resolve({
          error: true,
          message: 'This task is expired'
        })
      })
    }

    // check if protected by password
    if (item.password != '') {
      return new Promise((resolve) => {
        resolve({
          passwordRequired: true,
          error: false,
          message: 'This task is protected by password'
        })
      })
    }

    return item
  }

  @Post()
  create(@Body() task: Task) {
    return this.taskService.create(task)
  }

  @Put()
  update(@Body() task: Task) {
    return this.taskService.update(task)
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.taskService.delete(params.id)
  }
}

