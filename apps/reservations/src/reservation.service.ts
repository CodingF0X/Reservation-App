import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    return await this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: '123',
    });
  }

  async findAll(): Promise<Reservation[]> {
    return await this.reservationsRepository.find({});
  }

  async findOne(id: string): Promise<Reservation> {
    return await this.reservationsRepository.findOne({ _id: id });
  }

  async update(
    id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    return await this.reservationsRepository.findOneAndUpdate(
      { _id: id },
      {$set: updateReservationDto}
    );
  }

  async remove(id: string) {
    return await this.reservationsRepository.findOneAndDelete({ _id: id });
  }
}
