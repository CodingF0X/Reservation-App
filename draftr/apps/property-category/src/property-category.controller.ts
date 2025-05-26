import { Controller, Get } from '@nestjs/common';
import { PropertyCategoryService } from './property-category.service';

@Controller()
export class PropertyCategoryController {
  constructor(private readonly propertyCategoryService: PropertyCategoryService) {}

  @Get()
  getHello(): string {
    return this.propertyCategoryService.getHello();
  }
}
