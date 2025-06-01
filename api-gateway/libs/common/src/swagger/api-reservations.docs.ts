import { applyDecorators, Type } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function SwaggerCreateReservation<TModel extends Type<any>>(
  model: TModel,
  summary = 'Create Reservation',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 201,
      description: ` Created successfully`,
      type: model,
      example: {
        _id: '683cb27a550d0a698827ee3c',
        timestamp: '2025-06-01T20:05:14.467Z',
        startDate: '2004-12-19T23:00:00.000Z',
        endDate: '2005-12-19T23:00:00.000Z',
        userId: '6834a523482ea7aa7b7af265',
        placeId: '683cb26f75c2101c89651b01',
        invoiceId: 'pi_3RVI7wCp8whvdSjk1dz3U1Ip',
      },
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerGetAllReservations<TModel extends Type<any>>(
  model: TModel,
  summary = 'GET all Reservations',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 201,
      description: `Fetched successfully`,
      type: model,
      example: {
        _id: '683cb27a550d0a698827ee3c',
        timestamp: '2025-06-01T20:05:14.467Z',
        startDate: '2004-12-19T23:00:00.000Z',
        endDate: '2005-12-19T23:00:00.000Z',
        userId: '6834a523482ea7aa7b7af265',
        placeId: '683cb26f75c2101c89651b01',
        invoiceId: 'pi_3RVI7wCp8whvdSjk1dz3U1Ip',
      },
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerGetReservationById<TModel extends Type<any>>(
  model: TModel,
  summary = 'GET Reservations By ID',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 201,
      description: `Fetched successfully`,
      type: model,
      example: {
        _id: '683cb27a550d0a698827ee3c',
        timestamp: '2025-06-01T20:05:14.467Z',
        startDate: '2004-12-19T23:00:00.000Z',
        endDate: '2005-12-19T23:00:00.000Z',
        userId: '6834a523482ea7aa7b7af265',
        placeId: '683cb26f75c2101c89651b01',
        invoiceId: 'pi_3RVI7wCp8whvdSjk1dz3U1Ip',
      },
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerUpdateReservation<TModel extends Type<any>>(
  model: TModel,
  summary = 'Update Reservation',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 201,
      description: `Updated successfully`,
      type: model,
      example: {
        _id: '683cb27a550d0a698827ee3c',
        timestamp: '2025-06-01T20:05:14.467Z',
        startDate: '2004-12-19T23:00:00.000Z',
        endDate: '2005-12-19T23:00:00.000Z',
        userId: '6834a523482ea7aa7b7af265',
        placeId: '683cb26f75c2101c89651b01',
        invoiceId: 'pi_3RVI7wCp8whvdSjk1dz3U1Ip',
      },
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerDeleteReservation<TModel extends Type<any>>(
  model: TModel,
  summary = 'Delete Reservations',
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 201,
      description: `Deleted successfully`,
      type: model,
      example: {
        msg: 'reservation has been successfully deleted',
      },
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}
