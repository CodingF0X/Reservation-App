import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Request } from 'express';
import { handleError, prepareHeadersForForwarding } from '@app/common';

@Injectable()
export class GatewayService {
  private serviceURL: string;
  private readonly logger = new Logger(GatewayService.name);

  constructor(private configService: ConfigService) {
    const host = this.configService.getOrThrow<string>('AUTH_HOST');
    const port = this.configService.getOrThrow<number>('AUTH_HTTP_PORT');
    const path = this.configService.getOrThrow<string>('AUTH_USERS_PATH');

    this.serviceURL = `http://${host}:${port}/${path}`;
    this.logger.log(`Auth Service Base URL: ${this.serviceURL}`);
  }

  async forwardReq(req: Request): Promise<{ status: number; data: any }> {
    const targetPath = req.params.path[1] ?? ''; // Get the dynamic path from @All('*path')

    const headersToForward = prepareHeadersForForwarding(
      req.headers,
      req.method,
      req.body,
    );

    try {
      const axiosConfig: AxiosRequestConfig = {
        method: req.method,
        url: `${this.serviceURL}/${targetPath}`,
        data: req.body,
        headers: headersToForward,
        params: req.params,
      };

      const axiosResponse: AxiosResponse = await axios.request(axiosConfig);

      return { status: axiosResponse.status, data: axiosResponse.data };
    } catch (error) {
      return handleError(error, this.logger, this.serviceURL);
    }
  }
}
