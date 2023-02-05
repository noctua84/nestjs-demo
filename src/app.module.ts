import { Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';


@Module({
  imports: [HealthModule, MetricsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
