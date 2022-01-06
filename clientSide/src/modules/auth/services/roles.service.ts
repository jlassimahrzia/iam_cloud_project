import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permission, Role, User } from '@modules/auth/models';
import { UserService } from '@modules/auth/services/user.service';
import { Observable } from 'rxjs';
import { getHeaders, SERVER_API_URL } from '../../../constants';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable()
export class RoleService {
    private rolesUrl: string = 'api/roles_list';
    private assign_role_userUrl: string = 'api/assign_role_user';
    private usersUrl: string = 'api/user_list';
    private createRolesUrl: string = 'api/create_new_role';
    private permissionUrl: string = 'api/permissions_list';
    private userIdUrl: string = 'api/get_user/';
    private savePermissionUrl: string = 'api/create_permission';
    private registerUrl: string = 'api/register';
    private deleteRoleUrl: string = 'api/delete_role';

    constructor(
        private http: HttpClient,
        private userService: UserService,
        private toast: HotToastService
    ) {}

    getRoles(): Observable<HttpResponse<Role[]>> {
        return this.http.get<Role[]>(SERVER_API_URL + this.rolesUrl, {
            headers: getHeaders(),
            observe: 'response',
        });
    }

    getUsers(): Observable<HttpResponse<User[]>> {
        return this.http.get<User[]>(SERVER_API_URL + this.usersUrl, {
            headers: getHeaders(),
            observe: 'response',
        });
    }

    saveRole(role: string, permissions: string[]): Observable<HttpResponse<any>> {
        return this.http.post<any>(
            SERVER_API_URL + this.createRolesUrl,
            {
                role_name: role,
                permissions: permissions,
            },
            { headers: getHeaders(), observe: 'response' }
        );
    }

    assignRoleUser(user_id: number, role_id: number): Observable<HttpResponse<any>> {
        return this.http.post<any>(
            SERVER_API_URL + this.assign_role_userUrl,
            {
                user_id: user_id,
                role_id: role_id,
            },
            { headers: getHeaders(), observe: 'response' }
        );
    }

    deleteRole(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(SERVER_API_URL + this.deleteRoleUrl + '/' + id, {
            headers: getHeaders(),
            observe: 'response',
        });
    }

    savePermissions(permission: string): Observable<HttpResponse<Permission>> {
        return this.http.post<Permission>(
            SERVER_API_URL + this.savePermissionUrl,
            { permission_name: permission },
            {
                headers: getHeaders(),
                observe: 'response',
            }
        );
    }

    getPermissions(): Observable<HttpResponse<Permission[]>> {
        return this.http.get<Permission[]>(SERVER_API_URL + this.permissionUrl, {
            headers: getHeaders(),
            observe: 'response',
        });
    }

    getUserById(userId: number): Observable<HttpResponse<User>> {
        return this.http.get<User>(SERVER_API_URL + this.userIdUrl + userId, {
            headers: getHeaders(),
            observe: 'response',
        });
    }

    createUser(
        firstname: string,
        lastname: string,
        email: string,
        password: string
    ): Observable<HttpResponse<any>> {
        return this.http.post<any>(
            SERVER_API_URL + this.registerUrl,
            {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
            },
            { headers: getHeaders(), observe: 'response' }
        );
    }

    hasRole(role: string) {
        let data = this.userService.getUserFromBrowser();
        if (data && data.user && data.user.roles) {
            for (const rolse of data.user.roles) {
                if (rolse && rolse.name == role) {
                    return true;
                }
            }
        }
        return false;
    }
}
