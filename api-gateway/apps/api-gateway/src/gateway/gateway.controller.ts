import { Controller } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('gateway')
export class GatewayController {
  constructor(private readonly gateWayService: GatewayService) {}
}
