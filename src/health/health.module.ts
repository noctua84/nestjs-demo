import { Module } from '@nestjs/common';
import { TerminusModule } from "@nestjs/terminus";
import { HealthController } from './health.controller';
import { HttpModule } from "@nestjs/axios";
import { MetricsService } from './metrics.service';
import * as promClient from 'prom-client';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [MetricsService],
})
export class HealthModule {
  constructor(private readonly metricsCollector: MetricsService) {
    promClient.collectDefaultMetrics();
  }
}
