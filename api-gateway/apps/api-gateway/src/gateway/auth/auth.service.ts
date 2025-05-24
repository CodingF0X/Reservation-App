import { handleError, prepareHeadersForForwarding } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly auth: string;
  private readonly logger = new Logger(AuthService.name);

  constructor(private configService: ConfigService) {
    this.auth =
      this.configService.getOrThrow<Record<string, string>>('services').auth;
  }

  async register(req: Request) {
    const body: RegisterDto = req.body;
    const headersToForward = prepareHeadersForForwarding(
      req.headers,
      req.method,
      body,
    );

    const [gateway, serviceName, ...rest] = req.path.split('/').filter(Boolean);
    const targetPath = rest.join('/');
    try {
      const axiosConfig: AxiosRequestConfig = {
        method: req.method,
        url: `${this.auth}/${serviceName}/${targetPath}`,
        data: req.body,
        headers: headersToForward,
        params: req.params,
      };

      const axiosResponse: AxiosResponse = await axios.request(axiosConfig);

      return { status: axiosResponse.status, data: axiosResponse.data };
    } catch (error) {
      return handleError(error, this.logger, this.auth);
    }
  }

  async forwardReq(req: any) {
    const headersToForward = prepareHeadersForForwarding(
      req.headers,
      req.method,
      req.body,
    );

    const [gateway, serviceName, ...rest] = req.path.split('/').filter(Boolean);
    const targetPath = rest.join('/');

    try {
      const axiosConfig: AxiosRequestConfig = {
        method: req.method,
        url: `${this.auth}/${serviceName}`,
        data: req.body,
        headers: headersToForward,
        params: req.params,
      };

      const axiosResponse: AxiosResponse = await axios.request(axiosConfig);

      console.log(axiosResponse);
      return { status: axiosResponse.status, data: axiosResponse.data };
    } catch (error) {
      return handleError(error, this.logger, this.auth);
    }
  }

   async authentication(req: Request): Promise<AxiosResponse> {
    const body: LoginDto = req.body
    const headersToForward = prepareHeadersForForwarding(
      req.headers,
      req.method,
      body,
    );


    const [gateway, serviceName, ...rest] = req.path.split('/').filter(Boolean);
    const targetPath = rest.join('/');

    try {
      const axiosConfig: AxiosRequestConfig = {
        method: req.method,
        url: `${this.auth}/${serviceName}/${targetPath}`,

        data: body,
        headers: headersToForward,
        params: req.params,
        withCredentials: true,
        validateStatus: () => true,
      };

      const axiosResponse: AxiosResponse = await axios.request(axiosConfig);

      return axiosResponse;
    } catch (error) {
      return handleError(error, this.logger, this.auth);
    }
  }
}
