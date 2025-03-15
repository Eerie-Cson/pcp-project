import { SetMetadata } from '@nestjs/common';
import { AccountRole } from '../types';

export const Roles = (...roles: AccountRole[]) => SetMetadata('roles', roles);
