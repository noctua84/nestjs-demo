import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { RequestMetricsMiddleware } from "./common/middleware/route.metrics.middleware";


@Module({
  imports: [HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestMetricsMiddleware)
      .forRoutes('*');
  }
}
