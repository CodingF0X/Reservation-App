import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PropertyCategoryService } from './property-category.service';
import { CreatePropertyDto } from './dto/create-prop.dto';
import { PropertyCategory } from './entities/property.entity';
import { UpdatePropertyDto } from './dto/update-prop.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller({ path: 'properties', version: '1' })
export class PropertyCategoryController {
  constructor(
    private readonly propertyCategoryService: PropertyCategoryService,
  ) {}

  @Post()
  async addNewProprty(
    @Body() body: CreatePropertyDto,
  ): Promise<PropertyCategory> {
    return this.propertyCategoryService.addNewProperty(body);
  }

  @Get()
  async getAllProperties(): Promise<PropertyCategory[]> {
    return this.propertyCategoryService.getAllProperties();
  }

  @Get(':id')
  async getPropertyById(@Param('id') id: string): Promise<PropertyCategory> {
    return this.propertyCategoryService.getPropertyById(id);
  }

  @Patch(':id')
  async updateProperty(
    @Param('id') id: string,
    @Body() body: UpdatePropertyDto,
  ): Promise<PropertyCategory> {
    return this.propertyCategoryService.updateProperty(id, body);
  }

  @Delete(':id')
  async deleteProperty(@Param('id') id: string): Promise<string> {
    return this.propertyCategoryService.deleteProperty(id);
  }

  @MessagePattern('find_property')
  async findProperty(@Payload() id: string): Promise<PropertyCategory> {
    return this.propertyCategoryService.bookProperty(id);
  }

  @MessagePattern('book_property')
  async bookProperty(@Payload() id: string): Promise<PropertyCategory> {
    console.log(id);
    return this.propertyCategoryService.reservePlace(id);
  }
}
