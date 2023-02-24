import { Controller, Get, Inject } from "@nestjs/common";
import { MetricsService } from "./metrics.service";
import { Roles } from "../roles/roles.decorator";

@Controller('metrics')
export class MetricsController {
  constructor(
    private metrics: MetricsService
  ) {}

  @Get()
  @Roles('admin')
  async getMetrics(): Promise<string> {
    return await this.metrics.getMetrics();
  }
}
