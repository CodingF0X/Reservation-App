import {
  handleError,
  prepareHeadersForForwarding,
  RouteInfo,
} from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly auth: string;
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.auth =
      this.configService.getOrThrow<Record<string, string>>('services').auth;
  }

  async forwardReq<T = any>(
    req: Request,
    route: RouteInfo,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<AxiosResponse> {
    const { serviceName, targetPath = '' } = route;

    const headersToForward = prepareHeadersForForwarding(
      req.headers,
      req.method,
      //   req.body,
      options.data,
    );

    const url = `${this.auth}/${serviceName}/${targetPath}`;

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
        this.httpService.request(axiosConfig),
      );

      return response;
    } catch (error) {
      return handleError(error, this.logger, this.auth);
    }
  }

  //   async register(req: Request) {
  //     const body: RegisterDto = req.body;
  //     const headersToForward = prepareHeadersForForwarding(
  //       req.headers,
  //       req.method,
  //       body,
  //     );

  //     const [gateway, serviceName, ...rest] = req.path.split('/').filter(Boolean);
  //     const targetPath = rest.join('/');
  //     try {
  //       const axiosConfig: AxiosRequestConfig = {
  //         method: req.method,
  //         url: `${this.auth}/${serviceName}/${targetPath}`,
  //         data: req.body,
  //         headers: headersToForward,
  //         params: req.params,
  //       };

  //       const axiosResponse: AxiosResponse = await axios.request(axiosConfig);

  //       return { status: axiosResponse.status, data: axiosResponse.data };
  //     } catch (error) {
  //       return handleError(error, this.logger, this.auth);
  //     }
  //   }

  //   async forwardReq(req: any) {
  //     const headersToForward = prepareHeadersForForwarding(
  //       req.headers,
  //       req.method,
  //       req.body,
  //     );

  //     const [gateway, serviceName, ...rest] = req.path.split('/').filter(Boolean);
  //     const targetPath = rest.join('/');

  //     try {
  //       const axiosConfig: AxiosRequestConfig = {
  //         method: req.method,
  //         url: `${this.auth}/${serviceName}`,
  //         data: req.body,
  //         headers: headersToForward,
  //         params: req.params,
  //       };

  //       const axiosResponse: AxiosResponse = await axios.request(axiosConfig);

  //       console.log(axiosResponse);
  //       return { status: axiosResponse.status, data: axiosResponse.data };
  //     } catch (error) {
  //       return handleError(error, this.logger, this.auth);
  //     }
  //   }

  //   async authentication(req: Request): Promise<AxiosResponse> {
  //     const body: LoginDto = req.body;
  //     const headersToForward = prepareHeadersForForwarding(
  //       req.headers,
  //       req.method,
  //       body,
  //     );

  //     const [gateway, serviceName, ...rest] = req.path.split('/').filter(Boolean);
  //     const targetPath = rest.join('/');

  //     try {
  //       const axiosConfig: AxiosRequestConfig = {
  //         method: req.method,
  //         url: `${this.auth}/${serviceName}/${targetPath}`,

  //         data: body,
  //         headers: headersToForward,
  //         params: req.params,
  //         withCredentials: true,
  //         validateStatus: () => true,
  //       };

  //       const axiosResponse: AxiosResponse = await axios.request(axiosConfig);

  //       return axiosResponse;
  //     } catch (error) {
  //       return handleError(error, this.logger, this.auth);
  //     }
  //   }
}
