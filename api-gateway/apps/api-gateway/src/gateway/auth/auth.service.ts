import { RouteInfo } from '@app/common';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { AbstractForwardReq } from '../forwardReq.abstract';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { DiscoverServices } from '../services/Service-discovery.eureka';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class AuthService extends AbstractForwardReq {
  constructor(httpService: HttpService, discoverServices: DiscoverServices) {
    super(httpService, discoverServices);
  }

  async register(
    req: Request,
    route: RouteInfo,
    body: RegisterDto,
  ): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
      data: body,
    });
  }

  async login(
    req: Request,
    route: RouteInfo,
    body: LoginDto,
  ): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
      data: body,
    });
  }

  async verify(req: Request, route: RouteInfo): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
    });
  }

  async logout(req: Request, route: RouteInfo): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
    });
  }

  async getUsers(req: Request, route: RouteInfo): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
    });
  }

  async getUserById(req: Request, route: RouteInfo): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
    });
  }

  async updateUser(
    req: Request,
    route: RouteInfo,
    body: UpdateUserDto,
  ): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
      data: body,
    });
  }

  async deleteUser(req: Request, route: RouteInfo): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
    });
  }

  // async forwardReq<T = any>(
  //   req: Request,
  //   route: RouteInfo,
  //   options: Partial<AxiosRequestConfig> = {},
  // ): Promise<AxiosResponse> {
  //   const { serviceName, targetPath = '' } = route;

  //   const headersToForward = prepareHeadersForForwarding(
  //     req.headers,
  //     req.method,
  //     //   req.body,
  //     options.data,
  //   );

  //   const url = `${this.auth}/${serviceName}/${targetPath}`;

  //   const axiosConfig: AxiosRequestConfig = {
  //     method: req.method,
  //     url,
  //     data: req.body,
  //     headers: headersToForward,
  //     params: req.params,
  //     ...options,
  //   };

  //   try {
  //     const response: AxiosResponse<T> = await firstValueFrom(
  //       this.httpService.request(axiosConfig),
  //     );

  //     return response;
  //   } catch (error) {
  //     return handleError(error, this.logger, this.auth);
  //   }
  // }

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
