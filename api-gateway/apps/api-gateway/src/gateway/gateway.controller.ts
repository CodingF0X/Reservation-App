import { All, Controller, Req, Res } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller('gateway')
export class GatewayController {
  constructor(private readonly gateWayService: GatewayService) {}

   @All('*path')
  async proxy(@Req() req, @Res() res) {
    try {
      const result = await this.gateWayService.forwardReq(req);
      // res.status(result.status).send(result.data);
      return result.data;
    } catch (err) {
      res.status(502).send({ message: err.message });
    }
  }
}
