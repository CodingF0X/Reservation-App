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
import {
  CurrentUser,
  CustomRequest,
  RouteInfo,
  RouteInfoDecorator,
} from '@app/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { UserDto } from './dto/user.dto';
import {
  SwaggerCreateReservation,
  SwaggerDeleteReservation,
  SwaggerGetAllReservations,
  SwaggerGetReservationById,
  SwaggerUpdateReservation,
} from '@app/common/swagger';
import { ReservationModel } from './dto/reservation.model';

@Controller('gateway')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get('reservations')
  @SwaggerGetAllReservations(ReservationModel)
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

  @Get('reservations/:id')
  @SwaggerGetReservationById(ReservationModel)
  async getReservation(
    @Req() req: Request,
    @Res() res: Response,
    @RouteInfoDecorator() route: RouteInfo,
    @Param('id') id: string,
  ) {
    const result = await this.reservationsService.getReservationById(
      req,
      route,
    );
    res.status(result.status).send(result.data);
    return result;
  }

  @Post('reservations')
  @SwaggerCreateReservation(ReservationModel)
  async createReservation(
    @Req() req: CustomRequest,
    @Res() res: Response,
    @RouteInfoDecorator() route: RouteInfo,
    @CurrentUser() user: UserDto,
    @Body() body: CreateReservationDto,
  ) {
    const result = await this.reservationsService.createReservation(
      req,
      route,
      body,
    );
    res.status(result.status).send({ body: result.data });
    return result;
  }

  @Patch('reservations/:id')
  @SwaggerUpdateReservation(ReservationModel)
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
  @SwaggerDeleteReservation(ReservationModel)
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
