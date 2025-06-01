import { applyDecorators, Type } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function SwaggerCreateProperty<TModel extends Type<any>>(
  model: TModel,
  summary = 'List New Property',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 201,
      description: ` Fetched successfully`,
      type: model,
      example: {
        _id: '6834d0c90b97673a017277c6',
        name: 'prop 5',
        address: {
          street: 'Broadway',
          city: 'NYC',
          state: 'NY',
          country: 'USA',
          postalCode: '132355',
        },
        hostId: '1245',
        pricePerNight: 325.3,
        currency: 'USD',
        amenities: ['mmea amenities'],
        availability: [
          {
            isAvailable: false,
            start: '2006-04-19T22:00:00.000Z',
            end: '2022-07-12T00:00:00.000Z',
          },
        ],
        maxGuests: 3,
      },
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerGetProperties<TModel extends Type<any>>(
  model: TModel,
  summary = 'Get All Listed Properties',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 201,
      description: ` Fetched successfully`,
      type: model,
      example: {
        _id: '6834d0c90b97673a017277c6',
        name: 'prop 5',
        address: {
          street: 'Broadway',
          city: 'NYC',
          state: 'NY',
          country: 'USA',
          postalCode: '132355',
        },
        hostId: '1245',
        pricePerNight: 325.3,
        currency: 'USD',
        amenities: ['mmea amenities'],
        availability: [
          {
            isAvailable: false,
            start: '2006-04-19T22:00:00.000Z',
            end: '2022-07-12T00:00:00.000Z',
          },
        ],
        maxGuests: 3,
      },
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerGetPropertyById<TModel extends Type<any>>(
  model: TModel,
  summary = 'Get by ID',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 200,
      description: `${model.name} fetched`,
      type: model,
      example: {
        _id: 'XXXXXXXXXXXXXXXXXXXXXXXX',
        name: 'prop 5',
        address: {
          street: 'Broadway',
          city: 'NYC',
          state: 'NY',
          country: 'USA',
          postalCode: '132355',
        },
        hostId: 'XXXX',
        pricePerNight: 325.3,
        currency: 'USD',
        amenities: ['mmea amenities'],
        availability: [
          {
            isAvailable: false,
            start: '2006-04-19T22:00:00.000Z',
            end: '2022-07-12T00:00:00.000Z',
          },
        ],
        maxGuests: 3,
      },
    }),
    ApiResponse({ status: 404, description: 'Not Found' }),
  );
}

export function SwaggerUpdateProperty<TModel extends Type<any>>(
  model: TModel,
  summary = 'Get by ID & Update',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 200,
      description: `${model.name} has been updated`,
      type: model,
      example: {
        _id: 'XXXXXXXXXXXXXXXXXXXXXXXX',
        name: 'prop 5',
        address: {
          street: 'Broadway',
          city: 'NYC',
          state: 'NY',
          country: 'USA',
          postalCode: '132355',
        },
        hostId: 'XXXX',
        pricePerNight: 325.3,
        currency: 'USD',
        amenities: ['mmea amenities'],
        availability: [
          {
            isAvailable: false,
            start: '2006-04-19T22:00:00.000Z',
            end: '2022-07-12T00:00:00.000Z',
          },
        ],
        maxGuests: 3,
      },
    }),
    ApiResponse({ status: 404, description: 'Not Found' }),
  );
}

export function SwaggerDeleteProperty<TModel extends Type<any>>(
  model: TModel,
  summary = 'Get by ID & Delete',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 200,
      description: `${model.name} Deleted`,
      type: model,
      example: `property with name << Prop name >> has been deleted successfully`,
    }),
    ApiResponse({ status: 404, description: 'Not Found' }),
    ApiResponse({
      status: 401,
      description: 'Token not found. Unauthorized. StatusCode: 401',
    }),
  );
}
