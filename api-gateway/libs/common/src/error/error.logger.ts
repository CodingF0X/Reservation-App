import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

export function handleError(
  error: AxiosError,
  logger: Logger,
  serviceURL: string,
): { status: number; data: any } {
  if (axios.isAxiosError(error)) {
    logger.error(
      `Axios Error forwarding request to ${serviceURL}:`,
      error.message,
    );

    if (error.response) {
      logger.error('Axios response error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });

      throw new HttpException(
        error.response.data || 'Bad Gateway',
        error.response.status,
      );
    } else if (error.request) {
      logger.error('No response received from target service:', error.message);
      throw new HttpException(
        'Target service is unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    } else {
      logger.error('Error setting up Axios request:', error.message);
      throw new HttpException(
        'Internal Gateway Error (Axios setup)',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  } else {
    logger.error('Unexpected error in GatewayService:', error);

    throw new HttpException(
      'Internal Gateway Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
