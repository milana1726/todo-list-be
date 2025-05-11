import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { CustomLoggerService } from 'src/logger/custom-logger.service';

@Module({
  providers: [CustomLoggerService, ...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
