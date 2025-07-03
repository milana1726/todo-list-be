import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@Inject('TODO_MODEL') private todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createTodo = new this.todoModel(createTodoDto);
    return createTodo.save();
  }

  findAll(page = 0, limit = 0) {
    const query = this.todoModel.find().sort({ createdAt: -1 });
    if (page > 0 && limit > 0) {
      query.skip((page - 1) * limit).limit(limit);
    }
    return query.cursor();
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) throw new NotFoundException(`Todo #${id} not found!`);
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const updateTodo = await this.todoModel
      .findByIdAndUpdate(id, updateTodoDto, { new: true })
      .exec();
    if (!updateTodo) throw new NotFoundException(`Todo #${id} not found!`);
    return updateTodo;
  }

  async delete(id: string): Promise<void> {
    const deleteTodo = await this.todoModel.findByIdAndDelete(id).exec();
    if (!deleteTodo) throw new NotFoundException(`Todo #${id} not found!`);
  }
}
