import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbstractForwardReq } from '../forwardReq.abstract';
import { Request } from 'express';
import { RouteInfo } from '@app/common';
import { AxiosResponse } from 'axios';
import { CreatePropertyDto } from './dto/create-prop.dto';
import { UpdatePropertyDto } from './dto/update-prop.dto';

@Injectable()
export class PropertyService extends AbstractForwardReq {
  constructor(configService: ConfigService, httpService: HttpService) {
    super(configService, httpService);
  }

  async getAllProperties(
    req: Request,
    route: RouteInfo,
  ): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
    });
  }

  async addProperty(
    req: Request,
    route: RouteInfo,
    body: CreatePropertyDto,
  ): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
      data: body,
    });
  }

  async updateProperty(
    req: Request,
    route: RouteInfo,
    body: UpdatePropertyDto,
  ): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
      data: body,
    });
  }

  async getProperty(req: Request, route: RouteInfo): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
    });
  }

  async deleteProperty(
    req: Request,
    route: RouteInfo,
  ): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
    });
  }
}
