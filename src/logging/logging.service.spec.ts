import { Test, TestingModule } from '@nestjs/testing';
import { LoggingService } from './logging.service';
import { Logger } from 'winston';

describe('LoggingService', () => {
  let service: LoggingService;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggingService,
        {
          provide: 'winston',
          useValue: {
            error: jest.fn(),
            warn: jest.fn(),
            info: jest.fn(),
            debug: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LoggingService>(LoggingService);
    logger = module.get<Logger>('winston');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('error', () => {
    it('should call the logger with the correct level', () => {
      service.error('test message', { test: 'metadata' });
      expect(logger.error).toHaveBeenCalledWith('test message', {
        test: 'metadata',
      });
    });
  });

  describe('warn', () => {
    it('should call the logger with the correct level', () => {
      service.warn('test message', { test: 'metadata' });
      expect(logger.warn).toHaveBeenCalledWith('test message', {
        test: 'metadata',
      });
    });
  });

  describe('info', () => {
    it('should call the logger with the correct level', () => {
      service.info('test message', { test: 'metadata' });
      expect(logger.info).toHaveBeenCalledWith('test message', {
        test: 'metadata',
      });
    });
  });

  describe('debug', () => {
    it('should call the logger with the correct level', () => {
      service.debug('test message', { test: 'metadata' });
      expect(logger.debug).toHaveBeenCalledWith('test message', {
        test: 'metadata',
      });
    });
  });
});
