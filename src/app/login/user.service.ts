import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../models/User';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


const routes = {
  login: () => `/users/login`,
  register: () => `/users/register`,
  currentUser: () => `/users/current`,
  user: (c: UserContext) => `/user/${c.id}`,
  users: () => `/users`,
};

export interface RegisterContext {
  email: string;
  password: string;
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

    /**
     * Method to register user to the system.
     *
     * @param context - Register context containing the email, and the password.
     */
  register(context: RegisterContext): Observable<string> {
    return this.httpClient
      .post(routes.register(),
        'email=' + encodeURI(context.email) +
        '&password=' + encodeURI(context.password) +
        '&password2=' + encodeURI(context.password2),
        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }
      )
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not register user'))
      );
  }

    /**
     * Method to login user to the system.
     *
     * @param context - Login context containing the username and the password.
     */
  login(context: LoginContext) {
    return this.httpClient
      .post(routes.login(),
        'username=' + encodeURI(context.username) +
        '&password=' + encodeURI(context.password),
        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }
      )
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not login user'))
      );
  }

    /**
     * Method to retrieve the current user if currently logged in.
     */
  getCurrentUser(): Observable<User> {
    return this.httpClient
      .get(routes.currentUser())
      .pipe(
        map((body: any) => {
          if (body.id !== undefined) {
            return body;
          } else {
            return null;
          }
        }),
        catchError(() => of('Error, could not get logged in user'))
      );
  }

    /**
     * Method to get the user based on the id.
     *
     * @param context - User context containing the id.
     */
  getUser(context: UserContext): Observable<User> {
    return this.httpClient
      .cache()
      .get(routes.user(context))
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not get user'))
      );
  }

    /**
     * Method to get all users registered in the system.
     */
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
