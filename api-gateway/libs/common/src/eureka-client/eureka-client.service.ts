import { Injectable, Logger } from '@nestjs/common';
import { Eureka } from 'eureka-js-client';
import { EurekaClientOptions } from './eureka-client.interface';
import { InstanceInfo } from './instance.interface';

@Injectable()
export class EurekaClientService {
  private client: Eureka;
  private readonly logger = new Logger(EurekaClientService.name);

  constructor(private readonly options: EurekaClientOptions) {
    options.shouldUseDelta = false;
    //Here to biind the eureka-js-client built-in logger with the one coming from @nestjs/common
    options.logger = {
      info: this.logger.log.bind(this.logger),
      warn: this.logger.warn.bind(this.logger),
      error: this.logger.error.bind(this.logger),
      debug: this.logger.debug.bind(this.logger),
    };

    this.client = new Eureka(options);
    this.startClient();
  }

  // onModuleInit() { // to invoke the startClient() once the module spins up.
  //this.startClient();
  // }

  private startClient() {
        console.log(this.client.getInstancesByVipAddress('auth'));

    this.client.start((error) => {
      this.logger.log('Attempting to register with Eureka Server...');

      if (!error) {
        this.logger.log('Successfully registered with Eureka Server!');
      }

      if (error) {
        switch (error.name) {
          case 'AggregateError':
            if ((error as any)?.code === 'ECONNREFUSED') {
              // when there's connection err (e.g, eureka server down)
              this.logger.error(
                '[ECONNREFUSED]: connection refused by Eureka server',
              );
            } else {
              this.logger.error({ AggregateError: error });
            }
            break;

          default:
            this.logger.error(`${error.name}: ${error.message}`);
            break;
        }
      }
    });
  }

  getInstancesByVipAddress(vipAddress: string): InstanceInfo[] {
    return this.client.getInstancesByVipAddress(
      vipAddress,
    ) as InstanceInfo[];
  }

  getInstancesByAppId(appId: string): InstanceInfo[] {
    return this.client.getInstancesByAppId(
      appId.toUpperCase(),
    ) as InstanceInfo[];
  }
}
