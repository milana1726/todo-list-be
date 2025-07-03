import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from 'src/logger/custom-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject('LoggerService') private readonly logger: CustomLoggerService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const status = res.statusCode;
      const statusColor = this.getColorByStatus(status);
      const reset = '\x1b[0m';

      const logColoredMessage = `[HTTP] [${req.method}] ${req.originalUrl} | Response [${statusColor}${status}${reset}]`;
      const logCleanMessage = `[HTTP] [${req.method}] ${req.originalUrl} | Response [${status}]`;
      this.logger.logWithClean(logColoredMessage, logCleanMessage);
    });

    next();
  }

  private getColorByStatus(status: number): string {
    if (status >= 500) return '\x1b[31m'; // red
    if (status >= 400) return '\x1b[33m'; // yellow
    if (status >= 200) return '\x1b[32m'; // green
    return '\x1b[0m'; // reset all attributes
  }
}
