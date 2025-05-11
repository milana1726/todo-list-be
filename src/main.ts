import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { CustomLoggerService } from './logger/custom-logger.service';
import { HttpExceptionFilter } from './filter/http-exception.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const logger = app.get(CustomLoggerService);
  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`🚀 Server is running on PORT ${process.env.PORT}`);
}
void bootstrap();
