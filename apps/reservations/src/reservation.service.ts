import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { Reservation } from './entities/reservation.entity';
import { SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationService {
  private readonly logger = new Logger(Reservation.name);
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(SERVICE.PAYEMENTS_SERVICE)
    private readonly paymentsService: ClientProxy,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    try {
      return this.paymentsService
        .send('create_charge', createReservationDto.charge)
        .pipe(
          map((res) => {
            return this.reservationsRepository.create({
              ...createReservationDto,
              timestamp: new Date(),
              userId: '123',
              invoiceId: res.id,
            });
          }),
        );
    } catch (error) {
      this.logger.error(error);
    }
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
      { $set: updateReservationDto },
    );
  }

  async remove(id: string) {
    return await this.reservationsRepository.findOneAndDelete({ _id: id });
  }
}
