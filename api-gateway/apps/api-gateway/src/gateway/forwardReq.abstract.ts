import {
  handleError,
  prepareHeadersForForwarding,
  RouteInfo,
} from '@app/common';
import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { DiscoverServices } from './services/Service-discovery.eureka';

type service = 'auth' | 'reservations' | 'users' | 'properties';

export abstract class AbstractForwardReq {
  private readonly services: Record<service, string>;
  private readonly logger = new Logger(AbstractForwardReq.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly discoverService: DiscoverServices,
  ) {
    this.services =
      configService.getOrThrow<Record<service, string>>('services');
  }

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
      const response: AxiosResponse<T> = await firstValueFrom(
        this.httpService.request<T>(axiosConfig),
      );
      return response;
    } catch (error) {
      return handleError(error, this.logger, baseUrl);
    }
  }

  private mapPathToService(path: string): string {
    // e.g. inspect req.baseUrl or a custom header
    // or you could maintain a static map:

    if (path === 'auth') return 'AUTH_SERVICE';
    if (path === 'reservations') return 'RESERVATIONS_SERVICE';
    if (path === 'property') return 'PROPERTY_SERVICE';

    return 'UNKNOWN PATH';
  }
}
