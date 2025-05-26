import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { PropertyCategory } from './entities/property.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PropertiesRepository extends AbstractRepository<PropertyCategory> {
  protected readonly logger = new Logger(PropertiesRepository.name);

  constructor(
    @InjectModel(PropertyCategory.name)
    propertiesCategoryModel: Model<PropertyCategory>,
  ) {
    super(propertiesCategoryModel);
  }
}
