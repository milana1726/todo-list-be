import { Module, Global } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';

@Global()
@Module({
  providers: [
    {
      provide: 'LoggerService',
      useClass: CustomLoggerService,
    },
  ],
  exports: ['LoggerService'],
})
export class CustomLoggerModule {}
