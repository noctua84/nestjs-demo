import winston, { createLogger, Logger } from 'winston';
import { MongoDB } from 'winston-mongodb';
import { ConfigService } from '@nestjs/config';
import { utilities } from 'nest-winston';

const { combine, timestamp, json, errors } = winston.format;
const { nestLike } = utilities.format;

export const winstonLoggingFactory = (configService: ConfigService): Logger => {
  const appName: string = configService.get<string>('app.name');
  const dbUrl: string = configService.get<string>('db.mongo.url');
  const globalLogLevel: string =
    configService.get<string>('logging.global.level') || 'info';
  const consoleLogLevel: string =
    configService.get<string>('logging.console.level') || 'debug';
  const serverLogLevel: string =
    configService.get<string>('logging.server.level') || 'warn';
  const serverLogCollection: string =
    configService.get<string>('logging.server.collection') || 'server_logs';
  const crashLogLevel: string =
    configService.get<string>('logging.crash.level') || 'error';
  const crashLogCollection: string =
    configService.get<string>('logging.crash.collection') ||
    'server_crash_logs';
  const rejectionLogLevel: string =
    configService.get<string>('logging.rejection.level') || 'error';
  const rejectionLogCollection: string =
    configService.get<string>('logging.rejection.collection') ||
    'server_rejection_logs';
  const timeFormat: string =
    configService.get<string>('logging.global.time_format') ||
    'Do MMM, YYYY HH:mm:ss a Z';

  const globalLogFormat = combine(timestamp({ format: timeFormat }), json());
  const consoleLogFormat = combine(
    timestamp({ format: timeFormat }),
    errors({ stack: true }),
    nestLike(appName, {
      colors: true,
      prettyPrint: true,
    }),
  );

  return createLogger({
    level: globalLogLevel,
    exitOnError: false,
    format: globalLogFormat,
    transports: [
      new winston.transports.Console({
        format: consoleLogFormat,
        level: consoleLogLevel,
      }),
      new MongoDB({
        db: dbUrl,
        options: {
          useUnifiedTopology: true,
        },
        collection: serverLogCollection,
        level: serverLogLevel,
        storeHost: true,
        tryReconnect: true,
        leaveConnectionOpen: false,
      }),
    ],
    exceptionHandlers: [
      new MongoDB({
        db: dbUrl,
        options: {
          useUnifiedTopology: true,
        },
        collection: crashLogCollection,
        level: crashLogLevel,
        storeHost: true,
        tryReconnect: true,
        leaveConnectionOpen: false,
      }),
    ],
    rejectionHandlers: [
      new MongoDB({
        db: dbUrl,
        options: {
          useUnifiedTopology: true,
        },
        collection: rejectionLogCollection,
        level: rejectionLogLevel,
        storeHost: true,
        tryReconnect: true,
        leaveConnectionOpen: false,
      }),
    ],
  });
};
