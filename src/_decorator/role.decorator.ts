import { SetMetadata } from '@nestjs/common';

export enum Role {
  Admin = 1,
  User = 2,
}

export const ROLE_KEY = 'roles';
export const Roles = (role: Role) => SetMetadata(ROLE_KEY, role);
