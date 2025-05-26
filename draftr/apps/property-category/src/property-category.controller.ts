import { Body, Controller, Get, Post } from '@nestjs/common';
import { PropertyCategoryService } from './property-category.service';
import { CreatePropertyDto } from './dto/create-prop.dto';
import { PropertyCategory } from './entities/property.entity';

@Controller('properties')
export class PropertyCategoryController {
  constructor(private readonly propertyCategoryService: PropertyCategoryService) {}

  @Post()
  async addNewProprty (@Body() body: CreatePropertyDto): Promise<PropertyCategory> {
    return this.propertyCategoryService.addNewProperty(body);
  }
}
