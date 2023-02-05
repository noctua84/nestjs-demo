import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as promClient from "prom-client";

const endpointCounters = new Map<string, promClient.Counter>();

@Injectable()
export class RouteMetrics implements NestMiddleware {
  constructor(
    @Inject('PROM_CLIENT') private readonly client: typeof promClient,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    let endpoint = req.originalUrl;

    if (endpoint === '/favicon.ico') {
      next();
      return;
    }

    if (endpoint === '/') {
      endpoint = 'root'
    } else {
      endpoint = endpoint.replace(/\//g, '');
    }

    console.log('endpoint: ', endpoint);

    if (!endpointCounters.has(endpoint)) {
      endpointCounters.set(endpoint + '_requests_total', new this.client.Counter({
        name: endpoint + '_requests_total',
        help: 'Total number of HTTP requests made.',
        labelNames: ['route', endpoint, 'all'],
      }));
      endpointCounters.set(endpoint + '_successful_requests_total', new this.client.Counter({
        name: endpoint + '_successful_requests_total',
        help: 'Total number of successful HTTP requests made.',
        labelNames: ['route', endpoint, 'success'],
      }));
      endpointCounters.set(endpoint + '_failed_requests_total', new this.client.Counter({
        name: endpoint + '_failed_requests_total',
        help: 'Total number of failed HTTP requests made.',
        labelNames: ['route', endpoint, 'error'],
      }));
    }

    res.on('finish', () => {
      if(res.statusCode >= 200 && res.statusCode < 300) {
        endpointCounters.get(endpoint + '_successful_requests_total').inc( { route: endpoint, success: 'success' } );
      } else {
        endpointCounters.get(endpoint + '_failed_requests_total').inc( { route: endpoint, error: 'error' } );
      }
    });

    endpointCounters.get(endpoint + '_requests_total').inc( { route: endpoint, all: 'all' });
    next();
  }
}