import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { ReservationProcessedDto } from '@app/common/dto/reservation-processed.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('reservation_notification')
  getHello(@Payload() data: ReservationProcessedDto) {
    // const email = data.payment.email;
    // return this.notificationsService.notifyEmail(data);
    return this.notificationsService.mockNotifyEmail(data);
  }
}
