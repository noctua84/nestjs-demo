import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';

@Injectable()
export class LoggingService {
  constructor(@Inject('winston') private readonly logger: Logger) {}

  info(message: string, metadata?: Record<string, any>): void {
    this.logger.info(message, metadata);
  }

  error(message: string, metadata?: Record<string, any>): void {
    this.logger.error(message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>): void {
    this.logger.warn(message, metadata);
  }

  debug(message: string, metadata?: Record<string, any>): void {
    this.logger.debug(message, metadata);
  }
}
