import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private todosService: TodosService) { }

    @Post()
    create(@Body() createTodoDto: CreateTodoDto) {
        return this.todosService.create(createTodoDto);
    }

    @Get()
    findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
        const pageNum = Number(page) || 0;
        const limitNum = Number(limit) || 0;
        return this.todosService.findAll(pageNum, limitNum);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.todosService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todosService.update(id, updateTodoDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.todosService.delete(id);
    }
}
