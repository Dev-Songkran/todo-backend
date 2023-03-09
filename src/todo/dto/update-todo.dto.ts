import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsEnum, IsString } from 'class-validator';
import { Status } from '../entities/todo.entity';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsEnum(Status)
  status: Status;
}
