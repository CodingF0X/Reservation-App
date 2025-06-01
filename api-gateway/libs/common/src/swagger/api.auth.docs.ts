// src/common/decorators/api-standard-responses.decorator.ts
import { applyDecorators, Type } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function SwaggerLogin<TModel extends Type<any>>(
  model: TModel,
  summary = 'User Login',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 201,
      description: `success`,
      type: model,
      example: {
        event: 'logged In',
        http_status: 200,
      },
    }),
    ApiResponse({
      status: 404,
      description: 'NotFoundException',
      example: {
        response: {
          message: 'Entity Not Found',
          error: 'Not Found',
          statusCode: 404,
        },
        status: 404,
        options: {},
        message: 'Entity Not Found',
        name: 'NotFoundException',
      },
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
        required: ['email', 'password'],
      },
    }),
  );
}

export function SwaggerLogout<TModel extends Type<any>>(
  model: TModel,
  summary = 'User Logout',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 201,
      description: `Logged out successfully`,
      type: model,
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerVerifyUser<TModel extends Type<any>>(
  model: TModel,
  summary = 'For Spring Gateway to verify incoming Req',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 201,
      description: `success`,
      type: model,
      example: {
        status: 'alive',
      },
    }),

    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      type: model,
      example: {
        status: 'expired',
      },
    }),
  );
}
