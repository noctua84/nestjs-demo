import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-demo', 'http://localhost:3000/'),
      () =>
        this.http.pingCheck(
          'nestjs-demo documentation',
          'http://localhost:3000/documentation',
        ),
      () => this.db.pingCheck('database'),
      // () => this.disk.checkStorage('storage', { threshold: 40 * 1024 * 1024 * 1024, path: process.cwd() }), // 40GB
      () => this.memory.checkHeap('memory', 100 * 1024 * 1024), // 100MB
      () => this.memory.checkRSS('memory', 100 * 1024 * 1024), // 100MB
    ]);
  }
}
