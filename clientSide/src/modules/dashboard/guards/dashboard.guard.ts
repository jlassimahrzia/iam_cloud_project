import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {RoleService} from '@modules/auth/services/roles.service';
import { Observable, of } from 'rxjs';
import {AuthService, UserService} from '@modules/auth/services';

@Injectable()
export class DashboardGuard implements CanActivate {
    constructor(
        public auth: AuthService,
        public userService: UserService,
        public roleService: RoleService,
        public router: Router
    ) {}

    canActivate(): Observable<boolean> {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['auth/login']);
            return of(false);
        }
        if (!this.roleService.hasRole("ROLE_ADMIN")) {
            this.router.navigate(['auth/login']);
            return of(false);
        }
        return of(true);

    }

}
