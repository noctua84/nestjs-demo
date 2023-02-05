import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import {
  DiskHealthIndicator,
  HealthCheckService,
  HttpHealthIndicator, MemoryHealthIndicator,
  TypeOrmHealthIndicator,
  TerminusModule,
} from "@nestjs/terminus";
import { HealthCheckExecutor } from "@nestjs/terminus/dist/health-check/health-check-executor.service";
import { TERMINUS_LOGGER } from "@nestjs/terminus/dist/health-check/logger/logger.provider";
import { ERROR_LOGGER } from '@nestjs/terminus/dist/health-check/error-logger/error-logger.provider';
import { CHECK_DISK_SPACE_LIB } from "@nestjs/terminus/dist/terminus.constants";


describe('HealthController', () => {
  let controller: HealthController;
  let service: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      imports: [TerminusModule],
      providers: [
        HealthCheckService,
        HttpHealthIndicator,
        TypeOrmHealthIndicator,
        DiskHealthIndicator,
        MemoryHealthIndicator,
        HealthCheckExecutor,
        { provide: ERROR_LOGGER, useValue: { setContext: jest.fn() } },
        { provide: TERMINUS_LOGGER, useValue: { setContext: jest.fn()}  },
        { provide: CHECK_DISK_SPACE_LIB, useValue: jest.fn()},
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    service = module.get<HealthCheckService>(HealthCheckService);
  });

  describe('create the controller', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
