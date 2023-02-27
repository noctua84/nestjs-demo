import { RouteMetricsMiddleware } from './route.metrics.middleware';
import client from 'prom-client';
import { Request, Response } from "express";
import sinon from 'sinon';

describe('RouteMetricsMiddleware', () => {
  let req: Request;
  let res: Response;
  let next: sinon.SinonSpy;
  let middleware: RouteMetricsMiddleware;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    next = sinon.spy();
    middleware = new RouteMetricsMiddleware(client);
    client.register.clear();
  })

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should increase the requests total and successful requests total counters', async () => {
    req.originalUrl = '/test';
    res.statusCode = 200;
    res.on = (event, callback) => {
      if (event === 'finish') {
        callback();
      }

      return res;
    }

    middleware.use(req, res, next);

    const metrics = await client.register.metrics();
    const requestsTotal = client.register.getSingleMetric('test_requests_total');
    const successfulRequestsTotal = client.register.getSingleMetric('test_successful_requests_total');

    expect(requestsTotal).toBeDefined();
    expect(successfulRequestsTotal).toBeDefined();

    setTimeout(() => {
      expect(metrics).toContain('test_successful_requests_total{route="test",success="success"} 1');
      expect(metrics).toContain('test_requests_total{route="test",all="all"} 1');
    }, 100);
  });

  it('should increase the requests total and failed requests total counters', async () => {
    req.originalUrl = '/test';
    res.statusCode = 400;
    res.on = (event, callback) => {
      if (event === 'finish') {
        callback();
      }

      return res;
    }

    middleware.use(req, res, next);

    const metrics = await client.register.metrics();
    const requestsTotal = client.register.getSingleMetric('test_requests_total');
    const failedRequestsTotal = client.register.getSingleMetric('test_failed_requests_total');

    expect(requestsTotal).toBeDefined();
    expect(failedRequestsTotal).toBeDefined();

    setTimeout(() => {
      expect(metrics).toContain('test_failed_requests_total{route="test",error="error"} 1');
      expect(metrics).toContain('test_requests_total{route="test",all="all"} 1');
    }, 100);
  });

  it('should update the request duration histogram for a successful request', async () => {
    req.originalUrl = '/test';
    res.statusCode = 200;
    res.on = (event: string, callback: Function) => {
      if (event === 'finish') {
        callback();
      }

      return res;
    };

    middleware.use(req, res, next);

    const metrics = await client.register.metrics();
    client.register.getSingleMetric('test_request_duration_seconds');

    setTimeout(() => {
      expect(metrics).toContain('test_request_duration_seconds_bucket{route="test",le="0.005"} 1');
      expect(metrics).toContain('test_request_duration_seconds_bucket{route="test",le="0.01"} 1');
      expect(metrics).toContain('test_request_duration_seconds_bucket{route="test",le="0.025"} 1');
      expect(metrics).toContain('test_request_duration_seconds_bucket{route="test",le="0.05"} 1');
      expect(metrics).toContain('test_request_duration_seconds_bucket{route="test",le="0.1"} 1');
      expect(metrics).toContain('test_request_duration_seconds_bucket{route="test",le="0.25"} 1');
      expect(metrics).toContain('test_request_duration_seconds_bucket{route="test",le="0.5"} 1');
      expect(metrics).toContain('test_request_duration_seconds_bucket{route="test",le="1"} 1');
      expect(metrics).toContain('test_request_duration_seconds_bucket{route="test",le="2.5"} 1');
      expect(metrics).toContain('test_request_duration_seconds_bucket{route="test",le="5"} 1');
      expect(metrics).toContain('test_request_duration_seconds_bucket{route="test",le="10"} 1');
      expect(metrics).toContain('test_request_duration_seconds_bucket{route="test",le="+Inf"} 1');
      expect(metrics).toContain('test_request_duration_seconds_sum{route="test"}');
      expect(metrics).toContain('test_request_duration_seconds_count{route="test"} 1');
    }, 100);
  });
});
