import { EurekaClientService, InstanceInfo, SERVICES } from '@app/common';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DiscoverServices implements OnModuleInit {
  private registry: Map<string, InstanceInfo[]> = new Map<
    string,
    InstanceInfo[]
  >();

  constructor(private readonly discoverService: EurekaClientService) {}

  async onModuleInit() {
    setTimeout(() => this.getAllServices(), 1000);
    setInterval(() => this.getAllServices(), 30000);
  }

  private getAllServices(): Map<string, InstanceInfo[]> {
    for (const name of Object.values(SERVICES)) {
      const raw = this.discoverService.getInstancesByAppId(name);
      this.registry.set(
        name,
        raw.map((service) => ({
          instanceId: service.instanceId,
          hostName: service.hostName,
          port:
            typeof service.port === 'number'
              ? service.port
              : service.port &&
                  typeof service.port === 'object' &&
                  '$' in service.port
                ? (service.port as any).$
                : undefined,
          status: service.status,
          app: service.app,
          ipAddr: service.ipAddr,
          vipAddress: service.vipAddress,
          dataCenterInfo: service.dataCenterInfo,
          metadata: service.metadata,
        })),
      );
    }
    return this.registry;
  }

  getInstancesForALL(appName: string[]): Record<string, InstanceInfo[]> {
    const result: Record<string, InstanceInfo[]> = {};
    for (const name of appName) {
      result[name] = this.registry.get(name) || []; // map the name of the service to its value returned from registery<string, InstanceInfo[]>
      console.log(result);
    }
    return result;
  }

  getInstances(appName: string): InstanceInfo[] {
    return this.registry.get(appName) || [];
  }

  getServices(appName: string) {
    // const services = this.discoverService.getInstancesByAppId(appName);
    // return services.map((service) => ({
    //   instanceId: service.instanceId,
    //   hostName: service.hostName,
    //   port: service.port,
    //   status: service.status,
    // })) as InstanceInfo[];

    return this.getInstances('AUTH_SERVICE');
  }
}
