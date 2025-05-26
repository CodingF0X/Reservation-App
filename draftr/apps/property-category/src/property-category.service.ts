import { Injectable, Logger } from '@nestjs/common';
import { PropertiesRepository } from './properties.repository';
import { PropertyCategory } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-prop.dto';

@Injectable()
export class PropertyCategoryService {
  private readonly logger = new Logger(PropertyCategoryService.name);

  constructor(private readonly propertiesRepo: PropertiesRepository) {}

  async addNewProperty (body: CreatePropertyDto): Promise<PropertyCategory>{
    const newProperty = await this.propertiesRepo.create(body)

    return newProperty;
  }
}
