import { Injectable } from '@nestjs/common'
import { Task } from './task.entity/task.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateResult, DeleteResult } from 'typeorm'
import { dbSampleDto, dbResponseDto } from '../app.dto'

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

  async create(task: Task) {
    let returnData: dbResponseDto = {
      message: 'Saved successfully!',
      status: 1,
      nextID: 0,
    }

    const response: dbSampleDto = await this.taskRepo.save(task)
    // conditions for testing
    if (!response.id || response.id < 0 || response.id > 100) {
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
}

