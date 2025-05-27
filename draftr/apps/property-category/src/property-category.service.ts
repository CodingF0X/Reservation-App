import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PropertiesRepository } from './properties.repository';
import { PropertyCategory } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-prop.dto';
import { UpdatePropertyDto } from './dto/update-prop.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PropertyCategoryService {
  private readonly logger = new Logger(PropertyCategoryService.name);

  constructor(private readonly propertiesRepo: PropertiesRepository) {}

  async addNewProperty(body: CreatePropertyDto): Promise<PropertyCategory> {
    try {
      const newProperty = await this.propertiesRepo.create(body);

      return newProperty;
    } catch (error) {
      this.logger.error(
        `Failed to create property for host ${body.hostId}`,
        error.stack,
      );

      throw new InternalServerErrorException(
        'Could not create property, please try again later.',
        error,
      );
    }
  }

  async getAllProperties(): Promise<PropertyCategory[]> {
    try {
      const allProperties = await this.propertiesRepo.find({});

      return allProperties;
    } catch (error) {
      this.logger.error(`Failed to get all properties`, error);

      throw new InternalServerErrorException(
        'Could not get all properties, please try again later.',
        error,
      );
    }
  }

  async getPropertyById(id: string): Promise<PropertyCategory> {
    try {
      const property = await this.propertiesRepo.findOne({ _id: id });

      return property;
    } catch (error) {
      this.logger.error(`Failed to get property with id ${id}`, error);

      throw new InternalServerErrorException(
        'Could not get property, please try again later.',
        error,
      );
    }
  }

  async bookProperty(id: string): Promise<PropertyCategory> {
    try {
      const property = await this.propertiesRepo.findOne({ _id: id });

      if (!property) {
        throw new RpcException({
          code: 'NOT_FOUND',
          message: 'Property not found',
        });
      }

      if (!property.availability[0].isAvailable) {
        throw new RpcException({
          code: 'PROPERTY_UNAVAILABLE',
          message: 'This property (or requested dates) is no longer available.',
        });
      }

      return property;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      this.logger.error(`Failed to get property with id ${id}`, error);
      throw new RpcException(error);
    }
  }

  async reservePlace(id: string): Promise<PropertyCategory> {
    const update = {
      $set: { [`availability.${[0]}.isAvailable`]: false },
    };

    const property = await this.propertiesRepo.findOneAndUpdate(
      {
        _id: id,
        [`availability.${[0]}.isAvailable`]: true,
      },
      update,
    );

    if (!property) {
      throw new RpcException({
        code: 'NOT_FOUND',
        message: 'Property not found',
      });
    }

    return property;
  }

  async updateProperty(
    id: string,
    body: UpdatePropertyDto,
  ): Promise<PropertyCategory> {
    try {
      const updatedProperty = await this.propertiesRepo.findOneAndUpdate(
        { _id: id },
        body,
      );

      return updatedProperty;
    } catch (error) {
      this.logger.error(`Failed to update property with id ${id}`, error);

      throw new InternalServerErrorException(
        'Could not update property, please try again later.',
        error,
      );
    }
  }

  async deleteProperty(id: string): Promise<string> {
    try {
      // if(prop.reservations.length > 0){
      //   throw new InternalServerErrorException(
      //     'Could not delete property, there are reservations associated with it.',
      //   );
      // }

      const deletedProperty = await this.propertiesRepo.findOneAndDelete({
        _id: id,
      });

      return `property with name << ${deletedProperty.name}  >> has been deleted successfully`;
    } catch (error) {
      this.logger.error(`Failed to delete property with id ${id}`, error);

      throw new InternalServerErrorException(error, error.message);
    }
  }
}
