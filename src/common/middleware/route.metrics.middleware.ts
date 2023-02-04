import * as promClient from 'prom-client';

const successCounter = new promClient.Counter({
  name: 'success_requests_counter',
  help: 'Number of successful requests',
});

const failedCounter = new promClient.Counter({
  name: 'failed_requests_counter',
  help: 'Number of failed requests',
});

const requestDuration = new promClient.Histogram({
  name: 'request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
});

const requestCounter = new promClient.Counter({
  name: 'request_counter',
  help: 'Number of requests',
});

const endpointCounters = new Map<string, promClient.Counter>();

export const RequestMetricsMiddleware = (req, res, next) => {
  const endpoint = req.route.path;
  if (!endpointCounters.has(endpoint)) {
    endpointCounters.set(endpoint, new promClient.Counter({
      name: 'endpoint_requests_counter',
      help: `Number of requests for endpoint ${endpoint}`,
      labelNames: ['endpoint'],
    }));
  }

  const end = requestDuration.startTimer();
  res.on('finish', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      successCounter.inc();
    } else {
      failedCounter.inc();
    }
    end();
    requestCounter.inc();
    endpointCounters.get(endpoint).labels(endpoint).inc();
  });
  next();
}