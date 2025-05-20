import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { Reservation } from './entities/reservation.entity';
import { ReservationProcessedDto, SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { from, map, mergeMap, tap } from 'rxjs';
import { UserDto } from './dto/user.dto';

@Injectable()
export class ReservationService {
  private readonly logger = new Logger(Reservation.name);
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(SERVICE.PAYEMENTS_SERVICE)
    private readonly paymentsService: ClientProxy,
    @Inject(SERVICE.NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    { email, userId }: UserDto,
  ) {
    const paymentMsg = {
      ...createReservationDto.charge,
      email,
    };

    try {
      //1- send that exact object to Stripe microservice
      return this.paymentsService.send('create_charge', paymentMsg).pipe(
        //2- when Stripe replies, create the reservation in Mongo
        mergeMap((stripeRes) =>
          from(
            this.reservationsRepository.create({
              ...createReservationDto,
              timestamp: new Date(),
              userId: userId,
              invoiceId: stripeRes.id,
            }),
          ).pipe(
            //3- once you have the reservation, build your notification payload
            map((mmea) => ({
              payment: paymentMsg, // the original message
              reservation: mmea, // the newly‐created reservation
              //stripe: stripeRes, // <<optionally>> include Stripe’s response
            })),
            tap(
              (
                fullMsg: ReservationProcessedDto, // 4- emit that entire bundle to notificationsService
              ) =>
                this.notificationsService.emit(
                  'reservation_notification',
                  fullMsg,
                ),
            ),
          ),
        ),
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
