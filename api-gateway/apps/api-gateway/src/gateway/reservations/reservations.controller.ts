import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ReservationsService } from './reservations.service';
import { RouteInfo, RouteInfoDecorator } from '@app/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('gateway')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}
  @Get('reservations')
  async getReservations(
    @Req() req: Request,
    @Res() res: Response,
    @RouteInfoDecorator() route: RouteInfo,
  ) {
    const result = await this.reservationsService.getAllReservations(
      req,
      route,
    );
    res.status(result.status).send(result.data);
    return result;
  }

  @Post('reservations')
  async createReservation(
    @Req() req: Request,
    @Res() res: Response,
    @RouteInfoDecorator() route: RouteInfo,
    @Body() body: CreateReservationDto,
  ) {
    const result = await this.reservationsService.createReservation(
      req,
      route,
      body,
    );
    res.status(result.status).send(result.data);
    return result;
  }

  @Patch('reservations/:id')
  async updateReservation(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @RouteInfoDecorator() route: RouteInfo,
    @Body() body: UpdateReservationDto,
  ) {
    const result = await this.reservationsService.updateReservation(
      req,
      route,
      body,
    );
    res.status(result.status).send(result.data);
    return result;
  }

  @Delete('reservations/:id')
  async deleteReservation(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @RouteInfoDecorator() route: RouteInfo,
  ) {
    const result = await this.reservationsService.deleteReservation(req, route);
    res
      .status(result.status)
      .send({ msg: 'reservation has been successfully deleted' });
    return result;
  }
}
