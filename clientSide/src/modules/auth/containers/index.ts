import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RolesComponent} from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { UsersComponent } from './users/users.component';
export const containers = [ LoginComponent, RegisterComponent, ForgotPasswordComponent, RolesComponent, PermissionsComponent, UsersComponent  ];

export * from './login/login.component';
export * from './register/register.component';
export * from './forgot-password/forgot-password.component';
export * from './roles/roles.component';
export * from './permissions/permissions.component';
export * from './users/users.component';
