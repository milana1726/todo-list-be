import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CustomLoggerModule } from './logger/custom-logger.module';

@Module({
  imports: [CustomLoggerModule, TodosModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
