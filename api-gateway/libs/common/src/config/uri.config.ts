import { ConfigObject, registerAs } from '@nestjs/config';

export default registerAs('services', (): ConfigObject => {
  const authServiceUri = process.env.AUTH_SERVICE;

  return {
    auth: authServiceUri,
    users: authServiceUri,
    reservations: process.env.RESERVATIONS_SERVICE,
    properties: process.env.PROPERTY_SERVICE
  };
});
