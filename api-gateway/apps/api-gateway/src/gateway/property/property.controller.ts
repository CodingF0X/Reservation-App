import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { PropertyService } from './property.service';
import { RouteInfo, RouteInfoDecorator } from '@app/common';
import { Request, Response } from 'express';
import { CreatePropertyDto } from './dto/create-prop.dto';
import { UpdatePropertyDto } from './dto/update-prop.dto';

@Controller('gateway')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get('properties')
  async getProperties(
    @Req() req: Request,
    @Res() res: Response,
    @RouteInfoDecorator() route: RouteInfo,
  ) {
    const result = await this.propertyService.getAllProperties(req, route);
    res.status(result.status).send(result.data);
    return result;
  }

  @Post('properties')
  async addProperty(
    @Req() req: Request,
    @Res() res: Response,
    @RouteInfoDecorator() route: RouteInfo,
    @Body() body: CreatePropertyDto,
  ) {
    const result = await this.propertyService.addProperty(req, route, body);
    res.status(result.status).send(result.data);
    return result;
  }

  @Patch('properties/:id')
  async updateProperty(
    @Req() req: Request,
    @Res() res: Response,
    @RouteInfoDecorator() route: RouteInfo,
    @Param('id') id: string,
    @Body() body: UpdatePropertyDto,
  ) {
    const result = await this.propertyService.updateProperty(req, route, body);
    res.status(result.status).send(result.data);
    return result;
  }

  @Get('properties/:id')
  async getProperty(
    @Req() req: Request,
    @Res() res: Response,
    @RouteInfoDecorator() route: RouteInfo,
    @Param('id') id: string,
  ) {
    const result = await this.propertyService.getProperty(req, route);
    res.status(result.status).send(result.data);
    return result;
  }

  @Delete('properties/:id')
  async deleteProperty(
    @Req() req: Request,
    @Res() res: Response,
    @RouteInfoDecorator() route: RouteInfo,
    @Param('id') id: string,
  ) {
    const result = await this.propertyService.deleteProperty(req, route);
    res.status(result.status).send(result.data);
    return result;
  }
}
