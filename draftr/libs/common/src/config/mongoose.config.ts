import { ConfigObject, ConfigService } from '@nestjs/config';

export const mongooseConfig = async (configService: ConfigService) => {
  const dbConfg = (await configService.get('database')) as ConfigObject;
  return {
    uri: dbConfg.uri,
  };
};
