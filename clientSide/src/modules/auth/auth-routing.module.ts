/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PermissionsComponent} from '@modules/auth/containers/permissions/permissions.component';
import {RolesComponent} from '@modules/auth/containers/roles/roles.component';
import {UsersComponent} from '@modules/auth/containers/users/users.component';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { AuthModule } from './auth.module';

/* Containers */
import * as authContainers from './containers';
import {AuthGuard} from './guards';

/* Guards */
import * as authGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        canActivate: [],
        component: authContainers.LoginComponent,
        data: {
            title: 'Pages Login - Cloud Project',
        } as SBRouteData,
    } ,
    {
        path: 'roles',
        canActivate: [AuthGuard],
        component: RolesComponent,
        data: {
            title: 'Pages Login - Cloud Project',
        } as SBRouteData,
    } ,
    {
        path: 'permissions',
        canActivate: [AuthGuard],
        component: PermissionsComponent,
        data: {
            title: 'Pages Login - Cloud Project',
        } as SBRouteData,
    } ,

    {
        path: 'users',
        canActivate: [AuthGuard],
        component: UsersComponent,
        data: {
            title: 'Pages Login - Cloud Project',
        } as SBRouteData,
    } ,
    {
        path: 'register',
        canActivate: [],
        component: authContainers.RegisterComponent,
        data: {
            title: 'Pages Register - Cloud Project',
        } as SBRouteData,
    },
    {
        path: 'forgot-password',
        canActivate: [],
        component: authContainers.ForgotPasswordComponent,
        data: {
            title: 'Pages Forgot Password - Cloud Project',
        } as SBRouteData,
    },
];

@NgModule({
    imports: [AuthModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
