import { ConsoleLogger, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export class CustomLoggerService
  extends ConsoleLogger
  implements LoggerService
{
  constructor(context: string) {
    super(context);
  }

  private static writeLog(level: string, message: string) {
    const timestamp = new Date().toISOString();
    const fullMessage = `[${timestamp}] ${level.toUpperCase()} ${message}`;

    fs.mkdirSync('logs', { recursive: true });
    fs.appendFileSync(path.join('logs', 'app.log'), fullMessage + '\n');

    if (level === 'error' || level === 'warn') {
      fs.appendFileSync(path.join('logs', 'error.log'), fullMessage + '\n');
    }
  }

  logWithClean(coloredMessage: string, cleanMessage: string) {
    super.log(coloredMessage);
    CustomLoggerService.writeLog('log', cleanMessage);
  }

  log(message: string) {
    super.log(message);
    CustomLoggerService.writeLog('log', message);
  }

  error(message: string, trace?: string) {
    CustomLoggerService.writeLog(
      'error',
      `${message}${trace ? `\n${trace}` : ''}`,
    );
  }

  warn(message: string) {
    super.warn(message);
    CustomLoggerService.writeLog('warn', message);
  }

  debug(message: string) {
    super.debug(message);
    CustomLoggerService.writeLog('debug', message);
  }

  verbose(message: string) {
    super.verbose(message);
    CustomLoggerService.writeLog('verbose', message);
  }
}
