import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AbstractForwardReq } from '../forwardReq.abstract';
import { Request } from 'express';
import { RouteInfo } from '@app/common';
import { AxiosResponse } from 'axios';
import { CreatePropertyDto } from './dto/create-prop.dto';
import { UpdatePropertyDto } from './dto/update-prop.dto';
import { DiscoverServices } from '../services/Service-discovery.eureka';

@Injectable()
export class PropertyService extends AbstractForwardReq {
  constructor(httpService: HttpService, discoverServices: DiscoverServices) {
    super(httpService, discoverServices);
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

  async deleteProperty(req: Request, route: RouteInfo): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
    });
  }
}
