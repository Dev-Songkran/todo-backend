import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Status, TodoEntity } from './entities/todo.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepo: Repository<TodoEntity>
  ) {
  }

  create(createTodoDto: CreateTodoDto) {
    return this.todoRepo.save(createTodoDto)
  }

  findAll() {
    return this.todoRepo.find({
      order: {
        createdAt: "DESC"
      }
    })
  }

  findOne(id: number) {
    return this.todoRepo.findOne({
      where: {
        id
      }
    })
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.todoRepo.update(id, updateTodoDto)
  }

  remove(id: number) {
    return this.todoRepo.delete(id)
  }

  async clear(all: boolean = false) {
    let where: FindOptionsWhere<TodoEntity> = {}

    where = all ? {} : { status: Status.SUCCESS }

    return this.todoRepo.createQueryBuilder('todo').softDelete().where(where).execute()
  }

  async analyze() {
    return {
      stat: await this.todoRepo.createQueryBuilder("todo")
        .select(`
          COUNT(*) as all,
          COUNT(todo.status) FILTER (WHERE todo.status = 'success') as Success,
          COUNT(todo.status) FILTER (WHERE todo.status = 'in-progress') as InProgress
        `)
        .withDeleted()
        .getRawOne(),
      list: await this.todoRepo.createQueryBuilder("todo")
        .select(`
          TO_CHAR(todo.createdAt, 'YYYY-MM-DD') as date,
          COUNT(todo.status) FILTER (WHERE todo.status = 'success') as Success,
          COUNT(todo.status) FILTER (WHERE todo.status = 'in-progress') as InProgress
        `)
        .orderBy("date", "ASC")
        .addSelect("COUNT(*) as total")
        .withDeleted() // include deleted items
        .groupBy("date")
        .getRawMany()
    }
  }
}
