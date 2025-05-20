import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreateChargeDto } from './DTO/create-charge.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  async createCharge(@Payload() data: CreateChargeDto) {
    console.log(data)
    return this.paymentsService.createCharge(data);
  }
}
