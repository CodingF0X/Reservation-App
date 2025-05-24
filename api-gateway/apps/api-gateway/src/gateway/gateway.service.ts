import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Request } from 'express';
import { handleError, prepareHeadersForForwarding } from '@app/common';

type services = 'auth' | 'users' | 'reserveations';

@Injectable()
export class GatewayService {
  private authServiceURL: string;
  private readonly logger = new Logger(GatewayService.name);

  private readonly serviceMap: Record<services, string>;

  constructor(private configService: ConfigService) {
    const services =
      this.configService.getOrThrow<Record<string, string>>('services');


    console.log('services: ', services);


    this.serviceMap = {
      auth: `${services.auth}/auth/`,
      users: `${services.auth}/users`,
      reserveations: `${services.reservations}/reservations`,
    };
  }

  private mapToServiceUrl(req: Request): string {
    const [gateway, serviceName, ...rest] = req.path.split('/').filter(Boolean);

    const baseUrl = this.serviceMap[serviceName as keyof services];

    if (!baseUrl) {
      throw new HttpException(
        `No service mapped for service name "${serviceName}"`,
        HttpStatus.NOT_FOUND,
      );
    }

    const forwardPath = rest.join('/');
    const url = `${baseUrl}/${forwardPath}`;

    return url;
  }

  async forwardReq(req: Request): Promise<{ status: number; data: any }> {
    const targetPath = req.params.path[1] ?? ''; // Get the dynamic path from @All('*path')
    console.log('path : ', req.path);
    console.log('target path : ', targetPath);

    const headersToForward = prepareHeadersForForwarding(
      req.headers,
      req.method,
      req.body,
    );

    const url = this.mapToServiceUrl(req);
    const [ gateway,serviceName,...rest] = req.path.split('/').filter(Boolean);

    console.log('gateway : ', gateway)
    console.log('service nachname : ', serviceName)
    // console.log(' prefix : ', prefix),
    console.log('rest : ', rest)
    try {
      const axiosConfig: AxiosRequestConfig = {
        method: req.method,
        // url: `${this.authServiceURL}/${targetPath}`,
        url,
        data: req.body,
        headers: headersToForward,
        params: req.params,
      };

      const axiosResponse: AxiosResponse = await axios.request(axiosConfig);

      return { status: axiosResponse.status, data: axiosResponse.data };
    } catch (error) {
      return handleError(error, this.logger, this.authServiceURL);
    }
  }
}
