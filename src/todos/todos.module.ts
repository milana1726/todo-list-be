import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { todosProviders } from './todos.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...todosProviders],
  controllers: [],
})
export class TodosModule {}
