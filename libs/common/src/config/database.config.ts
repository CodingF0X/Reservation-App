import { registerAs, ConfigObject } from '@nestjs/config';

export default registerAs(
  'database',
  (): ConfigObject => ({
    uri: process.env.MONGO_URI,
  }),
);
