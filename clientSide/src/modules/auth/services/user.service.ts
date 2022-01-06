import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { getFakeUsers, getHeaders, SERVER_API_URL } from '../../../constants';
import { User } from '../models';


const userSubject: ReplaySubject<User> = new ReplaySubject(1);
type JwtToken = {
    token: string;
};

@Injectable()
export class UserService {
    private loginUrl = 'api/login';
    private userUrl = 'api/connected_user';
    constructor(private http: HttpClient, public router: Router) {
    }

    login(password: string, email: string): Observable<string> {


        const credentials = {
            password: password, email: email
        };
        return this.http
            .post<JwtToken>(SERVER_API_URL + this.loginUrl, credentials)
            .pipe(map(response => this.authenticateSuccess(response)));
    }

    /* login(password: string, email: string): Observable<string> {
         this.authenticateSuccess({ access_token: 'xdsdsdsdsd' });
         console.log('access_token');
         return of('');
     }*/

    logout(): Observable<string> {
        localStorage.removeItem('authenticationToken');
        this.router.navigate(["auth/login"])
        return of('');
    }

    // this is a mock function
    /*   getUser(): Observable<User> {
           return of({
               id: 'string',
               firstName: 'string',
               lastName: 'string',
               password: 'string',
               type: '0',
               email: 'string',
           });
       }*/

    getUser(): Observable<HttpResponse<User>> {
        return this.http.get<User>(SERVER_API_URL + this.userUrl, { headers: getHeaders(), observe: 'response' })
    }

    register(user: User): Observable<User> {
        return null;
    }

    /*
    register(user: User): Observable<HttpResponse<User>> { TODO: uncomment this andremove bellow mock
          return this.http.post<User>(SERVER_API_URL + this.loginUrl, user, {headers: getHeaders(), observe: 'response'});
      }
      */

    /*
     getUsers(): Observable<HttpResponse<User[]>> {  TODO: uncomment this andremove bellow mock
           return this.http.get<User[]>(SERVER_API_URL + this.loginUrl, {headers: getHeaders(), observe: 'response'});
       }
       */
    getUsers(): Observable<User[]> {
        return of(getFakeUsers());
    }

    private authenticateSuccess(response: any): string {
        const jwt = response.token;
        localStorage.setItem('authenticationToken', jwt);
        localStorage.setItem('user', JSON.stringify(response.user));
        return jwt;
    }

    setUserInBrowser(user: User) {
        localStorage.setItem('userData', JSON.stringify(user));
    }
    getUserFromBrowser() {
        return JSON.parse(localStorage.getItem('userData'));
    }

}
