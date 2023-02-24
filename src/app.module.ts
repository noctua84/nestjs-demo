import { Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { CaslModule } from './casl/casl.module';
import { RolesModule } from './roles/roles.module';


@Module({
  imports: [HealthModule, MetricsModule, CaslModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
