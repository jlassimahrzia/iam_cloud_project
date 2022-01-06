import {RoleService} from '@modules/auth/services/roles.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

export const services = [AuthService, UserService,RoleService];

export * from './auth.service';
export * from './user.service';
