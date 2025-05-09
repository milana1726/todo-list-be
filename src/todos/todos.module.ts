import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { todosProviders } from './todos.providers';

@Module({
  imports: [DatabaseModule],
  providers: [TodosService, ...todosProviders],
  controllers: [TodosController],
})
export class TodosModule {}
