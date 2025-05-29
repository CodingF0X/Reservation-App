import { EurekaClient } from 'eureka-js-client';

export interface InstanceInfo
  extends Partial<EurekaClient.EurekaInstanceConfig> {
  instanceId: string | undefined;
  hostName: string;
  port:
    | number
    | EurekaClient.PortWrapper
    | EurekaClient.LegacyPortWrapper
    | undefined;
  status: EurekaClient.InstanceStatus | undefined;
  metadata: { version: string };
}
