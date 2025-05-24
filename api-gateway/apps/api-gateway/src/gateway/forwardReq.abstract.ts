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

type service = 'auth' | 'reservations' | 'users';

export abstract class AbstractForwardReq {
  private readonly services: Record<service, string>;
  private readonly logger = new Logger(AbstractForwardReq.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
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

    const baseUrl = this.services[serviceName];

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
}
