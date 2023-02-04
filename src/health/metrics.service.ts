import { Injectable } from '@nestjs/common';
import * as promClient from 'prom-client';

@Injectable()
export class MetricsService {
  async getMetrics(): Promise<string> {
    return await promClient.register.metrics();
  }
}
