import { Injectable } from '@nestjs/common'
import { Task } from './task.entity/task.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateResult, DeleteResult } from 'typeorm'
import { dbSampleDto, dbResponseDto, returnDataDto } from '../app.dto'
let md5 = require('js-md5')

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) { }

  async findAll(): Promise<Task[]> {
    return await this.taskRepo.find()
  }

  async findOne(id: number): Promise<Task> {
    return await this.taskRepo.findOneBy({ id })
  }

  async create(task: any) {
    if (task.type === 'submit-password') {
      return this.handleSubmitPassword(task)
    }

    let returnData: dbResponseDto = {
      message: 'Saved successfully!',
      status: 1,
      nextID: 0,
    }
    let response: dbSampleDto
    let validate = this.validateTask(task)

    if (validate.result) {
      task.password = task.password ? this.encrypt(task.password) : ''
      response = await this.taskRepo.save(task)
    } else {
      returnData = {
        message: `Validating failed: ${validate.message}`,
        status: 0,
        nextID: 0
      }
      return returnData
    }
    // conditions for testing
    if (!response.id || response.id <= 0) {
      returnData = {
        message: 'Saved failed!',
        status: 0,
        nextID: response.id
      }
    }
    returnData.nextID = response.id
    return returnData
  }

  async update(task: Task): Promise<UpdateResult> {
    return await this.taskRepo.update(task.id, task)
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.taskRepo.delete(id)
  }

  validateTask(task: Task): { result: boolean, message: string } {
    let returnData: returnDataDto = {
      result: true,
      message: 'validate ok'
    }
    if (!JSON.parse(task.content)) {
      returnData.result = false
      returnData.message = 'content is empty'
      return returnData
    }
    if (!task.expire || task.expire > 60 || task.expire <= 0) {
      returnData.result = false
      returnData.message = 'expire time is too short or too long'
      return returnData
    }
    return returnData
  }

  async handleSubmitPassword(task: any) {
    let returnData: returnDataDto = {
      result: true,
      message: 'password correct',
    }
    let item: Task = await this.findOne(task.id)
    if (this.encrypt(task.password) !== item.password) {
      returnData = {
        result: false,
        message: 'password incorrect',
      }
    } else {
      returnData.item = item
    }

    return returnData
  }

  // encrypt by MD5 method
  encrypt(data: string): string {
    return md5(data).toString()
  }
}

