import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MetricsController } from './metrics.controller';
import * as promClient from 'prom-client';
import { MetricsService } from "./metrics.service";
import { RouteMetricsMiddleware } from "../common/middleware/route/metrics/route.metrics.middleware";

@Module({
  providers: [MetricsService, { provide: 'PROM_CLIENT', useValue: promClient }],
  controllers: [MetricsController],
  exports: ['PROM_CLIENT'],
})

export class MetricsModule implements NestModule {
  constructor(private readonly metricsCollector: MetricsService) {
    promClient.collectDefaultMetrics();
  }

  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RouteMetricsMiddleware).forRoutes('*');
  }
}
