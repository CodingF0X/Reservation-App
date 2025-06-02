import {
  handleError,
  prepareHeadersForForwarding,
  RouteInfo,
} from '@app/common';
import { HttpService } from '@nestjs/axios';
import { Inject, Logger} from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Request } from 'express';
import { DiscoverServices } from './services/Service-discovery.eureka';
import { CircuitBreakerService } from './circuit-breaker.service';

type service = 'auth' | 'reservations' | 'users' | 'properties';

export abstract class AbstractForwardReq {
  private readonly services: Record<service, string>;
  private readonly logger = new Logger(AbstractForwardReq.name);
  @Inject(CircuitBreakerService)
  private readonly cbService: CircuitBreakerService;

  constructor(
    private readonly httpService: HttpService,
    private readonly discoverService: DiscoverServices,
  ) {}

  protected async forwardReq<T = any>(
    req: Request,
    route: RouteInfo,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<AxiosResponse<T>> {
    const { serviceName, targetPath = '' } = route;

    const instanceId = this.mapPathToService(serviceName);
    const instances = this.discoverService.getInstances(instanceId);

    if (!instances.length) {
      throw new Error(`No instances available for ${serviceName}`);
    }

    const target = instances[Math.floor(Math.random() * instances.length)];

    const baseUrl = `http://${target.hostName}:${target.port}/${target.metadata.version}`;

    if (!baseUrl) {
      throw new Error(
        `Unknown service "${serviceName}". Valid services: ${Object.keys(
          this.services,
        ).join(', ')}`,
      );
    }

    const headersToForward = prepareHeadersForForwarding(
      req.headers,
      req.method,
      options.data,
    );

    const url = `${baseUrl}/${serviceName}/${targetPath}`;

    const axiosConfig: AxiosRequestConfig = {
      method: req.method,
      url,
      data: req.body,
      headers: headersToForward,
      params: req.params,
      ...options,
    };

    try {
      // const response: AxiosResponse<T> = await firstValueFrom(
      //   this.httpService.request<T>(axiosConfig),
      // );

      //return response;

      return await this.cbService.fireRequest(axiosConfig);
    } catch (error) {
      return handleError(error, this.logger, baseUrl);
    }
  }

  private mapPathToService(path: string): string {
    if (path === 'auth') return 'AUTH_SERVICE';
    if (path === 'users') return 'AUTH_SERVICE';
    if (path === 'reservations') return 'RESERVATIONS_SERVICE';
    if (path === 'properties') return 'PROPERTY_SERVICE';

    return 'UNKNOWN PATH';
  }
}
