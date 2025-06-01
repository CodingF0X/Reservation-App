import { Injectable } from '@nestjs/common';
import { AbstractForwardReq } from '../forwardReq.abstract';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { CustomRequest, RouteInfo } from '@app/common';
import { AxiosHeaderValue, AxiosResponse } from 'axios';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { DiscoverServices } from '../services/Service-discovery.eureka';

@Injectable()
export class ReservationsService extends AbstractForwardReq {
  constructor(httpService: HttpService, discoverServices: DiscoverServices) {
    super(httpService, discoverServices);
  }

  async getAllReservations(
    req: Request,
    route: RouteInfo,
  ): Promise<AxiosResponse> {
    console.log(route);
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
    });
  }

  async getReservationById(
    req: Request,
    route: RouteInfo,
  ): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
    });
  }

  async createReservation(
    req: CustomRequest,
    route: RouteInfo,
    body: CreateReservationDto,
  ): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
      data: body,
      headers: req.user,
    });
  }

  async updateReservation(
    req: Request,
    route: RouteInfo,
    body: UpdateReservationDto,
  ): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
      data: body,
    });
  }

  async deleteReservation(
    req: Request,
    route: RouteInfo,
  ): Promise<AxiosResponse> {
    return this.forwardReq(req, route, {
      withCredentials: true,
      validateStatus: () => true,
    });
  }
}
