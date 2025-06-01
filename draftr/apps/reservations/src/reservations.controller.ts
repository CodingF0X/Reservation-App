import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { UserDto } from './dto/user.dto';
import { CurrentUser } from './current-user.decorator';
import { Request } from 'express';

@Controller({ path: 'reservations', version: '1' })
export class ReservationsController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(
    @Body() createReservationBody: CreateReservationDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.reservationService.create(createReservationBody, user);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}
