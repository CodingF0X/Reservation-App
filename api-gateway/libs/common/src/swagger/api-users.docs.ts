import { applyDecorators, Type } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function SwaggerCreateUSER<TModel extends Type<any>>(
  model: TModel,
  summary = 'User Registeration',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 201,
      description: `${model.name} created successfully`,
      type: model,
      example: {
        _id: '6834d0c90b97673a017277c6',
        email: 'Jon_Doe@gmail.com',
        password:
          '$2b$10$b8x3MmyF8UwXHQaqeEb2wORS3hfgHlaZqlTNVnk4WV7W0LCm9f6du',
        role: 'user',
      },
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerGetAllUsers<TModel extends Type<any>>(
  model: TModel,
  summary = 'Get All Users',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 200,
      description: `${model.name} fetched`,
      type: model,

      example: [
        {
          _id: '6834d0c90b97673a017277c6',
          email: 'Jon_Doe_1@gmail.com',
          password:
            '$2b$10$b8x3MmyF8UwXHQaqeEb2wORS3hfgHlaZqlTNVnk4WV7W0LCm9f6du',
          role: 'user',
        },
        {
          _id: '6834d0c90b97673a017277c6',
          email: 'Jon_Doe_2@gmail.com',
          password:
            '$2b$10$b8x3MmyF8UwXHQaqeEb2wORS3hfgHlaZqlTNVnk4WV7W0LCm9f6du',
          role: 'user',
        },
      ],
    }),
    ApiResponse({ status: 404, description: 'Not Found' }),
  );
}

export function SwaggerGetUserById<TModel extends Type<any>>(
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
        _id: '6834d0c90b97673a017277c6',
        email: 'Jon_Doe_2@gmail.com',
        password:
          '$2b$10$b8x3MmyF8UwXHQaqeEb2wORS3hfgHlaZqlTNVnk4WV7W0LCm9f6du',
        role: 'user',
      },
    }),
    ApiResponse({ status: 404, description: 'Not Found' }),
    ApiParam({ name: 'id', type: String, description: 'Enter user ID' }),
  );
}

export function SwaggerUpdateUser<TModel extends Type<any>>(
  model: TModel,
  summary = 'Update User By ID',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 200,
      description: `${model.name} Updated`,
      type: model,
      example: {
        _id: '6834d0c90b97673a017277c6',
        email: 'Jon_Doe_2@gmail.com',
        password:
          '$2b$10$b8x3MmyF8UwXHQaqeEb2wORS3hfgHlaZqlTNVnk4WV7W0LCm9f6du',
        role: 'user',
      },
    }),
    ApiResponse({ status: 404, description: 'Not Found' }),
  );
}

export function SwaggerDeleteUser<TModel extends Type<any>>(
  model: TModel,
  summary = 'Find and Delete User by ID ',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 200,
      description: `${model.name} Deleted`,
      type: model,
    }),
    ApiResponse({ status: 404, description: 'Not Found' }),
  );
}
