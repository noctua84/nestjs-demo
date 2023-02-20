import { Module } from "@nestjs/common";
import { LoggingService } from './logging.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import { winstonLoggingFactory } from "./config/winston.config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    WinstonModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const serverLogs = winstonLoggingFactory(configService);
        return {
          transports: serverLogs.transports,
          format: serverLogs.format,
          level: serverLogs.level,
          exceptionHandlers: serverLogs.exceptions,
          rejectionHandlers: serverLogs.rejections,
          exitOnError: serverLogs.exitOnError,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [LoggingService],
  exports: [LoggingService]
})

export class LoggingModule {
}
