import { ConfigObject, registerAs } from '@nestjs/config';

type Service = 'auth' | 'reservations';
export default registerAs(
  'services',
  (): ConfigObject => ({
    auth: process.env.AUTH_SERVICE,
    reservations: process.env.RESERVATIONS_SERVICE,
  }),
);
