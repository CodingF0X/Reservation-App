import { Role } from '@app/common';

export interface JwtPayload {
  _id: string;
  email: string;
  role: Role;
}
