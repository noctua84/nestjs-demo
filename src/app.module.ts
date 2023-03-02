import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { CaslModule } from './security/casl/casl.module';
import { RolesModule } from './security/roles/roles.module';
import { UsersModule } from './security/users/users.module';
import { AuthModule } from './security/auth/auth.module';

@Module({
  imports: [
    HealthModule,
    MetricsModule,
    CaslModule,
    RolesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
