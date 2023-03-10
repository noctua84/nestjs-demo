import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { CaslModule } from './security/casl/casl.module';
import { RolesModule } from './security/roles/roles.module';
import { UsersModule } from './security/users/users.module';
import { AuthModule } from './security/auth/auth.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { appConfig } from './config/app.config';
import { validationSchema } from './config/schema/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema,
    }),
    HealthModule,
    MetricsModule,
    CaslModule,
    RolesModule,
    UsersModule,
    AuthModule,
    RedisCacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
