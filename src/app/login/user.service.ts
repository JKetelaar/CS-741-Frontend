import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../models/User';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


const routes = {
    login: () => `/users/login`,
    register: () => `/users/register`,
    user: (c: UserContext) => `/user/${c.id}`,
    users: () => `/users`,
};

export interface RegisterContext {
    email: string;
    password1: string;
    password2: string;
}

export interface LoginContext {
    username: string;
    password: string;
}

export interface UserContext {
    id: number;
    name: string;
    description: string;
    username: string;
    billingAddress: string;
    shippingAddress: string;
}

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    register(context: RegisterContext): Observable<string> {
        return this.httpClient
            .cache()
            .post(routes.register(), 'email=' + encodeURI(context.email) + '&password1=' + encodeURI(context.password1) + '&password2=' + encodeURI(context.password2), {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not register user'))
            );
    }

    login(context: LoginContext) {
        return this.httpClient.post(`/login`, context);
    }

    getUser(context: UserContext): Observable<User> {
        return this.httpClient
            .cache()
            .get(routes.user(context))
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not get user'))
            );
    }

    getUsers(): Observable<User[]> {
        return this.httpClient
            .cache()
            .get(routes.users())
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not get users'))
            );
    }


}
