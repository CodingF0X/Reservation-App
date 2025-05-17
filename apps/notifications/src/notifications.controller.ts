import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('notification')
  getHello(@Payload() data: any) {
    console.log(data)
    return this.notificationsService.getHello();
  }
}
