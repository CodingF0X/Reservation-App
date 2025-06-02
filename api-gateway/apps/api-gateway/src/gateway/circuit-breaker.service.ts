import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as Opossum from 'opossum';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CircuitBreakerService implements OnModuleInit {
  private readonly logger = new Logger(CircuitBreakerService.name);

  private breaker!: Opossum<
    (config: AxiosRequestConfig) => Promise<AxiosResponse<any>>
  >;

  constructor(private readonly httpService: HttpService) {}

  onModuleInit() {
    const axiosAction = async (
      config: AxiosRequestConfig,
    ): Promise<AxiosResponse> => {
      return await firstValueFrom(this.httpService.request(config));
    };

    const options: Opossum.Options = {
      timeout: 5000,
      errorThresholdPercentage: 50,
      resetTimeout: 30000,
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
    };

    this.breaker = new Opossum(axiosAction, options);

    this.breaker.on('open', () => {
      this.logger.warn(
        'Circuit breaker: OPEN (all outbound HTTP calls will be short-circuited)',
      );
    });
    this.breaker.on('halfOpen', () => {
      this.logger.log(
        'Circuit breaker: HALF-OPEN (next request will probe the remote service)',
      );
    });
    this.breaker.on('close', () => {
      this.logger.log(
        'Circuit breaker: CLOSED (outbound HTTP calls resume normally)',
      );
    });
    this.breaker.on('fallback', (data) => {
      this.logger.warn('Circuit breaker: FALLBACK triggered', data);
    });

    this.breaker.fallback((config: AxiosRequestConfig) => {
      return {
        status: 503,
        data: {
          message: 'Service temporarily unavailable',
          attemptedConfig: config,
        },
        headers: {},
        statusText: 'Service Unavailable',
        config,
      } as AxiosResponse;
    });
  }

  async fireRequest(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.breaker.fire(config);
  }
}
